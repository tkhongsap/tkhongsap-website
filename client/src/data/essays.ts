export interface Essay {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  readingTime: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

export const essays: Essay[] = [
  {
    id: "the-unraveling-of-a-promise",
    title: "The Unraveling of a Promise",
    subtitle: "When the rules of the technology contract stop applying",
    date: "December 23, 2025",
    readingTime: "5 min read",
    featured: true,
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

// Get featured essay
export const getFeaturedEssay = (): Essay | undefined => {
  return essays.find(essay => essay.featured);
};

// Get essay by ID
export const getEssayById = (id: string): Essay | undefined => {
  return essays.find(essay => essay.id === id);
};
