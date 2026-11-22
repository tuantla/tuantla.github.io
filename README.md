# tuantla.github.io

Personal site published with GitHub Pages at <https://tuantla.github.io/>.
It is organised as a small **micro-frontend** setup: one main shell app plus independently built
micro-frontends (MFEs). Every app is a Vite + React + TypeScript + Tailwind project managed with **yarn**.

## Structure

```
/(root)                  <- served by GitHub Pages (published build output lives here)
├── app-shell/           <- MAIN app (shell)                 dev: http://localhost:5700
├── jsonviewer-mfe/      <- JSON viewer micro-frontend        dev: http://localhost:5701
├── lunar-calendar-mfe/  <- Vietnamese lunar calendar         dev: http://localhost:5702
├── index.html           <- published by app-shell  (yarn dist)
├── main.<hash>.js|css   <- published by app-shell  (yarn dist)
├── data/                <- published by app-shell  (yarn dist)
├── jsonviewer/          <- published by jsonviewer-mfe (yarn dist)
└── lunar-calendar/      <- published by lunar-calendar-mfe (yarn dist)
```

| App              | Role                                         | Dev port | Published to                           | URL                                   |
| ---------------- | -------------------------------------------- | -------- | -------------------------------------- | ------------------------------------- |
| `app-shell`      | Main app: navigation, dashboard, host pages  | `5700`   | `/` (`index.html`, `main.<hash>.*`)    | https://tuantla.github.io/            |
| `jsonviewer-mfe` | JSON viewer micro-frontend                   | `5701`   | `/jsonviewer/`                         | https://tuantla.github.io/jsonviewer/ |
| `lunar-calendar-mfe` | Vietnamese lunar calendar (1800-2199), responsive / iPhone friendly | `5702` | `/lunar-calendar/` | https://tuantla.github.io/lunar-calendar/ |

## Environment files

Each app has two committed env files (URLs only, no secrets). `vite.config.ts` derives the dev **port** and
the **base path** from `VITE_PUBLIC_URL`, so nothing is hardcoded.

| App              | `.env.local` &mdash; `yarn dev`                                  | `.env.prd` &mdash; `yarn dist` (`--mode prd`)                       |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| `app-shell`      | `VITE_PUBLIC_URL=http://localhost:5700`<br>`VITE_JSONVIEWER_URL=http://localhost:5701`<br>`VITE_LUNAR_CALENDAR_URL=http://localhost:5702` | `VITE_PUBLIC_URL=https://tuantla.github.io`<br>`VITE_JSONVIEWER_URL=https://tuantla.github.io/jsonviewer`<br>`VITE_LUNAR_CALENDAR_URL=https://tuantla.github.io/lunar-calendar` |
| `jsonviewer-mfe` | `VITE_PUBLIC_URL=http://localhost:5701`<br>`VITE_APP_SHELL_URL=http://localhost:5700`  | `VITE_PUBLIC_URL=https://tuantla.github.io/jsonviewer`<br>`VITE_APP_SHELL_URL=https://tuantla.github.io` |
| `lunar-calendar-mfe` | `VITE_PUBLIC_URL=http://localhost:5702`<br>`VITE_APP_SHELL_URL=http://localhost:5700` | `VITE_PUBLIC_URL=https://tuantla.github.io/lunar-calendar`<br>`VITE_APP_SHELL_URL=https://tuantla.github.io` |

- Base path = pathname of `VITE_PUBLIC_URL` (`/` on localhost, `/jsonviewer/` on GitHub Pages).
- The ports are strict: `yarn dev` fails if 5700/5701 is already in use.
- Vite gives `.env.prd` priority over `.env.local` when building with `--mode prd`.

## How the apps link together

Plain links between separate apps (no embedding):

- `app-shell` &rarr; Apps page has **JsonViewer** and **Lunar Calendar** cards linking to `VITE_JSONVIEWER_URL` / `VITE_LUNAR_CALENDAR_URL`.
- each MFE &rarr; a **Home** icon in its toolbar links back to `VITE_APP_SHELL_URL`.

## Develop

Run each app from its own folder, in its own terminal:

```bash
cd app-shell && yarn install && yarn dev          # http://localhost:5700
cd jsonviewer-mfe && yarn install && yarn dev     # http://localhost:5701
cd lunar-calendar-mfe && yarn install && yarn dev # http://localhost:5702
```

Start both to test the links between them. Other scripts: `yarn build` (type-check + build into the app's
`dist/`, uses `.env.local`), `yarn lint`, `yarn preview`.

## Publish

GitHub Pages serves the repository root, so each app has a `yarn dist` script that builds and copies
the runtime build to the right place in the root. Run it, then commit and push.

### app-shell

```bash
cd app-shell && yarn dist
```

Builds with `.env.prd` and publishes `index.html`, `main.<hash>.js`, `main.<hash>.css` and `data/` to `/(root)/`.
Previously published `main.<hash>.js|css` files are removed first. The bundles are hashed for cache busting.

### jsonviewer-mfe

```bash
cd jsonviewer-mfe && yarn dist
```

Builds with `.env.prd` and exports the runtime build to `/(root)/jsonviewer/` (replacing the folder), available at
https://tuantla.github.io/jsonviewer/. Asset URLs resolve under `/jsonviewer/` because `VITE_PUBLIC_URL` ends in `/jsonviewer`.

### lunar-calendar-mfe

```bash
cd lunar-calendar-mfe && yarn dist
```

Same flow, published to `/(root)/lunar-calendar/`. The lunar algorithm is in `src/lib/lunar.ts` (data tables in
`lunarData.ts`), ported from Ho Ngoc Duc's `amlich-hnd.js` (free for personal, non-commercial use with the
copyright notice kept, which the file does). It was checked against the original for every day 1800-2199.

## Deploy

```bash
git add -A && git commit -m "..." && git push origin master
```

The site updates a minute or so after the push.

## Notes

- Never edit the published files in the root by hand; they are overwritten by `yarn dist`.
- Each MFE is self-contained: its own `package.json`, dependencies and build. Add a new one as
  `<name>-mfe/` with `.env.local` (`VITE_PUBLIC_URL=http://localhost:5702`, ...) and `.env.prd`
  (`VITE_PUBLIC_URL=https://tuantla.github.io/<name>`), a `yarn dist` that publishes to `/(root)/<name>/`,
  and add its URL to `app-shell`'s env files.
