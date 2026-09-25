# Stack manual-test protocol

## Separator addition (September 12, 2026; human run pending)

Review the Separator preview at every breakpoint, RTL and narrow widths. Confirm
lines are decorative, do not take focus, and have equal spacing on either side.
Review the short centered line, custom artwork and responsive axis changes.
Check light/dark, forced colors and actual browser zoom. For/Fragment output and
CSS-hidden peers are intentionally not traversed; use manual peer composition.

## Expanded flex pass (September 10, 2026; human run pending)

Normal `/stack` contains source-paired docs. Original numbered scenarios remain
at `/stack?qualification=1` and in the standalone evidence runner.

1. Review all fifteen curated docs previews at 320, 768 and 1440px; confirm clear labels,
   genuine differences, readable wrapping and no clipped controls.
2. Review reverse/order in LTR and RTL; keyboard and screen-reader traversal
   must remain meaningful. No positive tabindex or duplicated content.
3. Compare row/column gaps, multiline alignment, factors, basis and margins.
   Resize across every authored breakpoint and check explicit resets.
4. Review inline prose baseline and root/Item/Surface composition. Confirm the
   first preview fills its row with three equal tracks, without custom CSS.
5. Run actual 400% zoom, forced colors, text spacing and physical touch checks.

Results: not run. Automated browser results are recorded independently; they
do not close manual assistive-technology or physical-device checks.

| Run information | Value |
| --- | --- |
| Component | Stack |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/stack` |

Scenario order: `01 Overview`, `02 Stack family`, `03 Gaps`,
`04 Alignment`, `05 Distribution`, `06 Wrapping and constraints`,
`07 Semantic hosts`, `08 Appearance and customization`,
`09 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Defaults, family, and spacing

Setup: Open `/stack`; review `01` through `03` top to bottom.

Action: Compare Stack, HStack, VStack, legacy gaps zero through six, numeric
factor 8, explicit 2.25rem, and the responsive 2-to-8 example while crossing
the 48rem breakpoint.

Expected: Stack and VStack form identical columns. HStack forms one centered
row. Child order never changes. Legacy gaps preserve their established sizes;
factor 8 is 2rem, explicit 2.25rem is exact, and the responsive example changes
from 0.5rem to 2rem without missing or stale spacing. None adds outer spacing
or changes the items.

Result:
Notes or issue:

## Step 2 — Alignment, distribution, and wrapping

Setup: Continue through `04` to `06`; resize the window narrower and wider.

Action: Compare cross-axis alignment, main-axis distribution, then identical
wrapped and unwrapped action rows.

Expected: Only the named layout dimension changes. Baselines align unlike-sized
text. Between/around/evenly distribute predictable free space. The wrapped row
forms new lines in source order and stays inside its frame; the unwrapped row
remains one line with deliberate local scrolling.

Result:
Notes or issue:

## Step 3 — Semantics, output, ref, and customization

Setup: Continue through `07` and `08`.

Action: Inspect each semantic host and rendered HTML, activate **Inspect ref**,
switch light/dark, and compare the customization code with its preview.

Expected: Hosts match their labels; the list contains list items and navigation
is named. Output keeps authored order and shows no invented role. Ref reports
`SECTION`. Appearance does not alter layout. Customized gap, border, and
padding exactly match the shown code. A Button composed through
`Stack.Item asChild` retains the same height as the corresponding standalone
Button size recipe.

Result:
Notes or issue:

## Step 4 — Mobile, zoom, forced colors, and RTL

Setup: Review `09`; test 390 px, 200% text size, 400% zoom, forced colors, and
the available physical mobile device.

Action: Read localized actions and the RTL row top to bottom; tab through all
controls and rotate the device.

Expected: Long content wraps without page-level horizontal scrolling. Focus
remains visible. RTL places the first item at logical start on the right while
DOM, reading, and focus order remain first, second, third. Forced colors remain
legible.

Result:
Notes or issue:

## Step 5 — Screen reader

Setup: Enable the recorded screen reader on `/stack`.

Action: Navigate by headings, landmarks, lists, and controls.

Expected: Stack adds no spoken role. Authored section, navigation, and list
semantics are announced correctly. Reading and focus order match the DOM.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
