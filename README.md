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
npm run build
```

Task 9 adds the documentation validator and its `npm run validate:docs` command. `npm run build` generates the static site in `build/`.

## Translation workflow

English (`en`) is the only active site locale. Write and review English content first. Add Indonesian or Japanese only when a complete translated content set and its localized navigation are ready; do not enable a partial locale.
