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
  <HoverCard.Trigger asChild>
    <a href="/ada">Ada Lovelace</a>
  </HoverCard.Trigger>
  <HoverCard.Portal>
    <HoverCard.Content>Profile preview</HoverCard.Content>
  </HoverCard.Portal>
</HoverCard.Root>
```

## Anatomy and DOM ownership

Public parts are `Root`, `RootProvider`, `Context`, `Trigger`, `Portal`, `Content`, and `Arrow`. Content
renders an Atom `div` and Brick adds a private viewport around non-Arrow
children. Trigger ref is `HTMLElement`, Content `HTMLDivElement`, and Arrow
`SVGSVGElement`.

## API

Public exports are the `HoverCard` namespace; named `HoverCardRoot`,
`HoverCardTrigger`, `HoverCardPortal`, `HoverCardContent`, and
`HoverCardArrow` parts; and `HoverCardRootProps`, `HoverCardTriggerProps`,
`HoverCardPortalProps`, `HoverCardContentProps`, `HoverCardArrowProps`, and
`HoverCardSize`.

Also exported: `useHoverCard`, `HoverCardRootProvider`, `HoverCardContext`,
`UseHoverCardOptions`, `UseHoverCardReturn`, `HoverCardRootProviderProps`,
`HoverCardContextProps`, `HoverCardIds`, `HoverCardLifecycleOptions`,
`HoverCardOutsideEvents`, `HoverCardPositioningOptions`, and `HoverCardInset`.

| Content prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `sideOffset` | `number` | `8` |
| `inset` | `xs`, `sm`, `md`, `lg` | `md` |
| `radius` | `Radius` | Theme overlay radius |
| `asChild` / `render` | `boolean` / `RenderProp` | `false` / - |

Root inherits Atom open state and hover/focus delay props. Content adds
the size recipe. Content excludes Atom `aria-label` spellings because this
preview has no owned popup accessibility relationship.

Root supports open/defaultOpen and boolean onOpenChange, openDelay (600ms),
closeDelay (300ms), disabled, triggerValue/defaultTriggerValue and
onTriggerValueChange, id/ids, positioning, lazyMount/unmountOnExit (both true),
present, immediate (true), skipAnimationOnMount, hideMode and onExitComplete.
Outside-event callbacks onPointerDownOutside, onInteractOutside, onFocusOutside,
onEscapeKeyDown and onRequestDismiss are preventable. persistentElements
excludes known elements from outside dismissal. Touch retains native activation.

Use unique Trigger value strings with one Content; Context children receive
`{ open, triggerValue }`. `useHoverCard` accepts Root options without children
and returns open, triggerValue, setOpen, setTriggerValue and reposition.
RootProvider takes that unchanged object as value. IDs cover content, arrow
and a string or value-aware function for triggers.

Positioning supports placement, strategy, gutter, offset, shift, flip, slide,
overlap, overflowPadding, boundary, sameWidth, fitViewport, hideWhenDetached,
listeners, sizeMiddleware, animationFrame, arrowPadding, getAnchorRect,
getAnchorElement and onPositioned. Root placement overrides Content side/align;
offset/gutter overrides sideOffset. No separate Positioner is required.

Portal accepts container (HTMLElement or null) and disabled; its default is
the trigger's document body. Inside Dialog use the full Positioner/Content
anatomy and keep HoverCard.Portal enabled to escape scrolling-region clipping
while retaining managed modal ownership. Fixed positioning alone does not
escape a transformed clipping ancestor. Retained content is hidden after exit. Activity pauses effects
where supported by React and otherwise falls back to display-none.

## Visual recipes and states

### Overlay arrow contract

Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.


Size changes maximum inline width. Atom owns open/closed state, delays,
collision-aware placement, presence, and Arrow positioning. The private
viewport owns overflow and maximum block size.

Insets are 12/16/20/24px independently of the 16/20/24rem width recipes.
Small body typography and semantic floating shadow form the neutral surface.
Authored Paragraph tones are preserved. Direct unclassed paragraphs use the
muted foreground token. Radius accepts core and semantic tokens; full adds
inline breathing room. Arrow remains explicit, optional and directly authored
inside Content (including fragments), with default 10px spread and 5px height.

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

Use Root positioning and Brick size, inset and radius first, then public tokens. Customize
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
