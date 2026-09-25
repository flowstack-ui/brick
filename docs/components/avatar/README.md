# Avatar

Avatar presents an image or fallback identity in a finished Brick frame.

## When and where to use

Use it for people, organizations, or other compact identities in a fixed
square frame with explicit fallback content.

## When not to use

Do not use it as a generic image, upload control, avatar editor, or presence
system. Compose multiple identities through AvatarGroup rather than hand-built
negative margins. A status ring is visual metadata, not a live announcement.
Use Image for a larger editorial or profile portrait when authored aspect
ratio, crop, focal position, or available measure communicates identity.

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

The callable component renders a root span, native image and state-dependent
fallback. Its ref targets the root span. For custom composition use
`Avatar.Root`, `Avatar.Image`, `Avatar.Fallback` and `Avatar.Icon`, also available
as named exports with matching Props types. Root requires `alt`; Image inherits
the identity and source. Each compound part forwards its native ref and supports
Atom composition (Icon accepts native SVG props).

```tsx
<Avatar.Root alt="Ada Lovelace" src="/ada.jpg" tone="accent" variant="subtle">
  <Avatar.Image loading="lazy" srcSet="/ada@2x.jpg 2x" sizes="40px" />
  <Avatar.Fallback delayMs={150}>AL</Avatar.Fallback>
</Avatar.Root>
```

Image stays server-rendered and uses native loading/request attributes, with no
detached preload. The convenience API accepts these attributes in `imageProps`.
Fallback omission supplies a generic person icon, never inferred initials.

## API

Public exports are `Avatar`, `AvatarProps`, `AvatarSize`, `AvatarShape`, and
`AvatarStatus`.

| Prop | Values | Default |
| --- | --- | --- |
| `src` | `string` | none |
| `alt` | `string` (required; `""` allowed) | — |
| `fallback` | `ReactNode` | generic person icon |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `full` | `md` |
| `variant` | `subtle`, `solid`, `outline` | `subtle` |
| `tone` | `neutral`, `accent`, `contrast` | `neutral` |
| `borderless` | `boolean` | false |
| `imageProps` | native image attributes | none |
| `shape` | `circle`, `rounded` | `circle` |
| `status` | `online`, `away`, `busy`, `offline` | none |
| `fallbackDelayMs` | `number` | Atom default |
| `onLoadingStatusChange` | Atom image-status callback | none |

Root span attributes except `children` and `color` are forwarded.

Named sizes are 24, 32, 36, 40, 44, 48, 64, 96, 112 and 128px. This replaces
the previous xs=24, sm=32, lg=48, xl=64, 2xl=80 progression. Audit those names
when migrating; md stays 40px. `full` requires a parent with definite equal
inline and block dimensions. Rings never enlarge the outer box.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Sizes change frame and fallback type together. Shape controls circle or rounded
geometry. Status adds a non-interactive ring. Failed, absent, or delayed images
resolve through Atom fallback behavior.

Inside AvatarGroup, presentation props are defaults. Explicit child size,
radius, shape, tone, variant and borderless choices override inherited values.

Standalone Avatar has no separation outline by default. Overlapping groups
draw the separation inside each Avatar's declared square. Neither grouping nor
enabling an outline enlarges that square. Non-overlapping groups and groups with one rendered item omit the ring.
Set the documented outline width/color tokens for an optional standalone ring;
the border stays inside the named size and insets the image/fallback. Background
paint is clipped away from the border to avoid a dark antialiased outer fringe.

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

Use size, shape, and status first, then public Avatar tokens. Named `2xl`–`5xl`
sizes cover larger square profile identities; use Image for non-square or
editorial portraits instead of overriding `--brick-avatar-size`. Root
`className` and `style` are escape hatches. Use the compound Image and Fallback
parts for native attributes, refs and custom composition.

## Responsive behavior

Avatar stays at its selected size and does not choose breakpoints or responsive
sources. Logical styling supports RTL; the application owns layout.

## Accessibility

Use meaningful `alt` for an informative image. Use `alt=""` for decorative
identity; the fallback is then hidden from assistive technology. Without an
image, a non-empty `alt` labels the fallback image role. Status needs separate
accessible text when it conveys meaningful presence.

Nearby identity text does not make every Avatar decorative automatically.
Choose `alt` from context: preserve a meaningful alternative when the Avatar
adds identity that the surrounding content does not already provide, and use
`alt=""` only when the same identity is already supplied by adjacent text or
the owning control's accessible name.

## Composition, native props, and refs

The callable Avatar convenience has no `asChild` or `render` path because it
supplies its own image and fallback. Compound Root, Image and Fallback retain
their public Atom host-composition paths and native refs. Preserve passive
identity semantics when composing a host. Use AvatarGroup for overlap, paint
order, and explicit overflow representation.

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
