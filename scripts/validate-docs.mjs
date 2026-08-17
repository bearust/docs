#!/usr/bin/env node
// Validates the public docs/ corpus for BeaRust documentation.
//
// Checks performed:
//  1. Recursively reads public docs/ Markdown/MDX, excluding docs/superpowers/
//     (internal planning material that must never ship to the public site).
//  2. Fails if starter Docusaurus branding/content remains.
//  3. Fails if unfinished-content markers remain as standalone words.
//  4. Fails if any approved required page is missing.
//  5. Extracts registered /api/... route strings (and /metrics) from the
//     sibling bearust source repository's control-plane router and verifies
//     each one is documented in docs/reference/api/.
//
// Uses only Node's built-in fs, path, and url modules -- no runtime
// dependency is added for this tooling.

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const EXCLUDED_DIR_NAME = 'superpowers';
const API_DOCS_DIR = path.join(DOCS_DIR, 'reference', 'api');

const BEARUST_SOURCE_DIR = path.resolve(
  REPO_ROOT,
  process.env.BEARUST_SOURCE_DIR || '../bearust',
);
const CONTROL_PLANE_MOD_RS = path.join(
  BEARUST_SOURCE_DIR,
  'src',
  'control_plane',
  'mod.rs',
);

const errors = [];

// ---------------------------------------------------------------------------
// Step 1: collect public docs/ Markdown/MDX files, excluding docs/superpowers/
// ---------------------------------------------------------------------------

/**
 * @param {string} dir
 * @returns {string[]} absolute file paths
 */
function collectDocFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === EXCLUDED_DIR_NAME) {
        continue;
      }
      results.push(...collectDocFiles(path.join(dir, entry.name)));
      continue;
    }
    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      results.push(path.join(dir, entry.name));
    }
  }
  return results;
}

if (!fs.existsSync(DOCS_DIR)) {
  console.error(`docs directory not found at ${DOCS_DIR}`);
  process.exit(1);
}

const docFiles = collectDocFiles(DOCS_DIR);

// ---------------------------------------------------------------------------
// Step 2: starter branding / template content must not remain
// ---------------------------------------------------------------------------

const STARTER_STRINGS = [
  'My Site',
  'Dinosaurs are cool',
  'Docusaurus Tutorial',
  'facebook/docusaurus',
  'docusaurus.new',
  'Get started by creating a new site',
  'Time to dive into the core concepts of Docusaurus',
];

// ---------------------------------------------------------------------------
// Step 3: unfinished-content markers, as standalone words only
// ---------------------------------------------------------------------------

const UNFINISHED_MARKERS = ['TODO', 'TBD', 'FIXME', 'XXX', 'WIP', 'PLACEHOLDER'];
const unfinishedMarkerPattern = new RegExp(
  `\\b(${UNFINISHED_MARKERS.join('|')})\\b`,
);

for (const file of docFiles) {
  const relative = path.relative(REPO_ROOT, file);
  const content = fs.readFileSync(file, 'utf8');

  for (const starter of STARTER_STRINGS) {
    if (content.includes(starter)) {
      errors.push(
        `Starter branding string "${starter}" found in ${relative}`,
      );
    }
  }

  const marker = content.match(unfinishedMarkerPattern);
  if (marker) {
    errors.push(
      `Unfinished-content marker "${marker[1]}" found in ${relative}`,
    );
  }
}

// ---------------------------------------------------------------------------
// Step 4: approved required page paths must all exist
// ---------------------------------------------------------------------------

