#!/usr/bin/env node
/**
 * Lossless organization of the currently deployed page scripts.
 * The parts are concatenated without whitespace, syntax or other transforms.
 * This keeps execution order and lexical scope exactly as approved.
 *
 * node scripts/build-legacy-js.mjs         verify against served scripts
 * node scripts/build-legacy-js.mjs --write  regenerate served scripts deliberately
 */
import { readFile,writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { exit } from 'node:process';

const root=resolve(import.meta.dirname,'..');
const modules={
 'ux-refine.js':['01-shared-navigation.js','02-home.js','03-explore.js','04-resources.js','05-search.js','06-flow-and-startup.js'],
 'explore-v2.js':['01-survey-data-and-layout.js','02-research-visuals.js','03-round-interactions.js','04-demographics-and-institutions.js','05-quotes-and-events.js'],
 'resources-v2.js':['01-tools-data-and-layout.js','02-scenarios-and-messaging.js','03-sector-guidance.js','04-cards-and-decisions.js']
};
let failed=0;
for(const [target,parts] of Object.entries(modules)){
 const directory=resolve(root,'src/legacy',target.replace(/\.js$/,''));
 const output=Buffer.concat(await Promise.all(parts.map(part=>readFile(resolve(directory,part)))));
 const destination=resolve(root,target);
 if(process.argv.includes('--write')){
  await writeFile(destination,output);
  console.log('BUILT',target,output.length,'bytes');
 }else{
  const deployed=await readFile(destination);
  const identical=output.equals(deployed);
  console.log(identical?'PASS':'FAIL',target,output.length,'bytes,',parts.length,'source files');
  if(!identical)failed++;
 }
}
if(failed){
 console.error('BLOCKED: Generated JavaScript differs from the approved runtime assets.');
 exit(1);
}
