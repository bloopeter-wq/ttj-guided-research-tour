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

 await page.waitForSelector('#jane-editorial-js',{state:'attached',timeout:12000});
 const exploreCopy=await page.evaluate(()=>{
  const h=[...document.querySelectorAll('#data-view.ttj-explore-v2 h1,#data-view.ttj-explore-v2 h2')];
  return {periods:h.filter(e=>/[^.]\.$/.test(e.textContent.trim())).map(e=>e.textContent.trim()),eyebrows:[...document.querySelectorAll('#data-view .xv-section-head .xv-eyebrow,#data-view .xv-hero-inner>.xv-eyebrow')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.textContent.trim())};
 });
 if(exploreCopy.periods.length||exploreCopy.eyebrows.length)throw Error('Jane Explore copy cleanup failed: '+JSON.stringify(exploreCopy));

 for(let id=1;id<=5;id++){
  await page.locator('[data-round-select="'+id+'"]').click();
  const card=page.locator('#xv-round-panel .xv-round-card');
  if((await card.getAttribute('data-round'))!==String(id))throw Error('Round '+id+' failed to open');
  if(await card.locator('details.xv-more').count())throw Error('Round '+id+' still has an accordion');
  if(await card.locator('.xv-suggest, .xv-evidence').count())throw Error('Round '+id+' still has a key finding or shortlist');
  if(!(await card.locator('.xv-round-context').innerText()).startsWith('We wanted to understand'))throw Error('Round '+id+' missing survey context');
  if(await card.locator('.xv-research-details dd').count()!==3)throw Error('Round '+id+' lacks complete metadata');
  const firstContent=card.locator(id<=3?'.xv-more-inner.xv-round-expanded':'.xv-round5-layout');
  const layout=await firstContent.evaluate(el=>{const st=getComputedStyle(el);return {border:st.borderTopWidth,pad:parseFloat(st.paddingTop),top:el.getBoundingClientRect().top}});
  const metadataBottom=await card.locator('.xv-research-details').evaluate(el=>el.getBoundingClientRect().bottom);
  if(layout.border!=='0px')throw Error('Round '+id+' extra divider line remains: '+layout.border);
  if(layout.pad>14)throw Error('Round '+id+' excessive content top padding: '+layout.pad);
  if(layout.top-metadataBottom>35)throw Error('Round '+id+' excessive gap below metadata: '+Math.round(layout.top-metadataBottom));
  const expected=id===1||id===2?12:id===3?10:id===4?15:5;
  if(await card.locator('.xv-full-row').count()!==expected)throw Error('Round '+id+' full set has wrong count');
  if(id===1||id===2){
    const ladder=card.locator('ol.xv-rank-ladder');
    if(await ladder.count()!==1)throw Error('Round '+id+' missing numbered ladder');
    if(await ladder.locator('li.xv-rank-ladder-row').count()!==12)throw Error('Round '+id+' requires 12 full ranked statements');
    const selectors=ladder.locator('button.xv-rank-select');
    if(await selectors.count()!==12)throw Error('Round '+id+' requires twelve selectable ranks');
    if(await ladder.locator('li.xv-rank-selected').count()!==1)throw Error('Round '+id+' must initially select one row');
    if(!await ladder.locator('li').first().evaluate(el=>el.classList.contains('xv-rank-selected')))throw Error('Round '+id+' must initially select rank 01');
    if(await selectors.first().getAttribute('aria-pressed')!=='true')throw Error('Round '+id+' rank 01 must start aria-pressed');
    const initial=await ladder.locator('li').first().evaluate(el=>{const st=getComputedStyle(el);return {background:st.backgroundColor,transform:st.transform,shadow:st.boxShadow};});
    if(initial.background!=='rgb(216, 238, 231)'||initial.transform==='none'||initial.shadow==='none')throw Error('Round '+id+' first row must start shaded and raised: '+JSON.stringify(initial));
    const second=selectors.nth(1);
    await second.click();
    if(await second.getAttribute('aria-pressed')!=='true')throw Error('Round '+id+' clicked item is not selected');
    if(!await ladder.locator('li').nth(1).evaluate(el=>el.classList.contains('xv-rank-selected')))throw Error('Round '+id+' clicked item did not become shaded');
    const shaded=await ladder.locator('li').nth(1).evaluate(el=>getComputedStyle(el).backgroundColor);
    if(shaded!=='rgb(216, 238, 231)')throw Error('Round '+id+' selected color incorrect: '+shaded);
    const lift=await ladder.locator('li').nth(1).evaluate(el=>{
      const st=getComputedStyle(el);
      return {transform:st.transform,shadow:st.boxShadow};
    });
    if(lift.transform==='none'||lift.shadow==='none')throw Error('Round '+id+' selected row must be raised with a shadow');

    await selectors.nth(2).click();
    if(await second.getAttribute('aria-pressed')!=='false')throw Error('Round '+id+' previous selection was not cleared');
    if(await ladder.locator('li.xv-rank-selected').count()!==1)throw Error('Round '+id+' should shade only one selected statement');
    await selectors.nth(2).click();
    if(await ladder.locator('li.xv-rank-selected').count())throw Error('Round '+id+' same selected statement should toggle off');
    const numbers=await ladder.locator('.xv-rank-number').allTextContents();
    if(numbers.map(n=>n.trim()).join(',')!=='01,02,03,04,05,06,07,08,09,10,11,12')throw Error('Round '+id+' rank labels incorrect');
    const originals=await ladder.locator('.xv-rank-statement').allTextContents();
    if(originals.some(t=>t.trim().length<45))throw Error('Round '+id+' has abbreviated survey statements');
    if(await ladder.locator('.xv-rank-lead').count()!==0)throw Error('Round '+id+' must not emphasize the first item');
    if((await ladder.innerText()).match(/\\b\\d+(?:\\.\\d+)?%/))throw Error('Round '+id+' must not imply percentages');
    const computed=await ladder.locator('.xv-rank-select').first().evaluate(el=>getComputedStyle(el).gridTemplateColumns);
    if(computed.split(' ').length!==2)throw Error('Round '+id+' rank layout is not two-column at '+viewport.width);

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
  const whiteBackground=await card.evaluate(el=>getComputedStyle(el).backgroundColor);
  if(whiteBackground!=='rgb(255, 255, 255)')throw Error('Round '+id+' background is not white: '+whiteBackground);
  const sectionBackground=await page.locator('.xv-rounds').evaluate(el=>getComputedStyle(el).backgroundColor);
  if(sectionBackground!=='rgb(255, 255, 255)')throw Error('Round '+id+' research section background is not white');
  if(id===4){
    if(await card.locator('.xv-round4-layout').count()!==1)throw Error('Round 4 is missing results-first layout');
    if(await card.locator('.xv-more-inner').count()!==0)throw Error('Round 4 still has old two-column layout');
    const positions=await Promise.all(['.xv-round4-layout .xv-round5-results','.xv-round4-layout .xv-round5-takeaways','.xv-round4-layout .xv-round5-method'].map(sel=>card.locator(sel).evaluate(el=>el.getBoundingClientRect().top)));
    if(!(positions[1]<positions[0]&&positions[0]<positions[2]))throw Error('Round 4 must display takeaways, results, then methodology');
    if(await card.locator('.xv-round4-layout .xv-round5-takeaway').count()!==3)throw Error('Round 4 must have three takeaway cards');
    const listed=await card.locator('.xv-round4-layout .xv-full-row b').allTextContents();
    if(listed.length!==15||listed.some(x=>!/^[0-9]+%$/.test(x.trim())))throw Error('Round 4 must preserve all 15 individual percentages');

    const measure=await card.locator('.xv-research-details').innerText();
    if(!measure.includes('Extremely, very, or somewhat concerned')) throw Error('Round 4 measure wording incorrect');
    const method=await card.locator('.xv-round4-layout .xv-round5-method').innerText();
    if(!method.includes('extremely, very, or somewhat concerned')) throw Error('Round 4 methodology contradicts the measure');
    const scores=await card.locator('.xv-full-row b').allTextContents();
    if(scores.some(s=>s.includes('#1')||s.includes('·')))throw Error('Round 4 includes second measure');
  }
  if(id===4 || id===5){
    const firstTakeaway=card.locator('.xv-round5-layout>.xv-round5-takeaways:first-child');
    const styles=await firstTakeaway.evaluate(el=>{const cs=getComputedStyle(el);return {borderTop:cs.borderTopWidth,paddingTop:parseFloat(cs.paddingTop)}});
    if(styles.borderTop!=='0px'||styles.paddingTop!==0)throw Error('Round '+id+' extra divider or top padding persists: '+JSON.stringify(styles));
    const gap=await card.evaluate(el=>{
      const details=el.querySelector('.xv-research-details').getBoundingClientRect();
      const takeaway=el.querySelector('.xv-round5-layout>.xv-round5-takeaways').getBoundingClientRect();
      return Math.round(takeaway.top-details.bottom);
    });
    if(gap>50)throw Error('Round '+id+' excessive gap between measure and takeaway: '+gap+'px');
  }
  if(id===5){
    if(await card.locator('.xv-round5-layout').count()!==1)throw Error('Round 5 new layout missing');
    const resultY=await card.locator('.xv-round5-results').evaluate(el=>el.getBoundingClientRect().top);
    const takeY=await card.locator('.xv-round5-takeaways').evaluate(el=>el.getBoundingClientRect().top);
    const methodY=await card.locator('.xv-round5-method').evaluate(el=>el.getBoundingClientRect().top);
    if(!(takeY<resultY && resultY<methodY))throw Error('Round 5 order wrong: takeaways, results, method required');
    if(await card.locator('.xv-round5-takeaway').count()!==3)throw Error('Round 5 takeaways should be three cards');
    if(await card.locator('.xv-more-inner').count())throw Error('Round 5 retained old two-column text structure');
    const white=await card.locator('.xv-round5-layout').evaluate(el=>getComputedStyle(el).backgroundColor);
    if(white!=='rgb(255, 255, 255)')throw Error('Round 5 layout background must be white');
    const sectionWhite=await page.locator('.xv-rounds').evaluate(el=>getComputedStyle(el).backgroundColor);
    if(sectionWhite!=='rgb(255, 255, 255)')throw Error('Round 5 surrounding section must be white');
    const text=await card.innerText();
    if(/guardrails/i.test(text)||!text.includes('strong protections against AI harms'))throw Error('Round 5 weak protection language');
    const values=(await card.locator('.xv-full-row b').allTextContents()).map(x=>x.trim());
    if(JSON.stringify(values)!==JSON.stringify(['81%','80%','80%','80%','75%']))throw Error('Round 5 must show the exact five TTJ percentages; found '+values.join(', '));
    if(!text.includes('two differently worded proposal versions'))throw Error('Round 5 methodology must acknowledge split wording');
    if(/\d+\s*[–-]\s*\d+%/.test(text))throw Error('Round 5 contains a forbidden percentage range');
    const labels=(await card.locator('.xv-full-row>span').allTextContents()).map(x=>x.trim());
    const expectedLabels=[
      'meaningful penalties for actors that use harmful AI',
      'immediate off switches for AI',
      'proof of model harmlessness before release',
      'bans on high-stakes uses of AI that hurt health, housing, or work',
      'community oversight boards with legal authority to investigate and act on AI problems'
    ];
    if(JSON.stringify(labels)!==JSON.stringify(expectedLabels))throw Error('Round 5 proposal wording/order does not match TTJ');
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
