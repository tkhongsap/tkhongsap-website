import { DEFAULT_COLUMN, type ColumnSlug } from "./columns";

export type { ColumnSlug };

export interface Essay {
  id: string;
  title: string;
  subtitle?: string;
  date: string; // human display, e.g. "December 23, 2025"
  updatedDate?: string; // optional "Updated …" line
  readingTime: string;
  excerpt: string;
  content: string; // markdown string
  featured?: boolean;
  column?: ColumnSlug; // default "signal"
  tags?: string[]; // free-form
  coverImage?: string; // "/images/articles/<id>.jpg"; absent → gradient fallback
  coverAccent?: string; // hex override; absent → column accent
  status?: "published" | "draft"; // absent → published
  order?: number; // tiebreaker; lower = earlier when dates tie
}

export const essays: Essay[] = [
  {
    id: "inference-bottleneck",
    title: "The Inference Bottleneck Nobody Warned Me About",
    subtitle:
      "What running agents 24/7 taught me about where the real AI constraint lives",
    date: "June 11, 2026",
    readingTime: "6 min read",
    column: "frontier",
    tags: ["agents", "inference", "cost", "building-in-public"],
    excerpt:
      "Everyone argues about training runs and trillion-dollar data centers. But the wall I actually hit running four agents around the clock wasn't training—it was inference: latency, rate limits, and the quiet arithmetic of tokens at scale.",
    content: `Everyone argues about training. The trillion-dollar capex announcements, the GPU clusters the size of small towns, the question of whether the next model will be ten times bigger or a hundred. It is the part of AI that makes headlines, and it is the part that almost no working builder will ever touch.

I run four agents on a single VPS, around the clock. An orchestrator and three specialists—one for code, one for content, one for parsing documents—sharing a library of twenty-some skills. They open pull requests while I sleep, draft posts, pull structured data out of messy PDFs. And in nine months of running them, I have not once been bottlenecked by training. Not once. The wall I hit, over and over, is inference.

## The narrative is all about the wrong layer

If you only read the financial press, you would think the entire AI economy is a story about building bigger models. It is an easy story to tell because the numbers are absurd enough to be entertaining. But for the millions of people actually *shipping* things on top of these models, training is weather—something that happens far away and occasionally changes your conditions. Inference is the ground you walk on every day.

Inference is what happens every time one of my agents thinks. Every reasoning step, every tool call, every retry is tokens in and tokens out, metered and billed. When you run a single chatbot conversation, this is invisible. When you run agents in a loop, 24 hours a day, it becomes the dominant fact of your architecture.

## Three costs that actually bite

The bill is the obvious one, but it is not the one that hurt most. Three things did.

**Latency compounds in loops.** A single model call returning in four seconds feels instant in a chat window. But an agent that plans, calls a tool, reads the result, and re-plans might make eight calls to finish one task. Suddenly four seconds is half a minute of wall-clock time, and if that agent is supervising another agent, the delays stack. I spent weeks chasing what I thought was a logic bug before realizing the system wasn't broken—it was just *waiting*.

**Rate limits are a real architecture, not a footnote.** The moment you run concurrent agents, you discover that your throughput is not governed by your code or your server. It is governed by someone else's quota. I had to build backoff, queuing, and a notion of "which agent gets to think right now" that looks suspiciously like an operating-system scheduler. Nobody told me building agents would mean reinventing the run queue.

**Context cost creeps.** Long-running agents accumulate context—history, tool outputs, retrieved documents. Left unchecked, every call gets more expensive than the last, because you are paying to re-read the same growing transcript each time. The cost curve is not flat; it bends upward quietly until a "cheap" task is anything but.

## This is the macro story in miniature

A few months ago I wrote about whether we are in an [AI bubble](/essay/ai-bubble-complicated), and argued the answer depends entirely on *which layer* you mean—training, inference, or applications. Running these agents has only sharpened that view. The training layer may or may not be overbuilt. But the inference layer, from where I sit, is unmistakably *healthy*—demand is real, capacity is scarce, and every improvement in agent tooling pulls more inference through the pipe. That is not a bubble. That is a market straining to keep up.

## What I changed

The fixes were unglamorous, which is usually how you know they are real.

I started **caching aggressively**—prompt prefixes, tool schemas, anything stable across calls. I moved routing and classification—the "which specialist should handle this?" decisions—onto a **smaller, faster model**, reserving the expensive one for work that actually needs it. I **batched** wherever the task allowed it, trading a little latency for a lot of cost. And I put hard **context budgets** on every agent, forcing them to summarize and discard rather than hoard.

None of this made the models smarter. It made the *system* affordable enough to leave running.

## The metric that actually matters

The frontier that matters for builders is not parameter count. It is cost-per-useful-action: how much does it cost, end to end, to get one real thing done—one merged PR, one clean extraction, one drafted post that survives editing.

When you measure that, the bigger-model arms race becomes almost beside the point. A model twice as capable that costs five times as much per action can be a worse deal than a smaller one wrapped in a smarter system. The edge of AI, for those of us building on it, is not in the data center. It is in the loop.`,
  },
  {
    id: "four-agents-one-vps",
    title: "Four Agents on One VPS: A Field Report",
    subtitle: "The architecture, the skills layer, and the failures I didn't expect",
    date: "June 4, 2026",
    readingTime: "8 min read",
    column: "field-notes",
    tags: ["agents", "openclaw", "infrastructure", "building-in-public"],
    excerpt:
      "I run an orchestrator and three specialized agents—code, content, document-parsing—sharing 20+ skills on one modest VPS, 24/7. Here's the actual wiring, what broke, and what I'd do differently.",
    content: `People assume that running a fleet of AI agents means a cloud bill that looks like a phone number. It doesn't have to. My entire setup runs on one modest VPS—a few dollars a day in compute, plus inference—and it has been running, more or less continuously, for nine months. This is the field report: the wiring, the failures, and the parts I would build differently.

## Why one box instead of cloud sprawl

I started where everyone tells you to start: managed queues, serverless functions, a vector database as a service. Within a week I had six dashboards, four bills, and no clear picture of what my agents were actually doing. The complexity was not in the agents. It was in the *plumbing between* them.

So I collapsed it. One VPS, one process supervisor, one log stream I can actually read. The constraint turned out to be a feature: when everything runs on one box, the cost of a runaway agent is immediately visible, and the temptation to over-engineer disappears. You cannot hide a problem behind a managed service that you do not have.

## The topology

The system is one orchestrator and three specialists:

- **Orchestrator** — receives a goal, decides which specialist owns it, and supervises the result. It does very little "thinking" itself; its job is routing and judgment.
- **Code agent** — works against GitHub: branches, edits, tests, pull requests.
- **Content agent** — drafts and schedules posts, works with the writing I actually publish.
- **Document agent** — turns messy PDFs and scans into structured data.

The orchestrator never does a specialist's work, and a specialist never calls another specialist directly. Everything routes back through the orchestrator. That one rule—no lateral calls—is what keeps the system debuggable. When something goes wrong, there is exactly one place the decision was made.

## The skills layer

Underneath the agents sits a shared library of twenty-plus skills: GitHub operations, a Notion client, a scheduler, a web fetcher, a handful of file and shell utilities. A skill is just a well-described capability with a clear contract. Some are shared by every agent; others are scoped so that, for example, only the code agent can push to a repository.

Registering a skill looks roughly like this:

\`\`\`python
@skill(
    name="open_pull_request",
    scope=["code-agent"],          # not every agent may call this
    description="Open a PR from a working branch with a title and body.",
)
def open_pull_request(branch: str, title: str, body: str) -> dict:
    repo = github.repo(DEFAULT_REPO)
    pr = repo.create_pull(base="main", head=branch, title=title, body=body)
    return {"url": pr.html_url, "number": pr.number}
\`\`\`

The \`scope\` field matters more than it looks. Early on, every agent could call every skill, and that was the source of my worst bug (below). Scoping skills to the agents that should own them is the single cheapest piece of safety in the whole system.

## Three failures I did not see coming

**Runaway loops.** An agent that can re-plan can, under the wrong conditions, re-plan forever. My content agent once spent a night politely rewriting the same paragraph forty times because its "is this good enough?" check never returned true. The fix was boring and essential: a hard step budget per task, and a rule that an agent must make measurable progress or stop.

**Rate-limit collisions.** With four agents awake at once, they would occasionally all reach for the same model quota in the same second, fail together, retry together, and fail together again—a thundering herd of my own making. I added jittered backoff and a small scheduler so that only so many agents may "think" concurrently.

**State collisions.** Two agents, two working directories, one shared checkout of a repository. You can guess how that ended. Now every code task gets an isolated working tree, and shared state is treated as something to be borrowed explicitly, never assumed.

## What ships autonomously now

On a normal day, without me touching anything: the code agent opens two or three pull requests against my own projects, the content agent drafts and queues posts, and the document agent clears a backlog of PDFs into clean structured records. I review, I merge, I edit. The agents do not replace my judgment. They remove the part of the work that was never the interesting part.

This is the same setup behind the [AI agent system and operations dashboard](/portfolio) I keep building on. It is not a product demo. It is the thing I actually use.

## What I would change

If I rebuilt it tomorrow, I would put **observability first, not last**. For months I debugged by reading raw logs, and I lost more time to "what was this agent thinking?" than to any actual bug. A proper trace of every decision—goal, route, tool call, result—would have paid for itself in a week.

And I would treat the orchestrator's judgment as the real product. The specialists are commodities; any of them could be swapped for a better model next quarter. The value is in the routing, the supervision, the "is this done?"—the parts that are mine. That is where the next nine months of work goes.`,
  },
  {
    id: "missing-bottom-rung",
    title: "The Missing Bottom Rung",
    subtitle: "If AI eats the junior tasks, where do senior engineers come from?",
    date: "May 28, 2026",
    readingTime: "6 min read",
    column: "signal",
    tags: ["future-of-work", "juniors", "opinion", "ai-labor"],
    excerpt:
      "The junior developer job was never just cheap labor—it was the bottom rung of a ladder. Pull it out and you don't just hurt the people climbing today; you eventually run out of people at the top. A trend line worth watching.",
    content: `Here is a pattern I keep noticing in hiring data and in my own inbox: junior roles are getting squeezed hard, while senior roles keep getting posted. Companies are quietly deciding they need fewer people learning and more people who already know. On a spreadsheet, this looks efficient. On a longer timeline, it looks like sawing off the branch you are sitting on.

## The ladder was never just about labor

The junior developer position was never only about cheap hands. It was the bottom rung of a ladder. The tedious work—bug fixes, small features, maintenance—produced output, yes, but its real function was *formation*. It was how a person became senior. You learned the codebase by fixing it. You learned judgment by making small mistakes in low-stakes places.

I touched on this in an earlier piece about [the unraveling of the technology contract](/essay/the-unraveling-of-a-promise). This is the forward-looking half of that thought. Not "what did we lose," but "what happens next, if the trend holds."

## Why companies are rationally wrong

The companies cutting junior roles are not being stupid. AI tools genuinely handle a lot of what juniors used to do. If a senior engineer with good tooling can do the work of a senior plus two juniors, the short-term math is obvious, and obvious math is hard to argue with in a budget meeting.

The problem is that the math is only short-term. Seniors are not minted. They are *grown*, slowly, out of juniors who were given room to be mediocre for a while. Remove the bottom rungs and you do not just hurt the people trying to climb today. You stop producing the people you will need at the top in five years. The cost lands later, on someone else's quarter, which is precisely why it is so easy to ignore now.

## The org-chart time bomb

Play it forward. If an industry hires few juniors for several years running, it does not feel the effect immediately—the existing seniors are still there, still productive, now amplified by tools. The pipeline runs dry quietly.

Then the seniors start to retire, or leave, or burn out. And the industry reaches for the next generation of seniors, and finds that it never made them. You cannot hire your way out of a shortage you spent five years manufacturing. The people simply do not exist, because the conditions that would have produced them were optimized away.

## Two futures

I think we land in one of two places.

In the first, the ladder gets **rebuilt around a new bottom rung**. The entry-level job is no longer "write the small feature." It is "supervise the agent that writes the small feature"—reviewing, correcting, judging. The skill that used to be senior-only, taste, becomes the thing juniors develop first. This is harder to teach and harder to hire for, but it is a real ladder, and it points up.

In the second, the rung is simply gone, and the industry runs on a permanently thinned senior layer—expensive, overworked, and irreplaceable in a way that should make everyone nervous. This is the worse outcome, and it is the default if nobody chooses otherwise.

## What a builder does now

I cannot fix the industry's hiring. But as someone building with agents every day, I can tell you which skills are actually appreciating in value, and it is not the ones I expected.

It is judgment. It is the ability to look at something an agent produced and know, quickly, whether it is right—and why. It is system-level thinking, the part that decides *what* should be built before anything writes a line of it. The mechanical skills are being commoditized in real time. The evaluative ones are becoming the entire job.

If you are early in your career, that is where I would point yourself: not at out-typing the machine, but at out-judging it. And if you are doing the hiring, the cheapest thing you can do for your own future is to keep a bottom rung on the ladder—even when the spreadsheet says you don't need one. Especially then.`,
  },
  {
    id: "the-unraveling-of-a-promise",
    title: "The Unraveling of a Promise",
    subtitle: "When the rules of the technology contract stop applying",
    date: "December 23, 2025",
    readingTime: "5 min read",
    featured: true,
    column: "signal",
    tags: ["future-of-work", "ai-labor", "opinion"],
    excerpt: "Two groups of people are sitting with the same feeling right now, though they have never met. One spent twenty-five years building a career in technology. The other just graduated. They share something: the slow realization that the rules they were promised no longer apply.",
    content: `Two groups of people are sitting with the same feeling right now, though they have never met.

One is in their mid-forties. They spent twenty-five years building a career in technology—learning languages, earning patents, leading teams across continents. They did everything right. They worked the long hours. They stayed current. They saved and invested. And two weeks ago, for the first time in their career, they were laid off.

The other just graduated. They studied computer science because everyone said it was the safe choice. The practical choice. They learned to code, built projects, prepared for interviews. Now they are sending applications into silence. Entry-level positions that once numbered in thousands have shrunk to hundreds. Many have disappeared entirely.

These two people would not recognize each other on the street. But they share something: the slow realization that the rules they were promised no longer apply.

## The Veteran's Reckoning

For decades, technology offered a clear contract. Learn the skills. Work hard. Stay current. In exchange: stability, good compensation, a place in the middle class or above.

This contract held through recessions. It held through outsourcing waves. It held even as other industries hollowed out. Technology workers watched manufacturing jobs leave, watched retail collapse, watched journalism contract—and believed, with some justification, that their skills made them different.

The 2008 financial crisis was a warning. Those who lived through it remember watching colleagues—mentors, people they respected—lose positions and break down. Smart people. Disciplined people. People who had done everything right.

But even then, technology recovered faster than other sectors. The lesson many took was not that the contract was fragile, but that they needed to save more, invest better, prepare for the next storm while trusting the shelter would hold.

The current wave of layoffs is different. It is not a response to crisis. The companies doing the cutting are profitable. They are simply choosing to need fewer people. Interest rates changed the math. Offshore resources became more accessible. AI tools began handling tasks that once required headcount.

A person who spent a career building enterprise systems now sits in what feels like wilderness. The path they were on—clear, marked, leading somewhere—has ended. Multiple trails lead forward, but none are certain. Nothing is concrete.

*This is what it feels like when a contract breaks.*

## The Graduate's Void

The person just entering the field faces something different but related: the contract was never offered to them at all.

Previous generations of computer science graduates walked into a market hungry for anyone who could write code. Junior positions were plentiful. The work was often tedious—bug fixes, small features, maintenance tasks—but it served a purpose beyond the immediate output. It was training. It was how you became senior.

That path is narrowing. AI tools now handle many tasks that once occupied entry-level engineers. Companies that previously hired five juniors to support one senior are recalculating. Some are deciding they need fewer people learning and more people who already know.

The junior developer position was never just about cheap labor. It was the bottom of a ladder. Remove the bottom rungs and you don't just hurt the people trying to climb—you eventually run out of people at the top.

But that is a long-term problem. Right now, the immediate reality is graduates competing for positions that may not exist in the numbers they were promised when they chose their major four years ago.

*They are not being laid off. They are simply not being let in.*

## What the Contract Actually Was

When we examine what broke, we find that the contract was always more fragile than it appeared.

The implicit promise of technology work was never written down. No company guaranteed lifetime employment. No industry body pledged to maintain a certain number of jobs. The contract existed in assumptions, in patterns that held long enough to seem like laws.

**Work hard, stay current, and you will be fine.**

This was true. Until it wasn't. The conditions that made it true—rapid industry growth, limited talent supply, geographic constraints on hiring—were circumstantial, not permanent.

We are now learning what happens when circumstances change. The skills that guaranteed security for one generation may not guarantee it for the next. The ladder that existed may be rebuilt differently, or not at all.

This is not a moral failing of companies or workers. It is what happens when an industry matures, when automation reaches a new category of work, when the economics shift. It has happened before in other fields. It is happening now in this one.

## The Deeper Question

Beyond the practical concerns—finding the next job, paying the bills, maintaining health insurance—there is a question that surfaces in these moments of disruption.

**What was it all for?**

The long hours. The missed time with family. The weekends spent learning new frameworks. The years building systems that were replaced, rebuilt, or abandoned. The colleague who worked late nights on a major initiative and then died of a heart issue before Christmas, and was functionally forgotten within a month.

Technology workers were promised that their work mattered. That they were building the future. That the sacrifice of time and energy and presence was worth something.

Some of it was. Some of what we built genuinely improved lives, created new possibilities, solved real problems.

But some of it did not. Some of it was solving the same problem over and over. Some of it was building things that made no real difference to the world, that will not be remembered, that existed only to generate metrics that justified someone's budget.

The layoff does not create this question. It simply removes the distractions that allowed us to avoid asking it.

## No Resolution

We want essays like this to end with answers. Five steps to navigate uncertainty. A framework for finding meaning. The optimistic turn that makes the difficult truth feel manageable.

That is not honest to where we are.

The veteran sitting in the wilderness does not know which path to take. The graduate facing a closed door does not know when it will open. The industry is in the middle of a transformation whose outcome is not yet clear.

What we can say is this: the anxiety is real. It is not weakness. It is the appropriate response to genuine uncertainty.

And it is shared. The person who spent decades in this industry and the person trying to enter it are facing the same fundamental question: *what happens when the rules change?*

We do not have the answer yet.

But we are asking it together, which is at least a beginning.`
  },
  {
    id: "ai-bubble-complicated",
    title: "Is There an AI Bubble? It's Complicated—and That's Actually the Interesting Part",
    subtitle: "Unpacking the nuances of AI investment across training, inference, and applications",
    date: "November 30, 2025",
    readingTime: "8 min read",
    column: "signal",
    tags: ["ai-economics", "markets", "analysis"],
    excerpt: "The numbers certainly feel bubbly. OpenAI has committed to roughly $1.4 trillion in infrastructure over the next eight years. Nvidia became the first company to hit $5 trillion in market value this October. But asking 'is AI a bubble?' is a bit like asking 'is food overpriced?'",
    content: `Here's a question buzzing through every tech conference, investor meeting, and group chat right now: are we in an AI bubble?

The numbers certainly *feel* bubbly. OpenAI has committed to roughly $1.4 trillion in infrastructure over the next eight years. Nvidia became the first company to hit $5 trillion in market value this October. These figures are so enormous they've basically lost all meaning—like trying to picture the distance to Alpha Centauri or count every grain of sand on a beach.

But here's where it gets interesting: asking "is AI a bubble?" is a bit like asking "is food overpriced?" Well... which food? A bag of rice? A truffle-topped wagyu steak? The answer changes everything.

Let's unpack this together.

## The Three-Layer Cake

Picture AI as a three-layer cake (stay with the food metaphors here—they're helpful!). At the bottom sits the training infrastructure—those massive GPU clusters humming away in data centers, cooking up foundation models. The middle layer is inference—the machinery that actually *runs* those models every time someone asks ChatGPT a question or watches Claude Code write software. And the top layer? The applications. The actual products people use to solve real problems in their daily lives.

Here's what's genuinely fascinating: these three layers might be in completely different states of health.

## The Application Layer

**The application layer** is where things get counterintuitive. Some prominent researchers and investors argue this layer—where real businesses solve real problems—might actually be *starved* for capital compared to infrastructure. Think about it: applications built on top of AI infrastructure have to generate enough value to pay for that infrastructure. That's just math. Yet many venture capitalists have reportedly grown hesitant to write checks for AI applications. Why? They're worried about picking losers. Many have bought into this narrative that frontier labs will eventually absorb everything—that every AI startup will get steamrolled when GPT-6 arrives.

But that logic has some pretty big holes in it. There are thousands of business problems waiting to be solved, and the big labs simply aren't built to tackle all of them. They're creating general-purpose tools, not specialized solutions for logistics companies navigating supply chains or healthcare providers managing patient records or legal firms drowning in document review.

## The Inference Layer

**The inference layer** tells a different story. According to various industry reports, demand for compute to run AI models remains remarkably strong. Development teams reportedly struggle to secure enough capacity at reasonable cost. When demand outstrips supply, that's usually a healthier problem than building something nobody wants—though it certainly doesn't guarantee profitable outcomes for every investor betting on this space. As agentic coding tools keep improving (Claude Code, Codex, Gemini CLI are all making real progress), demand for inference could grow even further.

## The Training Layer

**But the training layer?** This is where things get potentially wobbly. Billions upon billions are flowing into training ever-larger models. The challenge? Open-source alternatives keep getting better. Algorithmic improvements keep making training cheaper. The moat around frontier capabilities keeps shrinking. Some companies pouring billions into training might never see attractive returns. That's just the uncomfortable reality of how technology competition works.

## What's Happening Behind the Scenes

What's happening behind the scenes deserves attention too. Some Big Tech companies are using financial structures called "special purpose vehicles" to keep data center investments off their balance sheets. The mechanics get complicated, but the basic idea: outside investors borrow billions, the tech company leases the facility, and that massive debt stays invisible in their financial statements. Anyone old enough to remember Enron might feel a slight chill reading those words—"special purpose vehicle." Today's structures are more transparent, sure, but the underlying dynamic of off-balance-sheet leverage? Worth keeping an eye on.

## The Real Concern

Here's what should genuinely concern thoughtful observers. It's probably not a total AI collapse—there's too much real demand for these technologies. The worry is the domino effect. If one part of the stack (most likely training infrastructure) suffers from overinvestment, negative sentiment could spread irrationally across the entire sector. Money could flee AI altogether, abandoning even the parts that might deserve *more* investment, not less.

## So, Is There a Bubble?

For AI, the fundamentals look genuinely solid. The technology works—like, really works. Applications keep multiplying. Demand for compute keeps climbing. But here's the crucial caveat: massive infrastructure commitments don't guarantee returns. They open possibilities that depend entirely on execution, competition, and market conditions. The path from here to there might involve some painful corrections along the way.

So is there a bubble? In some parts of the stack, quite possibly. In others, there might actually be room for *more* investment. Valuations like Nvidia's carry real uncertainty—they reflect confidence in future AI demand, but they also bake in significant risk if sentiment shifts.

The market will eventually sort out which bets were wise and which were wishful thinking. That's what markets do.

In the meantime, the smartest thing anyone can do is focus on building things that genuinely matter.`
  }
];

