# Task 5 delivery report — CLI, configuration, environment, metrics, and errors

## Status

Completed in the isolated `docs/bearust-docs-site` worktree at base
`aaa22ade4a4ef51155f686fc857b4659f808e860`. This task adds only the Task 5
reference pages and navigation. It deliberately does not add control-plane API
reference pages, which remain owned by Tasks 6–7.

## Changed files

- `sidebars.ts` — makes the published CLI page the Reference landing and links
  all new Task 5 pages; the empty Control-plane API placeholder remains staged
  at the existing `intro` page until its owned pages exist.
- `docs/reference/cli.mdx` — exact command/flag/default reference and safe
  plugin-signing/registry behavior.
- `docs/reference/configuration/overview.mdx` — TOML structure, validation,
  persistence, reload, ownership, and reserved materialization prefixes.
- `docs/reference/configuration/server-and-listeners.mdx` — server, TLS,
  HTTP/3, PID, trust, health, and listener-replacement fields.
- `docs/reference/configuration/routing-and-upstreams.mdx` — pools, backends,
  routes, defaults, enum values, normalization, and validation.
- `docs/reference/configuration/security-and-observability.mdx` — native
  trust/rate-limit/Prometheus/logging settings versus DB-backed policies.
- `docs/reference/configuration/plugins-and-cluster.mdx` — plugin resource
  caps/signature setting and cluster fields, overrides, and validation.
- `docs/reference/environment-variables.mdx` — Compose, setup/database, AI,
  logging, registry, and cluster environment values.
- `docs/reference/metrics-and-errors.mdx` — `/metrics`, output bounds, JSON
  logs, proxy status behavior, and the shared error envelope.

## Commits

- `f4aef69 docs: add BeaRust reference pages` — Task 5 documentation and
  sidebar navigation.
- `docs: add task 5 delivery report` — this requested, gitignored delivery
  report, force-added without changing repository ignore rules.

## Fix round 1

Addressed all three reviewer findings with source-backed, focused corrections:

- Corrected `configuration/overview` to describe Unix `SIGHUP` as supervisor
  process replacement: candidate TOML/TLS validation, upgrade-child startup,
  readiness wait, inherited Pingora listener FDs, and old-child `SIGQUIT`
  draining. It now explains the safe behavior for invalid/unready candidates
  and the startup boundary for main bind, TLS, HTTP/3, control, and Prometheus
  listeners.
- Corrected the control-plane order in `configuration/overview`: persist the
  candidate first, apply to runtime second, restore the previous persisted
  configuration if runtime application fails, then best-effort mirror to TOML.
- Expanded the routing page snippet to include the checked-in `api-root` `/`
  route and accurately labels it as the complete routing/upstream portion of
  `config/bearust.example.toml`.

Fix-round source evidence: `src/cli.rs` lines 127–255 and 500–710;
`src/control_plane/runtime_sync.rs` lines 92–125 and 260–330; and
`config/bearust.example.toml`.

Fix-round verification:

- `npm run typecheck` — passed (`tsc`, exit 0).
- `npm run build` — passed (Docusaurus production build, exit 0; the same
  non-failing Node experimental `localStorage` warning was emitted).
- `git diff --check` — passed (no whitespace errors).

## Source references checked

- `src/cli.rs`: CLI declarations at lines 31–89; validation/reload behavior at
  107–124; database/setup startup at 276–330; listener behavior at 597–648;
  plugin command implementation at 865–1131.
- `src/config/mod.rs`: config structs/defaults at 13–447 and validation at
  448–699, including route host normalization at 706–768.
- `src/config/error.rs`: the three configuration error forms.
- `config/bearust.example.toml`: working server, pool/backend, and route
  configuration base.
- `.env.example`, `docker-compose.yml`, and `docker-compose.dev.yml`: Compose
  image/port/config, database-profile, AI, and development environment values.
- `src/analytics_prometheus.rs`: Prometheus defaults, constraints, labels, and
  complete-line output cap.
- `src/observability.rs`: JSON logging, request-completion fields, request-ID
  validation, and proxy error categories.
- `src/control_plane/mod.rs`: `/metrics` routing/auth/output behavior and the
  shared `ErrorEnvelope` shape.
- `src/control_plane/runtime_sync.rs`: database persistence, TOML mirror
  behavior, and `proxy-host-<id>` reserved pool/route materialization.
- `src/runtime.rs` and `src/reload.rs`: atomic runtime swaps and SIGHUP reload
  behavior.
- `src/ai_advisor.rs`: AI environment defaults and accepted ranges.

## Commands and results

- `npm run typecheck` — passed (`tsc`, exit 0).
- `npm run build` — passed (Docusaurus production build, exit 0). Node emitted
  its non-failing experimental `localStorage` warning.
- `git diff --check` — passed (no whitespace errors).
- `npm run validate:docs` — intentionally not run: this repository has no such
  script until Task 9, as required by the task brief.

## Self-review

- Confirmed all eight requested reference files exist and every published Task
  5 page is reachable through the Reference sidebar.
- Kept document IDs locale-neutral and prose English-first.
- Checked flags, defaults, enum spellings, range bounds, validation, Compose
  mappings, environment names, metrics behavior, and error classifications
  against source rather than plan-only claims.
- Used only paths and explicit `replace-with-...` placeholders in credential
  examples; no usable token, password, or private key was introduced.
- Kept endpoint-specific control-plane API documentation out of scope.

## Concerns

- `npm test` is not defined in `package.json`; the requested available
  verification commands are typecheck, build, and `git diff --check`.
- The Control-plane API sidebar category remains an intentional existing
  placeholder until Tasks 6–7 publish its landing and endpoint pages.
