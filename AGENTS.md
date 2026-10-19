# Agent instructions

## Testing and verification

Do **not** run browser-based verification by default.

### When to test in the browser

Only use browser automation, manual UI checks, screenshots, or screen recordings when the user **explicitly** asks for debugging or verification, for example:

- They ask you to **debug** a specific bug or behavior
- They ask you to **verify**, **test in the browser**, **demo**, or **show** that something works in the UI
- They use **`/test`** or similar wording that clearly requests hands-on verification

Treat vague phrases like “make sure it works” on a **new feature** as **not** permission to open the browser unless they also ask for debug or browser verification.

### New features (default)

For new features, bug fixes, refactors, and routine tasks **unless** the user requested debug/verification above:

- Do **not** start the dev server solely to click through the UI
- Do **not** take screenshots or screen recordings unless asked
- Prefer static checks when useful and low-cost: `npm run lint`, `npm run build`, or targeted tests **only when the user asked for tests** or the repo already expects them for that change

If you are unsure whether browser verification was requested, **ask** instead of testing in the browser.

### Cloud Agents

If this run supports it, respect **`/no-test`** in the user message. Do not treat implementing a feature as an implicit request to verify it in the browser.
