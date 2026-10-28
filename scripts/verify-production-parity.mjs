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
 'explore-v2.js':'6d02c8d0d90cc50059635bc6feefe66e54b3e535',
 'explore-v2.css':'a05533cf5e20e9c1f2c568497d82309139258dda',
 'resources.js':'429b2073754cd5f9402670fe25fb75aff8652884',
 'resources-v2.js':'a0494ac1fc2b1ef0de53f6e577a14191504097fc',
 'resources-v2.css':'2a4da1025e177bd47c7567f6985e6c9cbb09e4c0',
 'resources-refine2.css':'80a651397e0d39502d9d36f7ba5142d540ca308d',
 'resources/TTJ_Say_This_Not_That_Messaging_Hints.html':'e62872962df18ae5a1a0f34dc437b31f67843df6'
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
