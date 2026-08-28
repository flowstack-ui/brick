# Select agent guide

## Purpose

Present one compact, accessible choice from a predefined list while Atom owns selection, keyboard behavior, popup positioning, and native form participation.

## Use when

- A person must choose exactly one value from a predefined list that should remain compact until opened.

## Choose something else when

- A short set of choices should remain visible. Use Radio Group.
- The person must filter or enter a value. Use Combobox.
- The popup contains actions or destinations rather than values. Use Dropdown Menu for actions or Link navigation for destinations.

## Required composition

- Compose Select.Root -> Select.Trigger with Select.Value and Select.Icon -> Select.Content -> Select.Viewport -> Select.Group -> Select.Item with Select.ItemText and Select.ItemIndicator.
- Give every Select an accessible name through Field.Label or an explicit aria-label on Select.Trigger; placeholder text is never the label.
- Use controlled value and onValueChange when an application-owned choice immediately changes locale, theme, routing, or another external system; Select does not implement that side effect.

## Rules

- **MUST:** Use Select only for one value from a predefined select-only collection; keep actions, destinations, editable filtering, and multiple selection in their owning components.
- **MUST:** Wrap every option's primary visible and accessible label in Select.ItemText and keep interactive descendants out of options.
- **MUST:** Keep translation loading, locale detection, persistence, URL changes, analytics, and other effects in the application callback rather than inside Select.
- **MUST:** Use the same named size as adjacent Button, Toggle, ToggleGroup, or other button-like controls; Select Trigger consumes shared control typography and 36/44/52px geometry rather than editable-field typography.
- **MUST:** Load styles.css or core.css plus select.css.

## Common mistakes

- **Avoid:** Using placeholder or the currently selected short code as the only accessible name. **Instead:** Add Field.Label or aria-label to the Trigger and keep the value as the selected value.
- **Avoid:** Using Select as a language-navigation implementation that detects, stores, or routes locales internally. **Instead:** Let Select report the chosen value and connect those application responsibilities through onValueChange.
- **Avoid:** Replacing the compound option anatomy with clickable custom rows. **Instead:** Map data into Select.Item, Select.ItemText, and Select.ItemIndicator so Atom retains collection and accessibility ownership.

## Validation checklist

- Confirm the Trigger has an accessible name distinct from its current value and exposes the expected combobox state.
- Test keyboard opening, typeahead, selection, Escape dismissal, focus return, and disabled-option skipping.
- Confirm a controlled onValueChange reports the selected value once without embedding application side effects in the component.
- Check long localized option labels, narrow viewports, zoom, RTL, dark appearance, and forced colors.
- Compare Trigger height, typography, icon scale, radius, and baseline with adjacent button-like controls at the same size.

## Related guidance

- `@flowstack-ui/atom/agents/select`
- `field`
- `form`
- `radio-group`
- `combobox`
- `multi-select`
- `dropdown-menu`
