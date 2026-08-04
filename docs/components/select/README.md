# Select

Select is Brick's finished single-value, select-only choice control. It is
built directly on Atom Select: Atom owns values, open state, option
registration, keyboard/typeahead, focus, dismissal, positioning, ARIA, native
form participation, validation, and reset. Brick owns the complete visual
system and default decorative artwork.

## When and where to use

Use Select when one value must be chosen from a predefined list that should
remain compact until opened. It supports grouped and disabled options, native
forms, Field messages, and keyboard typeahead.

## When not to use

Use Radio Group for a short set that should stay visible, Combobox when users
must filter or enter text, Multi Select for multiple values, and Dropdown Menu
for actions. Options must not contain interactive descendants.

## Installation and imports

```tsx
import { Field, Select } from "@flowstack-ui/brick";
// or
import { Select } from "@flowstack-ui/brick/select";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/select.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Both entrypoints export `Select`, `SelectRoot`, `SelectTrigger`, `SelectValue`,
`SelectIcon`, `SelectPortal`, `SelectContent`, `SelectListbox`,
`SelectViewport`, `SelectScrollUpButton`, `SelectScrollDownButton`,
`SelectGroup`, `SelectLabel`, `SelectItem`, `SelectItemText`,
`SelectItemIndicator`, `SelectSeparator`, and `SelectArrow`. Public types are
`SelectRootProps`, `SelectTriggerProps`, `SelectValueProps`, `SelectIconProps`,
`SelectPortalProps`, `SelectContentProps`, `SelectListboxProps`,
`SelectViewportProps`, `SelectScrollUpButtonProps`,
`SelectScrollDownButtonProps`, `SelectGroupProps`, `SelectLabelProps`,
`SelectItemProps`, `SelectItemTextProps`, `SelectItemIndicatorProps`,
`SelectSeparatorProps`, `SelectArrowProps`, `SelectVariant`, `SelectSize`, and
`SelectShape`.

## Quick start

```tsx
<Field.Root id="workspace-plan" required>
  <Field.Label>Plan</Field.Label>
  <Select.Root defaultValue="team" name="plan" required>
    <Select.Trigger>
      <Select.Value placeholder="Choose a plan" />
      <Select.Icon />
    </Select.Trigger>
    <Select.Content>
      <Select.ScrollUpButton />
      <Select.Viewport>
        <Select.Group>
          <Select.Label>Available plans</Select.Label>
          <Select.Item value="starter">
            <Select.ItemText>Starter</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
          <Select.Item value="team">
            <Select.ItemText>Team</Select.ItemText>
            <Select.ItemIndicator />
          </Select.Item>
        </Select.Group>
      </Select.Viewport>
      <Select.ScrollDownButton />
      <Select.Arrow />
    </Select.Content>
  </Select.Root>
  <Field.Description>Choose one billing plan.</Field.Description>
