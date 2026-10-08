# Bearust Documentation Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the starter Docusaurus site with an English-first, multi-audience Bearust documentation site covering current user workflows, complete active API/reference contracts, and contributor architecture.

**Architecture:** Keep Docusaurus Classic as the static-site framework. Use an explicit sidebar and focused Markdown/MDX pages grouped into Introduction, Get started, Operate, Reference, Contributing, and Roadmap. Curate API/configuration content manually from the Bearust source boundary `bearust/bearust@c8ed147`, and add a small docs validation script for starter-content, unfinished-content, and source-route coverage checks.

**Tech Stack:** Docusaurus `3.10.2`, React `19`, TypeScript `6`, MDX, `prism-react-renderer`, Node.js `>=20`, npm, and the existing `bearust` Rust source repository as the documentation source of truth.

## Global Constraints

- Documentation default locale is English; Indonesian and Japanese are future locales and are not activated until translated content is available.
- Documentation describes behavior implemented on `bearust/bearust` `main` at commit `c8ed147` (2026-08-16); planned behavior is isolated to the roadmap.
- The API reference covers every active route registered by `src/control_plane/mod.rs`, plus `/metrics` behavior.
- Each API entry includes method/path, authentication, permission/scope, request, success response, errors, side effects, a safe `curl` example, and a source pointer.
- Configuration reference includes type, default, required/optional status, valid values, dependencies, operational impact, example, and validation command where applicable.
- Examples never contain real passwords, tokens, certificates, private keys, or provider credentials.
- Docusaurus must use strict broken-link checking with `onBrokenLinks: 'throw'`.
- Internal planning files under `docs/superpowers/` are excluded from public Docusaurus content.
- Do not add an OpenAPI generator or new API-schema dependency.
- Do not invent a public docs deployment URL; canonical URL, base URL, and deployment identity are explicit configuration inputs with local-safe defaults.
- Do not modify the `bearust` source repository during documentation implementation; preserve its existing untracked `.impeccable/` directory.
- `/home/rizalord/Projects/personal/bearust-docs` is not currently a Git repository. Do not initialize one or perform commits unless the user explicitly provides Git repository setup.

---

## File map

### Site shell and tooling

- Modify: `docusaurus.config.ts` — Bearust metadata, links, strict link checking, docs exclusion, and i18n configuration.
- Modify: `sidebars.ts` — explicit public information architecture.
- Modify: `src/pages/index.tsx` — Bearust homepage and task entry points.
- Modify: `src/pages/index.module.css` — homepage layout and responsive styling.
- Modify: `src/css/custom.css` — global docs theme, code blocks, admonitions, links, and brand tokens.
- Modify: `static/img/logo.svg` — Bearust logo mark used by the navbar.
- Modify: `static/img/favicon.ico` or replace with a Bearust favicon asset — site favicon.
- Delete: `src/components/HomepageFeatures/index.tsx` and `src/components/HomepageFeatures/styles.module.css` — unused starter homepage component.
- Delete: `src/pages/markdown-page.mdx` — unused starter page.
- Modify: `README.md` — local development, build, validation, source-sync, and translation instructions for the docs site.
- Create: `scripts/validate-docs.mjs` — lightweight content and route-coverage checks.
- Modify: `package.json` — add the `validate:docs` script.

### Public documentation pages

The following files are the public content surface. Internal design specs and
implementation plans remain under `docs/superpowers/` and are excluded.

#### Introduction and getting started

- Modify: `docs/intro.mdx` — Bearust introduction and entry-point links.
- Create: `docs/introduction/what-is-bearust.mdx` — product positioning and core use cases.
- Create: `docs/introduction/architecture.mdx` — high-level data/control-plane architecture.
- Create: `docs/introduction/feature-status.mdx` — implemented, optional, disabled-by-default, experimental, and planned status.
- Create: `docs/getting-started/installation.mdx` — production Docker Compose installation.
- Create: `docs/getting-started/first-time-setup.mdx` — setup token and first administrator.
- Create: `docs/getting-started/first-proxy.mdx` — first route/backend and traffic verification.
- Create: `docs/getting-started/development-stack.mdx` — Rust watch mode and Vite API-backed frontend.
- Create: `docs/getting-started/troubleshooting.mdx` — ports, health checks, volumes, setup, database, and TLS failures.

#### Operations

