# Answering AI Questions

*Source: HelloInterview — Behavioral Interviews course, "Answering AI Questions" lesson.*

## Study focus

- **Read closely:** the Five AI Areas, Work and Trust in full, and the AI values-question answer shapes. Skim Iteration, Growth, and Scaling.
- **Know cold:** an AI answer is about **judgment and ownership**, not a tour of tools and features. Where you delegated, why, and how you verified — including where AI *didn't* fit.
- **Write:** a short principle-plus-example answer to "how do you think about AI adoption," and one recent, concrete AI-usage story told through Work and Trust.

## Quick Summary

- AI questions are now expected in behavioral interviews, driven by real top-down/competitive pressure on companies to show development-velocity gains
- Five areas get evaluated, even if not named explicitly: **Work, Trust, Iteration, Growth, Scaling**
- Four of the five map directly onto signal areas already covered (Work→Scope, Iteration→Perseverance/Growth, Growth→Growth, Scaling→Leadership) — **Trust is the one genuinely new dimension**, since it requires actual hands-on AI-specific judgment that doesn't transfer the way general debugging skill does
- Showing judgment about where AI *doesn't* fit is just as valuable as showing where it does — "I use AI for everything" reads as naive, not advanced
- Content here needs to stay current — this space moves fast enough that prepared answers should be revisited regularly, not treated as fixed once written

## The Five AI Areas

| Area | What it evaluates | Maps to Signal Area |
|---|---|---|
| **Work** | What you actually build/ship with AI | Scope |
| **Trust** | How you verify output and stay safe | *(new — no direct transfer)* |
| **Iteration** | How your AI usage improves over time | Perseverance / Growth |
| **Growth** | How you stay current on AI practice | Growth |
| **Scaling** | How you spread good AI practice beyond yourself | Leadership |

**Why Trust is different:** general technical versatility usually transfers (unfamiliar debugger → still useful general debugging instinct). AI-specific judgment doesn't transfer the same way — you need to have actually caught real AI mistakes and built real verification habits in practice to speak credibly here; there's no proxy experience that substitutes for it.

**Seniority mapping:** junior candidates mainly need solid Work and Trust answers. Senior candidates should be able to speak to all five, Scaling included.

## Work: What You Actually Build With AI

Interviewers want concrete outcomes, not a vague "I use AI a lot" — a feature shipped faster, a pipeline that eliminated manual toil, tooling nobody else had bandwidth to build. The strongest answers show AI changing *what was possible*, not just saving time on a known task (e.g., a prototype built in a day that directly unlocked a leadership decision).

Using AI for actual code is table stakes now — what differentiates a strong candidate is applying it to harder-to-automate parts of the job (bug investigation, design review, backlog grooming, incident postmortems), or having rethought an entire workflow end-to-end rather than just accelerating isolated tasks.

**Equally important: showing judgment about where AI *doesn't* fit.** A strong answer names a specific moment you switched off AI and why ("it was generating plausible-sounding guesses without real codebase context, so I finished it manually") — this demonstrates a real mental model of its limits, not blind enthusiasm.

*Representative strong examples: migrating dozens of deprecated call sites in days instead of sprints; building a PR-comment-resolution loop; building internal tooling that previously had no bandwidth; a fast prototype that secured buy-in for a larger project; using AI as a debugging first-pass but deliberately ejecting to manual work once its visibility into the live system proved weak.*

## Trust: How You Verify and Stay Safe

The genuinely new evaluation axis. A candidate who only tells "shipped fast" stories without any verification discipline reads as naive, especially for any non-trivial codebase where one-shot correctness is unlikely. Three real facets:

