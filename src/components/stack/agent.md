# Stack agent guide

## Purpose

Arrange children on one primary axis with responsive direction, tokenized spacing, alignment, wrapping, and explicit child sizing.

## Use when

- Content needs one-dimensional vertical or horizontal layout.

## Choose something else when

- Both rows and columns need explicit track control. Use Grid.
- Content overlaps in depth. Use ZStack or Surface media anatomy.

## Required composition

- Choose VStack when the axis is always vertical, HStack when it is always horizontal, and Stack when the same content changes axis at a breakpoint.
- Use Stack.Item when one direct child must remain content-sized, fixed, or consume a proportional share.
- When the parent changes axis, review each Item flex recipe too; a proportional desktop column usually becomes content-sized in a mobile column.
- Keep the Item wrapper when equal outer tracks contain children with different padding or borders; use asChild only when the child's own box should participate in flex allocation.

## Rules

- **MUST:** Use Stack for one primary layout axis and allow wrapping only when the resulting order remains clear.
- **MUST:** Use responsive Stack values for arrangement changes; use Show/Hide only when the actual interface changes.
- **MUST:** Preserve reading and focus order; do not simulate reverse direction or visual ordering.
- **MUST:** Load styles.css or core.css plus stack.css.

## Common mistakes

- **Avoid:** Duplicating the same content through Show/Hide only to switch row and column. **Instead:** Use responsive Stack direction.
- **Avoid:** Writing grow/shrink CSS for ordinary columns. **Instead:** Use Stack.Item flex recipes.

## Validation checklist

- Check source and visual order at narrow widths and zoom.
- Check every authored breakpoint, logical edge spacing, wrapping, alignment, and RTL behavior.

## Related guidance

- `grid`
- `z-stack`
- `show`
- `hide`
- `surface`
- `card`
