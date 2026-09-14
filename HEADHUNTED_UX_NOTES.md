# Notes — HeadHunted page rewrite (deferred)

**Written:** 2026-09-14
**Status:** Planned and drafted, then reverted at Scarlet's request. `HeadHuntedPage.jsx` is back to its committed state. Pick this up next session.
**Companion doc:** `DAWNCORE_UX_HANDOFF.md` (the original task brief, §4 covers HeadHunted)

DawnCore was completed and signed off in the same session. Its rewritten page is the reference for structure and voice.

---

## 1. Why this was deferred

Nothing was wrong with the material. Scarlet chose to stop after DawnCore and do HeadHunted separately. The draft was discarded rather than left half-applied, so the page is clean.

---

## 2. Facts confirmed by Scarlet on 2026-09-14

**These are new. They are not in any other file, and re-deriving them means asking her again.** Everything here came from her directly during this session.

| Question | Her answer |
|---|---|
| Locomotion scheme | **Smooth continuous thumbstick movement.** Not teleportation. Chosen to preserve the chase. |
| Turning | **The other thumbstick turned the view.** (She did not specify snap vs smooth — ask if it matters.) |
| Comfort techniques that shipped | **Speed cap only.** She capped the movement speed as the comfort measure. No vignette, no snap turning. |
| Why comfort work stopped there | Her words: *"Comfort techniques were not mainly focused due to hardware problems we did not anticipate. This is learning process."* |
| What the hardware problem was | **Forest density against frame rate.** The trees a forest chase needs were too expensive for the Quest 3 to hold a stable frame rate. |
| Player embodiment | **Deer body, no hands.** She committed to the animal. |
| Cage interaction | Proximity triggers a popup prompting a button press. **No animation** — a sudden fade to black for the transition, because the team did not have the resources or time to animate everything. |
| Playtesting | **A class demo or showcase.** People tried it briefly. Nothing beyond that is confirmed. |

Note the significance of the first three together: smooth stick movement *plus* stick turning is the least comfortable combination available in VR. She chose it deliberately and the speed cap was the mitigation. That is the case study.

---

## 3. Claim boundaries (carried forward from `DAWNCORE_UX_HANDOFF.md` §3)

- **She chose the player control and locomotion scheme herself.** Confirmed 2026-09-13. This is the claim the page is built around and the one unambiguous interaction-design credential on her record.
- **Role was Team Lead and Programmer** on a 6-person, 9-week student team. The lead role is real and hers.
- **Do not claim a comfort or frame rate result.** She profiled and optimized against Quest 3 constraints. The honest framing, used on the submitted resume, is that performance directly governs player comfort in VR. That states a property of the platform, not an outcome she measured.
- **Do not invent playtest findings.** The confirmed playtest observation belongs to DawnCore. A class showcase is a fact and can be stated; nothing should imply she watched players and iterated on what she saw.

---

## 4. Planned structure

Mirrors the rewritten DawnCore page, per §4.3 of the handoff — a reviewer should see one person with one way of working.

| Section | Contains |
|---|---|
| Goal | The game in two sentences, team size and timeline, then the statement that she chose the control and locomotion scheme and that in VR that choice *is* the player experience |
| The Tradeoff | A chase needs speed; continuous movement in VR is what makes people sick; teleportation is the comfortable answer and it destroys a chase. The two needs are in direct conflict |
| What I Decided | Smooth stick movement with stick turning, chosen on purpose. Speed cap as the comfort decision. Deer body with no hands, running as the only verb, proximity-and-prompt cage interaction with a fade instead of animation |
| What It Cost | Forest density against frame rate ate the schedule. Frame rate is a comfort concern on a headset, not a polish concern. The performance work was comfort work, but reactive, and it crowded out the deliberate kind |
| Leading the Team | Meetings, unblocking, one game vision across programming and art (which mattered because art built the forest programming had to make run). Short bullet list for dev tools, game manager, asset integration, profiling. Closes on shipping to itch.io and the showcase |
| What I Would Do Differently | Protect time for comfort features instead of treating them as polish; test on the headset from week one; replace the button-and-prompt cage interaction with something that uses the deer body |

Also planned for `QuickInfo`: add `'Platform': 'Meta Quest 3'`, and fix two typos in the blurb (`different to run` → `difficult to run`, `haven't` → `have not` for the spelled-out convention).

---

## 5. Open question, deliberately not written

The obvious fourth reflection bullet is shipping both locomotion schemes and letting the player choose, which is where the industry landed. **Scarlet did not say this**, so it was left out rather than put in her mouth. Ask her whether she wants it before adding it.

Also unconfirmed: whether the stick turning was snap or smooth.

---

## 6. Voice

Resolved this session and already applied to the humanizer skill: **contractions are spelled out in portfolio and professional copy**, natural in student-facing feedback. It is now filed as register-dependent in `~/.claude/skills/humanizer/SKILL.md` and `references/scarlet-writing-style.md` rather than as a global constant. The conflict noted in `DAWNCORE_UX_HANDOFF.md` §7 is closed.

Other constants: no em dashes, plain declarative sentences, specific over vague, no inflated claims.

---

## 7. Also worth knowing

- `~/Documents/GitHub/job-search/HANDOFF.md` **does not exist**, despite `DAWNCORE_UX_HANDOFF.md` and `job-search/CLAUDE.md` both naming it as the authority on claim boundaries. `Riot_UXDesigner.pdf` is missing too. The boundaries above are the surviving copy. Worth rebuilding that file.
- Verification for this repo is `npm run lint` and `npm run build`, then the dev server at `http://localhost:3000/skao-portfolio/`. No tests.
- Do not run `npm run deploy` without asking. It publishes to the live site.
