# Form

Form is Brick’s styled form boundary over Atom’s native form behavior.

## When and where to use

Use it as the submission boundary around Brick fields and fieldsets.

## When not to use

Do not use it as a form state library, schema validator, data client, or
replacement for Field relationships.

## Installation and imports

```tsx
import { Form } from "@flowstack-ui/brick/form";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/form.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Form action="/profile" method="post">
  <Field.Root name="name"><Field.Label>Name</Field.Label><input /></Field.Root>
  <Button type="submit">Save</Button>
</Form>
```

## Anatomy and DOM ownership

Form renders Atom `Form.Root` as a native `form`, adds no private DOM, and
forwards an `HTMLFormElement` ref.

## API

Public exports are `Form` and `FormProps`.

| Prop | Values | Default |
| --- | --- | --- |
| `asChild` | `boolean` | `false` |

Form adds no component-specific prop. It inherits Atom/native form props,
submission callbacks/state attributes, and a discriminated composition API:
`asChild: true` requires one element and excludes `render`; otherwise `render`
and normal children are available.

## Visual recipes and states

Form supplies consistent vertical spacing only. Browser validation, native
submission/reset, Atom submission state, and child invalid/disabled states
remain behavior rather than visual recipes.

## Tokens and CSS hooks

Stable hooks are `.brick-form`, overridable `data-slot` with default `form`,
Atom form state attributes, and `--brick-form-gap` plus
`--brick-form-fieldset-gap`.

## Customization

Set native/Atom form behavior first, then public Form tokens. Use `className`
or `style` for scoped layout exceptions.

## Responsive behavior

Form follows available width and does not choose columns or breakpoints.
Compose responsive layout inside it.

## Accessibility

Use native labeled controls, Field/Fieldset relationships, clear errors, and a
discoverable submit action. Form does not announce custom validation or
submission results automatically.

Fieldset is conditional, not a required wrapper around every Form. Add it when
several controls answer one meaningful group question and can be named by one
Legend. For a simple sequence of independently labelled text fields, compose
the Fields directly under Form and let Form own their vertical rhythm.

## Composition, native props, and refs

Native form props are forwarded. `asChild` and `render` follow the discriminated
API above; preserve form semantics. Ref targets the rendered form.

## Examples

```tsx
<Form onSubmit={(event) => { event.preventDefault(); }}>
  {/* fields */}
  <Button type="submit">Submit</Button>
</Form>
```

## Evidence

- [Playground](../../../playground/src/components/form/FormPage.tsx)
- [Unit test](../../../test/components/form/form.test.tsx)
- [Type owner](../../../test/types/components/form.test.ts)
- [Browser spec](../../../playground/tests/components/form/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/form/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/form.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
