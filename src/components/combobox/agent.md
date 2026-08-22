# Combobox agent guide

## Purpose

Present one searchable single-value choice while Atom owns filtering, keyboard focus, selection, dismissal, collision-aware positioning, and form participation.

## Use when

- A predefined option set benefits from editable filtering, including search-and-navigate interfaces where selecting one result triggers application-owned navigation.

## Choose something else when

- The person may enter any unconstrained value and no option list is required. Use Input.
- The person chooses one value without filtering. Use Select or Radio Group.
- The popup contains unrelated actions rather than filterable options. Use Dropdown Menu or Popover.

## Required composition

- Compose Field.Root with a persistent Field.Label, then Combobox.Root -> Combobox.Control with Input, optional Clear, and optional Trigger -> Portal -> Content -> Listbox -> Item plus Empty or Loading when required.
- Pass the complete option collection to Root and render one Item for every available option using matching values and complete accessible labels; keep interactive descendants out of option content.
- For search-and-navigate use, let Combobox report the selected value through onValueChange and keep routing, analytics, and destination policy in the application callback.

## Rules

- **MUST:** Use Combobox Content for searchable option results so Atom retains outside and Escape dismissal, focus, placement, collision handling, and viewport constraints; do not hand-position a Surface or generic container below Input.
- **MUST:** Keep Root options, rendered Items, values, labels, disabled state, and custom filtering aligned as one authoritative collection.
- **MUST:** Keep option content noninteractive and give every Item a complete label because Atom owns the option role, focus model, and selection behavior.
- **MUST:** Enable freeSolo only when values outside the predefined collection are valid application input.
- **MUST:** Load styles.css or core.css plus combobox.css.

## Common mistakes

- **Avoid:** Placing an absolutely positioned Surface below Input and closing it only from Escape or result clicks. **Instead:** Use the complete Combobox control, portal, content, listbox, and item anatomy so outside dismissal and popup paint remain component-owned.
- **Avoid:** Putting Links, Buttons, or other controls inside Combobox.Item. **Instead:** Render noninteractive option text and perform the selected option's application-owned effect from onValueChange.
- **Avoid:** Using placeholder text or a keyboard shortcut hint as the only name. **Instead:** Provide a persistent Field.Label or Combobox.Label and keep placeholder or shortcut text supplemental.

## Validation checklist

- Confirm the control has a persistent accessible name and the input exposes the expected combobox, expanded, controls, and active-descendant relationships.
- Test filtering, Arrow keys, Home, End, Enter selection, Escape, outside pointer dismissal, focus continuity, Clear, and disabled-option skipping.
- Check empty and loading states, long labels, zoom, narrow viewports, collision placement, RTL, light and dark appearance, and forced colors.
- For search-and-navigate composition, confirm selecting a result closes the popup and invokes one application-owned destination change without interactive descendants inside the option.

## Related guidance

- `@flowstack-ui/atom/agents/combobox`
- `field`
- `input`
- `select`
- `radio-group`
- `multi-select`
- `dropdown-menu`
- `popover`
