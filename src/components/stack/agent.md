# Stack agent guide

## Purpose

Arrange children in one tokenized row or column with logical spacing, alignment, wrapping, and responsive-friendly public props.

## Use when

- Content needs one-dimensional vertical or horizontal layout.

## Choose something else when

- Both rows and columns need explicit track control. Use Grid.

## Required composition

- Choose VStack for vertical flow or HStack for horizontal flow; set gap and alignment from the content relationship.

## Rules

- **MUST:** Use Stack for one primary layout axis and allow wrapping only when the resulting order remains clear.
- **MUST:** Load styles.css or core.css plus stack.css.

## Common mistakes

- **Avoid:** Adding repeated custom flex utilities for ordinary rows and columns. **Instead:** Use Stack so spacing and logical-direction behavior stay on the Brick contract.

## Validation checklist

- Check source and visual order at narrow widths and zoom.
- Check gap, wrapping, alignment, and RTL behavior.

## Related guidance

- `grid`
- `surface`
- `card`
