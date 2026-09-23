(function () {
  'use strict';
  var tour = document.getElementById('tour');
  if (!tour) return;

  /* Stop the retired five-scene autoplay before replacing it. */
  try { if (typeof timer !== 'undefined') clearTimeout(timer); } catch (e) {}
  try { if (typeof paused !== 'undefined') paused = true; } catch (e) {}

  document.body.classList.add('learn-ready');

  var headlines = [
    'New Research: More Than 70% of Voters, Including Majorities of Republicans, Want Real Limits on AI Decision-Making',
    "Voters aren't asking for AI guardrails. They're asking for limits.",
    'Corporations and agencies are letting AI decide who gets care, and voters want it stopped',
    'AI is becoming a political issue, and this election is just the start.'
  ];

  var findings = [
    {
      label: 'The Core Finding',
      title: 'It’s not really about AI. It’s about power over people’s lives.',
      body: 'Voters are less concerned with AI in the abstract than with what happens when an institution uses an automated system to gain power over an important part of someone’s life. Across every round, concern tracked a concrete decision: whether someone could get, keep, or afford health care, benefits, housing, a job, or a public service.',
      note: 'The technology matters because of what it allows an institution to decide, deny, remove, monitor or control.',
      evidence: '<div class="learn-kicker">Concrete consequences</div><h3>Concern rises when something important is at stake.</h3><div class="evidence-bars"><div class="evidence-row"><div class="label">Doctor-recommended treatment denied</div><div class="value">73%</div><div class="track"><div class="fill" style="width:73%"></div></div></div><div class="evidence-row yellow"><div class="label">Social Security / disability cut off</div><div class="value">72%</div><div class="track"><div class="fill" style="width:72%"></div></div></div><div class="evidence-row blue"><div class="label">Job rejection with no human involved</div><div class="value">70%</div><div class="track"><div class="fill" style="width:70%"></div></div></div><div class="evidence-row red"><div class="label">Forced to deal with AI instead of a person</div><div class="value">69%</div><div class="track"><div class="fill" style="width:69%"></div></div></div></div>'
    },
    {
      label: 'One of the Only Places the Parties Agree',
      title: 'Real limits on AI decision-making cut across party lines.',
      body: 'Almost nothing in politics gets Democrats, independents, and Republicans to agree right now. Real limits on AI decision-making were one of the exceptions, and that pattern held across the different kinds of questions we tested.',
      note: 'This is not a message that requires picking a partisan side to be effective.',
      evidence: '<div class="learn-kicker">Cross-partisan evidence</div><h3>The agreement shows up in policy, framing and concrete harm.</h3><div class="evidence-stat-grid"><div class="evidence-stat blue"><strong>69%</strong><span>Democrats supporting the full package</span></div><div class="evidence-stat green"><strong>73%</strong><span>Independents supporting the full package</span></div><div class="evidence-stat red"><strong>73%</strong><span>Republicans supporting the full package</span></div></div><div class="evidence-stat-grid"><div class="evidence-stat blue"><strong>+26.2</strong><span>Prevent, Protect, Repair · Democrats</span></div><div class="evidence-stat green"><strong>+26.6</strong><span>Prevent, Protect, Repair · Independents</span></div><div class="evidence-stat red"><strong>+21.9</strong><span>Prevent, Protect, Repair · Republicans</span></div></div><p class="evidence-sub" style="margin-top:18px">Insurer denial of doctor-recommended care scored <b>13.5</b> among Democrats, <b>14.6</b> among independents and <b>18.8</b> among Republicans.</p>'
    },
    {
      label: 'Voters Want Bans, Not Just Guardrails',
      title: 'The public is willing to draw real red lines.',
      body: 'When we tested a full package of AI restrictions, every individual measure cleared 70% support. The response went well beyond transparency or voluntary oversight: voters backed off switches, safety proof, meaningful penalties, community authority and bans on some high-stakes uses.',
      note: 'Only 14% said their bigger worry was too much government regulation. More than twice as many, 32%, worried the rules would not go far enough.',
      evidence: '<div class="learn-kicker">Support for strong restrictions</div><h3>Every measure tested cleared 70%.</h3><div class="evidence-bars"><div class="evidence-row"><div class="label">Off switches</div><div class="value">79–80%</div><div class="track"><div class="fill" style="width:80%"></div></div></div><div class="evidence-row yellow"><div class="label">Proof of safety before release</div><div class="value">79–80%</div><div class="track"><div class="fill" style="width:80%"></div></div></div><div class="evidence-row green"><div class="label">Meaningful penalties</div><div class="value">77–81%</div><div class="track"><div class="fill" style="width:81%"></div></div></div><div class="evidence-row red"><div class="label">Bans on some high-stakes uses</div><div class="value">70–80%</div><div class="track"><div class="fill" style="width:80%"></div></div></div><div class="evidence-row blue"><div class="label">Community boards with legal authority</div><div class="value">74–75%</div><div class="track"><div class="fill" style="width:75%"></div></div></div></div><div class="evidence-compare" style="margin-top:24px"><div class="compare-card"><strong>32%</strong><span>worried the rules would not go far enough</span></div><div class="compare-card negative"><strong>14%</strong><span>worried about too much government regulation</span></div></div>'
    },
    {
      label: 'What People Notice First Is Not What Worries Them Most',
      title: 'Top-of-mind AI concerns are not the whole story.',
      body: 'With no prompting, voters default to concerns they already have a name for: privacy and surveillance, job loss, and misinformation or deepfakes. Once shown real examples of AI already at work today, concern spread sharply across a much broader set of high-stakes decisions.',
      note: 'The opportunity is to make invisible decision-making visible: where AI is used, who chose to use it, and what someone can lose. The pattern also shifts by age, with benefits cuts especially dominant among voters 45 and older and housing and surveillance landing harder among younger voters.',
      evidence: '<div class="learn-kicker">The gap</div><h3>What comes to mind first vs. what becomes concerning when people see real uses.</h3><div class="evidence-stat-grid"><div class="evidence-stat"><strong>20%</strong><span>Privacy / surveillance · unprompted</span></div><div class="evidence-stat blue"><strong>16%</strong><span>Job loss · unprompted</span></div><div class="evidence-stat yellow"><strong>10%</strong><span>Misinformation / deepfakes · unprompted</span></div></div><div class="evidence-big" style="margin-top:30px">62–73%</div><p class="evidence-sub">Extremely or very concerned across fifteen concrete, high-stakes scenarios once real examples were shown.</p><div class="evidence-stat-grid"><div class="evidence-stat red"><strong>73%</strong><span>Treatment denied</span></div><div class="evidence-stat yellow"><strong>72%</strong><span>Benefits cut off</span></div><div class="evidence-stat blue"><strong>69%</strong><span>Forced to deal with AI, not a person</span></div></div>'
    },
    {
      label: 'Prevent, Protect, Repair',
      title: 'The strongest framework gives responsibility a beginning, middle and end.',
      body: 'Of every wording tested across six rounds, Prevent, Protect, Repair was the strongest framework for describing what responsibility for AI harm should look like. It gives voters a simple way to think about responsibility before, during, and after harm.',
      note: 'MaxDiff scores are relative preference scores, not percentages.',
      evidence: '<div class="learn-kicker">Strongest tested framework</div><div class="evidence-big">+24.7</div><h3>Prevent. Protect. Repair.</h3><div class="evidence-phase"><div class="phase"><b>Prevent</b><span>Stop harmful uses before deployment.</span></div><div class="phase"><b>Protect</b><span>Put real safeguards around people while systems are in use.</span></div><div class="phase"><b>Repair</b><span>Restore benefits, correct records and reverse wrongful decisions when prevention fails.</span></div></div><p class="evidence-sub" style="margin-top:22px">Party scores: Democrats <b>+26.2</b> · Independents <b>+26.6</b> · Republicans <b>+21.9</b>.</p>'
    },
    {
      label: 'It Is Not Just About Stopping AI. It Is About Reaching a Person.',
      title: 'People want someone who can listen, explain and change the outcome.',
      body: 'There is something in this research deeper than a demand to shut systems down. What voters want is the ability to reach someone who can listen, explain, exercise judgment, take responsibility and change the outcome — not a human rubber-stamping a decision the system already made.',
      note: 'The demand underneath the research is not simply about whether a human is theoretically “in the loop.” It is about whether somebody remains accountable and reachable when a decision affects someone’s life.',
      evidence: '<div class="learn-kicker">Human recourse</div><div class="evidence-big">69%</div><h3>Extremely or very concerned about being forced to deal with AI instead of a person.</h3><p class="evidence-sub">A patient wants their doctor’s judgment to matter. A worker wants to know who is evaluating them. A tenant wants to know why they were rejected.</p>'
    },
    {
      label: 'Bias and Discrimination Underperforms as a Stand-Alone Frame',
      title: 'Specific harm is more compelling than the abstract phrase alone.',
      body: 'This finding needs to be handled carefully. In direct comparison, “bias and discrimination” scored well behind the insurer-denial harm. That does not mean voters do not care about discrimination. It means the phrase alone was less compelling than a specific example of what happened to someone.',
      note: 'The research did not test whether evidence of disparity becomes more powerful when it is attached to a concrete harm.',
      evidence: '<div class="learn-kicker">Direct comparison · MaxDiff</div><h3>Concrete consequence vs. stand-alone frame.</h3><div class="evidence-compare"><div class="compare-card"><strong>+15.7</strong><span>Insurer uses AI to deny doctor-recommended care</span></div><div class="compare-card negative"><strong>−7.7</strong><span>“Bias and discrimination” as a stand-alone frame</span></div></div>'
    },
    {
      label: 'Trusting an Institution Does Not Mean Trusting Its Use of AI',
      title: 'People can like an institution and still reject the power it gives to AI.',
      body: 'The same pattern held across every institution tested. Naming the institution responsible for a decision does not require attacking it. The focus can stay on the choice to use automated decision-making in a consequential context.',
      note: 'Employers were viewed more favorably than most institutions tested. Even so, 53% of employed respondents were at least somewhat upset by an employer putting AI in charge of consequential decisions; Republicans were more likely to say so than Democrats, 59% versus 49%.',
      evidence: '<div class="learn-kicker">At least somewhat upset</div><h3>Discomfort persists regardless of institutional favorability.</h3><div class="evidence-bars"><div class="evidence-row red"><div class="label">Health insurers</div><div class="value">68%</div><div class="track"><div class="fill" style="width:68%"></div></div></div><div class="evidence-row yellow"><div class="label">Landlords</div><div class="value">67%</div><div class="track"><div class="fill" style="width:67%"></div></div></div><div class="evidence-row green"><div class="label">Private companies running public programs</div><div class="value">67%</div><div class="track"><div class="fill" style="width:67%"></div></div></div><div class="evidence-row blue"><div class="label">State government officials</div><div class="value">66%</div><div class="track"><div class="fill" style="width:66%"></div></div></div><div class="evidence-row"><div class="label">Big Tech companies</div><div class="value">64%</div><div class="track"><div class="fill" style="width:64%"></div></div></div><div class="evidence-row yellow"><div class="label">Employer</div><div class="value">53%</div><div class="track"><div class="fill" style="width:53%"></div></div></div></div>'
    }
  ];

  /* Exact copy from Jane's original microsite. */
  var threads = [
    { id: 'power', label: 'Power & control', detail: "It's not really about AI. It's about who has power over people's lives, and whether they have any say in decisions that affect them." },
    { id: 'harm', label: 'Concrete harm', detail: 'Specific, tangible harms move people more than abstract warnings about AI in general. "Your insurer used AI to deny the treatment your doctor says you need" beats "AI can produce bias in health care" every time it was tested.' },
    { id: 'accountability', label: 'Institutional accountability', detail: 'The strongest messages name the institution, the action it took, and what a person lost. "AI" should not become a grammatical trick that makes human decisions sound like nobody made them.' },
    { id: 'repair', label: 'Prevention & repair', detail: 'The top-performing response frame is "Prevent, Protect, Repair," combining stopping harm before it happens, shielding people while systems are in use, and fixing damage already done.' },
    { id: 'redlines', label: 'Red lines & safeguards', detail: 'Support for AI safety goes well beyond transparency. Large majorities back safety-proofing, off switches, penalties, and outright bans on the highest-stakes uses.' }
  ];

  tour.className = 'learn-stage';
  tour.innerHTML = '<section class="learn-screen headline-screen" id="learn-headlines">' +
      '<div class="learn-geo" aria-hidden="true"></div>' +
      '<div class="headline-wrap"><div class="headline-top"><div class="learn-kicker">Headlines from the research</div><div class="learn-progress" id="headline-count">01 / 04</div></div>' +
      '<div class="headline-main" id="headline-main"><h1 id="headline-text"></h1></div>' +
      '<div class="headline-footer"><div class="headline-track" id="headline-track"></div><button class="headline-skip" id="headline-skip" type="button">Skip to the findings →</button></div></div></section>' +
    '<section class="learn-screen finding-screen" id="learn-findings" hidden><div class="finding-grid">' +
      '<div class="finding-copy"><div class="finding-header"><div><div class="learn-kicker" id="finding-label"></div><div class="learn-progress" id="finding-count"></div></div></div>' +
      '<h2 id="finding-title"></h2><p class="finding-body" id="finding-body"></p><p class="finding-note" id="finding-note"></p>' +
      '<div class="finding-controls"><button class="learn-action" id="finding-replay" type="button">Replay headlines</button><div class="control-pair"><button class="learn-action" id="finding-prev" type="button">← Previous</button><button class="learn-action primary" id="finding-next" type="button">Next finding →</button></div></div></div>' +
      '<aside class="finding-evidence"><div class="evidence-inner" id="finding-evidence"></div></aside></div></section>' +
    '<section class="learn-screen threads-screen" id="learn-threads" hidden><div class="learn-geo" aria-hidden="true"></div><div class="threads-wrap"><div class="learn-kicker">Explore the themes</div><h2>Five threads running through six rounds of research.</h2><div class="thread-tabs" id="thread-tabs"></div><div class="thread-panel"><div class="thread-label" id="thread-label"></div><p id="thread-detail"></p></div><div class="thread-actions"><button class="learn-action" id="threads-back" type="button">← Back to key findings</button><button class="learn-action primary" id="threads-data" type="button">Explore the full data →</button></div></div></section>' +
    '<div id="completion" hidden></div>';

  var headlineIndex = 0;
  var findingIndex = 0;
  var threadIndex = 0;
  var headlineTimer = null;
  var phase = 'headlines';

  function showOnly(id) {
    ['learn-headlines','learn-findings','learn-threads'].forEach(function (screen) {
      var el = document.getElementById(screen);
      if (el) el.hidden = screen !== id;
    });
    phase = id === 'learn-headlines' ? 'headlines' : (id === 'learn-findings' ? 'findings' : 'threads');
    window.scrollTo(0, 0);
  }

  function renderHeadline() {
    var main = document.getElementById('headline-main');
    var text = document.getElementById('headline-text');
    if (!main || !text) return;
    main.classList.remove('enter');
    void main.offsetWidth;
    text.textContent = headlines[headlineIndex];
    main.classList.add('enter');
    document.getElementById('headline-count').textContent = String(headlineIndex + 1).padStart(2,'0') + ' / 04';
    var track = document.getElementById('headline-track');
    track.innerHTML = headlines.map(function (_, i) { return '<span class="' + (i < headlineIndex ? 'done' : (i === headlineIndex ? 'active' : '')) + '"></span>'; }).join('');
  }

  function scheduleHeadline() {
    clearTimeout(headlineTimer);
    headlineTimer = setTimeout(function () {
      if (phase !== 'headlines') return;
      if (headlineIndex < headlines.length - 1) {
        headlineIndex += 1;
        renderHeadline();
        scheduleHeadline();
      } else {
        headlineTimer = setTimeout(showFindings, 2900);
      }
    }, 2900);
  }

  function startHeadlines(reset) {
    clearTimeout(headlineTimer);
    if (reset) headlineIndex = 0;
    showOnly('learn-headlines');
    renderHeadline();
    scheduleHeadline();
  }

  function renderFinding() {
    var f = findings[findingIndex];
    document.getElementById('finding-label').textContent = f.label;
    document.getElementById('finding-count').textContent = String(findingIndex + 1).padStart(2,'0') + ' / ' + String(findings.length).padStart(2,'0');
    document.getElementById('finding-title').textContent = f.title;
    document.getElementById('finding-body').textContent = f.body;
    document.getElementById('finding-note').textContent = f.note;
    document.getElementById('finding-evidence').innerHTML = f.evidence;
    document.getElementById('finding-prev').disabled = findingIndex === 0;
    document.getElementById('finding-next').textContent = findingIndex === findings.length - 1 ? 'Five research threads →' : 'Next finding →';
  }

  function showFindings() {
    clearTimeout(headlineTimer);
    showOnly('learn-findings');
    renderFinding();
  }

  function renderThreads() {
    var tabs = document.getElementById('thread-tabs');
    tabs.innerHTML = '';
    threads.forEach(function (thread, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'thread-tab' + (i === threadIndex ? ' active' : '');
      btn.textContent = thread.label;
      btn.addEventListener('click', function () { threadIndex = i; renderThreads(); });
      tabs.appendChild(btn);
    });
    document.getElementById('thread-label').textContent = threads[threadIndex].label;
    document.getElementById('thread-detail').textContent = threads[threadIndex].detail;
  }

  function showThreads() {
    clearTimeout(headlineTimer);
    showOnly('learn-threads');
    renderThreads();
  }

  document.getElementById('headline-skip').addEventListener('click', showFindings);
  document.getElementById('finding-replay').addEventListener('click', function () { startHeadlines(true); });
  document.getElementById('finding-prev').addEventListener('click', function () {
    if (findingIndex > 0) { findingIndex -= 1; renderFinding(); window.scrollTo(0,0); }
  });
  document.getElementById('finding-next').addEventListener('click', function () {
    if (findingIndex < findings.length - 1) { findingIndex += 1; renderFinding(); window.scrollTo(0,0); }
    else showThreads();
  });
  document.getElementById('threads-back').addEventListener('click', function () { showFindings(); });
  document.getElementById('threads-data').addEventListener('click', function () {
    history.pushState(null, '', '#explore');
    setSection('explore');
  });

  function setSection(section) {
    if (['tour','explore','resources'].indexOf(section) === -1) section = 'tour';
    document.body.classList.toggle('section-open', section !== 'tour');
    tour.hidden = section !== 'tour';
    var dataView = document.getElementById('data-view');
    var resourcesView = document.getElementById('resources-view');
    if (dataView) dataView.hidden = section !== 'explore';
    if (resourcesView) resourcesView.hidden = section !== 'resources';
    document.querySelectorAll('.nav a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + section); });
    if (section !== 'tour') clearTimeout(headlineTimer);
    else if (phase === 'headlines') scheduleHeadline();
    window.scrollTo(0,0);
  }

  /* Replace the old section router so nav/hash links continue to work. */
  try { navigate = setSection; } catch (e) { window.navigate = setSection; }
  document.querySelectorAll('.nav a').forEach(function (a) {
    if (a.dataset.learnHook) return;
    a.dataset.learnHook = '1';
    a.addEventListener('click', function (event) {
      var section = a.getAttribute('href').replace('#','');
      if (['tour','explore','resources'].indexOf(section) === -1) return;
      event.preventDefault();
      history.pushState(null, '', '#' + section);
      setSection(section);
    });
  });
  window.addEventListener('popstate', function () { setSection(location.hash.slice(1) || 'tour'); });

  startHeadlines(true);
  setSection(location.hash.slice(1) || 'tour');
})();
