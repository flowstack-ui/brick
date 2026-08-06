# IconButton agent guide

## Purpose

Provide a compact finished action control for a single recognizable icon with an explicit accessible name.

## Use when

- A familiar icon represents one action and visible button text would be redundant in the available space.

## Choose something else when

- The control navigates, needs visible explanatory text, or is an arbitrary clickable surface. Use Link, Button, or another owning component.

## Required composition

- Place one decorative Icon or SVG inside IconButton and provide an accessible label through the component's naming API.

## Rules

- **MUST:** Give every IconButton a concise discernible accessible name; the icon alone is not a name.
- **MUST:** Use IconButton for actions, not ordinary navigation.
- **MUST:** Load styles.css or core.css plus icon-button.css and icon.css when using Brick Icon.

## Common mistakes

- **Avoid:** Using a random glyph, code icon for GitHub, or unlabeled SVG inside a generic button. **Instead:** Use the correct icon asset in a named IconButton.

## Validation checklist

- Check accessible name, icon alignment, touch target, focus ring, disabled/loading states, contrast, and forced colors.
- Confirm component CSS is loaded.

## Related guidance

- `button`
- `icon`
- `toolbar`
- `tooltip`
