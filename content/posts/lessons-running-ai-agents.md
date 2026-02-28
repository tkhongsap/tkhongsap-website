---
title: "What I Learned Running AI Agents for a Month"
date: "2026-02-28"
category: building-in-public
tags: [AI agents, lessons, OpenClaw, building-in-public, automation]
excerpt: "After a month of running AI agents in production — shipping code, drafting content, managing workflows — here are the hard-won lessons. Some are obvious in hindsight. None were obvious at the time."
readingTime: "8 min read"
featured: false
---

A month ago, I turned on a system of four AI agents and pointed them at real work. Not a demo. Not a proof of concept. Actual production tasks: shipping code, writing content, managing project boards, parsing documents, opening PRs, scheduling social posts.

Here's what I learned. Some of these lessons are obvious in hindsight. None were obvious at the time.

## Lesson 1: Memory Matters More Than Intelligence

This was the first surprise and the most important one.

Every time an agent wakes up, it wakes up with amnesia. It doesn't remember yesterday's conversation. It doesn't remember the bug it fixed last week. It doesn't remember your preferences, your project's conventions, or the decision you made three days ago about the database schema.

Without memory, an agent makes the same mistakes repeatedly. It asks the same clarifying questions. It proposes solutions you've already rejected. It's like working with a brilliant contractor who shows up every morning having forgotten everything about the project.

The fix isn't more intelligence. GPT-5 won't solve this. Claude Opus won't solve this. The fix is infrastructure: persistent context files, workspace documents, conversation summaries, decision logs. We use files like AGENTS.md, SOUL.md, and TOOLS.md to give each agent the context it needs when it starts a new session.

Think of it this way: a mediocre model with great context outperforms a brilliant model with no context. Every single time.

## Lesson 2: The Orchestrator Should Orchestrate, Not Do

Early on, our orchestrator agent (Ava) tried to do everything herself. Received a coding task? She'd attempt to write the code. Needed a social media post? She'd draft it. Had a document to parse? She'd give it a shot.

The results were predictably mediocre. Ava is great at coordination, planning, and delegation. She's not a specialist in any domain. When she tried to write code, the code was okay but not good. When she tried to write content, the content was generic.

The breakthrough came when we enforced a strict rule: **the orchestrator delegates. Always.** Ava's job is to understand the task, break it into subtasks, assign each subtask to the right specialist agent, and monitor progress. She never does the actual work.

This mirrors a pattern every experienced engineering manager knows: the best managers don't write code. They make sure the right people are writing the right code. An orchestrator agent that tries to do the work is like a manager who insists on coding every feature themselves. The team's output suffers because the coordinator isn't coordinating.

## Lesson 3: Guardrails Are More Important Than Capabilities

I cannot stress this enough. The thing that will bite you isn't what your agents *can't* do. It's what they *can* do without proper constraints.

An agent with access to your GitHub repository can push to main. An agent with shell access can delete files. An agent with database credentials can drop tables. These aren't theoretical risks — they're things that happened during our first week.

Not catastrophically, mind you. No production data was lost. But there were moments where I looked at an agent's actions and thought: "If I hadn't caught that, this would have been very bad."

The fix is layered guardrails:

**Skill-level constraints:** The GitHub skill can create branches and PRs but cannot force-push to main or delete repositories. The shell skill can run tests but cannot execute commands outside the project directory.

**Agent-level constraints:** Builder can modify code but needs a PR review before merging. Content can draft posts but needs approval before publishing.

**System-level constraints:** All agent actions are logged. Destructive operations require explicit confirmation. Production environments have read-only access by default.

This slows things down slightly. That's the point. Speed without safety is just fast failure.

## Lesson 4: Add Tools One at a Time

When I first set up the agent system, I was excited. I installed every skill that looked useful. GitHub, Notion, Slack, weather, web search, social media, document parsing, image generation, database access — the works.

The result was chaos. Agents would use the wrong tool for the task. They'd try to solve a coding problem by searching the web instead of reading the codebase. They'd attempt to post to social media when they should have been updating a project board.