- **Testing for correctness** — AI output is strong where it's independently verifiable (code, via tests/CI) and weaker where correctness is inherently fuzzy (prose/writing). Leaning on real testing discipline specifically to validate AI-generated code is the expected pattern.
- **Recognizing domain-specific mistakes** — the pitfalls AI hits are often specific to *your* codebase (legacy patterns, performance constraints). A strong answer names a concrete case where the model got something wrong that a senior engineer on your team would have known to avoid.
- **Managing what you share** — AI tools calling external APIs introduce a genuinely new category of judgment: what's actually safe to expose (customer data, internal business logic, unreleased plans, security-sensitive code). Strong candidates can describe an explicit line they've drawn, not an ad hoc "I don't really think about it."

*Representative strong examples: a sandboxed environment that lets agents run with fewer restrictions while keeping prod safe; a pre-commit hook catching common AI mistakes specific to your codebase; catching a model confidently reusing a long-deprecated internal API; a self-hosted model specifically for anything touching sensitive customer data.*

## Iteration: Making Your AI Usage Better Over Time

Interviewers want to see you treat AI tooling as infrastructure requiring maintenance, not a static capability you adopted once. The real question: has your actual approach/tooling meaningfully changed in the last month based on what you've observed working or failing?

*Representative strong examples: a substantial, actively-maintained project instruction file that's eliminated whole categories of repeat mistakes; a library of reusable prompts for recurring task types; a visible tracking system for running multiple parallel AI-assisted workstreams.*

## Growth: Staying Current

The same underlying Growth signal area, specifically applied to AI given how unusually fast this space is moving. What separates a strong answer from a weak one is specificity: name an actual source you learn from, and show evidence of *acting* on what you learned, not just passively consuming content.

*Representative strong examples: dedicated, regular time blocked specifically for experimenting with new techniques on real problems; trying a specific new technique directly after reading about it; a curated list of practitioners actually tracked and experimented from.*

## Scaling: Spreading Good Practice Beyond Yourself

The senior-leaning dimension — real signal in how you've moved beyond personal AI usage into influencing others or the broader organization, in either breadth (disseminating practices widely) or depth (structurally changing how work gets done). Even junior candidates get some expectation here — at minimum, sharing real learnings and contributing to shared tooling/conventions. For senior+ candidates specifically, the highest-value version is structural: rebuilding an actual business workflow around AI, not just individually using it faster.

*Representative strong examples: a shared rules/config repo multiple engineers actively contribute to; running hands-on pairing sessions for skeptical teammates; a dedicated team retro specifically on AI usage (what's working, what's not, what should become a formal rule); documented team conventions for what goes to AI vs. stays manual; case studies built specifically to set realistic executive expectations about AI-driven velocity.*

## Answering AI "Values Questions"

Because AI workflows are still new territory for the field broadly, interviewers lean more heavily on general-principle questions here than in other areas — "how do you generally approach AI-driven development," "how do you balance code-generation volume against verification need." These require a genuinely structured point of view, not just a story.

**Pattern to follow:** state a clear organizing principle, then immediately ground it with a specific example.

*Representative answer shapes from the course:*
- On where AI fits/doesn't: draw the line by verifiability — delegate work where the pattern is clear and quickly checkable (triage, status updates); stay hands-on where mistakes are costly or context is hard to convey (architecture, executive presentations).
- On speed vs. verification: describe a tiered review approach matched to risk (e.g., full automated test/e2e coverage as the general bar, but mandatory line-by-line human review for security-sensitive code regardless of who/what wrote it).
- On AI adoption philosophy: frame AI as subservient to real business needs rather than chasing usage for its own sake; describe looking at end-to-end workflows (not just isolated coding tasks) for where a fundamentally different process, not just a faster old one, becomes possible.

## Key Terms

- **The Five AI Areas** — Work, Trust, Iteration, Growth, Scaling; the framework interviewers use (explicitly or not) to evaluate AI-related answers
- **Trust** — the one AI-specific evaluation area with no direct transfer from general technical experience; built only through real hands-on verification practice
- **AI Values Question** — a general-principle AI question (not a "tell me about a time"), requiring a stated framework plus a grounding example
