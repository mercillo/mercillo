# Common Pitfalls

*Source: HelloInterview — Behavioral Interviews course, "Common Pitfalls" lesson.*

## Study focus

- **Read closely:** Pitfall #2 (not enough actions), #3 (context overload), #4 (the "We" Disease — the before/after table), #6 (fairy tale endings), and the Leadership, Ownership, and Conflict rows of Pitfalls by Signal Area.
- **Skim:** #1, #5, #7, and the senior-candidate traps — but read "Not Thinking Defensively" properly.
- **Self-audit every written story:**
  - [ ] Count "I" vs. "we" — fix every "we" that should be "I"
  - [ ] Read the Context aloud and time it — cut if it runs past ~30-45 seconds
  - [ ] At least one real obstacle or imperfection (no fairy tale ending)
  - [ ] Learnings are specific and honest, not "communication is important"

## Quick Summary

- Seven recurring mistakes show up across hundreds of coached candidates — nearly all are fixable with awareness alone, not more experience
- The two most common, highest-impact fixes: **the "We" Disease** (losing individual signal to collective language) and **Fairy Tale Endings** (no real obstacle, reading as either dishonest or disengaged)
- Each of the 8 signal areas has its own specific, recurring failure pattern worth checking your stories against directly
- Senior candidates face distinct additional traps: being too verbose, omitting the *framework* behind decisions, not thinking defensively about how gaps get filled with assumptions, and passively letting the interviewer drive instead of steering

## Pitfall #1 — Missing the Underlying Assessment

Every question is testing something specific — "tell me about a challenging project" is really asking about Perseverance, not technical architecture. The common failure: spending most of the answer on technical detail and barely any on the actual challenge, because it feels safer to demonstrate competence than to sit with the real signal being requested. **Fix:** pause briefly after the question, explicitly identify what signal is actually being tested, then select accordingly — a few seconds of silence is fine.

## Pitfall #2 — Not Enough Actions

Actions are where the entire evaluated signal lives; a shallow "I built the filter and shipped it on time" tells an interviewer nothing repeatable about how you work. Compare: a vague summary vs. a specific chain (identified N+1 queries → refactored to a single JOIN → p95 dropped 3.2s→400ms → support tickets dropped 60%) — the second actually proves judgment and technique. **The 30-second rule:** if 30 seconds pass with no new action moving the story forward, you're stuck on unnecessary detail. Watch for passive constructions ("I was assigned," "the ticket came to me") that make work sound like it happened *to* you rather than something you drove — even assigned work should pivot immediately to what you chose to do with it.

## Pitfall #3 — Context Overload

Context should be the *minimum* needed to understand your Actions and why they mattered — primarily establishing real stakes, not org charts or team history. Target ~10% of total story time (roughly 20 seconds in a 3-minute story). Context matters more in emotionally-loaded stories (conflict, failure) where interpersonal detail genuinely shapes interpretation — but even there, every detail should still be in service of the Actions, not decoration.

## Pitfall #4 — The "We" Disease

One of the single most common issues, especially among genuinely collaborative candidates who default to collective language without meaning to erase their own contribution. The interviewer is evaluating *you*, not your team — every unnecessary "we" is a missed chance to show specific individual judgment.

| Instead of... | Try... |
|---|---|
| "We decided to use Redis" | "I proposed Redis because our read-to-write ratio was 100:1 and we needed sub-millisecond response" |
| "We built a new service" | "I designed the architecture, implemented the core endpoints, and wrote the integration tests" |
| "We shipped on time" | "I coordinated the release across three teams, managing the dependency chain" |

Being specific about your contribution isn't claiming sole credit — it's just precision, and interviewers don't read it as arrogant.

## Pitfall #5 — Picking the Wrong Stories

