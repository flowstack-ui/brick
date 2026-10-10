# Data Grid changelog

Data Grid follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Use the shared semantic focus-width token for active-cell outlines.

- Aligned Table/Data Grid sizing, density, caption, selection and hover recipes;
  added responsive size/density/variant and neutral/accent selection tone.
- Added RowHeader, ColumnResizeHandle, interactive cells, logical sticky columns
  and minimum width through the public Atom dependency.
- Rebuilt feature-focused documentation and examples, including optional
  application-owned engine and virtualizer integrations.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

- Added Atom-backed `ColumnGroup` and `Column` parts with native `htmlWidth`
  sizing hints.
- Added transparent/base surfaces, semantic border tones, independent column
  borders, auto/fixed layout, vertical alignment, striping, and sticky headers.
- Preserved selection over hover and hover over stripe paint.

## 0.1.10

### Added

- Expanded public DataGrid Agent Knowledge with the TreeGrid selection
  boundary and full logical-coordinate, mounted-active-cell requirements for
  application-owned windowing.
- Added Atom-backed Data Grid anatomy, navigation and selection states,
  controlled sortable-header activation, visual recipes, logical alignment,
  explicit overflow containment, and decorative sort indicator.