The fix was counterintuitive: remove skills until things work, then add them back one at a time.

Start with the minimum viable skill set. For Builder, that meant just GitHub and file operations. Get that working perfectly. Then add shell execution. Get that working. Then add coding agents. Each addition gets tested in isolation before being deployed.

This isn't just about the agent getting confused. It's about your ability to debug problems. When an agent has 20 tools and something goes wrong, figuring out which tool misbehaved is a nightmare. When it has 3 tools, the debugging surface is manageable.

## Lesson 5: Document Everything (For the Agents)

Documentation in AI agent systems serves a different purpose than documentation in traditional software.

In traditional software, documentation is for humans. In agent systems, documentation is for both humans and agents. And the agent reads it every single time it starts a session.

This means your documentation needs to be:

**Concise:** Agents have context windows. Every unnecessary word in your documentation is a word that can't be used for actual work.

**Actionable:** Don't describe philosophy. Describe behavior. Not "we value clean code" but "use conventional commits: feat:, fix:, docs: prefixes."

**Current:** Stale documentation is worse than no documentation. An agent following outdated instructions will confidently do the wrong thing.

We maintain workspace files that get loaded into every agent session. AGENTS.md describes workflow rules and hard-won lessons. TOOLS.md lists available tools and how to use them. SOUL.md defines the agent's personality and communication style.

These files are living documents. Every time an agent makes a mistake, we update the relevant file to prevent that mistake from recurring. Over time, the documentation becomes a distilled record of everything we've learned.

## Lesson 6: Async Is King

Agents work best when they're doing work you don't want to wait for.

The most productive pattern we've found: define tasks at the end of the day, let agents work overnight, review results in the morning. This works because:

- Agents don't mind working at 3 AM
- You're not blocked waiting for results
- You review with fresh eyes instead of watching the sausage get made
- Context switching is eliminated — you batch your review into one session

The least productive pattern: sitting and watching an agent work in real time, micromanaging its every decision. This defeats the entire purpose. If you're going to supervise every step, you might as well do the work yourself.

Trust the guardrails you've set up. Review the output, not the process.

## What We Have Now

After a month of iteration, here's what our system handles daily:

**Morning briefs:** Ava compiles overnight activity — PRs opened, issues closed, content published — into a summary. I review it with coffee.

**Content pipeline:** Content agent maintains a posting schedule. Drafts get queued, reviewed, and published across platforms. The pipeline runs whether I'm actively managing it or not.

**Code shipping:** Builder handles implementation of user stories from PRDs. It reads the spec, writes the code, runs tests, commits, and opens PRs. Overnight, real features get built.

**Document processing:** Doc Parser handles incoming documents — contracts, invoices, research papers — and extracts structured data for downstream use.

**Project management:** Notion boards stay updated automatically. When a PR merges, the corresponding task moves to Done. When a new issue is created, it appears in the backlog.

Is it perfect? No. Agents still make mistakes. PRs sometimes need revision. Content sometimes misses the mark. But the baseline output — the work that gets done without my direct involvement — is genuinely impressive.

## The Meta-Lesson

The biggest lesson from this month isn't about any specific tool or technique. It's about the mindset shift required to work effectively with AI agents.

You're not hiring employees. You're not writing scripts. You're building a system that thinks — imperfectly, within constraints, but genuinely thinks — about the work it's doing.

This requires a different kind of management. Less "do exactly this" and more "here's the outcome I want, here are the constraints, here's the context you need." You're setting up an environment for autonomous work, not dictating step-by-step instructions.

The people who will get the most value from AI agents aren't the ones with the best prompts. They're the ones who build the best systems around the agents: the right memory, the right guardrails, the right skill sets, the right review processes.

The agents are the engine. But the system is the car.

And after a month of building this car while driving it, I can say: it actually works. Not in theory. In practice. Every day.

The PRs ship. The content publishes. The documents get parsed. And I sleep through most of it.

That's the real lesson: this isn't the future anymore. It's Tuesday.
