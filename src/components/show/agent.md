# Show agent guide

## Purpose

Show content only at selected Brick breakpoints through CSS, avoiding JavaScript viewport state and hydration flicker.

## Use when

- A complete region should appear only at selected Brick breakpoints.

## Choose something else when

- Content must remain available to assistive technology while visually hidden, or rendering depends on authorization or data. Use VisuallyHidden or application conditional rendering.

## Required composition

- Wrap the smallest complete composition whose responsive presence changes; combine with Hide only for intentional alternate desktop/mobile structures.

## Rules

- **MUST:** Use Show's CSS breakpoint contract rather than client viewport detection for responsive first paint.
- **MUST:** Keep IDs, landmarks, form relationships, and focus order valid in every visible alternative.
- **MUST:** Load styles.css or core.css plus show.css.

## Common mistakes

- **Avoid:** Forgetting show.css or rendering duplicate visible navigation because Show and Hide use the wrong thresholds. **Instead:** Load the modular CSS and verify exact breakpoint boundaries.

## Validation checklist

- Test boundary pixels, zoom, first paint, hydration, focus order, landmarks, and duplicate IDs.
- Confirm CSS is loaded.

## Related guidance

- `hide`
- `visually-hidden`
- `app-bar`
- `drawer`