- Create: `docs/operate/proxy-hosts-and-load-balancing.mdx` — proxy hosts, pools, algorithms, health checks, failover, and control-plane host materialization.
- Create: `docs/operate/tls-and-certificates.mdx` — native TLS, certificate upload, activation, reload, and storage.
- Create: `docs/operate/acme-automation.mdx` — HTTP-01, Cloudflare DNS-01, staging/production, renewal, and failure recovery.
- Create: `docs/operate/http3.mdx` — optional client-facing HTTP/3/QUIC listener and parity boundaries.
- Create: `docs/operate/waf-and-ip-security.mdx` — WAF modes/rules, IP rules, feedback, imports/exports, and safe rollout.
- Create: `docs/operate/bot-protection.mdx` — monitor/challenge/block modes, trusted crawlers, clearance, and challenge behavior.
- Create: `docs/operate/rate-limiting.mdx` — global and per-host token bucket policy, key scopes, monitor/block behavior, and tuning interactions.
- Create: `docs/operate/analytics-and-observability.mdx` — analytics, retention, baseline, anomalies, JSON logs, realtime updates, and Prometheus.
- Create: `docs/operate/users-roles-and-audit.mdx` — setup, local sessions, built-in/custom roles, scopes, audit events, and session revocation.
- Create: `docs/operate/high-availability.mdx` — cluster identity, peers, Raft status, replicated writes, quorum behavior, and keepalived boundary.
- Create: `docs/operate/wasm-plugins.mdx` — enabling, loading, lifecycle, limits, signing, trust-on-first-use, and registry installation.
- Create: `docs/operate/ai-advisor.mdx` — optional provider configuration, asynchronous workflows, redaction, approvals, and failure isolation.

#### Reference

- Create: `docs/reference/cli.mdx` — `serve`, `validate`, `reload`, and plugin subcommands.
- Create: `docs/reference/configuration/overview.mdx` — configuration precedence, validation, and TOML structure.
- Create: `docs/reference/configuration/server-and-listeners.mdx` — server binds, PID, TLS, HTTP/3, and shutdown settings.
- Create: `docs/reference/configuration/routing-and-upstreams.mdx` — pools, backends, algorithms, health checks, routes, and timeouts.
- Create: `docs/reference/configuration/security-and-observability.mdx` — proxy trust, policies, logging, metrics, and retention settings.
- Create: `docs/reference/configuration/plugins-and-cluster.mdx` — plugin and cluster configuration.
- Create: `docs/reference/environment-variables.mdx` — Compose, database, AI, setup, and cluster variables.
- Create: `docs/reference/api/overview.mdx` — base URL, response envelope, authentication model, CSRF, pagination, and API conventions.
- Create: `docs/reference/api/health-setup-auth.mdx` — health, setup, login/logout, current user, preferences, theme, and events.
- Create: `docs/reference/api/proxy-hosts-and-load-balancer.mdx` — hosts, per-host auth, and load-balancer settings.
- Create: `docs/reference/api/certificates-and-acme.mdx` — certificate upload/list/activate and ACME jobs/status/renewal.
- Create: `docs/reference/api/users-roles-and-audit.mdx` — users, roles, sessions, audit logs, permissions, and scopes.
- Create: `docs/reference/api/security.mdx` — WAF, IP security, bot protection, rate limiting, and feedback APIs.
- Create: `docs/reference/api/analytics-and-tuning.mdx` — analytics, retention, baselines, anomalies, and adaptive tuning.
- Create: `docs/reference/api/ai-advisor.mdx` — status, analysis jobs, insights, and draft approval/rejection.
- Create: `docs/reference/api/cluster-and-plugins.mdx` — cluster status and plugin management/health endpoints.
- Create: `docs/reference/metrics-and-errors.mdx` — Prometheus listener, metric limits/auth, proxy statuses, and API error codes.

#### Contributing

- Create: `docs/contributing/development-setup.mdx` — prerequisites and both local/container development paths.
- Create: `docs/contributing/repository-layout.mdx` — Rust, frontend, migrations, tests, scripts, and deployment files.
- Create: `docs/contributing/runtime-architecture.mdx` — `RuntimeStore`, reload, snapshots, and configuration ownership.
- Create: `docs/contributing/data-plane.mdx` — Pingora lifecycle, request pipeline, balancer, health, plugins, logging, and analytics.
- Create: `docs/contributing/control-plane-and-database.mdx` — Axum routes, auth/RBAC, repository/migrations, runtime sync, audit, and realtime.
- Create: `docs/contributing/frontend.mdx` — Vite, TanStack Router, API client, i18n, feature pages, and tests.
- Create: `docs/contributing/testing-and-ci.mdx` — Rust, frontend, E2E, localization, Docker, and smoke checks.
- Create: `docs/contributing/adding-a-backend-feature.mdx` — feature workflow from model/config to handler, runtime, tests, and docs.
- Create: `docs/contributing/plugin-sdk-and-authoring.mdx` — SDK, WASM ABI, manifests, hooks, limits, signing, and fixtures.
- Create: `docs/contributing/localization.mdx` — supported UI locales and translation validation workflow.
- Create: `docs/contributing/documentation.mdx` — source boundary, page patterns, source pointers, review, and i18n additions.

#### Roadmap

- Create: `docs/roadmap.mdx` — clearly separated planned work derived from the source PRD, without operational claims.

### Starter content removed from the public site

- Delete: `blog/2019-05-28-first-blog-post.mdx`.
- Delete: `blog/2019-05-29-long-blog-post.mdx`.
- Delete: `blog/2021-08-01-mdx-blog-post.mdx`.
- Delete: `blog/2021-08-26-welcome/index.mdx` and its starter image directory.
- Delete: `blog/authors.yml` and `blog/tags.yml` if the blog is removed from the navigation and no Bearust blog is introduced.
- Delete: `docs/tutorial-basics/` and `docs/tutorial-extras/` starter pages and images.
- Delete: Docusaurus starter social card and illustration assets that remain unused after branding.

