# NumberInput agent guide

## Purpose

Present finished exact numeric entry with typing and step actions while Atom owns parsing, formatting, limits, spinbutton keyboard behavior, validation, and numeric form submission.

## Use when

- A value is genuinely numeric and a person should type an exact value or adjust it in known increments.

## Choose something else when

- Digits identify something, adjustment by feel is primary, a small fixed set is valid, or the value is read-only completion. Use Input, Slider, Select or RadioGroup, or Progress.

## Required composition

- Compose a visibly labelled Field with NumberInput.Root containing exactly one NumberInput.Input, optional NumberInput.Unit, and either NumberInput.Control or explicit NumberInput.Increment and NumberInput.Decrement. Control generates both localized actions when children are omitted.
- Choose outline, soft, or underline plus the responsive 2xs–2xl size scale and an allowed shape on Root. Keep layout=field for compact chevron actions; use layout=stepper for separated square minus/plus actions around a centered editable value with a larger numeric reading scale. Use hover-only steppers only for dense expert field layouts; they remain visible for touch users. Use Unit for a stable presentational suffix such as px or %, keep formatter and parser reversible, use number or null controlled state, and keep application quantity policy outside the component.

## Rules

- **MUST:** Use NumberInput only for values that can be meaningfully stepped and clamped; postal codes, phone numbers, account numbers, and similar identifiers remain Input values.
- **MUST:** Render exactly one NumberInput.Input inside Root and keep Increment and Decrement inside that same Root so Atom retains numeric state, focus, limits, and aria-controls ownership.
- **MUST:** Use number or null with value and onValueChange for controlled state, preserve intermediate editing, keep formatter and parser reversible, choose positive step and suitable precision, and decide clampOnBlur deliberately.
- **MUST:** Give Input a visible Field label or equivalent accessible name and give Increment and Decrement localized action names while preserving spinbutton ARIA, Arrow/Page/Home/End keys, native validity, and pointer focus retention.
- **MUST:** Keep the visible Input as validity owner and Root's named parsed value as the submission contract, including external form association, Field reporting, reset, disabled, read-only, required, and invalid state.
- **MUST:** Keep the shrinkable input and fixed logical-end action column contained at narrow widths and in RTL; preserve coarse-pointer step targets and do not use viewport width as a touch proxy.
- **MUST:** When using hover-only steppers, preserve focus-triggered discovery and persistent coarse-pointer actions; never make hover the only way to find or operate the step actions.
- **MUST:** Use NumberInput.Unit only for a presentational suffix; do not include it in the editable numeric value or submission contract.
- **SHOULD:** Use layout=stepper for quantity, seat, and inventory choices that benefit from separated square actions; keep layout=field for ordinary editable numeric fields and apply hover-only visibility only to that field layout.
- **MUST:** Load styles.css or core.css plus number-input.css and Field CSS when composed.

## Common mistakes

- **Avoid:** Using NumberInput for digit-like identifiers, rendering more than one Input, formatting without a matching parser, or submitting display text as the numeric value. **Instead:** Choose Input for identifiers, keep one compound Input, make parsing and formatting symmetric, and preserve Atom's parsed form contract.
- **Avoid:** Leaving decorative step buttons unnamed or adding unit selection and business limits inside the component. **Instead:** Name both actions and keep units, inventory rules, calculations, and other application policy at the application boundary.

## Validation checklist

- Verify controlled number and null state, uncontrolled default, intermediate typing, parsing, formatting, precision, min/max, clampOnBlur, step and largeStep, Arrow/Page/Home/End, empty state, boundary action state, and pointer/touch focus preservation.
- Verify visible naming, localized generated Control labels, explicit action names, required and numeric native validity, Field reporting, named parsed submission, external form, reset, disabled/read-only behavior, refs, native props, and custom action children.
- Verify field and stepper layouts; outline, soft, and underline recipes; all sizes and allowed shapes; full-width and intrinsic layouts; narrow width, coarse pointer, RTL, zoom, forced colors, light and dark appearance, focus, invalid, and disabled paint.

## Related guidance

- `@flowstack-ui/atom/agents/number-input`
- `input`
- `slider`
- `progress`
- `select`
- `radio-group`
- `field`
- `form`
