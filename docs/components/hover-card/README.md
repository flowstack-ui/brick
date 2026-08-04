# Hover Card

HoverCard shows nonessential preview information from a link-like trigger.

## When and where to use

Use it for a supplementary person, resource, or destination preview that can
also be reached independently.

## When not to use

Do not put required instructions or primary actions only in a HoverCard. Use
Popover for click-open interactive content and Tooltip for a short label.

## Installation and imports

```tsx
import { HoverCard } from "@flowstack-ui/brick/hover-card";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/hover-card.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<HoverCard.Root>
  <HoverCard.Trigger href="/ada">Ada Lovelace</HoverCard.Trigger>
  <HoverCard.Portal>
    <HoverCard.Content>Profile preview</HoverCard.Content>
  </HoverCard.Portal>
</HoverCard.Root>
```

## Anatomy and DOM ownership

Public parts are `Root`, `Trigger`, `Portal`, `Content`, and `Arrow`. Content
renders an Atom `div` and Brick adds a private viewport around non-Arrow
children. Trigger ref is `HTMLElement`, Content `HTMLDivElement`, and Arrow
`SVGSVGElement`.

## API

Public exports are the `HoverCard` namespace; named `HoverCardRoot`,
`HoverCardTrigger`, `HoverCardPortal`, `HoverCardContent`, and
`HoverCardArrow` parts; and `HoverCardRootProps`, `HoverCardTriggerProps`,
`HoverCardPortalProps`, `HoverCardContentProps`, `HoverCardArrowProps`, and
`HoverCardSize`.

| Content prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `sideOffset` | `number` | `8` |

Root inherits Atom open state and hover/focus delay props. Content adds
the size recipe. Content excludes Atom `aria-label` spellings because this
preview is described by its trigger relationship.

## Visual recipes and states

Size changes maximum inline width. Atom owns open/closed state, delays,
collision-aware placement, presence, and Arrow positioning. The private
viewport owns overflow and maximum block size.

## Tokens and CSS hooks

Stable classes and overridable `data-slot` values cover trigger, content,
viewport, and arrow. Content reflects `data-size`. Public tokens
are `--brick-hover-card-background`, `--brick-hover-card-foreground`,
`--brick-hover-card-muted-foreground`, `--brick-hover-card-border`,
`--brick-hover-card-radius`, `--brick-hover-card-shadow`,
`--brick-hover-card-padding`, `--brick-hover-card-gap`,
`--brick-hover-card-max-block-size`,
`--brick-hover-card-max-inline-size-sm`,
`--brick-hover-card-max-inline-size-md`, and
`--brick-hover-card-max-inline-size-lg`. The viewport is implementation-owned.

## Customization

Use Atom placement props and Brick size first, then public tokens. Customize
public parts with their `className`/`style`; do not depend on viewport markup.

## Responsive behavior

Atom collision handling may flip or shift Content. Maximum size respects the
viewport and the inner viewport scrolls when needed. Direction-aware placement
comes from Atom.

## Accessibility

The trigger must remain a usable destination without the preview. Atom owns
hover/focus opening and dismissal. Do not require users to interact with
preview-only content.

## Composition, native props, and refs

Atom composition/native props pass through public Atom parts. Refs target the
elements listed under anatomy.

## Examples

```tsx
<HoverCard.Content size="lg" side="bottom">
  Preview
  <HoverCard.Arrow />
</HoverCard.Content>
```

## Evidence

- [Playground](../../../playground/src/components/hover-card/HoverCardPage.tsx)
- [Unit test](../../../test/components/hover-card/hover-card.test.tsx)
- [Type owner](../../../test/types/components/hover-card.test.ts)
- [Browser spec](../../../playground/tests/components/hover-card/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/hover-card/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/hover-card.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
