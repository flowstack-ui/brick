# Surface agent guide

## Purpose

Apply semantic background layers, boundaries, elevation, radius, inset, and optional decorative media layering without implying a specific content object.

## Use when

- A region needs a semantic visual plane but Card, Dialog, or another purposeful component would add the wrong anatomy.
- Decorative image, video, canvas, or authored artwork needs to sit behind foreground content with an optional contrast scrim.

## Choose something else when

- The region represents one bounded subject with card anatomy. Use Card.

## Required composition

- Choose Surface level and boundary by hierarchy, then compose public layout and content components inside. For background media, author Media, optional Scrim, and Content in that order.

## Rules

- **SHOULD:** Choose surface level by information hierarchy, not decoration alone.
- **MUST:** Load styles.css or core.css plus surface.css.
- **MUST:** Treat Surface.Media as decorative and noninteractive; keep meaningful media and controls in Content or ordinary document flow.
- **MUST:** Give Brick Image explicit fill inside Surface.Media so its actual Content and Fallback consume the complete media layer.
- **MUST:** Put every foreground child inside Surface.Content when Media or Scrim is used.
- **SHOULD:** Choose Scrim strength through the public prop and let the theme provide only the semantic scrim color unless one deliberate instance requires an advanced recipe override.
- **MUST:** Verify foreground contrast against every media state; Scrim does not prove contrast by itself.

## Common mistakes

- **Avoid:** Using arbitrary background colors to recreate a surface. **Instead:** Use Surface and theme its semantic tokens.
- **Avoid:** Adding absolute-positioning and z-index CSS for ordinary background media. **Instead:** Use Surface.Media, Surface.Scrim, and Surface.Content.

## Validation checklist

- Check foreground contrast against the selected surface in every appearance.
- Confirm nested surfaces communicate hierarchy without excessive borders or elevation.
- Confirm Media and Scrim fill the root, remain hidden from assistive technology and pointer input, and Content stays above both.

## Related guidance

- `card`
- `stack`
- `grid`
