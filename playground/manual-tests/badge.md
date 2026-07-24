# Badge manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Badge |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/badge` |

Scenario order: `01 Overview`, `02 Variants`, `03 Tones`, `04 Sizes`,
`05 Shapes`, `06 Composition`, `07 Theme`, `08 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and recipes

Setup: Open `/badge` in system appearance.

Action: Inspect `01 Overview`; compare all specimens in `02 Variants`,
`03 Tones`, `04 Sizes`, and `05 Shapes`.

Expected: The default passive Badge remains soft neutral, small, and rounded.
Each comparison changes only its named visual dimension. Text stays centered,
readable, and vertically balanced without implying a control.

Result:
Notes or issue:

## Step 2 — Content and composition output

Setup: Open `06 Composition`.

Action: Inspect representative text, icon/content, native, render, and asChild
examples and compare each output panel with its live result.

Expected: Content remains concise and aligned. Native, render, and asChild
hosts match the displayed HTML, preserve Badge classes/slots, and remain
passive unless the consumer’s host supplies separate semantics.

Result:
Notes or issue:

## Step 3 — Theme and customization

Setup: Open `07 Theme`; switch system, light, and dark appearance.

Action: Inspect scoped examples and compare customization code with its result.

Expected: Every variant and tone retains readable contrast and a visible
boundary where required. Customization remains local and preserves Badge
geometry, content, classes, and slots.

Result:
Notes or issue:

## Step 4 — Reflow, RTL, and preferences

Setup: Open `08 Stress`; test at 390 px, 200%, and 400% zoom, then RTL and
forced colors.

Action: Inspect long/localized Badge content and surrounding layout.

Expected: Text wraps or sizes without clipping, overlap, or page overflow;
logical padding remains balanced in RTL, and system colors preserve content and
boundaries.

Result:
Notes or issue:

## Step 5 — Assistive technology

Setup: Enable the recorded screen reader.

Action: Navigate Overview and Composition.

Expected: Badge text is read in document order without an invented button,
status, or landmark role. Decorative icons add no duplicate speech.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable assistive-technology environments `blocked`.