</Field.Root>
```

Placeholder text is a hint, not an accessible label. Use `Field.Label` or an
explicit ARIA label.

## Anatomy and DOM ownership

| Part | Default element/owner | Stable class | Default slot |
| --- | --- | --- | --- |
| `Root` | Atom context plus native form proxy | none | none |
| `Trigger` | Atom `button` | `.brick-select-trigger` | `select-trigger` |
| `Value` | Atom `span` | `.brick-select-value` | `select-value` |
| `Icon` | Atom `span` | `.brick-select-icon` | `select-icon` |
| `Portal` | Atom portal, no wrapper | none | none |
| `Content` / `Listbox` | Atom `div[role=listbox]` | `.brick-select-content` | `select-listbox` |
| `Viewport` | Atom `div` | `.brick-select-viewport` | `select-viewport` |
| `ScrollUpButton` | Atom `button` | `.brick-select-scroll-up` | `select-scroll-up-button` |
| `ScrollDownButton` | Atom `button` | `.brick-select-scroll-down` | `select-scroll-down-button` |
| `Group` | Atom `div[role=group]` | `.brick-select-group` | `select-group` |
| `Label` | Atom `div` | `.brick-select-label` | `select-label` |
| `Item` | Atom `div[role=option]` | `.brick-select-item` | `select-item` |
| `ItemText` | Atom `span` | `.brick-select-item-text` | `select-item-text` |
| `ItemIndicator` | Atom `span` | `.brick-select-item-indicator` | `select-item-indicator` |
| `Separator` | Atom `div[role=separator]` | `.brick-select-separator` | `select-separator` |
| `Arrow` | Atom positioned `span` | `.brick-select-arrow` | `select-arrow` |

`Listbox` is an alias of `Content`, not another layer. Root and Portal add no
Brick wrapper. Refs target each Atom-owned element listed above.

## API

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `outline`, `soft`, `underline` | `outline` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `sharp`, `rounded`, `pill` | `rounded` |
| `fullWidth` | `boolean` | `true` |

`underline` has fixed sharp geometry and does not accept `shape`. Root also
forwards Atom's `value`, `defaultValue`, `onValueChange`, `open`,
`defaultOpen`, `onOpenChange`, `disabled`, `readOnly`, `invalid`, `required`,
`name`, `form`, and `validationBehavior`.

### Parts and artwork

Every DOM-owning part preserves native props, events, ARIA, `data-*`,
`className`, `style`, slot override, and its exact ref. Icon,
ItemIndicator, ScrollUpButton, ScrollDownButton, and Arrow provide decorative
Brick artwork when children are omitted. Supplying children replaces that
artwork; consumers then own its semantics.

`ItemText` should wrap each option's primary visible label because Atom uses it
for the displayed value and accessible option name. Item may contain additional
decorative content, but never nested controls.

## Visual recipes and states

- `outline` uses a raised surface and strong complete border.
- `soft` uses a subtle fill and restrained border.
- `underline` uses a transparent surface and bottom line.
- `sm`, `md`, and `lg` use 36px, 44px, and 52px minimum trigger and option-row heights.
- `sharp`, `rounded`, and `pill` change Trigger geometry only.

The popup and options do not change with Trigger variant. Atom's data state
drives open, highlighted, selected, disabled, read-only, and invalid paint.
State changes never alter control or item geometry. Value text truncates before
it can displace Icon; ItemIndicator owns one fixed logical-end column.

### Field, forms, and validation

Compose Select inside Field for the visible label, description, required
marker, and error. Atom's aligned native select remains the submission,
required-validity, external `form`, and reset proxy. Do not add hidden inputs
or reproduce validation in application code.

Controlled and uncontrolled value/open state are both supported. Native form
behavior remains unchanged by Brick visual props; Brick `size` is control
geometry and never the native select's numeric `size` attribute.

### Groups, scrolling, portal, and Arrow

Place Label and Items inside Group to expose an accessible option group. Use
Separator between authored groups. Viewport owns option scrolling; the
conditional scroll buttons are specialized Select controls and are not a
generic Scroll Area replacement.

Content portals and positions itself by default. Portal may provide an explicit
portal owner, and Content supports Atom's custom `container` or
`disablePortal` behavior. Arrow must be inside Content and follows its
collision-resolved `data-side` and `data-align`.

## Tokens and CSS hooks

Stable classes and the overridable `data-slot` hooks are listed in
[Anatomy and DOM ownership](#anatomy-and-dom-ownership). Trigger exposes
`data-variant`, `data-size`, `data-shape`, and `data-full-width`; Atom state and
placement attributes remain intact.

Public variables include:

- `--brick-select-trigger-min-block-size`, `--brick-select-trigger-padding-inline`,
  `--brick-select-trigger-gap`, `--brick-select-trigger-radius`;
- `--brick-select-trigger-font-family`, `--brick-select-trigger-font-size`,
  `--brick-select-trigger-font-weight`, `--brick-select-trigger-line-height`,
  `--brick-select-trigger-letter-spacing`;
- `--brick-select-trigger-background`, `--brick-select-trigger-foreground`,
  `--brick-select-trigger-placeholder`, `--brick-select-trigger-border`,
  `--brick-select-trigger-hover-background`, `--brick-select-trigger-hover-border`,
  `--brick-select-trigger-focus-ring`, `--brick-select-trigger-invalid-border`;
- `--brick-select-trigger-disabled-background`,
  `--brick-select-trigger-disabled-foreground`,
  `--brick-select-trigger-disabled-border`,
  `--brick-select-trigger-readonly-background`;
- `--brick-select-icon-size`, `--brick-select-icon-foreground`;
- `--brick-select-content-background`, `--brick-select-content-foreground`,
  `--brick-select-content-border`, `--brick-select-content-radius`,
  `--brick-select-content-shadow`, `--brick-select-content-max-block-size`,
  `--brick-select-content-padding`, `--brick-select-content-z-index`;
- `--brick-select-item-min-block-size`, `--brick-select-item-padding-inline`,
  `--brick-select-item-gap`, `--brick-select-item-highlighted-background`,
  `--brick-select-item-selected-foreground`,
  `--brick-select-item-disabled-foreground`;
- `--brick-select-indicator-size`, `--brick-select-label-foreground`,
  `--brick-select-separator-color`, `--brick-select-scroll-button-block-size`,
  and `--brick-select-arrow-size`.

## Customization

Use recipe props first, semantic tokens for system changes, then Select
variables or part class/style for a scoped change:

```tsx
<Select.Root>
  <Select.Trigger style={{ "--brick-select-trigger-border": "#18794e" }}>
    <Select.Value placeholder="Choose" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Content style={{ "--brick-select-content-background": "#f4fff9" }}>
    <Select.Viewport>{/* items */}</Select.Viewport>
    <Select.Arrow />
  </Select.Content>
