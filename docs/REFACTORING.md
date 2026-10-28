# TTJ codebase maintenance and zero-change protocol

## Release constraint

The publicly accessible TTJ dashboard at https://ttjdata.online is the approved reference.
A code-maintenance change must not alter any public-facing text, data, layout, typography,
colors, charts, navigation, downloads, animation, interaction, accessibility behavior,
or responsive layout.

**Never equate a successful Vercel deployment with visual or functional equivalence.**

## Baseline and isolation

- Baseline production commit: `1395b9a3f791d9b7a6b27a887bd933ca6833e2a4`.
- Maintenance branch: `refactor/zero-change-maintenance-2026-10-28`.
- Keep `main` and production untouched until the complete validation gate passes.
- Do not reconfigure Vercel, change domains, or promote the branch automatically.

## Current architecture

The site is a static HTML/CSS/JavaScript application. `index.html` contains the
initial shell and embedded legacy assets. `resources.js` loads later page modules.
`what-we-learned-traditional.js` renders the homepage's editorial sections.
`explore-v2.js` contains interactive research presentation and survey data.
`resources-v2.js`, `resources-refine.js`, and `resources-refine2.js` supply
the resources and messaging tools. `ux-refine.js` adds navigation and search.
`ux-refine.css` contains cumulative styling overrides; this is the main
maintenance challenge.

The original architecture was built incrementally. Consolidating CSS overrides
without regression testing is high risk: selector specificity, cascade ordering,
load order and responsive breakpoints are part of the existing behavior.

## Gate 1: byte-level protection

From a local Git checkout run:

```sh
node scripts/verify-production-parity.mjs 1395b9a3f791d9b7a6b27a887bd933ca6833e2a4
```

This is intentionally strict: it permits documentation and testing improvements,
but rejects any production source modifications until independent tests exist.

## Gate 2: visual comparison

For a candidate preview deployment, run:

```sh
npm install --no-save playwright
npx playwright install chromium
BASELINE_URL=https://ttjdata.online CANDIDATE_URL=https://<candidate-preview-domain> node scripts/compare-browser.mjs
```

The script saves full-page images for home, Explore and Resources at four viewports,
and compares exact pixel hashes and extracted text. Any difference blocks promotion.
Screenshots depend on fonts, image loading and nondeterministic interactions;
investigate mismatches instead of weakening the gate.

## Gate 3: interactions and external assets

Before promoting runtime refactors, manually verify and document the following in
both environments: hero navigation, sticky section navigation, round selection,
charts, search and filters, all accordion states, message-builder selections,
copy functionality, downloadable memo and toolkit resources, keyboard navigation,
and mobile layout. Check browser console and all resource requests for errors.

## Refactor order (after a verified baseline)

1. Inventory all loaded assets and stylesheet precedence.
2. Build comprehensive interaction tests and record reference screenshots.
3. Identify superseded CSS properties and prove their removal with computed styles.
4. Consolidate selectors in small batches, retaining exact cascade order.
5. Separate research data from rendering only with output equality tests.
6. Update architecture documentation and developer handover instructions.
7. Re-run every test; refuse promotion on any mismatch.

Do not remove audit or source provenance records to imply a false authorship history.

## Initial regression results, 28 October 2026

- Strict source-parity CI passed: runtime source differs only by removal of one empty CSS rule.
- All 12 screenshot comparisons contain identical extracted page text.
- The Explore and Resources screenshots matched exactly at all four measured viewport sizes.
- Homepage screenshots showed intermittent pixel mismatches concentrated within the top 210–230 pixels, with no extracted text difference. This has not been conclusively diagnosed, so the visual gate remains blocked.
- Basic route, initial accordion state, accordion toggling and memo link parity passed in the Playwright interaction smoke test.
- The maintained UX CSS is now organized into seven source modules in `styles/ux/`. Their concatenation is verified byte-for-byte against `ux-refine.css`.
- All served HTML, CSS, JavaScript, data, and downloads remain byte-identical to approved production, so this maintenance phase makes no runtime modifications.
- Screenshots can differ between two copies of the exact same baseline due to page-state nondeterminism; the visual test remains informative but is not a sound zero-change gate for commits that change no served assets.
- Any later runtime-source refactor must establish a deterministic browser baseline and pass comprehensive visual and interaction regression tests before it can be promoted.

Run and evidence: https://github.com/bloopeter-wq/ttj-guided-research-tour/actions/runs/40679489688

A successful Vercel preview is not sufficient to bypass the failing visual gate.

## Lossless CSS modules

The maintained source is split into seven pieces under `styles/ux/`, ordered by `scripts/build-ux-css.mjs`. Unlike CSS minification, this build performs raw buffer concatenation only: it rewrites no tokens or declarations. On Node 24, use:

```sh
node scripts/build-ux-css.mjs          # verify exact CSS-byte identity
node scripts/build-ux-css.mjs --write  # regenerate only when source is intentionally edited
```

Runtime assets retain exact production bytes. For the current maintenance branch, the hard source gate `scripts/verify-production-parity.mjs` blocks every change to deployed application assets. The new CSS modules are source files, not separately loaded or linked stylesheets.
