# Checkbox


## When and where to use

Use it for independent submitted choices that can be checked or unchecked.

## When not to use

Use Toggle for persistent commands, RadioGroup for one choice from a set, and
CheckboxGroup when related choices need group ownership.

## Installation and imports

```tsx
import { Checkbox } from "@flowstack-ui/brick/checkbox";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/checkbox.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Checkbox name="updates" value="yes">Email updates</Checkbox>
```

## Anatomy and DOM ownership

For plain non-interactive text, the callable Checkbox remains the short form.
Do not put links or buttons inside it. Use the compound composition below
for linked labels. Root is a non-interactive Atom Field div; Control is the
existing checkbox button and automatic hidden form proxy. Label is a separate
native label associated with Control. Description and Error reuse Atom Field
relationships. This composition needs checkbox.css, not field.css.

Atom Root renders a button-like checkbox control and receives an
`HTMLButtonElement` ref. Brick inserts a private aria-hidden control span,
forced-mounted Atom Indicator, and decorative SVG before consumer children.

## API

Public exports are `Checkbox`, `CheckboxProps`, and `CheckboxSize`.

Additional exports are `CheckboxRoot`, `CheckboxControl`, `CheckboxLabel`,
`CheckboxDescription`, `CheckboxError` and their corresponding Props types.
The same parts are available as `Checkbox.Root`, `Checkbox.Control`,
`Checkbox.Label`, `Checkbox.Description` and `Checkbox.Error`.

### Compound API

| Part | Props and responsibility |
| --- | --- |
| Root | Responsive xs/sm/md/lg size (md default), variant, tone, radius, density, labelPlacement; disabled, readOnly, required, invalid and validationBehavior; Field native/composition props. Ref: HTMLDivElement. |
| Control | checked, defaultChecked, onCheckedChange, name, value, form, inputRef/inputProps, indicator, visual overrides and native control props. Ref: HTMLButtonElement. No children, render, asChild or independent id. |
| Label | Field label props, including requiredIndicator; native label association is automatic. Ref: HTMLLabelElement. |
| Description | Field description props. Ref: HTMLParagraphElement. |
| Error | Field error props including match and forceMatch. Ref: HTMLParagraphElement. |

Place size and field-level availability/validation on Root. Put checkbox state
and submission props on Control, not Root. Root replaces Field.Root for this
one control; keep exactly one Control and Label as direct children, optionally
followed by Description and Error. For externally owned forms, give Control
the form id. Do not add another hidden input. Supply custom decorative artwork
through `indicator={<Checkbox.Indicator indeterminate={mixed}>checked</Checkbox.Indicator>}`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | Responsive `xs`, `sm`, `md`, `lg` | `md` |
| `variant` | `solid`, `outline`, `subtle` | `solid` |
| `tone` | `neutral`, `accent`, `contrast`, `info`, `success`, `warning`, `danger` | `accent` |
| `radius` | `Radius` | `subtle` |
| `density` | `comfortable`, `compact` | `comfortable` |
| `labelPlacement` | `start`, `end` | `end` |
| `asChild` | `boolean` | `false` |

Checkbox inherits Atom checked/defaultChecked (`boolean | "indeterminate"`),
change, required, disabled, invalid, name, value, form, and native props.
`asChild: true` requires one element and excludes `render`; otherwise `render`
and normal children are available.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Checkbox is a styled binary or mixed-state form choice built on Atom Checkbox.

Size changes the complete row and visual control. The complete row remains the
clickable target, while hover, active, and focus-visible feedback is confined
to the visual checkbox square. Atom states drive checked, mixed, unchecked,
disabled, invalid, and read-only output.

## Tokens and CSS hooks

Stable public root hook/slot is `.brick-checkbox`/`checkbox`, with Atom state
attributes and `data-size`. Public component tokens are
`--brick-checkbox-target-min-size`, `--brick-checkbox-control-size`,
`--brick-checkbox-row-padding-inline`, `--brick-checkbox-gap`,
`--brick-checkbox-radius`, `--brick-checkbox-border-width`,
`--brick-checkbox-control-background`, `--brick-checkbox-control-border`,
`--brick-checkbox-control-checked-background`,
`--brick-checkbox-control-checked-foreground`,
`--brick-checkbox-indicator-size`, `--brick-checkbox-label-foreground`,
`--brick-checkbox-description-foreground`, and
`--brick-checkbox-invalid-foreground`. Internal mark DOM is not composable.

## Customization

Use size and state props first, then semantic and public Checkbox tokens.
Customize the root with `className`/`style`; use `indicator` to replace artwork.

## Responsive behavior

The row can wrap while the visual control keeps its target size. Logical
spacing supports RTL; surrounding form layout owns breakpoints.

## Accessibility

Atom owns checkbox semantics, keyboard activation, state, form participation,
and focus. Provide a clear label, do not express state only by color, and use
indeterminate only when its group meaning is understandable.

## Composition, native props, and refs

Atom/native props are forwarded. In `asChild`, Brick injects its visual before
the child’s existing children. Ref targets the composed checkbox element.

## Examples

### Linked consent

```tsx
<Checkbox.Root required>
  <Checkbox.Control name="consent" value="accepted" />
  <Checkbox.Label>
    I agree to the <Link href="/terms">terms and conditions</Link>.
  </Checkbox.Label>
  <Checkbox.Description>Read the terms before agreeing.</Checkbox.Description>
  <Checkbox.Error>Please accept the terms to continue.</Checkbox.Error>
</Checkbox.Root>
```

Plain label text activates the checkbox. Link activation remains independent;
do not add click forwarding or stopPropagation handlers. A disabled/read-only
choice does not automatically disable its reference links. Control's minimum
target and the first label line align; supporting text stays in the label column.
Root's stable hook is `.brick-checkbox-root`; the public parts use
`.brick-checkbox-compound-control`, `.brick-checkbox-label`,
`.brick-checkbox-description`, and `.brick-checkbox-error`. Existing checkbox
tokens apply; the visual square stays managed while indicator artwork is replaceable.

```tsx
<Checkbox checked="indeterminate" aria-label="Select some rows" />
```

## Evidence

- [Playground](../../../playground/src/components/checkbox/CheckboxPage.tsx)
- [Unit test](../../../test/components/checkbox/checkbox.test.tsx)
- [Type owner](../../../test/types/components/checkbox.test.ts)
- [Browser spec](../../../playground/tests/components/checkbox/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/checkbox/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/checkbox.md)

## Changelog

### Controller and native input integration

`useCheckbox` and `Checkbox.RootProvider` offer external access to the same
controlled state. Pass the controller as `value`; use `inputValue` for its native
submitted value. `Checkbox.Root` remains the compound Field wrapper, not a second
state owner. `inputRef` reaches the automatically rendered form input; the normal
ref still reaches the checkbox button. `inputProps` accepts non-owned input
attributes and events without replacing checked, disabled, name or validation.

Use `indicator={<Checkbox.Indicator>…</Checkbox.Indicator>}` for custom artwork;
the `indeterminate` slot can provide a separate mixed-state mark. Do not add a
second checkbox, interactive artwork or manual hidden input.

See [`CHANGELOG.md`](CHANGELOG.md).
