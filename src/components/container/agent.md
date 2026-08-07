# Container agent guide

## Purpose

Own consistent centered content width, logical page gutters, and size variants for sections and application shells.

## Use when

- Page or section content needs a shared maximum inline size and responsive logical gutters.

## Choose something else when

- The region needs a visual boundary or only a local one-axis relationship. Use Surface/Card or Stack.

## Required composition

- Place section content inside Container, then use Stack or Grid for internal relationships; let full-bleed backgrounds live outside it.

## Rules

- **MUST:** Use Container rather than repeating application max-width, auto-margin, and gutter CSS across sections.
- **MUST:** Do not use Container as a visual card or background owner.
- **MUST:** Load styles.css or core.css plus container.css.

## Common mistakes

- **Avoid:** Applying a separate max-width class to every page section or nesting Containers without a width reason. **Instead:** Use one deliberate Container boundary per aligned content region.

## Validation checklist

- Check gutters and max width at all adopted breakpoints, zoom levels, and RTL.
- Confirm full-bleed and contained regions align intentionally and CSS is loaded.

## Related guidance

- `stack`
- `grid`
- `surface`
- `card`