## Implementation tasks

### Task 1: Replace the Docusaurus shell and public navigation

**Files:**
- Modify: `docusaurus.config.ts`
- Modify: `sidebars.ts`
- Modify: `src/pages/index.tsx`
- Modify: `src/pages/index.module.css`
- Modify: `src/css/custom.css`
- Modify: `static/img/logo.svg`
- Modify or replace: `static/img/favicon.ico`
- Delete: `src/components/HomepageFeatures/index.tsx`
- Delete: `src/components/HomepageFeatures/styles.module.css`
- Delete: `src/pages/markdown-page.mdx`
- Delete: starter blog/tutorial files listed in the file map
- Modify: `README.md`

**Interfaces:**
- Produces the Docusaurus shell and sidebar IDs consumed by every public MDX page.
- Excludes `docs/superpowers/**` from the docs plugin so internal design material is not public.
- Provides `defaultLocale: 'en'` and `locales: ['en']` for future translation work.

Because this shell task precedes the content tasks, sidebar category labels and
homepage cards may temporarily target the existing `intro` page so the site
remains buildable between commits. The content tasks must replace every such
temporary target with its final document ID before the final audit; temporary
targets are not acceptable in the completed site.

- [ ] **Step 1: Remove starter navigation and content references**

Remove the `Tutorial`, `Blog`, Facebook/Docusaurus links, starter footer labels,
starter hero copy, and starter page imports. Keep the existing Docusaurus
Classic preset and search-free dependency footprint.

- [ ] **Step 2: Configure Bearust site metadata**

Set the title to `Bearust`, use a concise reverse-proxy/load-balancer tagline,
set `favicon` and navbar logo to Bearust assets, and point the GitHub link to
`https://github.com/bearust/bearust`. Remove the starter `editUrl` values
because the docs site is separate from the source repository.

Use environment-backed deployment values with local defaults, for example:

```ts
const siteUrl = process.env.DOCS_SITE_URL ?? 'http://localhost:3000';
const baseUrl = process.env.DOCS_BASE_URL ?? '/';
```

Do not hard-code a public production URL that has not been selected.

- [ ] **Step 3: Exclude internal planning material**

Configure the docs plugin's `exclude` option so `docs/superpowers/**` does not
become public documentation. Verify that the design spec and implementation
plan do not appear in the generated route list.

- [ ] **Step 4: Define the explicit sidebar**

Replace autogenerated `tutorialSidebar` content with the approved top-level
categories and exact document IDs from the file map. Keep the API reference
grouped by domain and the contributor group separate from operations.

- [ ] **Step 5: Build the homepage entry points**

Replace the starter homepage with a Bearust hero, a short product statement,
three CTA cards/links for installation, first proxy, and contribution, and
secondary links to API/configuration reference. Keep the layout responsive and
avoid introducing a component library dependency.

- [ ] **Step 6: Establish brand and readability tokens**

Update global CSS with Bearust brand colors, readable body/code contrast,
admonition styling, table overflow handling, link states, and responsive
spacing. Use existing Docusaurus theme variables where possible instead of
rewriting the theme.

- [ ] **Step 7: Update site maintenance README**

Document Node.js `>=20`, `npm install`, `npm run start`, `npm run typecheck`,
`npm run build`, source-repository location, and the English-first translation
workflow. The `npm run validate:docs` command is added to this README by Task 9
at the same time the validator is registered.

- [ ] **Step 8: Verify the shell**

Run:

```sh
npm run typecheck
npm run build
```

Expected: both commands exit successfully; the build has no broken internal
links and no route for `docs/superpowers/**`.

### Task 2: Write the Introduction and Getting Started guides

**Files:**
- Modify: `docs/intro.mdx`
- Create: `docs/introduction/what-is-bearust.mdx`
- Create: `docs/introduction/architecture.mdx`
- Create: `docs/introduction/feature-status.mdx`
- Create: `docs/getting-started/installation.mdx`
- Create: `docs/getting-started/first-time-setup.mdx`
- Create: `docs/getting-started/first-proxy.mdx`
- Create: `docs/getting-started/development-stack.mdx`
- Create: `docs/getting-started/troubleshooting.mdx`

**Interfaces:**
- Consumes: Docker/Compose behavior from `README.md`, `DEPLOY.md`,
  `docker-compose.yml`, `docker-compose.dev.yml`, `.env.example`, and
  `config/bearust.example.toml` in `../bearust`.
- Produces: guide links consumed by the homepage and operations pages.

- [ ] **Step 1: Write the product and architecture introductions**

Explain Bearust as a configuration-driven reverse proxy/load balancer with a
Rust data plane, Axum control plane, bundled management UI, optional security,
analytics, cluster, plugin, AI, and HTTP/3 capabilities. Mark optional or
disabled-by-default systems explicitly. Link to the detailed architecture and
feature-status pages.

- [ ] **Step 2: Document production installation**

Use the verified commands:

```sh
cp .env.example .env
docker compose up -d --build
```

