# Grid agent guide

## Purpose

Arrange content on tokenized two-dimensional tracks with public column, row, gap, and item-placement controls.

## Use when

- Content needs coordinated rows and columns or responsive card tracks.

## Choose something else when

- The layout has one primary row or column. Use Stack.

## Required composition

- Choose Grid tracks from the minimum readable child size; use Grid.Item placement only when source order remains meaningful.

## Rules

- **MUST:** Keep DOM order meaningful; visual placement must not create a confusing keyboard or reading sequence.
- **MUST:** Use responsive columns, gaps, unanchored spans, and alignment when the same authored Grid changes at Brick breakpoints; keep explicit line starts and ends static.
- **MUST:** Use Grid.Item asChild when an existing link, Surface, or component should itself receive placement; provide exactly one element and preserve its native semantics.
- **MUST:** Load styles.css or core.css plus grid.css.

## Common mistakes

- **Avoid:** Keeping too many columns until cards become unreadably narrow. **Instead:** Reduce columns at the content's real minimum width, not at a device-name breakpoint.
- **Avoid:** Combining a responsive Item span with explicit line placement. **Instead:** Let the responsive item auto-place, or keep one deliberate static line placement.
- **Avoid:** Adding a Grid.Item wrapper and height CSS around an element that should itself stretch as the grid item. **Instead:** Compose that one element with Grid.Item asChild.

## Validation checklist

- Test intrinsic sizing, overflow, zoom, narrow widths, source order, and RTL.
- Confirm each child remains readable before and after track changes.

## Related guidance

- `stack`
- `card`
- `surface`
