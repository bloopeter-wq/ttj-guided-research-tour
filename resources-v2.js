(() => {
  const root = document.getElementById('resources-view');
  if (!root) return;

  const scenarios = {
    health: {
      label: 'Health care',
      person: 'a patient',
      decision: 'a health insurer',
      action: 'uses AI to deny doctor-recommended treatment',
      consequence: 'can lose access to the care their doctor says they need'
    },
    benefits: {
      label: 'Public benefits',
      person: 'a person receiving benefits',
      decision: 'a public benefits agency',
      action: 'uses an automated system to flag someone for fraud',
      consequence: 'can have their support stopped before anyone explains what went wrong'
    },
    housing: {
      label: 'Housing',
      person: 'a tenant',
      decision: 'a landlord',
      action: 'uses automated screening or pricing',
      consequence: 'can lose a home or be charged more because of a system they cannot challenge'
    },
    work: {
      label: 'Work',
      person: 'a worker or job applicant',
      decision: 'an employer',
      action: 'uses automated systems to rank, monitor, schedule or reject people',
      consequence: 'can lose work, pay or opportunity without meaningful human review'
    }
  };

  const languageExamples = {
    health: {
      title: 'Health care',
      say: 'Your doctor says you need the treatment. Your insurer’s AI says you cannot have it.',
      avoid: 'AI is affecting access to health care.'
    },
    benefits: {
      title: 'Public benefits',
      say: 'The Social Security Administration uses an AI systemt that falsely flags you for fraud which immediately cuts off your benefits. Nobody can explain why and you can’t reach a human for help.',
      avoid: 'Automated systems can affect access to public benefits.'
    },
    housing: {
      title: 'Housing',
      say: 'Landlords are using AI screening systems that can falsely flag people for evictions or mix them up with someone who has the same name. The applications are denied and the renters have no idea why.',
      avoid: 'AI can create risks for tenants.'
    },
    work: {
      title: 'Work',
      say: 'Your employer uses software to track what you do, decide your schedule and judge your performance.',
      avoid: 'Algorithmic management affects workers.'
    },
    accountability: {
      title: 'Accountability',
      say: 'A system made the decision. The company says it was the software. The software cannot answer you. So who is responsible?',
      avoid: 'AI raises accountability concerns.'
    },
    human: {
      title: 'Human access',
      say: 'You need help from a person. The organization will only let you talk to a machine.',
      avoid: 'AI systems can reduce human interaction.'
    }
  };

  const talkingPoints = [
    {
      title: 'Protect people from AI harms',
      text: 'Voters are concerned with the concrete harms AI enables when individuals or institutions use automated systems to wield power over an important part of someone’s life.'
    },
    {
      title: 'Responsibility',
      text: 'Naming the institution responsible for a decision does not require attacking it. The focus can stay on the choice to use automated decision-making in a particular context.'
    },
    {
      title: 'Human access',
      text: 'People want to be able to reach someone who can listen, explain, exercise judgment, take responsibility, and change an outcome in the way only a fellow human being can.'
    },
    {
      title: 'Strong protections',
      text: 'Voters strongly support bans on the highest-stakes uses of AI, proof of safety before use, mandatory off switches, meaningful penalties for harm, and community oversight boards with legal authority. Every major protection tested received support from at least seven in ten respondents.'
    }
  ];

  const sectors = {
    health: {
      name: 'Health care',
      questions: [
        'Can an automated system deny or materially influence access to treatment?',
        'What safety evidence is required before it is used?',
        'Can a clinician or patient challenge the result?',
        'Who is accountable when the system is wrong?'
      ],
      evidence: [
        ['73%', 'extremely or very concerned about doctor-recommended treatment being denied']
      ]
    },
    housing: {
      name: 'Housing',
      questions: [
        'Are automated systems screening tenants?',
        'Are automated systems influencing rent?',
        'Are applicants told when one is used?',
        'Can incorrect records be fixed before housing is lost?'
      ],
      evidence: [
        ['68%', 'extremely or very concerned about home surveillance used to build an eviction case'],
        ['67%', 'extremely or very concerned about rent raised through automated pricing']
      ]
    },
    benefits: {
      name: 'Benefits',
      questions: [
        'Can an automated flag interrupt support?',
        'What evidence is required before benefits are stopped?',
        'Is there a fast route to human review?',
        'Who restores support when the system gets it wrong?'
      ],
      evidence: [
        ['72%', 'extremely or very concerned about Social Security or disability support being cut off'],
        ['71%', 'extremely or very concerned about a false benefits-fraud accusation'],
        ['68%', 'extremely or very concerned about Medicaid being cut off']
      ]
    },
    education: {
      name: 'Education',
      questions: [
        'Are automated systems identifying threats or assigning risk?',
        'What standards of evidence apply?',
        'Can families challenge a decision?',
        'How are incorrect records corrected?'
      ],
      evidence: [
        ['64%', 'extremely or very concerned about a child being falsely flagged as a school threat']
      ]
    },
    employment: {
      name: 'Employment',
      questions: [
        'Are automated systems hiring, ranking, monitoring, or scheduling?',
        'What decisions require meaningful human involvement?',
        'Can a worker understand and challenge the result?',
        'Who is responsible when an automated decision causes harm?'
      ],
      evidence: [
        ['70%', 'extremely or very concerned about job rejection with no human involved'],
        ['70%', 'extremely or very concerned about everything at work being monitored']
      ]
    }
  };

  const rapidItems = [
    ['Person', 'Can you identify the person or group affected?'],
    ['Decision-maker', 'Is it clear who chose, deployed or relied on the system?'],
    ['Action', 'Can you name the concrete decision or action?'],
    ['Consequence', 'Can people see what is lost, denied, raised, stopped or changed?'],
    ['Human recourse', 'Is there a real person with authority to explain and correct the outcome?'],
    ['Responsibility', 'Does the message make clear who must prevent, protect or repair?']
  ];

  const strongWords = [
    ['Prevent', 'signals that harm should not simply be accepted as inevitable'],
    ['Protect', 'centers the person while a system is being used'],
    ['Repair', 'makes responsibility continue after harm occurs'],
    ['Deny / cut / reject', 'names the decision rather than the technology'],
    ['Explain / answer / correct', 'makes human recourse concrete'],
    ['Responsible', 'keeps attention on the institution that chose to use the system']
  ];

  const weakWords = [
    ['Mitigate', 'more abstract than prevent, protect or repair'],
    ['Algorithmic', 'technical language can hide the actual decision'],
    ['Governance', 'useful in policy detail, but abstract as a public-facing lead'],
    ['Optimise', 'describes a process rather than a consequence for a person'],
    ['Transparency', 'important, but does not itself say who can change the outcome'],
    ['Risk', 'often needs a concrete example before people can picture what is at stake']
  ];

  const decisionExamples = {
    health: ['AI is being used in health care.', 'A health insurer uses AI to deny treatment a doctor recommended.'],
    benefits: ['Automated systems are used in benefits administration.', 'A benefits agency uses an automated flag to stop support before a person can challenge the decision.'],
    housing: ['AI is changing the housing market.', 'A landlord uses automated screening or pricing to decide who gets a home and what they pay.'],
    work: ['Algorithmic management is expanding at work.', 'An employer uses software to rank, monitor, schedule or reject workers without meaningful human review.']
  };

  const downloads = [
    {label:'Memo', href:'resources/TTJ_Message_Testing_Memo.html', format:'HTML', audience:'Research memo'},
    {label:'Cheat Sheet for Policymakers', href:'resources/TTJ_Message_Testing_One_Page_Cheat_Sheet_Policymakers_Copy_Full_Page.docx', format:'DOCX', audience:'Policymakers'},
    {label:'Cheat Sheet for Movement Orgs', href:'resources/TTJ_Message_Testing_One_Page_Cheat_Sheet_Movement_Organisations_Copy_Full_Page.docx', format:'DOCX', audience:'Movement organizations'},
    {label:'Say This, Not That and other Messaging Hints', href:'resources/TTJ_Say_This_Not_That_Messaging_Hints.html', format:'HTML', audience:'Messaging guidance'}
  ];

  root.classList.add('ttj-resources-v2');
  root.innerHTML = `
    <div class="rv-page">
      <section class="rv-hero">
        <div class="rv-hero-shape" aria-hidden="true"></div>
        <div class="rv-shell rv-hero-inner">
          <div class="rv-eyebrow">03 / Practical use</div>
          <h1>Use the <span>research.</span></h1>
          <p>Practical tools for turning the findings into clearer explanations, questions and drafts — without losing the evidence underneath them.</p>

        </div>
      </section>

      <section class="rv-downloads rv-downloads-top">
        <div class="rv-shell">
          <div class="rv-download-head"><div><div class="rv-eyebrow">Downloadable materials</div><h2>Downloads and kits</h2></div><p>Download the current TTJ research and policy materials. Additional kits are in progress.</p></div>
          <div class="rv-download-layout">
            <div class="rv-download-grid">
              ${downloads.map((item,i)=>`<a href="${item.href}" download aria-label="Download ${item.label}, ${item.format}, for ${item.audience}"><span>0${i+1}</span><div><b>${item.label}</b><small>${item.audience} · ${item.format}</small></div><i aria-hidden="true">↓</i></a>`).join('')}
            </div>
            <a class="rv-cheatsheet-preview" href="resources/TTJ_Message%20Testing%20Cheat%20Sheet_PB%20-%20Revised_September%202026.pdf" aria-label="Open the complete message-testing cheat sheet PDF">
              <div class="rv-preview-sheet">
                <span class="rv-preview-mark">TechTonic Justice</span>
                <span class="rv-preview-eyebrow">Research companion</span>
                <strong>What people actually told us about AI harms.</strong>
                <span class="rv-preview-rule"></span>
                <span class="rv-preview-caption">Message Testing Cheat Sheet</span>
                <span class="rv-preview-foot">Preview illustration · View the PDF ↗</span>
              </div>
            </a>
          </div>
          <p class="rv-source-note">Source: TechTonic Justice + Data for Progress message testing, five national surveys of likely voters, March–July 2026. Question wording, measures and samples vary by round.</p>
        </div>
      </section>

      <section class="rv-tool rv-message" id="tool-1">
        <div class="rv-shell">
          <div class="rv-tool-head">
            <div><span class="rv-number">01</span><div class="rv-eyebrow">Message formula</div><h2>Build from the person out.</h2></div>
            <p>Start with who is affected, who made the decision, what happened, and what the consequence is. The technology comes after the human stakes are clear.</p>
          </div>
          <div class="rv-scenario-chips" id="rv-scenario-chips"></div>
          <div class="rv-formula-grid">
            <label><span>01 / Person</span><input id="rv-person" type="text" /></label>
            <label><span>02 / Decision-maker</span><input id="rv-decision" type="text" /></label>
            <label><span>03 / Action</span><input id="rv-action" type="text" /></label>
            <label><span>04 / Consequence</span><input id="rv-consequence" type="text" /></label>
          </div>
          <div class="rv-draft-output">
            <div><span class="rv-mini">Live draft</span><p id="rv-draft-preview"></p></div>
            <button type="button" id="rv-copy-draft">Copy draft</button>
          </div>
          <p class="rv-note">Drafts generated here are writing aids based on the research pattern. They are not themselves survey-tested messages.</p>
        </div>
      </section>

      <section class="rv-tool rv-language" id="tool-2">
        <div class="rv-shell">
          <div class="rv-tool-head rv-tool-head-light">
            <div><span class="rv-number">02</span><div class="rv-eyebrow">Say this, not that</div><h2>Make the consequence visible.</h2></div>
            <p>Compare an abstract formulation with a concrete one. Switch examples to see how the same principle works across settings.</p>
          </div>
          <div class="rv-language-tabs" id="rv-language-tabs"></div>
          <div class="rv-language-stage">
            <article class="rv-say"><span>Say this</span><blockquote id="rv-say"></blockquote></article>
            <div class="rv-versus" aria-hidden="true">↔</div>
            <article class="rv-not"><span>Not that</span><blockquote id="rv-not"></blockquote></article>
          </div>
        </div>
      </section>

      <section class="rv-tool rv-points" id="tool-3">
        <div class="rv-shell">
          <div class="rv-tool-head">
            <div><span class="rv-number">03</span><div class="rv-eyebrow">Cross-partisan talking points</div><h2>Start from the shared question.</h2></div>
            <p>These formulations describe the research without requiring agreement on a broader political worldview. Open any card to expand it.</p>
          </div>
          <div class="rv-point-grid" id="rv-point-grid"></div>
        </div>
      </section>

      <section class="rv-tool rv-sector" id="tool-4">
        <div class="rv-shell">
          <div class="rv-tool-head rv-tool-head-light">
            <div><span class="rv-number">04</span><div class="rv-eyebrow">Sector snapshot / committee-assignment aid</div><h2>Ask the right questions by sector.</h2></div>
            <p>Choose a sector to reveal a concise oversight checklist and the most relevant evidence from the message-testing program.</p>
          </div>
          <div class="rv-sector-tabs" id="rv-sector-tabs"></div>
          <div class="rv-sector-panel" id="rv-sector-panel"></div>
        </div>
      </section>

      <section class="rv-tool rv-rapid" id="tool-5">
        <div class="rv-shell">
          <div class="rv-tool-head">
            <div><span class="rv-number">05</span><div class="rv-eyebrow">Rapid response checklist</div><h2>Six questions before you hit send.</h2></div>
            <p>Use this when responding quickly to a new AI story, policy announcement or case. Tick each item as you establish the essentials.</p>
          </div>
          <div class="rv-progress"><div><span id="rv-progress-fill"></span></div><strong id="rv-progress-label">0 / 6</strong></div>
          <div class="rv-check-grid" id="rv-rapid-grid"></div>
          <button type="button" class="rv-reset" id="rv-rapid-reset">Reset checklist</button>
        </div>
      </section>

      <section class="rv-tool rv-words" id="tool-6">
        <div class="rv-shell">
          <div class="rv-tool-head rv-tool-head-light">
            <div><span class="rv-number">06</span><div class="rv-eyebrow">Strong words / weak words</div><h2>Prefer language people can picture.</h2></div>
            <p>The three-word frames were directly tested; the other examples are writing guidance drawn from the same research pattern, not standalone survey tests.</p>
          </div>
          <div class="rv-word-columns">
            <div class="rv-word-col strong"><div class="rv-word-col-head"><span>Stronger</span><b>Concrete + accountable</b></div><div id="rv-strong-words"></div></div>
            <div class="rv-word-col weak"><div class="rv-word-col-head"><span>Weaker as a lead</span><b>Abstract + technical</b></div><div id="rv-weak-words"></div></div>
          </div>
        </div>
      </section>

      <section class="rv-tool rv-draft-check" id="tool-7">
        <div class="rv-shell">
          <div class="rv-tool-head">
            <div><span class="rv-number">07</span><div class="rv-eyebrow">The draft checklist</div><h2>Pressure-test a draft.</h2></div>
            <p>Paste a draft below for a quick structural check. This is a simple heuristic, not a score of whether a message is “good” or persuasive.</p>
          </div>
          <div class="rv-draft-check-layout">
            <div class="rv-textarea-wrap"><label for="rv-draft-text">Paste a draft</label><textarea id="rv-draft-text" rows="8" placeholder="Paste a paragraph, talking point or social post…"></textarea><button type="button" id="rv-analyse">Check structure</button></div>
            <div class="rv-analysis" id="rv-analysis"><div class="rv-analysis-empty"><span>→</span><p>Your structural checks will appear here.</p></div></div>
          </div>
        </div>
      </section>




    </div>`;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const copyText = async (text, btn) => {
    try { await navigator.clipboard.writeText(text); const old = btn.textContent; btn.textContent = 'Copied'; setTimeout(()=>btn.textContent=old,1200); }
    catch { btn.textContent = 'Copy unavailable'; }
  };

  root.querySelectorAll('[data-tool-jump]').forEach(btn => btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.toolJump);
    if (el) el.scrollIntoView({behavior:'smooth',block:'start'});
  }));

  const scenarioHolder = document.getElementById('rv-scenario-chips');
  const fields = {
    person: document.getElementById('rv-person'),
    decision: document.getElementById('rv-decision'),
    action: document.getElementById('rv-action'),
    consequence: document.getElementById('rv-consequence')
  };
  let scenarioKey = 'health';
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