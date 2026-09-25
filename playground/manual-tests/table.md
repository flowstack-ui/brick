# Table manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Table |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/table` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Structure and
paint`, `04 Sizes and density`, `05 Alignment and numeric data`, `06 Sorting
composition`, `07 Caption, footer, and sticky header`, `08 Appearance and
customization`, `09 Responsive, RTL, and boundary`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

For the default docs route, scroll `#sticky` vertically on a HiDPI display and
at non-default browser zoom. Check the very top painted edge for leaked body
text, not just header overlap. Also verify keyboard focus remains visible on
a focusable Container. These are manual checks, not implied by automation.

## Step 1 — Native structure and recipes

Review scenarios 01–05. Confirm captions, sections, row/column headers,
footer, spans, line/outline, transparent/base surface, stripe, border tone,
optional column dividers, size/density, and logical/vertical/numeric alignment
match their labels without accidental hover or focus behavior. Confirm outline
header and footer paint follows all four softened corners without clipping a
top or bottom Caption.

Result:
Notes or issue:

## Step 2 — Sorting and focus

In 06, tab to the sort Button and activate with keyboard, pointer, and touch.
Confirm row order and `aria-sort` alternate, focus remains stable, the
indicator is silent, and no header/cell becomes an extra tab stop.

Result:
Notes or issue:

## Step 3 — Sticky, appearance, and customization

Review 07–08 in light, dark, and forced colors. Scroll the bounded specimen.
Confirm header cells remain opaque and aligned, captions/footer remain clear,
boundaries persist, and the shown variables match the customized preview. In a
bounded vertical-scroll composition, confirm the Scroll Area viewport keeps
all four corners stable while the line-variant Table moves inside it.

Result:
Notes or issue:

## Step 4 — Mobile, zoom, overflow, and RTL

Review 09 at 320 CSS px, 200/400% zoom, portrait/landscape physical device,
RTL, and forced colors. Confirm only Container scrolls horizontally, the page
does not, every column/action remains reachable, and logical alignment mirrors.

Result:
Notes or issue:

## Step 5 — Screen reader

Navigate 01, 02, 06, and 09 using table commands. Confirm caption, row/column
counts, scoped headers, values, footer, sort state, and independent controls
are announced once and in context.

Result:
Notes or issue:

## Completion

## Responsive and engine additions (manual run pending)

On the public documentation route, compare size/density at both sides of each
breakpoint and reverse the viewport change. Exercise the optional engine's
filter and page controls, then verify a stable accessible name, native table
semantics, sort announcement and focus. These examples do not add grid-style
arrow navigation. Check custom sort artwork, nested tables and sticky
intersections with selected/striped rows in both directions.

Overall result:
Follow-up issues:
Workbook updated:

## Record selection addition (manual run pending)

Automated integration: record-selection.spec.ts. On the record scenario,
select a named checkbox, activate the primary control and then a secondary
action. Only the intended action changes state. The host adds no tab stop,
button role or aria-selected. Check light/dark, RTL, high zoom, physical touch
and screen-reader output. Selection paint must not change dimensions or be
the only selection indicator. Manual screen-reader and physical-device checks
remain unperformed; do not mark them passed from automation.
