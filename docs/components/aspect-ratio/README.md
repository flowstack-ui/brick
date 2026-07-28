# Aspect Ratio

Aspect Ratio reserves stable width-to-height geometry for authored media,
embeds, placeholders, and layout content. It controls the box and optional
frame only; children retain their own semantics, sizing, and behavior.

## When and where to use

Use Aspect Ratio when content needs a predictable shape before loading, or
when a generic media/embed boundary needs consistent clipping, radius, or
neutral frame paint.

## When not to use

Use Image for image loading, fallback, fit, and focal position. Use Surface for
a general panel and Skeleton for a loading placeholder. Aspect Ratio is not a
video player, map, gallery, optimizer, cropper, or responsive-value system.

## Installation and imports

```tsx
import { AspectRatio } from "@flowstack-ui/brick";
// or
import { AspectRatio } from "@flowstack-ui/brick/aspect-ratio";
import "@flowstack-ui/brick/styles.css";
```

The subpath also exports `AspectRatioRoot`, `AspectRatioRootProps`,
`AspectRatioVariant`, `AspectRatioRadius`, and `AspectRatioOverflow`.

## Quick start

```tsx
<AspectRatio.Root ratio={16 / 9} radius="lg" variant="outline">
  <iframe title="Product tour" src="/tour" />
</AspectRatio.Root>
```

Size the child explicitly when it should fill the box:

```tsx
<AspectRatio.Root ratio={4 / 3} overflow="hidden" radius="md">
  <img
    alt="Team reviewing a release"
    src="/release.jpg"
    style={{ blockSize: "100%", inlineSize: "100%", objectFit: "cover" }}
  />
</AspectRatio.Root>
```

## Anatomy and DOM ownership

```tsx
<AspectRatio.Root />
```

Root renders one `div` by default over Atom AspectRatio. Brick adds no Content
wrapper. Atom owns the authoritative inline `aspect-ratio` style and
`data-slot="aspect-ratio"`; Brick adds `.brick-aspect-ratio`, `data-variant`,
`data-radius`, and `data-overflow`. The default ref targets the root
`HTMLDivElement`.

## API

### Root

| Prop | Values | Default |
| --- | --- | --- |
| `ratio` | positive `number` | `16 / 9` |
| `variant` | `plain`, `subtle`, `outline` | `plain` |
| `radius` | `none`, `sm`, `md`, `lg`, `full` | `none` |
| `overflow` | `visible`, `hidden` | `hidden` |

Atom normalizes zero, negative, `NaN`, and infinite ratios to `16 / 9`.
`ratio` is width divided by height. Native CSS only uses the preferred ratio
when at least one physical dimension remains automatic.

## Visual recipes and states

`plain` is transparent, `subtle` supplies a neutral canvas, and `outline`
supplies a neutral canvas plus a one-pixel boundary. Radius changes only corner
geometry. Overflow changes only clipping. `full` intentionally produces a
capsule or ellipse for non-square ratios.

Aspect Ratio has no hover, active, selected, loading, disabled, validation, or
focus state of its own.

## Tokens and CSS hooks

Public variables:

- `--brick-aspect-ratio-background`
- `--brick-aspect-ratio-border-color`
- `--brick-aspect-ratio-border-width`
- `--brick-aspect-ratio-radius`
- `--brick-aspect-ratio-overflow`

Public hooks are `.brick-aspect-ratio`, `data-slot` / `[data-slot]` with
`data-slot="aspect-ratio"`,
`[data-variant]`, `[data-radius]`, and `[data-overflow]`. Atom's inline ratio
is deliberately not a Brick CSS variable.

## Customization

Override variables on a class or appearance scope:

```css
.product-preview {
  --brick-aspect-ratio-background: var(--brick-color-accent-subtle);
  --brick-aspect-ratio-border-color: var(--brick-color-accent-border);
  --brick-aspect-ratio-radius: 1rem;
}
```

Consumer `className` and `style` are preserved. A `style.aspectRatio` value is
overridden by the authoritative `ratio` prop.

## Responsive behavior

Root is block-level, inline-size contained, and fills its available inline
size. It does not provide responsive prop objects or named ratio tokens.
Compose responsive CSS outside Root when a ratio must change by container or
viewport. Geometry is direction-neutral and identical in RTL. Dark and forced
colors affect optional frame paint; the component has no motion.

## Accessibility

Aspect Ratio adds no role, name, state, keyboard behavior, focusability, or
announcement. Children own semantics: images need suitable alt text, iframes
need descriptive titles, and videos need applicable controls and captions.
With clipped overflow, ensure descendant focus indicators remain visible or
use `overflow="visible"`/an inset focus style.

## Composition, native props, and refs

Root forwards compatible native div props, data/ARIA attributes, events,
`className`, `style`, children, and an `HTMLDivElement` ref. Atom's `asChild`
and `render` composition APIs remain available. Root is positioned relatively
but does not stretch, crop, or absolutely position children.

## Examples

### Square placeholder

```tsx
<AspectRatio.Root ratio={1} radius="full" variant="subtle">
  <span aria-hidden="true" />
</AspectRatio.Root>
```

### Semantic embed

```tsx
<AspectRatio.Root ratio={16 / 9} radius="lg" variant="outline">
  <iframe
    allow="fullscreen"
    src="/map"
    style={{ blockSize: "100%", inlineSize: "100%" }}
    title="Office location"
  />
</AspectRatio.Root>
```

## Evidence

- [Playground route](../../../playground/src/components/aspect-ratio/AspectRatioPage.tsx)
- [Component tests](../../../test/components/aspect-ratio/aspect-ratio.test.tsx)
- [Type tests](../../../test/types/components/aspect-ratio.test.ts)
- [Browser evidence](../../../playground/tests/components/aspect-ratio/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/aspect-ratio/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/aspect-ratio.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
