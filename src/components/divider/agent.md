# Divider agent guide

## Purpose

Render a finished decorative or semantic content boundary with horizontal or vertical visual recipes.

## Use when

- Adjacent content groups need a visible boundary and Atom Divider semantics.

## Choose something else when

- Spacing alone expresses the relationship or the boundary is interactive. Use Stack gap or a dedicated splitter.

## Required composition

- Use Divider.Root inside the owning Stack, Toolbar, menu, or surface and choose decorative=false only when the separation has meaning.

## Rules

- **MUST:** Choose semantic versus decorative behavior independently from color, thickness, and orientation.
- **MUST:** Load styles.css or core.css plus divider.css.

## Common mistakes

- **Avoid:** Using a bordered div or text glyph for every separator. **Instead:** Use Divider when there is a boundary and Stack gap when there is only spacing.

## Validation checklist

- Check orientation, contrast, forced colors, zoom, and semantics.
- Confirm it is not focusable and CSS is loaded.

## Related guidance

- `stack`
- `toolbar`
- `surface`
