#!/usr/bin/env node
/**
 * Full Jane visual review, with PNGs of real rendered Chromium pages and checks.
 * On main, set TEST_URL=https://ttjdata.online/ for production evidence.
 */
import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.TEST_URL||'http://127.0.0.1:4172/';
const out='jane-visual-evidence';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const checks=[];const shots=[];const errors=[];
const record=(width,id,ok,details='')=>{checks.push({width,id,pass:!!ok,details});if(!ok)errors.push(width+': '+id+(details?' '+details:''));};
async function capture(page,width,label,selector){
 const loc=selector?page.locator(selector).first():null;
 if(loc&&await loc.count()){
   await loc.scrollIntoViewIfNeeded();
   await page.waitForTimeout(180);
 }
 const path=out+'/'+width+'-'+label+'.png';
 if(loc && await loc.count() && !label.startsWith('17-navigation-')){
   await loc.screenshot({path,animations:'disabled',timeout:25000});
 }else{
   await page.screenshot({path,animations:'disabled',timeout:25000});
 }
 shots.push(path);
}
async function getText(page,sel){return page.locator(sel).first().innerText();}
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:930},reducedMotion:'reduce',deviceScaleFactor:1});
 const jsErrors=[];page.on('pageerror',e=>jsErrors.push(e.message));
 const navigate=async(hash,marker)=>{
   await page.goto(base+'#'+hash,{waitUntil:'networkidle',timeout:25000});
   await page.locator(marker).waitFor({state:'visible',timeout:20000});
   await page.waitForTimeout(500);
 };
 // HOME: visible hero, context, red opportunity, collapsed findings, advocates, footer.
 await navigate('tour','#hb2-hero');
 await page.waitForFunction(()=>document.querySelector('#learn-traditional-page .lt-finding')?.dataset.accordionReady==='1');
 const heroText=await getText(page,'#hb2-text');
 record(width,'home.first-slide-static',heroText.includes('Strong AI Protections')&&await page.locator('#hb2-prev,#hb2-next,#hb2-track').count()===0,heroText.slice(0,180));
 await capture(page,width,'01-home-hero','#hb2-hero');
 record(width,'home.no-hero-small-labels',!(await page.locator('#hb2-hero').innerText()).includes('HEADLINES FROM THE RESEARCH')&&!(await page.locator('#hb2-hero').innerText()).includes('01/03'));
 record(width,'home.introduction',await page.locator('.lt-polling-intro h1').innerText()==='A wholly different kind of AI polling'&&await page.locator('.lt-memo-download').count()===1);
 await capture(page,width,'02-home-intro','.lt-polling-intro');
 record(width,'home.no-glance-section',await page.locator('.lt-snapshot:visible,.lt-glance:visible').count()===0);
 record(width,'home.red-opportunity',await page.locator('.lt-meaning').evaluate(el=>getComputedStyle(el).backgroundColor)==='rgb(196, 44, 52)');
 record(width,'home.four-audiences',await page.locator('.lt-fight-list details').count()===4);
 await capture(page,width,'03-home-opportunity','.lt-meaning');
 const first=page.locator('.lt-findings .lt-finding').first(),toggle=first.locator('.lt-finding-toggle');
 record(width,'home.first-finding-closed',await toggle.getAttribute('aria-expanded')==='false'&&!await first.evaluate(el=>el.classList.contains('is-open')));
 await capture(page,width,'04-home-research-closed','.lt-findings');
 await toggle.click();
 record(width,'home.finding-opens-on-click',await toggle.getAttribute('aria-expanded')==='true');
 await capture(page,width,'05-home-research-open','.lt-findings');
 await toggle.click();
 record(width,'home.finding-closes-on-click',await toggle.getAttribute('aria-expanded')==='false');
 record(width,'home.no-more-findings',!(await page.locator('#learn-traditional-page').innerText()).includes('More Findings'));
 record(width,'home.no-evidence-under-about',!(await page.locator('.lt-method').innerText()).includes('Explore the Evidence'));
 await page.locator('.lt-fight-list details').first().locator('summary').click();
 await capture(page,width,'06-home-advocate-guidance','.lt-fight');
 record(width,'home.weak-guardrails-only',!/(^|[^a-z])guardrails(?![-\w])/i.test('') && !/(?:^|[^a-z])guardrails-focused/i.test(await page.locator('#learn-traditional-page').innerText()));
 // Explore
 await navigate('explore','#data-view .xv-page');
 const tabs=page.locator('[data-round-select]');
 for(let n=1;n<=5;n++){
  await tabs.filter({hasText:''}).count(); // force ready state
  await page.locator('[data-round-select="'+n+'"]').click();
  const card=page.locator('#xv-round-panel .xv-round-card');
  record(width,'explore.round'+n+'.full-results',await card.locator('.xv-full-row').count()===(n<=2?12:n===3?10:n===4?15:6));
  record(width,'explore.round'+n+'.context', (await card.locator('.xv-round-context').innerText()).startsWith('We wanted to understand'));
  record(width,'explore.round'+n+'.columns',n===4 ? await card.locator('.xv-round4-layout .xv-round5-results,.xv-round4-layout .xv-round5-takeaways').count()===2 : n===5 ? await card.locator('.xv-round5-layout .xv-round5-results,.xv-round5-layout .xv-round5-takeaways').count()===2 : await card.locator('.xv-round-expanded').count()===1&&await card.locator('.xv-more-copy,.xv-full-results').count()===2);
  record(width,'explore.round'+n+'.no-accordion',await card.locator('details.xv-more').count()===0);
  if(n<=2)record(width,'explore.round'+n+'.no-comparative-scores',await card.locator('.xv-full-row b').count()===0);
  if(n===3)record(width,'explore.round3.paired-institutions',await card.locator('.xv-paired-row').count()===6);
  if(n===4)record(width,'explore.round4.single-percentage',!(await card.locator('.xv-full-results').innerText()).includes('#1'));
  if(n===5)record(width,'explore.round5.strong-protections',(await card.innerText()).includes('strong protections against AI harms'));
  await capture(page,width,'07-explore-round-'+n,'#xv-round-panel .xv-round-card');
 }
 // Resources
 await navigate('resources','#resources-view.ttj-resources-v2');
 await page.waitForFunction(()=>document.querySelector('#resources-view')?.dataset.resourcesRefined2==='1');
 record(width,'resources.no-tools-by-task',await page.locator('.ux-resource-guide,.rv-tool-index').count()===0);
 record(width,'resources.no-decision-first',await page.locator('#tool-8').count()===0);
 record(width,'resources.four-downloads',await page.locator('.rv-download-grid a').count()===4);
 record(width,'resources.preview',await page.locator('.rv-cheatsheet-preview').count()===1);
 await capture(page,width,'12-resources-downloads','.rv-downloads');
 for(const [key,say,avoid] of [
  ['health',null,'AI is affecting access to health care.'],
  ['benefits','The Social Security Administration uses an AI systemt that falsely flags you for fraud which immediately cuts off your benefits. Nobody can explain why and you can’t reach a human for help.',null],
  ['housing','Landlords are using AI screening systems that can falsely flag people for evictions or mix them up with someone who has the same name. The applications are denied and the renters have no idea why.',null]
 ]){
  await page.locator('#rv-language-tabs [data-language="'+key+'"]').click();
  if(say)record(width,'resources.'+key+'.say',await getText(page,'#rv-say')===say);
  if(avoid)record(width,'resources.'+key+'.avoid',await getText(page,'#rv-not')===avoid);
  await capture(page,width,'13-resources-language-'+key,'#tool-2');
 }
 const draft=page.locator('.rv-drafting-list');
 const geometry=await draft.locator('.rv-drafting-item').evaluateAll(nodes=>nodes.slice(0,2).map(n=>{const b=n.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width}}));
 record(width,'resources.drafting-two-columns',geometry.length===2&&Math.abs(geometry[0].y-geometry[1].y)<4&&geometry[1].x>geometry[0].x+geometry[0].width-4,JSON.stringify(geometry));
 await capture(page,width,'16-resources-drafting','#tool-7');
 // Navigation should precede the hero and follow the top-level header on all three pages.
 for(const [route,heroSel] of [['tour','#hb2-hero'],['explore','.xv-hero'],['resources','.rv-hero']]){
  await navigate(route,heroSel);
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(240);
  const nav=page.locator('.ux-section-nav[data-ux-nav="'+(route==='tour'?'home':route)+'"]');
  const hr=await page.locator(heroSel).boundingBox(),nr=await nav.boundingBox();
  const beforeHero=await nav.evaluate((n,selector)=>Boolean(n.compareDocumentPosition(document.querySelector(selector)) & Node.DOCUMENT_POSITION_FOLLOWING),heroSel);
  record(width,route+'.page-menu-above-hero',beforeHero&&!!nr&&!!hr&&nr.y+nr.height<=hr.y+5,JSON.stringify({beforeHero,nav:nr,hero:hr}));
  await capture(page,width,'17-navigation-'+route,heroSel);
 }
 // Check copy variants displayed to visitors rather than variable/class names.
 const visible=(await page.locator('body').innerText()).replace(/\\s+/g,' ');
 record(width,'copy.US-English',!/(\\borganisations?\\b|\\borganisers?\\b|\\bcentres?\\b|\\bprioritise\\b|\\boptimise\\b|\\bcolour\\b)/i.test(visible));
 const prohibited=[...visible.matchAll(/guardrails?/gi)].filter(m=>!/^weak\\s+$/i.test(visible.slice(Math.max(0,m.index-7),m.index)));
 record(width,'copy.guardrails-only-when-weak',prohibited.length===0,prohibited.map(m=>visible.slice(m.index-30,m.index+30)).join(' | '));
 await page.goto(base+'#tour',{waitUntil:'networkidle'});
 await page.locator('#hb2-text').waitFor({state:'visible'});
 const ratios=await Promise.all(['#hb2-text','.lt-findings-head h2','.lt-route-grid h3'].map(sel=>page.locator(sel).first().evaluate(el=>{const st=getComputedStyle(el);return {name:el.tagName,ratio:parseFloat(st.lineHeight)/parseFloat(st.fontSize)}})));
 record(width,'typography.heading-leading',ratios.every(x=>x.ratio>=1.14),JSON.stringify(ratios));
 record(width,'ui.no-uncaught-js-errors',jsErrors.length===0,jsErrors.join('; '));
 await page.close();
}
await browser.close();
await writeFile(out+'/audit-results.json',JSON.stringify({base,when:new Date().toISOString(),checks,errors,screenshots:shots},null,2));
console.log(JSON.stringify({total:checks.length,passed:checks.filter(x=>x.pass).length,failed:errors.length,errors,screenshots:shots.length},null,2));
if(errors.length)process.exit(1);
