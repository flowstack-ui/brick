# Center

Center, Square, and Circle provide explicit two-axis centering and invariant
equal-size geometry without owning paint or content semantics.

## When and where to use

Use Center to align content within an authored region. Use Square for a fixed
equal-size centered region and Circle only when the same region is genuinely
circular. Square and Circle remain fixed when they participate in a flex row.

## When not to use

Use Stack for a row or column, Frame for unrelated logical constraints,
Surface for paint, AspectRatio for proportional media, and ZStack for
overlapping or positioned content.

## Installation and imports

```tsx
import { Center, Circle, Square } from "@flowstack-ui/brick/center";
import "@flowstack-ui/brick/styles.css";
```

With modular styles, load `core.css` once and `center.css` on every route that
renders this family.

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/center.css";
```

Public exports are `Center`, `Square`, `Circle`, `CenterElement`,
`CenterLength`, `CenterProps`, `SquareProps`, `CircleProps`, and
`ResponsiveValue`.

## Quick start

```tsx
<Center>
  <Text>Centered content</Text>
</Center>

<Square size="2rem">
  <Icon aria-hidden size="xs">{icon}</Icon>
</Square>

<Circle size="2rem">
  <Icon aria-hidden size="xs">{icon}</Icon>
</Circle>
```

## Anatomy and DOM ownership

Each export renders one `div` by default. Square and Circle add no wrapper
around Center's host. Their public identities are expressed through stable
classes and slots.

```html
<div class="brick-center" data-slot="center">...</div>
<div class="brick-center brick-square" data-slot="square">...</div>
<div class="brick-center brick-square brick-circle" data-slot="circle">...</div>
```

## API

| Prop | Value | Default |
| --- | --- | --- |
| `as` | `div`, `span`, `section`, `article`, `aside`, `main`, `header`, `footer`, `nav`, `ul`, `ol`, `li` | `div` |
| `asChild` | `boolean` | `false` |
| `inline` | `boolean` | `false` |
| `size` | required responsive `string \| number` on Square and Circle | none |
| `slot` | `string` | component identity |

A responsive size is a non-empty `{ initial?, sm?, md?, lg?, xl? }` object.
Without `initial`, Square or Circle keeps automatic baseline sizing below the
first supplied breakpoint. A nonzero number is
serialized as pixels, matching Frame; strings accept valid CSS lengths and
application custom properties.

## Visual recipes and states

Center uses flex centering and may opt into inline-flex. Square and Circle
apply the same responsive value to logical inline and block size and use fixed
flex participation. Circle additionally uses Brick's full-radius token. The
family has no interactive states or paint recipes.

## Tokens and CSS hooks

Stable hooks are `.brick-center`, `.brick-square`, `.brick-circle`,
`data-inline`, `data-slot`, and `--brick-center-size` with optional `-sm`,
`-md`, `-lg`, and `-xl` responsive suffixes.

## Customization

Choose `inline`, the semantic host, and the required Square or Circle `size`
before adding customization. The family exposes its size variables for a
bounded application calculation, but reusable paint and radius belong to
Surface and reusable SVG presentation belongs to Icon.

## Responsive behavior

Responsive sizes are mobile first and carry forward until another standard
Brick breakpoint changes them. Square and Circle never shrink into a rectangle
when sibling content consumes the available inline space.

## Accessibility

The family adds no role, accessible name, focusability, or interaction.
Preserve semantic hosts and give informative content or controls their own
correct naming. A visual square or circle never implies an action.

## Composition, native props, and refs

Use Surface for a rounded accent icon well:

```tsx
<Surface asChild level="subtle" radius="subtle" tone="accent">
  <Square size="2rem">
    <Icon aria-hidden size="xs" tone="accent">{icon}</Icon>
  </Square>
</Surface>
```

Use Circle when the visual region itself must be circular:

```tsx
<Surface asChild level="subtle" tone="accent">
  <Circle size="2rem">
    <Icon aria-hidden size="xs" tone="accent">{icon}</Icon>
  </Circle>
</Surface>
```

Center/Square/Circle own alignment and equal geometry, Surface owns paint, and
Icon owns the SVG. Use ZStack rather than application positioning for centered
overlays; this family intentionally has no AbsoluteCenter export.

Native attributes, events, `className`, `style`, children, and the HTMLElement
ref pass through. With `asChild`, the family enhances exactly one child and
merges its props, event handlers, style, classes, and ref onto that one host.

## Examples

### Inline status ornament

```tsx
<Text>
  Before <Circle as="span" inline size="1.5rem">•</Circle> after
</Text>
```

### Responsive square

```tsx
<Square size={{ initial: "2rem", md: "2.5rem", xl: "3rem" }}>
  <Icon aria-hidden size="xs">{icon}</Icon>
</Square>
```

## Evidence

- [Focused component tests](../../../test/components/center/)
- [Type tests](../../../test/types/components/center.test.ts)
- [Playground evidence](../../../playground/src/components/center/)
- [Manual protocol](../../../playground/manual-tests/center.md)
- [Browser behavior](../../../playground/tests/components/center/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/center/visual.spec.ts)

## Changelog

See the [Center changelog](CHANGELOG.md) and the
[package changelog](../../../CHANGELOG.md).