Explain port `8080` as the data-plane listener, loopback-only port `8081` as
the control plane/UI, named `bearust-data` and `bearust-tls` volumes, the
generated/setup token behavior, and the deterministic `BEARUST_SETUP_TOKEN`
option. Include a database-profile section for exactly one selected external
database profile and warn against deleting the old volume during migration.

- [ ] **Step 3: Document first-time setup**

Show `GET /api/setup/status` and a safe `POST /api/setup/initialize` example
with a placeholder setup token. Explain one-time initialization, first admin
creation, session cookies, and the default loopback control-plane exposure.

- [ ] **Step 4: Document the first proxy**

Use the checked-in TOML example to explain `[server]`, `[health]`,
`[[upstream_pools]]`, `[[upstream_pools.backends]]`, and `[[routes]]`. Include
host/path matching, health checks, route verification with a `Host` header,
expected `503` when a fixture backend is unavailable, and reload using
`docker compose kill -s HUP bearust`.

- [ ] **Step 5: Document the development stack**

Use:

```sh
docker compose -f docker-compose.dev.yml up --build
```

Explain backend port `8081`, frontend port `5183`, Vite `/api` proxying,
`bearust-dev-setup`, hot module reload, named development volumes, and reset
with `docker compose -f docker-compose.dev.yml down -v`.

- [ ] **Step 6: Add troubleshooting procedures**

Cover healthcheck failure, port collision, missing setup token, stale named
volumes, external database profile selection, config validation, invalid TLS,
and upstream `503`. Each procedure must include a diagnostic command and an
expected observation.

- [ ] **Step 7: Verify the getting-started section**

Run:

```sh
npm run validate:docs
npm run build
```

Expected: the guide pages build, all CTA/sidebar links resolve, and the docs
contain no starter branding or unfinished markers.

### Task 3: Write operational guides for traffic, TLS, security, and observability

**Files:**
- Create: `docs/operate/proxy-hosts-and-load-balancing.mdx`
- Create: `docs/operate/tls-and-certificates.mdx`
- Create: `docs/operate/acme-automation.mdx`
- Create: `docs/operate/http3.mdx`
- Create: `docs/operate/waf-and-ip-security.mdx`
- Create: `docs/operate/bot-protection.mdx`
- Create: `docs/operate/rate-limiting.mdx`
- Create: `docs/operate/analytics-and-observability.mdx`

**Interfaces:**
- Consumes: `src/proxy.rs`, `src/http3.rs`, `src/waf.rs`, `src/security_policy.rs`,
  `src/bot_protection.rs`, `src/rate_limit.rs`, `src/analytics.rs`,
  `src/analytics_prometheus.rs`, `docs/acme.md`, `docs/keepalived.md`, and
  existing source tests.
- Produces: operator workflows linked from the sidebar and API/reference pages.

- [ ] **Step 1: Document proxy hosts and load balancing**

Explain host/path resolution, round-robin, least-connections, plugin-based
selection, TCP/HTTP health checks, backend timeouts, passive health, connect
failure retry behavior, and the distinction between native TOML routes and
control-plane proxy-host records.

- [ ] **Step 2: Document TLS and certificate lifecycle**

Explain native `[server.tls]`, mounted certificate paths, non-root container
permissions, certificate upload/activation, persistent certificate storage,
reload behavior, and how an invalid certificate is rejected before serving.

- [ ] **Step 3: Document ACME safely**

Cover staging before production, `http01` versus `cloudflare_dns01`, hostname
validation, Cloudflare token handling, challenge reachability, issuance jobs,
renewal state, and recovery from failed attempts. Keep provider credentials in
environment or request placeholders only.

- [ ] **Step 4: Document HTTP/3 boundaries**

State that HTTP/3 is optional, requires existing TLS, uses UDP, shares the
certificate and edge policy path, advertises `Alt-Svc`, and forwards to
upstreams over HTTP/1.1 or HTTP/2. Include WAF, bot, rate-limit, analytics,
and plugin parity plus the deliberate lack of upstream HTTP/3.

- [ ] **Step 5: Document WAF and IP security rollout**

Explain monitor-only versus block behavior, rule actions, built-in/custom
rules, matcher JSON, import/export, feedback labels, CIDR rules, country
fields, safe monitor-first rollout, and observable `403` behavior.

- [ ] **Step 6: Document bot protection**

Explain monitor/challenge/block modes, threshold/TTL, trusted crawler records,
fingerprint/clearance flow, challenge endpoint behavior, cache controls, and
why client headers alone do not prove crawler origin.

- [ ] **Step 7: Document rate limiting**

Explain token-bucket capacity/refill, monitor versus block, host-IP versus
host-path-IP scopes, trusted proxy client IP resolution, `429` response headers,
and per-host policy updates without listener restart.

- [ ] **Step 8: Document analytics and observability**

Cover status/latency/security counters, dimensions, retention, baseline warm-up,
anomaly acknowledgement, JSON logs, request IDs, realtime events, and
Prometheus authentication/listener options without claiming unsupported
dashboards or retention guarantees.

