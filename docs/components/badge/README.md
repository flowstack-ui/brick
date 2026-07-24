# Badge

Badge presents passive inline status, category, or nearby count text. It builds
on Atom's server-safe Badge root; Brick adds finished visual recipes without
adding interaction or announcement behavior.

## Use and avoid

Use Badge for visible words such as `Published`, `Pending`, or `Beta`, nearby
contextual counts, and passive tags with `shape="pill"`.

Badge is not interactive. Use Button for a command, Toggle for a persistent
selection, NotificationBadge for a count or dot attached to one element, and a
separately audited Tag if removable value/control anatomy is needed. Badge is
not a live region or progress indicator.

## Import

```tsx
import { Badge } from "@flowstack-ui/brick/badge";
import "@flowstack-ui/brick/styles.css";
```

Badge is also available from the package root.

## Basic use

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

## Accessibility

Visible text carries Badge's meaning; tone only reinforces it. Do not add an
`aria-label` to name the generic `span`. Use nearby visible or programmatically
associated context. When changing content truly constitutes a status message,
the application owns the deliberate live-region pattern.

## CSS contract

The stable root hook is `.brick-badge`, and the default slot is `badge`.
Resolved variant, tone, size, and shape data attributes are public
inspection/customization hooks.

Public component tokens cover background, foreground, border, minimum block
size, padding, radius, font size, and semantic tone mappings. Prefer supported
props and semantic tokens before component-token, class, or style overrides.
Badge supports dark appearance, forced colors, zoom/reflow, long content, and
direction without breakpoint props.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
