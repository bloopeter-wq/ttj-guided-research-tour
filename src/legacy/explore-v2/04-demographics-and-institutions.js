  function renderSubcontrols() {
    const holder = document.getElementById('xv-subcontrols');
    const options = lens === 'age'
      ? [['under45','Under 45'],['over45','45+'],['compare','Compare']]
      : [['dem','Democrat'],['ind','Independent'],['rep','Republican'],['compare','Compare all']];
    const current = lens === 'age' ? ageMode : partyMode;
    holder.innerHTML = options.map(([key,label]) => `<button type="button" data-sub="${key}" class="${current===key?'active':''}">${label}</button>`).join('');
    holder.querySelectorAll('[data-sub]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (lens === 'age') ageMode = btn.dataset.sub;
        else partyMode = btn.dataset.sub;
        renderLens();
      });
    });
  }

  function renderAge() {
    const mode = ageMode;
    const summary = document.getElementById('xv-lens-summary');
    const viz = document.getElementById('xv-lens-viz');
    summary.innerHTML = `<span>Forced-choice priority</span><strong>${mode==='compare'?'Compare how priorities reorder by age':mode==='under45'?'Under 45':'Age 45+'}</strong><p>Respondents had to choose one top concern even when several scenarios worried them.</p>`;

    const sorted = [...agePriority].sort((a,b) => {
      if (mode === 'under45') return b.under45 - a.under45;
      if (mode === 'over45') return b.over45 - a.over45;
      return Math.max(b.under45,b.over45)-Math.max(a.under45,a.over45);
    });

    viz.innerHTML = sorted.map(item => {
      if (mode === 'compare') {
        return `<div class="xv-compare-row">
          <div class="xv-compare-label">${item.label}</div>
          <div class="xv-dual">
            <div class="xv-dual-line"><span>Under 45</span><div><i style="width:${item.under45/35*100}%"></i></div><b>${item.under45}%</b></div>
            <div class="xv-dual-line over"><span>45+</span><div><i style="width:${item.over45/35*100}%"></i></div><b>${item.over45}%</b></div>
          </div>
        </div>`;
      }
      const key = mode === 'under45' ? 'under45' : 'over45';
      const value = item[key];
      return `<div class="xv-single-row">
        <span>${item.label}</span><div><i style="width:${Math.max(6,value/35*100)}%"></i></div><b>${value}%</b>
      </div>`;
    }).join('');
  }

  function renderParty() {
    const mode = partyMode;
    const summary = document.getElementById('xv-lens-summary');
    const viz = document.getElementById('xv-lens-viz');
    summary.innerHTML = `<span>Extremely or very concerned</span><strong>${mode==='compare'?'Compare concern across party affiliation':mode==='dem'?'Democrats':mode==='ind'?'Independents / third party':'Republicans'}</strong><p>Across the fifteen scenarios tested, concern was broad and differences by party were generally limited.</p>`;

    const sorted = [...partyConcern].sort((a,b) => {
      if (mode === 'compare') return Math.max(b.dem,b.ind,b.rep)-Math.max(a.dem,a.ind,a.rep);
      return b[mode] - a[mode];
    });

    viz.innerHTML = sorted.map(item => {
      if (mode === 'compare') {
        return `<div class="xv-party-row">
          <div class="xv-compare-label">${item.label}</div>
          <div class="xv-party-track">
            <div class="xv-party-axis"></div>
            <span class="dem" style="left:${item.dem}%"><i>D</i><b>${item.dem}%</b></span>
            <span class="ind" style="left:${item.ind}%"><i>I</i><b>${item.ind}%</b></span>
            <span class="rep" style="left:${item.rep}%"><i>R</i><b>${item.rep}%</b></span>
          </div>
        </div>`;
      }
      const value = item[mode];
      return `<div class="xv-single-row xv-party-single">
        <span>${item.label}</span><div><i style="width:${value}%"></i></div><b>${value}%</b>
      </div>`;
    }).join('');
  }

  function renderLens() {
    root.querySelectorAll('[data-lens]').forEach(btn => btn.classList.toggle('active', btn.dataset.lens === lens));
    renderSubcontrols();
    if (lens === 'age') renderAge();
    else renderParty();
  }

  root.querySelectorAll('[data-lens]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lens === lens));
    btn.addEventListener('click', () => {
      lens = btn.dataset.lens;
      root.querySelectorAll('[data-lens]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.lens === lens)));
      renderLens();
    });
  });
  renderLens();

  function renderInstitution(key) {
    const item = institutions.find(i => i.key === key) || institutions[0];
    root.querySelectorAll('[data-institution]').forEach(btn => {
      const active = btn.dataset.institution === item.key;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('xv-institution-detail').innerHTML = `
      <div class="xv-inst-drawer">
        <div class="xv-inst-drawer-title">
          <span>Trust is not permission</span>
          <h3>${item.name}</h3>
          <p>${item.note}</p>
        </div>
        <div class="xv-inst-meters">
          <div class="xv-inst-meter favourable">
            <div><span>Favorable view of institution</span><b>${item.fav}%</b></div>
            <div class="xv-meter"><i style="width:${item.fav}%"></i></div>
          </div>
          <div class="xv-inst-meter ai">
            <div><span>At least somewhat upset about AI control</span><b>${item.upset}%</b></div>
            <div class="xv-meter"><i style="width:${item.upset}%"></i></div>
          </div>
        </div>
      </div>`;
  }

  root.querySelectorAll('[data-institution]').forEach(btn => {
    btn.addEventListener('click', () => renderInstitution(btn.dataset.institution));
  });
  renderInstitution('employer');

  const themes = ['All','Privacy & surveillance','Jobs & economy','Misinformation & deepfakes','Human connection','Control & autonomy','Security / safety','Resources & infrastructure'];
  let quoteTheme = 'All';
  let quoteSearch = '';
  let quoteLimit = 12;

