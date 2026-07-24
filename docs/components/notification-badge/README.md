# NotificationBadge

NotificationBadge attaches a visual-only finite count or dot to exactly one
React element. Its stable wrapper supplies positioning; the owning action or
nearby context supplies the complete accessible meaning.

## Use and avoid

Use NotificationBadge for unread counts or presence dots attached to a named
button, link, navigation item, avatar, or other single element. Use Badge for
visible inline status text.

NotificationBadge is not a live region, progress indicator, passive text
label, or interactive control. Do not rely on its indicator color or content
as the only accessible meaning.

## Import

```tsx
import { NotificationBadge } from "@flowstack-ui/brick/badge";
import "@flowstack-ui/brick/styles.css";
```

NotificationBadge is also available from the package root. It currently shares
the `badge` package subpath but owns a separate component contract and guide.

## Count and dot modes

```tsx
<NotificationBadge count={4}>
  <button aria-label="Inbox, 4 unread messages">...</button>
</NotificationBadge>

<NotificationBadge dot tone="success" overlap="circular">
  <Avatar alt="" fallback="AL" />
</NotificationBadge>
```

The required child is one React element. Count and dot modes are mutually
exclusive. Counts must be finite non-negative integers. Zero is hidden unless
`showZero` is true. `max` defaults to `99`; larger values render as `99+`.
Invalid counts hide the indicator, and invalid maximums fall back to `99`.

| Prop | Values | Default |
| --- | --- | --- |
| `count` | finite non-negative integer | count mode only |
| `dot` | `true` | `false` |
| `max` | finite positive integer | `99` |
| `showZero` | `boolean` | `false` |
| `invisible` | `boolean` | `false` |
| `tone` | Badge tones | `danger` |
| `size` | `sm`, `md`, `lg` | `md` |
| `placement` | `top-start`, `top-end`, `bottom-start`, `bottom-end` | `top-end` |
| `overlap` | `rectangular`, `circular` | `rectangular` |

One-digit counts and dots are circular. Longer counts expand into a pill.
Logical placement mirrors in RTL. Use rectangular overlap for box-shaped
targets and circular overlap for round targets such as Avatar.

## Native and accessibility contract

The root is a positioning `span`; the conditional internal indicator is always
`aria-hidden="true"` and ignores pointer input. NotificationBadge never
inspects, edits, or names its child. Give the owning control a complete name
such as `Inbox, 4 unread messages`.

The wrapper forwards native span props, `className`, `style`, an
`HTMLSpanElement` ref, `render`, and `data-slot`. It intentionally omits
`asChild` because the parent and sibling indicator structure must remain
stable.

## CSS contract

Stable hooks are `.brick-notification-badge` and
`.brick-notification-badge__indicator`, with default slots
`notification-badge` and `notification-badge-indicator`. Resolved tone, size,
placement, overlap, visibility, and indicator-shape data attributes are public
inspection/customization hooks.

Public tokens cover indicator size, dot size, inline padding, outline color,
and logical translation. Prefer supported props and semantic tokens before
component-token, class, or style overrides.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