- [ ] **Step 9: Verify operations pages**

Run:

```sh
npm run validate:docs
npm run build
```

Expected: all operations pages build and contain a verification or observable
outcome for each workflow.

### Task 4: Write operational guides for administration, HA, plugins, and AI

**Files:**
- Create: `docs/operate/users-roles-and-audit.mdx`
- Create: `docs/operate/high-availability.mdx`
- Create: `docs/operate/wasm-plugins.mdx`
- Create: `docs/operate/ai-advisor.mdx`

**Interfaces:**
- Consumes: `src/control_plane/auth.rs`, `src/control_plane/rbac.rs`,
  `src/control_plane/audit.rs`, `src/cluster*.rs`, `src/cluster_command.rs`,
  `src/plugin_runtime.rs`, `src/plugin_signing.rs`, `src/plugin_trust.rs`,
  `src/plugin_registry.rs`, `docs/PLUGIN_AUTHORING.md`, and AI Advisor source.
- Produces: operational guides linked to corresponding reference domains.

- [ ] **Step 1: Document users, roles, scopes, and audit**

Include built-in `admin`, `operator`, and `viewer` capabilities, custom role
permissions, per-host scopes, last-admin safeguards, disabled-session
behavior, password/session redaction, audit ordering/filtering, and the
read-only nature of audit history.

- [ ] **Step 2: Document cluster and HA operations**

Explain standalone versus configured peers, `NODE_ID`, `CLUSTER_PEERS`,
`CLUSTER_AUTH_TOKEN`, authenticated peer transport, Raft leader/follower
status, quorum readiness, replicated configuration writes, retrying unknown
commit outcomes with the same command ID, and the keepalived host-level
boundary.

- [ ] **Step 3: Document the plugin lifecycle**

Cover disabled-by-default configuration, immediate-child plugin directories,
manifest/module requirements, limits, hook capabilities, reload/enable/
disable/unload, safe status/error codes, signing commands, trust-on-first-use,
manual key rotation, registry checksum verification, and the distribution
channel threat-model boundary.

- [ ] **Step 4: Document AI Advisor**

Explain required provider variables, OpenAI-compatible endpoint expectations,
redaction, bounded queue/timeout/circuit behavior, supported workflows, async
job states, draft approval/rejection, stale/expired behavior, and the invariant
that provider failure never blocks proxy traffic.

- [ ] **Step 5: Verify administration pages**

Run:

```sh
npm run validate:docs
npm run build
```

Expected: no page presents an optional subsystem as mandatory and all security
guides contain a clear boundary or warning where relevant.

### Task 5: Write CLI, configuration, environment, metrics, and error reference

**Files:**
- Create: `docs/reference/cli.mdx`
- Create: `docs/reference/configuration/overview.mdx`
- Create: `docs/reference/configuration/server-and-listeners.mdx`
- Create: `docs/reference/configuration/routing-and-upstreams.mdx`
- Create: `docs/reference/configuration/security-and-observability.mdx`
- Create: `docs/reference/configuration/plugins-and-cluster.mdx`
- Create: `docs/reference/environment-variables.mdx`
- Create: `docs/reference/metrics-and-errors.mdx`

**Interfaces:**
- Consumes: `src/cli.rs`, `src/config/mod.rs`, `src/config/error.rs`,
  `config/bearust.example.toml`, `.env.example`, Compose files, `src/observability.rs`,
  `src/analytics_prometheus.rs`, and `src/control_plane/mod.rs`.
- Produces: reference pages linked from guides and the API overview.

- [ ] **Step 1: Document CLI commands**

Document exact defaults and examples for:

```text
bearust serve [--config <path>] [--json-logs]
bearust validate [--config <path>]
bearust reload [--pid-file <path>]
bearust plugin keygen --out <directory>
bearust plugin sign <plugin-directory> --key <path>
bearust plugin search <query> [--registry-url <url>]
bearust plugin install <id> --out <directory> [--yes] [--force] [--registry-url <url>]
```

Include key-file overwrite protection, Unix permissions, registry confirmation,
and safe failure behavior.

- [ ] **Step 2: Document configuration structure and precedence**

Explain the config path default, TOML validation, runtime persistence, control-
plane materialization, reload behavior, reserved control-plane route/pool
names, and which settings require a process/listener replacement.

- [ ] **Step 3: Document server/listener fields**

Use exact names and defaults from `src/config/mod.rs` for binds, control bind,
database path, PID path, certificate store, graceful shutdown, native TLS,
trusted proxy CIDRs, Prometheus, and HTTP/3. Mark dependencies such as HTTP/3
requiring TLS.

- [ ] **Step 4: Document pools, backends, and routes**

Describe exact enum values and validation for algorithms, health-check kinds,
timeouts, passive health, backend weights, host normalization, path prefixes,
and duplicate/conflicting routes. Include the checked-in example as the base
working configuration.

- [ ] **Step 5: Document security, observability, plugins, and cluster settings**

Separate native TOML settings from database-backed control-plane policies. Show
plugin resource caps, signature requirement, registry directory, cluster peer
format, timeouts, and auth token requirements without exposing actual secrets.

