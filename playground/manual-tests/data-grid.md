# Data Grid manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Data Grid |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/data-grid` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Structure and paint`,
`04 Sizes and density`, `05 Navigation and disabled state`, `06 Row selection`,
`07 Sorting activation`, `08 Appearance and customization`, `09 Responsive,
RTL, and boundary`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Keyboard navigation and focus

Enter each grid once with Tab. Confirm arrow keys, Home/End, PageUp/PageDown,
and Ctrl/Meta+Home/End update the active descendant while DOM focus remains on
Root. Confirm disabled rows and cells are skipped and direction-aware movement
is correct in RTL.

Result:
Notes or issue:

## Step 2 — Selection and sorting

Confirm pointer row selection, Space selection, single/multiple controlled
state, disabled/read-only boundaries, and stable focus. Confirm pointer and
Enter activate only the actionable sortable header once, update the
application-controlled direction and data, and do not change Space behavior.

Result:
Notes or issue:

## Step 3 — Semantics and assistive technology

Confirm a screen reader announces the grid name, row and column counts,
one-based coordinates, headers, selected and disabled rows, active cell, and
current sort direction. Confirm the decorative SortIndicator is silent and the
complete anatomy remains valid native table markup with grid roles.

Result:
Notes or issue:

## Step 4 — Appearance, reflow, and boundaries

Inspect line/outline, transparent/base surface, border tones, optional column
dividers, striping, sticky headers, all sizes and densities, captions, footer,
selected, active, disabled, actionable, hover, light/dark, customized radius, RTL,
reduced motion, and forced colors. At 320 CSS px and 200/400% zoom, confirm
Container holds horizontal overflow without clipping or widening the page.
Operate selection and scrolling on a physical touch device. Confirm no editing,
filtering, pagination, resizing, virtualization, hierarchy, or layout-grid
behavior appears inside Data Grid.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
