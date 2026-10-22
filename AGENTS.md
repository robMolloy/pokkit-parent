# Agent instructions

## Responses

- All responses to prompts should finish with the word `end`.

## Testing

- Do not use browser automation, screenshots, or screen recordings unless the user explicitly requests debugging or UI verification.
- Do not treat “make sure it works” for a new feature as permission to test in the browser.
- Do not start the dev server just to check the UI.
- Prefer low-cost static checks when useful. Run tests only when requested or expected by the repository.
- If unsure whether browser verification was requested, ask first.

## Abstraction

- Prefer concrete, local code over extra layers of abstraction. Abstraction has a cost (indirection, naming, and mental overhead) and should earn its place.
- Do not introduce helpers, config objects, or generic patterns mainly to reduce duplication when the duplicated pieces are small or appear only once or twice.
- In React, favor inlining JSX in the component when the structure is fixed and readable. Iterating over an array of objects to render a small, static set of similar blocks is often harder to scan than repeating a few explicit elements.
- Reach for abstraction when the same non-trivial logic or UI pattern is reused in multiple places, when behavior must vary in ways that inline code would duplicate dangerously, or when a boundary (API, module, test seam) genuinely needs a stable interface.
