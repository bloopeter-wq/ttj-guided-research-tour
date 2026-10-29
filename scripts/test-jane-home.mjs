#!/usr/bin/env node
import { chromium } from 'playwright';
const base=process.env.TEST_URL||'http://127.0.0.1:4172/';
const browser=await chromium.launch({headless:true});
const errors=[];
for(const width of [1440,1024,820,390]){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
 page.on('pageerror',err=>errors.push(width+' JS error: '+err.message));
 await page.goto(base+'#tour',{waitUntil:'networkidle'});
 await page.waitForSelector('#hb2-hero #hb2-text',{timeout:16000});
 await page.waitForSelector('#learn-traditional-page .lt-thread-list details',{timeout:16000});
 
 await page.waitForSelector('#jane-editorial-js',{state:'attached',timeout:12000});
 const homeCopy=await page.evaluate(()=>{
  const h=[...document.querySelectorAll('#learn-traditional-page h1,#learn-traditional-page h2,#learn-traditional-page h3')];
  return {periods:h.filter(e=>/[^.]\.$/.test(e.textContent.trim())).map(e=>e.textContent.trim()),eyebrows:[...document.querySelectorAll('#learn-traditional-page .lt-section-top .lt-kicker,#learn-traditional-page .lt-fight-heading .lt-fight-eyebrow')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.textContent.trim())};
 });
 if(homeCopy.periods.length||homeCopy.eyebrows.length)errors.push(width+' Jane editorial text cleanup failed: '+JSON.stringify(homeCopy));

 const title=await page.locator('#hb2-text').innerText();
 if(!title.includes('Don’t Stop At Weak Guardrails: Voters Across Parties Want')||!title.includes('Strong AI Protections'))errors.push(width+' Wrong hero first-slide text');
 const hero=page.locator('#hb2-hero');
 if(await hero.locator('#hb2-prev,#hb2-next,#hb2-track,.hb2-arrows').count())errors.push(width+' Slider controls still present');
 const firstResearch=page.locator('#learn-traditional-page .lt-findings .lt-finding').first();
 await page.waitForFunction(()=>document.querySelector('#learn-traditional-page .lt-findings .lt-finding')?.dataset.accordionReady==='1',{timeout:16000});
 const researchToggle=firstResearch.locator('.lt-finding-toggle');
 if(await firstResearch.evaluate(el=>el.classList.contains('is-open')))errors.push(width+' First What the research found item is OPEN on load');
 if(await researchToggle.getAttribute('aria-expanded')!=='false')errors.push(width+' First research accordion aria-expanded is not false on load');
 await researchToggle.click();
 if(!await firstResearch.evaluate(el=>el.classList.contains('is-open')))errors.push(width+' First research accordion failed to open on click');
 if(await researchToggle.getAttribute('aria-expanded')!=='true')errors.push(width+' First research accordion aria-expanded did not update on opening');
 await researchToggle.click();
 if(await firstResearch.evaluate(el=>el.classList.contains('is-open')))errors.push(width+' First research accordion failed to close on click');
 if(await researchToggle.getAttribute('aria-expanded')!=='false')errors.push(width+' First research accordion aria-expanded did not update on closing');
 const firstFight=page.locator('#learn-traditional-page .lt-fight-list details').first();
 const firstThread=page.locator('#learn-traditional-page .lt-thread-list details').first();
 if(await firstFight.evaluate(e=>e.open))errors.push(width+' First homepage fight accordion initially open');
 if(await firstThread.evaluate(e=>e.open))errors.push(width+' First theme accordion initially open');
 await firstFight.locator('summary').click();
 if(!await firstFight.evaluate(e=>e.open))errors.push(width+' First accordion did not open on click');
 await firstFight.locator('summary').click();
 if(await firstFight.evaluate(e=>e.open))errors.push(width+' First accordion did not close on click');
 // A stationary hero must not reset the reader's scroll position after being left open.
 await page.locator('.lt-findings').scrollIntoViewIfNeeded();
 const position=await page.evaluate(()=>window.scrollY);
 await page.waitForTimeout(2200);
 const after=await page.evaluate(()=>window.scrollY);
 if(Math.abs(position-after)>12)errors.push(width+' Page scroll moved without user action: '+position+' => '+after);
 const textAfter=await page.locator('#hb2-text').innerText();
 if(textAfter!==title)errors.push(width+' Hero headline changed after initial render');
 const horizontal=await page.evaluate(()=>document.documentElement.scrollWidth);
 if(horizontal>width+3)errors.push(width+' Unexpected horizontal overflow '+horizontal);
 await page.close();
 console.log('Homepage verified at '+width+'px');
}
await browser.close();
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('PASS: Static first hero headline, no slide changes, closed accordion and manual open/close.');
