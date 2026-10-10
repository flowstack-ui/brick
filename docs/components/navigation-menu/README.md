# Navigation Menu

Use `Viewport anchor="navigation"` to align a shared panel against the navigation
Root, or retain the default `anchor="trigger"` to follow the active trigger.
Both support logical `align` and collision handling. Indicator always tracks
the trigger. Do not replace this geometry with playground CSS.

Shared panels enter and exit in logical order while the viewport resizes.
`--brick-navigation-menu-content-duration` customizes the content exchange;
`--brick-navigation-menu-motion-duration` customizes viewport motion. Reduced
motion suppresses panel animation. Inline content keeps its normal document flow.

Vertical panels use the available space beside the navigation and flip to the
opposite side when it has more room. Indicators follow the resolved side in
LTR and RTL. Constrain authored fixed-width children with Frame's
`maxInlineSize="100%"` so they can reflow inside the available panel width.

Navigation Menu provides site destinations with optional rich link panels through Atom-owned semantics and behavior.

## When and where to use

Use it for primary destination links when some categories reveal rich groups of additional destinations.

## When not to use

Do not use it for application commands, form choices, small action lists, or content tabs.

## Installation and imports

```tsx
import * as NavigationMenu from "@flowstack-ui/brick/navigation-menu";
import "@flowstack-ui/brick/styles.css";
```

The module-namespace import is safe to compose from a React Server Component:
each part remains a focused Client Component while the containing page remains
server-rendered. The legacy `import { NavigationMenu }` runtime object remains
available for client-owned modules.

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/navigation-menu.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/docs">Docs</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <NavigationMenu.Viewport />
</NavigationMenu.Root>
```

## Anatomy and DOM ownership

Root renders navigation, List a native list, Item a list item, Link a native destination, Trigger a disclosure control, Content a rich destination panel, Indicator the measured active-trigger marker, IndicatorArrow its decorative Viewport connector, Viewport the measured panel surface, and Sub a nested navigation root. An Indicator without children supplies IndicatorArrow automatically; explicit children replace it.

## API

Additional exports: `NavigationMenuRootProvider`, `NavigationMenuContext`,
`NavigationMenuItemIndicator`, `NavigationMenuRootProviderProps`,
`NavigationMenuItemIndicatorProps`, `NavigationMenuVariant`, `NavigationMenuTone`,
`NavigationMenuInset`, `useNavigationMenu`, `useNavigationMenuContext`,
`UseNavigationMenuOptions`, `UseNavigationMenuReturn`, `NavigationMenuApi`.
The subpath also exports short `RootProvider`, `Context`, `ItemIndicator` aliases.

### Disclosure, lifecycle and state

Root supports controlled value/onValueChange or defaultValue. `openDelay` and
`closeDelay` independently override legacy delayDuration=200ms;
skipDelayDuration=300ms. Sub inherits timing, direction, orientation, loop,
pointer and lifecycle policies unless locally overridden.

`disableClickTrigger`, `disableHoverTrigger` and `disablePointerLeaveClose`
default false. These pointer flags preserve Enter/Space, Escape and outside
dismissal. Content's onEscapeKeyDown, onPointerDownOutside, onFocusOutside and
onInteractOutside notifications can cancel dismissal via preventDefault.

Shared viewport=true requires Viewport. Set viewport=false and omit Viewport
and Indicator for non-viewport panels under their Items. Top-level panels stay
outside row flow; nested inline Sub panels expand the measured parent instead.
Only Viewport supplies collision-aware placement. Content forwards its ref, native props
and composition to the real host in either mode. lazyMount and unmountOnExit
default true; unmountOnExit=false retains hidden/inert panel state.
hideMode=display-none works across supported React versions; activity requires
React 19.2+. Viewport forceMount retains its shell, not accessible hidden content.

Viewport align=start/center/end defaults center before collision shifting;
collisionPadding defaults 8px. Bound large content with Frame and ScrollArea,
not custom positioning. NavigationMenu has no Popover side/offset API.

useNavigationMenu(options) with RootProvider value={controller} exposes value,
open, orientation, setValue, isViewportRendered, getViewportNode and reposition.
RootProvider receives visual props while the controller owns behavior options.
Context is a render callback reading those public state/actions. Application
routers and persistence remain external.

Trigger indicator is the sole automatic-chevron switch: undefined supplies the
default, null removes it, and custom content replaces it. Pass ItemIndicator
through indicator for state-aware artwork; its default child is a chevron,
custom children replace it. No child inspection infers replacement. Artwork
is noninteractive and assistive-hidden. Moving Indicator/IndicatorArrow is
separate from the trigger artwork.

Link closeOnClick defaults true. Its onSelect receives a cancelable Event;
preventing it stops closing, not native navigation. Prevent native onClick to
cancel navigation and selection together. Zero-argument callbacks still work.

Public exports are `NavigationMenu`, `NavigationMenuRoot`, `NavigationMenuSub`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuIndicatorArrow`, `NavigationMenuViewport`, `NavigationMenuRootProps`, `NavigationMenuSubProps`, `NavigationMenuListProps`, `NavigationMenuItemProps`, `NavigationMenuTriggerProps`, `NavigationMenuContentProps`, `NavigationMenuLinkProps`, `NavigationMenuIndicatorProps`, `NavigationMenuIndicatorArrowProps`, `NavigationMenuViewportProps`, `NavigationMenuSize`, `NavigationMenuLinkVariant`.

