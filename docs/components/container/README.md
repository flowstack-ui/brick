# Container

Container creates a centered, fluid content boundary with a closed maximum
measure and logical inline gutters. It renders one native element and adds no
paint, vertical spacing, child layout, role, or behavior.

## When and where to use

Use Container where full-width application space becomes measured page or
major-region content. Wrap Stack, Grid, or semantic content when they should
share a centered maximum and consistent page gutters.

## When not to use

Use Stack or Grid to arrange children, Card or a future Surface for paint,
authored section composition for vertical rhythm, and application layout for
sidebars, breakpoints, safe areas, or viewport height. Do not use Container as
an ordinary grouping div or to constrain a component specimen, dialog, field,
phone frame, or paragraph.

## Installation and imports

```tsx
import { Container } from "@flowstack-ui/brick";
// or
import { Container } from "@flowstack-ui/brick/container";

import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/container.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Public exports are `Container`, `ContainerProps`, `ContainerElement`,
`ContainerMeasure`, and `ContainerGutter`.

## Quick start

```tsx
<Container as="main">
  <VStack gap="6">
    <Text as="h1" variant="display">Projects</Text>
    <Grid.Root minItemSize="md" gap="4">{projects}</Grid.Root>
  </VStack>
</Container>
```

## Anatomy and DOM ownership

Container renders exactly one selected native element:

```html
<main
  class="brick-container"
  data-gutter="md"
  data-measure="wide"
  data-slot="container"
>
  <!-- authored content -->
</main>
```

It never inserts an inner element or clones, wraps, reorders, or filters
children. The selected element is the `HTMLElement` ref target.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `div`, `section`, `article`, `main`, `header`, `footer`, `nav`, `aside` | `div` |
| `measure` | `narrow`, `medium`, `wide`, `max`, `full` | `wide` |
| `gutter` | `none`, `sm`, `md`, `lg` | `md` |
| `slot` | `string` | `container` |
| `children` | `ReactNode` | optional |

Native global/ARIA/data attributes, events, `className`, `style`, and an
`HTMLElement` ref pass through.

## Visual recipes and states

Measures cap the complete border box at `42rem`, `64rem`, `72rem`, and
`90rem`; `full` removes the finite maximum. Gutters are `0`,
`clamp(.75rem, 2vw, 1rem)`, `clamp(1rem, 3vw, 2rem)`, and
`clamp(1rem, 4vw, 4rem)`.

Container always fills available inline space up to its maximum, uses
border-box sizing, centers with logical auto margins, and keeps gutters inside
its maximum. It has no appearance, hover, focus, disabled, loading,
validation, typography, paint, or motion state.

## Tokens and CSS hooks

Stable hooks are `.brick-container`, `[data-slot="container"]`, `data-slot`,
`data-measure`, and `data-gutter`.

Public variables:

- `--brick-container-measure-narrow`
- `--brick-container-measure-medium`
- `--brick-container-measure-wide`
- `--brick-container-measure-max`
- `--brick-container-measure-full`
- `--brick-container-gutter-none`
- `--brick-container-gutter-sm`
- `--brick-container-gutter-md`
- `--brick-container-gutter-lg`
- `--brick-container-max-inline-size`
- `--brick-container-padding-inline`

## Customization

Use recipes first, then override selected variables on a deliberate instance:

```tsx
<Container
  style={{
    "--brick-container-max-inline-size": "76rem",
    "--brick-container-padding-inline": "2.5rem",
  }}
>
  Content
</Container>
```

This escape hatch does not make arbitrary values part of the recipe API.

## Responsive behavior

Container is fluid without JavaScript or breakpoint props. Closed `clamp()`
gutters respond to viewport width while logical padding follows writing mode.
`full` fills the available parent, not necessarily the viewport.

Nest only to create a deliberately narrower content region. Use
`gutter="none"` when the outer Container already owns page gutters. Do not
nest an equal or wider Container as ordinary grouping.

## Accessibility

Container adds no role, name, landmark, focus target, state, or keyboard
behavior. The authored host supplies semantics; use one primary `main` and
name repeated landmarks when required. DOM, reading, and focus order remain
unchanged. Container does not clip descendants.

Logical sizing supports RTL and vertical writing modes. Application shells,
not Container, own safe-area insets and the choice among `svh`, `dvh`, `lvh`,
or `vh`.

## Composition, native props, and refs

Container constrains; Stack and Grid arrange; Card or a future Surface paints.
For full-width paint with measured content, place Container inside the painted
region. Native props and refs target the one authored host.

Container does not expose `asChild`, `render`, custom-component hosts,
responsive objects, arbitrary recipe values, vertical spacing, background,
overflow, safe-area policy, viewport height, child alignment, or full-bleed
child protocols.

## Examples

### Full-width region with measured content

```tsx
<section className="product-surface">
  <Container measure="wide">
    <VStack gap="4">Measured content</VStack>
  </Container>
</section>
```

### Deliberately narrower inner region

```tsx
<Container measure="max" gutter="lg">
  <Container measure="narrow" gutter="none">
    Focused content
  </Container>
</Container>
```

## Evidence

- [Playground route source](../../../playground/src/components/container/)
- [Focused component tests](../../../test/components/container/)
- [Type tests](../../../test/types/components/container.test.ts)
- [Browser behavior](../../../playground/tests/components/container/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/container/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/container.md)

## Changelog

See the [Container changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
