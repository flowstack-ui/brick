# Checkmark agent guide

## Purpose

Show passive checked, unchecked, or indeterminate visual state without creating selection behavior.

## Use when

- A card, plan, summary, or existing interaction owner needs a theme-aware visual check mark.

## Choose something else when

- The mark itself must be focusable, toggleable, or submit a form value. Use Checkbox or Checkbox Group.

## Required composition

- Pair Checkmark with visible text or place it inside a parent that already exposes the state accessibly.

## Rules

- **MUST:** Keep Checkmark passive and aria-hidden; the parent control or text owns semantics.
- **MUST:** Use checked or indeterminate only to mirror state owned elsewhere.
- **MUST:** Load styles.css or core.css plus checkmark.css.

## Common mistakes

- **Avoid:** Attaching click behavior to Checkmark. **Instead:** Use Checkbox or an existing parent control and render Checkmark only as its visual.

## Validation checklist

- Verify square geometry, all states, sizes, tones, variants, dark mode, forced colors, and absence of focus or role.

## Related guidance

- `checkbox`
- `checkbox-group`
- `icon`
