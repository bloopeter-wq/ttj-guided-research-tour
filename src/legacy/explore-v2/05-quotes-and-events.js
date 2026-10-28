  function highlight(text, query) {
    const esc = s => s.replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
    const safe = esc(text);
    if (!query.trim()) return safe;
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      return safe.replace(new RegExp(`(${escapedQuery})`, 'ig'), '<mark>$1</mark>');
    } catch {
      return safe;
    }
  }

  function renderQuoteFilters() {
    const el = document.getElementById('xv-quote-filters');
    el.innerHTML = themes.map(t => `<button type="button" data-filter="${t}" class="${quoteTheme===t?'active':''}">${t}</button>`).join('');
    el.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
      quoteTheme = btn.dataset.filter;
      quoteLimit = 12;
      renderQuotes();
    }));
  }

  function filteredQuotes() {
    const q = quoteSearch.trim().toLowerCase();
    const featured = new Set([
      'AI is untrustworthy and is used to cut jobs while maximize profits for big corporations.',
      'AI taking up energy and water through data centers and causing water shortages and energy price increases. Also AI taking jobs from humans.',
      'Taking away connections between human to human. I fear were moving into isolation because technology has us occupied',
      'I worry that AI is somewhat out of control already and that companies will use it in ways that are detrimental to citizens.'
    ]);
    return quotes.filter(item => {
      if (featured.has(item.text)) return false;
      const themeOK = quoteTheme === 'All' || item.theme === quoteTheme;
      const searchOK = !q || item.text.toLowerCase().includes(q) || item.theme.toLowerCase().includes(q);
      return themeOK && searchOK;
    });
  }

  function renderQuotes() {
    const existingMore = document.getElementById('xv-show-more');
    if (existingMore) existingMore.remove();
    renderQuoteFilters();
    root.querySelectorAll('[data-quote-theme]').forEach(btn => btn.classList.toggle('active', btn.dataset.quoteTheme === quoteTheme));
    const matches = filteredQuotes();
    document.getElementById('xv-quote-count').textContent = `${matches.length} quote${matches.length===1?'':'s'} shown`;
    const grid = document.getElementById('xv-quote-grid');
    const shown = matches.slice(0, quoteLimit);
    grid.innerHTML = shown.length ? shown.map((item, i) => `<article class="xv-quote-card ${i%5===0?'feature':''}">
      <div class="xv-quote-theme">${item.theme}</div>
      <blockquote>“${highlight(item.text, quoteSearch)}”</blockquote>
      <div class="xv-quote-source">Unprompted response · Round 4</div>
    </article>`).join('') : `<div class="xv-no-results"><strong>No quotes match that search.</strong><span>Try another word or choose a different theme.</span></div>`;
    if (matches.length > quoteLimit) {
      grid.insertAdjacentHTML('afterend', `<button type="button" class="xv-show-more" id="xv-show-more">Show more (${matches.length-quoteLimit}) ↓</button>`);
      document.getElementById('xv-show-more').addEventListener('click', () => {
        quoteLimit += 12;
        renderQuotes();
      });
    }
  }

  document.getElementById('xv-quote-search').addEventListener('input', e => {
    quoteSearch = e.target.value;
    quoteLimit = 12;
    renderQuotes();
  });
  root.querySelectorAll('[data-quote-theme]').forEach(btn => btn.addEventListener('click', () => {
    quoteTheme = quoteTheme === btn.dataset.quoteTheme ? 'All' : btn.dataset.quoteTheme;
    quoteLimit = 12;
    renderQuotes();
  }));
  document.getElementById('xv-surprise').addEventListener('click', () => {
    const existingMore = document.getElementById('xv-show-more');
    if (existingMore) existingMore.remove();
    quoteTheme = 'All';
    quoteSearch = '';
    document.getElementById('xv-quote-search').value = '';
    const item = quotes[Math.floor(Math.random() * quotes.length)];
    const idx = quotes.indexOf(item);
    document.getElementById('xv-quote-grid').innerHTML = `<article class="xv-quote-card surprise feature">
      <div class="xv-quote-theme">${item.theme}</div>
      <blockquote>“${highlight(item.text, '')}”</blockquote>
      <div class="xv-quote-source">Unprompted response · Round 4</div>
    </article>`;
    document.getElementById('xv-quote-count').textContent = `1 random quote · ${idx+1} of ${quotes.length}`;
    renderQuoteFilters();
  });
  renderQuotes();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});

  root.querySelectorAll('.xv-rail, .xv-snapshot, .xv-institution-card').forEach(el => observer.observe(el));

  const hero = root.querySelector('.xv-hero');
  const heroObserver = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) {
      animateCounts();
      heroObserver.disconnect();
    }
  }, {threshold: 0.15});
  heroObserver.observe(hero);
})();
