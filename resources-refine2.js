(() => {
  const root = document.getElementById('resources-view');
  if (!root) return;

  const boot = () => {
    if (root.dataset.resourcesRefined !== '2') return false;
    if (root.dataset.resourcesRefined2 === '1') return true;
    root.dataset.resourcesRefined2 = '1';

    /* Restore the original Tool 1 title only. */
    const tool1Heading = document.querySelector('#tool-1 .rv-tool-head h2');
    if (tool1Heading) tool1Heading.textContent = 'Build from the person out.';

    /* Cross-partisan talking points should arrive fully collapsed. */
    const tool3 = document.getElementById('tool-3');
    tool3?.querySelectorAll('.rv-point-card').forEach(card => {
      card.classList.remove('open');
      card.querySelector('.rv-point-toggle')?.setAttribute('aria-expanded', 'false');
    });

    /* Replace native selects with inline expanding menus. This fixes the arrow and
       means opening a menu grows the card/row instead of covering the live draft. */
    const formulaGrid = document.querySelector('#tool-1 .rv-formula-grid');
    if (!formulaGrid) return true;

    const fieldOrder = ['person', 'decision', 'action', 'consequence'];
    const selections = {};

    formulaGrid.querySelectorAll('.rv-formula-select').forEach((card, index) => {
      const oldSelect = card.querySelector('select');
      if (!oldSelect) return;
      const field = fieldOrder[index];
      const options = [...oldSelect.options].map(o => o.value);
      const selected = oldSelect.value || options[0] || '';
      selections[field] = selected;

      const shell = card.querySelector('.rv-select-wrap');
      if (!shell) return;
      shell.classList.add('rv-custom-select');
      shell.innerHTML = `
        <details data-field="${field}">
          <summary>
            <span class="rv-custom-value">${selected}</span>
            <span class="rv-custom-arrow" aria-hidden="true"></span>
          </summary>
          <div class="rv-custom-options">
            ${options.map((value, i) => `<button type="button" data-value="${value.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" class="${value === selected ? 'selected' : ''}">${value}</button>`).join('')}
          </div>
        </details>`;
    });

    const possessive = value => {
      const v = value.trim();
      return v.endsWith('s') ? `${v}'` : `${v}'s`;
    };

    const updateFormula = () => {
      const {person = '', decision = '', action = '', consequence = ''} = selections;
      const preview = document.getElementById('rv-draft-preview');
      if (preview) preview.textContent = person && decision && action && consequence
        ? `${possessive(person)} ${decision} ${action} ${consequence}.`
        : 'Choose one option from each column.';
    };

    const allDetails = [...formulaGrid.querySelectorAll('.rv-custom-select details')];
    allDetails.forEach(details => {
      details.addEventListener('toggle', () => {
        if (!details.open) return;
        allDetails.forEach(other => { if (other !== details) other.open = false; });
      });

      details.querySelectorAll('.rv-custom-options button').forEach(button => {
        button.addEventListener('click', () => {
          const field = details.dataset.field;
          const value = button.dataset.value || '';
          selections[field] = value;
          const valueNode = details.querySelector('.rv-custom-value');
          if (valueNode) valueNode.textContent = value;
          details.querySelectorAll('.rv-custom-options button').forEach(btn => btn.classList.toggle('selected', btn === button));
          details.open = false;
          updateFormula();
        });
      });
    });

    updateFormula();
    return true;
  };

  if (!boot()) {
    const timer = setInterval(() => {
      if (boot()) clearInterval(timer);
    }, 60);
    setTimeout(() => clearInterval(timer), 10000);
  }
})();
