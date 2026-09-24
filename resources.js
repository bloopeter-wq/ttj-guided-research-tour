// Working examples from the TTJ movement pamphlet. Generated drafts are not poll tested.
const messageScenarios = {
  health: ['a patient', 'a health insurer', 'uses AI to deny doctor-recommended treatment', 'can lose access to the care their doctor recommended'],
  benefits: ['a person receiving benefits', 'a public benefits agency', 'uses an automated system to flag someone for fraud', 'can have their benefits stopped without an explanation'],
  housing: ['a tenant applying for an apartment', 'a landlord', 'uses automated screening that gets someone wrong', 'can lose the apartment']
};
const languageExamples = {
  health: {
    avoid: 'AI may introduce bias into health care.',
    say: 'Your doctor says you need the treatment. Your insurer’s AI says you cannot have it.'
  },
  benefits: {
    avoid: 'Automated systems can affect access to public benefits.',
    say: 'A system flags you for fraud. Your benefits stop. Nobody can explain why.'
  },
  housing: {
    avoid: 'AI can create risks for tenants.',
    say: 'Your landlord uses an automated screening system. It gets you wrong. You lose the apartment.'
  },
  work: {
    avoid: 'Algorithmic management affects workers.',
    say: 'Your employer uses software to track what you do, decide your schedule and judge your performance.'
  },
  accountability: {
    avoid: 'AI raises accountability concerns.',
    say: 'A system made the decision. The company says it was the software. The software cannot answer you. So who is responsible?'
  },
  human: {
    avoid: 'AI systems can reduce human interaction.',
    say: 'You need help from a person. The organisation will only let you talk to a machine.'
  }
};

const fields = ['person','decision','action','consequence'].map(name => document.getElementById('message-' + name));
const preview = document.getElementById('message-preview');
const copy = document.getElementById('copy-message');
const scenario = document.getElementById('message-scenario');
let draft = '';
function updateDraft() {
  const values = fields.map(field => field.value.trim());
  draft = values.every(Boolean) ? `When ${values[1]} ${values[2]}, ${values[0]} ${values[3]}.` : '';
  preview.textContent = draft || 'Select a scenario or enter the four parts to build a draft.';
  copy.disabled = !draft;
  copy.textContent = 'Copy draft';
}
scenario.addEventListener('change', () => {
  const values = messageScenarios[scenario.value] || ['', '', '', ''];
  fields.forEach((field, index) => { field.value = values[index]; });
  updateDraft();
});
fields.forEach(field => field.addEventListener('input', updateDraft));
copy.addEventListener('click', async () => {
  if (!draft) return;
  try { await navigator.clipboard.writeText(draft); copy.textContent = 'Copied'; }
  catch { copy.textContent = 'Copy unavailable'; }
});

const example = document.getElementById('language-example');
example.addEventListener('change', () => {
  const pair = languageExamples[example.value];
  document.getElementById('say-text').textContent = pair?.say || 'Choose an example above.';
  document.getElementById('avoid-text').textContent = pair?.avoid || 'Choose an example above.';
});

const fieldLabels = ['Person', 'Decision-maker', 'Action', 'Consequence'];
const labels = [...document.querySelectorAll('.formula-fields label')];
let step = 0;
function showStep() {
  labels.forEach((label, index) => label.classList.toggle('current', index === step));
  document.getElementById('step-status').textContent = `Step ${step + 1} of 4: ${fieldLabels[step]}`;
  document.getElementById('step-back').disabled = step === 0;
  document.getElementById('step-next').disabled = step === 3;
}
document.getElementById('step-back').addEventListener('click', () => { step = Math.max(0, step - 1); showStep(); });
document.getElementById('step-next').addEventListener('click', () => { step = Math.min(3, step + 1); showStep(); });
showStep();

