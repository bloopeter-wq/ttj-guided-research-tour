  function wordCards(arr){return arr.map(([word,why])=>`<button type="button" class="rv-word-card"><span>${word}</span><i>+</i><p>${why}</p></button>`).join('');}
  document.getElementById('rv-strong-words').innerHTML=wordCards(strongWords);
  document.getElementById('rv-weak-words').innerHTML=wordCards(weakWords);
  root.querySelectorAll('.rv-word-card').forEach(btn=>btn.addEventListener('click',()=>btn.classList.toggle('open')));

  const checks=[
    ['A person is visible', t=>/\b(you|your|person|people|patient|tenant|worker|applicant|family|child|recipient|customer)\b/i.test(t)],
    ['A decision-maker is named', t=>/\b(insurer|agency|landlord|employer|company|government|official|organisation|organization|school|contractor|provider)\b/i.test(t)],
    ['A concrete action is named', t=>/\b(deny|denies|denied|cut|cuts|stop|stops|flag|flags|reject|rejects|raise|raises|monitor|monitors|track|tracks|screen|screens|decide|decides)\b/i.test(t)],
    ['A consequence is visible', t=>/\b(lose|loses|lost|without|cannot|can’t|stopped|higher|more|less|harm|care|benefit|home|job|pay|support|treatment)\b/i.test(t)],
    ['Responsibility or recourse appears', t=>/\b(responsib|accountab|explain|appeal|challenge|correct|fix|repair|human|person)\w*/i.test(t)],
    ['The draft is not overloaded with jargon', t=>{const m=t.match(/\b(algorithmic|governance|mitigation|optimisation|optimization|transparency|framework|ecosystem|deployment)\b/gi)||[];return m.length<=2;}]
  ];
  document.getElementById('rv-analyse').addEventListener('click',()=>{
    const text=document.getElementById('rv-draft-text').value.trim();
    const analysis=document.getElementById('rv-analysis');
    if(!text){analysis.innerHTML='<div class="rv-analysis-empty"><span>!</span><p>Paste a draft first.</p></div>';return;}
    analysis.innerHTML=`<div class="rv-analysis-head"><span>Structural check</span><b>${text.split(/\s+/).length} words</b></div>${checks.map(([label,fn])=>{const ok=fn(text);return `<div class="rv-analysis-row ${ok?'ok':'consider'}"><i>${ok?'✓':'→'}</i><span>${label}</span><b>${ok?'Found':'Consider'}</b></div>`}).join('')}<p class="rv-analysis-note">This automated check looks only for structural signals. It does not assess factual accuracy, political effectiveness or whether a statement was survey tested.</p>`;
  });


})();