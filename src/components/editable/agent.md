# Editable agent guide

## Purpose

Present inline text editing with Atom-owned draft, commit, cancel and focus behavior.

## Use when

- An existing text value should become an input or textarea on demand.

## Choose something else when

- The field should always be editable. Use Input or Textarea.

## Required composition

- Use Root or RootProvider, Area, Preview and exactly one Input or Textarea. Provide Label or an accessible name, with optional Control and triggers.

## Rules

- **MUST:** Separate draft changes from commit requests; saving, errors and retries belong to the application.
- **MUST:** Update controlled value and edit in their callbacks. Create an external controller inside the Field scope when it must inherit Field state.
- **MUST:** Load styles.css or core.css plus editable.css and the styles of composed components.

## Common mistakes

- **Avoid:** Rendering both Input and Textarea or saving every draft as a completed edit. **Instead:** Use one named native editor and save on the explicit commit boundary.

## Validation checklist

- Verify empty and defaultEdit rollback, controlled refusal, keyboard, outside events and IME.
- Verify Field/form reset, textarea autoresize, nested Dialog focus, preview/editor geometry, RTL, appearances and forced colors.

## Related guidance

- `@flowstack-ui/atom/agents/editable`
- `field`
- `form`
- `input`
- `textarea`
- `button`
- `dialog`
