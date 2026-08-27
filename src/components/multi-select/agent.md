# MultiSelect agent guide

## Purpose

Present several selected values from a predefined list while Atom owns selection, keyboard behavior, popup positioning, and repeated-value form participation.

## Use when

- A person must choose zero or more values from one predefined select-only collection.

## Choose something else when

- Only one value may be selected. Use Select or Radio Group.
- The person must filter, create tags, or enter arbitrary values. Use An editable multi-value Combobox pattern when one is available.
- The popup contains actions rather than values. Use Dropdown Menu.

## Required composition

- Compose MultiSelect.Root -> MultiSelect.Trigger with MultiSelect.Value and MultiSelect.Icon -> MultiSelect.Content -> MultiSelect.Viewport -> MultiSelect.Group -> MultiSelect.Item with MultiSelect.ItemText and MultiSelect.ItemIndicator.
- Give every MultiSelect an accessible name through Field.Label or an explicit aria-label on MultiSelect.Trigger; placeholder and selected summaries are never the label.
- Keep selected values, form handling, persistence, and application effects in the application boundary rather than adding hidden Block state.

## Rules

- **MUST:** Use MultiSelect only for multiple values from a predefined select-only collection; do not add editable filtering, arbitrary tags, actions, or destinations to its option list.
- **MUST:** Wrap every option's primary visible and accessible label in MultiSelect.ItemText and keep interactive descendants out of options.
- **MUST:** Use the same named size as adjacent Button, Toggle, ToggleGroup, or other button-like controls; MultiSelect Trigger consumes shared control typography and 36/44/52px geometry rather than editable-field typography.
- **MUST:** Load styles.css or core.css plus multi-select.css.

## Common mistakes

- **Avoid:** Treating the selected summary as the control's accessible name or placing removal buttons inside the Trigger. **Instead:** Use Field.Label or aria-label for naming and keep the v1 Trigger as one button-owned summary.
- **Avoid:** Rebuilding options as clickable custom rows or adding text entry to the select-only Trigger. **Instead:** Preserve the compound Item anatomy and choose an editable multi-value pattern for filtering or tag creation.

## Validation checklist

- Test keyboard opening, typeahead, multiple selection, Escape dismissal, focus return, disabled-option skipping, form submission, and reset.
- Compare Trigger height, typography, icon scale, radius, and baseline with adjacent button-like controls at the same size.
- Check long selected summaries and options, narrow viewports, zoom, RTL, dark appearance, and forced colors.

## Related guidance

- `@flowstack-ui/atom/agents/multi-select`
- `field`
- `form`
- `select`
- `combobox`
- `checkbox-group`