- [ ] **Step 6: Document environment variables**

Group variables by Compose ports/image/config, setup/database, AI provider,
logging, and cluster. Explain that `DATABASE_URL` selects SQLite/Postgres/MySQL,
profiles provision dependencies, migrations run at startup, and credentials
must be redacted from diagnostics.

- [ ] **Step 7: Document metrics and errors**

Document `/metrics` availability, dedicated-listener behavior, auth requirement,
output cap, JSON log fields/request IDs, proxy status mapping, and shared API
error envelope. Separate client errors, upstream errors, config errors, plugin
errors, and cluster write errors.

- [ ] **Step 8: Verify reference pages**

Run:

```sh
npm run validate:docs
npm run build
```

Expected: every reference page contains exact names from source files and no
example includes a usable credential.

### Task 6: Write the core API reference pages

**Files:**
- Create: `docs/reference/api/overview.mdx`
- Create: `docs/reference/api/health-setup-auth.mdx`
- Create: `docs/reference/api/proxy-hosts-and-load-balancer.mdx`
- Create: `docs/reference/api/certificates-and-acme.mdx`
- Create: `docs/reference/api/users-roles-and-audit.mdx`

**Interfaces:**
- Consumes: route registrations and handlers in `src/control_plane/mod.rs`,
  auth/RBAC modules, `src/control_plane/models.rs`, `frontend/src/api.ts`, and
  control-plane integration tests.
- Produces: stable API route documentation used by operations and contributor pages.

- [ ] **Step 1: Establish API conventions**

Document base URL examples for `http://127.0.0.1:8081`, JSON response/error
shape, cookie handling with `curl -c`/`-b`, CSRF cookie/header behavior,
public endpoint exceptions, pagination conventions, `204 No Content`, and
redaction boundaries.

- [ ] **Step 2: Document health, setup, auth, preferences, theme, and events**

Include exact method/path tables and examples for `/api/health`, setup status
and initialization, login/logout/me, locale/theme preference updates, and
`/api/events`. State which endpoints are public, which create sessions, and
which mutations require CSRF protection.

- [ ] **Step 3: Document proxy hosts, host auth, and load balancer**

For each endpoint, list request fields and response types from `api.ts` and
models. Explain create/update/delete permission differences, host scopes,
validation/conflict responses, host Basic Auth configuration, and load-balancer
configuration updates.

- [ ] **Step 4: Document certificates and ACME**

Include multipart field names for upload, certificate activation, ACME request
fields, staging/production behavior, challenge values, job/status responses,
renewal errors, and permission requirements.

- [ ] **Step 5: Document users, roles, sessions, and audit logs**

Include user and role CRUD, session revocation, built-in/custom permissions,
scope objects, last-enabled-admin constraints, audit query parameters,
pagination, actor labels, and redaction guarantees.

- [ ] **Step 6: Verify core API coverage**

Check every route string in `src/control_plane/mod.rs` for the domains covered
by these pages. Then run:

```sh
npm run validate:docs
npm run build
```

Expected: route coverage passes and examples use only local/test placeholders.

### Task 7: Write the security, analytics, AI, cluster, and plugin API reference

**Files:**
- Create: `docs/reference/api/security.mdx`
- Create: `docs/reference/api/analytics-and-tuning.mdx`
- Create: `docs/reference/api/ai-advisor.mdx`
- Create: `docs/reference/api/cluster-and-plugins.mdx`

**Interfaces:**
- Consumes: `src/control_plane/mod.rs`, security/analytics/adaptive-tuning/AI/
  cluster/plugin handlers, `src/control_plane/models.rs`, `frontend/src/api.ts`,
  and matching integration tests.
- Produces: complete reference for the remaining active API routes.

- [ ] **Step 1: Document security APIs**

Cover WAF config/rules/import/export/feedback, IP security rules, bot config/
trusted crawlers/challenge endpoints/import/export, and rate-limit config. For
each endpoint include exact enum values, input limits, permissions, success
status, stable errors, audit/reload behavior, and safe examples.

- [ ] **Step 2: Document analytics and adaptive tuning APIs**

Cover summary/timeseries/dimensions queries, retention updates, baseline windows
and warm-up status, anomaly filters/acknowledgement, tuning policy fields,
recommendation apply/rollback, and emergency disable. Explain timestamp and
pagination/limit semantics exactly as implemented.

- [ ] **Step 3: Document AI Advisor APIs**

Cover status, analysis request workflows, optional host/time range/command
fields, job state/result/error fields, insight listing pagination, draft
approval/rejection, stale configuration protection, and permission boundaries.

- [ ] **Step 4: Document cluster and plugin APIs**

Cover cluster status fields, peer health/raft role/quorum fields, plugin list/
reload/enable/disable/unload/health-check, encoded IDs, status/error codes,
permissions, audit behavior, and disabled-plugin behavior.

- [ ] **Step 5: Verify remaining API coverage**

Run the route coverage validator and inspect the extracted route list against
the grouped API pages. Then run:

```sh
npm run validate:docs
npm run build
```

