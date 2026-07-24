# Badge

Badge is a compact passive label for categories, status, or short metadata.

## When and where to use

Use it for short labels whose meaning is understandable in surrounding content.

## When not to use

Do not use Badge as a button, form control, live status announcer, or overlay
count. Use NotificationBadge for a count or dot attached to another element.

## Installation and imports

```tsx
import { Badge } from "@flowstack-ui/brick/badge";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<Badge>Draft</Badge>
```

## Anatomy and DOM ownership

Badge renders Atom `Badge.Root` as a `span`, adds no private DOM, and forwards
an `HTMLSpanElement` ref.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `soft`, `solid`, `outline` | `soft` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `neutral` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `rounded`, `pill` | `rounded` |

Atom/native span props are inherited except native `color`.

## Visual recipes and states

Variant changes fill and boundary, tone changes semantic color, size changes
the complete label, and shape selects rounded or pill geometry. Badge is
passive and has no interactive state.

## Tokens and CSS hooks

Stable hooks are `.brick-badge`, Atom slot `badge`, and `data-variant`,
`data-tone`, `data-size`, `data-shape`. Public tokens are
`--brick-badge-background`, `--brick-badge-foreground`,
`--brick-badge-border-color`, `--brick-badge-min-block-size`,
`--brick-badge-inline-padding`, `--brick-badge-block-padding`,
`--brick-badge-font-size`, and `--brick-badge-radius`. Internal tone-mapping
variables are not public customization hooks.

## Customization

Prefer recipe props, then semantic and public Badge tokens. Use `className` and
`style` for scoped exceptions while maintaining contrast.

## Responsive behavior

Badge sizes to its content and does not own responsive layout. Keep labels
short; surrounding layout owns wrapping and truncation.

## Accessibility

Badge contributes its text to normal reading order. Do not rely on tone alone
or use it as the only announcement of an asynchronous change.

## Composition, native props, and refs

Atom composition and native span props are forwarded. The ref targets the
rendered span; composed output must remain passive.

## Examples

```tsx
<Badge variant="outline" tone="success">Ready</Badge>
```

## Evidence

- [Playground](../../../playground/src/components/badge/BadgePage.tsx)
- [Unit test](../../../test/components/badge/badge.test.tsx)
- [Type owner](../../../test/types/components/badge.test.ts)
- [Browser spec](../../../playground/tests/components/badge/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/badge/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/badge.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
