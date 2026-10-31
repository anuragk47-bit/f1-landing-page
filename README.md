# Lights Out — the Formula 1 fan hub

An unofficial Formula 1 landing page for the 2026 season. It features a full-bleed hero with a live countdown to the next Grand Prix, the complete 24-round calendar (filterable by upcoming/completed, with sprint and night-race tags), all eleven teams and their drivers, an explainer of the 2026 regulation changes, and a race-week alerts signup.

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19, deployed on Netlify
- Tailwind CSS v4 (theme tokens in `src/styles.css`)
- Netlify Forms for the race-alerts signup
- Netlify Image CDN for responsive WebP delivery of the AI-generated imagery in `public/img/`

## Run locally

```bash
pnpm install
netlify dev --port 8889   # or: pnpm dev
```

Form submissions are only processed on Netlify (or under `netlify dev`); a plain Vite server shows the error state.

## Updating season data

All calendar, team and regulation content lives in `src/data/season.ts`. Race start times are approximate UTC values — update them when the official schedule changes, and roll the file over for a new season.
