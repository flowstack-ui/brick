# Aspect Ratio

### Standard ratio tokens and shared radius

Import `aspectRatios` and `AspectRatioToken` from the package root or
`@flowstack-ui/brick/aspect-ratio`. The frozen numeric scale is generated from
the canonical token source: square=1, landscape=4/3, portrait=3/4, wide=16/9,
ultrawide=18/5, golden=1.618. Use `ratio={aspectRatios.wide}` or responsive
numeric values. Names are not strings accepted by ratio. Defaults and arbitrary
numeric values remain unchanged.

Matching `--brick-aspect-ratio-square` (and the other five names) CSS tokens are
available with the normal foundation stylesheet. Standard proportions are
appearance-invariant. Numeric constants are not runtime CSS/theme lookups;
application-specific ratio roles must use separate names rather than redefine
standard shapes. No provider, viewport JavaScript, or Atom change is needed.

Radius now uses shared `Radius`, default none. Migration: replace legacy
sm/md/lg with subtle/control/surface to retain the old semantic appearance;
sm/md/lg now mean core radii, consistently with other Brick components.

Aspect Ratio reserves stable width-to-height geometry for authored media,
embeds, placeholders, and layout content. It controls the box and optional
frame and child filling; children retain their own semantics and behavior.

## When and where to use

Use Aspect Ratio when content needs a predictable shape before loading, or
when a generic media/embed boundary needs consistent clipping, radius, or
neutral frame paint.

## When not to use

Use Image for image loading, fallback, fit, and focal position. Use Surface for
a general panel and Skeleton for a loading placeholder. Aspect Ratio is not a
video player, map, gallery, or optimizer.

## Installation and imports

```tsx
import { AspectRatio } from "@flowstack-ui/brick";
// or
import { AspectRatio } from "@flowstack-ui/brick/aspect-ratio";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/aspect-ratio.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


The subpath also exports `AspectRatioRoot`, `AspectRatioRootProps`,
`AspectRatioVariant`, `AspectRatioRadius`, `AspectRatioOverflow`, and `AspectRatioContentLayout`.

## Quick start

```tsx
<AspectRatio.Root ratio={16 / 9} radius="lg" variant="outline">
  <iframe title="Product tour" src="/tour" />
</AspectRatio.Root>
```

The immediate element child fills the box automatically. Native images and videos use cover fitting:

Native iframe borders are removed in fill mode; use the Root outline variant
when the frame needs a visible boundary.

```tsx
<AspectRatio.Root ratio={4 / 3} overflow="hidden" radius="md">
  <img
    alt="Team reviewing a release"
    src="/release.jpg"
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
| `ratio` | `ResponsiveValue<number>`; positive numeric values | `16 / 9` |
| `contentLayout` | `fill`, `flow` | `fill` |
| `variant` | `plain`, `subtle`, `outline` | `plain` |
| `radius` | shared `Radius` core sizes and semantic roles | `none` |
| `overflow` | `visible`, `hidden` | `hidden` |

Atom normalizes zero, negative, `NaN`, and infinite ratios to `16 / 9`.
`ratio` is width divided by height. Native CSS only uses the preferred ratio
when at least one physical dimension remains automatic.

## Visual recipes and states

`plain` is transparent, `subtle` supplies a neutral canvas, and `outline`
adds a one-pixel boundary while keeping its background transparent. Radius changes only corner
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
`[data-variant]`, `[data-radius]`, `[data-overflow]`, and `[data-content-layout]`.
The `--_brick-aspect-ratio-*` variables are private implementation details, not customization hooks.

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
size. Use `ratio={{ initial: 1, md: 16 / 9 }}` for viewport-responsive geometry.
Sparse objects such as `ratio={{ lg: 2 }}` retain the default 16/9 before the
first breakpoint. Values carry forward through sm (30rem), md (48rem), lg
(64rem), and xl (80rem). Empty objects and strings are not supported. Each
invalid numeric value normalizes to 16/9. This is CSS-only, SSR-deterministic,
and uses one DOM tree; container-specific changes remain application policy.
Geometry is direction-neutral and identical in RTL. Dark and forced
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
and by default absolutely positions its immediate element children to fill
the frame. Wrap one primary content region; use Center to center text rather
than expecting AspectRatio to choose the child's layout. Child display and
descendant focus overflow are not overridden. Image retains its own fit API.
Use `contentLayout="flow"` for natural-flow children (the previous behavior),
or when migrating an authored layout that must control its own geometry.

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
