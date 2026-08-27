# ZStack

ZStack is Brick's depth-layout primitive. It places authored children in one shared CSS Grid cell so layers overlap without absolute positioning or visual reordering.

## When and where to use

Use ZStack for general overlays such as labels over artwork, controls over a map, and layered diagrams. Use Stack for linear flow, Grid for distinct tracks, and Surface media anatomy for ordinary image- or video-backed cards and heroes.

## When not to use

Do not use ZStack for ordinary rows, columns, grid tracks, or as a replacement
for Surface's media anatomy. Do not overlap controls when a decorative layer
would block their pointer or focus access.

## Installation and imports

```tsx
import { ZStack } from "@flowstack-ui/brick/z-stack";
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/z-stack.css";
```

The complete `@flowstack-ui/brick/styles.css` stylesheet also includes ZStack.

Public exports are `ZStack`, `ZStackRoot`, `ZStackItem`, `ZStackRootProps`,
`ZStackItemProps`, `ZStackElement`, `ZStackItemElement`, `ZStackAlign`,
`ZStackJustify`, `ZStackItemAlign`, `ZStackItemJustify`, and
`ResponsiveValue`.

## Quick start

```tsx
<ZStack.Root align="center" justify="center">
  <Image.Root><Image.Content alt="Product" src="/product.webp" /></Image.Root>
  <ZStack.Item align="end" justify="start"><Badge>New</Badge></ZStack.Item>
</ZStack.Root>
```

## Anatomy and DOM ownership

Root renders one host. Every direct child occupies the same grid area. Item is
optional and either renders one selected host or decorates its one child. The
root isolates the layer group and keeps direct children at one internal
stacking level, so later authored overlays remain above earlier positioned
media.

## API

Root renders `div` by default and supports the Stack semantic host set. `align` and `justify` accept `stretch`, `start`, `center`, or `end` and default to `stretch`. Item renders `div` by default or decorates one child with `asChild`; its `align` and `justify` add `auto` as the default.

Root `isolation="open"` deliberately lets a named Item layer participate in an
ancestor stacking context. Keep the default `contained` for ordinary overlays.
Item `layer` supplies the closed `base`, `content`, and `action` depth levels;
`edgeSpacing` accepts the same responsive spacing grammar as Stack gap.

| Prop | Values | Root default |
| --- | --- | --- |
| `as` | supported semantic hosts | `div` |
| `align` | `stretch`, `start`, `center`, `end` | `stretch` |
| `justify` | `stretch`, `start`, `center`, `end` | `stretch` |
| `isolation` | `contained`, `open` | `contained` |
| `slot` | `string` | `z-stack` |

| Item prop | Values | Default |
| --- | --- | --- |
| `align`, `justify` | `auto`, `stretch`, `start`, `center`, `end` | `auto` |
| `edgeSpacing` | responsive Brick spacing value | none |
| `layer` | `base`, `content`, `action` | `base` |

Root exposes `.brick-z-stack` and `data-slot="z-stack"`. Item exposes `.brick-z-stack-item` and `data-slot="z-stack-item"`. Placement metadata is emitted only for non-default recipes. ZStack exposes no public CSS variables.

## Visual recipes and states

Root and Item alignment independently support stretch, start, center, and end.
Named layers and edge spacing express overlay participation without arbitrary
coordinates. ZStack has no interactive state, paint, radius, or motion.

## Tokens and CSS hooks

Stable hooks are `.brick-z-stack`, `.brick-z-stack-item`, their `data-slot`
values, and optional `data-align` and `data-justify`. There are no public
component variables.

## Customization

Use Brick props for placement. For a separately operable `LinkBox.Action`
over media, use `isolation="open"` on Root and `layer="action"` plus
`edgeSpacing` on the composed Item. Size and paint the authored children with
Surface, Image, or application-owned styles rather than painting ZStack.

## Responsive behavior

ZStack follows the size of its children and needs no viewport JavaScript. Root
and Item alignment accept `{ initial, sm?, md?, lg?, xl? }` values when the
same authored layers change logical placement. This never changes source,
paint, reading, or focus order. Use responsive Stack outside it when the
surrounding section changes linear axis.

## Accessibility

ZStack adds no role or interaction. Authored DOM order remains reading, focus, and paint order. Keep that order meaningful and ensure decorative layers do not block pointer or keyboard access to controls below them.

## Composition, native props, and refs

Native attributes and the root ref pass to the selected host. Item supports
`asChild` for applying placement to one existing element without another host.

## Examples

Use a bottom-start Item for a caption over authored artwork, or a centered Item
for non-blocking status content over a diagram. Prefer Surface media anatomy
when the composition is simply media, scrim, and foreground content.

## Evidence

- [Playground route source](../../../playground/src/components/z-stack/)
- [Focused component tests](../../../test/components/z-stack/)
- [Type tests](../../../test/types/components/z-stack.test.ts)
- [Browser behavior](../../../playground/tests/components/z-stack/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/z-stack/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/z-stack.md)

## Changelog

See the [ZStack changelog](CHANGELOG.md).
