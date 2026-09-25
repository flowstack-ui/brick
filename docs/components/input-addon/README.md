# InputAddon

A noninteractive external input segment.

## When and where to use

Use for a noneditable URL prefix, unit or suffix attached to Input.

## When not to use

Use Input adornments for interior content, Field.Label for naming, and Button for actions.

## Installation and imports

Public exports: `InputAddon` and `InputAddonProps`.

```tsx
import { InputAddon } from "@flowstack-ui/brick/input-addon";
import "@flowstack-ui/brick/styles.css";
```

Root imports also work. Modular builds load `@flowstack-ui/brick/styles/core.css`
plus `@flowstack-ui/brick/styles/input-addon.css` and the styles of every composed owner.

## Quick start

```tsx
import { Group, Input, InputAddon } from "@flowstack-ui/brick";

<Group attached>
  <InputAddon>https://</InputAddon>
  <Input aria-label="HTTPS website address" />
</Group>
```

## Anatomy and DOM ownership

One `span` with `.brick-input-addon`, `data-slot` set to `input-addon`, `data-size`,
and `data-variant`. Responsive attributes serialize inherited recipes.
The ref targets `HTMLSpanElement`; there is no native input or hidden control.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | ResponsiveValue<ControlSize>: 2xs, xs, sm, md, lg, xl, 2xl | `lg` |
| `variant` | ResponsiveValue<FieldVariant>: outline, surface, soft, subtle, ghost, plain, underline | `outline` |
| radius | Radius token | control |

Native span props, children, className and style reach the same element.

## Visual recipes and states

Outline addons use a subdued fill to distinguish noneditable content; surface
is raised, soft has a subtle border, subtle a transparent border, ghost/plain
are transparent, and underline has only a bottom border with square corners.
An addon does not own interactive hover, focus, validation, disabled or loading states.
Appearance follows the surrounding theme; there is no motion.

## Tokens and CSS hooks

The radius hook is `--brick-input-addon-radius`. Shared control sizing supplies
height, padding and value typography. Stable class: `.brick-input-addon`;
stable slot: `input-addon`. Use semantic surface, text and border tokens.

## Customization

Prefer size, variant and radius. Group attached removes inner corners. The
radius prop does not override underline's square geometry. Native style can
set scoped tokens without introducing a CSS processing requirement.

## Responsive behavior

Size and variant accept initial/sm/md/lg/xl values. Sparse values inherit.
Logical layout supports RTL. Addons do not shrink their text: constrain the
whole composition sensibly and use concise units at narrow widths and zoom.

## Accessibility

InputAddon does not create a tab stop or an accessible label. Associate meaningful
units and prefixes through Field.Description; use a real Field.Label.
Do not use an addon as a button or nest actions inside it.

## Composition, native props, and refs

Compose Group attached, InputAddon and Input. Set matching size and variant
explicitly on children; Group does not propagate field recipes. Group metadata,
native props and the forwarded ref reach the span.

## Examples

See the [attached prefix example](../../../playground/src/components/input-addon/examples/InputAddonBasic.tsx)
and [Input addon/action compositions](../../../playground/src/components/input/examples/InputAddons.tsx).

## Evidence

- [Playground](../../../playground/src/components/input-addon/InputAddonPage.tsx)
- [Unit](../../../test/components/input-addon/input-addon.test.tsx)
- [Types](../../../test/types/components/input-addon.test.ts)
- [Browser](../../../playground/tests/components/input-addon/behavior.spec.ts)
- [Visual](../../../playground/tests/components/input-addon/visual.spec.ts)
- [Manual](../../../playground/manual-tests/input-addon.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
