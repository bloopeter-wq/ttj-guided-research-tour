#!/usr/bin/env node
/**
 * Strict production-source guard. This intentionally rejects runtime file changes
 * until they have an independently reviewed and verified parity report.
 *
 * Usage: node scripts/verify-production-parity.mjs <baseline-commit>
 */
import { execFileSync } from 'node:child_process';
import { exit } from 'node:process';

const baseline = process.argv[2];
if (!baseline || !/^[a-f0-9]{40}$/.test(baseline)) {
  console.error('Usage: node scripts/verify-production-parity.mjs <40-character-baseline-commit>');
  exit(2);
}
const git = (...args) => execFileSync('git', args, {encoding:'utf8'}).trim();
const changed = git('diff','--name-only',baseline,'HEAD').split('\n').filter(Boolean);
const docsOnly = path => /^(docs\/|scripts\/|\.github\/|README\.md$)/.test(path);
const runtimeChanged = changed.filter(path => !docsOnly(path));
if (runtimeChanged.length) {
  console.error('STOP: Production-relevant files changed; zero-change status is NOT established.');
  for (const file of runtimeChanged) console.error('  ' + file);
  console.error('Run independent visual and interaction comparisons before considering promotion.');
  exit(1);
}
console.log('PASS: No production-relevant files changed from baseline ' + baseline);
console.log('Documentation/test changes: ' + changed.length);
