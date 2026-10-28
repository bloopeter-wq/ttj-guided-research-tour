# TTJ Technical Quality Audit
**Date:** 28 October 2026  
**Scope:** Source maintainability and regression safeguards. No application redesign.

## Verified architectural maintenance

- The main UX stylesheet is maintained in seven ordered source files under `styles/ux/`, reassembled without transforms by `scripts/build-ux-css.mjs`.
- Three large JavaScript files, `ux-refine.js`, `explore-v2.js` and `resources-v2.js`, now have 15 logically grouped source partitions under `src/legacy/`. The assembly script concatenates exact bytes in fixed order.
- The runtime HTML, CSS, JavaScript, data and assets are not changed by this maintenance branch. The source-parity GitHub Actions workflow rejects edits to deployed files.
- The separate Vercel and GitHub deployments verify shipping/build success, **not** user-facing equivalence on their own.

## Risks identified and kept unchanged

1. **CSS cascade debt:** Approximately 894 `!important` declarations remain in `ux-refine.css`. Consolidating selectors would change served CSS and needs an improved deterministic visual baseline.
2. **JavaScript structure:** The three maintained scripts share lexical scope within IIFEs and make substantial DOM updates. Their source partitions improve navigation and editing, but they have *not* been converted to independent ES modules or rewritten.
3. **Initial-page HTML:** `index.html` combines embedded application logic with HTML/CSS. A structural rewrite could affect load order and must be separately validated.
4. **Dynamic HTML:** Several page modules construct markup using `innerHTML`. Values must be reviewed for sanitization before accepting untrusted inputs or connecting a live data backend.
5. **Data integrity:** Survey results and illustrative messaging examples must remain distinct. Future source cleanup must not silently alter figures, question wording or methodological explanations.
6. **Test coverage:** Basic navigation and accordion smoke tests passed during the October maintenance run. Broader keyboard, accessibility, downloads, filtering, chart and copy workflows have not yet been exhaustively automated.
7. **Screenshot determinism:** During maintenance, even two separate servers serving the same original commit sometimes produced distinct screenshots. Full-frame pixel equality is therefore diagnostic and cannot currently certify a functional code refactor.

## Strict release gate

No refactor changing application assets should proceed to production unless all of the following are satisfied:

- Approved prior commit retained as a reversible release.
- Automated source parity and build checks pass.
- Deterministic screenshot baselines established for the actual interactive states.
- Desktop, laptop, tablet and mobile viewport visual review passes.
- Keyboard, filters, navigation, interactions, charts, downloads and links are tested in both versions.
- Data integrity and attribution checked independently.
- No uncategorized runtime exceptions or network resource failures.

## Current disposition

The October source-organization maintenance is approved for a **byte-identical runtime release**. It does not claim all technical debt is eliminated. The large CSS and JavaScript rewrites are deliberately excluded because a zero visual or functional difference cannot yet be proven for those changes. This is a deliberate safety decision, not an outstanding deployment task.
