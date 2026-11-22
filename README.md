# tuantla.github.io

Personal site published with GitHub Pages at <https://tuantla.github.io/>.
It is organised as a small **micro-frontend** setup: one main shell app plus independently built
micro-frontends (MFEs). Every app is a Vite + React + TypeScript + Tailwind project managed with **yarn**.

## Structure

```
/(root)                  <- served by GitHub Pages (published build output lives here)
├── app-shell/           <- MAIN app (shell)                 dev: http://localhost:5700
├── jsonviewer-mfe/      <- JSON viewer micro-frontend        dev: http://localhost:5701
├── index.html           <- published by app-shell  (yarn dist)
├── main.<hash>.js|css   <- published by app-shell  (yarn dist)
├── data/                <- published by app-shell  (yarn dist)
└── jsonviewer/          <- published by jsonviewer-mfe (yarn dist)
```

| App              | Role                                         | Dev port | Published to                           | URL                                   |
| ---------------- | -------------------------------------------- | -------- | -------------------------------------- | ------------------------------------- |
| `app-shell`      | Main app: navigation, dashboard, host pages  | `5700`   | `/` (`index.html`, `main.<hash>.*`)    | https://tuantla.github.io/            |
| `jsonviewer-mfe` | JSON viewer micro-frontend                   | `5701`   | `/jsonviewer/`                         | https://tuantla.github.io/jsonviewer/ |

## Develop

Run each app from its own folder, in its own terminal:

```bash
cd app-shell && yarn install && yarn dev          # http://localhost:5700
cd jsonviewer-mfe && yarn install && yarn dev     # http://localhost:5701
```

Other scripts: `yarn build` (type-check + build into the app's `dist/`), `yarn lint`, `yarn preview`.

## Publish

GitHub Pages serves the repository root, so each app has a `yarn dist` script that builds and copies
the runtime build to the right place in the root. Run it, then commit and push.

### app-shell

```bash
cd app-shell && yarn dist
```

Builds and publishes `index.html`, `main.<hash>.js`, `main.<hash>.css` and `data/` to `/(root)/`.
Previously published `main.*.js|css` files are removed first. The bundles are hashed for cache busting.
Uses `base: './'`.

### jsonviewer-mfe

```bash
cd jsonviewer-mfe && yarn dist
```

Exports the runtime build to `/(root)/jsonviewer/`, available at https://tuantla.github.io/jsonviewer/.
It must be built with `base: '/jsonviewer/'` so asset URLs resolve under that sub-path.

## Deploy

```bash
git add -A && git commit -m "..." && git push origin master
```

The site updates a minute or so after the push.

## Notes

- Never edit the published files in the root by hand; they are overwritten by `yarn dist`.
- Each MFE is self-contained: its own `package.json`, dependencies and build. Add a new one as
  `<name>-mfe/`, give it a unique dev port (5702, ...), `base: '/<name>/'`, and a `yarn dist` that
  publishes to `/(root)/<name>/`.
