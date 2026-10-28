  function iconSvg(type) {
    const common = `viewBox="0 0 120 120" aria-hidden="true" focusable="false"`;
    const paths = {
      briefcase: `<rect x="20" y="43" width="80" height="52" rx="4"/><path d="M44 43V31h32v12M20 62h80M52 60h16v11H52z"/>`,
      server: `<rect x="22" y="22" width="76" height="26" rx="4"/><rect x="22" y="55" width="76" height="26" rx="4"/><path d="M31 35h2M40 35h2M31 68h2M40 68h2M60 48v7M60 81v17M45 98h30"/>`,
      building: `<path d="M18 48 60 22l42 26M25 50h70M31 50v40M48 50v40M72 50v40M89 50v40M20 91h80"/>`,
      health: `<rect x="22" y="28" width="76" height="66" rx="8"/><path d="M53 43h14v14h14v14H67v14H53V71H39V57h14z"/>`,
      key: `<circle cx="43" cy="55" r="19"/><path d="M57 68 94 95M77 79l10-10M85 87l10-10"/>`,
      network: `<rect x="46" y="18" width="28" height="24" rx="3"/><rect x="16" y="78" width="28" height="24" rx="3"/><rect x="76" y="78" width="28" height="24" rx="3"/><path d="M60 42v17M30 78V59h60v19"/>`
    };
    return `<svg ${common}>${paths[type] || paths.building}</svg>`;
  }

  root.classList.add('ttj-explore-v2');
  root.innerHTML = `
    <div class="xv-page">
      <section class="xv-hero" aria-labelledby="xv-title">
        <div class="xv-network" aria-hidden="true"></div>
        <div class="xv-shell xv-hero-inner">
          <div class="xv-eyebrow">02 / Explore the evidence</div>
          <h1 id="xv-title">Explore the <span>data.</span></h1>
          <p class="xv-hero-dek">Most polling on AI asks people how they feel about AI as a whole and whether they want it regulated. Our polling is more specific: we tested real-world uses of AI, the ground-level harms those systems cause, and specific policies to address those harms.</p>
          <div class="xv-snapshot" aria-label="Research scale">
            <div class="xv-stat">
              <strong data-count="5824">0</strong>
              <span>likely voters interviewed</span>
            </div>
            <div class="xv-stat xv-stat-accent">
              <strong data-count="5">0</strong>
              <span>rounds of research</span>
            </div>
            <div class="xv-stat xv-stat-time">
              <div class="xv-timeline"><span></span></div>
              <strong>MAR → JUL</strong>
              <span>2026</span>
            </div>
          </div>
        </div>
      </section>

      <section class="xv-rounds" aria-labelledby="xv-rounds-title">
        <div class="xv-shell">
          <div class="xv-section-head">
            <div>
              <div class="xv-eyebrow">The five rounds</div>
              <h2 id="xv-rounds-title">Round by Round</h2>
            </div>

          </div>
          <div class="xv-round-tabs" role="tablist" aria-label="Research rounds">
            ${rounds.map(r => `<button type="button" role="tab" data-round-select="${r.id}" aria-selected="${r.id===1}"><span>0${r.id}</span><small>${r.date.split(',')[0]}</small></button>`).join('')}
          </div>
          <div id="xv-round-panel" class="xv-round-panel" role="tabpanel" tabindex="0" aria-live="polite" aria-label="Selected research round"></div>
        </div>
      </section>

      <section class="xv-demographics" aria-labelledby="xv-who-title">
        <div class="xv-shell">
          <div class="xv-section-head xv-section-head-dark">
            <div>
              <div class="xv-eyebrow">Who thinks what?</div>
              <h2 id="xv-who-title">Explore by Demographic</h2>
            </div>
            <p>Round 4 asked voters about fifteen concrete uses of AI in health care, benefits, housing and work. Compare how those concerns differed by age and party affiliation. Age shows the issue respondents chose as their highest priority; party shows the share extremely or very concerned.</p>
          </div>
          <div class="xv-lens-card">
            <div class="xv-lens-top">
              <div class="xv-segmented" role="group" aria-label="Choose comparison lens">
                <button type="button" class="active" data-lens="age">Age</button>
                <button type="button" data-lens="party">Party affiliation</button>
              </div>
              <div id="xv-subcontrols" class="xv-subcontrols"></div>
            </div>
            <div id="xv-lens-summary" class="xv-lens-summary"></div>
            <div id="xv-lens-viz" class="xv-lens-viz"></div>
            <p class="xv-method-dark">Round 4, N=1,164 likely voters. Party is self-identified. Subgroup margins of error are larger than the ±3 percentage point margin for the full sample. Age and party views use different measures, labelled above.</p>
          </div>
        </div>
      </section>

      <section class="xv-institutions" aria-labelledby="xv-institutions-title">
        <div class="xv-shell">
          <div class="xv-kicker-line"><span></span><b>Round 3 / Trust and permission</b></div>
          <h2 id="xv-institutions-title">Liking an institution does not necessarily mean trusting its use of AI.</h2>
          <p class="xv-institutions-dek">Choose an institution. General favorability does not necessarily reduce concern about AI use. Naming the institution responsible does not require attacking it: the focus can stay on the choice to use automated decision-making in a particular context.</p>
          <p class="xv-section-meta">Round 3 · Apr 24–27, 2026 · N=1,167 likely voters · Measure: at least somewhat upset (%)</p>
          <div class="xv-institution-grid" id="xv-institution-grid">
            ${institutions.map((item, i) => `
              <button type="button" class="xv-institution-card ${i===0?'active':''}" data-institution="${item.key}" aria-pressed="${i===0}">
                <div class="xv-icon">${iconSvg(item.icon)}</div>
                <div class="xv-inst-name">${item.name}</div>
                <div class="xv-inst-tease"><span>${item.fav}% favorable</span><span>${item.upset}% upset about AI control</span></div>
                <div class="xv-drop-mark" aria-hidden="true">↓</div>
              </button>`).join('')}
          </div>
          <div id="xv-institution-detail" class="xv-institution-detail" aria-live="polite"></div>
          <p class="xv-method">Favorability and “at least somewhat upset” come from two different questions. They should not be subtracted from one another or read as complementary shares. Employer favorability is among employed respondents.</p>
        </div>
      </section>

      <section class="xv-quotes" aria-labelledby="xv-quotes-title">
        <div class="xv-shell">
          <div class="xv-section-head xv-section-head-dark">
            <div>
              <div class="xv-eyebrow">In their own words</div>
              <h2 id="xv-quotes-title">Voters may not be aware of the harms that <span>concern them most.</span></h2>
            </div>
            <p>Before respondents saw concrete scenarios, many defaulted to concerns they already had names for, including privacy and surveillance, job loss, and misinformation or deepfakes. Search the verbatim responses below.</p>
          </div>
          <div class="xv-featured-quotes" aria-label="Selected respondent quotes">
            <article><span>Jobs & economy</span><blockquote>“AI is untrustworthy and is used to cut jobs while maximize profits for big corporations.”</blockquote></article>
            <article><span>Resources & infrastructure</span><blockquote>“AI taking up energy and water through data centers and causing water shortages and energy price increases. Also AI taking jobs from humans.”</blockquote></article>
            <article><span>Human connection</span><blockquote>“Taking away connections between human to human. I fear were moving into isolation because technology has us occupied”</blockquote></article>
            <article><span>Control & autonomy</span><blockquote>“I worry that AI is somewhat out of control already and that companies will use it in ways that are detrimental to citizens.”</blockquote></article>
          </div>
          <div class="xv-explore-more-label"><span>Explore more responses</span><p>Search or filter the wider set of open-ended responses.</p></div>
          <div class="xv-quote-toolbar">
            <label class="xv-search">
              <span class="xv-search-icon" aria-hidden="true">⌕</span>
              <input id="xv-quote-search" type="search" placeholder="Search what people said…" autocomplete="off" />
            </label>
            <button type="button" class="xv-surprise" id="xv-surprise">Surprise me ↗</button>
          </div>
          <div class="xv-theme-stats" aria-label="Most common open-ended themes">
            <button type="button" data-quote-theme="Privacy & surveillance"><strong>20%</strong><span>privacy / data / surveillance</span></button>
            <button type="button" data-quote-theme="Jobs & economy"><strong>16%</strong><span>jobs / economic harm</span></button>
            <button type="button" data-quote-theme="Misinformation & deepfakes"><strong>10%</strong><span>misinformation / deepfakes</span></button>
          </div>
          <div class="xv-quote-filters" id="xv-quote-filters"></div>
          <div class="xv-quote-meta"><span id="xv-quote-count"></span><span>897 open-ended responses · July 2026</span></div>
          <div class="xv-quote-grid" id="xv-quote-grid"></div>
          <p class="xv-method-dark">Quotes are shown without respondent identifiers or demographic attribution. Spelling and punctuation are preserved. Data for Progress reported that 63% of the 897 answers named at least one substantive concern; the most common substantive themes are shown above.</p>
        </div>
      </section>

      <section class="xv-limits" aria-labelledby="xv-limits-title">
        <div class="xv-shell">
          <div class="xv-limits-head">
            <div class="xv-eyebrow">Round 5 / What people supported</div>
            <h2 id="xv-limits-title">Voters support <span>bans and more.</span></h2>
            <p>Every major protection tested received at least 70% support. We should not assume only voluntary or incremental measures will be publicly acceptable.</p>
            <div class="xv-section-meta">Round 5 · Jul 24–27, 2026 · N=1,058 likely voters · Measure: support (%) / reported range</div>
          </div>
          <div class="xv-rails" id="xv-rails">
            ${safeguards.map((s, i) => `
              <article class="xv-rail" style="--rail-delay:${i*80}ms; --rail:${s.min}%">
                <div class="xv-rail-index">0${i+1}</div>
                <div class="xv-rail-copy"><h3>${s.name}</h3><p>${s.copy}</p></div>
                <div class="xv-rail-track" aria-hidden="true"><span></span></div>
                <strong>${s.value}</strong>
              </article>`).join('')}
          </div>
          <div class="xv-limit-stats">
            <div><strong>72%</strong><span>supported the full package</span></div>
            <div><strong>32%</strong><span>worried rules would not go far enough</span></div>
            <div><strong>48%</strong><span>said maker + user should be equally responsible</span></div>
          </div>
          <div class="xv-limit-note"><b>One more accountability signal:</b> only 4% said neither the vendor nor the organization using the system should be responsible after a harmful hiring error.</div>
        </div>
      </section>

      <section class="xv-source">
        <div class="xv-shell xv-source-inner">
          <div>
            <div class="xv-eyebrow">Source & method</div>
            <p>TechTonic Justice + Data for Progress message testing, five national surveys of likely voters, March–July 2026. Question wording, measures and samples vary by round. Comparative rounds are shown in ranked order; percentage-based rounds show percentages.</p>
          </div>
          <a href="#resources">View research resources ↗</a>
        </div>
      </section>
    </div>`;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

