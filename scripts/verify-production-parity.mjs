#!/usr/bin/env node
/**
 * Strict, fail-closed production parity guard.
 * Only a single mechanically proven CSS no-op is allowlisted.
 * All other runtime changes require a new reviewed test gate.
 */
import { execFileSync } from 'node:child_process';
import { exit } from 'node:process';
const baseline=process.argv[2];
if(!baseline || !/^[a-f0-9]{40}$/.test(baseline)){
 console.error('Usage: node scripts/verify-production-parity.mjs <baseline 40-char SHA>');exit(2);
}
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trimEnd();
const changed=git('diff','--name-only',baseline,'HEAD').split('\n').filter(Boolean);
const docsOnly=p=>/^(docs\/|scripts\/|styles\/ux\/|\.github\/|README\.md$)/.test(p);
const runtime=changed.filter(p=>!docsOnly(p));
const harmlessRule='.learn-traditional-page .lt-thread-list details:not([open]) + details{}';
for(const path of runtime){
 if(path!=='ux-refine.css') {
   console.error('FAIL: Non-allowlisted runtime file changed: '+path);exit(1);
 }
 const oldCss=git('show',baseline+':'+path);
 const newCss=git('show','HEAD:'+path);
 if(oldCss.split(harmlessRule).length!==2 || newCss!==oldCss.replace(harmlessRule,'')){
   console.error('FAIL: Stylesheet change is not exactly the previously reviewed empty-rule removal');exit(1);
 }
 console.log('PASS: Only one empty CSS rule removed, with identical declarations and order');
}
console.log('PASS: All changes are documentation, test files, or the reviewed CSS no-op.');
