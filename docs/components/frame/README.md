# Frame

Frame owns responsive logical size constraints for one local element. It does
not own paint, spacing, child layout, parent participation, aspect ratio,
overflow, semantics, or behavior.

## When and where to use

Use Frame for a minimum-width rail, maximum-width copy region, minimum-height
media canvas, or maximum-height boundary around a ScrollArea.

## When not to use

Use Container for shared page measure, Stack/Grid for arrangement, their Item
parts for parent participation, Surface for paint, AspectRatio for ratio, and
ScrollArea for scrolling. Keep product-specific calculations in a Block or
application until they qualify as a reusable primitive rule.

## Installation and imports

```tsx
import { Frame } from "@flowstack-ui/brick";
// or
import { Frame } from "@flowstack-ui/brick/frame";

import "@flowstack-ui/brick/styles.css";
```

With modular styles, load `core.css` once and `frame.css` on every route that
renders Frame.

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/frame.css";
```

Public exports are `Frame`, `FrameProps`, `FrameElement`, `FrameLength`, and
`ResponsiveValue`.

## Quick start

```tsx
<Frame maxInlineSize={{ initial: "100%", lg: "68ch" }}>
  <Text>Readable content</Text>
</Frame>
```

## Anatomy and DOM ownership

Frame renders one selected native host. With `asChild`, it enhances exactly one
existing element and preserves that element's props, style, events, and ref.

```html
<div class="brick-frame" data-frame data-slot="frame" style="--brick-frame-max-inline-size:68ch">...</div>
```

## API

| Prop | Value | Default |
| --- | --- | --- |
| `as` | `div`, `span`, `section`, `article`, `aside`, `main`, `header`, `footer`, `nav`, `ul`, `ol`, `li` | `div` |
| `asChild` | `boolean` | `false` |
| `inlineSize` | responsive `string \| number` | native `auto` |
| `minInlineSize` | responsive `string \| number` | native `auto` |
| `maxInlineSize` | responsive `string \| number` | native `none` |
| `blockSize` | responsive `string \| number` | native `auto` |
| `minBlockSize` | responsive `string \| number` | native `auto` |
| `maxBlockSize` | responsive `string \| number` | native `none` |
| `slot` | `string` | `frame` |

A responsive value is any non-empty subset of
`{ initial?, sm?, md?, lg?, xl? }`. Without `initial`, native intrinsic sizing
remains active below the first supplied breakpoint. A nonzero number is
serialized as pixels; strings accept valid CSS values such as `rem`, `ch`,
percentages, `min()`, `max()`, and `clamp()`.

## Visual recipes and states

Frame has no visual recipe or interactive state. It only resolves authored
logical constraints. Unset properties retain native CSS sizing behavior.

## Tokens and CSS hooks

Stable hooks are `.brick-frame`, `data-frame`, `data-slot`, `data-slot="frame"`, and
`--brick-frame-inline-size`, `--brick-frame-min-inline-size`,
`--brick-frame-max-inline-size`, `--brick-frame-block-size`,
`--brick-frame-min-block-size`, and `--brick-frame-max-block-size`, each with
optional `-sm`, `-md`, `-lg`, and `-xl` suffixes.

## Customization

Choose the six props first. Scoped CSS remains appropriate for product-specific
calculations or geometry that is not a simple size constraint; report repeated
fallbacks so the public grammar can be reassessed.

## Responsive behavior

Values are mobile-first. Each authored value continues upward until another
standard Brick breakpoint replaces it. No JavaScript viewport detection runs.
Every Frame keeps its constraint variables locally scoped, so a parent's base
or optional breakpoint values never replace a nested Frame's values.

## Accessibility

Frame adds no role, label, focusability, state, or keyboard behavior. Verify
that constraints do not clip focus indicators or hide long content at zoom,
narrow widths, RTL, or vertical writing modes. `maxBlockSize` does not make
overflow reachable by itself.

## Composition, native props, and refs

```tsx
<Grid.Item asChild>
  <Frame minInlineSize={{ initial: 0, lg: "17rem" }}>...</Frame>
</Grid.Item>
```

```tsx
<Frame maxBlockSize={{ initial: "18rem", lg: "24rem" }}>
  <ScrollArea.Root>
    <ScrollArea.Viewport>...</ScrollArea.Viewport>
  </ScrollArea.Root>
</Frame>
```

Frame owns the constraint; Grid.Item owns grid participation; ScrollArea owns
overflow. Native attributes, events, `className`, `style`, children, and the
HTMLElement ref pass through.

Frame's constraint declarations live in Brick's `brick.utilities` cascade
layer, after component defaults and before effects. This makes an explicitly
authored Frame constraint reliable on a composed finished-component host
without `!important` or stylesheet import-order dependence.

## Examples

### Media canvas minimum height

```tsx
<Frame minBlockSize={{ initial: "18rem", lg: "28rem" }}>
  <Surface>...</Surface>
</Frame>
```

### One host with Surface paint

```tsx
<Frame asChild maxInlineSize="44rem">
  <Surface as="article">...</Surface>
</Frame>
```

## Evidence

- [Focused component tests](../../../test/components/frame/)
- [Type tests](../../../test/types/components/frame.test.ts)
- [Playground evidence](../../../playground/src/components/frame/)
- [Manual protocol](../../../playground/manual-tests/frame.md)
- [Browser behavior](../../../playground/tests/components/frame/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/frame/visual.spec.ts)

## Changelog

See the [Frame changelog](CHANGELOG.md) and the
[package changelog](../../../CHANGELOG.md).
