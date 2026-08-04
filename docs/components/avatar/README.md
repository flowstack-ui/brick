# Avatar

Avatar presents an image or fallback identity in a finished Brick frame.

## When and where to use

Use it for people, organizations, or other compact identities.

## When not to use

Do not use it as a generic image, upload control, avatar editor, group, or
presence system. A status ring is visual metadata, not a live announcement.

## Installation and imports

```tsx
import { Avatar } from "@flowstack-ui/brick/avatar";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/avatar.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Avatar src="/ada.jpg" alt="Ada Lovelace" fallback="AL" />
```

## Anatomy and DOM ownership

The direct component renders an Atom root `span`, optional Atom image, and
always-present Atom fallback. The ref targets the root `HTMLSpanElement`.
Image and fallback are implementation-owned, not public compound parts.

## API

Public exports are `Avatar`, `AvatarProps`, `AvatarSize`, `AvatarShape`, and
`AvatarStatus`.

| Prop | Values | Default |
| --- | --- | --- |
| `src` | `string` | none |
| `alt` | `string` (required; `""` allowed) | — |
| `fallback` | `ReactNode` (required) | — |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `shape` | `circle`, `rounded` | `circle` |
| `status` | `online`, `away`, `busy`, `offline` | none |
| `fallbackDelayMs` | `number` | Atom default |
| `onLoadingStatusChange` | Atom image-status callback | none |

Root span attributes except `children` and `color` are forwarded.

## Visual recipes and states

Sizes change frame and fallback type together. Shape controls circle or rounded
geometry. Status adds a non-interactive ring. Failed, absent, or delayed images
resolve through Atom fallback behavior.

## Tokens and CSS hooks

Stable hooks are `.brick-avatar`, `.brick-avatar__image`,
`.brick-avatar__fallback`, slots `avatar`, `avatar-image`, `avatar-fallback`,
and root `data-size`, `data-shape`, `data-status`. Public tokens are
`--brick-avatar-size`, `--brick-avatar-radius`, `--brick-avatar-background`,
`--brick-avatar-foreground`, `--brick-avatar-outline-color`,
`--brick-avatar-outline-width`,
`--brick-avatar-status-ring-color`, `--brick-avatar-status-ring-width`, and
`--brick-avatar-status-ring-offset`. The fallback-font variable is an internal
size-recipe detail, not a public token.

## Customization

Use size, shape, and status first, then public Avatar tokens. Root `className`
and `style` are escape hatches; image/fallback classes are styling hooks, not
renderable parts.

## Responsive behavior

Avatar stays at its selected size and does not choose breakpoints or responsive
sources. Logical styling supports RTL; the application owns layout.

## Accessibility

Use meaningful `alt` for an informative image. Use `alt=""` for decorative
identity; the fallback is then hidden from assistive technology. Without an
image, a non-empty `alt` labels the fallback image role. Status needs separate
accessible text when it conveys meaningful presence.

## Composition, native props, and refs

Avatar has no `asChild` or `render` path. Native span props are forwarded and
the ref targets the root span.

## Examples

```tsx
<Avatar alt="Ada Lovelace" fallback="AL" size="lg" status="online" />
```

## Evidence

- [Playground](../../../playground/src/components/avatar/AvatarPage.tsx)
- [Unit test](../../../test/components/avatar/avatar.test.tsx)
- [Type owner](../../../test/types/components/avatar.test.ts)
- [Browser spec](../../../playground/tests/components/avatar/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/avatar/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/avatar.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
