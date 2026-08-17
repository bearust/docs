# Task 4 report: administration, HA, plugins, and AI operations

## Status

Completed. Task 4 adds four operations guides and links all of them from the `Operate BeaRust` sidebar. The guides keep clustering, WASM plugins, and AI Advisor explicitly optional; use safe credential placeholders; describe their security boundaries; and include observable verification outcomes. API route/reference material remains deferred to Tasks 6 and 7.

## Changed files

- `sidebars.ts` — added the four Task 4 guides to the `Operate BeaRust` category.
- `docs/operate/users-roles-and-audit.mdx` — built-in and custom RBAC roles/scopes, administrator and session safeguards, audit history and redaction boundaries.
- `docs/operate/high-availability.mdx` — standalone versus configured clustering, environment configuration, authenticated peer transport, Raft/quorum checks, command-ID retry handling, and the keepalived boundary.
- `docs/operate/wasm-plugins.mdx` — opt-in discovery/lifecycle, manifest/limits/hooks, signing and TOFU, registry checksums, and distribution-channel limitations.
- `docs/operate/ai-advisor.mdx` — opt-in provider configuration, redaction and bounded provider behavior, async workflows, approval/stale/expiry handling, and proxy-traffic isolation.
- `.superpowers/sdd/2026-08-17-bearust-documentation-site/task-4-report.md` — this delivery report.

## Commits

- `fe7a353b9a3189a36e675151345ecfefc8855bf1` — `docs: add administration operations guides`

The report itself is committed separately after this record is written.

## Verification

| Command | Result |
| --- | --- |
| `git diff --check` | Passed; no whitespace errors. |
| `npm run typecheck` | Passed (`tsc`, exit 0). |
| `npm run build` | Passed (Docusaurus production build, exit 0). |
| `npm run validate:docs` | Not run: intentionally deferred until Task 9 and no such script exists in `package.json`; no replacement script was invented. |
| Requirement-term scan across the four guides | Passed: administration, clustering, plugin, and AI requirements from the brief are represented, along with verification steps and safe placeholders. |

The Docusaurus build emitted Node's existing experimental `localStorage` warning but completed successfully.

## Source references reviewed

- `/home/rizalord/Projects/personal/bearust/src/control_plane/auth.rs`
- `/home/rizalord/Projects/personal/bearust/src/control_plane/rbac.rs`
- `/home/rizalord/Projects/personal/bearust/src/control_plane/audit.rs`
- `/home/rizalord/Projects/personal/bearust/src/cluster.rs`
- `/home/rizalord/Projects/personal/bearust/src/cluster_raft.rs`
- `/home/rizalord/Projects/personal/bearust/src/cluster_raft_runtime.rs`
- `/home/rizalord/Projects/personal/bearust/src/cluster_command.rs`
- `/home/rizalord/Projects/personal/bearust/src/config/mod.rs`
- `/home/rizalord/Projects/personal/bearust/src/plugin_runtime.rs`
- `/home/rizalord/Projects/personal/bearust/src/plugin_signing.rs`
- `/home/rizalord/Projects/personal/bearust/src/plugin_trust.rs`
- `/home/rizalord/Projects/personal/bearust/src/plugin_registry.rs`
- `/home/rizalord/Projects/personal/bearust/docs/PLUGIN_AUTHORING.md`
- `/home/rizalord/Projects/personal/bearust/src/ai_advisor.rs`
- `/home/rizalord/Projects/personal/bearust/src/ai_advisor_provider.rs`
- `/home/rizalord/Projects/personal/bearust/src/ai_advisor_redaction.rs`
- `/home/rizalord/Projects/personal/bearust/src/control_plane/ai_advisor.rs`

## Self-review

- Confirmed that the new sidebar entries use document IDs, which Docusaurus resolves into locale-neutral URLs; no `/en/` URLs were authored.
- Confirmed that optional subsystems are never presented as required for standalone proxy operation.
- Confirmed credential examples use `<cluster-shared-secret>` and `<provider-api-key>` placeholders only.
- Confirmed each security-sensitive guide explains a boundary: host/network responsibility for keepalived, operator-owned plugin distribution trust, and provider/privacy limits for AI Advisor.
- Confirmed API endpoint tables and reference claims are intentionally absent, leaving that work to Tasks 6–7.

## Concerns

- This is documentation-only verification; no live BeaRust cluster, plugin runtime, or provider integration was started from this worktree.
- The linked plugin authoring guide intentionally points to the BeaRust repository source. Its content is source-backed, but the public repository path should remain valid when that repository's default branch strategy changes.

## Fix round 1

Addressed both review findings without changing unrelated documentation.

- `docs/operate/high-availability.mdx` now states that `CLUSTER_PEERS` is node-specific and must contain only the other cluster members. It includes separate `node-a`, `node-b`, and `node-c` examples, each omitting its local `NODE_ID`, matching the configuration validation that rejects a local node ID in the peer list.
- `docs/operate/ai-advisor.mdx` now limits the redaction claim to the default redactor applied to advisor message content before request-body construction. It explicitly states that this is not a guarantee that all sensitive values are removed and that `LLM_API_KEY` is intentionally sent to the configured provider as a Bearer authorization credential.

### Fix-round source references

- `/home/rizalord/Projects/personal/bearust/src/config/mod.rs` — peer validation rejects a peer whose `node_id` equals `cluster.node_id`.
- `/home/rizalord/Projects/personal/bearust/src/ai_advisor_provider.rs` — applies `Redactor::default()` to message content and sends `api_key` through `bearer_auth`.

### Fix-round verification

- `git diff --check` passed with no whitespace errors.
- Focused assertions confirmed all three peer examples omit their local node ID, the obsolete same-peer-set wording is absent, and the AI guide contains both the no-guarantee redaction boundary and Bearer-credential disclosure.
- `npm run typecheck` passed (`tsc`, exit 0).
- `npm run build` passed (Docusaurus production build, exit 0).
- `npm run validate:docs` remains intentionally deferred to Task 9 because the repository has no such script.
