# Field

Field coordinates one control’s label, description, error, and required state.

## When and where to use

Use it around one input, select, textarea, or compatible custom control.

## When not to use

Use Fieldset for a related control group. Field does not validate values,
manage data, or replace the control itself.

## Installation and imports

```tsx
import { Field } from "@flowstack-ui/brick/field";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<Field.Root name="email" required>
  <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
  <input type="email" />
  <Field.Description>Work email only.</Field.Description>
  <Field.Error>Please enter a valid email.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership

Public parts are `Root` (`div`), `Label` (`label`), `Description` (`p`),
`Error` (`p`), and `RequiredIndicator` (`span`) with matching element refs.
All parts wrap public Atom Field parts; Brick adds no private DOM.

## API

Root inherits Atom relationship, generated-id, required, disabled, invalid,
name, and control-ownership props and defaults `orientation` to `vertical`
(`horizontal` is also supported). RequiredIndicator accepts `fallback`.
Every part requires children and supports either one `asChild` element or
Atom `render`, never both.

## Visual recipes and states

Vertical layout stacks relationships; horizontal aligns label and control
regions and can fall back under constraint. Atom ownership marks Description
and Error for generated `aria-describedby` and state propagation.

## Tokens and CSS hooks

Stable classes/slots are `brick-field`, `brick-field-label`,
`brick-field-description`, `brick-field-error`, and
`brick-field-required-indicator` with their matching slots and Atom state/
orientation attributes. Public `--brick-field-*` tokens cover row/column gap,
control and label sizing, label/description/error typography and foreground,
disabled/optional/indicator colors, and indicator gap.

## Customization

Use orientation and Atom relationship props first, then public Field tokens.
Customize public parts through `className`, `style`, `asChild`, or `render`.

## Responsive behavior

Vertical layout follows available width. Horizontal layout uses a minimum
control width and must remain readable at zoom; applications choose when to
switch orientation. Logical spacing supports RTL.

## Accessibility

Atom generates or preserves ids and label/description/error relationships.
Use one visible Label, concise help, and actionable error text. Required and
invalid visual state must agree with the owned control.

## Composition, native props, and refs

Each part forwards its Atom/native props and uses a discriminated `asChild` or
`render` contract. Refs target the rendered elements listed under anatomy.

## Examples

```tsx
<Field.Root orientation="horizontal">
  <Field.Label htmlFor="city">City</Field.Label>
  <input id="city" />
</Field.Root>
```

## Evidence

- [Playground](../../../playground/src/components/field/FieldPage.tsx)
- [Unit test](../../../test/components/field/field.test.tsx)
- [Type owner](../../../test/types/components/field.test.ts)
- [Browser spec](../../../playground/tests/components/field/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/field/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/field.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
