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

- Prefer simple, concrete code over unnecessary abstractions.
- Don't add helpers, config objects or generic patterns just to avoid small amounts of duplication.
- In React, prefer explicit JSX for small, fixed layouts over arrays of objects and loops when it's easier to read.
- Abstract when substantial logic or UI is reused, inline duplication risks bugs, or a stable interface is genuinely needed.
