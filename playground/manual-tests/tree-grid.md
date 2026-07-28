# Tree Grid manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Tree Grid |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/tree-grid` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Variants`,
`04 Sizes and density`, `05 Hierarchy and selection`, `06 Sorting and
controlled behavior`, `07 Caption, alignment, numeric, header, and footer`,
`08 Appearance and customization`, `09 Responsive, localization, RTL, and
preferences`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Keyboard hierarchy and focus

Enter each tree grid once with Tab. Confirm arrow keys, Home/End, and
Ctrl/Meta+Home/End move the active descendant while focus remains on Root.
In column 1, confirm direction-aware expand, collapse, parent, and child
movement. Collapse a branch containing the active descendant and confirm focus
moves to that ancestor's column-1 cell. Confirm disabled and hidden rows are
never active.

Result:
Notes or issue:

## Step 2 — Selection and controlled actions

Confirm pointer and Space selection, single/multiple behavior, disabled and
read-only boundaries, and a visible distinction between selected rows and the
active cell. Confirm pointer and Enter invoke only an actionable sortable
header once, and controlled sorting, expansion, and selection logs stay current.

Result:
Notes or issue:

## Step 3 — Semantics and assistive technology

Confirm a screen reader announces the treegrid name, row and column counts,
one-based coordinates, RowHeader names, hierarchy levels, expanded/collapsed,
selected, disabled, active, and sorted state. Confirm Indicator and
SortIndicator are silent and hidden descendants are not announced.

Result:
Notes or issue:

## Step 4 — Visual finish, appearance, and preferences

Inspect line/outline, all sizes and densities, top/bottom captions, deep
indentation, total footer, selection, focus, disabled state, light/dark badges,
the titled accent customization, reduced motion, and forced colors. Confirm
header, footer, hover, and selected fills remain clipped inside every rounded
outline edge without sharp-corner overflow.

Result:
Notes or issue:

## Step 5 — Reflow, localization, RTL, and touch

At 320 CSS px and 200/400% zoom, confirm Container owns horizontal scrolling
without widening the page. Confirm localized RTL text, indentation, closed and
expanded chevrons, alignment, horizontal keys, and scrolling mirror correctly.
Operate expansion, selection, and horizontal scrolling on a physical touch
device and confirm md/lg rows remain usable.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