</Select.Root>
```

Do not target private SVG paths, Floating UI inline coordinates, the hidden
form proxy, or Atom internals.

## Responsive behavior

Select uses logical spacing, constrained popup width/height, long-label
wrapping in options, and trigger truncation. It stays within narrow viewports,
supports 200%/400% zoom, and reverses logical placement in RTL. Brick does not
add responsive prop objects or an automatic mobile sheet.

## Accessibility

Every Select requires an accessible name. Atom owns combobox/listbox roles,
expanded/value state, group relationships, highlighted option focus,
typeahead, selection, Escape/Tab dismissal, focus return, touch-safe outside
dismissal, portal ownership, and native form semantics.

Brick preserves visible keyboard focus and distinct highlighted, selected,
disabled, read-only, and invalid states in light, dark, reduced-motion, and
forced-color modes. Decorative artwork is hidden from accessibility APIs.

## Composition, native props, and refs

Trigger preserves Atom `asChild` and `render`; composed hosts must retain
button-equivalent focus and interaction semantics. Root behavior, option
collection, positioning, and Item interaction are never recreated by Brick.
Each part forwards the exact Atom ref target. Root renders no visual host and
therefore accepts no `className` or `style`.

## Examples

See the `/select` playground route for recipes, states, long scrolling groups,
forms, composition, appearance, customization, RTL, and responsive evidence.

### Exclusions

Select intentionally has no multiple mode, flat `items` API, editable search,
arbitrary tone, consumer placement API, virtualization, async/loading state,
option creation, or automatic mobile sheet. Those require separate component
contracts.

## Evidence

- Playground: [Select scenarios](../../../playground/src/components/select/)
- Unit owner: [Select component tests](../../../test/components/select/)
- Type owner: [Select type tests](../../../test/types/components/select.test.ts)
- Browser owner: [Select behavior tests](../../../playground/tests/components/select/behavior.spec.ts)
- Visual owner: [Select visual tests](../../../playground/tests/components/select/visual.spec.ts)
- Manual protocol: [Select manual test](../../../playground/manual-tests/select.md)
- Coverage workbook: `playground/component-coverage.xlsx`, `Select` sheet

## Changelog

See the [Select changelog](CHANGELOG.md) for release-facing changes.