A recap of the Select lesson's priority order (Scope → Relevance → Uniqueness → Recency), plus three specific selection mistakes: **scope mismatch** (a routine bug-fix story for a senior role, unless it was genuinely hard), **stories too old** (5+ years raises "what have you done since" questions), and **stories that aren't really yours** (the interviewer can tell when your actual role was peripheral — attending meetings isn't a story).

## Pitfall #6 — Fairy Tale Endings

"We shipped on time, metrics improved, everyone was thrilled" reads as either not having been close enough to the real work to see its problems, or hiding something. **Real projects have real friction** — including it is what makes a story credible and gives the Learnings section something genuine to land on. Concrete ways to include real texture: a specific obstacle hit along the way, a mistake and the recovery from it, or an acknowledged imperfection in the shipped result. When specifically asked about failure, choose a mistake that shows skill growth rather than a character flaw, and frame it as a real learning opportunity — ideally with a later story showing the lesson actually got applied.

## Pitfall #7 — Not Practicing

Candidates who know their stories on paper but haven't said them out loud consistently underperform candidates with objectively weaker material who've rehearsed — the cognitive load of live storytelling is real, and practice is what closes the gap between intended and actual delivery. Telltale signs of insufficient practice: stories running 5-6 minutes, losing your place and backtracking, tangents because you haven't decided what to cut, heavy verbal fillers, and poor pacing (rushing the important part, lingering on setup).

## Pitfalls by Signal Area

| Signal Area | Watch for |
|---|---|
| **Scope** | Is the project representative of your actual target level? Is the business/user "so what" articulable? Is complexity (teams, timeline, components) actually communicated? |
| **Ownership** | Passive language (the "We" Disease again). Bias for action shown, not just described. Results measured and explained *why* those specific metrics mattered. |
| **Perseverance** | Context sells the real difficulty (time/technical/people pressure). Shows sustained effort, not just a quick win. Includes follow-up action to prevent recurrence. |
| **Ambiguity** | The actual ambiguity is quantified/described, not just asserted. Structured thinking shown (prototyping, stakeholder interviews, phased rollout). Course-correction as more was learned. |
| **Communication** | Method and reason for communicating stated, not just content. Multiple directions shown (peer, up, down) where relevant. Two-way understanding demonstrated (checked comprehension, gathered feedback). |
| **Conflict Resolution** | Scope matches target level (peer disagreement reads junior for Staff). You were directly, not peripherally, involved. Empathy shown — not making the other party look bad. Resolution framed win-win where honest. Relationship state afterward is stated. |
| **Growth** | The mistake is a real one, not a humble-brag. Not so obvious-in-hindsight that it damages credibility. Internalized learning shown via a specific behavior change, ideally reapplied later. |
| **Leadership** | Shows how you created conditions for others to do good work, not just your own technical output. Mentoring/development of others explicitly surfaced, not left implicit. |

## Pitfalls Specific to Senior Candidates

- **Too verbose** — richer, more complex stories are genuinely harder to compress. Fix: use the Table of Contents structure (3 themes, 3-4 key actions each), include detail only until credibility is established, and consider pausing after the roadmap to invite questions rather than monologuing straight through.
- **Leaving out frameworks** — describing *what* you did without *how you thought about it* ("I prioritized the roadmap" → no visible criteria) undersells senior judgment. At Staff+, the interviewer wants evidence your decision-making process itself would transfer to their org, not just that past outcomes were good.
- **Not thinking defensively** — senior interviewers are more risk-averse (a bad senior hire has outsized blast radius), and they'll fill narrative gaps with *negative* assumptions by default. Watch for statements that invite uncharitable reads ("my manager assigned me this" → "do you not seek out work yourself?") and either omit the problematic framing or proactively reframe it.
- **Not steering the interview** — it's genuinely your job, not just the interviewer's, to guide the conversation toward your strongest material: plant a complex project in your TMAY so it gets picked up next, drop brief "breadcrumbs" about available side-threads, and use the Menu Technique when you have multiple strong, relevant options.

## Key Terms

- **The "We" Disease** — defaulting to collective language that erases your individual, evaluated contribution
- **Fairy Tale Ending** — a story with no real obstacle or imperfection, reading as either dishonest or insufficiently close to the work
- **The 30-second rule** — the threshold past which you're over-detailing one point instead of progressing the Actions
- **Steering the interview** — proactively guiding the conversation toward your strongest stories, via TMAY seeding, breadcrumbs, or the Menu Technique
