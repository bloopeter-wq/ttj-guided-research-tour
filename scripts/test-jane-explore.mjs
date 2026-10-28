#!/usr/bin/env node
/**
 * Jane's Explore the Data acceptance tests.
 * Run against the locally served candidate in Chromium.
 */
import { chromium } from 'playwright';
const url=process.env.TEST_URL || 'http://127.0.0.1:4172/';
const browser=await chromium.launch({headless:true});
const errors=[];
for(const viewport of [{width:1440,height:900},{width:820,height:1180},{width:390,height:844}]){
 const page=await browser.newPage({viewport,reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push('JS: '+e.message));
 await page.goto(url+'#explore',{waitUntil:'networkidle'});
 await page.waitForSelector('#xv-round-panel .xv-round-card',{timeout:15000});
 for(let id=1;id<=5;id++){
  await page.locator('[data-round-select="'+id+'"]').click();
  const card=page.locator('#xv-round-panel .xv-round-card');
  if((await card.getAttribute('data-round'))!==String(id))throw Error('Round '+id+' failed to open');
  if(await card.locator('details.xv-more').count())throw Error('Round '+id+' still has an accordion');
  if(await card.locator('.xv-suggest, .xv-evidence').count())throw Error('Round '+id+' still has a key finding or shortlist');
  if(!(await card.locator('.xv-round-context').innerText()).startsWith('We wanted to understand'))throw Error('Round '+id+' missing survey context');
  if(await card.locator('.xv-research-details dd').count()!==3)throw Error('Round '+id+' lacks complete metadata');
  const expected=id===1||id===2?12:id===3?10:id===4?15:6;
  if(await card.locator('.xv-full-row').count()!==expected)throw Error('Round '+id+' full set has wrong count');
  if(id===1||id===2){
    const first=await card.locator('.xv-full-row').first().innerText();
    if(!first.includes(id===1?'When the government uses AI to run public services':'Health insurance companies are using AI to deny care'))throw Error('Round '+id+' not using original statements');
    if(await card.locator('.xv-full-row b').count()) throw Error('Round '+id+' displays forbidden comparative scores');
    if((await card.locator('.xv-research-details').innerText()).includes('MaxDiff')) throw Error('Round '+id+' shows MaxDiff instead of ranked results');
    if((await card.locator('.xv-method-box').innerText()).includes('MaxDiff')) throw Error('Round '+id+' contains forbidden score terminology');
  }
  if(id===3){
    if(!await card.getByRole('heading',{name:'Who is choosing to use AI?'}).count())throw Error('Round 3 title wrong');
    if(await card.locator('.xv-paired-row').count()!==6)throw Error('Round 3 favorability/concern comparisons missing');
  }
  if(id===4){
    const scores=await card.locator('.xv-full-row b').allTextContents();
    if(scores.some(s=>s.includes('#1')||s.includes('·')))throw Error('Round 4 includes second measure');
  }
  if(id===5){
    const text=await card.innerText();
    if(/guardrails/i.test(text)||!text.includes('strong protections against AI harms'))throw Error('Round 5 weak protection language');
  }
 }
 const bodyWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
 if(bodyWidth>viewport.width+3)throw Error('Explore overflows horizontally at '+viewport.width+'px: '+bodyWidth);
 await page.close();
 console.log('PASS: 5 rounds, source data and layout at '+viewport.width+'px');
}
await browser.close();
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('PASS: All Jane Explore acceptance tests');
