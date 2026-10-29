(() => {
  const ROOT_ID = 'data-view';
  const root = document.getElementById(ROOT_ID);
  if (!root) return;

  const rounds = [
    {
      id: 1,
      date: 'Mar 6–9, 2026',
      n: '1,242',
      metric: 'Ranked concerns',
      rankOnly: true,
      question: 'Which concerns about government use of AI stand out most when compared directly?',
      title: 'Main concerns about government use of AI',
      context: "We wanted to understand which types of harmful AI use concerned people the most when used by the government. So we asked: Some government agencies are using AI systems in their work. Here are some concerns people have raised about this. For each, please pick which you find most concerning and which you find least concerning.",
      explainer: 'Twelve concerns were compared directly.',
      suggestion: 'Make the abstract concrete and make the invisible harm visible.',
      more: 'When people compared different concerns about government use of AI, the strongest worries were not technical. People were most concerned that public services would become harder to use, that a single mistake could affect millions, and that AI could be used to mislead the public. The messaging lesson is straightforward: start with what changes for the person using the service. An abstract warning about opacity or bias is less immediate than showing someone unable to get help, wrongly losing support, or facing an error nobody will take responsibility for.',
      detail: 'The strongest message was simple: technology gets between people and the public help they need. Scale also matters — one automated error can affect millions.',
      method: 'These twelve statements are presented in order from most to least concerning. This round used comparative ranking, so percentage results are not available for these statements.',
      bars: [
        ['Public services become harder to use', 6.3, '+6.3'],
        ['One mistake can harm millions', 5.3, '+5.3'],
        ['Misleading the public with fake media', 3.8, '+3.8'],
        ['No one takes responsibility for harm', 2.6, '+2.6'],
        ['Wrongful fraud flags / benefit cuts', 2.1, '+2.1']
      ],
      all: [
              [
                      "When the government uses AI to run public services like Medicaid and Social Security, those services get harder to use. People who need help the most end up with less of it.",
                      "+6.3"
              ],
              [
                      "When the government uses AI to make decisions, one mistake can hurt millions of people at once. A human worker might affect a few hundred people, but AI spreads errors to everyone.",
                      "+5.3"
              ],
              [
                      "AI makes it possible for the government to create fake videos and photos that look real. When officials can fabricate events that never happened, people have no way to know what is true.",
                      "+3.8"
              ],
              [
                      "When government AI makes mistakes that hurt people, no one is held responsible. The people who are harmed are left to deal with the damage on their own.",
                      "+2.6"
              ],
              [
                      "Government AI has a terrible track record. In state after state, AI systems have wrongly accused people of fraud, cut off their benefits, and left them to fight charges that turned out to be wrong.",
                      "+2.1"
              ],
              [
                      "Governments use AI to make decisions based on guesses about how people will act in the future. People can be denied benefits or flagged as risks based on what AI predicts, not what they actually did.",
                      "−0.9"
              ],
              [
                      "When the government uses AI to detect fraud, the system can flag anyone and call it \"fraud,\" even when no one lied. People who made honest mistakes get treated the same as people who cheated.",
                      "−1.7"
              ],
              [
                      "When the government uses AI to decide who gets help, the results look fair and scientific even when they are not. People lose benefits based on formulas they cannot see or challenge.",
                      "−2.5"
              ],
              [
                      "When the government uses AI to make services \"more efficient,\" people end up losing the benefits they depend on. Efficiency often just means fewer people getting help.",
                      "−2.9"
              ],
              [
                      "When the government uses AI to enforce laws, it can choose to go after some people while leaving others alone. AI makes that kind of selective enforcement faster and harder to detect.",
                      "−3.5"
              ],
              [
                      "The government often doesn't have to tell people when AI is making decisions about their lives. People can't fight back against something they don't know is there",
                      "−3.9"
              ],
              [
                      "Every time the government has used AI to run services, those services have gotten worse. People face longer waits, get wrong answers, and have a harder time getting help.",
                      "−4.7"
              ]
      ]
    },
    {
      id: 2,
      date: 'Mar 20–23, 2026',
      n: '1,193',
      metric: 'Ranked concerns',
      rankOnly: true,
      question: 'Which broader harms associated with AI feel most serious when compared directly?',
      title: 'Which broader AI harms feel most serious?',
      context: "We wanted to understand which types of AI harms that were not necessarily just governmental concerned people the most. So we asked: Below are some concerns people have raised about artificial intelligence (AI). For each, please pick which you find most concerning and which you find least concerning.",
      explainer: 'Twelve harms were compared directly.',
      suggestion: 'The doctor-versus-algorithm conflict is the standout.',
      more: 'One result towers over everything else: an insurer using AI to deny doctor-recommended care. The example combines several features that recur throughout the research: something essential is at stake, a recognizable institution is responsible, a human judgment is being displaced, and the person experiencing the harm has something concrete taken away. It is also notable that data-center pressure on water and electricity came second, showing that the physical and community consequences of AI infrastructure can resonate when described concretely.',
      detail: 'People react most strongly when AI becomes a gatekeeper between a person and something essential. Concrete institutional action is more powerful than abstract warnings about corporate power.',
      method: 'These twelve statements are presented in order from most to least concerning. This round used comparative ranking, so percentage results are not available for these statements.',
      bars: [
        ['Insurer AI denies doctor-recommended care', 15.7, '+15.7'],
        ['Data centers strain water and power', 5.2, '+5.2'],
        ['Government outsources programs to tech firms', 3.7, '+3.7'],
        ['Benefits / housing / jobs cut, no accountability', 1.3, '+1.3'],
        ['Tracking data without meaningful consent', 0.5, '+0.5']
      ],
      all: [
              [
                      "Health insurance companies are using AI to deny care that doctors say their patients need. Families lose access to treatment not because of medicine but because a company's algorithm said no.",
                      "+15.7"
              ],
              [
                      "Tech companies are building massive data centers that use huge amounts of water and power. These centers drive up electric bills and take drinking water away from the families and farmers who live nearby.",
                      "+5.2"
              ],
              [
                      "Government agencies are handing control of programs like Medicaid and Social Security to tech companies. People who need help end up dealing with corporate chatbots instead of workers who can actually solve their problems.",
                      "+3.7"
              ],
              [
                      "Companies are choosing to deploy AI that cuts people's benefits, housing, and jobs. Current laws were not written for AI, so the people harmed have no clear way to hold anyone accountable.",
                      "+1.3"
              ],
              [
                      "Tech companies and government agencies are using our phones, cars, and home devices to track what we do and collect our personal data. Most of the time, they do this without telling us or asking.",
                      "+0.5"
              ],
              [
                      "Companies are using AI to make major decisions about people's benefits, housing, and jobs. No one in charge can explain how these systems reach their decisions, making them nearly impossible to challenge.",
                      "+0.3"
              ],
              [
                      "A handful of big tech companies control AI and are fighting to avoid oversight. If left unchecked, they will have free rein to shape the decisions that affect our benefits, housing, and jobs.",
                      "+0.2"
              ],
              [
                      "Companies are using AI to monitor workers, control their schedules, and keep wages as low as possible. Workers can be punished or fired based on an algorithm's judgment, with little chance to push back.",
                      "−1.0"
              ],
              [
                      "Tech companies and politicians are building an AI economy designed for people who are already doing well. People who are already struggling will fall further behind as AI reshapes access to benefits, housing, and jobs.",
                      "−1.5"
              ],
              [
                      "When companies use AI to wrongly cut someone's benefits, housing, or job, that person has to spend all their time fighting to get it back. That leaves less time and energy to have a say in their community.",
                      "−2.8"
              ],
              [
                      "Companies are deploying AI trained on biased data, making discrimination against women, people of color, and disabled people worse. They bury the bias in code, making it harder to see and fight.",
                      "−7.7"
              ],
              [
                      "Tech companies take the creative work that people post online and feed it into their AI systems without consent. The people who created those photos, songs, and stories are not asked for permission or offered payment.",
                      "−13.8"
              ]
      ]
    },
    {
      id: 3,
      date: 'Apr 24–27, 2026',
      n: '1,167',
      metric: 'At least somewhat upset · %',
      question: 'How upset would voters be if each institution controlled AI used to make consequential decisions?',
      title: 'Who is choosing to use AI?',
      context: "We wanted to understand how concerned people are about powerful people and institutions using AI to make decisions that affect their lives in critical ways. But we also wanted to determine if the primary driver of their concern came from how they felt about the institution overall or if it was driven by the use of AI and the potential harm it could cause. So first we asked people how favorably they viewed an institution and then we asked how concerned they were about that same institution using AI to make consequential decisions about their lives.",
      explainer: 'Share at least somewhat upset if each actor were in charge of AI used to make consequential decisions.',
      suggestion: 'The issue is consequential decision power.',
      more: 'People are uneasy about giving almost any powerful institution permission to put AI in charge of consequential decisions. Health insurers generated the strongest concern, but landlords, government contractors, state officials, Big Tech companies and others were close behind. Even employers, who were viewed comparatively more favorably, still produced substantial unease. This tells us something important about the “villain” in AI messaging: the institution does not need to be universally hated. A person can trust or even like an organization and still believe it should not have certain automated powers over them.',
      detail: 'Named political figures can produce very intense reactions but also polarise. Everyday gatekeepers create broader shared unease. Employers were generally viewed more favorably, yet 53% were still at least somewhat upset about employer-controlled AI.',
      method: 'The paired chart shows favorability and the share at least somewhat upset about AI decision-making among six institutions. These percentages come from separate questions and must not be subtracted. The list also includes the four public figures and institutions without a paired favorability comparison.',
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
      metric: 'Extremely, very, or somewhat concerned · %',
      question: 'How concerned are voters about specific high-stakes uses of AI in health care, benefits, housing and work?',
      title: 'Which specific uses of AI cross the line?',
      context: "We wanted to understand how concerned people already were about AI before we showed them specific AI harms and we also wanted to know how concerned people are about harms that affect their basic needs like health care, housing, employment, public benefits, education, food assistance, and transportation.",
      explainer: 'People rated fifteen concrete scenarios, then selected the one they most wanted addressed first.',
      suggestion: 'Specific uses reveal a broad boundary.',
      more: 'This round exposes the gap between what people immediately associate with AI and what becomes most concerning once they see what AI can actually be used to do. Without examples, privacy, surveillance, job loss and misinformation came readily to mind. But when people saw specific scenarios, concern was extremely high across health care, disability and Social Security, benefits, workplace monitoring, pricing, housing and being forced to deal with an AI instead of a person. The communications implication is significant: do not assume the most familiar AI issue is the strongest one. Give people concrete examples of automated power in everyday life.',
      detail: '897 people supplied open-ended responses before seeing the scenarios. The most common spontaneous themes were privacy/data/surveillance (20%), job loss/economic harm (16%), and misinformation/deepfakes (10%).',
      method: 'Results show the percentage extremely, very, or somewhat concerned about each specific use. The separate forced-choice priority measure is not shown here.',
      bars: [
        ['Doctor-recommended treatment denied', 73, '73%'],
        ['Social Security / disability cut off', 72, '72%'],
        ['Falsely accused of benefits fraud', 71, '71%'],
        ['Charged more for groceries', 71, '71%'],
        ['Job rejection with no human involved', 70, '70%'],
        ['Forced to deal with AI instead of a person', 69, '69%']
      ],
      all: [
        ['Doctor-recommended treatment denied', '73%'],
        ['Social Security / disability cut off', '72%'],
        ['Falsely accused of benefits fraud', '71%'],
        ['Charged more for groceries', '71%'],
        ['Job rejection with no human involved', '70%'],
        ['Everything at work monitored', '70%'],
        ['Forced to deal with AI instead of a person', '69%'],
        ['Medicaid cut off', '68%'],
        ['Spied on at home to build eviction case', '68%'],
        ['Transplant / pain medicine decision', '68%'],
        ['Rent raised using automated pricing', '67%'],
        ['Benefits repayment demand', '65%'],
        ['Apartment rejected by faulty background check', '65%'],
        ['Child falsely flagged as school threat', '64%'],
        ['Home or car loan denied', '62%']
      ]
    },
    {
      id: 5,
      date: 'Jul 24–27, 2026',
      n: '1,058',
      metric: 'Support · %',
      question: 'Which concrete protections against harmful uses of AI do voters support?',
      title: 'Support for strong protections against AI harms',
      context: "We wanted to understand what types of interventions and protections against AI harms voters would support. We showed respondents a full policy package of bold protections.",
      explainer: 'Support for strong protections against AI harms. Every major proposal tested at 70% or higher.',
      suggestion: 'Concern has become permission for meaningful intervention.',
      more: 'The final round answers one of the biggest questions raised by the previous research: does concern actually translate into support for action? Every bold protection tested received support of 70 percent or more, including safety proof, off switches, meaningful penalties, community authority and bans on some high-stakes uses. More people worried that regulation would not go far enough than worried about excessive intervention.',
      detail: '72% supported the full package; 32% worried rules would not go far enough; 48% said the maker and user should be equally responsible. Only 4% said neither the vendor nor the organization using the system should be responsible after a harmful hiring error.',
      method: 'The figures shown are the five support percentages supplied by TechTonic Justice. The survey used two differently worded proposal versions; these displayed figures should not be described as a single split-sample result.',
      bars: [
        ["meaningful penalties for actors that use harmful AI", 81, "81%"],
        ["immediate off switches for AI", 80, "80%"],
        ["proof of model harmlessness before release", 80, "80%"],
        ["bans on high-stakes uses of AI that hurt health, housing, or work", 80, "80%"],
        ["community oversight boards with legal authority to investigate and act on AI problems", 75, "75%"]
      ],
      all: [
        ["meaningful penalties for actors that use harmful AI", "81%"],
        ["immediate off switches for AI", "80%"],
        ["proof of model harmlessness before release", "80%"],
        ["bans on high-stakes uses of AI that hurt health, housing, or work", "80%"],
        ["community oversight boards with legal authority to investigate and act on AI problems", "75%"]
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
    { key:'employer', name:'Your employer', fav:75, upset:53, note:'Among employed respondents, 75% viewed their employer favorably. 53% were at least somewhat upset about their employer being in charge of AI used to make consequential decisions.', icon:'briefcase' },
    { key:'tech', name:'Big Tech', fav:57, upset:64, note:'57% viewed Big Tech companies such as Google, Meta and Amazon favorably. 64% were at least somewhat upset about Big Tech controlling consequential AI decisions.', icon:'server' },
    { key:'state', name:'State government', fav:53, upset:66, note:'53% viewed officials in their state government favorably. 66% were at least somewhat upset about state officials controlling consequential AI decisions.', icon:'building' },
    { key:'insurer', name:'Health insurers', fav:47, upset:68, note:'Views of health insurance companies were evenly split at 47% favorable and 47% unfavorable. 68% were at least somewhat upset about insurer-controlled AI decisions.', icon:'health' },
    { key:'landlord', name:'Landlords', fav:40, upset:67, note:'40% viewed landlords favorably. 67% were at least somewhat upset about landlords controlling consequential AI decisions.', icon:'key' },
    { key:'contractor', name:'Public-program contractors', fav:33, upset:67, note:'33% viewed private companies hired by government to run public programs favorably. 67% were at least somewhat upset about these contractors controlling consequential AI decisions.', icon:'network' }
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
    { name:'Immediate off switches for AI', value:'80%', min:80, copy:'Immediate off switches for AI' },
    { name:'Proof of model harmlessness before release', value:'80%', min:80, copy:'Proof of model harmlessness before release' },
    { name:'Bans on high-stakes uses of AI that hurt health, housing, or work', value:'80%', min:80, copy:'Bans on high-stakes uses of AI that hurt health, housing, or work' },
    { name:'Community oversight boards with legal authority to investigate and act on AI problems', value:'75%', min:75, copy:'Community oversight boards with legal authority to investigate and act on AI problems' }
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
          <h1 id="xv-title">Explore the <span>data</span></h1>
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
              <h2 id="xv-rounds-title">Round by Round</h2>
            </div>

          </div>
          <div class="xv-round-tabs" role="tablist" aria-label="Research rounds">
            ${rounds.map(r => `<button type="button" role="tab" data-round-select="${r.id}" aria-selected="${r.id===1}"><span>Round ${r.id}</span></button>`).join('')}
          </div>
          <div id="xv-round-panel" class="xv-round-panel" role="tabpanel" tabindex="0" aria-live="polite" aria-label="Selected research round"></div>
        </div>
      </section>

      <section class="xv-demographics" aria-labelledby="xv-who-title">
        <div class="xv-shell">
          <div class="xv-section-head xv-section-head-dark">
            <div>
              <div class="xv-eyebrow">Round 4 / Concerns About AI</div>
              <h2 id="xv-who-title">Explore by Demographic</h2>
              <p class="xv-demographics-intro">Round 4 asked voters about fifteen concrete uses of AI in health care, benefits, housing and work. Compare how those concerns differed by age and party affiliation. Age shows the issue respondents chose as their highest priority; party shows the share extremely or very concerned.</p>
            </div>
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
          <h2 id="xv-institutions-title">Liking an institution does not necessarily mean trusting its use of AI</h2>
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
              <h2 id="xv-quotes-title">Voters may not be aware of the harms that <span>concern them most</span></h2>
              <p class="xv-quotes-intro">Before respondents saw concrete scenarios, many defaulted to concerns they already had names for, including privacy and surveillance, job loss, and misinformation or deepfakes. Search the verbatim responses below.</p>
            </div>
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
            <h2 id="xv-limits-title">Voters support <span>bans and more</span></h2>
            <p>Every major protection tested received at least 70% support. We should not assume only voluntary or incremental measures will be publicly acceptable.</p>
            <div class="xv-section-meta">Round 5 · Jul 24–27, 2026 · N=1,058 likely voters · Measure: support (%)</div>
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
      if (round.rankOnly) {
        return `<li class="xv-full-row xv-rank-ladder-row ${index === 0 ? 'xv-rank-selected' : ''}">
          <button type="button" class="xv-rank-select" aria-pressed="${index === 0 ? 'true' : 'false'}">
            <span class="xv-rank-number" aria-label="Rank ${index + 1}">${String(index + 1).padStart(2, '0')}</span>
            <span class="xv-rank-statement">${label}</span>
          </button>
        </li>`;
      }
      const displayed = round.id === 4 ? String(value).split(' · ')[0] : value;
      return `<div class="xv-full-row"><span>${label}</span><b>${displayed}</b></div>`;
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
        ${round.id === 4 ? `
          <div class="xv-round5-layout xv-round4-layout">
            <section class="xv-round5-takeaways" aria-label="What this round tells us">
              <h4>What this round tells us</h4>
              <p class="xv-round5-takeaway-intro">${round.more}</p>
              <p class="xv-round4-detail-intro">Before seeing the scenarios, 897 people described their concerns in their own words. The leading themes were:</p>
              <div class="xv-round5-takeaway-grid">
                <div class="xv-round5-takeaway"><strong>20%</strong><span>privacy, personal data, and surveillance</span></div>
                <div class="xv-round5-takeaway"><strong>16%</strong><span>job loss and economic harm</span></div>
                <div class="xv-round5-takeaway"><strong>10%</strong><span>misinformation and deepfakes</span></div>
              </div>
            </section>
            <section class="xv-round5-results" aria-label="Round 4 full concern results">
              <h4>Results</h4>
              <p class="xv-round5-result-intro">Concern about 15 specific uses of AI</p>
              <div class="xv-round5-result-list">${fullRows}</div>
            </section>
            <div class="xv-round5-method"><b>How to read these results</b><p>${round.method}</p></div>
          </div>
        ` : round.id === 5 ? `
          <div class="xv-round5-layout">
            <section class="xv-round5-takeaways" aria-label="What this round tells us">
              <h4>What this round tells us</h4>
              <p class="xv-round5-takeaway-intro">Voters support concrete action to prevent harm and hold decision-makers accountable.</p>
              <div class="xv-round5-takeaway-grid">
                <div class="xv-round5-takeaway"><strong>72%</strong><span>supported the full package of protections</span></div>
                <div class="xv-round5-takeaway"><strong>32%</strong><span>worried the proposed rules would not go far enough</span></div>
                <div class="xv-round5-takeaway"><strong>48%</strong><span>said the AI maker and user should be equally responsible for harm in the hiring scenario</span></div>
              </div>
            </section>
            <section class="xv-round5-results" aria-label="Full policy support results">
              <h4>Results</h4>
              <p class="xv-round5-result-intro">Support for five strong protections against AI harms</p>
              <div class="xv-round5-result-list">${fullRows}</div>
            </section>
            <div class="xv-round5-method"><b>How to read these results</b><p>${round.method}</p></div>
          </div>
        ` : `
        <div class="xv-more-inner xv-round-expanded">
          <div class="xv-more-copy">
            <span class="xv-mini-label">What this round tells us</span>
            <p>${round.more}</p>
            <p class="xv-more-detail">${round.detail}</p>
            <div class="xv-method-box"><b>How to read it</b><span>${round.method}</span></div>
          </div>
          <div class="xv-full-results">
            <span class="xv-mini-label">Results</span>
            ${pairedInstitutions}
            ${round.id === 3 ? '<p class="xv-paired-subhead">All institutions and public figures tested · upset about AI decision-making</p>' : ''}
            ${round.rankOnly ? `
              <div class="xv-rank-heading"><strong>Concern ranking</strong><span>Most concerning</span></div>
              <ol class="xv-rank-ladder" aria-label="All 12 survey statements ranked from most to least concerning">${fullRows}</ol>
              <div class="xv-rank-end">Least concerning</div>
            ` : fullRows}
          </div>
        </div>
        `}
        <div class="xv-round-footer">
          <div class="xv-round-nav xv-round-nav-bottom">
            <button type="button" data-round-nav="${round.id-1}" ${round.id===1?'disabled':''}>← Previous round</button>
            <button type="button" data-round-nav="${round.id+1}" ${round.id===5?'disabled':''}>Next round →</button>
          </div>
          <button type="button" class="xv-copy-link" data-copy-round="${round.id}">Copy link to this round</button>
        </div>
      </article>`;
    panel.setAttribute('aria-labelledby','xv-round-'+round.id+'-title');

    panel.querySelectorAll('.xv-rank-select').forEach(button => {
      button.addEventListener('click', () => {
        const wasSelected = button.getAttribute('aria-pressed') === 'true';
        panel.querySelectorAll('.xv-rank-select').forEach(other => {
          other.setAttribute('aria-pressed', 'false');
          other.closest('.xv-rank-ladder-row').classList.remove('xv-rank-selected');
        });
        if (!wasSelected) {
          button.setAttribute('aria-pressed', 'true');
          button.closest('.xv-rank-ladder-row').classList.add('xv-rank-selected');
        }
      });
    });
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