The component subpath additionally exports `Root`, `Sub`, `List`, `Item`,
`Trigger`, `Content`, `Link`, `Indicator`, `IndicatorArrow`, and `Viewport` as
short aliases for the recommended module-namespace composition.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `Root.variant` | `subtle`, `plain` | `subtle` |
| `Root.tone` | `neutral`, `accent`, `contrast` | `neutral` |
| Link `variant` | `control`, `destination`, `panel` | `destination` in Content, otherwise `control` |
| `List.surface` | `transparent`, `raised` | `transparent` |
| Link `controlVariant` | `subtle`, `plain` | Root variant |
| Trigger `variant` / `tone` | Root recipe values | Inherited |
| Trigger / Link `radius` | `Radius` | `control`; destination Link uses `sm` |
| `Content.inset` | `none`, `sm`, `md`, `lg` | `sm` |
| Viewport `radius` | `Radius` | `sm` |
| Viewport `anchor` | `"trigger" \| "navigation"` | `trigger` |

These are navigation destinations, not action rows. Prefer neutral or accent
for ordinary navigation; contrast gives stronger neutral emphasis without an inverted fill. Triggers
and inner links inherit the same palette; the viewport remains neutral.
Behavioral props come from the matching Atom parts.

## Visual recipes and states

List is transparent by default for header integration. `surface="raised"`
provides a compact bar with 4px inset, sharing Viewport background, foreground,
border and radius tokens. Do not wrap it in another painted Surface unless
deliberately composing a separate region. Tone changes interactions, not the
surface's appearance; use Appearance around Root for a local light/dark scope.

Links inside Content default to `destination`: a full allocated row with 8px
block / 12px inline padding and small core corners. Top-level links remain
`control`; a nested List resets that context. Explicit variants override it.
Compose destination titles/descriptions with VStack gap="1". Use Content's
default 8px inset for compact lists and inset="md" for rich grids. Avoid large
row gaps and redundant width props. Custom `panel` links retain Surface ownership.
`--brick-navigation-menu-destination-radius` customizes destination corners
independently from `--brick-navigation-menu-control-radius`.

For `NavigationMenu.Link asChild`, use an unstyled native anchor or router link
that forwards props and its ref. Do not layer Brick's separately styled Link
onto the same host: its tone/variant attributes compete with navigation recipes.
Non-viewport top-level panels align to their own Item; the shared Viewport owns
collision-aware placement. Horizontal chevrons retain down/up meaning in RTL.

Controls are paintless at rest. The default subtle recipe adds neutral hover
and open paint; plain keeps backgrounds unchanged while retaining focus.
Links and triggers use Button-aligned 36/40/44px `sm`/`md`/`lg` minimums,
12/14/16px typography and matching inline padding. Compact chevrons communicate
disclosure, current links use a one-pixel underline, and the measured
IndicatorArrow connects the open trigger to the Viewport without becoming a
second selection bar. Viewport defaults to the compact core `sm` radius; select
another core or semantic corner recipe with its radius prop.
In vertical orientation, the Viewport follows Atom's
measured active-trigger offset so the connector stays attached while panels of
different heights replace one another.

`Link variant="panel"` turns the same native destination into a full-width,
wrapping link frame for concise rich content. Place one direct `Surface` child
inside it so Surface owns background, inset, border, elevation, and radius
while the Link owns the complete click, touch, and focus target. Never place
another link or control inside it. If a direct Surface is omitted, the Link
keeps its own visible focus ring rather than leaving keyboard focus invisible.
In horizontal orientation, Atom centers the Viewport on the active Trigger by
default, or on Root with `anchor="navigation"`, and collision-shifts it inside
the visible browser boundary. Brick uses the same
physical geometry for the Indicator arrow in LTR and RTL. Set the inherited
`collisionPadding` prop on `Viewport` to change its eight-pixel boundary gap.