Expected: every active `/api/...` route and `/metrics` is represented in the
API reference corpus, with any shared convention documented centrally.

### Task 8: Write contributor documentation

**Files:**
- Create: `docs/contributing/development-setup.mdx`
- Create: `docs/contributing/repository-layout.mdx`
- Create: `docs/contributing/runtime-architecture.mdx`
- Create: `docs/contributing/data-plane.mdx`
- Create: `docs/contributing/control-plane-and-database.mdx`
- Create: `docs/contributing/frontend.mdx`
- Create: `docs/contributing/testing-and-ci.mdx`
- Create: `docs/contributing/adding-a-backend-feature.mdx`
- Create: `docs/contributing/plugin-sdk-and-authoring.mdx`
- Create: `docs/contributing/localization.mdx`
- Create: `docs/contributing/documentation.mdx`

**Interfaces:**
- Consumes: `DEVELOPMENT.md`, `Cargo.toml`, `rust-toolchain.toml`, frontend
  package scripts, `.github/workflows/ci.yml`, tests, migrations, plugin SDK,
  existing `docs/PLUGIN_AUTHORING.md`, and the approved architecture design.
- Produces: contributor onboarding and extension guidance linked from the
  Contributing sidebar.

- [ ] **Step 1: Document development setup**

Cover Rust `1.97.1`, Node `22` for frontend/container workflows, local Cargo
commands, frontend npm commands, production Compose smoke prerequisites, and
the one-command development Compose stack. State which services and ports each
path starts.

- [ ] **Step 2: Document repository layout**

Map `src/`, `crates/bearust-plugin-sdk/`, `frontend/`, `migrations/`, `tests/`,
`config/`, Dockerfiles, Compose files, CI, and scripts. For each area state its
responsibility and its closest verification tests.

- [ ] **Step 3: Document runtime architecture**

Explain config load/validate, `RuntimeStore`, atomic snapshots, SIGHUP reload,
supervisor replacement for TLS, control-plane runtime persistence, proxy-host
materialization, and policy-store refresh.

- [ ] **Step 4: Document data-plane lifecycle**

Use the implemented request order: IP security, bot evaluation, WAF/header and
body inspection, route resolution, per-host auth, rate limiting, peer selection,
request transform, protected-header reassertion, upstream, response transform,
logging, analytics, and failover/error handling. Link each stage to its source
module and tests.

- [ ] **Step 5: Document control plane and database**

Explain Axum route construction, session/RBAC/CSRF middleware, repository
boundary, migration startup, audit/realtime events, runtime sync, database
backend options, and Raft command gateway behavior. Distinguish local writes,
replicated writes, pending local apply, quorum failure, and unknown commit
outcome.

- [ ] **Step 6: Document the frontend**

Explain Vite, TanStack Router route groups, authenticated layout, React Query,
the typed `frontend/src/api.ts` client, CSRF headers, locale/theme preference,
feature pages, tests, demo mode, and API-backed development mode.

- [ ] **Step 7: Document testing and CI**

Use the exact CI commands:

```sh
cargo fmt --all -- --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test --workspace --locked
npm ci --prefix frontend
npm test --prefix frontend -- --run
npm run build --prefix frontend
npm run validate-locales --prefix frontend
npm run test:e2e --prefix frontend
docker compose config
docker compose -f docker-compose.dev.yml config
docker build -t bearust:test .
docker run --rm bearust:test --version
```

Map feature tests such as proxy, control-plane, plugin, cluster, TLS, WAF,
frontend, E2E, and smoke scripts to the appropriate change type.

- [ ] **Step 8: Document backend feature workflow**

Give a concrete sequence: identify ownership, add/alter model/config, add
migration when persistence changes, implement repository/API/runtime behavior,
add unit/integration tests, update frontend/API types if exposed, update docs,
run focused tests, then run CI-equivalent checks.

- [ ] **Step 9: Document plugin SDK and authoring**

Adapt the existing plugin authoring guide into a contributor-friendly flow:
manifest, ABI, Rust-to-WASM build, fixture layout, hook contracts, bounded
inputs/outputs, resource limits, signing/trust, registry behavior, and the
security boundary. Link to the public operator plugin guide.

- [ ] **Step 10: Document localization and docs workflow**

Explain current UI locales `en`, `id`, and `ja`, translation JSON files,
`validate-locales`, locale-aware formatting, adding a new locale, and updating
docs with source pointers and the verified source commit. State that the docs
site itself activates only translated locales.

- [ ] **Step 11: Verify contributor pages**

Run:

```sh
npm run validate:docs
npm run build
```

Expected: every referenced repository file exists in `../bearust` and all
contributor commands match the source CI/development files.

### Task 9: Add roadmap, feature-status, and docs validation tooling

