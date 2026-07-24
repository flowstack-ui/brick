# Tooltip manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Tooltip |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/tooltip` |

Scenario order: `01 Overview`, `02 Recipes`, `03 Shapes`, `04 Sides`,
`05 Alignments`, `06 States`, `07 Composition`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and input behavior

Setup: Open `/tooltip` and `01 Overview`.

Action: Focus the trigger, press Escape, hover across trigger and Tooltip, and
perform a touch hold on a real touch device when available.

Expected: Tooltip opens after the appropriate input/timing, remains open across
the hover bridge, contains no interactive content, closes with Escape, and
leaves focus on the trigger. It stays below the playground header.

Result:
Notes or issue:

## Step 2 — Recipes, shapes, sides, and alignments

Setup: Review `02 Recipes`, `03 Shapes`, `04 Sides`, and `05 Alignments`.

Action: Open every specimen.

Expected: Plain/rich recipes and optional Arrow match their labels. Shape
changes radius only. Preferred side/alignment changes initial geometry; final
placement stays in the viewport and Arrow overlaps the resolved surface edge.

Result:
Notes or issue:

## Step 3 — Timing, state, and trigger composition

Setup: Open `06 States` and `07 Composition`.

Action: Test controlled, provider timing, default-open, and disabled examples;
then inspect native, render, and asChild output and focus each trigger.

Expected: Only the dedicated default-open specimen starts open. Disabled never
opens. Every trigger remains the actual named focus owner, the HTML panel
matches its live host, and Tooltip adds no focusable descendants.

Result:
Notes or issue:

## Step 4 — Theme and customization

Setup: Open `08 Theme`; switch system, light, and dark appearance.

Action: Open scoped and customized Tooltips and compare code with output.

Expected: Portal content uses its local scope. Text, Arrow, boundary, and focus
remain readable; customization changes presentation only and preserves timing,
placement, semantics, classes, and slots.

Result:
Notes or issue:

## Step 5 — Reflow, RTL, and preferences

Setup: Open `09 Stress`; test at 390 px, 200%, and 400% zoom, RTL, reduced
motion, and forced colors.

Action: Open long localized and unbroken Tooltip content.

Expected: Content wraps and remains viewport-contained, reading order and
placement are logical in RTL, motion is nonessential, and system colors
preserve boundary/text/focus.

Result:
Notes or issue:

## Step 6 — Screen reader

Setup: Enable the recorded screen reader.

Action: Navigate Overview, rich content, disabled, and composition triggers.

Expected: Each trigger announces its independent name and Tooltip description
once. Tooltip content is descriptive, not a second focus stop or interactive
popup.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable touch or assistive-technology environments `blocked`.
