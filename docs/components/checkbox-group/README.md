# Checkbox Group

CheckboxGroup coordinates related Checkbox-style items, optional item text, and
an aggregate parent control.

## When and where to use

Use it when several submitted choices share group state or a select-all parent.

## When not to use

Use standalone Checkbox for independent choices and RadioGroup for exactly one
choice. The group does not own business validation or persistence.

## Installation and imports

```tsx
import { CheckboxGroup } from "@flowstack-ui/brick/checkbox-group";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/checkbox-group.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<CheckboxGroup.Root aria-label="Features" defaultValue={["search"]}>
  <CheckboxGroup.Item value="search">
    <CheckboxGroup.ItemLabel>Search</CheckboxGroup.ItemLabel>
  </CheckboxGroup.Item>
</CheckboxGroup.Root>
```

## Anatomy and DOM ownership

`Root` defaults to `div`; `Item` and `Parent` to checkbox buttons;
`ItemLabel`/`ItemDescription` to spans. Brick injects the same private visual
control/indicator/SVG used by Checkbox into Item and Parent. Refs target
`HTMLDivElement`, `HTMLButtonElement`, and `HTMLSpanElement` respectively.

## API

Public exports are `CheckboxGroup`, `CheckboxGroupRoot`, `CheckboxGroupItem`,
`CheckboxGroupItemLabel`, `CheckboxGroupItemDescription`,
`CheckboxGroupParent`, and their corresponding `CheckboxGroupRootProps`,
`CheckboxGroupItemProps`, `CheckboxGroupItemLabelProps`,
`CheckboxGroupItemDescriptionProps`, and `CheckboxGroupParentProps`.

| Root prop | Values | Default |
| --- | --- | --- |
| `size` | Responsive `xs`, `sm`, `md`, `lg` | `md` |
| `variant` | `solid`, `outline`, `subtle` | `solid` |
| `tone` | `neutral`, `accent`, `contrast`, `info`, `success`, `warning`, `danger` | `accent` |
| `radius` | `Radius` | `subtle` |
| `density` | `comfortable`, `compact` | `comfortable` |
| `labelPlacement` | `start`, `end` | `end` |
| `gap` | `SpacingValue` | `1.5` |
| `maxSelectedValues` | Nonnegative integer | — |
| `orientation` | `vertical`, `horizontal` | `vertical` |
| `asChild` | `boolean` | `false` |

Root inherits Atom group value/defaultValue/change, orientation, disabled,
invalid, required, name/form, and relationship props and adds
the shared size recipe.
Item requires Atom `value`. Root owns `allValues`, the explicit selectable set
required when rendering Parent. Parent derives its aggregate state from Root;
do not pass `allValues` to Parent. Label and Description require children. Every part uses the
discriminated `asChild` or `render` composition contract.

## Visual recipes and states

Root size cascades shared row/control geometry. Orientation arranges Items.
Atom owns item checked/mixed state, aggregate Parent state, values, disabled/
invalid state, and form behavior. Item and Parent rows remain fully clickable,
while hover, press, and focus-visible feedback stays on their visual checkbox
squares.

## Tokens and CSS hooks

Stable classes/slots cover group, item, label, description, and parent with
Atom state/value/orientation attributes and Root `data-size`. Public group
token is `--brick-checkbox-group-gap`; public Checkbox tokens style the shared
visual. Supply replacement artwork through `indicator` on Item or Parent.

## Customization

Use Root size/orientation and Atom state props first, then public group and
Checkbox tokens. Customize public parts with composition or part-level class/
style without replacing private marks.

## Responsive behavior

Vertical groups stack; horizontal groups can wrap under constraint. Item text
may wrap while controls retain target geometry. Logical layout supports RTL.

## Accessibility

Give Root a group name or compose it inside Fieldset with a Legend. Atom owns
item/parent semantics, state, form participation, and generated item
relationships. Parent labels must explain the aggregate action.

## Composition, native props, and refs

All parts forward Atom/native props. In composed Item/Parent output Brick
injects its visual before existing children. Refs target the rendered elements
listed under anatomy.

## Examples

```tsx
<CheckboxGroup.Root
  aria-label="Notification channels"
  allValues={["email", "sms"]}
  value={value}
  onValueChange={setValue}
>
  <CheckboxGroup.Parent>Select all</CheckboxGroup.Parent>
  <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
  <CheckboxGroup.Item value="sms">SMS</CheckboxGroup.Item>
</CheckboxGroup.Root>
```

## Evidence

- [Playground](../../../playground/src/components/checkbox-group/CheckboxGroupPage.tsx)
- [Unit test](../../../test/components/checkbox-group/checkbox-group.test.tsx)
- [Type owner](../../../test/types/components/checkbox-group.test.ts)
- [Browser spec](../../../playground/tests/components/checkbox-group/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/checkbox-group/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/checkbox-group.md)

## Changelog

### Controllers, limits and linked labels

`useCheckboxGroup` exposes value, setValue, toggleValue and item helpers.
`CheckboxGroup.RootProvider value={controller}` supplies the same group behavior
to Item and Parent. Root accepts `maxSelectedValues`; selected choices remain
removable at the limit, and lowering a limit never discards controlled values.
Parent skips unavailable registered items and selects in Root `allValues` order.

For links, call `useCheckboxGroupItem({ value })` inside the group and spread its
binding on `Checkbox.Control`, with a sibling `Checkbox.Label` in `Checkbox.Root`.
When the surrounding Fieldset is required, set `required={false}` on that Field
Root: the group requires one eligible choice, not every individual checkbox.
Group validation ignores selected values without an enabled mounted form item.

See [`CHANGELOG.md`](CHANGELOG.md).
