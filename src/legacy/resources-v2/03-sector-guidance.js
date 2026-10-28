  function renderSector(){
    sectorTabs.innerHTML=Object.entries(sectors).map(([key,s])=>`<button type="button" data-sector="${key}" class="${key===sectorKey?'active':''}">${s.name}</button>`).join('');
    const s=sectors[sectorKey];
    sectorPanel.innerHTML=`<div class="rv-sector-left"><span class="rv-mini">Questions to ask</span><h3>${s.name}</h3><div class="rv-sector-questions">${s.questions.map((q,i)=>`<div><span>0${i+1}</span><p>${q}</p></div>`).join('')}</div></div><div class="rv-sector-evidence"><span class="rv-mini">Useful evidence</span>${s.evidence.map(([n,t])=>`<article><strong>${n}</strong><p>${t}</p></article>`).join('')}</div>`;
    sectorTabs.querySelectorAll('[data-sector]').forEach(btn=>btn.addEventListener('click',()=>{sectorKey=btn.dataset.sector;renderSector();}));
  }
  renderSector();

  const rapidGrid=document.getElementById('rv-rapid-grid');
  rapidGrid.innerHTML=rapidItems.map(([title,text],i)=>`<label class="rv-check-item"><input type="checkbox"><span class="rv-check-box">✓</span><b>0${i+1}</b><div><h3>${title}</h3><p>${text}</p></div></label>`).join('');
  function updateRapid(){
    const all=[...rapidGrid.querySelectorAll('input')];const n=all.filter(x=>x.checked).length;
    document.getElementById('rv-progress-fill').style.width=`${n/all.length*100}%`;
    document.getElementById('rv-progress-label').textContent=`${n} / ${all.length}`;
  }
  rapidGrid.querySelectorAll('input').forEach(x=>x.addEventListener('change',updateRapid));
  document.getElementById('rv-rapid-reset').addEventListener('click',()=>{rapidGrid.querySelectorAll('input').forEach(x=>x.checked=false);updateRapid();});
  updateRapid();