**Files:**
- Modify: `docs/introduction/feature-status.mdx`
- Create: `docs/roadmap.mdx`
- Create: `scripts/validate-docs.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `../bearust/docs/PRD.md`, source route strings in
  `../bearust/src/control_plane/mod.rs`, public `docs/` content, and the
  approved feature-status policy.
- Produces: `npm run validate:docs`, used by the README, contributor workflow,
  and final verification.

- [ ] **Step 1: Classify implemented versus planned features**

Compare the current implementation and tests with the PRD. Put only source-
verified current capabilities in `feature-status.mdx`. Put future or not-yet-
implemented items in `roadmap.mdx`, using wording that clearly says they are
not available in the documented source boundary.

- [ ] **Step 2: Implement docs-content checks**

Create `scripts/validate-docs.mjs` that:

1. Recursively reads public `docs/` Markdown/MDX while excluding
   `docs/superpowers/`.
2. Fails if starter branding strings remain: `My Site`, `Dinosaurs are cool`,
   `Docusaurus Tutorial`, Facebook/Docusaurus template links, or the default
   tutorial copy.
3. Fails if unfinished markers remain as standalone words.
4. Fails if the approved required page paths are missing.
5. Reads `../bearust/src/control_plane/mod.rs` by default, or the path in
   `BEARUST_SOURCE_DIR`, extracts registered `/api/...` route strings and
   `/metrics`, ignores only the generic `/api` and `/api/{*path}` fallback
   routes, and verifies every remaining route string appears in the
   `docs/reference/api/` corpus.
6. Prints each missing page/route before exiting non-zero; otherwise prints a
   short pass summary.

Use Node's built-in `fs`, `path`, and `url` modules only; do not add a runtime
dependency.

- [ ] **Step 3: Register the validator**

Add:

```json
"validate:docs": "node scripts/validate-docs.mjs"
```

to `package.json` scripts.

- [ ] **Step 4: Run the validator against the sibling source repository**

Run:

```sh
npm run validate:docs
```

Expected: pass with the current `../bearust` checkout and report the number of
public pages and route strings checked.

- [ ] **Step 5: Verify roadmap isolation**

Run:

```sh
npm run validate:docs
npm run build
```

Expected: roadmap content is linkable but does not appear in any getting-started
or operations page, and internal planning files remain excluded.

### Task 10: Perform final source-alignment audit and site verification

**Files:**
- Modify: any public page that fails the audit.
- Modify: `README.md` if commands or maintenance guidance are inaccurate.
- Modify: `scripts/validate-docs.mjs` if a deterministic check is missing.

**Interfaces:**
- Consumes: all public docs, `../bearust@c8ed147`, the design spec, and the
  implementation plan.
- Produces: a verified docs site ready for user handoff.

- [ ] **Step 1: Check all API domains against source**

Compare route registrations, handler input structs, output structs, permission
checks, error codes, frontend client types, and matching tests. Correct any
page that describes a field, status, default, or side effect not supported by
the source.

- [ ] **Step 2: Check configuration and CLI claims**

Compare every configuration field and CLI flag in the docs with
`src/config/mod.rs`, `config/bearust.example.toml`, `.env.example`, Compose
files, and `src/cli.rs`. Remove claims that only appear in the PRD or stale
source docs.

- [ ] **Step 3: Check contributor source links**

Resolve every source pointer and test path in contributor pages against the
current sibling checkout. Replace broad or ambiguous pointers with the focused
file/module that owns the behavior.

- [ ] **Step 4: Run all docs quality gates**

Run:

```sh
npm run typecheck
npm run validate:docs
npm run build
```

Expected: all commands exit `0`; no broken links, starter content, missing
routes, unfinished markers, or excluded internal pages are reported.

- [ ] **Step 5: Review generated output manually**

Serve the built site:

```sh
npm run serve
```

Check the homepage, sidebar expansion, code block readability, tables on a
narrow viewport, API page navigation, admonitions, GitHub link, and 404 behavior.

- [ ] **Step 6: Record the verification boundary**

Update the introduction or documentation-maintenance page with the exact
source commit and verification date used by the final audit. Do not claim that
the docs describe newer or unverified source changes.

- [ ] **Step 7: Hand off the result**

Report the public docs path, verification commands and outcomes, the fact that
the workspace is not under Git, and any source or deployment choice that still
requires the user's repository setup.

## Plan self-review

### Spec coverage

- English-first and future i18n: Tasks 1, 8, and 9.
- Current-main source boundary and roadmap isolation: Tasks 2, 9, and 10.
- Multi-audience information architecture: Tasks 1–8.
- Complete API reference: Tasks 6, 7, 9, and 10.
- TOML, environment, CLI, metrics, and errors: Task 5.
- Data/control-plane architecture and contributor onboarding: Task 8.
- Error behavior, security boundaries, and optional feature isolation: Tasks 3,
  4, 5, 7, and 8.
- Strict build and source-alignment quality gates: Tasks 1, 9, and 10.
- Internal spec/plan exclusion from public docs: Task 1.

### Consistency checks

- All page IDs referenced by the planned sidebar are named in the file map.
- The validator's route source is the same `src/control_plane/mod.rs` named in
  the spec and the API tasks.
- The plan uses `npm run typecheck`, `npm run validate:docs`, and `npm run build`
  consistently as docs-site gates.
- The plan does not add an OpenAPI dependency or change the Bearust source.
- The plan does not initialize or assume Git metadata in `bearust-docs`.
