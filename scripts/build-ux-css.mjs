#!/usr/bin/env node
/**
 * Lossless source build for the legacy UX stylesheet.
 * Source parts are ordered and concatenated byte-for-byte. No CSS transforms.
 *
 * node scripts/build-ux-css.mjs           -> verify generated output is identical
 * node scripts/build-ux-css.mjs --write   -> regenerate checked-in CSS output
 */
import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {exit} from 'node:process';
const root=resolve(import.meta.dirname,'..');
const parts=[
  '01-layout.css',
  '02-navigation-accessibility.css',
  '03-search-and-interface.css',
  '04-typography.css',
  '05-editorial-pages.css',
  '06-research-display.css',
  '07-system-and-responsive.css'
];
const sources=await Promise.all(parts.map(name=>readFile(resolve(root,'styles/ux',name))));
const output=Buffer.concat(sources);
const destination=resolve(root,'ux-refine.css');
if(process.argv.includes('--write')){
 await writeFile(destination,output);
 console.log('Generated ux-refine.css ('+output.length+' bytes) from '+parts.length+' source modules.');
}else{
 const current=await readFile(destination);
 if(!current.equals(output)){
  console.error('FAIL: ux-refine.css differs from its source modules. Do not deploy.');
  exit(1);
 }
 console.log('PASS: All '+output.length+' bytes of ux-refine.css match the organized source modules exactly.');
}
