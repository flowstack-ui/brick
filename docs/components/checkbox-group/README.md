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
| `size` | `sm`, `md`, `lg` | `md` |
| `orientation` | `vertical`, `horizontal` | `vertical` |
| `asChild` | `boolean` | `false` |

Root inherits Atom group value/defaultValue/change, orientation, disabled,
invalid, required, name/form, and relationship props and adds
the shared size recipe.
Item requires Atom `value`. Parent inherits Atom aggregate behavior including
`allValues`. Label and Description require children. Every part uses the
discriminated `asChild` or `render` composition contract.

## Visual recipes and states

Root size cascades shared row/control geometry. Orientation arranges Items.
Atom owns item checked/mixed state, aggregate Parent state, values, disabled/
invalid state, and form behavior.

## Tokens and CSS hooks

Stable classes/slots cover group, item, label, description, and parent with
Atom state/value/orientation attributes and Root `data-size`. Public group
token is `--brick-checkbox-group-gap`; public Checkbox tokens style the shared
visual. Internal mark DOM is not composable.

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
<CheckboxGroup.Root value={value} onValueChange={setValue}>
  <CheckboxGroup.Parent allValues={["email", "sms"]}>Select all</CheckboxGroup.Parent>
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

See [`CHANGELOG.md`](CHANGELOG.md).
