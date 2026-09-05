# AvatarGroup

AvatarGroup presents several compact Avatar identities in one overlapping
inline stack with optional explicit overflow.

## When and where to use

Use it for collaborator summaries, review participants, project members, or
other compact identity sets whose individual Avatars should share one visual
footprint.

## When not to use

Use HStack or Stack when identities should remain separated or wrap. Use List
or DataList when identity facts matter. Use a Button, Link, Menu, or Popover in
`renderOverflow` when the overflow item must perform an action or disclose
participants.

## Installation and imports

```tsx
import { AvatarGroup } from "@flowstack-ui/brick/avatar-group";
import { Avatar } from "@flowstack-ui/brick/avatar";
import "@flowstack-ui/brick/styles.css";
```

For route-aware CSS, load `core.css` and `avatar-group.css`. The modular group
entry includes Avatar CSS.

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/avatar-group.css";
```

Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<AvatarGroup size="sm">
  <Avatar alt="Ada Lovelace" fallback="AL" />
  <Avatar alt="Grace Hopper" fallback="GH" />
</AvatarGroup>
```

## Anatomy and DOM ownership

The root is a neutral `div` by default or a deliberate `span`. Each visible
child receives one neutral item wrapper. AvatarGroup does not clone children,
change their DOM order, or add a role. The ref targets the selected root.

## API

Public exports are `AvatarGroup`, `AvatarGroupProps`, `AvatarGroupElement`,
`AvatarGroupOverlap`, and `AvatarGroupStacking`.

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `div`, `span` | `div` |
| `size` | Avatar sizes `xs` through `5xl` | `md` |
| `shape` | `circle`, `rounded` | `circle` |
| `overlap` | `none`, `sm`, `md`, `lg` | `md` |
| `stacking` | `first-on-top`, `last-on-top` | `last-on-top` |
| `max` | positive visual-slot budget | none |
| `total` | complete known identity count | child count |
| `overflowLabel` | localized `(count) => string` | required for built-in overflow |
| `renderOverflow` | custom `(count) => ReactNode` | none |

Without `max`, `total`, `overflowLabel`, and `renderOverflow` are unavailable.
When overflow exists, one maximum slot is reserved for it. `total` never
under-reports rendered children.

Author `max` as a positive integer. Runtime fractional values are floored and
non-positive or non-finite values are normalized to one visual slot, so an
invalid dynamic budget still produces one explicit overflow representation.
A non-finite `total` falls back to the direct-child count.

## Visual recipes and states

One group size and shape apply to every descendant Brick Avatar. Overlap uses
logical margins and stacking changes only paint order, never DOM order.
Avatar owns all image, fallback, status, color, outline, theme, and
forced-color presentation.
Zero children render only the neutral root; one child renders one item without
an overflow wrapper or synthetic peer.

## Tokens and CSS hooks

Stable hooks are `.brick-avatar-group`, `.brick-avatar-group__item`,
`.brick-avatar-group__overflow`, slots `avatar-group`, `avatar-group-item`, and
`avatar-group-overflow`, plus root `data-count`, `data-overlap`, `data-shape`,
`data-size`, and `data-stacking` attributes.

Public tokens are `--brick-avatar-group-overlap` and
`--brick-avatar-group-outline-color`.

## Customization

Choose a named size, shape, overlap, and stacking recipe first. Use
`--brick-avatar-group-overlap` for an uncommon local overlap and
`--brick-avatar-group-outline-color` to coordinate peer separation with the
surrounding surface. Root `className` and `style` remain deliberate escape
hatches.

## Responsive behavior

AvatarGroup is non-wrapping and content-sized. At constrained widths choose a
smaller named size/overlap or an explicit maximum. It does not choose
application breakpoints.

## Accessibility

Child Avatar semantics stay in source order. Add `role="group"` and an
accessible name only when the identities form one named relationship. The
built-in overflow requires a localized accessible name. A custom renderer
owns its own semantics, focus, and interaction. AvatarGroup adds no keyboard
behavior or live announcements.

## Composition, native props, and refs

Place Brick Avatar elements directly inside AvatarGroup. Native and ARIA root
attributes, events, `className`, and `style` pass through. The `slot` prop
overrides the public `data-slot` hook and is not forwarded as the native HTML
slot attribute. The ref targets the selected `div` or `span` host.

## Examples

```tsx
<AvatarGroup
  max={3}
  overflowLabel={(count) => `${count} more collaborators`}
  size="sm"
>
  <Avatar alt="Ada Lovelace" fallback="AL" />
  <Avatar alt="Grace Hopper" fallback="GH" />
  <Avatar alt="Katherine Johnson" fallback="KJ" />
  <Avatar alt="Margaret Hamilton" fallback="MH" />
</AvatarGroup>
```

## Evidence

- [Playground](../../../playground/src/components/avatar-group/AvatarGroupPage.tsx)
- [Unit test](../../../test/components/avatar-group/avatar-group.test.tsx)
- [Type owner](../../../test/types/components/avatar-group.test.ts)
- [Browser spec](../../../playground/tests/components/avatar-group/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/avatar-group/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/avatar-group.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
