  function renderScenarioChips(){
    scenarioHolder.innerHTML = Object.entries(scenarios).map(([key,s])=>`<button type="button" data-scenario="${key}" class="${key===scenarioKey?'active':''}">${s.label}</button>`).join('');
    scenarioHolder.querySelectorAll('[data-scenario]').forEach(btn=>btn.addEventListener('click',()=>{scenarioKey=btn.dataset.scenario;fillScenario();renderScenarioChips();}));
  }
  function fillScenario(){
    const s=scenarios[scenarioKey];
    Object.keys(fields).forEach(k=>fields[k].value=s[k]);
    updateDraft();
  }
  function updateDraft(){
    const v=Object.fromEntries(Object.entries(fields).map(([k,el])=>[k,el.value.trim()]));
    const complete=Object.values(v).every(Boolean);
    const text=complete?`When ${v.decision} ${v.action}, ${v.person} ${v.consequence}.`:'Add all four parts to build a draft.';
    document.getElementById('rv-draft-preview').textContent=text;
    document.getElementById('rv-copy-draft').disabled=!complete;
  }
  Object.values(fields).forEach(el=>el.addEventListener('input',updateDraft));
  document.getElementById('rv-copy-draft').addEventListener('click',e=>copyText(document.getElementById('rv-draft-preview').textContent,e.currentTarget));
  renderScenarioChips();fillScenario();

  const languageTabs=document.getElementById('rv-language-tabs');
  let languageKey='health';
  function renderLanguage(){
    languageTabs.innerHTML=Object.entries(languageExamples).map(([key,x])=>`<button type="button" data-language="${key}" class="${key===languageKey?'active':''}">${x.title}</button>`).join('');
    const item=languageExamples[languageKey];
    document.getElementById('rv-say').textContent=item.say;
    document.getElementById('rv-not').textContent=item.avoid;
    languageTabs.querySelectorAll('[data-language]').forEach(btn=>btn.addEventListener('click',()=>{languageKey=btn.dataset.language;renderLanguage();}));
  }
  renderLanguage();

  const pointGrid=document.getElementById('rv-point-grid');
  pointGrid.innerHTML=talkingPoints.map((p,i)=>`<article class="rv-point-card ${i===0?'open':''}"><button type="button" class="rv-point-toggle" aria-expanded="${i===0?'true':'false'}"><span>0${i+1}</span><h3>${p.title}</h3><i>+</i></button><div class="rv-point-body"><p>${p.text}</p><button type="button" class="rv-inline-copy">Copy talking point</button></div></article>`).join('');
  pointGrid.querySelectorAll('.rv-point-card').forEach(card=>{
    const toggle=card.querySelector('.rv-point-toggle');
    toggle.addEventListener('click',()=>{const open=!card.classList.contains('open');card.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));});
    card.querySelector('.rv-inline-copy').addEventListener('click',e=>copyText(card.querySelector('.rv-point-body p').textContent,e.currentTarget));
  });

  let sectorKey='health';
  const sectorTabs=document.getElementById('rv-sector-tabs');
  const sectorPanel=document.getElementById('rv-sector-panel');
