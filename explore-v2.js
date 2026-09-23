(() => {
  const ROOT_ID = 'data-view';
  const root = document.getElementById(ROOT_ID);
  if (!root) return;

  const rounds = [
    {
      id: 1,
      date: 'Mar 6–9, 2026',
      n: '1,242',
      metric: 'MaxDiff',
      title: 'Main concerns about government use of AI',
      explainer: 'Twelve concerns compared directly using MaxDiff. Scores below are relative rankings, not percentages.',
      suggestion: 'Concrete consequences beat abstract warnings.',
      more: 'When people compared different concerns about government use of AI, the strongest worries were not technical. People were most concerned that public services would become harder to use, that a single mistake could affect millions, and that AI could be used to mislead the public. The messaging lesson is straightforward: start with what changes for the person using the service. An abstract warning about opacity or bias is less immediate than showing someone unable to get help, wrongly losing support, or facing an error nobody will take responsibility for.',
      detail: 'The strongest message was simple: technology gets between people and the public help they need. Scale also matters — one automated error can affect millions.',
      method: 'MaxDiff is a relative preference score, not a percentage. Positive values ranked higher against the other options tested in this round.',
      bars: [
        ['Public services become harder to use', 6.3, '+6.3'],
        ['One mistake can harm millions', 5.3, '+5.3'],
        ['Misleading the public with fake media', 3.8, '+3.8'],
        ['No one takes responsibility for harm', 2.6, '+2.6'],
        ['Wrongful fraud flags / benefit cuts', 2.1, '+2.1']
      ],
      all: [
        ['Public services become harder to use', '+6.3'],
        ['One mistake can harm millions', '+5.3'],
        ['Misleading the public with fake media', '+3.8'],
        ['No one takes responsibility for harm', '+2.6'],
        ['Real wrongful fraud flags / benefit cuts', '+2.1'],
        ['Predicting what people may do', '−0.9'],
        ['Treating mistakes as fraud', '−1.7'],
        ['AI looks objective when it is not', '−2.5'],
        ['Cuts presented as efficiency', '−2.9'],
        ['Selective or unequal enforcement', '−3.5'],
        ['People cannot see how decisions were made', '−3.9'],
        ['Sweeping claim that AI degrades services', '−4.7']
      ]
    },
    {
      id: 2,
      date: 'Mar 20–23, 2026',
      n: '1,193',
      metric: 'MaxDiff',
      title: 'Which broader AI harms feel most serious?',
      explainer: 'Twelve harms compared directly using MaxDiff.',
      suggestion: 'The doctor-versus-algorithm conflict is the standout.',
      more: 'One result towers over everything else: an insurer using AI to deny doctor-recommended care. The example combines several features that recur throughout the research: something essential is at stake, a recognizable institution is responsible, a human judgment is being displaced, and the person experiencing the harm has something concrete taken away. It is also notable that data-center pressure on water and electricity came second, showing that the physical and community consequences of AI infrastructure can resonate when described concretely.',
      detail: 'People react most strongly when AI becomes a gatekeeper between a person and something essential. Concrete institutional action is more powerful than abstract warnings about corporate power.',
      method: 'MaxDiff is a relative preference score, not a percentage. Positive and negative values show relative position within this set.',
      bars: [
        ['Insurer AI denies doctor-recommended care', 15.7, '+15.7'],
        ['Data centres strain water and power', 5.2, '+5.2'],
        ['Government outsources programs to tech firms', 3.7, '+3.7'],
        ['Benefits / housing / jobs cut, no accountability', 1.3, '+1.3'],
        ['Tracking data without meaningful consent', 0.5, '+0.5']
      ],
      all: [
        ['Insurer AI denies doctor-recommended care', '+15.7'],
        ['Data centres strain water and power', '+5.2'],
        ['Government outsources programs to tech firms', '+3.7'],
        ['Benefits / housing / jobs cut, no accountability', '+1.3'],
        ['Tracking data without meaningful consent', '+0.5'],
        ['Major decisions cannot be explained', '+0.3'],
        ['Big Tech concentration of power', '+0.2'],
        ['Worker monitoring / scheduling / wage control', '−1.0'],
        ['AI economy leaves struggling people behind', '−1.5'],
        ['Wrongful decisions reduce civic participation', '−2.8'],
        ['Bias and discrimination', '−7.7'],
        ['Creative work used without permission/payment', '−13.8']
      ]
    },
    {
      id: 3,
      date: 'Apr 24–27, 2026',
      n: '1,167',
      metric: 'At least somewhat upset · %',
      title: 'Who controls consequential AI decisions?',
      explainer: 'Share at least somewhat upset if each actor were in charge of AI used to make consequential decisions.',
      suggestion: 'The issue is consequential decision power.',
      more: 'People are uneasy about giving almost any powerful institution permission to put AI in charge of consequential decisions. Health insurers generated the strongest concern, but landlords, government contractors, state officials, Big Tech companies and others were close behind. Even employers, who were viewed comparatively more favorably, still produced substantial unease. This tells us something important about the “villain” in AI messaging: the institution does not need to be universally hated. A person can trust or even like an organization and still believe it should not have certain automated powers over them.',
      detail: 'Named political figures can produce very intense reactions but also polarise. Everyday gatekeepers create broader shared unease. Employers were generally viewed more favourably, yet 53% were still at least somewhat upset about employer-controlled AI.',
      method: 'Percentages show the share at least somewhat upset under this question wording. Named political actors are available in the expanded results; they are not used in the main institutional comparison below.',
      bars: [
        ['Health insurance companies', 68, '68%'],
        ['Landlords', 67, '67%'],
        ['Private companies running public programs', 67, '67%'],
        ['State government officials', 66, '66%'],
        ['Big Tech companies', 64, '64%'],
        ['Employer', 53, '53%']
      ],
      all: [
        ['Health insurance companies', '68%'],
        ['Donald Trump', '67%'],
        ['Trump administration officials', '67%'],
        ['ICE', '67%'],
        ['Landlords', '67%'],
        ['Private companies running public programs', '67%'],
        ['State government officials', '66%'],
        ['Elon Musk', '65%'],
        ['Big Tech companies', '64%'],
        ['Employer', '53%']
      ]
    },
    {
      id: 4,
      date: 'Jul 2–5, 2026',
      n: '1,164',
      metric: 'Extremely / very concerned · %',
      title: 'Which specific uses of AI cross the line?',
      explainer: 'People rated fifteen concrete scenarios, then selected the one they most wanted addressed first.',
      suggestion: 'Specific uses reveal a broad boundary.',
      more: 'This round exposes the gap between what people immediately associate with AI and what becomes most concerning once they see what AI can actually be used to do. Without examples, privacy, surveillance, job loss and misinformation came readily to mind. But when people saw specific scenarios, concern was extremely high across health care, disability and Social Security, benefits, workplace monitoring, pricing, housing and being forced to deal with an AI instead of a person. The communications implication is significant: do not assume the most familiar AI issue is the strongest one. Give people concrete examples of automated power in everyday life.',
      detail: '897 people supplied open-ended responses before seeing the scenarios. The most common spontaneous themes were privacy/data/surveillance (20%), job loss/economic harm (16%), and misinformation/deepfakes (10%).',
      method: 'The chart shows extreme/very concern. The expanded table also includes forced-choice “#1 priority”; these are different measures and should not be read as interchangeable.',
      bars: [
        ['Doctor-recommended treatment denied', 73, '73%'],
        ['Social Security / disability cut off', 72, '72%'],
        ['Falsely accused of benefits fraud', 71, '71%'],
        ['Charged more for groceries', 71, '71%'],
        ['Job rejection with no human involved', 70, '70%'],
        ['Forced to deal with AI instead of a person', 69, '69%']
      ],
      all: [
        ['Doctor-recommended treatment denied', '73% · 11% #1'],
        ['Social Security / disability cut off', '72% · 27% #1'],
        ['Falsely accused of benefits fraud', '71% · 7% #1'],
        ['Charged more for groceries', '71% · 3% #1'],
        ['Job rejection with no human involved', '70% · 5% #1'],
        ['Everything at work monitored', '70% · 7% #1'],
        ['Forced to deal with AI instead of a person', '69% · 6% #1'],
        ['Medicaid cut off', '68% · 6% #1'],
        ['Spied on at home to build eviction case', '68% · 6% #1'],
        ['Transplant / pain medicine decision', '68% · 3% #1'],
        ['Rent raised using automated pricing', '67% · 5% #1'],
        ['Benefits repayment demand', '65% · 2% #1'],
        ['Apartment rejected by faulty background check', '65% · 1% #1'],
        ['Child falsely flagged as school threat', '64% · 5% #1'],
        ['Home or car loan denied', '62% · 2% #1']
      ]
    },
    {
      id: 5,
      date: 'Jul 10–13, 2026',
      n: '1,219',
      metric: 'MaxDiff',
      title: 'Which three-word response feels right?',
      explainer: 'Six accountability slogans compared directly using MaxDiff.',
      suggestion: '“Prevent, Protect, Repair” gives TTJ a lifecycle of responsibility.',
      more: 'This round asked a deceptively simple question: what language best describes what should happen when AI can cause harm? “Prevent, Protect, Repair” won overwhelmingly. The individual words matter. Prevent says harm should not simply be accepted as inevitable. Protect puts the emphasis on people while systems are being used. Repair says responsibility continues after something goes wrong and the harm should actually be put right. Importantly, the phrase also performed strongly across partisan groups.',
      detail: 'Prevent beat Stop. Protect beat Mitigate by a large margin. Repair beat Fix. The winning phrase performed strongly among Democrats, Independents and Republicans.',
      method: 'MaxDiff values are relative preference scores, not percentages.',
      bars: [
        ['Prevent, Protect, Repair', 24.7, '+24.7'],
        ['Stop, Protect, Repair', 7.1, '+7.1'],
        ['Prevent, Stop, Fix', 2.7, '+2.7'],
        ['Stop, Protect, Fix', -4.3, '−4.3'],
        ['Prevent, Stop, Treat', -7.5, '−7.5'],
        ['Prevent, Mitigate, Repair', -22.6, '−22.6']
      ],
      all: [
        ['Prevent, Protect, Repair', '+24.7'],
        ['Stop, Protect, Repair', '+7.1'],
        ['Prevent, Stop, Fix', '+2.7'],
        ['Stop, Protect, Fix', '−4.3'],
        ['Prevent, Stop, Treat', '−7.5'],
        ['Prevent, Mitigate, Repair', '−22.6']
      ]
    },
    {
      id: 6,
      date: 'Jul 24–27, 2026',
      n: '1,058',
      metric: 'Support · % / reported range',
      title: 'What rules are people willing to support?',
      explainer: 'Support for concrete guardrails on high-stakes AI. Every major proposal tested at 70% or higher.',
      suggestion: 'Concern has become permission for meaningful intervention.',
      more: 'The final round answers one of the biggest questions raised by the previous research: does concern actually translate into support for action? Every major guardrail tested received support of 70 percent or more, including safety proof, off switches, meaningful penalties, community authority and bans on some high-stakes uses. More people worried that regulation would not go far enough than worried about excessive intervention.',
      detail: '72% supported the full package; 32% worried rules would not go far enough; 48% said the maker and user should be equally responsible. Only 4% said neither the vendor nor the organisation using the system should be responsible after a harmful hiring error.',
      method: 'Ranges preserve split-sample or version differences. They should not be treated as single-point estimates.',
      bars: [
        ['Meaningful penalties', 79, '77–81%'],
        ['Off switches', 79.5, '79–80%'],
        ['Safety proof before release', 79.5, '79–80%'],
        ['High-stakes bans', 75, '70–80%'],
        ['Safety proof before use', 77, '77%'],
        ['Community boards with real/legal authority', 74.5, '74–75%']
      ],
      all: [
        ['Meaningful penalties', '77–81%'],
        ['Off switches', '79–80%'],
        ['Safety proof before release', '79–80%'],
        ['High-stakes bans', '70–80%'],
        ['Safety proof before use', '77%'],
        ['Community boards with real/legal authority', '74–75%']
      ]
    }
  ];

  const agePriority = [
    { label: 'Social Security / disability cut off', under45: 11, over45: 35 },
    { label: 'Doctor-recommended treatment denied', under45: 5, over45: 14 },
    { label: 'Eviction surveillance', under45: 10, over45: 4 },
    { label: 'Rent raised by automated pricing', under45: 9, over45: 3 },
    { label: 'Child falsely flagged as school threat', under45: 9, over45: 2 },
    { label: 'False benefits fraud accusation', under45: 8, over45: 6 },
    { label: 'Everything at work monitored', under45: 8, over45: 6 },
    { label: 'Forced to deal with AI instead of a person', under45: 7, over45: 6 },
    { label: 'Medicaid cut off', under45: 6, over45: 6 },
    { label: 'Job rejection with no human involved', under45: 6, over45: 4 }
  ];

  const partyConcern = [
    { label: 'Doctor-recommended treatment denied', dem: 73, ind: 72, rep: 73 },
    { label: 'Social Security / disability cut off', dem: 75, ind: 72, rep: 69 },
    { label: 'False benefits fraud accusation', dem: 72, ind: 72, rep: 69 },
    { label: 'Charged more for groceries', dem: 73, ind: 68, rep: 69 },
    { label: 'Job rejection with no human involved', dem: 75, ind: 63, rep: 68 },
    { label: 'Everything at work monitored', dem: 72, ind: 66, rep: 71 },
    { label: 'Forced AI customer service', dem: 68, ind: 67, rep: 70 },
    { label: 'Medicaid cut off', dem: 74, ind: 64, rep: 62 },
    { label: 'Eviction surveillance', dem: 69, ind: 67, rep: 68 },
    { label: 'Rent raised by automated pricing', dem: 71, ind: 65, rep: 63 }
  ];

  const institutions = [
    { key:'employer', name:'Your employer', fav:75, upset:53, note:'Among employed respondents, 75% viewed their employer favourably. 53% were at least somewhat upset about their employer being in charge of AI used to make consequential decisions.', icon:'briefcase' },
    { key:'tech', name:'Big Tech', fav:57, upset:64, note:'57% viewed Big Tech companies such as Google, Meta and Amazon favourably. 64% were at least somewhat upset about Big Tech controlling consequential AI decisions.', icon:'server' },
    { key:'state', name:'State government', fav:53, upset:66, note:'53% viewed officials in their state government favourably. 66% were at least somewhat upset about state officials controlling consequential AI decisions.', icon:'building' },
    { key:'insurer', name:'Health insurers', fav:47, upset:68, note:'Views of health insurance companies were evenly split at 47% favourable and 47% unfavourable. 68% were at least somewhat upset about insurer-controlled AI decisions.', icon:'health' },
    { key:'landlord', name:'Landlords', fav:40, upset:67, note:'40% viewed landlords favourably. 67% were at least somewhat upset about landlords controlling consequential AI decisions.', icon:'key' },
    { key:'contractor', name:'Public-program contractors', fav:33, upset:67, note:'33% viewed private companies hired by government to run public programs favourably. 67% were at least somewhat upset about these contractors controlling consequential AI decisions.', icon:'network' }
  ];

  const quotes = [
    {theme:'Jobs & economy', text:'Job displacement and online data privacy.'},
    {theme:'Jobs & economy', text:'if it replaces a job someone I know has now'},
    {theme:'Control & autonomy', text:'Skeptical that they will get my personal information and capitalize on it and the mere aspect of their control is terrifying.'},
    {theme:'Security / safety', text:'Controlling the missile system.'},
    {theme:'Privacy & surveillance', text:'The spying that takes place through your phone, and television.'},
    {theme:'Privacy & surveillance', text:'That AI would have my personal information'},
    {theme:'Control & autonomy', text:'The controlling of my finances and personal information'},
    {theme:'Privacy & surveillance', text:'Having my information hacked'},
    {theme:'Human connection', text:'IT IS NOT A HUMAN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'},
    {theme:'Misinformation & deepfakes', text:'I hate all the deepfakes and scams getting way too realistic nowadays'},
    {theme:'Privacy & surveillance', text:'Personal privacy'},
    {theme:'Human connection', text:'Replacing humans'},
    {theme:'Jobs & economy', text:'Losing my job'},
    {theme:'Jobs & economy', text:'AI is untrustworthy and is used to cut jobs while maximize profits for big corporations.'},
    {theme:'Resources & infrastructure', text:'AI taking up energy and water through data centers and causing water shortages and energy price increases. Also AI taking jobs from humans.'},
    {theme:'Privacy & surveillance', text:'Losing privacy'},
    {theme:'Human connection', text:'Mainly AI replacing a human being'},
    {theme:'Misinformation & deepfakes', text:'Getting false information.'},
    {theme:'Misinformation & deepfakes', text:"I'm most concerned about false information and misinformation"},
    {theme:'Privacy & surveillance', text:'Monitoring of phones and viewing habits'},
    {theme:'Jobs & economy', text:'Taking jobs away from education which I work in'},
    {theme:'Misinformation & deepfakes', text:'Fake news and takes jobs'},
    {theme:'Jobs & economy', text:'I do not use AI at all. I feel it will lead to humans losing their jobs to the robots.'},
    {theme:'Jobs & economy', text:"I'm concern that AI will take people's jobs and there are no jobs to replace it."},
    {theme:'Privacy & surveillance', text:'Fear of being taken advantage of or unjustly accused of a crime. Losing our privacy and freedoms due to illegal "spying" of us 24hrs a day.'},
    {theme:'Human connection', text:'Replacing jobs and losing human connection'},
    {theme:'Human connection', text:'Taking away connections between human to human. I fear were moving into isolation because technology has us occupied'},
    {theme:'Human connection', text:'loss of human interaction'},
    {theme:'Control & autonomy', text:'That this technology will eliminate various job sectors and the programs mat develop at such a rate that they are beyond human control.'},
    {theme:'Resources & infrastructure', text:'To monitor, control, or otherwise anything to do with infrastructure. By infrastructure i mean power, water, financial, or oil industry'},
    {theme:'Control & autonomy', text:'I worry that AI is somewhat out of control already and that companies will use it in ways that are detrimental to citizens.'}
  ];

  const safeguards = [
    { name:'Meaningful penalties', value:'77–81%', min:77, copy:'Consequences for companies or institutions when harmful systems break the rules.' },
    { name:'Off switches', value:'79–80%', min:79, copy:'The ability to stop a system when it is causing harm.' },
    { name:'Safety proof before release', value:'79–80%', min:79, copy:'Requiring evidence of safety before a system reaches the public.' },
    { name:'High-stakes bans', value:'70–80%', min:70, copy:'Restrictions on some AI decisions involving health care, housing or work.' },
    { name:'Safety proof before use', value:'77%', min:77, copy:'Requiring organisations to demonstrate safety before deployment.' },
    { name:'Community authority', value:'74–75%', min:74, copy:'Community boards with real or legal authority over high-stakes uses.' }
  ];

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
          <p class="xv-hero-dek">Six rounds of national message testing reveal what people notice, what worries them, who they trust with consequential decisions, and what protections they support.</p>
          <div class="xv-snapshot" aria-label="Research scale">
            <div class="xv-stat">
              <strong data-count="7043">0</strong>
              <span>likely voters interviewed</span>
            </div>
            <div class="xv-stat xv-stat-accent">
              <strong data-count="6">0</strong>
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
              <div class="xv-eyebrow">The six rounds</div>
              <h2 id="xv-rounds-title">See what was tested.</h2>
            </div>
            <p>Move through each round. The interpretation comes first; the chart shows the evidence behind it. Open the drawer for the fuller result set and method.</p>
          </div>
          <div class="xv-round-tabs" role="tablist" aria-label="Research rounds">
            ${rounds.map(r => `<button type="button" role="tab" data-round-select="${r.id}" aria-selected="${r.id===1}"><span>0${r.id}</span><small>${r.date.split(',')[0]}</small></button>`).join('')}
          </div>
          <div id="xv-round-panel" class="xv-round-panel" aria-live="polite"></div>
        </div>
      </section>

      <section class="xv-demographics" aria-labelledby="xv-who-title">
        <div class="xv-shell">
          <div class="xv-section-head xv-section-head-dark">
            <div>
              <div class="xv-eyebrow">Who thinks what?</div>
              <h2 id="xv-who-title">One dataset.<br><span>Different lenses.</span></h2>
            </div>
            <p>Explore Round 4 by age or party affiliation. The display changes measure deliberately: age shows forced-choice priority; party shows the share extremely or very concerned.</p>
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
          <h2 id="xv-institutions-title">A person may like an institution, but strongly dislike what it does with AI.</h2>
          <p class="xv-institutions-dek">Choose an institution. Each panel compares ordinary favourability with discomfort about that institution controlling AI decisions about a person’s life.</p>
          <div class="xv-institution-grid" id="xv-institution-grid">
            ${institutions.map((item, i) => `
              <button type="button" class="xv-institution-card ${i===0?'active':''}" data-institution="${item.key}" aria-pressed="${i===0}">
                <div class="xv-icon">${iconSvg(item.icon)}</div>
                <div class="xv-inst-name">${item.name}</div>
                <div class="xv-inst-tease"><span>${item.fav}% favourable</span><span>${item.upset}% upset about AI control</span></div>
                <div class="xv-drop-mark" aria-hidden="true">↓</div>
              </button>`).join('')}
          </div>
          <div id="xv-institution-detail" class="xv-institution-detail" aria-live="polite"></div>
          <p class="xv-method">Favourability and “at least somewhat upset” come from two different questions. They should not be subtracted from one another or read as complementary shares. Employer favourability is among employed respondents.</p>
        </div>
      </section>

      <section class="xv-quotes" aria-labelledby="xv-quotes-title">
        <div class="xv-shell">
          <div class="xv-section-head xv-section-head-dark">
            <div>
              <div class="xv-eyebrow">In their own words</div>
              <h2 id="xv-quotes-title">Search the <span>quote bank.</span></h2>
            </div>
            <p>Before respondents were shown concrete scenarios in Round 4, they were asked openly what concerned them about AI. These are verbatim responses.</p>
          </div>
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
            <div class="xv-eyebrow">Round 6 / What people supported</div>
            <h2 id="xv-limits-title">Majorities supported every <span>guardrail tested.</span></h2>
            <p>Support was at least 70% for every major proposal in the final round.</p>
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
          <div class="xv-limit-note"><b>One more accountability signal:</b> only 4% said neither the vendor nor the organisation using the system should be responsible after a harmful hiring error.</div>
        </div>
      </section>

      <section class="xv-source">
        <div class="xv-shell xv-source-inner">
          <div>
            <div class="xv-eyebrow">Source & method</div>
            <p>TechTonic Justice + Data for Progress message testing, six national surveys of likely voters, March–July 2026. Question wording, measures and samples vary by round. MaxDiff scores are relative preferences, not percentages.</p>
          </div>
          <a href="#resources">View research resources ↗</a>
        </div>
      </section>
    </div>`;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    const bars = round.bars.map(([label, value, display]) => {
      const negative = typeof value === 'number' && value < 0;
      return `<div class="xv-evidence-row ${negative?'negative':''}">
        <div class="xv-evidence-line"><span>${label}</span><b>${display}</b></div>
        <div class="xv-evidence-track"><span style="--w:${barWidth(round, value)}%"></span></div>
      </div>`;
    }).join('');

    const fullRows = round.all.map(([label, value]) => `<div class="xv-full-row"><span>${label}</span><b>${value}</b></div>`).join('');

    document.getElementById('xv-round-panel').innerHTML = `
      <article class="xv-round-card" data-round="${round.id}">
        <div class="xv-round-topline">
          <div><span>ROUND 0${round.id}</span><b>${round.date}</b></div>
          <div class="xv-round-nav">
            <button type="button" data-round-nav="${round.id-1}" ${round.id===1?'disabled':''}>← Previous</button>
            <button type="button" data-round-nav="${round.id+1}" ${round.id===6?'disabled':''}>Next →</button>
          </div>
        </div>
        <div class="xv-round-titleblock">
          <h3>${round.title}</h3>
          <p class="xv-round-explainer">${round.explainer}</p>
          <div class="xv-round-meta"><span>N=${round.n} likely voters</span><span>${round.metric}</span></div>
        </div>
        <div class="xv-suggest">
          <span>What this suggests</span>
          <strong>${round.suggestion}</strong>
        </div>
        <div class="xv-evidence">${bars}</div>
        <details class="xv-more">
          <summary><span>More about this round</span><i aria-hidden="true">+</i></summary>
          <div class="xv-more-inner">
            <div class="xv-more-copy">
              <span class="xv-mini-label">What this round tells us</span>
              <p>${round.more}</p>
              <p class="xv-more-detail">${round.detail}</p>
              <div class="xv-method-box"><b>How to read it</b><span>${round.method}</span></div>
            </div>
            <div class="xv-full-results">
              <span class="xv-mini-label">Full result set</span>
              ${fullRows}
            </div>
          </div>
        </details>
      </article>`;

    document.querySelectorAll('[data-round-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = Number(btn.dataset.roundNav);
        if (target >= 1 && target <= 6) {
          renderRound(target);
          document.getElementById('xv-round-panel').scrollIntoView({behavior: reducedMotion?'auto':'smooth', block:'start'});
        }
      });
    });
  }

  root.querySelectorAll('[data-round-select]').forEach(btn => {
    btn.addEventListener('click', () => renderRound(Number(btn.dataset.roundSelect)));
  });
  renderRound(1);

  let lens = 'age';
  let ageMode = 'compare';
  let partyMode = 'compare';

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
    btn.addEventListener('click', () => {
      lens = btn.dataset.lens;
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
            <div><span>Favourable view of institution</span><b>${item.fav}%</b></div>
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
    return quotes.filter(item => {
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
