# Notification Badge manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Notification Badge |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/notification-badge` |

Scenario order: `01 Overview`, `02 Tones`, `03 Sizes`, `04 Placements`,
`05 Overlap`, `06 States`, `07 Semantics`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview, tones, and sizes

Setup: Open `/notification-badge` in system appearance.

Action: Inspect `01 Overview`, every tone in `02 Tones`, and every size in
`03 Sizes`.

Expected: The indicator is visually attached to its owning target without
changing target geometry. Tones change semantic color only; sizes change the
indicator and content scale only. Count text remains centered and legible.

Result:
Notes or issue:

## Step 2 — Placement and overlap

Setup: Open `04 Placements` and `05 Overlap`.

Action: Compare all logical corners on rectangular and circular targets.

Expected: Each placement occupies the labeled logical corner. Rectangular and
circular overlap compensation keeps the indicator attached without covering
the target’s main icon or changing its hit area.

Result:
Notes or issue:

## Step 3 — Content, visibility, and semantics

Setup: Open `06 States` and `07 Semantics`.

Action: Inspect count, dot, zero, overflow, and invisible examples. Activate
the owning Icon Buttons using keyboard, pointer, and touch when available.

Expected: Formatting and visibility match each label; no empty artifact
remains when hidden. Only the owning control is interactive and focusable.
Notification Badge adds no independent button or live announcement.

Result:
Notes or issue:

## Step 4 — Theme and customization

Setup: Open `08 Theme`; switch system, light, and dark appearance.

Action: Inspect scoped examples and compare customization code with its result.

Expected: Indicator content and boundaries remain clear over every target.
Customization stays local and preserves placement, overlap, classes, slots,
and ownership.

Result:
Notes or issue:

## Step 5 — Reflow, RTL, and assistive technology

Setup: Open `09 Stress`; test at 390 px, 200%, and 400% zoom and in RTL. Enable
the recorded screen reader.

Action: Inspect long counts/localized context and operate the owning controls.

Expected: Indicators remain attached and unclipped without page overflow;
logical corners mirror in RTL. The control announces its own complete name
once, and the visual indicator is silent unless surrounding application copy
provides meaning.

Result:
Notes or issue:

## Step 6 — Forced colors

Setup: Enable forced colors.

Action: Inspect representative count and dot indicators with focused owners.

Expected: Indicator boundary/content and the owner’s focus remain visible
without relying on color alone.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical or assistive-technology environments `blocked`.
