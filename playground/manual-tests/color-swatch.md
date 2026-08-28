# Color Swatch manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Color Swatch |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/color-swatch` |

Scenario order: `01 Overview`, `02 Sizes`, `03 Mixed colors`, `04 Semantics`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Solid, alpha, mix, and sizes

Expected: Every preview is square and crisply bounded; alpha reveals the checker; mix segments are even; sm/md/lg remain 16/24/32 px and align with adjacent text.

Result:
Notes or issue:

## Step 2 — Appearance and forced colors

Expected: Light and dark surfaces preserve the checker and boundary. Forced colors preserves a visible system border; surrounding text still carries meaning.

Result:
Notes or issue:

## Step 3 — Reflow, zoom, RTL, and localization

Expected: At 320 px, 200% text, 400% zoom, and RTL, swatches keep their footprint while the owning layout wraps without horizontal page overflow.

Result:
Notes or issue:

## Step 4 — Assistive technology

Expected: Decorative swatches are skipped. The explicitly labeled swatch is announced once as an image named “Ocean blue color.” Color is never the only selection or state cue.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
