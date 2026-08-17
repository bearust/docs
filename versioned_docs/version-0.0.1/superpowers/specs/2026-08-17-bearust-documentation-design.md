# BeaRust Documentation Site Design

- Date: 2026-08-17
- Status: Approved for implementation planning
- Target site: `bearust-docs`
- Documentation language: English first
- Source boundary: `rizalord/bearust`, `main`, commit `c8ed147` (2026-08-16)

## Summary

Replace the starter Docusaurus site in `bearust-docs` with a curated developer
documentation site for BeaRust. The site will serve two audiences without
mixing their paths: developers operating BeaRust and developers contributing
to BeaRust.

The documentation will describe functionality that is implemented on the
source repository's current `main` branch. Planned functionality will be
isolated in a short roadmap section and will not appear in operational
instructions.

The recommended approach is a structured, multi-audience information
architecture with manually curated reference pages. API and configuration
reference content will be verified against the Rust routes and handlers,
frontend API types, CLI definitions, configuration model, migrations, and
integration tests. The first version will not introduce an API generator or
OpenAPI dependency.

## Goals

1. Let a developer install BeaRust and configure a working proxy without
   reading the source repository first.
2. Explain operational features such as TLS, ACME, WAF, bot protection, rate
   limiting, analytics, RBAC, clustering, plugins, and the optional AI Advisor
   with safe defaults and verification steps.
3. Provide a complete, navigable reference for every active control-plane API
   domain, including authentication, permissions, request/response examples,
   error behavior, and side effects.
4. Make the TOML configuration, environment variables, CLI commands, metrics,
   and error conventions discoverable and actionable.
5. Give contributors an accurate mental model of the data plane, control plane,
   runtime synchronization, persistence, frontend, plugin boundary, cluster
   path, and test suite.
6. Keep English as the default while making future Indonesian and Japanese
   translations straightforward through Docusaurus i18n.
7. Make documentation changes verifiable through a repeatable site build and
   a source-alignment checklist.

## Non-goals

- Documenting roadmap items as if they were available features.
- Replacing the BeaRust source repository's code comments or design history.
- Adding an OpenAPI generator before an authoritative API schema exists.
- Creating a separate versioning system disconnected from the source branch.
- Activating incomplete locale sites with untranslated content.
- Inventing a public deployment URL or hosting workflow that the repository
  owner has not selected.

## Audience and navigation model

The site will present three primary paths:

- **Use BeaRust**: installation, first-time setup, proxy configuration, and
  day-to-day operations.
- **Reference**: API, CLI, TOML, environment variables, metrics, and errors.
- **Contribute to BeaRust**: architecture, development workflow, tests,
  persistence, frontend, plugins, localization, and documentation.

The sidebar will be explicitly defined rather than relying on alphabetical
filesystem ordering.

```text
Introduction
├── What is BeaRust?
├── Architecture overview
└── Feature status

Get started
├── Installation with Docker Compose
├── First-time setup
├── Configure your first proxy
├── Run the development stack
└── Troubleshooting

Operate BeaRust
├── Proxy hosts and load balancing
├── TLS and certificates
├── ACME automation
├── WAF and IP security
├── Bot protection
├── Rate limiting
├── Analytics and observability
├── Users, roles, and audit logs
├── High availability and clustering
├── WASM plugins
└── AI Advisor

Reference
├── CLI reference
├── TOML configuration
├── Environment variables
├── Control-plane API
│   ├── Setup and authentication
│   ├── Proxy hosts and load balancer
│   ├── Certificates and ACME
│   ├── Users, roles, and sessions
│   ├── WAF, IP security, and bot protection
│   ├── Rate limiting and adaptive tuning
│   ├── Analytics and anomalies
│   ├── AI Advisor
│   ├── Cluster
│   ├── Plugins
│   └── Audit logs and events
└── Metrics and error handling

Contributing
├── Development setup
├── Repository layout
├── Runtime architecture
├── Data plane
├── Control plane and database
├── Frontend
├── Testing and CI
├── Adding a backend feature
├── Plugin SDK and authoring
├── Localization
└── Documentation workflow

Roadmap
└── Planned features
```

The homepage will route visitors to three high-value tasks: install BeaRust,
configure the first proxy host, and start contributing.

## Content model

### Task guides

Task guides will use the following order:

