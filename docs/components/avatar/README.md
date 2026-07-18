# Avatar

Avatar represents a person, team, workspace, or other named entity with an
image and explicit fallback content. Atom owns image loading and fallback
state; Brick adds the finished frame, accessibility mapping, sizes, shapes, and
optional status ring.

## Use and avoid

Use Avatar as a compact recognition aid beside a visible name, as an
informative identity graphic when nearby text does not repeat it, or as a
decorative visual inside a separately named Button or Link.

Do not use Avatar for arbitrary media, as the only identity cue in a
consequential workflow, or as an interactive control. Use NotificationBadge
for an attached count or dot. Avatar's `status` ring is limited to named
availability states; it is not a generic focus, selection, validation, story,
severity, or branding ring.

## Import

```tsx
import { Avatar } from "@flowstack-ui/brick/avatar";
import "@flowstack-ui/brick/styles.css";
```

Avatar is also available from the package root.

## Basic use

```tsx
<Avatar
  src="/people/ada.jpg"
  alt="Ada Lovelace"
  fallback="AL"
/>
```

`alt` and `fallback` are both required. `alt` accepts a deliberate empty string
for decorative use; Brick does not guess image purpose, generate initials, or
choose a hidden fallback icon.

```tsx
<span className="person-row">
  <Avatar src="/people/ada.jpg" alt="" fallback="AL" />
  <span>Ada Lovelace</span>
</span>
```

## Sizes and shapes

```tsx
<Avatar alt="Ada" fallback="A" size="xs" />
<Avatar alt="Ada" fallback="A" size="sm" />
<Avatar alt="Ada" fallback="A" size="md" />
<Avatar alt="Ada" fallback="A" size="lg" />
<Avatar alt="Ada" fallback="A" size="xl" />

<Avatar alt="Flowstack workspace" fallback="FS" shape="rounded" />
```

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `shape` | `circle`, `rounded` | `circle` |

The dimensions are 24, 32, 40, 48, and 64 CSS pixels. Avatar is passive, so
those values are not interactive target-size claims. An owning Button or Link
provides its own comfortable hit area.

## Status ring

```tsx
<Avatar
  src="/people/ada.jpg"
  alt=""
  fallback="AL"
  shape="rounded"
  status="online"
/>
<span>Ada Lovelace — Online</span>
```

| Status | Visual role | Meaning |
| --- | --- | --- |
| `online` | success ring | available or online |
| `away` | warning ring | away or idle |
| `busy` | danger ring | busy or do not disturb |
| `offline` | strong neutral ring | offline or unavailable |

The application supplies `status`; Avatar does not detect availability. The
external layered ring follows the exact circle or rounded radius without
changing layout. Status color is visual reinforcement only. Nearby visible
text or an owning control's localized accessible name must communicate the
same status when it matters.

## NotificationBadge composition

NotificationBadge can wrap Avatar, a native image, an icon wrapper, a button,
or any other single React element. Its indicator remains a count or dot.

```tsx
<NotificationBadge count={3} overlap="circular">
  <Avatar
    src="/people/ada.jpg"
    alt=""
    fallback="AL"
    status="online"
  />
</NotificationBadge>
```

Use the ring for Avatar status and the corner indicator for a count/dot. They
may coexist only when they communicate distinct information and both meanings
are available outside color alone.

## Loading and fallback

`src` is optional. Missing, loading, and failed sources render `fallback`; a
loaded source renders the native image. `fallbackDelayMs` can suppress a brief
fallback flash, and `onLoadingStatusChange` receives `idle`, `loading`,
`loaded`, or `error` from Atom.

For informative use, the loaded image receives `alt`; fallback renders as an
image with the same accessible name. For `alt=""`, both loaded image and
fallback are decorative. Loading changes are not announced as live status.

## Native and ref contract

Avatar renders a `span`, forwards native span props, `className`, `style`,
events, ARIA/data attributes, and an `HTMLSpanElement` ref. Visual props are
removed before DOM forwarding. Avatar intentionally omits `asChild`, `render`,
native `color`, public Image/Fallback parts, and a Group namespace.

Default metadata:

```html
<span
  class="brick-avatar"
  data-shape="circle"
  data-size="md"
  data-slot="avatar"
>
  ...
</span>
```

When supplied, `status` adds `data-status` to the same root.

## CSS contract

The stable root hook is `.brick-avatar`; internal implementation hooks are
`.brick-avatar__image` and `.brick-avatar__fallback`. The overridable public
root slot defaults to `avatar`; internal slots are `avatar-image` and
`avatar-fallback`.

Public component-token candidates are:

```css
--brick-avatar-size
--brick-avatar-radius
--brick-avatar-background
--brick-avatar-foreground
--brick-avatar-outline-color
--brick-avatar-outline-width
--brick-avatar-status-ring-color
--brick-avatar-status-ring-width
--brick-avatar-status-ring-offset
```

Prefer supported props and semantic tokens before component-token, class, or
style overrides. Avatar supports light/dark appearance, RTL, forced colors,
zoom/reflow, and reduced-preference modes without breakpoint props or motion.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
