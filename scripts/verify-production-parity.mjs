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
 'ux-refine.js':'12255b984cd4a32e22d0e5f20a854f5ba8a8e2a9',
 'explore-v2.js':'6d02c8d0d90cc50059635bc6feefe66e54b3e535',
 'explore-v2.css':'a05533cf5e20e9c1f2c568497d82309139258dda',
 'resources.js':'8a160fcbaa23f92e25d2f34cd01bb2d1afca3759',
 'resources-v2.js':'40b2cf4e57cd6a40cf5b6e20989d9f14be83dbdb',
 'resources-v2.css':'2a4da1025e177bd47c7567f6985e6c9cbb09e4c0',
 'resources-refine2.css':'208fbe0f7ceb7bedec9ed91b34ee433500d0f955',
 'resources/TTJ_Say_This_Not_That_Messaging_Hints.html':'8513b342530edf1bb6a4e7a280488e0a9a248ae8'
,
 'headline-banner-v2.js':'b9b45d72c7eccf83f3df70a3a08c0fa4799defda',
 'what-we-learned-traditional.js':'d5827cef153257644525261fe2a67c6e04cc8fdc'
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
