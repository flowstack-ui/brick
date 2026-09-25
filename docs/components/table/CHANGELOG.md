# Table changelog

Table follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Added responsive size/density/variant, meaningful row minimum geometry and
  portable sort artwork that preserves custom children.
- Added named sorting controls and optional TanStack Table integration examples.

- Prevent fractional-coordinate body-text leakage at the top of Container-owned
  sticky headers with a paint-only scroll-edge clip.

- Correct sticky header/column intersection stacking so scrolling cells cannot
  paint over pinned column headers.

- Add independent hover highlighting and logical sticky cells; refine size typography and inline inset.

- Add presentation-only selected state and semantic actionable hover for record
  composition with public useSelection and ActionDelegate; preserve native
  semantics, independent controls and existing static defaults.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

- Added Atom-backed `ColumnGroup` and `Column` parts with native `htmlWidth`
  sizing hints.
- Added transparent/base surfaces, semantic border tones, independent column
  borders, auto/fixed table layout, and top/middle/bottom cell alignment.
- Changed outline so it owns only the outer boundary; opt into vertical rules
  with `showColumnBorder`.
- Added `Root minInlineSize` for an explicit honest comparison width and
  `Row variant="section"` for row-group heading cadence without Block CSS.

## 0.1.10

### Fixed

- Kept visible captions outside outline clipping while preserving softened
  section paint through explicit cell-corner geometry.
- Documented stable Scroll Area border/radius ownership for Tables that move
  vertically inside a bounded viewport.
- Rounded outline footer paint into the table's logical bottom corners.

### Added

- Added public Table Agent Knowledge for native comparison relationships,
  explicit overflow ownership, responsive preservation, sorting boundaries,
  and the strict static Table versus Data Grid distinction.
- Linked Table Agent Knowledge to its exact Atom authority and strengthened
  selection parity with hierarchical TreeGrid guidance.
- Added the Atom-backed ten-part native Table family with line/outline, three
  sizes, two densities, stripe, sticky header, caption placement, logical and
  numeric alignment, explicit overflow containment, sort metadata and
  decorative indicator, public CSS hooks, and a strict Data Grid boundary.
