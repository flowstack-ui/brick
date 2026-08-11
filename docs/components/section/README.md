# Section

Section owns responsive logical block rhythm for major page and application
regions. It renders one native element and adds no paint, inline measure,
child arrangement, content anatomy, role, or behavior.

## When and where to use

Use Section for a thematic region that needs larger, themeable page rhythm
than the local Stack spacing scale. A Section commonly contains Container,
then Stack or Grid.

## When not to use

Use Stack or Grid for child relationships, Container for measure and gutters,
Surface for paint, and a qualified Block for a complete reusable content
pattern. Do not use the default `section` host as a generic styling wrapper;
choose `as="div"` when the content is not a thematic section.

## Installation and imports

```tsx
import { Section } from "@flowstack-ui/brick";
// or
import { Section } from "@flowstack-ui/brick/section";

import "@flowstack-ui/brick/styles.css";
```

For measured route-aware CSS, load the shared foundation once and the Section
stylesheet on every route that renders it:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/section.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.

Public exports are `Section`, `SectionProps`, `SectionElement`, and
`SectionSpacing`.

## Quick start

```tsx
<Section spacing={{ initial: "md", lg: "xl" }}>
  <Container>
    <VStack gap="4">
      <Text as="h2" variant="title-lg">Services</Text>
      <Grid.Root minItemSize="md" gap="4">{services}</Grid.Root>
    </VStack>
  </Container>
</Section>
```

## Anatomy and DOM ownership

Section renders exactly one selected native element:

```html
<section
  class="brick-section"
  data-spacing="md"
  data-spacing-lg="xl"
  data-slot="section"
>...</section>
```

It inserts no inner element and preserves authored source, reading, and focus
order. The selected host is the `HTMLElement` ref target.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `section`, `div`, `article`, `aside` | `section` |
| `spacing` | responsive `none`, `sm`, `md`, `lg`, `xl`, `2xl` | `md` |
| `startSpacing` | responsive Section spacing | follows `spacing` |
| `endSpacing` | responsive Section spacing | follows `spacing` |
| `slot` | `string` | `section` |
| `children` | `ReactNode` | optional |

A responsive value uses `{ initial, sm?, md?, lg?, xl? }`. Native global,
ARIA, and data attributes, events, `className`, `style`, and an `HTMLElement`
ref pass through.

## Visual recipes and states

The default recipes are:

| Recipe | Fluid block spacing |
| --- | --- |
| `none` | `0` |
| `sm` | `clamp(2rem, 4vw, 3rem)` |
| `md` | `clamp(3rem, 6vw, 5rem)` |
| `lg` | `clamp(4rem, 8vw, 7rem)` |
| `xl` | `clamp(5rem, 10vw, 9rem)` |
| `2xl` | `clamp(6rem, 12vw, 12rem)` |

Section applies logical block padding only. It has no appearance, background,
inline padding, width, display mode, gap, hover, focus, disabled, loading,
validation, or motion state.

## Tokens and CSS hooks

Stable hooks are `.brick-section`, `data-slot`, `[data-slot="section"]`,
`data-spacing`, `data-start-spacing`, `data-end-spacing`, and their `-sm|-md|-lg|-xl`
responsive forms.

Public variables:

- `--brick-section-space-none`
- `--brick-section-space-sm`
- `--brick-section-space-md`
- `--brick-section-space-lg`
- `--brick-section-space-xl`
- `--brick-section-space-2xl`
- `--brick-section-spacing`
- `--brick-section-start-spacing`
- `--brick-section-end-spacing`

## Customization

Themes should override the named recipe variables. One deliberate region may
override a resolved edge without adding a new public recipe:

```tsx
<Section
  style={{
    "--brick-section-start-spacing": "clamp(5rem, 9vw, 10rem)",
  }}
>
  ...
</Section>
```

This escape hatch does not make arbitrary values part of the React API.

## Responsive behavior

Responsive values use Brick's mobile-first `sm`, `md`, `lg`, and `xl`
breakpoints. A value continues upward until a later breakpoint overrides it.
Fluid recipes continue adapting between those boundaries without JavaScript.

Use `spacing` for equal edges. Use `startSpacing` or `endSpacing` only when
page composition requires an intentionally different transition.

## Accessibility

Section adds no role, name, landmark label, state, focus target, or keyboard
behavior. The default native `section` represents a thematic grouping and
normally contains a heading. Use `as="div"` when only spacing is needed.
Author IDs or labels only when the document structure requires them.

Logical padding works in RTL and vertical writing modes. Section does not
clip focus indicators or impose fixed dimensions.

## Composition, native props, and refs

For an unpainted measured region:

```tsx
<Section spacing="lg">
  <Container>...</Container>
</Section>
```

When paint must cover the complete Section rhythm, enhance the same host:

```tsx
<Surface asChild level="subtle">
  <Section spacing="xl">
    <Container>...</Container>
  </Section>
</Surface>
```

On that shared host, Section owns logical block padding and Surface owns
paint. A selected Surface inset can still supply inline inset; use
`inset="none"` when Container should remain the only inline-gutter owner.

When only a contained panel is painted:

```tsx
<Section spacing="xl">
  <Container>
    <Surface inset="lg">...</Surface>
  </Container>
</Section>
```

Section does not expose arbitrary length props, viewport sizing, safe-area
policy, paint, width, child alignment, or Block content anatomy.

## Examples

### Asymmetric transition between adjacent regions

```tsx
<Section spacing="lg" endSpacing="2xl">
  <Container>...</Container>
</Section>
```

### Spacing without sectioning semantics

```tsx
<Section as="div" spacing="sm">
  Supporting layout content
</Section>
```

## Evidence

- [Playground route source](../../../playground/src/components/section/)
- [Focused component tests](../../../test/components/section/)
- [Type tests](../../../test/types/components/section.test.ts)
- [Browser behavior](../../../playground/tests/components/section/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/section/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/section.md)

## Changelog

See the [Section changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
