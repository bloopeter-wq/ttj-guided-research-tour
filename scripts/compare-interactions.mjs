#!/usr/bin/env node
/**
 * Browser interaction smoke checks.
 * This suite is run against BOTH the frozen baseline and the candidate.
 * It compares observable outcomes, rather than assuming a click succeeded.
 */
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
const urls = {baseline: process.env.BASELINE_URL, candidate: process.env.CANDIDATE_URL};
if (!urls.baseline || !urls.candidate) throw new Error('Set BASELINE_URL and CANDIDATE_URL');
await mkdir('artifacts/parity', {recursive: true});
const browser=await chromium.launch();
async function run(label,url) {
  const page=await browser.newPage({viewport:{width:1280,height:800},permissions:['clipboard-read','clipboard-write']});
  const errors=[];
  page.on('pageerror', e=>errors.push(String(e.message)));
  page.on('response', r=>{if(r.status()>=400 && new URL(r.url()).origin===new URL(url).origin)errors.push('HTTP '+r.status()+': '+new URL(r.url()).pathname);});
  await page.goto(url+'#tour',{waitUntil:'networkidle'});
  await page.waitForTimeout(750);
  const result={};
  result.homeTitle=await page.locator('#learn-traditional-page .lt-polling-intro h1').allTextContents();
  result.coreFinding=await page.locator('#learn-traditional-page .lt-core h2').allTextContents();
  result.keyTakeaways=await page.locator('#learn-traditional-page .lt-fight-list details').count();
  result.initialTakeawaysOpen=await page.locator('#learn-traditional-page .lt-fight-list details[open]').count();
  if(result.keyTakeaways){
    await page.locator('#learn-traditional-page .lt-fight-list details summary').first().click();
    result.openAfterClick=await page.locator('#learn-traditional-page .lt-fight-list details').first().evaluate(e=>e.open);
    await page.locator('#learn-traditional-page .lt-fight-list details summary').first().click();
    result.closedAfterSecondClick=!(await page.locator('#learn-traditional-page .lt-fight-list details').first().evaluate(e=>e.open));
  }
  result.themeCount=await page.locator('#learn-traditional-page .lt-thread-list details').count();
  result.initialThemesOpen=await page.locator('#learn-traditional-page .lt-thread-list details[open]').count();
  result.memoLink=await page.locator('.lt-memo-download').first().getAttribute('href').catch(()=>null);
  await page.goto(url+'#explore',{waitUntil:'networkidle'});
  await page.waitForTimeout(500);
  result.exploreVisible=await page.locator('#data-view').isVisible();
  result.exploreHeadings=await page.locator('#data-view h1').allTextContents();
  await page.goto(url+'#resources',{waitUntil:'networkidle'});
  await page.waitForTimeout(500);
  result.resourcesVisible=await page.locator('#resources-view').isVisible();
  result.resourcesHeadings=await page.locator('#resources-view h1').allTextContents();
  result.errors=errors;
  await page.close();
  await writeFile('artifacts/parity/interaction-'+label+'.json',JSON.stringify(result,null,2));
  return result;
}
const a=await run('baseline',urls.baseline);
const b=await run('candidate',urls.candidate);
await browser.close();
if(JSON.stringify(a)!==JSON.stringify(b)){
  console.error('FAIL: Observed interactions differ from baseline');
  console.error('BASELINE',JSON.stringify(a));
  console.error('CANDIDATE',JSON.stringify(b));
  process.exit(1);
}
if(a.errors.length) {console.error('FAIL: Both versions reported errors',a.errors);process.exit(1);}
if(!a.exploreVisible || !a.resourcesVisible || a.keyTakeaways!==4 || !a.openAfterClick || !a.closedAfterSecondClick) {
 console.error('FAIL: Baseline itself failed essential navigation or accordion checks',a);
 process.exit(1);
}
console.log('PASS: Basic page and accordion behavior identical');
console.log('NOTE: This is a smoke test, not exhaustive functional parity.');
