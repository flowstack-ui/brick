# Checkbox

Checkbox is a styled binary or mixed-state form choice built on Atom Checkbox.

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

Atom Root renders a button-like checkbox control and receives an
`HTMLButtonElement` ref. Brick inserts a private aria-hidden control span,
forced-mounted Atom Indicator, and decorative SVG before consumer children.

## API

Public exports are `Checkbox`, `CheckboxProps`, and `CheckboxSize`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `asChild` | `boolean` | `false` |

Checkbox inherits Atom checked/defaultChecked (`boolean | "indeterminate"`),
change, required, disabled, invalid, name, value, form, and native props.
`asChild: true` requires one element and excludes `render`; otherwise `render`
and normal children are available.

## Visual recipes and states

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
Customize the root with `className`/`style`; do not replace private marks.

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

See [`CHANGELOG.md`](CHANGELOG.md).
