# MultiSelect

MultiSelect is Brick's styled multiple-value choice control. It is built
directly on Atom MultiSelect 0.10.1: Atom owns the value array, open state, option
registration, keyboard/typeahead, focus, dismissal, positioning, ARIA, native
form participation, validation, and reset. Brick owns the complete visual
system and default decorative artwork.

## When and where to use

Use MultiSelect when people may choose several values from a predefined list
that should remain compact until opened. It supports grouped and disabled options, native
forms, Field messages, and keyboard typeahead.

## When not to use

Use Checkbox Group for a short multiple-choice set that should remain visible,
Select or Radio Group when exactly one value is required, Combobox when users
must filter or enter text, and Dropdown Menu for actions. Options must not
contain interactive descendants.

## Installation and imports

```tsx
import { Field, MultiSelect } from "@flowstack-ui/brick";
// or
import { MultiSelect } from "@flowstack-ui/brick/multi-select";
import "@flowstack-ui/brick/styles.css";
```

Both entrypoints export `MultiSelect`, `MultiSelectRoot`, `MultiSelectTrigger`, `MultiSelectValue`,
`MultiSelectIcon`, `MultiSelectPortal`, `MultiSelectContent`, `MultiSelectListbox`,
`MultiSelectViewport`, `MultiSelectScrollUpButton`, `MultiSelectScrollDownButton`,
`MultiSelectGroup`, `MultiSelectLabel`, `MultiSelectItem`, `MultiSelectItemText`,
`MultiSelectItemIndicator`, `MultiSelectSeparator`, and `MultiSelectArrow`. Public types are
`MultiSelectRootProps`, `MultiSelectTriggerProps`, `MultiSelectValueProps`, `MultiSelectIconProps`,
`MultiSelectPortalProps`, `MultiSelectContentProps`, `MultiSelectListboxProps`,
`MultiSelectViewportProps`, `MultiSelectScrollUpButtonProps`,
`MultiSelectScrollDownButtonProps`, `MultiSelectGroupProps`, `MultiSelectLabelProps`,
`MultiSelectItemProps`, `MultiSelectItemTextProps`, `MultiSelectItemIndicatorProps`,
`MultiSelectSeparatorProps`, `MultiSelectArrowProps`, `MultiSelectVariant`, `MultiSelectSize`, and
`MultiSelectShape`.

## Quick start

```tsx
<Field.Root id="team-skills" required>
  <Field.Label>Team skills</Field.Label>
  <MultiSelect.Root defaultValue={["design", "engineering"]} name="skills" required>
    <MultiSelect.Trigger>
      <MultiSelect.Value placeholder="Choose skills" />
      <MultiSelect.Icon />
    </MultiSelect.Trigger>
    <MultiSelect.Content>
      <MultiSelect.ScrollUpButton />
      <MultiSelect.Viewport>
        <MultiSelect.Group>
          <MultiSelect.Label>Disciplines</MultiSelect.Label>
          <MultiSelect.Item value="design">
            <MultiSelect.ItemText>Design</MultiSelect.ItemText>
            <MultiSelect.ItemIndicator />
          </MultiSelect.Item>
          <MultiSelect.Item value="engineering">
            <MultiSelect.ItemText>Engineering</MultiSelect.ItemText>
            <MultiSelect.ItemIndicator />
          </MultiSelect.Item>
        </MultiSelect.Group>
      </MultiSelect.Viewport>
      <MultiSelect.ScrollDownButton />
      <MultiSelect.Arrow />
    </MultiSelect.Content>
  </MultiSelect.Root>
  <Field.Description>Choose every discipline that applies.</Field.Description>
</Field.Root>
```

Placeholder text is a hint, not an accessible label. Use `Field.Label` or an
explicit ARIA label.

## Anatomy and DOM ownership

| Part | Default element/owner | Stable class | Default slot |
| --- | --- | --- | --- |
| `Root` | Atom context plus native form proxy | none | none |
| `Trigger` | Atom `button` | `.brick-multi-select-trigger` | `multi-select-trigger` |
| `Value` | Atom `span` | `.brick-multi-select-value` | `multi-select-value` |
| `Icon` | Atom `span` | `.brick-multi-select-icon` | `multi-select-icon` |
| `Portal` | Atom portal, no wrapper | none | none |
| `Content` / `Listbox` | Atom `div[role=listbox]` | `.brick-multi-select-content` | `multi-select-listbox` |
| `Viewport` | Atom `div` | `.brick-multi-select-viewport` | `multi-select-viewport` |
| `ScrollUpButton` | Atom `button` | `.brick-multi-select-scroll-up` | `multi-select-scroll-up-button` |
| `ScrollDownButton` | Atom `button` | `.brick-multi-select-scroll-down` | `multi-select-scroll-down-button` |
| `Group` | Atom `div[role=group]` | `.brick-multi-select-group` | `multi-select-group` |
| `Label` | Atom `div` | `.brick-multi-select-label` | `multi-select-label` |
| `Item` | Atom `div[role=option]` | `.brick-multi-select-item` | `multi-select-item` |
| `ItemText` | Atom `span` | `.brick-multi-select-item-text` | `multi-select-item-text` |
| `ItemIndicator` | Atom `span` | `.brick-multi-select-item-indicator` | `multi-select-item-indicator` |
| `Separator` | Atom `div[role=separator]` | `.brick-multi-select-separator` | `multi-select-separator` |
| `Arrow` | Atom positioned `span` | `.brick-multi-select-arrow` | `multi-select-arrow` |

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
forwards Atom's array-valued `value`, `defaultValue`, and `onValueChange`, plus `open`,
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

