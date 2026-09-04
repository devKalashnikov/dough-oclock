# Dough O'Clock

A one-page, deterministic Neapolitan dough scheduler for weak flour (maida + 20% fine chakki atta) and a 500°C gas oven.
Tell it when you're eating; it tells you what to do right now, what to do in a few hours, and the exact grams.

- `index.html` — the whole app (engine inlined). Open it directly, or deploy the repo to Vercel.
- `engine.js` — the fermentation model (source of truth). `npm run build:local` inlines it into `index.html` and regenerates `api/_context.js`.
- `npm test` — runs 12 benchmark scenarios through the engine.
- `api/coach.js` — optional "dough coach" chat (Claude). Activates when `ANTHROPIC_API_KEY` is set in the Vercel project.
- `research/` — the research notes, the three model specs, and `DOUGH-MODEL.md` (what the app does and why).

Deploy: import this repo at vercel.com/new (framework "Other", no build command needed), then add `ANTHROPIC_API_KEY`
under Settings → Environment Variables to switch the coach on.
