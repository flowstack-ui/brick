# Skeleton

Skeleton preserves expected content geometry while an application-owned loading
operation is incomplete.

## When and where to use

Use Skeleton when the final layout is known and preserving its geometry reduces
disruptive shifts during a short content load.

## When not to use

Do not use it as generic decoration, progress for a known-duration operation,
an error state, or the only announcement for an updating region.

## Installation and imports

```tsx
import { Skeleton } from "@flowstack-ui/brick/skeleton";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/skeleton.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Skeleton asChild loading={isLoading} variant="rounded">
  <article>Loaded content</article>
</Skeleton>
```

## Anatomy and DOM ownership

Skeleton owns one stable `span` by default. Children render directly with no
private wrapper. Use `asChild` with one non-Fragment element to retain a block,
layout or control host; do not nest an article inside the default span.
Loading uses native inert and hides descendant artwork; loaded content keeps
its existing element and application state.
Standalone multi-line text adds private line spans.

## API

Public exports are `Skeleton`, `SkeletonProps`, `SkeletonVariant`, and
`SkeletonAnimation`.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `text`, `circular`, `rectangular`, `rounded` | `text` |
| `animation` | `pulse`, `wave`, `none` | `pulse` |
| `loading` | `boolean` | `true` |
| `lines` | `number` | `1` |
| `width` / `height` | CSS length or number | optional |
| `size` | CSS length or number | optional; equal dimensions |
| `radius` | shared `Radius` | shape default |
| `gap` | CSS gap or number | `8px` |
| `lastLineWidth` | CSS width or number | `80%` |
| `asChild` | boolean | `false` |

Shared Radius values are `none`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`,
`3xl`, `4xl`, `subtle`, `control`, `surface`, `overlay`, and `full`.
Explicit width/height override size. Circular width alone supplies matching
height. Lines apply only to standalone text: finite counts normalize to 1–100,
nonfinite counts become one. A loaded empty skeleton reserves geometry but
does not paint placeholders. Gap is between lines; lastLineWidth only affects
multiline text. Numeric dimensions and gaps are pixels.

Native span attributes, children, class, style, slot, and ref are supported.

## Visual recipes and states

Text is one font-height line, circular is square and round, rectangular has
sharp corners, and rounded uses the surface radius. Pulse changes opacity,
wave moves a highlight, and none is static. Multi-line text shortens its last
line. Loaded content has no placeholder paint. Default placeholder paint is a
contextual primary-text tint, so it remains distinct on base, raised, overlay,
light, and dark surfaces without selecting a literal color.

## Tokens and CSS hooks

The stable class is `.brick-skeleton`; data hooks are `data-variant`,
`data-animation`, `data-loading`, `data-lines`, and `data-slot`. Public tokens
use the `--brick-skeleton-` prefix. Styling state uses `data-skeleton-variant`,
`data-skeleton-animation` and `data-skeleton-loading` to avoid collisions when
composed onto another component. The shorter variant/animation/loading aliases
remain on ordinary roots only. A composed component may retain its own slot.
Public tokens
are `--brick-skeleton-background`, `--brick-skeleton-highlight`,
`--brick-skeleton-width`, `--brick-skeleton-height`, and
`--brick-skeleton-radius`, `--brick-skeleton-gap`,
`--brick-skeleton-last-line-width`, `--brick-skeleton-duration` and
`--brick-skeleton-fade-duration`. Pulse defaults to 1.2s, wave to 5s, and
content reveal to 0.1s. Reduced motion disables all three.

## Customization

Prefer `width`, `height`, and supported variables. Match the expected final
shape closely so loading does not cause a layout shift.

## Responsive behavior

The default width follows its container and never exceeds it. For responsive
geometry compose `<Skeleton asChild><Frame blockSize={{ initial: 100, md: 200 }} /></Skeleton>`.
Frame owns responsive constraints; Skeleton adds loading paint to that same
host. Multi-line placeholders use logical dimensions and require no RTL mirroring.

## Accessibility

Loading Skeleton is `aria-hidden` and has no status role or label. Mark the
owning region `aria-busy` and provide application status copy when an
announcement is needed. Reduced-motion users receive static placeholders;
forced colors retains geometry.

## Composition, native props, and refs

The stable span forwards native attributes, custom class/style/slot, and its
ref. Children may contain Brick components; Skeleton never changes their props
or owns their data state.

## Examples

See the [component playground](../../../playground/src/components/skeleton/)
for every shape and animation, dimensions, line counts, loading toggles,
composition, appearance, customization, and responsive accessibility evidence.

## Evidence

- [Unit tests](../../../test/components/skeleton/)
- [Type tests](../../../test/types/components/skeleton.test.ts)
- [Browser behavior](../../../playground/tests/components/skeleton/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/skeleton/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/skeleton.md)

## Changelog

See [Skeleton changelog](CHANGELOG.md).
