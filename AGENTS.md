# Lights Out — agent notes

Unofficial Formula 1 fan landing page (single route) built with TanStack Start, React 19 and Tailwind v4, hosted on Netlify.

## Layout

- `src/routes/__root.tsx` — HTML shell, metadata (from `src/data/site.ts`), Google Fonts (Big Shoulders Display, Titillium Web, JetBrains Mono).
- `src/routes/index.tsx` — renders `MarketingPage`.
- `src/components/MarketingPage.tsx` — nav, hero + next-race countdown, stats, calendar (filter), team grid, 2026 rules section, footer. Sections are local components in this file.
- `src/components/AlertsForm.tsx` — race-alerts signup (Netlify Forms, AJAX POST to `/__forms.html`).
- `src/data/season.ts` — races, teams, regulations, `nextRace()` helper. Single source of truth for content.
- `src/data/site.ts` — brand name/description and form config.
- `public/__forms.html` — static registration for the `race-alerts` form. Keep its fields in sync with `AlertsForm` (`form-name`, `name`, `email`, `team`, `bot-field`).
- `public/img/` — AI-generated PNGs. Always reference them through `/.netlify/images?url=/img/<file>&w=<w>&fm=webp`, never directly.

## Conventions and decisions

- Dark "carbon" theme; custom tokens (`carbon`, `asphalt`, `kerb`, `mist`, `font-display`) and utility classes (`.headline`, `.eyebrow`, `.action`, `.kerb`, `.weave`) live in `src/styles.css`.
- Anything time-dependent (countdown, completed/upcoming status) uses `useNow()`, which is `null` on the server and first client render to avoid hydration mismatches. Dates are formatted in UTC for the same reason.
- POST forms to `/__forms.html`, not `/` — the SSR catch-all would swallow it. The form rejects responses that echo the registration HTML (plain Vite previews).
- The site is explicitly unofficial; keep the footer disclaimer and avoid official logos/trademarked artwork.
- Tests: `src/components/MarketingPage.test.tsx` (vitest + jsdom).
