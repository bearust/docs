# BeaRust documentation

This repository contains the English-first documentation site for [BeaRust](https://github.com/rizalord/bearust), a configuration-driven reverse proxy and load balancer. The BeaRust application source lives at `/home/rizalord/Projects/personal/bearust`; keep application changes and documentation changes in their respective repositories.

## Requirements

- Node.js `>=20`
- npm

## Local development

Install dependencies, then run the development server:

```sh
npm install
npm run start
```

The site uses `DOCS_SITE_URL` and `DOCS_BASE_URL` when deploying behind a reverse proxy. Their development-safe defaults are `http://localhost:3000` and `/`.

## Checks and production build

Run these before handing off documentation changes:

```sh
npm run typecheck
npm run validate:docs
npm run build
```

`npm run validate:docs` checks the public `docs/` corpus for starter content, unfinished-content markers, required pages, and route coverage against the sibling BeaRust source repository's control-plane router (set `BEARUST_SOURCE_DIR` if that repository is not a sibling of this checkout). `npm run build` generates the static site in `build/`.

## Translation workflow

English (`en`) is the only active site locale. Write and review English content first. Add Indonesian or Japanese only when a complete translated content set and its localized navigation are ready; do not enable a partial locale.
