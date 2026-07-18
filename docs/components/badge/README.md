# Badge and NotificationBadge

Badge presents passive inline status, category, or count text. NotificationBadge
attaches a visual-only numeric count or dot to one anchor. Both build on Atom's
server-safe Badge root; Brick adds visual recipes and geometry, not behavior.

## Use and avoid

Use Badge for visible words such as `Published`, `Pending`, or `Beta`, nearby
contextual counts, and passive tags with `shape="pill"`. Use NotificationBadge
for unread counts or presence dots attached to a named button, link, navigation
item, or avatar.

Badge is not interactive. Use Button for an action, a future Toggle for a
persistent selection, and a separately audited Tag if removable value/control
anatomy is needed. Neither component is a live region or progress indicator.

## Import

```tsx
import { Badge, NotificationBadge } from "@flowstack-ui/brick/badge";
import "@flowstack-ui/brick/styles.css";
```

Both components are also available from the package root.

## Badge

```tsx
<Badge tone="success">Published</Badge>
<span>Open issues <Badge>12</Badge></span>
<Badge shape="pill">TypeScript</Badge>
```

Badge renders Atom's native `span`, forwards native props and its ref, and
supports Atom `asChild` and `render` composition. It adds no role, tab stop,
keyboard model, state, generated content, or announcement.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `soft`, `solid`, `outline` | `soft` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `neutral` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `rounded`, `pill` | `rounded` |

Normal content belongs in `children`. Visual props are removed before native
forwarding. The native `color` attribute is intentionally omitted in favor of
the semantic `tone` vocabulary.

## NotificationBadge

```tsx
<NotificationBadge count={4}>
  <button aria-label="Inbox, 4 unread messages">...</button>
</NotificationBadge>

<NotificationBadge dot tone="success" overlap="circular">
  <span aria-label="Ada Lovelace, online" role="img">AL</span>
</NotificationBadge>
```

The required child is one React element. The root is a positioning `span` and
the indicator is an internal `span` with `aria-hidden="true"`. NotificationBadge
does not inspect or rename its child: the owning control or nearby context must
provide the complete accessible meaning.

Count and dot modes are mutually exclusive. Counts must be finite non-negative
integers. Zero is hidden unless `showZero` is true. `max` defaults to `99` and
values above it render as `99+`; an invalid count renders no indicator and an
invalid maximum falls back to `99`.

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
Logical placement mirrors in RTL. NotificationBadge forwards wrapper native
props, `className`, `style`, ref, `render`, and `data-slot`; it omits `asChild`
because the stable parent is required for its sibling indicator.

## Accessibility

Color must reinforce visible meaning rather than supply it. Do not rely on
`aria-label` to name Badge's generic `span`; use nearby visible or
programmatically associated context. When content changes and truly constitutes
a status message, the application owns the deliberate live-region pattern.

NotificationBadge's indicator is visual-only. Give its owning button or link a
complete name such as `Inbox, 4 unread messages`. Meaningful presence dots must
likewise appear in the anchor's accessible context. The component never
announces count changes automatically.

## CSS contract

Stable hooks are `.brick-badge`, `.brick-notification-badge`, and
`.brick-notification-badge__indicator`, with default slots `badge`,
`notification-badge`, and `notification-badge-indicator`. Resolved recipe data
attributes are public inspection/customization hooks.

Public component tokens include Badge size, padding, and radius variables plus
NotificationBadge size, dot size, inline padding, and outline color variables.
Prefer supported props and semantic tokens before component-token, class, or
style overrides. Both components support dark appearance, forced colors,
zoom/reflow, long content, and direction without breakpoint props.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
