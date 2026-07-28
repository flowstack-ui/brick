# Data Grid manual protocol

Status: unrun

- [ ] With a keyboard only, enter the grid once and confirm arrow, Home/End,
  PageUp/PageDown, and Ctrl/Meta+Home/End move the active descendant correctly.
- [ ] Confirm disabled rows/cells are skipped and focus remains on Root.
- [ ] Confirm Space changes selectable-row state and Enter activates only an
  actionable sortable column header.
- [ ] Confirm a screen reader announces the grid name, counts, coordinates,
  selection, disabled state, active cell, and current sort direction.
- [ ] At 200% and 400% zoom, confirm explicit Container contains horizontal
  overflow without clipping cells or widening the page.
- [ ] Confirm line/outline, all sizes/densities, selected/active/disabled/hover,
  light/dark themes, RTL, reduced motion, and forced colors remain legible and
  do not change state geometry.
- [ ] Confirm the external-control boundary: no editing, filtering, pagination,
  resizing, virtualization, hierarchy, or layout-grid behavior appears.
