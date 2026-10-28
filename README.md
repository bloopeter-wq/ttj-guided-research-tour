# TechTonic Justice | Research Dashboard

Interactive research and message-testing website published at [ttjdata.online](https://ttjdata.online).

## Application

The current site is a static HTML, CSS and JavaScript application deployed from GitHub to Vercel.

- `index.html`: application shell and base styles
- `what-we-learned-traditional.js`: What We Learned page
- `explore-v2.js`: research exploration and data presentation
- `resources-v2.js`: tools and resources
- `resources.js`: resource controls and module loading
- `ux-refine.js`: shared navigation and search behavior
- `styles/ux/`: seven maintained, ordered CSS source modules
- `ux-refine.css`: byte-identical generated browser stylesheet

The codebase includes incremental page refinements and multiple CSS layers.
Read [the maintenance and refactoring guide](docs/REFACTORING.md) before consolidating them.

## Production safety

The approved public version is protected by a zero-change maintenance protocol.
All refactoring belongs on a separate branch and must pass source, visual, content,
and interaction comparison before promotion. **Do not deploy maintenance changes to
production merely because a build succeeds.**

Read [docs/REFACTORING.md](docs/REFACTORING.md) for the baseline commit, checks,
required comparisons, and release procedure.

## Data and editorial integrity

Keep poll-tested results separate from illustrative messaging examples.
Do not change questionnaire wording, measures, percentages, sample sizes, source
attribution, downloadable research material, or audience guidance during code refactoring.

## Working with the stylesheet

The modular source in `styles/ux/` reconstructs the approved `ux-refine.css` file without transforms. Run `node scripts/build-ux-css.mjs` to check exact parity; run it with `--write` only when intentionally editing CSS. Current maintenance work deliberately changes no served assets. Do not substitute minification, formatting, bundling, or other output transformations without a new complete regression baseline.
