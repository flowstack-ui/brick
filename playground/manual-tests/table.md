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

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Variants and
stripe`, `04 Sizes and density`, `05 Alignment and numeric data`, `06 Sorting
composition`, `07 Caption, footer, and sticky header`, `08 Appearance and
customization`, `09 Responsive, RTL, and boundary`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Native structure and recipes

Review scenarios 01–05. Confirm captions, sections, row/column headers,
footer, spans, line/outline/stripe, size/density, and logical/numeric alignment
match their labels without accidental hover or focus behavior.

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
boundaries persist, and the shown variables match the customized preview.

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

Overall result:
Follow-up issues:
Workbook updated:
