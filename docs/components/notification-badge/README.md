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
import { NotificationBadge } from "@flowstack-ui/brick/badge";
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


`NotificationBadge` and its public types are also exported from
`@flowstack-ui/brick`. There is no separate `notification-badge` package
subpath.

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

Public exports are `NotificationBadge`, `NotificationBadgeProps`,
`NotificationBadgePlacement`, `NotificationBadgeOverlap`, and
`NotificationBadgeSize`. `BadgeTone` is shared with Badge.

| Prop | Values | Default |
| --- | --- | --- |
| `tone` | `neutral`, `contrast`, `accent`, `info`, `success`, `warning`, `danger` | `danger` |
| `size` | Responsive `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `placement` | `top-start`, `top-end`, `bottom-start`, `bottom-end` | `top-end` |
| `overlap` | `rectangular`, `circular` | `rectangular` |
| `invisible` | `boolean` | `false` |
| `offset` | Responsive number or CSS length/percentage | `0`, circular `14.6447%` |
| `offsetInline` / `offsetBlock` | Responsive number or CSS length/percentage | inherited from offset |
| `bordered` | `boolean` | `true` |
| `locale` | BCP 47 string | LocaleProvider, otherwise `en-US` |

Placement also accepts a sparse responsive object. Positive offsets inset,
negative offsets outset. Numeric values use Brick spacing factors; strings
may use spacing tokens or CSS lengths. Axis offsets take precedence, including
zero. Explicit offset replaces the circular fallback. Sparse objects retain
the overlap fallback before their first breakpoint.

| Size | Count height | Dot diameter | Count font |
| --- | --- | --- | --- |
| xs | 14px | 6px | 10px |
| sm | 16px | 8px | 11px |
| md | 20px | 10px | 12px |
| lg | 24px | 12px | 13px |
| xl | 28px | 14px | 14px |

These are rem-based defaults at a 16px root. Badge size is independent from
its anchor. Start with xs/sm for compact controls, sm/md for ordinary controls,
and md/lg for larger avatars; a large target can still use a small dot.

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
`notification-badge-indicator`. Public root attributes are `data-tone`,
`data-size`, `data-placement`, `data-overlap`, and conditional
`data-invisible`; the private indicator reflects `data-variant` and
`data-shape` for its owned presentation. Public tokens are
`--brick-notification-badge-size`, `--brick-notification-badge-dot-size`,
`--brick-notification-badge-inline-padding`,
`--brick-notification-badge-font-size`,
`--brick-notification-badge-outline-color`,
`--brick-notification-badge-translate-inline`, and
`--brick-notification-badge-translate-block`.

## Customization

Use tone, size, placement, and overlap first, then public tokens. Root
`className` and `style` are escape hatches; the indicator remains
implementation-owned.

## Responsive behavior

The overlay follows its child's box and logical direction. The application
owns clipping and breakpoint choices; size, placement and offsets accept
responsive values. Sparse size begins at md and placement at top-end.

The conditional `data-bordered` hook controls the seam. `bordered={false}`
uses a transparent boundary without changing dimensions. Use the outline-color
token for a specific surface; Brick does not sample underlying images.

Counts inherit LocaleProvider or explicit locale and use ungrouped integer
digits, including the maximum in overflow. The plus sign remains `+`.
Use the same locale on server and client; no browser locale is guessed.

## Accessibility

The visual indicator is `aria-hidden`. Put the count or notification meaning
in the child’s accessible name or nearby status text and update it when the
count changes.

## Composition, native props, and refs

Native span props are forwarded to the root, but `asChild` is excluded. The ref
targets the root span, not the child or indicator.

Wrapping the entire button, Avatar or Image anchors to its outer boundary.
Wrapping the icon inside IconButton anchors to the artwork instead. Both are
valid; ghost styling does not automatically select one. IconButton preserves
its own artwork size through NotificationBadge for a direct SVG, image or
Brick Icon, including Icon asChild. Do not manually synchronize icon sizes or
replace a named button with a passive icon. The indicator remains independent.

```tsx
<IconButton aria-label="Inbox, 3 unread messages">
  <NotificationBadge count={3} size="sm">
    <Icon><Mail /></Icon>
  </NotificationBadge>
</IconButton>
```

Load IconButton and Icon styles for that composition. The badge stylesheet
includes Float's positioning styles; no extra Float stylesheet is required.

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
