# Form agent guide

## Purpose

Provide a finished native submission boundary and consistent form rhythm while Atom owns submission and validation behavior.

## Use when

- Related controls submit user input as one operation.

## Choose something else when

- Controls are unrelated immediate settings or actions. Use Individual Field and Button compositions.

## Required composition

- Compose Form -> Fieldset for related groups -> Field for each control -> a named submit Button.

## Rules

- **MUST:** Keep native submission available and give submitted controls names.
- **MUST:** Load styles.css or core.css plus form.css and every rendered child component stylesheet.

## Common mistakes

- **Avoid:** Treating Form as a complete login or contact workflow. **Instead:** Keep business workflow in the application or a future Block; Form owns the generic visual boundary.

## Validation checklist

- Submit with keyboard and pointer.
- Inspect submitted values, invalid relationships, spacing, and narrow-layout behavior.

## Related guidance

- `@flowstack-ui/atom/agents/form`
- `field`
- `fieldset`
- `button`
