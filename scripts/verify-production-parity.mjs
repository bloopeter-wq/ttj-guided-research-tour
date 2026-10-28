#!/usr/bin/env node
/**
 * Hard production asset guard: any change to a served file fails.
 * The maintained styles/ux/ modules are source inputs, checked separately
 * by scripts/build-ux-css.mjs for byte-for-byte identity with ux-refine.css.
 */
import {execFileSync} from 'node:child_process';
import {exit} from 'node:process';
const baseline=process.argv[2];
if(!baseline||!/^[a-f0-9]{40}$/.test(baseline)){
 console.error('Usage: node scripts/verify-production-parity.mjs <baseline SHA>');exit(2);
}
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const changed=git('diff','--name-only',baseline,'HEAD').split('\n').filter(Boolean);
const nonRuntime=p=>/^(docs\/|scripts\/|styles\/ux\/|src\/legacy\/|\.github\/|README\.md$)/.test(p);
const runtime=changed.filter(p=>!nonRuntime(p));
if(runtime.length){
 console.error('FAIL: Deployed assets differ from the approved production commit:');
 runtime.forEach(p=>console.error('  '+p));
 exit(1);
}
console.log('PASS: All served runtime assets are unchanged from '+baseline);
console.log('Non-runtime maintainability and test changes: '+changed.length);