Compose MultiSelect inside Field for the visible label, description, required
marker, and error. Atom's aligned native multi-select remains the submission,
required-validity, external `form`, and reset proxy. Do not add hidden inputs
or reproduce validation in application code.

Controlled and uncontrolled value/open state are both supported. Native form
behavior remains unchanged by Brick visual props; Brick `size` is control
geometry and never the native multi-select's numeric `size` attribute.

### Groups, scrolling, portal, and Arrow

Place Label and Items inside Group to expose an accessible option group. Use
Separator between authored groups. Viewport owns option scrolling; the
conditional scroll buttons are specialized MultiSelect controls and are not a
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

- `--brick-multi-select-trigger-min-block-size`, `--brick-multi-select-trigger-padding-inline`,
  `--brick-multi-select-trigger-gap`, `--brick-multi-select-trigger-radius`;
- `--brick-multi-select-trigger-font-family`, `--brick-multi-select-trigger-font-size`,
  `--brick-multi-select-trigger-font-weight`, `--brick-multi-select-trigger-line-height`,
  `--brick-multi-select-trigger-letter-spacing`;
- `--brick-multi-select-trigger-background`, `--brick-multi-select-trigger-foreground`,
  `--brick-multi-select-trigger-placeholder`, `--brick-multi-select-trigger-border`,
  `--brick-multi-select-trigger-hover-background`, `--brick-multi-select-trigger-hover-border`,
  `--brick-multi-select-trigger-focus-ring`, `--brick-multi-select-trigger-invalid-border`;
- `--brick-multi-select-trigger-disabled-background`,
  `--brick-multi-select-trigger-disabled-foreground`,
  `--brick-multi-select-trigger-disabled-border`,
  `--brick-multi-select-trigger-readonly-background`;
- `--brick-multi-select-icon-size`, `--brick-multi-select-icon-foreground`;
- `--brick-multi-select-content-background`, `--brick-multi-select-content-foreground`,
  `--brick-multi-select-content-border`, `--brick-multi-select-content-radius`,
  `--brick-multi-select-content-shadow`, `--brick-multi-select-content-max-block-size`,
  `--brick-multi-select-content-padding`, `--brick-multi-select-content-z-index`;
- `--brick-multi-select-item-min-block-size`, `--brick-multi-select-item-padding-inline`,
  `--brick-multi-select-item-gap`, `--brick-multi-select-item-highlighted-background`,
`--brick-multi-select-item-selected-foreground`,
  `--brick-multi-select-item-disabled-foreground`;
- `--brick-multi-select-indicator-size`, `--brick-multi-select-label-foreground`,
  `--brick-multi-select-separator-color`, `--brick-multi-select-scroll-button-block-size`,
  and `--brick-multi-select-arrow-size`.

## Customization

Use recipe props first, semantic tokens for system changes, then MultiSelect
variables or part class/style for a scoped change:

```tsx
<MultiSelect.Root>
  <MultiSelect.Trigger style={{ "--brick-multi-select-trigger-border": "#18794e" }}>
    <MultiSelect.Value placeholder="Choose" />
    <MultiSelect.Icon />
  </MultiSelect.Trigger>
  <MultiSelect.Content style={{ "--brick-multi-select-content-background": "#f4fff9" }}>
    <MultiSelect.Viewport>{/* items */}</MultiSelect.Viewport>
    <MultiSelect.Arrow />
  </MultiSelect.Content>
</MultiSelect.Root>
```

Do not target private SVG paths, Floating UI inline coordinates, the hidden
form proxy, or Atom internals.

## Responsive behavior

MultiSelect uses logical spacing, constrained popup width/height, long-label
wrapping in options, and trigger truncation. It stays within narrow viewports,
supports 200%/400% zoom, and reverses logical placement in RTL. Brick does not
add responsive prop objects or an automatic mobile sheet.

## Accessibility

Every MultiSelect requires an accessible name. Atom owns the button trigger,
multiple-selection listbox semantics, expanded state, group relationships, active option focus,
typeahead, multi-selection, Escape/Tab dismissal, focus return, touch-safe outside
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

See the `/multi-select` playground route for recipes, states, long scrolling groups,
forms, composition, appearance, customization, RTL, and responsive evidence.

### Exclusions

MultiSelect intentionally has no single-value mode, flat `items` API, editable search,
arbitrary tone, consumer placement API, virtualization, async/loading state,
option creation, or automatic mobile sheet. Those require separate component
contracts.

## Evidence

- Playground: [MultiSelect scenarios](../../../playground/src/components/multi-select/)
- Unit owner: [MultiSelect component tests](../../../test/components/multi-select/)
- Type owner: [MultiSelect type tests](../../../test/types/components/multi-select.test.ts)
- Browser owner: [MultiSelect behavior tests](../../../playground/tests/components/multi-select/behavior.spec.ts)
- Visual owner: [MultiSelect visual tests](../../../playground/tests/components/multi-select/visual.spec.ts)
- Manual protocol: [MultiSelect manual test](../../../playground/manual-tests/multi-select.md)
- Coverage workbook: `playground/component-coverage.xlsx`, `Multi Select` sheet

## Changelog

See the [MultiSelect changelog](CHANGELOG.md) for release-facing changes.
