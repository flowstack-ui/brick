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

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/tooltip.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Tooltip.Root>
  <Tooltip.Trigger aria-label="Delete">×</Tooltip.Trigger>
  <Tooltip.Portal><Tooltip.Content>Delete</Tooltip.Content></Tooltip.Portal>
</Tooltip.Root>
```

## Anatomy and DOM ownership

Public parts are `Provider`, `Root`, `Trigger`, `Portal`, `Content`, `Title`,
`Description`, `Arrow`, `RootProvider`, and `Context`. Title/Description default to `span` and are
Brick-owned structure parts; other behavior parts use Atom. Content ref is
`HTMLDivElement`, Arrow `SVGSVGElement`, and composed parts `HTMLElement`.

## API

### Controller, state and lifecycle

`Tooltip.RootProvider` and `useTooltip` share Root's state owner. Use
`useTooltip(options)` and pass its result as `value` to RootProvider; do not
nest another Root. `Tooltip.Context` accepts a child callback receiving
`open`, `setOpen`, `triggerValue`, and `setTriggerValue`.

Root supports `closeOnClick`, `closeOnPointerDown`, `closeOnScroll`, and
`closeOnEscape` (all true), plus `interactive` hover retention. Plain defaults
to no retention; legacy rich defaults to retention. Set `interactive` explicitly
when you need a separate pointer policy. Both recipes remain non-interactive.

Use distinct Trigger `value` strings with `triggerValue`, `defaultTriggerValue`
and `onTriggerValueChange(value)` for one shared tooltip. Only the active
trigger receives the owned description. Existing description IDs are retained.
Root `id`, `ids` (`content`, `arrow`, `trigger` string or value-to-ID function)
and `aria-label` support explicit relationships and alternative tooltip text.

Root lifecycle props are `lazyMount=true`, `unmountOnExit=true`, `present`,
`onExitComplete`, `immediate=false`, `skipAnimationOnMount=false` and
`hideMode="display-none"`. Activity hiding requires React 19.2+. Kept content
is hidden and inaccessible when closed. Content supports `asChild`, `render`
and `ariaLabel`; preserve the composed host's ref, style and native attributes.

Root `positioning: TooltipPositioningOptions` supports `placement`, `strategy`,
`gutter`, `offset` (`mainAxis`, `crossAxis`), `flip`, `slide`, `boundary`,
`overflowPadding`, `sameWidth`, `fitViewport`, `hideWhenDetached`, `listeners`,
`animationFrame`, `arrowPadding`, `shift`, `overlap`, `sizeMiddleware`,
`onPositioned`, `getAnchorElement`, and `getAnchorRect`. Supplied fields override
legacy Content placement fallbacks. Virtual rectangles use `{x,y,width,height}`.

Additional exports: `TooltipRootProvider`, `TooltipContext`, `useTooltip`,
`UseTooltipOptions`, `UseTooltipReturn`, `TooltipRootProviderProps`,
`TooltipState`, `TooltipStateProps`, `TooltipPositioningOptions`, `TooltipIds`,
and `TooltipLifecycleOptions`.

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

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

### Overlay arrow contract

Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.


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
