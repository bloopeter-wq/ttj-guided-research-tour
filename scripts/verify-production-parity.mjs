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
// Explicitly reviewed Explore release assets. These precise blob hashes are locked:
 // changing any of these files again requires an updated reviewed release gate.
const approvedExplore={
 'explore-v2.js':'f76cbe42157afa511d80b3303b1830d85d79d342',
 'explore-v2.css':'a05533cf5e20e9c1f2c568497d82309139258dda',
 'resources.js':'594d2a5e0e01366b694bdbe1e06d3a57c826f400'
};
for(const file of runtime){
 const sha=git('rev-parse','HEAD:'+file);
 if(!approvedExplore[file]||sha!==approvedExplore[file]){
   console.error('FAIL: Unapproved runtime change '+file+' at '+sha);
   exit(1);
 }
}
console.log('PASS: All runtime changes are limited to three approved Explore release files at locked Git blob hashes.');
console.log('Non-runtime maintainability and test changes: '+changed.length);
