# Combobox

## When and where to use

Use Combobox when a predefined option set benefits from filtering. Enable `freeSolo` only when values outside that set are valid.

## When not to use

Use Select for select-only choices, Input for unconstrained text, Multi Select for non-editable multiple choices, and menus for actions.

For created string collections with suggestions, use TagsInput with
useTagsInputCombobox bindings. Combobox continues to own the single suggestion
popup; TagsInput owns the committed collection and shared input transactions.

## Installation and imports

```tsx
import { Combobox } from "@flowstack-ui/brick/combobox";
import { Field } from "@flowstack-ui/brick/field";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/combobox.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


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
| `variant` | `outline`, `surface`, `soft`, `subtle`, `ghost`, `plain`, `underline`; or a responsive value | `outline` |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`; or a responsive value | `lg` |
| `shape` | `sharp`, `rounded`, `pill` | `rounded` |
| `fullWidth` | boolean | `true` |
| `tone` | `neutral`, `accent` option treatment | `neutral` |

Underline has fixed sharp geometry. Root forwards Atom's value, input, open, filtering, option, disabled/read-only, loading, and `freeSolo` APIs. Recipe types are `ComboboxVariant`, `ComboboxSize`, and `ComboboxShape`.

Named exports are `Combobox`, `ComboboxRoot`, `ComboboxLabel`,
`ComboboxControl`, `ComboboxInput`, `ComboboxClear`, `ComboboxTrigger`,
`ComboboxIndicator`, `ComboboxPortal`, `ComboboxContent`, `ComboboxListbox`,
`ComboboxGroup`, `ComboboxItem`, `ComboboxEmpty`, `ComboboxLoading`,
`ComboboxRootProvider`, `ComboboxIndicatorGroup`, `ComboboxItemText`, and
`ComboboxItemIndicator`. The subpath also exports `useCombobox` and
`useComboboxContext`, with `ComboboxController`, `UseComboboxProps`,
`ComboboxOption`, and `ComboboxContextValue`. Their
prop types are `ComboboxRootProps`, `ComboboxLabelProps`,
`ComboboxControlProps`, `ComboboxInputProps`, `ComboboxClearProps`,
`ComboboxTriggerProps`, `ComboboxIndicatorProps`, `ComboboxPortalProps`,
`ComboboxContentProps`, `ComboboxListboxProps`, `ComboboxGroupProps`,
`ComboboxItemProps`, `ComboboxEmptyProps`, `ComboboxLoadingProps`, and
`ComboboxRootProviderProps`. IndicatorGroup, ItemText and ItemIndicator accept
native attributes for their div/span hosts.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.


Combobox is Brick's finished searchable single- or multiple-value choice control. Atom owns filtering, keyboard focus, selection, open state, collision-aware positioning, dismissal, ARIA, and optional free text; Brick owns its visual system.

Recipes change paint and geometry only. The `2xs` through `2xl` controls use
24/32/36/40/44/48/64px minimum heights. Option rows use compact
24/24/28/32/36/40/56px minimums and grow for wrapped content. Atom attributes drive open, highlighted,
selected, disabled, read-only, empty, and loading presentation. Content is
viewport-bounded; options reserve a selected-indicator column.

## Tokens and CSS hooks

Public variables are `--brick-combobox-min-block-size`, `--brick-combobox-padding-inline`, `--brick-combobox-radius`, `--brick-combobox-background`, `--brick-combobox-border`, `--brick-combobox-foreground`, `--brick-combobox-placeholder`, `--brick-combobox-focus`, `--brick-combobox-invalid`, and `--brick-combobox-popup-radius`. Stable `.brick-combobox-*` classes and `data-slot` hooks cover DOM parts.

IndicatorGroup, ItemText, and ItemIndicator also preserve authored `data-slot`,
native attributes, classes, styles, and host refs. ItemIndicator remains decorative.

Control exposes `data-full-width`, `data-shape`, `data-size`, and `data-variant`.
Content exposes the inherited `data-size`; both retain overridable `data-slot`.

## Customization

Use recipes first, then scoped variables: `<Combobox.Control style={{ "--brick-combobox-border": "var(--brick-color-accent-border)" }} />`.

## Responsive behavior

The control uses logical spacing and full width by default. Content remains collision-aware, viewport-bounded, scrollable, and reachable in narrow, zoomed, keyboard-open, and RTL layouts.

## Accessibility

Use `Field.Root`, `Field.Label`, `Field.Description`, and `Field.Error` for ordinary form spacing and error relationships. Combobox also works standalone with `Combobox.Label` and Root's `invalid`, `disabled`, `readOnly`, and `required` props. Atom owns combobox/listbox/option roles, active descendant, keyboard navigation, filtering, selection, disclosure, forms, and dismissal. Touch outside dismissal waits for release, so dragging or scrolling does not become a tap. Artwork is decorative. Options must not contain interactive descendants.


### Input policies

`inputBehavior="autohighlight"` highlights the first result as the user types.
`inputBehavior="autocomplete"` updates the single selected value while navigating
with arrow keys. The default `none` keeps highlight and selection independent.
Use `selectionBehavior="preserve"` to retain search text after choosing an item,
or `clear` to clear it. Multiple mode always clears. `openOnKeyPress={false}`
disables arrow-key opening without disabling navigation in an already open list.

These are capability equivalents, not Chakra prop aliases: Brick keeps scalar
single values, a separate `values` array for multiple mode, and `options` rather
than an Ark collection. Brick's `underline` corresponds to the flushed field
recipe. Its shared seven-size scale and `lg` default are intentionally retained.

### Extended composition

Single mode preserves `value`, `defaultValue` and `onValueChange` as scalar
strings. For several choices use `multiple`, `values`, `defaultValues` and
`onValuesChange`; selection clears search text and keeps the list open unless
`closeOnSelect` is true. Compose Chip labels and removal actions outside Control.
Native forms receive one named entry per selected value.

Use `useCombobox` with `Combobox.RootProvider` to own state externally.
`openOnClick`, `openOnFocus`, and boolean/predicate `openOnChange` are independent.
Use `highlightedValue`, `onHighlightChange`, `loopFocus` and `scrollToIndexFn`
when integrating an application-owned virtualizer.

Root supports all seven responsive field variants, seven shared control sizes,
including `outline`, `surface`, `soft`, `subtle`, `ghost`, `plain`, and `underline`,
and neutral/accent option tones. Responsive variants cannot be combined with
shape/radius overrides; underline owns square, bottom-only geometry.
IndicatorGroup arranges Clear and Trigger. ItemText and decorative ItemIndicator
allow richer option content without nested interactive controls. Compose Item
itself with `asChild` for links, not a link inside the option.

Content accepts placement, absolute/fixed strategy, sameWidth, hideWhenDetached,
forceMount and onExitComplete. Inside a scrolling dialog, keep Content inside
the dialog and use fixed positioning; do not hand-position a Surface.
Respect reduced motion when customizing animations.

The playground shows focused live/source examples and preserves exhaustive
scenarios at `?qualification=1`. React Hook Form and TanStack Virtual are optional
example integrations, not Combobox runtime dependencies. Remote fetching,
creation policy, router destinations and result limiting remain application-owned.


## Composition, native props, and refs

DOM parts preserve native props, ARIA, events, `className`, `style`, data attributes, slots, and exact refs. Trigger toggles from pointer activation and inherits its generic accessible label from `LocaleProvider`; an explicit `aria-label` remains authoritative. Clear, Trigger, and Indicator children replace default artwork/content.

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
