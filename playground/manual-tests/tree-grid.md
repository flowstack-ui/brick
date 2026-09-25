# Tree Grid manual-test protocol

September 24 correction follow-up (human qualification pending): hold the first
pointer press on a noninitial cell and confirm no top-left focus flash. Repeat
for headers, controlled active cells, disabled cells and embedded native controls.

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

Scenario order: `01 tree-grid.overview` → `02 tree-grid.anatomy` → `03 tree-grid.variants` → `04 tree-grid.sizing` → `05 tree-grid.hierarchy` → `06 tree-grid.controlled` → `07 tree-grid.content` → `08 tree-grid.appearance` → `09 tree-grid.stress`.

Use `?qualification=1` for this preserved scenario sequence; review the ordinary documentation examples separately.

Use the ordinary documentation examples on `/tree-grid`. Legacy visual fixtures
remain at `/tree-grid?qualification=1` for repeatable geometry comparisons.

## September 2026 additions — not yet human approved

- Enter editable/checkbox cells with F2 and return with Escape; confirm header Enter sorts while F2 enters its resize handle.
- Resize by pointer, keyboard and RTL keys; review sticky boundaries inside the same scroll container.
- Check disclosure without row selection, visible range/select-all scope, and disabled/read-only behavior.
- Exercise loading, error/retry, page changes and the empty result with assistive technology.
- Scroll the fixed-row window and request row 101 or Control/Command+End. Confirm full row counts and mounted active/ancestor cells. Remote and variable-height virtual grids need their own qualification.
- Review all sizes/densities, logical RTL, forced colors and 200–400% zoom on physical devices.

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

Inspect line/outline, transparent/base surface, border tones, optional column
dividers, striping, sticky headers, all sizes and densities, top/bottom captions,
deep indentation, total footer, selection, focus, disabled state, light/dark badges,
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
