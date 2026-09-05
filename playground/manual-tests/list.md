# List manual-test protocol

| Run information | Value |
| --- | --- |
| Component | List |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/list` |

Scenario order: `01 Overview`, `02 Semantics`, `03 Variants`, `04 Sizes,
density, and inset`, `05 Markers and nesting`, `06 Structured anatomy`, `07 Native output
and state`, `08 Appearance and customization`, `09 Responsive and stress`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Defaults and recipes

Setup: Open `/list`; review `01`–`05` from top to bottom.

Action: Compare unordered/ordered output, boundaries, sizes, densities, both
inset recipes, all marker labels, and the nested sequence.

Expected: Overview uses native disc markers and defaults. Each comparison
changes only its labelled property. The `none` inset removes ordinary inline
row padding while preserving the leading-to-content gap. Ordered markers count
correctly, all rows align, nested content indents once, and no marker or border
is clipped.

Result:
Notes or issue:

## Step 2 — Anatomy, output, and authored controls

Setup: Continue through `06` and `07`.

Action: Compare complete and content-only rows, inspect both rendered HTML
panels, then tab through the page and activate **Review**.

Expected: Leading, content, and trailing columns align without overlap. The
center-aligned structured example centers its compact visuals with its content,
while the default structured row remains start aligned. Output
shows native `ul`/`ol` and `li`, including `start`, `reversed`, `value`, and the
composed elements. Disabled is passive metadata; only authored controls enter
the tab order and activate normally.

Result:
Notes or issue:

## Step 3 — Appearance and customization

Setup: Review `08`; switch the page between light and dark.

Action: Compare both appearance scopes and the customization code to its
preview.

Expected: Text, markers, borders, and focus remain readable in both
appearances. The customized list changes exactly its accent border and marker,
radius, and row padding.

Result:
Notes or issue:

## Step 4 — Mobile, zoom, RTL, and forced colors

Setup: Review `09` at 320 CSS px, portrait and landscape on an available
physical device, 200% text, 400% zoom, RTL, and forced colors.

Action: Read every stress tile and tab to **Review**.

Expected: Long text wraps, rows stack without horizontal page scrolling, the
action stays contained, RTL reverses leading/trailing placement, and system
colors preserve markers, boundaries, text, and focus.

Result:
Notes or issue:

## Step 5 — Screen reader

Setup: Enable the recorded screen reader and review `01`, `02`, `05`, `06`,
and the marker-free tile in `09`.

Action: Navigate by list and list item, including the nested and marker-free
examples.

Expected: Native lists announce the correct item count and order. The nested
list is a separate level, marker-free content remains a list, decorative icons
are silent, and authored titles, descriptions, badges, and controls read once
in visual order.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
