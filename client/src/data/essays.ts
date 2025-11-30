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
    id: "ai-bubble-complicated",
    title: "Is There an AI Bubble? It's Complicated—and That's Actually the Interesting Part",
    subtitle: "Unpacking the nuances of AI investment across training, inference, and applications",
    date: "November 30, 2025",
    readingTime: "8 min read",
    featured: true,
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
