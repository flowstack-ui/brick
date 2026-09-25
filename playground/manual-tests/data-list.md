# Data List manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Data List |
| Version or commit | Unreleased 0.2.3 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/data-list` |

Normal documentation: Basic, Sizes, Variants, Orientation, Responsive,
Separator, Info tip, Rich values, Label measures, Grouped terms and nested
facts, Shared defaults and closed composition, Long content and RTL.
The stable evidence route remains `/data-list?qualification=1`.

Scenario order: `01 Overview`, `02 Responsive orientation`, `03 Recipes, appearance, and stress`.

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

Setup: Inspect Sizes, Variants, Label measures, Responsive, and Separator.

Action: Compare each size, emphasis variant and label width. Resize across
768, 1024 and 1280 px, including the horizontal-to-vertical example.

Expected: Typography and rhythm change together, horizontal labels share the
requested logical measure, and separators remain visible without changing
description-list semantics. Default-theme text is 12/14/16 px with item gaps
12/16/20 px. Every responsive reversal resets the layout. A custom measure
works in auto mode and remains bounded at narrow widths.

Result:
Notes or issue:

## Step 3 — Rich values and interaction

Setup: Inspect Rich values, Info tip, Grouped terms and nested facts, and
Shared defaults and closed composition.

Action: Tab through links and the named info button. Open the tip with Enter,
close with Escape, and inspect grouped terms and nested description lists.

Expected: Rich values wrap and retain their own native behavior. Data List adds
no row click action, focus target, table semantics, or invented label/value
relationships. Escape restores focus to the info button. Multiple terms precede
descriptions in DOM reading order, while a nested list owns its own recipes.

Result:
Notes or issue:

## Step 4 — Theme and system preferences

Setup: Use the playground appearance controls; switch system, light, and dark
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

Action: Navigate Basic, Grouped terms and nested facts, and Info tip in reading order.

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
