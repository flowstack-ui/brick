# Notification Badge

NotificationBadge overlays a visual count or dot on exactly one child.

## When and where to use

Use it to add compact visual notification metadata to an icon, avatar, or
other single element.

## When not to use

Use Badge for inline labels. Do not use the indicator as the only accessible
name or as an automatic live-region announcement.

## Installation and imports

```tsx
import { NotificationBadge } from "@flowstack-ui/brick/notification-badge";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<NotificationBadge count={3}>
  <button aria-label="Inbox, 3 unread">Inbox</button>
</NotificationBadge>
```

## Anatomy and DOM ownership

The Atom Badge root is a `span` around exactly one `ReactElement` child. Brick
adds a private, `aria-hidden` indicator span only when visible. The forwarded
`HTMLSpanElement` ref targets the root.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `tone` | any `BadgeTone` | `danger` |
| `size` | `sm`, `md`, `lg` | `md` |
| `placement` | `top-start`, `top-end`, `bottom-start`, `bottom-end` | `top-end` |
| `overlap` | `rectangular`, `circular` | `rectangular` |
| `invisible` | `boolean` | `false` |

Count mode requires `count: number` and accepts `max?: number` (valid positive
integer, otherwise `99`) and `showZero?: boolean` (`false`). Dot mode requires
`dot: true` and excludes count-only props. Count must be a finite non-negative
integer to display. `children` must be one `ReactElement`; `asChild` and native
`color` are excluded.

## Visual recipes and states

Counts above `max` display as `max+`. Dot and single-digit indicators are
circles; longer counts are pills. Zero hides unless `showZero`; invalid counts
and `invisible` hide the indicator. Placement uses logical start/end.

## Tokens and CSS hooks

Stable root/indicator hooks are `.brick-notification-badge` and
`.brick-notification-badge__indicator`; slots are `notification-badge` and
`notification-badge-indicator`. Public attributes cover tone, size, placement,
overlap, invisible, indicator variant, and shape. Public tokens are
`--brick-notification-badge-size`, `--brick-notification-badge-dot-size`,
`--brick-notification-badge-inline-padding`,
`--brick-notification-badge-outline-color`,
`--brick-notification-badge-translate-inline`, and
`--brick-notification-badge-translate-block`.

## Customization

Use tone, size, placement, and overlap first, then public tokens. Root
`className` and `style` are escape hatches; the indicator remains
implementation-owned.

## Responsive behavior

The overlay follows its child's box and logical direction. The application
owns child sizing, clipping, and responsive placement decisions.

## Accessibility

The visual indicator is `aria-hidden`. Put the count or notification meaning
in the child’s accessible name or nearby status text and update it when the
count changes.

## Composition, native props, and refs

Native span props are forwarded to the root, but `asChild` is excluded. The ref
targets the root span, not the child or indicator.

## Examples

```tsx
<NotificationBadge dot overlap="circular">
  <Avatar alt="Ada Lovelace, online" fallback="AL" />
</NotificationBadge>
```

## Evidence

- [Playground](../../../playground/src/components/notification-badge/NotificationBadgePage.tsx)
- [Unit test](../../../test/components/notification-badge/notification-badge.test.tsx)
- [Type owner](../../../test/types/components/notification-badge.test.ts)
- [Browser spec](../../../playground/tests/components/notification-badge/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/notification-badge/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/notification-badge.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
