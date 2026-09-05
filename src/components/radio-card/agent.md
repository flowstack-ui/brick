# RadioCard agent guide

## Purpose

Present one rich whole-card choice while Atom owns radio semantics, selection, keyboard navigation, focus, forms, validation, direction, and reset.

## Use when

- A short single-choice set needs icons, titles, descriptions, prices, badges, or supporting metadata inside large selectable targets.

## Choose something else when

- Choices are concise, multiple, compact, or immediate commands. Use RadioGroup, CheckboxGroup, Select, SegmentGroup, or ToggleGroup.

## Required composition

- Give Root an accessible group name, normally through Fieldset Legend. Give every Item a stable unique value and compose Control, Content, Title, optional Description, optional Indicator, and optional Addon deliberately.
- Use one Root. Put a Brick Grid or Stack inside it when responsive option tracks are needed; do not duplicate the semantic group.

## Rules

- **MUST:** Preserve Atom's radio Item as the whole interactive card; do not add a second input or click behavior.
- **MUST:** Give Root an accessible group name and every Item a complete visible option name.
- **MUST:** Keep Item values unique and use controlled or uncontrolled state consistently.
- **MUST:** Treat Indicator as decorative because Atom Item carries the semantic checked state.
- **SHOULD:** Keep the default horizontal Control anatomy unless the option content and keyboard model intentionally require vertical orientation.
- **SHOULD:** Use one semantic Root with Brick Grid or Stack for responsive tracks; never duplicate divergent radio-group state.
- **MUST:** Load styles.css or core.css plus radio-card.css and every composed Brick component stylesheet.

## Common mistakes

- **Avoid:** Styling RadioGroup internals into cards. **Instead:** Use RadioCard as the independent finished owner.
- **Avoid:** Using RadioCard as a navigation destination or command. **Instead:** Use Card with Link or Button.

## Validation checklist

- Verify naming, selection, roving focus, orientation-matched keyboard navigation and Control layout, disabled skipping, read-only, forms, reset, Fieldset validation, sizes, variants, alignment, indicator composition, addon containment, long content, narrow widths, RTL, light/dark, forced colors, and touch targets.

## Related guidance

- `@flowstack-ui/atom/agents/radio-group`
- `radio-group`
- `fieldset`
- `grid`
- `stack`
- `icon`
- `badge`
