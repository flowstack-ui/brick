# DateInput agent guide

## Purpose

Locale-ordered segmented date and date-time entry.

## Use when

- Locale-ordered segmented date and date-time entry.

## Choose something else when

- Scheduling, recurrence or remote business availability is required. Use Application composition.

## Required composition

- Use the shared seven-step control size for coordinated height, padding and text. Fine-pointer text follows its size recipe; coarse-pointer environments retain a 16px editing floor. Segment corners derive from half the control radius. Granularity supports day, hour, minute and second with compatible date values; a standalone time-only control is outside this contract.
- Use DateInput.Root with a stable referenceDate and an accessible name. Root and Control are divs. SegmentGroup is a named div; Segment is a span with Atom-owned spinbutton semantics when editable. Label is a label, ClearTrigger a non-submitting button, HiddenInput a visually hidden constraint-validation input. Segments and Context produce no extra wrapper. Default children include control, groups and form mirrors.
- Use date-value helpers without converting date-only values to UTC midnight.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep date behavior in Atom and presentation in Brick. Do not duplicate popup engines or replace semantic segments with text inputs.
- **MUST:** Load styles.css or core.css plus styles/date-input.css. Use documented visual props and locale overrides.

## Common mistakes

- **Avoid:** Inventing current dates during hydration or submitting localized strings. **Instead:** Supply stable referenceDate and typed values; preserve canonical form mirrors.

## Validation checklist

- Verify keyboard, locale/RTL, constraints, reset, narrow width, appearance and forced colors.

## Related guidance

- `locale-provider`
- `field`
- `popover`
