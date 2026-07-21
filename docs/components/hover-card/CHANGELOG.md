# HoverCard changelog

## Unreleased

- Upgraded to Atom 0.6.9 so portalled content preserves the trigger's logical
  text direction.
- Added the strict frozen five-part HoverCard namespace.
- Added one neutral elevated recipe with bounded `sm`, `md`, and `lg` widths.
- Added the explicit optional shared Arrow and direct Atom 0.3.5 behavior.
- Kept preview content generic, non-interactive, and excluded from accessible-
  label and popup-state contracts.
- Separated the visible outer surface from its internal scrolling viewport so
  Arrow remains visible while constrained content can still scroll.
- Aligned Arrow seams with each resolved side and adopted Atom 0.6.3 placement
  priority across same-side, opposite-side, and perpendicular fallbacks.
- Adopted Atom 0.6.6 touch-safe activation, compatibility-event prevention,
  and safe pointer-corridor behavior; removed exit-motion hit testing from the
  styled Content surface.
