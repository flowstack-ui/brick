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
<Skeleton loading={isLoading} variant="rounded">
  <article>Loaded content</article>
</Skeleton>
```

## Anatomy and DOM ownership

Skeleton owns one stable `span`. Wrapped children stay under a private content
span so their geometry is preserved while visibility removes interaction.
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

Native span attributes, children, class, style, slot, and ref are supported.

## Visual recipes and states

Text is one font-height line, circular is square and round, rectangular has
sharp corners, and rounded uses the surface radius. Pulse changes opacity,
wave moves a highlight, and none is static. Multi-line text shortens its last
line. Loaded content has no placeholder paint.

## Tokens and CSS hooks

The stable class is `.brick-skeleton`; data hooks are `data-variant`,
`data-animation`, `data-loading`, `data-lines`, and `data-slot`. Public tokens
are `--brick-skeleton-background`, `--brick-skeleton-highlight`,
`--brick-skeleton-width`, `--brick-skeleton-height`, and
`--brick-skeleton-radius`.

## Customization

Prefer `width`, `height`, and supported variables. Match the expected final
shape closely so loading does not cause a layout shift.

## Responsive behavior

The default width follows its container and never exceeds it. Explicit CSS
lengths remain consumer-owned. Multi-line placeholders use logical dimensions
and require no RTL mirroring.

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
