# Combobox

Combobox is Brick's finished searchable single-value choice control. Atom owns filtering, keyboard focus, selection, open state, collision-aware positioning, dismissal, ARIA, and optional free text; Brick owns its visual system.

## When and where to use

Use Combobox when a predefined option set benefits from filtering. Enable `freeSolo` only when values outside that set are valid.

## When not to use

Use Select for select-only choices, Input for unconstrained text, Multi Select for several values, and menus for actions.

## Installation and imports

```tsx
import { Combobox } from "@flowstack-ui/brick/combobox";
import { Field } from "@flowstack-ui/brick/field";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<Field.Root id="city">
  <Field.Label>City</Field.Label>
  <Combobox.Root options={cities}>
  <Combobox.Control><Combobox.Input placeholder="Search cities" /><Combobox.Clear aria-label="Clear city" /><Combobox.Trigger aria-label="Toggle city options" /></Combobox.Control>
  <Combobox.Portal><Combobox.Content><Combobox.Listbox>
    {cities.map(city => <Combobox.Item key={city.value} label={city.label} value={city.value}>{city.label}</Combobox.Item>)}
    <Combobox.Empty>No matching cities</Combobox.Empty>
  </Combobox.Listbox></Combobox.Content></Combobox.Portal>
  </Combobox.Root>
  <Field.Error>Choose a city.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership

Root and Portal add no Brick DOM. Label, Control, Input, Clear, Trigger, Content, Listbox, Group, Item, Empty, and Loading preserve Atom hosts and refs. Indicator is decorative artwork nested in Trigger.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `outline`, `soft`, `underline` | `outline` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `sharp`, `rounded`, `pill` | `rounded` |
| `fullWidth` | boolean | `true` |

Underline has fixed sharp geometry. Root forwards Atom's value, input, open, filtering, option, disabled/read-only, loading, and `freeSolo` APIs. Recipe types are `ComboboxVariant`, `ComboboxSize`, and `ComboboxShape`.

Named exports are `Combobox`, `ComboboxRoot`, `ComboboxLabel`,
`ComboboxControl`, `ComboboxInput`, `ComboboxClear`, `ComboboxTrigger`,
`ComboboxIndicator`, `ComboboxPortal`, `ComboboxContent`, `ComboboxListbox`,
`ComboboxGroup`, `ComboboxItem`, `ComboboxEmpty`, and `ComboboxLoading`. Their
prop types are `ComboboxRootProps`, `ComboboxLabelProps`,
`ComboboxControlProps`, `ComboboxInputProps`, `ComboboxClearProps`,
`ComboboxTriggerProps`, `ComboboxIndicatorProps`, `ComboboxPortalProps`,
`ComboboxContentProps`, `ComboboxListboxProps`, `ComboboxGroupProps`,
`ComboboxItemProps`, `ComboboxEmptyProps`, and `ComboboxLoadingProps`.

## Visual recipes and states

Recipes change paint and geometry only. Atom attributes drive open, highlighted, selected, disabled, read-only, empty, and loading presentation. Content is viewport-bounded; options reserve a selected-indicator column.

## Tokens and CSS hooks

Public variables are `--brick-combobox-min-block-size`, `--brick-combobox-padding-inline`, `--brick-combobox-radius`, `--brick-combobox-background`, `--brick-combobox-border`, `--brick-combobox-foreground`, `--brick-combobox-placeholder`, `--brick-combobox-focus`, `--brick-combobox-invalid`, and `--brick-combobox-popup-radius`. Stable `.brick-combobox-*` classes and `data-slot` hooks cover DOM parts.

Control exposes `data-full-width`, `data-shape`, `data-size`, and `data-variant` alongside the overridable `data-slot`.

## Customization

Use recipes first, then scoped variables: `<Combobox.Control style={{ "--brick-combobox-border": "var(--brick-color-accent-border)" }} />`.

## Responsive behavior

The control uses logical spacing and full width by default. Content remains collision-aware, viewport-bounded, scrollable, and reachable in narrow, zoomed, keyboard-open, and RTL layouts.

## Accessibility

Use `Field.Root`, `Field.Label`, `Field.Description`, and `Field.Error` for ordinary form spacing and error relationships. Combobox also works standalone with `Combobox.Label` and Root's `invalid`, `disabled`, `readOnly`, and `required` props. Atom owns combobox/listbox/option roles, active descendant, keyboard navigation, filtering, selection, disclosure, forms, and dismissal. Touch outside dismissal waits for release, so dragging or scrolling does not become a tap. Artwork is decorative. Options must not contain interactive descendants.

## Composition, native props, and refs

DOM parts preserve native props, ARIA, events, `className`, `style`, data attributes, slots, and exact refs. Trigger toggles from pointer activation and defaults to an accessible English label; localized applications should provide `aria-label`. Clear, Trigger, and Indicator children replace default artwork/content.

## Examples

```tsx
<Combobox.Root freeSolo options={cities}>
  <Combobox.Label>Destination</Combobox.Label>
  <Combobox.Control><Combobox.Input /><Combobox.Clear aria-label="Clear destination" /></Combobox.Control>
</Combobox.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/combobox/)
- [Unit tests](../../../test/components/combobox/combobox.test.tsx)
- [Type tests](../../../test/types/components/combobox.test.ts)
- [Browser behavior](../../../playground/tests/components/combobox/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/combobox/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/combobox.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
