# Data List manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Data List |
| Version or commit | Unreleased 0.1.9 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/data-list` |

Scenario order: `01 Overview`, `02 Orientations`, `03 Sizes`, `04 Label
Measures`, `05 Composition`, `06 Theme`, `07 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and orientations

Setup: Open `/data-list` in system appearance.

Action: Compare vertical and horizontal examples and inspect Root, Item, Label,
and Value in the element inspector.

Expected: Root renders a native `dl`, Label renders `dt`, Value renders `dd`,
and every item preserves label-then-value source order. Orientation changes
layout only and does not duplicate content.

Result:
Notes or issue:

## Step 2 — Sizes, label measures, and separators

Setup: Inspect `03 Sizes` and `04 Label Measures`.

Action: Compare each size and label width, then toggle divided rows where the
example permits it.

Expected: Typography and rhythm change together, horizontal labels share the
requested logical measure, and separators remain visible without changing
description-list semantics.

Result:
Notes or issue:

## Step 3 — Rich values and interaction

Setup: Open `05 Composition`.

Action: Tab through links and other explicit controls authored inside Value.

Expected: Rich values wrap and retain their own native behavior. Data List adds
no row click action, focus target, table semantics, or invented label/value
relationships.

Result:
Notes or issue:

## Step 4 — Theme and system preferences

Setup: Open `06 Theme` and `07 Stress`; switch system, light, and dark
appearance, then enable forced colors and reduced motion.

Action: Inspect labels, values, dividers, and any nested focusable content.

Expected: Primary and secondary text remain distinguishable, dividers remain
visible, nested focus remains complete, and Data List adds no motion.

Result:
Notes or issue:

## Step 5 — Reflow, localization, and RTL

Setup: Use 320 px, 200% text, and 400% zoom, then enable RTL.

Action: Inspect long translated labels and values in both orientations.

Expected: Responsive orientation follows the authored prop, content wraps
without clipping or horizontal page overflow, and logical alignment and label
measure remain correct in RTL.

Result:
Notes or issue:

## Step 6 — Assistive technology

Setup: Enable VoiceOver and another available screen reader.

Action: Navigate the Overview and Composition examples in reading order.

Expected: Native description-list context is available without redundant ARIA
roles; labels and values are read in authored order and nested controls retain
their names.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical or assistive-technology environments `blocked`.
