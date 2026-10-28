#!/usr/bin/env node
/**
 * Read-only visual and interaction comparison.
 * Requires an existing Playwright installation:
 *   npm install --no-save playwright
 *   npx playwright install chromium
 * Example:
 *   BASELINE_URL=https://ttjdata.online CANDIDATE_URL=https://example.vercel.app node scripts/compare-browser.mjs
 *
 * Do not use a candidate URL that points to production.
 */
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { exit } from 'node:process';

const baseline = process.env.BASELINE_URL;
const candidate = process.env.CANDIDATE_URL;
if (!baseline || !candidate || baseline === candidate) {
  console.error('Set distinct BASELINE_URL and CANDIDATE_URL.');
  exit(2);
}
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is not installed. Follow docs/REFACTORING.md.');
  exit(2);
}
const browser = await chromium.launch({headless:true});
const resolutions = [{name:'desktop',width:1440,height:900},{name:'laptop',width:1280,height:800},{name:'tablet',width:820,height:1180},{name:'mobile',width:390,height:844}];
const locations = [{name:'home',hash:'#tour'},{name:'explore',hash:'#explore'},{name:'resources',hash:'#resources'}];
await mkdir('artifacts/parity',{recursive:true});
let failures = 0;
for (const viewport of resolutions) for (const location of locations) {
  const captures = [];
  for (const [kind,url] of [['baseline',baseline],['candidate',candidate]]) {
    const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height},reducedMotion:'reduce',deviceScaleFactor:1});
    await page.goto(url + location.hash,{waitUntil:'networkidle'});
    await page.evaluate(async () => { await document.fonts.ready; });
    await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}html{scroll-behavior:auto!important}'});
    // Wait until the page renders two consecutive identical frames.
    // This rejects moving hero artwork and asynchronously initialized content
    // without hiding genuine baseline-to-candidate differences.
    let image=null;
    let previous=null;
    let stable=false;
    for(let attempt=0;attempt<12;attempt++){
      await page.waitForTimeout(350);
      const frame=await page.screenshot({fullPage:true,animations:'disabled'});
      if(previous && frame.equals(previous)){image=frame;stable=true;break;}
      previous=frame;
    }
    if(!stable){
      console.error('UNSTABLE:',kind,location.name,viewport.name,'never produced two identical frames');
      await writeFile('artifacts/parity/'+location.name+'-'+viewport.name+'-'+kind+'-unstable.png',previous);
      failures++;
      image=previous;
    }
    const text=await page.locator('body').innerText();
    const file='artifacts/parity/'+location.name+'-'+viewport.name+'-'+kind+'.png';
    await writeFile(file,image);
    captures.push({hash:createHash('sha256').update(image).digest('hex'),text});
    await page.close();
  }
  const imageEqual=captures[0].hash===captures[1].hash;
  const textEqual=captures[0].text===captures[1].text;
  console.log(location.name,viewport.name,'pixels:',imageEqual?'IDENTICAL':'DIFFERENT','text:',textEqual?'IDENTICAL':'DIFFERENT');
  if(!imageEqual||!textEqual)failures++;
}
await browser.close();
if(failures){console.error(failures+' mismatches. DO NOT promote without investigation.');exit(1)}
console.log('PASS: compared initial page renders at all tested viewports.');
console.log('NOTE: This is not a complete functional equivalence proof. Interactive state tests are still required.');
