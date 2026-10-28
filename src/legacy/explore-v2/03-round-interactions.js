  function animateCounts() {
    const stats = root.querySelectorAll('[data-count]');
    stats.forEach(el => {
      const target = Number(el.dataset.count);
      if (reducedMotion) {
        el.textContent = target.toLocaleString('en-US');
        return;
      }
      const start = performance.now();
      const duration = target > 100 ? 950 : 650;
      const step = now => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-US');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  function barWidth(round, value) {
    if (round.metric === 'MaxDiff') {
      const max = Math.max(...round.bars.map(b => Math.abs(b[1])));
      return Math.max(5, (Math.abs(value) / max) * 100);
    }
    return Math.max(5, Math.min(100, value));
  }

  function renderRound(id) {
    const round = rounds.find(r => r.id === id) || rounds[0];
    root.querySelectorAll('[data-round-select]').forEach(btn => {
      const active = Number(btn.dataset.roundSelect) === round.id;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    const fullRows = round.all.map(([label, value], index) => {
      const displayed = round.id === 4 ? String(value).split(' · ')[0] : value;
      return `<div class="xv-full-row ${round.rankOnly ? 'xv-full-rank' : ''}">
        <span>${round.rankOnly ? `<i>${String(index + 1).padStart(2,'0')}</i>` : ''}${label}</span>
        ${round.rankOnly ? '' : `<b>${displayed}</b>`}
      </div>`;
    }).join('');
    const pairedInstitutions = round.id === 3 ? `
      <div class="xv-paired-key"><span>Favorable toward institution</span><span>Upset about its use of AI</span></div>
      <div class="xv-paired-results">
        ${institutions.map(item => `<div class="xv-paired-row">
          <strong>${item.name}</strong>
          <div class="xv-paired-bars">
            <div><span style="width:${item.fav}%"></span><b>${item.fav}%</b></div>
            <div><span style="width:${item.upset}%"></span><b>${item.upset}%</b></div>
          </div>
        </div>`).join('')}
      </div>
      <p class="xv-paired-note">These are separate survey questions, so the percentages are not complementary. Favorability toward employers was measured among employed respondents.</p>` : '';
    const panel=document.getElementById('xv-round-panel');
    panel.innerHTML = `
      <article class="xv-round-card" data-round="${round.id}">
        <div class="xv-round-topline">
          <div><span>ROUND 0${round.id}</span><b>${round.date}</b></div>
          <div class="xv-round-nav">
            <button type="button" data-round-nav="${round.id-1}" ${round.id===1?'disabled':''}>← Previous</button>
            <button type="button" data-round-nav="${round.id+1}" ${round.id===5?'disabled':''}>Next →</button>
          </div>
        </div>
        <div class="xv-round-titleblock">
          <h3 id="xv-round-${round.id}-title">${round.title}</h3>
          <p class="xv-round-context">${round.context}</p>
          ${round.id === 5 ? '<p class="xv-round-standout">Every major proposal tested received at least 70% support.</p>' : ''}
          <dl class="xv-research-details" aria-label="Research details">
            <div><dt>Date</dt><dd>${round.date}</dd></div>
            <div><dt>Sample</dt><dd>${round.n} likely voters</dd></div>
            <div><dt>Measure</dt><dd>${round.metric}</dd></div>
          </dl>
        </div>
        <div class="xv-more-inner xv-round-expanded">
          <div class="xv-more-copy">
            <span class="xv-mini-label">What this round tells us</span>
            <p>${round.more}</p>
            <p class="xv-more-detail">${round.detail}</p>
            <div class="xv-method-box"><b>How to read it</b><span>${round.method}</span></div>
          </div>
          <div class="xv-full-results">
            <span class="xv-mini-label">Results (full set)</span>
            ${pairedInstitutions}
            ${round.id === 3 ? '<p class="xv-paired-subhead">All institutions and public figures tested · upset about AI decision-making</p>' : ''}
            ${fullRows}
          </div>
        </div>
        <div class="xv-round-footer">
          <div class="xv-round-nav xv-round-nav-bottom">
            <button type="button" data-round-nav="${round.id-1}" ${round.id===1?'disabled':''}>← Previous round</button>
            <button type="button" data-round-nav="${round.id+1}" ${round.id===5?'disabled':''}>Next round →</button>
          </div>
          <button type="button" class="xv-copy-link" data-copy-round="${round.id}">Copy link to this round</button>
        </div>
      </article>`;
    panel.setAttribute('aria-labelledby','xv-round-'+round.id+'-title');

    document.querySelectorAll('[data-round-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = Number(btn.dataset.roundNav);
        if (target >= 1 && target <= 5) selectRound(target, true);
      });
    });
    const copyButton = document.querySelector('[data-copy-round="'+round.id+'"]');
    if (copyButton) copyButton.addEventListener('click', async () => {
      const url = new URL(window.location.href);
      url.hash = 'explore';
      url.searchParams.set('round', String(round.id));
      try {
        await navigator.clipboard.writeText(url.toString());
        copyButton.textContent = 'Link copied';
        setTimeout(() => { copyButton.textContent = 'Copy link to this round'; }, 1600);
      } catch {
        copyButton.textContent = 'Copy unavailable';
      }
    });
  }

  function setRoundUrl(id) {
    if (location.hash !== '#explore') return;
    const url = new URL(window.location.href);
    url.searchParams.set('round', String(id));
    url.hash = 'explore';
    history.replaceState(null, '', url.toString());
  }

  function selectRound(id, scroll) {
    const target = Math.min(5, Math.max(1, Number(id) || 1));
    renderRound(target);
    setRoundUrl(target);
    const active = root.querySelector('[data-round-select="'+target+'"]');
    root.querySelectorAll('[data-round-select]').forEach(btn => {
      const on = btn === active;
      btn.tabIndex = on ? 0 : -1;
      btn.setAttribute('aria-selected', String(on));
    });
    if (scroll) document.getElementById('xv-round-panel').scrollIntoView({behavior: reducedMotion?'auto':'smooth', block:'start'});
  }

  root.querySelectorAll('[data-round-select]').forEach(btn => {
    btn.setAttribute('aria-controls','xv-round-panel');
    btn.tabIndex = Number(btn.dataset.roundSelect)===1 ? 0 : -1;
    btn.addEventListener('click', () => selectRound(Number(btn.dataset.roundSelect), false));
    btn.addEventListener('keydown', event => {
      if (!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const current = Number(btn.dataset.roundSelect);
      let target = current;
      if (event.key==='Home') target=1;
      else if (event.key==='End') target=5;
      else if (event.key==='ArrowRight'||event.key==='ArrowDown') target=current===5?1:current+1;
      else target=current===1?5:current-1;
      selectRound(target,false);
      root.querySelector('[data-round-select="'+target+'"]').focus();
    });
  });
  const linkedRound = Number(new URLSearchParams(location.search).get('round'));
  selectRound(linkedRound >= 1 && linkedRound <= 5 ? linkedRound : 1, false);

  let lens = 'age';
  let ageMode = 'compare';
  let partyMode = 'compare';