const isPublished = (e: Essay) => e.status !== "draft";
const columnOf = (e: Essay): ColumnSlug => e.column ?? DEFAULT_COLUMN;
const byDateDesc = (a: Essay, b: Essay) =>
  new Date(b.date).getTime() - new Date(a.date).getTime() ||
  (a.order ?? 0) - (b.order ?? 0);

// All published articles, newest first
export const getAllArticles = (): Essay[] =>
  essays.filter(isPublished).sort(byDateDesc);

// Featured article (explicit flag, else newest)
export const getFeatured = (): Essay | undefined =>
  getAllArticles().find((e) => e.featured) ?? getAllArticles()[0];

// N latest, optionally excluding one id (e.g. the featured hero)
export const getLatest = (n: number, excludeId?: string): Essay[] =>
  getAllArticles()
    .filter((e) => e.id !== excludeId)
    .slice(0, n);

export const getArticlesByColumn = (slug: string): Essay[] =>
  getAllArticles().filter((e) => columnOf(e) === slug);

export const getArticlesByTag = (tag: string): Essay[] =>
  getAllArticles().filter((e) => (e.tags ?? []).includes(tag));

export const getAllTags = (): string[] =>
  Array.from(new Set(getAllArticles().flatMap((e) => e.tags ?? []))).sort();

// Backward-compatible helpers
export const getFeaturedEssay = (): Essay | undefined => getFeatured();

export const getEssayById = (id: string): Essay | undefined =>
  essays.find((essay) => essay.id === id);