const REQUIRED_PAGES = [
  'docs/intro.mdx',
  'docs/roadmap.mdx',
  'docs/introduction/what-is-bearust.mdx',
  'docs/introduction/architecture.mdx',
  'docs/introduction/feature-status.mdx',
  'docs/getting-started/installation.mdx',
  'docs/getting-started/first-time-setup.mdx',
  'docs/getting-started/first-proxy.mdx',
  'docs/getting-started/development-stack.mdx',
  'docs/getting-started/troubleshooting.mdx',
  'docs/operate/proxy-hosts-and-load-balancing.mdx',
  'docs/operate/tls-and-certificates.mdx',
  'docs/operate/acme-automation.mdx',
  'docs/operate/http3.mdx',
  'docs/operate/waf-and-ip-security.mdx',
  'docs/operate/bot-protection.mdx',
  'docs/operate/rate-limiting.mdx',
  'docs/operate/analytics-and-observability.mdx',
  'docs/operate/users-roles-and-audit.mdx',
  'docs/operate/high-availability.mdx',
  'docs/operate/wasm-plugins.mdx',
  'docs/operate/ai-advisor.mdx',
  'docs/reference/cli.mdx',
  'docs/reference/configuration/overview.mdx',
  'docs/reference/configuration/server-and-listeners.mdx',
  'docs/reference/configuration/routing-and-upstreams.mdx',
  'docs/reference/configuration/security-and-observability.mdx',
  'docs/reference/configuration/plugins-and-cluster.mdx',
  'docs/reference/environment-variables.mdx',
  'docs/reference/metrics-and-errors.mdx',
  'docs/reference/api/overview.mdx',
  'docs/reference/api/health-setup-auth.mdx',
  'docs/reference/api/proxy-hosts-and-load-balancer.mdx',
  'docs/reference/api/certificates-and-acme.mdx',
  'docs/reference/api/users-roles-and-audit.mdx',
  'docs/reference/api/security.mdx',
  'docs/reference/api/analytics-and-tuning.mdx',
  'docs/reference/api/ai-advisor.mdx',
  'docs/reference/api/cluster-and-plugins.mdx',
  'docs/contributing/development-setup.mdx',
  'docs/contributing/repository-layout.mdx',
  'docs/contributing/runtime-architecture.mdx',
  'docs/contributing/data-plane.mdx',
  'docs/contributing/control-plane-and-database.mdx',
  'docs/contributing/frontend.mdx',
  'docs/contributing/testing-and-ci.mdx',
  'docs/contributing/adding-a-backend-feature.mdx',
  'docs/contributing/plugin-sdk-and-authoring.mdx',
  'docs/contributing/localization.mdx',
  'docs/contributing/documentation.mdx',
];

for (const relativePage of REQUIRED_PAGES) {
  const absolute = path.join(REPO_ROOT, relativePage);
  if (!fs.existsSync(absolute)) {
    errors.push(`Required page missing: ${relativePage}`);
  }
}

// ---------------------------------------------------------------------------
// Step 5: registered /api/... route strings (and /metrics) must be documented
// ---------------------------------------------------------------------------

let routesChecked = [];

if (!fs.existsSync(CONTROL_PLANE_MOD_RS)) {
  errors.push(
    `Source control-plane router not found at ${CONTROL_PLANE_MOD_RS}. ` +
      'Set BEARUST_SOURCE_DIR to the bearust checkout if it is not a ' +
      "sibling of this repository's worktree.",
  );
} else {
  const sourceContent = fs.readFileSync(CONTROL_PLANE_MOD_RS, 'utf8');

  // Matches every `.route("...", ...)` registration, including ones whose
  // path string is on its own line before the handler.
  const routePattern = /\.route\(\s*"([^"]+)"/g;
  const extractedRoutes = new Set();
  let match;
  while ((match = routePattern.exec(sourceContent)) !== null) {
    const routeString = match[1];
    if (routeString.startsWith('/api') || routeString === '/metrics') {
      extractedRoutes.add(routeString);
    }
  }

  // Ignore only the generic fallback routes; every other extracted route
  // must be documented.
  extractedRoutes.delete('/api');
  extractedRoutes.delete('/api/{*path}');

  routesChecked = [...extractedRoutes].sort();

  if (routesChecked.length === 0) {
    errors.push(
      `No /api or /metrics route strings were extracted from ${path.relative(
        REPO_ROOT,
        CONTROL_PLANE_MOD_RS,
      )}. The extraction pattern may no longer match the source.`,
    );
  }

  if (!fs.existsSync(API_DOCS_DIR)) {
    errors.push(`API reference directory missing: docs/reference/api`);
  } else {
    const apiDocFiles = collectDocFiles(API_DOCS_DIR);
    const apiDocsCorpus = apiDocFiles
      .map((file) => fs.readFileSync(file, 'utf8'))
      .join('\n');

    // Routes are documented as inline code, e.g. `` `GET /api/users` `` or
    // `` `/api/users` ``. A bare substring check (apiDocsCorpus.includes(route))
    // would let a longer route's text (e.g. "/api/users/{id}") silently
    // "cover" a shorter, undocumented route (e.g. "/api/users") because the
    // shorter string is a substring of the longer one. Require that the
    // route is bounded by a non-path character (backtick, whitespace, or
    // similar) on both sides so it can only match its own occurrence.
    const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pathContinuation = '[A-Za-z0-9_\\-/{}]';
    for (const route of routesChecked) {
      const boundaryPattern = new RegExp(
        `(?<!${pathContinuation})${escapeRegExp(route)}(?!${pathContinuation})`,
      );
      if (!boundaryPattern.test(apiDocsCorpus)) {
        errors.push(
          `Route "${route}" registered in source but not documented in docs/reference/api/`,
        );
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Step 6: report results
// ---------------------------------------------------------------------------

if (errors.length > 0) {
  console.error('docs validation failed:\n');
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  console.error(`\n${errors.length} issue(s) found.`);
  process.exit(1);
}

console.log(
  `docs validation passed: ${docFiles.length} public page(s) checked, ` +
    `${routesChecked.length} source route string(s) verified against docs/reference/api/.`,
);