## Tokens and CSS hooks

Viewport resizing defaults to 300ms (`--brick-navigation-menu-motion-duration`),
initial opening to 200ms (`--brick-navigation-menu-open-duration`), and content
exchange to 250ms (`--brick-navigation-menu-content-duration`). Indicator size
changes use `--brick-navigation-menu-resize-duration` (300ms). All remain
overridable; reduced motion disables content and initial-open animation.

Public variables use the `--brick-navigation-menu-*` namespace for gaps,
control geometry and states, focus, chevron, indicator, viewport surface and
sizing, and motion. A composed panel Link uses Surface props and
`--brick-surface-*` variables for its visual container.

Documented tokens are `--brick-navigation-menu-gap`, `--brick-navigation-menu-control-min-block-size`, `--brick-navigation-menu-control-padding-inline`, `--brick-navigation-menu-control-radius`, `--brick-navigation-menu-control-foreground`, `--brick-navigation-menu-control-hover-background`, `--brick-navigation-menu-control-open-background`, `--brick-navigation-menu-control-open-foreground`, `--brick-navigation-menu-control-current-foreground`, `--brick-navigation-menu-focus-ring`, `--brick-navigation-menu-chevron-size`, `--brick-navigation-menu-chevron-stroke`, `--brick-navigation-menu-chevron-gap`, `--brick-navigation-menu-current-underline-size`, `--brick-navigation-menu-current-underline-offset`, `--brick-navigation-menu-indicator-size`, `--brick-navigation-menu-indicator-offset`, `--brick-navigation-menu-indicator-color`, `--brick-navigation-menu-indicator-border`, `--brick-navigation-menu-viewport-background`, `--brick-navigation-menu-viewport-foreground`, `--brick-navigation-menu-viewport-border`, `--brick-navigation-menu-viewport-radius`, `--brick-navigation-menu-viewport-shadow`, `--brick-navigation-menu-viewport-padding`, `--brick-navigation-menu-viewport-max-inline-size`, `--brick-navigation-menu-motion-duration`.
Stable output includes `data-size`, Link `data-variant`, component `data-slot`
hooks, and Atom state attributes.

## Customization

### Overlay arrow contract

NavigationMenu.Indicator retains its moving navigation geometry and border/fill artwork. Its default triangle base derives from the shared --brick-overlay-arrow-size seed (12px square-equivalent). Override --brick-navigation-menu-indicator-size for a local base width; do not substitute a popup Arrow or apply popup gutter semantics.

Prefer the visual props above for common variations. Set documented variables
on Root or Content for an explicit local design extension. Hook defaults use
fallbacks rather than resetting inherited values on nested Sub. Local control
props override the Root recipe; an authored style hook takes precedence over
recipe fallback, including an explicit radius prop. Use `className` and
`style` without replacing semantic state, focus, or positioning attributes.

## Responsive behavior

Popup geometry stays centered on the active Trigger when space permits, then
collision-shifts and constrains itself to the visible boundary. Narrow layouts
preserve usable targets, arrow alignment, zoom, and writing direction;
applications decide whether the pattern belongs in their mobile information
architecture.

## Accessibility

Name icon-only triggers and label every command or destination clearly. Preserve Atom roles, keyboard behavior, focus return, disabled and selection states, dismissal, and forced-colors affordances.

## Composition, native props, and refs

Every part preserves its Atom native attributes, refs, custom slots, handlers, and supported `render` or `asChild` composition. Link remains an anchor unless composed with a router adapter.

## Examples

```tsx
<NavigationMenu.Link href="/services" variant="panel">
  <Surface inset="sm" level="subtle" radius="surface">
    <VStack gap="2">
      <Text variant="eyebrow">One accountable team</Text>
      <Text weight="semibold">Explore every service</Text>
      <Text tone="secondary" variant="body-sm">
        One destination with concise supporting context.
      </Text>
    </VStack>
  </Surface>
</NavigationMenu.Link>
```

See the [component playground](../../../playground/src/components/navigation-menu/) for defaults, sizes, anatomy, state, composition, customization, responsive, RTL, and preference evidence.

## Evidence

- [Unit tests](../../../test/components/navigation-menu/)
- [Type tests](../../../test/types/components/navigation-menu.test.ts)
- [Browser behavior](../../../playground/tests/components/navigation-menu/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/navigation-menu/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/navigation-menu.md)

## Changelog

See [Navigation Menu changelog](CHANGELOG.md).
