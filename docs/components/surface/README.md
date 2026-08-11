# Surface

Surface paints a semantic region with a controlled background level, optional
border, elevation, radius, and inset. Ordinary Surface renders one native
element. Optional Media, Scrim, and Content parts layer decorative authored
media behind foreground content without adding interaction or runtime color
context.

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

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/surface.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Public exports are `Surface`, `SurfaceRoot`, `SurfaceMedia`, `SurfaceScrim`,
`SurfaceContent`, their prop types, `SurfaceScrimStrength`,
`SurfaceScrimDirection`, `SurfaceProps`, `SurfaceElement`, `SurfaceLevel`,
`SurfaceElevation`, `SurfaceRadius`, and `SurfaceInset`.

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

Ordinary Surface renders exactly one selected native element:

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
The selected element is the `HTMLElement` ref target. Authored layered parts
render only when explicitly composed:

| Part | Element | Responsibility |
| --- | --- | --- |
| `Surface.Root` / callable `Surface` | selected native host | paint, edge, radius, inset, and layered containing block when needed |
| `Surface.Media` | `div` | decorative noninteractive image, video, canvas, SVG, or other visual layer |
| `Surface.Scrim` | `div` | optional contrast-protecting uniform paint or logical gradient |
| `Surface.Content` | `div` | foreground application content |

`Surface.Content` establishes the foreground layer but deliberately adds no
padding. When foreground content needs spacing on every edge, set `inset` on
the Surface root. Stack `startSpacing` and `endSpacing` remain primary-axis
spacing and are not substitutes for a Surface inset.

Direct named part exports are equivalent to the compound parts and are safe to
import from React Server Components.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `div`, `section`, `article`, `aside`, `nav`, `main`, `header`, `footer`, `form`, `li` | `div` |
| `asChild` | `boolean` | `false` |
| `level` | `canvas`, `base`, `subtle`, `raised` | `base` |
| `bordered` | `boolean` | `false` |
| `elevation` | `none`, `low`, `medium`, `high` | `none` |
| `radius` | `none`, `subtle`, `surface` | `surface` |
| `inset` | `none`, `sm`, `md`, `lg` | `none` |
| `slot` | `string` | `surface` |
| `children` | `ReactNode` | optional |

### Scrim

| Prop | Values | Default |
| --- | --- | --- |
| `strength` | `soft`, `medium`, `strong` | `medium` |
| `direction` | `uniform`, `inline-start`, `inline-end`, `block-start`, `block-end` | `uniform` |
| `slot` | `string` | `surface-scrim` |

Media and Content accept authored children, native div attributes, class,
style, slot, and refs. Media and Scrim are always `aria-hidden` and ignore
pointer interaction. Scrim accepts no children.

Scrim strength is deliberately perceptual rather than a small numeric step.
It changes the starting paint intensity and, for directional scrims, the
gradient reach. Themes normally set only `--brick-surface-scrim-color`; Brick
keeps the relative `soft`, `medium`, and `strong` ladder consistent.

Native global/ARIA/data attributes, events, `className`, `style`, and an
`HTMLElement` ref pass through.

With `asChild`, Surface applies its paint recipes to exactly one existing
non-Fragment element without adding a wrapper. It preserves the child's host,
class, style, handlers, and ref while composing the forwarded Surface ref.

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
- `--brick-surface-scrim-color`
- `--brick-surface-scrim-soft`
- `--brick-surface-scrim-medium`
- `--brick-surface-scrim-strong`
- `--brick-surface-scrim-gradient-stop`
- `--brick-surface-scrim-gradient-stop-soft`
- `--brick-surface-scrim-gradient-stop-medium`
- `--brick-surface-scrim-gradient-stop-strong`

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

Surface does not expose `render`, custom-component hosts, tones,
translucency, generic clipping props, style-system props, runtime context,
responsive objects, or arbitrary recipe values. Media clipping is limited to
its own decorative layer.

When another Brick component already owns the semantic or layout host, use
the narrow wrapper-free composition path:

```tsx
<Surface asChild level="subtle">
  <Section spacing="xl">
    <Container>...</Container>
  </Section>
</Surface>
```

`asChild` requires one element and rejects Fragments. It does not change the
child's semantics or turn Surface into a generic render-prop API.

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

### Decorative media behind content

```tsx
<Surface as="section" radius="none">
  <Surface.Media>
    <ImageRoot src="/workspace.jpg" fill fit="cover">
      <ImageContent alt="" width={1200} height={675} />
    </ImageRoot>
  </Surface.Media>
  <Surface.Scrim direction="inline-start" strength="strong" />
  <Surface.Content>
    <Container>
      <VStack gap="3">Foreground content</VStack>
    </Container>
  </Surface.Content>
</Surface>
```

Background media is decorative. Keep meaningful images and controlled video
in normal document content. The media owner retains loading, fitting, playback,
poster, caption, and reduced-motion policy. Scrim improves contrast but does
not replace contrast verification across every media state. When layered parts
are used, place all foreground children inside Content.

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
