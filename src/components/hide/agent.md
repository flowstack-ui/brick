# Hide agent guide

## Purpose

Hide content through Brick's CSS breakpoint contract without JavaScript viewport state or hydration flicker.

## Use when

- One composition should be absent at selected Brick breakpoints while remaining present elsewhere.

## Choose something else when

- Content should be visually hidden but remain available to assistive technology, or should not render for business reasons. Use VisuallyHidden or application conditional rendering.

## Required composition

- Wrap the smallest complete region whose presence changes; pair with Show only when desktop and mobile genuinely need distinct compositions.

## Rules

- **MUST:** Use Hide instead of JavaScript matchMedia for first-paint responsive visibility.
- **MUST:** Do not hide the only accessible name, error, instruction, or required content at a breakpoint.
- **MUST:** Load styles.css or core.css plus hide.css.

## Common mistakes

- **Avoid:** Using Hide without its modular CSS or duplicating two interactive trees with conflicting IDs. **Instead:** Load hide.css and verify alternate compositions have independent valid relationships.

## Validation checklist

- Test boundary pixels, zoom, first paint, hydration, focus order, and duplicate IDs across all visibility states.
- Confirm CSS is loaded.

## Related guidance

- `show`
- `visually-hidden`
- `app-bar`
- `drawer`
