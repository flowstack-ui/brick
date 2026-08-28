# Bleed

Bleed lets authored content extend beyond the inset of its immediate container
using responsive, theme-aware logical spacing.

## When and where to use

Use Bleed for edge media, editorial artwork, or another deliberate child that
must cross a parent's padding while the parent keeps owning that inset.

## When not to use

Use Frame for size constraints, Stack/Grid for arrangement, Surface for paint,
and application CSS for unrelated positioning. Do not use Bleed to conceal an
incorrect container measure.

## Installation and imports

```tsx
import { Bleed } from "@flowstack-ui/brick/bleed";
import "@flowstack-ui/brick/styles.css";
```

With modular styles load `styles/core.css` once and `styles/bleed.css`.

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/bleed.css";
```

## Quick start

```tsx
<Surface inset="lg">
  <Bleed inline={6} blockStart={6}>
    <Image.Root src="/editorial.jpg">...</Image.Root>
  </Bleed>
</Surface>
```

## Anatomy and DOM ownership

Bleed renders one selected native host or enhances one existing host with
`asChild`. It adds no descendants, role, focus target, or child reordering.

## API

Public exports are `Bleed`, `BleedProps`, and `BleedElement`.

| Prop | Value | Default |
| --- | --- | --- |
| `as` | `div`, `span`, `section`, `article`, `aside`, `main`, `header`, `footer`, `nav`, `ul`, `ol`, `li` | `div` |
| `asChild` | `boolean` | `false` |
| `inline` | responsive Brick spacing value | `0` |
| `block` | responsive Brick spacing value | `0` |
| `inlineStart` | responsive Brick spacing value | inherited from `inline` |
| `inlineEnd` | responsive Brick spacing value | inherited from `inline` |
| `blockStart` | responsive Brick spacing value | inherited from `block` |
| `blockEnd` | responsive Brick spacing value | inherited from `block` |
| `slot` | `string` | `bleed` |

Spacing props accept non-negative Brick spacing values or responsive values
with `initial` and optional `sm`, `md`, `lg`, and `xl` overrides. Directional
values override their matching axis edge. `asChild` preserves one non-Fragment
child.

## Visual recipes and states

Bleed has no visual recipe or interaction state. It changes only logical
margin, converting public positive spacing into negative margins internally.

## Tokens and CSS hooks

Stable hooks are `.brick-bleed`, `data-bleed`, `data-slot`, and
`data-slot="bleed"`.
Spacing variables are implementation details generated from the public props.

## Customization

Prefer the spacing props. Bleed intentionally has no paint, size, overflow,
position, or z-index customization surface.

## Responsive behavior

Values follow Brick's mobile-first breakpoint grammar and carry forward until
a later authored value replaces them.

## Accessibility

Bleed adds no semantics or behavior. Verify the resulting composition does not
introduce horizontal page scrolling, crop meaningful content, or obscure
focus indicators.

## Composition, native props, and refs

Native props and an `HTMLElement` ref target the one host. Compose Bleed inside
the component whose inset it crosses; it does not replace that owner's layout.

## Examples

```tsx
<Bleed asChild blockStart={{ initial: 4, lg: 8 }}>
  <figure>...</figure>
</Bleed>
```

## Evidence

- [Playground source](../../../playground/src/components/bleed/)
- [Unit tests](../../../test/components/bleed/)
- [Type tests](../../../test/types/components/bleed.test.ts)
- [Browser behavior](../../../playground/tests/components/bleed/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/bleed/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/bleed.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
