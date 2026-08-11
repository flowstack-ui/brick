# ZStack agent guide

## Purpose

Overlap authored children in one depth-aware layout while preserving source, reading, and focus order.

## Use when

- Two or more visual layers intentionally share the same region.

## Choose something else when

- Content follows one row or column. Use Stack.
- Content is an ordinary image-backed card or hero. Use Surface.Media, Surface.Scrim, and Surface.Content.

## Required composition

- Place natural-size layers directly in ZStack.Root and use ZStack.Item only when one layer needs its own nine-position alignment.

## Rules

- **MUST:** Keep DOM order meaningful because later children paint above earlier children.
- **MUST:** Keep decorative layers from intercepting input intended for interactive content.
- **MUST:** Use responsive logical alignment only to move the same authored layer; never change source order, depth order, or focus order at a breakpoint.
- **MUST:** Load styles.css or core.css plus z-stack.css.

## Common mistakes

- **Avoid:** Replacing ordinary linear layout with overlap. **Instead:** Use Stack or Grid unless layers intentionally share space.
- **Avoid:** Rebuilding Surface media anatomy. **Instead:** Prefer Surface for standard media-backed content.

## Validation checklist

- Check natural sizing, responsive logical placement, focus order, zoom, RTL, and pointer access.

## Related guidance

- `stack`
- `grid`
- `surface`
- `image`
