# Task 7 implementation report

## Status

Complete. Task 7 adds the four required English-first, locale-neutral API
reference pages for the remaining active control-plane domains and links them
from the Control-plane API sidebar and overview. Shared session, CSRF, common
error-envelope, and `/metrics` conventions remain centralized in their
existing references.

## Changed files

- `docs/reference/api/security.mdx` — WAF, IP security, bot policy/challenge,
  and rate-limit contracts, including request bounds, enums, reload/audit
  semantics, and safe local examples.
- `docs/reference/api/analytics-and-tuning.mdx` — analytics queries,
  retention, baselines, anomalies, tuning policies, recommendation lifecycle,
  and emergency disable behavior.
- `docs/reference/api/ai-advisor.mdx` — advisor status, asynchronous analysis
  jobs, owner-scoped pagination, result states/errors, and stale-safe draft
  decisions.
- `docs/reference/api/cluster-and-plugins.mdx` — safe cluster snapshot fields,
  plugin lifecycle/health contracts, encoded-ID rules, error mappings, and the
  existing `/metrics` reference link.
- `docs/reference/api/overview.mdx` — links remaining API groups to their
  dedicated pages and points to the central metrics reference.
- `sidebars.ts` — adds all four API pages to the Control-plane API sidebar.

## Commits

- `5ef214ef62df3d9d1adff045665bee1ea208a29f` — `docs: add Task 7 API reference`
- `docs: add Task 7 implementation report` — this report's commit.

## Verification

- `npm run typecheck` — passed (`tsc`, exit 0).
- `npm run build` — passed; Docusaurus generated the production `build/`
  output. Node emitted only its localStorage experimental warning.
- `git diff --check` — passed with no whitespace errors.
- Route coverage extraction from `src/control_plane/mod.rs` — all 40 active
  Task 7 `/api/...` registrations were found in the four new API pages.
- `/metrics` remains actively documented in
  `docs/reference/metrics-and-errors.mdx` and is linked from the API overview
  and cluster/plugins page.

`npm run validate:docs` was deliberately not run or created: the repository
does not define that script, and the Task 7 brief explicitly defers it until
Task 9.

## Source references

- Route registration, CSRF guard, security, analytics, adaptive-tuning, cluster,
  and Prometheus handlers: `bearust/src/control_plane/mod.rs`.
- Request/response contracts: `bearust/src/control_plane/models.rs` and
  `bearust/frontend/src/api.ts`.
- AI Advisor job, permission, redaction, pagination, draft-approval, and stale
  configuration behavior: `bearust/src/control_plane/ai_advisor.rs`,
  `bearust/src/ai_advisor.rs`, and `bearust/src/control_plane/repository.rs`.
- Plugin permission, ID validation, redaction boundary, lifecycle, and health
  errors: `bearust/src/control_plane/plugins.rs` and
  `bearust/src/plugin_runtime.rs`.
- Analytics, baseline, adaptive-tuning, bot, rate-limit, WAF, and cluster
  value/range/status definitions: `bearust/src/analytics.rs`,
  `bearust/src/baseline.rs`, `bearust/src/adaptive_tuning.rs`,
  `bearust/src/bot_protection.rs`, `bearust/src/bot_challenge.rs`,
  `bearust/src/rate_limit.rs`, `bearust/src/waf.rs`, and
  `bearust/src/cluster.rs`.
- Integration-test behavior cross-checks: `tests/control_plane_security.rs`,
  `tests/control_plane_waf.rs`, `tests/control_plane_bot.rs`,
  `tests/control_plane_rate_limit.rs`, `tests/control_plane_analytics.rs`,
  `tests/control_plane_baseline.rs`, `tests/control_plane_anomaly.rs`,
  `tests/adaptive_tuning_api.rs`, `tests/control_plane_ai_advisor.rs`,
  `tests/control_plane_cluster.rs`, and `tests/control_plane_plugins.rs`.

## Route-coverage notes

The four pages represent every active route registered for the following
Task 7 prefixes: `/api/waf`, `/api/ip-security`, `/api/bot`,
`/api/rate-limit`, `/api/analytics`, `/api/adaptive-tuning`,
`/api/ai-advisor`, `/api/cluster`, and `/api/plugins`. Shared fallbacks
(`/api`, `/api/{*path}`), prior Task 6 APIs, and the existing metrics page are
intentionally not duplicated. The security page also distinguishes the two
public, CSRF-exempt bot challenge operations from the protected bot-policy
operations.

## Self-review

- Checked route method/path pairs against the checked-in router, including all
  multi-method registrations.
- Checked handler permission guards, stable error codes, success statuses,
  body caps, enum/value bounds, audit events, realtime events, reload or
  compensation behavior, timestamp parsing, and pagination normalization.
- Kept reusable session/CSRF/error conventions in `api/overview.mdx` instead
  of restating them in each endpoint section.
- Used test-only domains, IDs, files, cookie variables, and example values;
  no production credential, token, private-key, address, or plugin path is
  included.
- Confirmed the build accepts all new MDX links and sidebar document IDs.

## Concerns

- There is no `validate:docs` script before Task 9, so the route coverage check
  was performed with the checked-in route registrations and exact literal path
  matching rather than a new validator.
- No separate review-agent capability is available in this environment; the
  source/model/test cross-check and final diff review were completed inline.

## Fix round 1

Reviewer findings were verified against the checked-in handlers before the
following focused corrections:

- Added explicit cluster policy-state outcome coverage to every applicable
  security mutation and to analytics retention, tuning-policy, and
  emergency-disable writes. The pages now distinguish `202 local_apply_pending`,
  the mapped `503` cluster codes, and `504 cluster_forward_timeout`, and state
  that normal success audit/realtime publication occurs only after policy-state
  submission succeeds.
- Corrected analytics `limit`: all three query handlers validate it, but only
  timeseries applies it; summary and dimensions aggregate all matching buckets.
- Corrected WAF matcher parsing: the matcher remains unconstrained JSON at the
  request boundary, unknown matcher members are ignored by the compiler, and
  `builtin` wins when supplied with `pattern`.
- Added `applied_at` and `previous_config_json` to the recommendation response
  contract.
- Documented `monitor-only` as an accepted bot configuration PATCH/TOML-import
  alias with canonical `monitor` output.

Fix-round verification results:

- Source handler and domain-model inspection confirmed the shared
  `submit_policy_state` path, the analytics application boundary for `limit`,
  WAF matcher precedence, recommendation fields, and bot-mode alias.
- Documentation-content checks confirmed every marked security mutation, the
  analytics policy-state outcomes, the corrected `limit` text, both returned
  recommendation fields, and the bot alias.
- `npm run typecheck` passed.
- `npm run build` passed; Node emitted only its localStorage experimental
  warning.
- `git diff --check` passed.

## Fix round 1 re-review

- Removed the internal `#route-table` fragment from the security policy-state
  explanation. The text now refers directly to the marked mutation rows, so it
  does not rely on an implicit generated heading slug.
- Verified there are no remaining `#route-table` links in `security.mdx`; the
  remaining policy-state links target the matching generated
  `cluster-policy-state-outcomes` heading slug, and the documentation build and
  whitespace checks pass.
