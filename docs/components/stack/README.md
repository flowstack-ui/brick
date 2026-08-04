# Stack

Stack is Brick's one-dimensional layout primitive. Use Stack or VStack for
vertical flows and HStack for horizontal rows. All three share one rendered
contract and tokenized spacing scale.

## When and where to use

Use Stack for one-axis content flows, action rows, metadata, status groups,
wrapping controls, and ordinary alignment or distribution.

## When not to use

Use Grid when rows and columns both matter, Container for page width and
gutters, Surface or Card for paint, and native structure when no reusable
layout responsibility exists. Stack is not a generic Box or responsive style
system.

## Installation and imports

```tsx
import { HStack, Stack, VStack } from "@flowstack-ui/brick";
// or
import { HStack, Stack, VStack } from "@flowstack-ui/brick/stack";

import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/stack.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Public exports are `Stack`, `HStack`, `VStack`, `StackProps`, `HStackProps`,
`VStackProps`, `StackElement`, `StackDirection`, `StackGap`, `StackAlign`, and
`StackJustify`.

## Quick start

```tsx
<VStack gap="3">
  <Text as="h2" variant="title-md">Account settings</Text>
  <Text as="p" tone="secondary">Manage your workspace details.</Text>
  <HStack gap="2" wrap>
    <Button>Save changes</Button>
    <Button tone="neutral" variant="outline">Cancel</Button>
  </HStack>
</VStack>
```

## Anatomy and DOM ownership

Stack renders exactly one selected native element:

```tsx
<Stack gap="3">…</Stack>
```

```html
<div
  class="brick-stack"
  data-direction="column"
  data-gap="3"
  data-slot="stack"
>…</div>
```

There is no Atom primitive, wrapper, role, generated ID, or reordered content.
The selected element is the ref target.

## API

| Prop | Values | Stack default |
| --- | --- | --- |
| `as` | `div`, `span`, `section`, `article`, `nav`, `header`, `footer`, `main`, `aside`, `ul`, `ol`, `li` | `div` |
| `direction` | `row`, `column` | `column` |
| `gap` | `0`, `1`, `2`, `3`, `4`, `5`, `6` | `0` |
| `align` | `stretch`, `start`, `center`, `end`, `baseline` | `stretch` |
| `justify` | `start`, `center`, `end`, `between`, `around`, `evenly` | `start` |
| `wrap` | `boolean` | `false` |
| `slot` | `string` | `stack` |
| `children` | `ReactNode` | optional |

HStack fixes `direction="row"` and defaults `align="center"`. VStack fixes
`direction="column"` and defaults `align="stretch"`. Their prop types omit
`direction`; use Stack when direction is selected dynamically.

Native global attributes, events, ARIA/data attributes, `className`, `style`,
slot hook, and an `HTMLElement` ref pass to the root.

## Visual recipes and states

Stack uses native flexbox. Gap values map to `--brick-space-0` through
`--brick-space-6`. Alignment controls the cross axis; justify controls the main
axis; wrapping is opt-in. The root has `min-inline-size: 0` so shrinking and
truncating children can remain contained.

Stack has no interactive state, animation, background, border, radius,
typography, size, margin, padding, position, or overflow.

## Tokens and CSS hooks

Stable hooks:

```text
.brick-stack
[data-slot="stack"]
[data-direction]
[data-gap]
```

Optional metadata uses `data-align`, `data-justify`, and `data-wrap`.
The root always exposes `data-slot`, `data-direction`, and `data-gap`.

Public variable:

- `--brick-stack-gap`

## Customization

Use layout props first, then the public gap variable or ordinary local CSS:

```tsx
<VStack
  gap="2"
  style={{
    "--brick-stack-gap": "1.5rem",
    border: "2px dashed var(--brick-color-accent-border)",
    padding: "var(--brick-space-4)",
  }}
>
  <Text>First</Text>
  <Text>Second</Text>
</VStack>
```

Local sizing and paint remain consumer responsibilities.

## Responsive behavior

Stack has no responsive objects or internal breakpoints. Use `wrap` for
content-driven row reflow and application CSS for layout-mode changes.
Direction and start/end follow the inherited writing direction.

## Accessibility

Stack adds no accessibility semantics. Choose a valid semantic host, preserve
logical DOM order, name repeated landmarks, and use valid list children.

Reverse directions, reverse wrapping, and item ordering are deliberately
excluded because visual order must not diverge from reading and focus order.
Stack supports zoom, text resize, text-spacing overrides, forced colors,
localization, and RTL without changing child semantics.

## Composition, native props, and refs

Use `as` to select an approved semantic host. Stack does not expose `asChild`,
`render`, child cloning, separators, responsive props, arbitrary gaps, or item
grow/shrink/order APIs. The `HTMLElement` ref targets the selected host.

## Examples

### Semantic navigation row

```tsx
<HStack as="nav" aria-label="Project actions" gap="2" wrap>
  <Button href="/projects">Projects</Button>
  <Button href="/settings" tone="neutral" variant="outline">Settings</Button>
</HStack>
```

### Semantic list

```tsx
<VStack as="ul" gap="2">
  <li>Design review</li>
  <li>Accessibility review</li>
</VStack>
```

## Evidence

- [Playground route source](../../../playground/src/components/stack/)
- [Focused component tests](../../../test/components/stack/)
- [Type tests](../../../test/types/components/stack.test.ts)
- [Browser behavior](../../../playground/tests/components/stack/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/stack/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/stack.md)

## Changelog

See the [Stack changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