1. Goal and expected result.
2. Prerequisites.
3. Commands or UI actions.
4. Verification.
5. Common failures and recovery.
6. Security or operational notes.
7. Related reference pages.

For example, the first proxy guide must include a request test with an
observable result rather than stopping after a TOML edit.

### Reference pages

Reference pages will state the contract before explaining the rationale. Each
API endpoint entry will include:

- HTTP method and path.
- Authentication requirement.
- Required permission and resource scope.
- Path, query, header, and body parameters.
- Success response and status.
- Error statuses and stable error codes.
- Audit, realtime, reload, or persistence side effects.
- A safe `curl` example.
- Source pointer and related guide.

All examples will use placeholders for passwords, tokens, certificate data,
private keys, and provider credentials.

Configuration entries will include type, default, required/optional status,
valid values, dependencies, operational impact, an example, and the
`bearust validate` verification command where applicable.

### Contributor pages

Contributor pages will explain each subsystem by ownership and boundary:

- What the subsystem owns.
- Where it lives in the repository.
- Which data flows through it.
- Invariants that must remain true.
- Tests that protect it.
- The workflow for extending or changing it.

### Feature status

Pages will use explicit labels such as `Available`, `Optional`, `Disabled by
default`, `Experimental`, and `Planned`. Only source-verified behavior will be
described as available.

## API reference coverage

The API reference will cover every active route registered by
`src/control_plane/mod.rs`, grouped by domain:

- Health, setup, authentication, preferences, and theme.
- Public bot challenge flow and realtime events.
- Proxy hosts, host authentication, and load balancer.
- Certificates, ACME issuance, renewal, status, and activation.
- Users, roles, and session revocation.
- Audit logs.
- WAF configuration, rules, import/export, and feedback.
- IP security rules.
- Bot configuration, trusted crawlers, and import/export.
- Rate-limit configuration.
- Analytics summary, timeseries, dimensions, retention, baselines, and
  anomalies.
- Adaptive-tuning policies, recommendations, apply/rollback, and emergency
  disable.
- AI Advisor status, analyses, insights, and draft decisions.
- Cluster status.
- Plugin listing, reload, enable/disable, unload, and health checks.
- Prometheus metrics, including its authentication and listener behavior.

The reference will document the cookie session model and the double-submit
CSRF behavior for authenticated mutations. Public setup, login, and bot
challenge calls will be distinguished from cookie-authenticated operations.
RBAC and per-host scope behavior will be shown alongside each relevant domain,
not hidden in a separate page only.

## Architecture and data-flow documentation

The architecture overview will show the current request path:

```text
Client
  ↓
HTTP/1.1 or HTTP/2 listener
(optional HTTP/3 listener)
  ↓
IP security
  ↓
Bot protection
  ↓
WAF + optional waf.detect plugin
  ↓
Host/path route resolution
  ↓
Per-host authentication
  ↓
Rate limiting
  ↓
Load-balancer selection
  ↓
transform.request plugin
  ↓
Upstream backend
  ↓
transform.response plugin
  ↓
Client response
```

The contributor guide will explain the control-plane path:

```text
Dashboard/API request
  ↓
Session + CSRF validation
  ↓
RBAC and host-scope authorization
  ↓
Database transaction
  ↓
Audit event + realtime notification
  ↓
Runtime synchronization
  ↓
Atomic data-plane snapshot update
```

Deep dives will cover the Pingora lifecycle, `RuntimeStore`, native TOML and
database-backed runtime configuration, runtime policy stores, the Axum control
plane, migrations/repository boundaries, analytics and adaptive tuning,
WASM plugin isolation, AI worker boundaries, and Raft command replication.

The docs will distinguish native configuration, database-backed control-plane
state, runtime persistence, and cluster-replicated writes.

## Error and failure behavior

Operational guides and the error reference will describe the observable
boundary behavior:

- `403` for IP security, WAF, or bot blocking.
- `403` JSON challenge responses for bot challenge mode.
- `404` for unmatched proxy routes.
- `401` for protected proxy hosts.
- `429` with rate-limit headers when a blocking rate policy is exceeded.
- `503` when a usable upstream is unavailable.
- API validation, authorization, conflict, not-found, and database errors by
  HTTP status and stable error code.

Bounded plugin failures will be explained as traffic-continuity behavior where
the implementation fails open. Invalid configuration, invalid TLS material,
and plugin signature/trust failures will be documented as fail-closed at their
respective boundaries. Optional AI failures will be documented as out of band
and non-blocking for proxy traffic.

