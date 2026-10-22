# pokkit-parent

React + TypeScript app built with Vite, with [shadcn/ui](https://ui.shadcn.com) (Base UI + Tailwind v4, Nova preset).

## UI components

Configuration lives in `components.json`. Add components with the CLI:

```bash
npx shadcn add button
npx shadcn add card dialog   # multiple at once
```

Installed components are under `src/components/ui`. Use the `@/` import alias (for example `@/components/ui/button`).

## Scripts

```bash
npm install
npm run dev      # start the dev server
npm run build    # typecheck and production build
npm run preview  # serve the production build
npm run lint     # oxlint
```
