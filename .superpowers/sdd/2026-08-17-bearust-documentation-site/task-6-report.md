# Task 6 report — core API reference pages

## Status

Completed in the isolated `bearust-docs-site` worktree. The public reference
now has five English-first, stable-ID core control-plane API pages and the
Reference sidebar links to them. No BeaRust source files, no files under
`/home/rizalord/Projects/personal/bearust/.impeccable`, and no Task 7-owned
API pages were modified.

## Changed files

- `docs/reference/api/overview.mdx` — base URL, error envelope, cookie and
  CSRF workflow, public/authenticated boundaries, permission scope context,
  pagination, `204`, redaction boundary, SSE behavior, API fallback, and
  local/test-only placeholders.
- `docs/reference/api/health-setup-auth.mdx` — health, setup status and
  initialization, login/logout/current user, locale/theme preferences, and
  authenticated events.
- `docs/reference/api/proxy-hosts-and-load-balancer.mdx` — proxy-host CRUD,
  per-host Basic Auth, scoped authorization, live load-balancer read/write
  configuration, runtime fields, validation, conflicts, and reload failures.
- `docs/reference/api/certificates-and-acme.mdx` — certificate list/upload/
  activation, multipart field names and limits, ACME issue/renew/status,
  environments, challenges, job/status fields, and write-only secret handling.
- `docs/reference/api/users-roles-and-audit.mdx` — user/role CRUD, session
  revocation, built-in/custom permissions, host scopes, last-admin guard,
  audit parameters/pagination/actor labels, ordering, and redaction.
- `sidebars.ts` — populated the Control-plane API category and linked its
  overview to the published pages.

## Commit hashes

- Required base: `84d7714b1222c4bae89c297476129c792264ae23`
- Core API reference implementation: `d9f6307` (`docs: add core control-plane API reference`)

## Verification

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed (exit 0). |
| `npm run build` | Passed (exit 0); Docusaurus generated `build`. Node emitted only its localStorage experimental warning. |
| `git diff --cached --check` before the implementation commit | Passed with no whitespace errors. |
| Manual route-string audit | Passed: all 26 Task 6 route strings were present in the five reference pages; these expand to 36 documented method/path operations. |
| `npm run validate:docs` | Intentionally not run: `package.json` has no `validate:docs` script until Task 9, per task instruction. No replacement validator was invented. |

The final successful build also checked the new sidebar document IDs and
internal MDX links with strict broken-link handling.

## Source references inspected

- `bearust/src/control_plane/mod.rs` — all route registrations, API fallbacks,
  CSRF guard, and handlers for every Task 6 endpoint.
- `bearust/src/control_plane/auth.rs` — session creation/revocation, cookie
  attributes, credential/rate-limit failures, and CSRF-cookie issuance.
- `bearust/src/control_plane/rbac.rs` — built-in role permission behavior,
  permission keys, global resources, and proxy-host resource contexts.
- `bearust/src/control_plane/models.rs` — setup/login/user/role/audit,
  proxy-host/host-auth/load-balancer, certificate, and ACME request/response
  models.
- `bearust/frontend/src/api.ts` — browser client field names and supported
  enum values for the documented resource types.
- `bearust/src/control_plane/repository.rs` and
  `bearust/src/control_plane/audit.rs` — audit page ordering, actor labels,
  safe-detail sanitization, and best-effort publication.
- `bearust/src/certificates/acme_service.rs` and `bearust/src/acme/client.rs`
  — write-only Cloudflare-token handling and staging/production behavior.
- Relevant integration tests: `tests/control_plane_users.rs`,
  `tests/control_plane_roles.rs`, `tests/control_plane_audit.rs`,
  `tests/control_plane_locale.rs`, `tests/control_plane_realtime.rs`,
  `tests/control_plane_load_balancer.rs`, `tests/certificates.rs`,
  `tests/certificate_renewal.rs`, `tests/acme_http01.rs`, and
  `tests/acme_dns01.rs`.

## Route-coverage notes

I manually inspected every route registration in the control-plane router.
The five pages document these Task 6 families:

- `GET /api/health`; setup status and initialization; login, logout, current
  user, locale/theme preferences; and authenticated events.
- Proxy-host collection, individual-host, and host-auth routes; plus both
  load-balancer methods.
- Certificate collection, activation, ACME issue, renewal, and status routes.
- Audit logs; users collection/item/session-revocation routes; and roles
  collection/item routes.
- The `/api` and `/api/{*path}` fallbacks are recorded in the API overview as
  `404 Not Found`.

The source registrations were also classified, but intentionally left out of
these five pages: public bot challenge/verification; plugins; AI Advisor;
analytics and adaptive tuning; WAF; rate limiting; IP security; bot
configuration and trusted crawlers; and cluster status. Those are Task 7
scope. `/metrics` is already owned by the existing metrics-and-errors
reference rather than this Task 6 page set.

## Self-review

- Confirmed every new page has an explicit English, locale-neutral ID and the
  sidebar uses Docusaurus's directory-qualified generated IDs.
- Checked endpoint tables against route methods and handlers, including
  `204` bodylessness, status-specific envelopes, `404` masking for scoped
  host access, and global-only operations.
- Checked JSON examples against model/client field names and kept secrets to
  safe local/test placeholders. No certificate key, setup token, session,
  password, or provider token is presented as a real value.
- Confirmed CSRF wording matches the implementation: current session cookies
  need a matching header for protected mutations; public setup/login and bot
  challenge endpoints are exempt; logout itself is idempotent without a
  session but is checked when a CSRF cookie is supplied.
- Confirmed audit documentation states both actor labels (`email`,
  `deleted-user`, `system`) and sanitization guarantees without asserting an
  unsupported OpenAPI/schema generator.

## Concerns

- No active concern for Task 6. The documentation intentionally leaves Task
  7 API domains unexpanded.
- The build emits Node's `localStorage` experimental warning in this runtime;
  it does not affect Docusaurus's successful static output.

## Fix round 1

Addressed three source-accuracy review findings without expanding Task 6 scope:

- `GET /api/roles` is now documented as `RoleDetail[]`. The collection, create,
  item-read, and update responses all include `permissions` and `scopes`, as
  returned by `repository::list_roles` through `RoleDetail`.
- The certificate-list contract is now `CertificateMetadata[]` with exactly
  `id`, `name`, `source`, `covered_hostnames`, `expiry`, and `active`. The
  removed `acme` field never belongs to this list response; ACME state is read
  from the dedicated certificate-status endpoint.
- The per-host Basic Auth read documents its exact edge case: after successful
  authorization, a globally authorized reader receives the disabled default
  for an unknown ID because the handler does not check host existence. `404`
  remains the authorization mask for inaccessible scoped reads; the write
  route separately checks host existence.

Fix-round source references: `bearust/src/control_plane/repository.rs`
(`list_roles` around line 2300 and `list_certificates` around line 3577),
`bearust/src/control_plane/models.rs` (`RoleDetail` around line 288 and
`CertificateMetadata` around line 593), and
`bearust/src/control_plane/mod.rs` (`get_host_auth`).

Fix-round verification: `npm run typecheck`, `npm run build`, and
`git diff --check` all passed. A focused content audit confirmed the new role
and certificate types, the dedicated ACME-status boundary, the host-auth
unknown-ID explanation, and removal of the prior `RoleRecord[]`/`acme` claims.
