# Stack

Stack is Brick's one-dimensional layout primitive. Use VStack for a fixed
vertical flow, HStack for a fixed horizontal row, and Stack when the axis
changes at a Brick breakpoint. Stack.Item controls how an individual child
uses available space.

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
`VStackProps`, `StackElement`, `StackDirection`, `StackGap`, `SpacingValue`, `StackAlign`,
`StackJustify`, `Stack.Item`, `StackItemProps`, `StackItemElement`,
`StackItemAlign`, `StackItemFlex`, `ResponsiveValue`, and `StackBreakpoint`.

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

When Stack renders `ul` or `ol`, it removes the browser's visual list margin
and markers while retaining native list semantics and authored `li` children.
This lets semantic peer rows share the same logical alignment as other Stack
hosts without consumer reset CSS.

## API

| Prop | Values | Stack default |
| --- | --- | --- |
| `as` | `div`, `span`, `section`, `article`, `nav`, `header`, `footer`, `main`, `aside`, `ul`, `ol`, `li` | `div` |
| `direction` | `row`, `column` | `column` |
| `gap` | numeric factor, explicit CSS value, legacy token, or responsive object | `0` |
| `align` | `stretch`, `start`, `center`, `end`, `baseline` | `stretch` |
| `justify` | `start`, `center`, `end`, `between`, `around`, `evenly` | `start` |
| `wrap` | `boolean` | `false` |
| `startSpacing` | spacing value or responsive object | `0` |
| `endSpacing` | spacing value or responsive object | `0` |
| `slot` | `string` | `stack` |
| `children` | `ReactNode` | optional |

Direction, gap, align, justify, wrap, and logical edge spacing accept either a
plain value or a non-empty `{ initial?, sm?, md?, lg?, xl? }` object. Without
`initial`, the normal Stack default applies below the first supplied
breakpoint. The breakpoint thresholds
are 30rem, 48rem, 64rem, and 80rem, matching Show and Hide.

Use numeric factors for ordinary new layout work: `gap={8}` calculates eight
times `--brick-space-1`. Nonnumeric strings such as `"2rem"`,
`"var(--section-gap)"`, and `"clamp(1rem, 2vw, 2.5rem)"` are explicit CSS
values. Existing string tokens `"0"` through `"6"` preserve the original
nonlinear Brick scale. See [Layout spacing values](../../guides/spacing-values.md)
for compatibility, validation, and responsive examples.

HStack fixes `direction="row"` and defaults `align="center"`. VStack fixes
`direction="column"` and defaults `align="stretch"`. Their prop types omit
`direction`; use Stack when direction is selected dynamically.

Native global attributes, events, ARIA/data attributes, `className`, `style`,
slot hook, and an `HTMLElement` ref pass to the root.

## Visual recipes and states

Stack uses native flexbox. Legacy string gaps map to `--brick-space-0` through
`--brick-space-6`; numeric factors calculate from `--brick-space-1`; explicit
CSS values pass through. Alignment controls the cross axis; justify controls
the main axis; wrapping is opt-in. The root has `min-inline-size: 0` so
shrinking and truncating children can remain contained.

Stack has no interactive state, animation, background, border, radius,
typography, size, margin, position, or overflow. Padding remains zero except
for explicitly requested logical main-axis edge spacing.

### Stack.Item

`Stack.Item` renders a `div` by default and supports `asChild` for applying the
flex recipe to an existing direct child. `content` is content-sized and
shrinkable, `fixed` neither grows nor shrinks, `auto` grows from its content
basis, and numeric values `1` through `4` divide available space
proportionally. Both `flex` and `align` accept responsive values, allowing an
item to remain content-sized in a mobile column and become proportional in a
desktop row. `align` overrides the parent's cross-axis alignment.

Use the default Item wrapper when proportional siblings need equal outer
tracks despite different child padding or borders. Use `asChild` when the
existing child itself should be the flex item and its own box geometry is an
intentional part of allocation. In `asChild` composition, Stack preserves the
child component's declared minimum block size, so controls such as Button do
not become shorter merely because they participate in a Stack flex recipe.

## Tokens and CSS hooks

Stable hooks:

```text
.brick-stack
[data-slot="stack"]
[data-direction]
[data-gap]
```

Optional metadata uses `data-align`, `data-justify`, and `data-wrap`.
Logical edge spacing uses `data-start-spacing` and `data-end-spacing`, with
breakpoint-suffixed forms for responsive overrides.
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

Use responsive Stack values when the same content changes arrangement. Use
Show and Hide only when the actual interface changes. Direction and logical
start/end spacing follow the inherited writing direction.

```tsx
<Stack direction={{ initial: "column", lg: "row" }} gap={{ initial: 4, lg: 8 }}>
  <Stack.Item flex={1}><Surface>Copy</Surface></Stack.Item>
  <Stack.Item flex={2}><Image.Root>...</Image.Root></Stack.Item>
</Stack>
```

## Accessibility

Stack adds no accessibility semantics. Choose a valid semantic host, preserve
logical DOM order, name repeated landmarks, and use valid list children.

Reverse directions, reverse wrapping, and item ordering are deliberately
excluded because visual order must not diverge from reading and focus order.
Stack supports zoom, text resize, text-spacing overrides, forced colors,
localization, and RTL without changing child semantics.

## Composition, native props, and refs

Use `as` to select an approved semantic root. Root does not expose `asChild`;
Stack.Item does. Reverse direction, item order, arbitrary breakpoints, and raw
grow/shrink/basis props remain excluded.

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
