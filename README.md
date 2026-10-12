# Netsworks — Vue demo build

A Vue-only replica of the Netsworks Laravel marketing site, built for static hosting
(Vercel) so it can be shown to clients without any backend.

**Stack:** Vue 3 · Vue Router 4 · Vite 7 · Tailwind CSS v4 · daisyUI 5.7.38 ·
Anime.js 4.5.0 · `@google/model-viewer` 4.3.1

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build / preview

```bash
npm run build
npm run preview    # http://localhost:4173 - serves the production build
node scripts/verify-build.mjs   # post-build sanity checks
```

## Deploy to Vercel

**Option A - CLI, straight from this folder**

```bash
npx vercel          # first run: log in and accept the defaults
npx vercel --prod   # promote to production
```

**Option B - Git**

1. Push this folder to a GitHub repo (`node_modules` and `dist` are git-ignored).
2. In Vercel: **Add New → Project → import the repo**.
3. Framework preset **Vite** (auto-detected). Build command `npm run build`, output `dist`.

`vercel.json` rewrites every path to `index.html` so deep links like `/services` and
`/about#contact` survive a refresh.

## What differs from the Laravel site

| Laravel site | This demo |
|---|---|
| Quote form posts to the server, with a session CAPTCHA, rate limiting and email | **Demo only** - validates in the browser and shows a success message. Nothing is sent. A note under the button says so. |
| Google Analytics tag | **Removed**, so demo traffic stays out of the real analytics data. |
| Blade + server-rendered pages | Vue SPA with client-side routing. |

Everything else - copy, 20-item product catalogue, themes (light/dark), 3D models,
animations, reduced-motion handling, mobile layout - is carried over unchanged.

## Notes

- Content in `src/data/` was generated directly from the Laravel project's
  `config/portfolio.php` and `config/capabilities.php`, so it is verbatim.
- Only the optimised `.glb` models are included (~2.5 MB total, not the uncompressed originals).
- `<model-viewer>` is lazy-loaded in its own chunk (~1 MB, ~300 KB gzipped) the first time a page needs it.
- To make the quote form real later, point `submit()` in `src/pages/AboutPage.vue` at a
  form service (Web3Forms, Formspree) or a Vercel serverless function.