/* Load the redesigned What We Learned experience after the existing page is ready. */
(function loadWhatWeLearned() {
  try { if (typeof timer !== 'undefined') clearTimeout(timer); } catch (e) {}
  try { if (typeof paused !== 'undefined') paused = true; } catch (e) {}

  if (!document.getElementById('what-we-learned-css')) {
    const css = document.createElement('link');
    css.id = 'what-we-learned-css';
    css.rel = 'stylesheet';
    css.href = 'what-we-learned.css?v=2';
    document.head.appendChild(css);
  }

  if (!document.getElementById('what-we-learned-refine-css')) {
    const refine = document.createElement('link');
    refine.id = 'what-we-learned-refine-css';
    refine.rel = 'stylesheet';
    refine.href = 'what-we-learned-refine.css?v=2';
    document.head.appendChild(refine);
  }

  if (!document.getElementById('what-we-learned-theme-css')) {
    const theme = document.createElement('link');
    theme.id = 'what-we-learned-theme-css';
    theme.rel = 'stylesheet';
    theme.href = 'what-we-learned-theme.css?v=1';
    document.head.appendChild(theme);
  }

  if (!document.getElementById('what-we-learned-js')) {
    const script = document.createElement('script');
    script.id = 'what-we-learned-js';
    script.src = 'what-we-learned.js?v=2';
    document.body.appendChild(script);
  }

  if (!document.getElementById('headline-palette-js')) {
    const palette = document.createElement('script');
    palette.id = 'headline-palette-js';
    palette.src = 'headline-palette.js?v=1';
    document.body.appendChild(palette);
  }

  if (!document.getElementById('what-we-learned-traditional-css')) {
    const pageCss = document.createElement('link');
    pageCss.id = 'what-we-learned-traditional-css';
    pageCss.rel = 'stylesheet';
    pageCss.href = 'what-we-learned-traditional.css?v=1';
    document.head.appendChild(pageCss);
  }

  if (!document.getElementById('what-we-learned-traditional-js')) {
    const pageJs = document.createElement('script');
    pageJs.id = 'what-we-learned-traditional-js';
    pageJs.src = 'what-we-learned-traditional.js?v=1';
    document.body.appendChild(pageJs);
  }

  if (!document.getElementById('headline-banner-v2-css')) {
    const bannerCss = document.createElement('link');
    bannerCss.id = 'headline-banner-v2-css';
    bannerCss.rel = 'stylesheet';
    bannerCss.href = 'headline-banner-v2.css?v=1';
    document.head.appendChild(bannerCss);
  }

  if (!document.getElementById('headline-banner-v2-js')) {
    const bannerJs = document.createElement('script');
    bannerJs.id = 'headline-banner-v2-js';
    bannerJs.src = 'headline-banner-v2.js?v=1';
    document.body.appendChild(bannerJs);
  }
})();

/* Load the redesigned Explore the Data experience without disturbing other sections. */
(function loadExploreDataV2() {
  if (!document.getElementById('explore-v2-css')) {
    const css = document.createElement('link');
    css.id = 'explore-v2-css';
    css.rel = 'stylesheet';
    css.href = 'explore-v2.css?v=1';
    document.head.appendChild(css);
  }
  if (!document.getElementById('explore-polish-css')) {
    const polish = document.createElement('link');
    polish.id = 'explore-polish-css';
    polish.rel = 'stylesheet';
    polish.href = 'explore-polish.css?v=1';
    document.head.appendChild(polish);
  }
  if (!document.getElementById('explore-v2-js')) {
    const script = document.createElement('script');
    script.id = 'explore-v2-js';
    script.src = 'explore-v2.js?v=1';
    document.body.appendChild(script);
  }
})();

/* Load the redesigned interactive Use the Research toolkit. */
(function loadResourcesV2() {
  if (!document.getElementById('resources-v2-css')) {
    const css = document.createElement('link');
    css.id = 'resources-v2-css';
    css.rel = 'stylesheet';
    css.href = 'resources-v2.css?v=1';
    document.head.appendChild(css);
  }
  if (!document.getElementById('resources-refine-css')) {
    const refineCss = document.createElement('link');
    refineCss.id = 'resources-refine-css';
    refineCss.rel = 'stylesheet';
    refineCss.href = 'resources-refine.css?v=1';
    document.head.appendChild(refineCss);
  }
  if (!document.getElementById('resources-refine2-css')) {
    const refine2Css = document.createElement('link');
    refine2Css.id = 'resources-refine2-css';
    refine2Css.rel = 'stylesheet';
    refine2Css.href = 'resources-refine2.css?v=1';
    document.head.appendChild(refine2Css);
  }
  if (!document.getElementById('resources-v2-js')) {
    const script = document.createElement('script');
    script.id = 'resources-v2-js';
    script.src = 'resources-v2.js?v=1';
    document.body.appendChild(script);
  }
  if (!document.getElementById('resources-refine-js')) {
    const refineJs = document.createElement('script');
    refineJs.id = 'resources-refine-js';
    refineJs.src = 'resources-refine.js?v=1';
    document.body.appendChild(refineJs);
  }
  if (!document.getElementById('resources-refine2-js')) {
    const refine2Js = document.createElement('script');
    refine2Js.id = 'resources-refine2-js';
    refine2Js.src = 'resources-refine2.js?v=1';
    document.body.appendChild(refine2Js);
  }
})();
