# Task 3 report: operational guides

## Status

Completed. Task 3 adds the operational-guide slice of the English-first BeaRust documentation site. All edits were made in the requested isolated worktree only.

### Fix round 1

Corrected `docs/operate/rate-limiting.mdx` after review: block-mode `429` responses expose only `Retry-After` and `Cache-Control: no-store`. `remaining_tokens` is part of BeaRust's `RateLimitDecision` telemetry/internal state and is not a client response header.

## Changed files

- `docs/operate/proxy-hosts-and-load-balancing.mdx` — host/path routing, pools, health, timeouts, retry behavior, and native versus control-plane ownership.
- `docs/operate/tls-and-certificates.mdx` — native TLS paths, container permissions, managed certificate storage, activation, reload, and rejection behavior.
- `docs/operate/acme-automation.mdx` — staging-first ACME, HTTP-01/DNS-01 selection, credentials, jobs, renewal state, and recovery.
- `docs/operate/http3.mdx` — optional UDP listener, TLS prerequisite, Alt-Svc, security parity, and upstream protocol boundary.
- `docs/operate/waf-and-ip-security.mdx` — WAF/IP modes, matcher JSON, import/export, feedback labels, CIDR policy, and monitor-first rollout.
- `docs/operate/bot-protection.mdx` — modes, scoring, TTL, challenge/clearance behavior, cache safety, and trusted-crawler caveat.
- `docs/operate/rate-limiting.mdx` — token buckets, scopes, trusted proxies, `429` behavior, and live per-host policy updates.
- `.superpowers/sdd/2026-08-17-bearust-documentation-site/task-3-report.md` — records Fix round 1 and its verification evidence.
- `docs/operate/analytics-and-observability.mdx` — bounded analytics, warm-up, acknowledgements, JSON logs/request IDs/realtime, and Prometheus boundaries.
- `sidebars.ts` — adds the completed operations category and its eight pages.
- `docs/intro.mdx` — adds an operations entry point on the homepage.

## Commits

- `d53e6083a8e1c69d709784f5926e2d5b1a0fc833` — `docs: add operational guides`

## Verification

- `npm run typecheck` — passed.
- `npm run build` — passed; Docusaurus generated the production static site and enforced strict internal links.
- `npm test` — not available: npm reports that this documentation repository has no `test` script.
- `git diff --check` — passed with no whitespace errors before the documentation commit.
- Per-page check: every `docs/operate/*.mdx` file contains at least one `**Verify:**` observable outcome.
- API-reference scope check: no API/reference pages were added or duplicated.
- Fix round 1 source check: `src/proxy.rs` constructs the blocking `429` with `Retry-After` and `Cache-Control: no-store`; `src/rate_limit.rs` defines `remaining_tokens` on the internal `RateLimitDecision` enum.

`npm run validate:docs` was not run because it is intentionally deferred to Task 9: the current `package.json` has no `validate:docs` script, and the repository README says Task 9 adds it.

## Source references used

- `/home/rizalord/Projects/personal/bearust/src/config/mod.rs`
- `/home/rizalord/Projects/personal/bearust/src/router.rs`
- `/home/rizalord/Projects/personal/bearust/src/balancer.rs`
- `/home/rizalord/Projects/personal/bearust/src/proxy.rs`
- `/home/rizalord/Projects/personal/bearust/src/http3.rs`
- `/home/rizalord/Projects/personal/bearust/src/tls.rs`
- `/home/rizalord/Projects/personal/bearust/src/certificates/mod.rs`
- `/home/rizalord/Projects/personal/bearust/src/certificates/acme_service.rs`
- `/home/rizalord/Projects/personal/bearust/src/certificates/renewal.rs`
- `/home/rizalord/Projects/personal/bearust/src/control_plane/models.rs`
- `/home/rizalord/Projects/personal/bearust/src/control_plane/runtime_sync.rs`
- `/home/rizalord/Projects/personal/bearust/src/waf.rs`
- `/home/rizalord/Projects/personal/bearust/src/security_policy.rs`
- `/home/rizalord/Projects/personal/bearust/src/bot_protection.rs`
- `/home/rizalord/Projects/personal/bearust/src/rate_limit.rs`
- `/home/rizalord/Projects/personal/bearust/src/rate_limit_store.rs`
- `/home/rizalord/Projects/personal/bearust/src/proxy.rs` (block-mode `429` response construction, around lines 1397/1405)
- `/home/rizalord/Projects/personal/bearust/src/rate_limit.rs` (`RateLimitDecision::Limited`, around line 98)
- `/home/rizalord/Projects/personal/bearust/src/analytics.rs`
- `/home/rizalord/Projects/personal/bearust/src/analytics_prometheus.rs`
- `/home/rizalord/Projects/personal/bearust/docs/acme.md`
- `/home/rizalord/Projects/personal/bearust/docs/keepalived.md`

## Self-review

- Confirmed all eight pages named by the task brief exist and are linked from the operations sidebar.
- Confirmed the homepage links to the published operations entry point.
- Kept URLs locale-neutral and prose English-first.
- Used documentation-only IPs/domains and explicit credential placeholders.
- Preserved security caveats for private keys, ACME tokens, trusted forwarding headers, crawler claims, WAF/rate-limit rollout, and Prometheus exposure.
- Corrected the rate-limit guide to state that per-host policy updates clear that host's existing buckets, matching the runtime store.

## Concerns

- The task brief lists `npm run validate:docs`, but that command is intentionally unavailable until Task 9. Production build and type checking passed instead.
- The repository also has no `npm test` script; the available documentation quality gates are type checking and production build.
- No application source was modified. The source repository and its `.impeccable` directory were only read for behavior verification.
