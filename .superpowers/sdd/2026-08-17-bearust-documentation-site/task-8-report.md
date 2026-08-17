# Task 8 report: contributor documentation

## Status

Completed Task 8 in the isolated `bearust-docs-site` worktree. The change creates exactly eleven contributor pages, links all eleven from the explicit Contributing sidebar, and leaves the BeaRust source repository untouched.

## Changed files

- `sidebars.ts` — replaces the placeholder Contributing category with the approved contributor page order and English-first IDs.
- `docs/contributing/development-setup.mdx` — native/Compose setup, versions, ports, and production smoke prerequisites.
- `docs/contributing/repository-layout.mdx` — source-area ownership map and nearest verification coverage.
- `docs/contributing/runtime-architecture.mdx` — validated configuration, `RuntimeStore`, atomic snapshots, SIGHUP, TLS supervisor replacement, runtime persistence/materialization, and policy refresh.
- `docs/contributing/data-plane.mdx` — implemented Pingora request lifecycle with source/module test links per stage.
- `docs/contributing/control-plane-and-database.mdx` — Axum/API middleware, SQLx repository/migrations, audit/realtime, runtime sync, backend choices, and exact cluster outcomes.
- `docs/contributing/frontend.mdx` — Vite, generated TanStack routes, authenticated layout, React Query, typed API/CSRF client, theme/locale preference, demo/API modes, and tests.
- `docs/contributing/testing-and-ci.mdx` — exact CI commands and focused test selection.
- `docs/contributing/adding-a-backend-feature.mdx` — persistence/control-plane/data-plane/cluster/frontend/documentation workflow.
- `docs/contributing/plugin-sdk-and-authoring.mdx` — ABI, WASM build, fixtures, hooks, bounds, signing/trust, registry, and security boundary.
- `docs/contributing/localization.mdx` — UI locale catalogs and validation, locale-aware formatting, new locale process, and docs-site locale distinction.
- `docs/contributing/documentation.mdx` — source-pointer, commit-boundary, locale-neutral-ID, review, and available docs-site checks workflow.

## Commit

- `docs: add contributor documentation` — final Task 8 commit (its SHA is intentionally reported by Git after the report is included in the commit).

## Verification

Executed in `/home/rizalord/Projects/personal/bearust-docs/.worktrees/bearust-docs-site`:

```text
npm run typecheck  # passed: tsc exited 0
npm run build      # passed: Docusaurus generated the optimized static site
git diff --check   # passed: no whitespace errors
```

The build emitted Node's existing experimental `localStorage` availability warning but completed successfully. `npm run validate:docs` was intentionally not run: it is not present in this task's `package.json` and is explicitly scheduled for Task 9.

## Source references

Documentation claims were verified against source commit `rizalord/bearust@c8ed147cd84efc71bda8b8473486906b5616a505`, using these primary inputs:

- `DEVELOPMENT.md`, `Cargo.toml`, `rust-toolchain.toml`, `Dockerfile`, `Dockerfile.dev`, `docker-compose.yml`, and `docker-compose.dev.yml`.
- `frontend/package.json`, `frontend/vite.config.ts`, `frontend/src/main.tsx`, `frontend/src/api.ts`, `frontend/src/i18n.ts`, `frontend/src/theme.tsx`, and `frontend/scripts/validate-locales.mjs`.
- `.github/workflows/ci.yml`, `migrations/`, `scripts/`, and focused tests under `tests/`.
- `src/runtime.rs`, `src/reload.rs`, `src/cli.rs`, `src/proxy.rs`, `src/control_plane/mod.rs`, `src/control_plane/runtime_sync.rs`, `src/control_plane/repository.rs`, and `src/cluster_command.rs`.
- `crates/bearust-plugin-sdk/`, `tests/fixtures/plugins/`, `docs/PLUGIN_AUTHORING.md`, and `docs/localization.md`.

## Command and file verification

- Confirmed the exact Rust/frontend/container commands in `testing-and-ci.mdx` match `.github/workflows/ci.yml`.
- Confirmed the development Compose command, service roles, ports `8080`, `127.0.0.1:8081`, and `5183`, Node 22, Rust 1.97.1, database profile versions, and volume names against the development/production Compose files and Dockerfiles.
- Confirmed the native CLI invocation against `src/cli.rs` and `config/bearust.example.toml`.
- Confirmed all 56 immutable source pointers in `docs/contributing/` resolve to real files/directories in `/home/rizalord/Projects/personal/bearust` at the pinned source boundary.
- Confirmed `docs/contributing/` contains exactly the eleven Task 8 page filenames and each has front matter plus a top-level title.

## Self-review

- The sidebar order matches the approved architecture design and Task 8 file list.
- Runtime content describes pre-publication validation, atomic snapshot replacement, TLS listener replacement, database-authoritative persistence, proxy-host materialization, and policy-store refresh from the implementation.
- Data-plane content preserves the implemented security/routing/selection/transform/completion order and links each stage to implementation and tests.
- Cluster content distinguishes local-only writes, committed replicated writes, pending follower application, quorum failure, and unknown commit outcomes; it directs retries with the original command ID only for the unknown outcome.
- Localization content distinguishes the product UI's `en`/`id`/`ja` catalogs from the documentation site's active `en` locale and uses locale-neutral page IDs.

## Concerns

- No documentation-specific validator exists until Task 9, so source pointer verification was performed with an explicit local target check instead.
- The source checkout contains an unrelated untracked `.impeccable/` directory. It was only observed during read-only source inspection and was not modified.

## Fix round 1

### Changes

- `docs/contributing/plugin-sdk-and-authoring.mdx:16` — replaced the incorrect "there is no remote registry/download" claim. The paragraph now states that the runtime loader loads only local reviewed directories, while the CLI ships a client for a static HTTPS-hosted registry index (`src/plugin_registry.rs`) with `bearust plugin search`/`bearust plugin install` (`src/cli.rs`) that fetch the index, download a tarball, verify its SHA-256 checksum and embedded signature against the index entry, and extract it into the plugins directory. It notes the index is a catalog/transport-integrity check only (never a source of trust), that no community/operator-hosted registry exists yet (matching `docs/PLUGIN_AUTHORING.md:684`), and that the default index URL can be overridden with `--registry-url` or `BEARUST_PLUGIN_REGISTRY_URL`. Verified against `src/plugin_registry.rs` (fetch/search/find, `download_and_verify`, `extract_tarball`, `verify_signer`), `src/cli.rs:71-88` (Search/Install subcommands), `src/cli.rs:966-979` (default registry URL resolution), and `src/cli.rs:1023+` (`plugin_install`).
- `docs/contributing/control-plane-and-database.mdx:13` — rephrased "PostgreSQL/PostgreSQL alias" to "PostgreSQL (via the `postgres`/`postgresql` scheme aliases)". Verified against `src/control_plane/repository.rs:202-220` (`validate_database_url` accepts `sqlite`, `postgres`, `postgresql`, `mysql`).

### Verification

Executed in `/home/rizalord/Projects/personal/bearust-docs/.worktrees/bearust-docs-site`:

```text
npm run typecheck  # passed: tsc exited 0
npm run build      # passed: [SUCCESS] Generated static files in "build" (pre-existing experimental localStorage warning only)
git diff --check   # passed: no whitespace errors
```

`git status` shows only the two intended modified files; the BeaRust source repository was inspected read-only and remains untouched (its pre-existing untracked `.impeccable/` directory was not modified).
