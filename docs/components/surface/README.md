# Surface

Surface paints a semantic region with a controlled background level, optional
border, elevation, radius, and inset. It renders one native element and adds no
layout, clipping, interaction, role, or runtime color context.

## When and where to use

Use Surface for generic painted regions such as application sections,
workspaces, specimen panels, and nested background layers. Combine it with
Container for page measure and Stack or Grid for child layout.

## When not to use

Use Card for a self-contained content object, modal components for interactive
overlays, and application CSS for product-specific decoration. Surface is not a
Box, layout primitive, theme provider, or substitute for semantic HTML.

## Installation and imports

```tsx
import { Surface } from "@flowstack-ui/brick";
// or
import { Surface } from "@flowstack-ui/brick/surface";

import "@flowstack-ui/brick/styles.css";
```

Public exports are `Surface`, `SurfaceProps`, `SurfaceElement`,
`SurfaceLevel`, `SurfaceElevation`, `SurfaceRadius`, and `SurfaceInset`.

## Quick start

```tsx
<Surface as="section" bordered inset="md" level="subtle">
  <VStack gap="3">
    <Text as="h2" variant="title-md">Release readiness</Text>
    <Text>All required evidence is available.</Text>
  </VStack>
</Surface>
```

## Anatomy and DOM ownership

Surface renders exactly one selected native element:

```html
<section
  class="brick-surface"
  data-bordered
  data-elevation="none"
  data-inset="md"
  data-level="subtle"
  data-radius="surface"
  data-slot="surface"
>
  <!-- authored content -->
</section>
```

It never inserts an inner element, clips descendants, or changes child order.
The selected element is the `HTMLElement` ref target.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `div`, `section`, `article`, `aside`, `nav`, `main`, `header`, `footer`, `form`, `li` | `div` |
| `level` | `canvas`, `base`, `subtle`, `raised` | `base` |
| `bordered` | `boolean` | `false` |
| `elevation` | `none`, `low`, `medium`, `high` | `none` |
| `radius` | `none`, `subtle`, `surface` | `surface` |
| `inset` | `none`, `sm`, `md`, `lg` | `none` |
| `slot` | `string` | `surface` |
| `children` | `ReactNode` | optional |

Native global/ARIA/data attributes, events, `className`, `style`, and an
`HTMLElement` ref pass through.

## Visual recipes and states

`level` selects a semantic background layer. Border, elevation, radius, and
inset remain independent so consumers can change only the visual dimension
they intend to demonstrate. Surface has no hover, focus, selected, disabled,
loading, validation, typography, or motion state.

Elevations are deliberately restrained: `low` separates nearby content,
`medium` separates a stronger floating region, and `high` is reserved for the
strongest non-modal separation. In forced colors, elevated or bordered
surfaces use a system border instead of relying on shadow alone.

## Tokens and CSS hooks

Stable hooks are `.brick-surface`, `[data-slot="surface"]`, `data-slot`,
`data-level`, `data-bordered`, `data-elevation`, `data-radius`, and
`data-inset`.

Public variables:

- `--brick-surface-background`
- `--brick-surface-foreground`
- `--brick-surface-border-color`
- `--brick-surface-border-width`
- `--brick-surface-elevation-none`
- `--brick-surface-elevation-low`
- `--brick-surface-elevation-medium`
- `--brick-surface-elevation-high`
- `--brick-surface-shadow`
- `--brick-surface-radius`
- `--brick-surface-padding`

## Customization

Use recipes first, then override selected variables on a deliberate instance:

```tsx
<Surface
  bordered
  inset="md"
  style={{
    "--brick-surface-background": "color-mix(in srgb, Canvas, rebeccapurple 8%)",
    "--brick-surface-border-color": "rebeccapurple",
  }}
>
  Customized region
</Surface>
```

This escape hatch does not make arbitrary values part of the recipe API.

## Responsive behavior

Surface follows the size of its parent and uses logical padding. It has no
responsive props, viewport-height policy, safe-area behavior, or breakpoint
logic. Application composition decides how Surface participates in responsive
layout.

## Accessibility

Surface adds no role, accessible name, landmark, focus target, or keyboard
behavior. Choose `as` for the actual document structure and name repeated
landmarks when required. Background and foreground variables change together,
and forced-colors styling preserves visible boundaries.

## Composition, native props, and refs

Surface paints; Container constrains; Stack and Grid arrange; Card represents a
self-contained content object. Native props and refs target the one authored
host.

Surface does not expose `asChild`, `render`, custom-component hosts, tones,
translucency, clipping, style-system props, runtime context, responsive
objects, or arbitrary recipe values.

## Examples

### Full-width paint with measured content

```tsx
<Surface as="section" level="subtle">
  <Container>
    <VStack gap="4">Measured section content</VStack>
  </Container>
</Surface>
```

### Nested semantic levels

```tsx
<Surface inset="lg" level="canvas">
  <Surface bordered inset="md" level="raised" elevation="low">
    Focused workspace
  </Surface>
</Surface>
```

## Evidence

- [Playground route source](../../../playground/src/components/surface/)
- [Focused component tests](../../../test/components/surface/)
- [Type tests](../../../test/types/components/surface.test.ts)
- [Browser behavior](../../../playground/tests/components/surface/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/surface/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/surface.md)

## Changelog

See the [Surface changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
