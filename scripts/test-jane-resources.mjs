#!/usr/bin/env node
import { chromium } from 'playwright';
const base=process.env.TEST_URL||'http://127.0.0.1:4172/';
const browser=await chromium.launch({headless:true});
const failures=[];
for(const width of [1440,1024,820,390]){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
 page.on('pageerror',e=>failures.push(width+': JS '+e.message));
 await page.goto(base+'#resources',{waitUntil:'networkidle'});
 await page.waitForSelector('#resources-view.ttj-resources-v2',{timeout:16000});

 await page.waitForSelector('#jane-editorial-js',{timeout:12000});
 const resourcesCopy=await page.evaluate(()=>{
  const h=[...document.querySelectorAll('#resources-view.ttj-resources-v2 h1,#resources-view.ttj-resources-v2 h2')];
  return {periods:h.filter(e=>/[^.]\.$/.test(e.textContent.trim())).map(e=>e.textContent.trim()),eyebrows:[...document.querySelectorAll('#resources-view .rv-download-head .rv-eyebrow,#resources-view .rv-tool-head .rv-eyebrow')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.textContent.trim())};
 });
 if(resourcesCopy.periods.length||resourcesCopy.eyebrows.length)failures.push(width+' Jane Resources copy cleanup failed: '+JSON.stringify(resourcesCopy));

 await page.waitForFunction(()=>document.querySelector('#resources-view')?.dataset.resourcesRefined2==='1',{timeout:15000});
 const assert=async(c,message)=>{if(!c)failures.push(width+': '+message)};
 await assert(await page.locator('.rv-tool-index,.ux-resource-guide,[aria-label="Tools by task"]').count()===0,'Tools by Task menu exists');
 await assert(await page.getByText('Tools by task',{exact:false}).count()===0,'Tools by Task text visible');
 await assert(await page.locator('#tool-8,.rv-decision').count()===0,'Decision-first framing remains');
 const links=page.locator('#resources-view .rv-download-grid a');
 await assert(await links.count()===4,'Download list must have exactly four links');
 const labels=(await links.locator('b').allTextContents()).map(s=>s.trim());
 const expected=['Memo','Cheat Sheet for Policymakers','Cheat Sheet for Movement Orgs','Say This, Not That and other Messaging Hints'];
 await assert(JSON.stringify(labels)===JSON.stringify(expected),'Download labels/order differ: '+labels.join(' | '));
 for(const href of await links.evaluateAll(nodes=>nodes.map(a=>a.getAttribute('href')))){
   const response=await page.request.get(new URL(href,base).href);
   await assert(response.status()===200,'Download missing '+href+' status='+response.status());
 }
 await assert(await page.locator('.rv-cheatsheet-preview .rv-preview-sheet').count()===1,'Preview on right missing');
 const pdf=await page.locator('.rv-cheatsheet-preview').getAttribute('href');
 await assert((await page.request.get(new URL(pdf,base).href)).status()===200,'Preview PDF broken');
 const layout=await page.locator('.rv-download-layout').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length);
 await assert(layout===(width>850?2:1),'Download section does not respond to viewport');
 const draft=await page.locator('.rv-drafting-list').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length);
 await assert(draft===2,'Drafting checklist columns not responsive');
 const geometry=await page.locator('.rv-drafting-item').evaluateAll(nodes=>{
   const a=nodes[0]?.getBoundingClientRect(),b=nodes[1]?.getBoundingClientRect();
   return a&&b?{aX:a.x,bX:b.x,aY:a.y,bY:b.y,aWidth:a.width,bWidth:b.width}:null;
 });
 await assert(geometry&&Math.abs(geometry.aY-geometry.bY)<3&&geometry.bX>geometry.aX+geometry.aWidth-3,'Drafting checklist items are not visually side by side: '+JSON.stringify(geometry));
 const draftBoxes=page.locator('.rv-drafting-list input[type="checkbox"]');
 await assert(await draftBoxes.count()===11,'Drafting checklist lost its eleven questions');
 await page.locator('.rv-drafting-item').first().click();
 await assert((await page.locator('#rv-drafting-count').innerText()).includes('1 of 11'),'Drafting progress did not update');
 await page.locator('#rv-drafting-reset').click();
 await assert((await page.locator('#rv-drafting-count').innerText()).includes('0 of 11'),'Drafting reset failed');
 const tabs=page.locator('#rv-language-tabs [data-language]');
 for(const [key,expectedSay,expectedAvoid] of [
 ['health',null,'AI is affecting access to health care.'],
 ['benefits','The Social Security Administration uses an AI systemt that falsely flags you for fraud which immediately cuts off your benefits. Nobody can explain why and you can’t reach a human for help.',null],
 ['housing','Landlords are using AI screening systems that can falsely flag people for evictions or mix them up with someone who has the same name. The applications are denied and the renters have no idea why.',null]
 ]) {
   await tabs.filter({has:page.locator('[data-language="'+key+'"]')}).count().catch(()=>0);
   await page.locator('#rv-language-tabs [data-language="'+key+'"]').click();
   if(expectedSay)await assert((await page.locator('#rv-say').innerText()).trim()===expectedSay,key+' Say This incorrect');
   if(expectedAvoid)await assert((await page.locator('#rv-not').innerText()).trim()===expectedAvoid,key+' Not That incorrect');
 }
 const scroll=await page.evaluate(()=>document.documentElement.scrollWidth);
 await assert(scroll<=width+3,'horizontal page overflow '+scroll);
 await page.close();
 console.log('Resources acceptance checked at '+width+'px');
}
await browser.close();
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('PASS: All Jane Resources acceptance requirements and assets verified.');
