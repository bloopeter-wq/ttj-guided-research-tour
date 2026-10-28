# Jane's Resources Page: Acceptance and Release Checklist

Source: Jane's exact Resources Page notes supplied by the user, 28 October 2026.
This checklist is the controlling brief for this release. No item may be silently omitted.

## Structure
- [x] Remove the “Tools by Task” menu and related shortcut buttons.
- [x] Remove the entire “Decision First Framing” section, which duplicates Say This, Not That.
- [x] Keep the other interactive messaging tools intact.
- [x] Keep Drafting Checklist compact, in two columns at desktop/tablet widths, one column on narrow mobile.

## Downloads and kits
- [x] Two columns: four download links on left and preview on right.
- [x] Memo: existing TTJ Message Testing Memo HTML.
- [x] Cheat Sheet for Policymakers: existing policymaker one-page DOCX.
- [x] Cheat Sheet for Movement Orgs: existing movement one-page DOCX.
- [x] Say This, Not That and other Messaging Hints: created a standalone printable/downloadable HTML guide, with source language and clearly marked illustrative examples.
- [x] The right-hand preview is a professionally formatted illustrative cheat-sheet cover, explicitly labelled a preview illustration, and links to the existing research PDF. Do not claim this illustration is a literal screenshot.
- [x] Verify that all four download responses return HTTP 200 in the local candidate build. Production verification after merge is separate.

## Concrete Language Examples
- [x] Healthcare, **Not that**: “AI is affecting access to health care.”
- [x] Public Benefits, **Say this**: “The Social Security Administration uses an AI system that falsely flags you for fraud which immediately cuts off your benefits. Nobody can explain why and you can’t reach a human for help.”
- [x] Housing, **Say this**: “Landlords are using AI screening systems that can falsely flag people for evictions or mix them up with someone who has the same name. The applications are denied and the renters have no idea why.”
- [x] Other examples preserved.

## Independent verification
- [x] Source reconstruction checks for all existing JS and CSS.
- [x] Browser checks at 1440px, 1024px, 820px, and 390px.
- [x] Confirm no Tools by Task menu and no Decision First section appear after all enhancement scripts finish.
- [x] Confirm only four downloads appear and each resolves.
- [x] Confirm exact three example strings in interactive UI.
- [x] Confirm two-column drafting layout and small-screen single-column fallback.
- [ ] Production deployment READY with expected GitHub commit.

The Explore and Home pages are outside this Resources-only change set.

## Verified CI before release

- Source integrity: PASS, run 40733015745.
- Jane Resources browser acceptance: PASS, run 40733015737.
- Explore regression suite: PASS, run 40733015885.
