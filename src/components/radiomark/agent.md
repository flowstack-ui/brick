# Radiomark agent guide

## Purpose

Show passive selected or unselected circular state without creating radio behavior.

## Use when

- A choice card or read-only summary already owns selection behavior and needs a theme-aware radio visual.

## Choose something else when

- The visual must provide radio focus, keyboard behavior, or form participation. Use Radio Group or Radio Card.

## Required composition

- Place Radiomark inside an existing choice owner and let that owner expose selected state and its accessible name.

## Rules

- **MUST:** Keep Radiomark passive and aria-hidden; the parent control owns semantics.
- **MUST:** Use checked only to mirror state owned elsewhere.
- **MUST:** Load styles.css or core.css plus radiomark.css.

## Common mistakes

- **Avoid:** Building a radio control from a clickable Radiomark. **Instead:** Use Radio Group or Radio Card and reserve Radiomark for passive presentation.

## Validation checklist

- Verify circular geometry, checked and unchecked states, sizes, tones, variants, dark mode, forced colors, and absence of focus or role.

## Related guidance

- `radio-group`
- `radio-card`
- `icon`
