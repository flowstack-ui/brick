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

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/badge.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Badge>Draft</Badge>
```

## Anatomy and DOM ownership

Badge renders Atom `Badge.Root` as a `span`, adds no private DOM, and forwards
an `HTMLSpanElement` ref.

## API

Badge's public exports are `Badge`, `BadgeProps`, `BadgeVariant`, `BadgeTone`,
`BadgeSize`, and `BadgeShape`. The shared `badge` subpath also exports the
separately documented Notification Badge family.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `soft`, `solid`, `outline` | `soft` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `neutral` |
| `size` | `sm`, `md`, `lg`, `xl` | `md` |
| `shape` | `rounded`, `pill`, `circle` | `rounded` |

Atom/native span props are inherited except native `color`.

## Visual recipes and states

Variant changes fill and boundary, tone changes semantic color, size changes
the complete label, and shape selects rounded, pill, or exact-square circle
geometry. Circle is for one passive icon or single character with nearby
context; use IconButton for actions and Status for dot-and-label state. Badge
is passive and has no interactive state.

The `xl` size supplies a deliberate passive icon well for empty states and
similar noninteractive illustrations. It is not an action target.

## Tokens and CSS hooks

Stable hooks are `.brick-badge`, Atom slot `badge`, and `data-variant`,
`data-tone`, `data-size`, `data-shape`. Public tokens are
`--brick-badge-background`, `--brick-badge-foreground`,
`--brick-badge-border-color`, `--brick-badge-min-block-size`,
`--brick-badge-inline-padding`, `--brick-badge-block-padding`,
`--brick-badge-gap`, `--brick-badge-font-size`, `--brick-badge-radius`,
`--brick-badge-tone-solid`, `--brick-badge-tone-on-solid`,
`--brick-badge-tone-soft`, `--brick-badge-tone-on-soft`,
`--brick-badge-tone-border`, and `--brick-badge-tone-text`.

## Customization

Prefer recipe props, then semantic and public Badge tokens. Use `className` and
`style` for scoped exceptions while maintaining contrast.

## Responsive behavior

Badge sizes to its content, keeps its short label on one line, and does not own
responsive layout. Use ordinary Text for explanatory or prose-length content;
surrounding layout or a deliberate scroll owner contains the Badge's intrinsic
width.

## Accessibility

Badge contributes its text to normal reading order. Do not rely on tone alone
or use it as the only announcement of an asynchronous change.

## Composition, native props, and refs

Atom composition and native span props are forwarded. The ref targets the
rendered span; composed output must remain passive.

## Examples

```tsx
<Badge variant="outline" tone="success">Ready</Badge>

<Badge aria-label="Verified" shape="circle" tone="accent">
  <Icon aria-hidden size="xs">{checkIcon}</Icon>
</Badge>
```

Badge applies its public gap token when children include an icon and label:

```tsx
<Badge tone="accent" shape="pill">
  <Icon size="xs">{icon}</Icon>
  Built for business
</Badge>
```

When a separately configured `Text` child is necessary, inherit Badge's
foreground so the selected Badge recipe continues to own contrast:

```tsx
<Badge tone="accent" shape="pill">
  <Icon size="xs">{icon}</Icon>
  <Text tone="inherit" variant="caption">Built for business</Text>
</Badge>
```

Prefer plain label text when no separate Text recipe is needed. Do not use
default-tone Text inside Badge, add literal spaces around children, or select
Badge only to imitate an editorial eyebrow.

The neutral solid recipe remains a neutral surface with the normal foreground;
it does not switch to the inverse black/white pair between appearances.

## Evidence

- [Playground](../../../playground/src/components/badge/BadgePage.tsx)
- [Unit test](../../../test/components/badge/badge.test.tsx)
- [Type owner](../../../test/types/components/badge.test.ts)
- [Browser spec](../../../playground/tests/components/badge/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/badge/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/badge.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