## Docusaurus implementation

The site will remain on Docusaurus Classic and will replace starter content
with BeaRust-branded content.

Planned site changes include:

- Update title, tagline, favicon, logo, metadata, footer, and GitHub links.
- Replace the autogenerated tutorial sidebar with the explicit structure
  above.
- Replace the starter homepage with BeaRust positioning and task links.
- Add reusable MDX patterns for notes, warnings, prerequisites, verification,
  source links, and feature status.
- Remove starter blog/tutorial content that does not describe BeaRust.
- Configure `onBrokenLinks: 'throw'` and keep the site build strict.
- Make canonical site URL, base URL, and deployment identity explicit config
  inputs with local-development-safe defaults; do not publish an invented
  public URL.

The first implementation will use manually curated Markdown/MDX pages. A
future API generator can be evaluated if BeaRust adopts an authoritative
OpenAPI or schema metadata source.

## Internationalization

The initial Docusaurus configuration will use English as the only active locale:

```text
defaultLocale: en
locales: [en]
```

The contributor documentation will explain how to add `id` and `ja` with
Docusaurus translation tooling. A locale will only become active after its
content is translated sufficiently to be a complete user experience.

## Source-of-truth mapping

The implementation will use these source locations when drafting and checking
claims:

- API routes and handlers: `src/control_plane/`.
- API models and frontend client types: `src/control_plane/models.rs` and
  `frontend/src/api.ts`.
- CLI commands: `src/cli.rs`.
- Configuration model and validation: `src/config/mod.rs`.
- Runtime and routing: `src/runtime.rs`, `src/proxy.rs`, and `src/router.rs`.
- Runtime synchronization: `src/control_plane/runtime_sync.rs`.
- Persistence and migrations: `src/control_plane/repository.rs` and
  `migrations/`.
- Plugin runtime, signing, trust, registry, and SDK:
  `src/plugin_*.rs`, `src/plugin_runtime.rs`, and
  `crates/bearust-plugin-sdk/`.
- Cluster and Raft: `src/cluster*.rs` and `src/cluster_command.rs`.
- Frontend routes/features: `frontend/src/routes/` and
  `frontend/src/features/`.
- Behavioral verification: `tests/` and frontend test files.
- Deployment and smoke checks: `Dockerfile*`, `docker-compose*.yml`, and
  `scripts/`.

## Quality gates

Before the documentation is considered complete, the implementation must pass:

```sh
npm run typecheck
npm run build
```

The build must fail on broken internal links. A source-alignment review must
also confirm:

- No starter branding or tutorial text remains.
- No unfinished placeholder content remains.
- Every active API route is represented in the API inventory.
- Every deployment guide has a verification and troubleshooting section.
- Examples do not contain real secrets.
- Feature labels match the source boundary commit.
- Contributor pages point to real files and tests.

## Maintenance policy

When an API route, request/response model, permission, configuration option,
CLI command, feature status, or deployment workflow changes, the corresponding
documentation page and its example must be reviewed in the same change.

Each documentation refresh will record the source commit used for verification
on the introduction or documentation-maintenance page. Source pointers are
navigation aids, not substitutes for explaining the behavior in the docs.

## Acceptance criteria

The design is implemented successfully when:

1. A new operator can reach a running Docker Compose deployment, initialize the
   first admin, configure a proxy, and verify traffic using only the site.
2. An operator can find the relevant guide for TLS/ACME, security controls,
   analytics, RBAC, clustering, plugins, and the optional AI Advisor.
3. A developer can find every active control-plane API domain and understand
   authentication, permission, request, response, and error behavior.
4. A contributor can set up the Rust/backend and frontend development paths,
   locate the relevant module and tests, and understand how changes flow from
   persistence to the data plane.
5. The site builds cleanly with strict link checking and contains no starter or
   unfinished content.
6. English is the default locale and the contributor workflow for adding
   Indonesian or Japanese translations is documented.

## Approved decisions

- Use the structured multi-audience approach.
- Keep English as the default language and prepare for Indonesian and Japanese.
- Document the current implementation on `main`; isolate planned work.
- Include a complete, domain-grouped API reference.
- Curate reference pages manually first; defer source generation.
- Keep the source repository as the code authority and link to it from docs.
- Treat documentation build and source-alignment checks as release gates.
