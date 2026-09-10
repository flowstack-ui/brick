# TagsInput agent guide

## Purpose

Present a finished multi-value text field with Atom-owned collection transactions and optional suggestions.

## Use when

- Users create multiple short string values, optionally using suggestions.

## Choose something else when

- Values are display-only. Use Chip.
- Only predefined choices are accepted. Use MultiSelect.

## Required composition

- Use Root, Label or Field, Control, Items, Input and one HiddenInput. Use explicit indexed Item parts for custom token anatomy.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep collection and input draft controlled independently. Use Atom's controller and useTagsInputCombobox bindings instead of implementing keyboard or paste behavior in application CSS/handlers.
- **MUST:** Use one JSON HiddenInput for submission; never name the visible draft. Parse the JSON array on the server.
- **MUST:** Load styles.css or core.css plus tags-input.css and every composed component's CSS. Item tones are semantic, not status announcements.

## Common mistakes

- **Avoid:** Using standalone Chip removal handlers as a complete tags field. **Instead:** Use TagsInput for navigation, drafts, validation, announcements and focus recovery.

## Validation checklist

- Verify all seven sizes, wrapped item targets, outline/soft/underline, focus, disabled/read-only/invalid, RTL and appearances.
- Verify atomic paste, edits, duplicates, limits, forms/reset, IME and nested portalled suggestions.

## Related guidance

- `@flowstack-ui/atom/agents/tags-input`
- `chip`
- `combobox`
- `field`
- `form`
- `for`
