# Surface agent guide

## Purpose

Apply semantic background layers, boundaries, elevation, radius, and inset without implying a specific content object.

## Use when

- A region needs a semantic visual plane but Card, Dialog, or another purposeful component would add the wrong anatomy.

## Choose something else when

- The region represents one bounded subject with card anatomy. Use Card.

## Required composition

- Choose Surface level and boundary by hierarchy, then compose public layout and content components inside.

## Rules

- **SHOULD:** Choose surface level by information hierarchy, not decoration alone.
- **MUST:** Load styles.css or core.css plus surface.css.

## Common mistakes

- **Avoid:** Using arbitrary background colors to recreate a surface. **Instead:** Use Surface and theme its semantic tokens.

## Validation checklist

- Check foreground contrast against the selected surface in every appearance.
- Confirm nested surfaces communicate hierarchy without excessive borders or elevation.

## Related guidance

- `card`
- `stack`
- `grid`
