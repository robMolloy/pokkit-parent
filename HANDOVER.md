# Handover: rename the circle designs

Replay the work on this branch from a clean `main`. The finished result is on `cursor/circle-expand-contract-8dfa` (pull request 27). Creating this file is not part of the replay.

## Start here

```bash
git fetch origin main
git checkout main
git pull origin main
```

`origin/main` already contains the CSS trim (`f9baab2`): `src/index.css` only imports Tailwind and `src/App.css`, and the motion keyframes live in `src/App.css`. The designs on that `main` are still named breathe-in-breathe-out and squeeze-relax.

## Prompt

Run this as one task. Fetch `origin/main` again before resolving conflicts.

```text
Rename the circle designs for the motion they show, then reconcile the branch with origin/main.

1. Rename the breathe-in-breathe-out design to CircleExpandContract.
   - Component: CircleExpandContract in src/designs/CircleExpandContract.tsx
   - Stylesheet: src/designs/CircleExpandContract.css (move the file; leave the .breathe class names, custom properties, and keyframe names as they are)
   - Tailwind variant: CircleExpandContractTailwind in src/designs/CircleExpandContractTailwind.tsx
   - Pages: src/pages/designs/circle-expand-contract.page.tsx and src/pages/designs/circle-expand-contract-tailwind.page.tsx
   - Routes: /designs/circle-expand-contract and /designs/circle-expand-contract-tailwind
   - Designs list labels: "Circle expand, contract" and "Circle expand, contract (Tailwind)"
   - Keep the on-screen cues "Breathe in" and "Breathe out", the screen-reader copy, the inDuration and outDuration props, and the Tailwind animation names animate-breathe-tw-dilate, animate-breathe-tw-cue, and animate-breathe-tw-cue-out.

2. Rename squeeze-relax the same way, to CircleUpDown.
   - Component: CircleUpDown in src/designs/CircleUpDown.tsx
   - Page: src/pages/designs/circle-up-down.page.tsx
   - Route: /designs/circle-up-down
   - Designs list label: "Circle up, down"
   - Keep the screen-reader sentence "A ball slowly rises, then falls. The motion repeats."
   - Rename the motion itself from squeeze-relax to circle-up-down. On current main that keyframe is in src/App.css inside @theme inline: --animate-circle-up-down and @keyframes circle-up-down. The component class is motion-safe:animate-circle-up-down. If the keyframe is still in src/index.css, rename it there instead of moving it.

3. Fetch origin/main. If it conflicts, classify each conflict as simple or as a conflicting intent. Fix only the simple ones and report the complicated ones.
   The conflict this produced was simple and only in src/index.css. Main had moved the theme and keyframes into src/App.css and reduced src/index.css to the Tailwind import, the App.css import, and the dark variant. This branch had renamed squeeze-relax to circle-up-down in the old index.css. Keep main's thin index.css and main's trimmed App.css. Apply only the circle-up-down rename inside App.css. Take main's other changes as they are: the deploy workflow, components.json pointing Tailwind at src/App.css, and the removed unused tokens. Do not restore sidebar, chart, card, or font tokens that main deleted.

Check with npm run tsc and npm run lint. In the browser, /designs lists the three new labels, both circle routes render, /designs/circle-up-down moves the ball up and down, and /designs/breathe-in-breathe-out and /designs/squeeze-relax show "Page not found".
```

## Original prompts

These are the requests that produced the prompt above, in order:

1. Change the breathe in breathe out component name to circle expand and contract or whatever an appropriate name is.
2. Please do the same for squeeze relax too circle up down.
3. There are merge conflicts with the `main` branch. Review them and classify whether they are simple conflicts, or if there are conflicting intents or other complicating factors. Fix the simple conflicts, and report the complicated ones. Fetch the latest changes to the `main` branch from the origin before you begin.

## Names

| Before | After |
| --- | --- |
| `BreatheInBreatheOut` | `CircleExpandContract` |
| `BreatheInBreatheOutTailwind` | `CircleExpandContractTailwind` |
| `/designs/breathe-in-breathe-out` | `/designs/circle-expand-contract` |
| `/designs/breathe-in-breathe-out-tailwind` | `/designs/circle-expand-contract-tailwind` |
| Breathe in, breathe out | Circle expand, contract |
| `SqueezeRelax` | `CircleUpDown` |
| `/designs/squeeze-relax` | `/designs/circle-up-down` |
| Squeeze, relax | Circle up, down |
| `squeeze-relax` keyframes | `circle-up-down` keyframes in `src/App.css` |

## Conflict classification

One conflict, and it was simple. Both sides edited `src/index.css` with compatible intents: main relocated the styles, and this branch renamed one animation. No conflicting product intent. No other files overlapped.

## Checks already done

`npm run tsc` and `npm run lint` passed after the merge. In the browser, the designs list shows the three new labels, `/designs/circle-up-down` moves the ball, and `/designs/circle-expand-contract` shows the circle with the breathe cue. The old routes show "Page not found".
