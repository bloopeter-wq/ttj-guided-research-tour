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
 'ux-refine.css':'ad82dcae953bfec17f12cab5aef3bb0c0086836c',
 'index.html':'7a6f2ebfe34253fa40261b6bd39643d405be7635',
 'ux-refine.js':'1d2fa3b7a6a50c04f37222d44608f5f872d10e14',
 'explore-v2.js':'4529207d198682620c78747b433af6cfae0e27bf',
 'explore-v2.css':'4e32710cd34c6c7cf2abce2f4ad36ad38d7f436d',
 'resources.js':'43d5367c4cf777b76ccf0e5d81637484d5b2c70a',
 'resources-v2.js':'6ed84c046d73c14b1fb166073a5a4ffe195f20f4',
 'resources-v2.css':'2a4da1025e177bd47c7567f6985e6c9cbb09e4c0',
 'resources-refine2.css':'208fbe0f7ceb7bedec9ed91b34ee433500d0f955',
 'resources/TTJ_Say_This_Not_That_Messaging_Hints.html':'8513b342530edf1bb6a4e7a280488e0a9a248ae8'
,
 'headline-banner-v2.js':'b9b45d72c7eccf83f3df70a3a08c0fa4799defda',
 'what-we-learned-traditional.js':'8b9aea76e6352896ed106df0b0f4fe67487a30d7'
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
