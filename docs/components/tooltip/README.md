# Tooltip

Tooltip supplies a short supplementary label or description for a trigger.

## When and where to use

Use it to clarify an icon or unfamiliar control on hover and keyboard focus.

## When not to use

Do not place required, interactive, or lengthy content in a Tooltip. Use
HoverCard for previews and Popover for click-open interactive content.

## Installation and imports

```tsx
import { Tooltip } from "@flowstack-ui/brick/tooltip";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<Tooltip.Root>
  <Tooltip.Trigger aria-label="Delete">×</Tooltip.Trigger>
  <Tooltip.Portal><Tooltip.Content>Delete</Tooltip.Content></Tooltip.Portal>
</Tooltip.Root>
```

## Anatomy and DOM ownership

Public parts are `Provider`, `Root`, `Trigger`, `Portal`, `Content`, `Title`,
`Description`, and `Arrow`. Title/Description default to `span` and are
Brick-owned structure parts; other behavior parts use Atom. Content ref is
`HTMLDivElement`, Arrow `SVGSVGElement`, and composed parts `HTMLElement`.

## API

Public exports are the `Tooltip` namespace; named `TooltipProvider`,
`TooltipRoot`, `TooltipTrigger`, `TooltipPortal`, `TooltipContent`,
`TooltipTitle`, `TooltipDescription`, and `TooltipArrow` parts; and their
corresponding `TooltipProviderProps`, `TooltipRootProps`,
`TooltipTriggerProps`, `TooltipPortalProps`, `TooltipContentProps`,
`TooltipTextProps`, `TooltipTitleProps`, `TooltipDescriptionProps`,
`TooltipArrowProps`, and `TooltipShape` types.

| Content prop | Values | Default |
| --- | --- | --- |
| `shape` | `rounded`, `pill` | `rounded` |
| `sideOffset` | `number` | `8` |

| Title/Description prop | Values | Default |
| --- | --- | --- |
| `asChild` | `boolean` | `false` |

Root and Provider inherit Atom state/delay props. Content adds
the shape recipe and excludes Atom `aria-label` spellings. Title and
Description accept native attributes plus `asChild` or `render`.

## Visual recipes and states

Shape changes Content geometry. Plain text remains compact; Title and
Description create rich structured content. Atom owns open/closed state,
delays, presence, placement, collision handling, and Arrow coordinates.

## Tokens and CSS hooks

Stable classes and overridable `data-slot` values cover trigger, content,
title, description, and arrow;
Content exposes `data-shape` plus Atom state/placement data. Public tokens are
`--brick-tooltip-background`, `--brick-tooltip-foreground`,
`--brick-tooltip-border-color`, `--brick-tooltip-radius`,
`--brick-tooltip-shadow`, `--brick-tooltip-padding-block`,
`--brick-tooltip-padding-inline`, `--brick-tooltip-max-inline-size`,
`--brick-tooltip-rich-gap`, and `--brick-tooltip-rich-max-inline-size`.

## Customization

Use placement/delay and shape props first, then public tokens. Use part
`className`, `style`, `asChild`, or `render` for scoped structure.

## Responsive behavior

Text wraps within its maximum inline size and Atom flips/shifts Content around
viewport collisions. Logical placement supports RTL.

## Accessibility

Atom owns tooltip relationship, hover/focus opening, Escape dismissal, and
noninteractive semantics. The trigger still needs its own accessible name when
the tooltip text is only supplementary.

## Composition, native props, and refs

Atom parts inherit Atom composition. Title/Description support exactly one
`asChild` child or a `render` element and merge refs, class, and style.

## Examples

```tsx
<Tooltip.Content shape="pill">
  <Tooltip.Title>Keyboard shortcut</Tooltip.Title>
  <Tooltip.Description>Command K</Tooltip.Description>
</Tooltip.Content>
```

## Evidence

- [Playground](../../../playground/src/components/tooltip/TooltipPage.tsx)
- [Unit test](../../../test/components/tooltip/tooltip.test.tsx)
- [Type owner](../../../test/types/components/tooltip.test.ts)
- [Browser spec](../../../playground/tests/components/tooltip/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/tooltip/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/tooltip.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
