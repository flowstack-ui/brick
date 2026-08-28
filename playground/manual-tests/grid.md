# Grid manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Grid |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/grid` |

Scenario order: `01 Overview`, `02 Layout modes`, `03 Columns`,
`04 Intrinsic sizes`, `05 Gaps`, `06 Alignment`, `07 Item placement`,
`08 Semantics and composition`, `09 Appearance and customization`,
`10 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Defaults, modes, columns, and intrinsic sizes

Setup: Open `/grid`; review `01` through `04` top to bottom while resizing the
window narrower and wider.

Action: Compare the default, explicit/intrinsic modes, columns one through six,
and intrinsic size tokens.

Expected: Default is one column. Explicit examples keep the labeled equal
column count. Intrinsic examples add or remove equal columns from available
width without clipping, overflow, reordered content, or visible item wrappers.

Result:
Notes or issue:

## Step 2 — Gaps and alignment

Setup: Continue through `05` and `06`.

Action: Compare uniform gaps, axis overrides, numeric factor 8, explicit row
and column values, the responsive 2-to-8 example, item alignment, and
justification from left to right and top to bottom.

Expected: Only the named dimension changes. Gaps increase consistently without
outer spacing. Factor 8 is 2rem; explicit row and column values remain exact;
the responsive example changes at 48rem without stale geometry. Row and column
overrides affect only their axis. Identical items occupy the labeled alignment
without accidental size or paint changes.

Result:
Notes or issue:

## Step 3 — Item placement and source order

Setup: Continue through `07`.

Action: Identify ordinary items, span two, lines 2–5, full width, and the
self-aligned item. Tab through any focusable descendants if present.

Expected: Every item occupies its labeled tracks and stays contained. Ordinary
items naturally fill remaining tracks. Visual placement never changes DOM,
reading, or focus order.

Result:
Notes or issue:

## Step 4 — Semantics, output, ref, and customization

Setup: Continue through `08` and `09`.

Action: Inspect the captured HTML, activate **Inspect ref**, switch light/dark,
and compare customization code with the live result.

Expected: Output contains the authored section/articles and Root/Item hooks,
with no invented `role="grid"`. The composed destination is the direct Grid
child, receives Item placement, and has no extra Item wrapper. Ref reports
`SECTION`. Appearance does not change geometry. Customized row gap, column
gap, border, and padding match the shown code exactly.

Result:
Notes or issue:

## Step 5 — Mobile, zoom, forced colors, and RTL

Setup: Review `10`; test 390 px, 200% text size, 400% zoom, forced colors, and
the available physical mobile device.

Action: Resize and rotate, read the localized content, and tab through the RTL
actions.

Expected: Intrinsic tracks reflow without page-level horizontal scrolling.
Long content stays contained and focus remains visible. RTL places the first
action at logical start on the right while reading and focus order remain
first, second, third. Forced colors remain legible.

Result:
Notes or issue:

## Step 6 — Screen reader

Setup: Enable the recorded screen reader on `/grid`.

Action: Navigate by headings, landmarks, articles, lists, and controls.

Expected: Grid adds no spoken grid role. Authored semantics are announced
correctly, and reading/focus order matches the DOM despite visual spans.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
