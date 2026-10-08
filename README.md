# Bearust documentation

This repository contains the English-first documentation site for [Bearust](https://github.com/bearust/bearust), a Rust-native reverse proxy, load balancer, and WAF. The Bearust application source lives in its own repository; keep application changes and documentation changes in their respective repositories.

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

`npm run validate:docs` checks the public `docs/` corpus for starter content, unfinished-content markers, required pages, and route coverage against the sibling Bearust source repository's control-plane router (set `BEARUST_SOURCE_DIR` if that repository is not a sibling of this checkout). `npm run build` generates the static site in `build/`.

## Translation workflow

English (`en`) is the canonical source; write and review English content first. Indonesian (`id`) and
Japanese (`ja`) are active locales, rolled out page by page rather than all at once — an untranslated page
simply falls back to its English content under that locale's route, it does not 404. Translated Markdown
lives under `i18n/<locale>/docusaurus-plugin-content-docs/<current|version-X.Y.Z>/`, mirroring the path of
the English source in `docs/` (or `versioned_docs/version-X.Y.Z/`); short UI strings (navbar, footer, sidebar
category labels, blog metadata) live in the JSON files under `i18n/<locale>/docusaurus-theme-classic/` and
`i18n/<locale>/docusaurus-plugin-content-docs/`.

To translate a page: copy the English `.mdx` file to the matching path under
`i18n/<locale>/docusaurus-plugin-content-docs/current/`, translate it, then copy the same file into
`i18n/<locale>/docusaurus-plugin-content-docs/version-<latest>/` so the current release reads correctly too.
Preview a locale with `npm run start -- --locale id` (or `ja`), and always run the full build
(`npm run build`) before merging — it builds every configured locale and every documented version, and
`onBrokenLinks: 'throw'` catches broken links in translated content the same way it does in English.

## Versioning

This site uses full Docusaurus docs versioning. `docs/` holds the unreleased "next" content; each released
version is a frozen snapshot under `versioned_docs/version-X.Y.Z/` with its sidebar in
`versioned_sidebars/`, tracked in `versions.json`. Cut a new version after English content for a release is
finalized:

```sh
npm run docusaurus docs:version X.Y.Z
```

This snapshots `docs/` into `versioned_docs/version-X.Y.Z/`. Immediately mirror that snapshot into each
locale's i18n tree so translated versions stay available (adjust the locale list as translations expand):

```sh
for locale in id ja; do
  mkdir -p "i18n/$locale/docusaurus-plugin-content-docs/version-X.Y.Z"
  cp -r versioned_docs/version-X.Y.Z/. "i18n/$locale/docusaurus-plugin-content-docs/version-X.Y.Z/"
done
```

That gives every locale a complete (English-fallback) copy of the new version immediately; translate pages
into it incrementally afterward, the same as for `current`.

## Search

Search is provided by `@easyops-cn/docusaurus-search-local` — a build-time index with no external service,
API key, or account required. It reindexes automatically on every `npm run build` and covers every
configured locale and version.
