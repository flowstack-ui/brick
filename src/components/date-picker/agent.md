# DatePicker agent guide

## Purpose

Segmented entry and calendar selection with one coordinated popup.

## Use when

- Segmented entry and calendar selection with one coordinated popup.

## Choose something else when

- Scheduling, recurrence or remote business availability is required. Use Application composition.

## Required composition

- A Trigger composed through asChild or render keeps the child's Button geometry; the default trigger uses compact action geometry. Calendar accepts its own seven-step size independently of input size. Keep portalled content above a parent modal and verify actual pointer selection, not only DOM presence.
- Use DatePicker.Root with a stable referenceDate and an accessible name. Root and Control are divs, Label a label. Input renders Atom DateInput groups and form mirrors. Trigger is Atom Popover.Trigger, supporting its asChild/render composition. Content is Atom Popover.Content with its viewport. Calendar is the same inline Atom Calendar, never a second popup engine. ClearTrigger is a button; ValueText a span; HiddenInput mirrors multiple values only. Portal/Context add no visual wrapper.
- Use date-value helpers without converting date-only values to UTC midnight.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep date behavior in Atom and presentation in Brick. Do not duplicate popup engines or replace semantic segments with text inputs.
- **MUST:** Load styles.css or core.css plus styles/date-picker.css. Use documented visual props and locale overrides.

## Common mistakes

- **Avoid:** Inventing current dates during hydration or submitting localized strings. **Instead:** Supply stable referenceDate and typed values; preserve canonical form mirrors.

## Validation checklist

- Verify keyboard, locale/RTL, constraints, reset, narrow width, appearance and forced colors.

## Related guidance

- `locale-provider`
- `field`
- `popover`
