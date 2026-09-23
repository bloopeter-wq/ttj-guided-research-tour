(() => {
  const root = document.getElementById('resources-view');
  if (!root) return;

  const waitForToolkit = () => {
    if (!root.classList.contains('ttj-resources-v2') || !document.getElementById('tool-1') || !document.getElementById('tool-7')) return false;
    if (root.dataset.resourcesRefined === '1') return true;
    root.dataset.resourcesRefined = '1';

    /* Keep section numbers fully inside the content column. */
    root.classList.add('rv-numbers-fixed');

    /* TOOL 1 — Message formula, rebuilt as a Jane-style mix-and-match selector. */
    const tool1 = document.getElementById('tool-1');
    const tool1Head = tool1.querySelector('.rv-tool-head');
    if (tool1Head) {
      const eyebrow = tool1Head.querySelector('.rv-eyebrow');
      const heading = tool1Head.querySelector('h2');
      const dek = tool1Head.querySelector(':scope > p');
      if (eyebrow) eyebrow.textContent = 'The message formula';
      if (heading) heading.textContent = 'Person + decision-maker + action + consequence.';
      if (dek) dek.textContent = 'Mix and match the four parts to build a concrete sentence. The combinations are writing aids: the point is to make the person, decision and consequence visible.';
    }

    const formulaOptions = {
      person: ['A transplant patient', 'A tenant', 'A worker', 'A grandmother'],
      decision: ['insurer', 'landlord', 'employer', 'benefits agency'],
      action: ['used an automated system to deny', 'used automated screening to reject', 'used software to flag', 'used a fraud filter to cut off'],
      consequence: ['her coverage', 'her rental application', 'his work schedule without explanation', 'his benefits for six weeks']
    };

    const scenarioChips = tool1.querySelector('.rv-scenario-chips');
    const formulaGrid = tool1.querySelector('.rv-formula-grid');
    const draftOutput = tool1.querySelector('.rv-draft-output');
    const note = tool1.querySelector('.rv-note');

    if (scenarioChips) {
      scenarioChips.className = 'rv-formula-intro';
      scenarioChips.innerHTML = '<span>THE MESSAGE FORMULA</span><p><b>PERSON + DECISION-MAKER + ACTION + CONSEQUENCE.</b> Choose one option from each column. Not every combination will read perfectly — the tool is meant to show the shape of a concrete message.</p>';
    }

    const makeSelect = (id, label, options, accent) => `
      <label class="rv-formula-select ${accent}">
        <span>${label}</span>
        <div class="rv-select-wrap">
          <select id="${id}" aria-label="${label}">
            ${options.map((v, i) => `<option value="${v}" ${i === 0 ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
        </div>
      </label>`;

    if (formulaGrid) {
      formulaGrid.innerHTML =
        makeSelect('rv-person-select', 'Person', formulaOptions.person, 'jade') +
        makeSelect('rv-decision-select', 'Decision-maker', formulaOptions.decision, 'coral') +
        makeSelect('rv-action-select', 'Action', formulaOptions.action, 'lime') +
        makeSelect('rv-consequence-select', 'Consequence', formulaOptions.consequence, 'blue');
    }

    const possessive = value => {
      const v = value.trim();
      return v.endsWith('s') ? `${v}'` : `${v}'s`;
    };

    const updateFormula = () => {
      const person = document.getElementById('rv-person-select')?.value || '';
      const decision = document.getElementById('rv-decision-select')?.value || '';
      const action = document.getElementById('rv-action-select')?.value || '';
      const consequence = document.getElementById('rv-consequence-select')?.value || '';
      const sentence = person && decision && action && consequence
        ? `${possessive(person)} ${decision} ${action} ${consequence}.`
        : 'Choose one option from each column.';
      const preview = document.getElementById('rv-draft-preview');
      if (preview) preview.textContent = sentence;
      const copy = document.getElementById('rv-copy-draft');
      if (copy) copy.disabled = !(person && decision && action && consequence);
    };

    formulaGrid?.querySelectorAll('select').forEach(select => select.addEventListener('change', updateFormula));
    updateFormula();
    if (note) note.textContent = 'Generated combinations are writing aids based on the research pattern. They are not themselves survey-tested messages.';

    const copyBtn = document.getElementById('rv-copy-draft');
    if (copyBtn) {
      const clean = copyBtn.cloneNode(true);
      copyBtn.replaceWith(clean);
      clean.addEventListener('click', async () => {
        const text = document.getElementById('rv-draft-preview')?.textContent || '';
        try {
          await navigator.clipboard.writeText(text);
          clean.textContent = 'Copied';
          setTimeout(() => clean.textContent = 'Copy draft', 1200);
        } catch {
          clean.textContent = 'Copy unavailable';
        }
      });
    }

    /* TOOL 7 — replace the textarea heuristic with the drafting checklist shown in Jane's design. */
    const tool7 = document.getElementById('tool-7');
    const tool7Head = tool7.querySelector('.rv-tool-head');
    if (tool7Head) {
      const eyebrow = tool7Head.querySelector('.rv-eyebrow');
      const heading = tool7Head.querySelector('h2');
      const dek = tool7Head.querySelector(':scope > p');
      if (eyebrow) eyebrow.textContent = 'The drafting checklist';
      if (heading) heading.textContent = 'The drafting checklist.';
      if (dek) dek.textContent = "Before publishing a statement, email, social post, or testimony about an AI harm, answer these. If a reader can't answer them after reading your draft, there's still too much technology in it and not enough human story.";
    }

    const checklist = [
      'Who is the person affected?',
      'What happened to them?',
      'What did they lose, or risk losing?',
      'Who chose to use the system?',
      'What decision or action did the system make?',
      'Who is responsible for that decision?',
      'Can the person reach a real human being?',
      'Can the decision be challenged or corrected?',
      'What should have prevented or limited the harm?',
      'What would protect the person now?',
      'What would repair the harm if it has already happened?'
    ];

    const existingLayout = tool7.querySelector('.rv-draft-check-layout');
    if (existingLayout) {
      existingLayout.outerHTML = `
        <div class="rv-drafting-status">
          <div class="rv-drafting-progress"><span id="rv-drafting-fill"></span></div>
          <strong id="rv-drafting-count">0 of ${checklist.length} answered</strong>
        </div>
        <div class="rv-drafting-list" id="rv-drafting-list">
          ${checklist.map((q, i) => `
            <label class="rv-drafting-item tone-${(i % 4) + 1}">
              <input type="checkbox" />
              <span class="rv-drafting-circle" aria-hidden="true">✓</span>
              <span class="rv-drafting-question">${q}</span>
            </label>`).join('')}
        </div>
        <button type="button" class="rv-drafting-reset" id="rv-drafting-reset">Reset checklist</button>`;
    }

    const draftList = document.getElementById('rv-drafting-list');
    const updateDrafting = () => {
      if (!draftList) return;
      const all = [...draftList.querySelectorAll('input[type="checkbox"]')];
      const answered = all.filter(x => x.checked).length;
      const count = document.getElementById('rv-drafting-count');
      const fill = document.getElementById('rv-drafting-fill');
      if (count) count.textContent = `${answered} of ${all.length} answered`;
      if (fill) fill.style.width = `${(answered / all.length) * 100}%`;
    };
    draftList?.querySelectorAll('input[type="checkbox"]').forEach(input => input.addEventListener('change', updateDrafting));
    document.getElementById('rv-drafting-reset')?.addEventListener('click', () => {
      draftList?.querySelectorAll('input[type="checkbox"]').forEach(input => { input.checked = false; });
      updateDrafting();
    });
    updateDrafting();

    /* Keep the top index wording aligned with the revised tool. */
    const toolIndex = root.querySelector('[data-tool-jump="tool-7"] span');
    if (toolIndex) toolIndex.textContent = 'Drafting checklist';

    return true;
  };

  if (!waitForToolkit()) {
    const timer = setInterval(() => {
      if (waitForToolkit()) clearInterval(timer);
    }, 80);
    setTimeout(() => clearInterval(timer), 10000);
  }
})();
