# Swipeable Item

Swipeable Item is a styled three-part boundary that reveals quick actions from
logical start or end. Atom owns gesture and keyboard behavior; Brick owns the
recipes, surfaces, containment, focus paint, and stable customization hooks.

## When and where to use

Use Swipeable Item around an authored message, task, file, List row, or Feed
article when one or two frequent commands benefit from direct reveal. Always
keep an obvious one-click route to the same commands in Content.

## When not to use

Do not use it for navigation, selection, or a command that exists only behind a
gesture. Use Dropdown Menu for a larger command set and ordinary Button or
IconButton for actions that should remain continuously visible.

## Installation and imports

```tsx
import { SwipeableItem } from "@flowstack-ui/brick";
// or import { SwipeableItem } from "@flowstack-ui/brick/swipeable-item";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/swipeable-item.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<SwipeableItem.Root variant="outline">
  <SwipeableItem.Actions aria-label="Archive actions" side="start">
    <Button onClick={archive}>Archive</Button>
  </SwipeableItem.Actions>
  <SwipeableItem.Content>
    <span>Quarterly report</span>
    <DropdownMenu.Root>{/* visible action alternatives */}</DropdownMenu.Root>
  </SwipeableItem.Content>
  <SwipeableItem.Actions aria-label="Delete actions" side="end">
    <Button onClick={remove} tone="danger">Delete</Button>
  </SwipeableItem.Actions>
</SwipeableItem.Root>
```

## Anatomy and DOM ownership

`SwipeableItem.Root` coordinates controlled or uncontrolled open-side state.
`SwipeableItem.Content` is the focusable moving foreground surface.
`SwipeableItem.Actions` is a measured, localized action group on logical
`start` or `end`. Brick adds no row schema, heading, menu, or command logic.

## API

`SwipeableItem`, `SwipeableItemRoot`, `SwipeableItemRootProvider`,
`SwipeableItemContext`, `SwipeableItemContent`,
`SwipeableItemActions`, `SwipeableItemRootProps`,
`SwipeableItemContentProps`, `SwipeableItemActionsProps`, and
`SwipeableItemVariant` are exported from both the root package and stable
component subpath.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `plain`, `outline` | `plain` |

Root preserves Atom controlled/uncontrolled state, direction, disabled and
read-only behavior, native props, `render`, `asChild`, styles, classes, slots,
and refs. Actions requires a localized `aria-label`. Full swipe is off by default:
author `fullSwipeSides` and `onFullSwipe` explicitly and preserve a visible
equivalent control. Never use it as an unconfirmed destructive shortcut.

### Root and controller options

| Prop | Type | Default |
| --- | --- | --- |
| `radius` | shared `Radius` | surface |
| `openSide` / `defaultOpenSide` | start, end, null | null |
| `onOpenSideChange` | `(side) => void` | — |
| `threshold` | number, fraction of action width | 0.35 |
| `thresholds` | partial start/end fractions | shared threshold |
| `activationDistance` | CSS px | 8 |
| `velocityThreshold` | recent px/ms | 0.5 |
| `resistance` | 0–1 | 0 |
| `fullSwipeSides` | readonly logical sides | [] |
| `fullSwipeThreshold` | fraction of content width | 0.6 |
| `onFullSwipe` | `(side) => void` | — |
| `closeOnOutsideClick` / `closeOnContentClick` | boolean | false |
| `motion` | default, none | default |
| `onSettle` | `({ openSide, offset }) => void` | — |
| `disabled` / `readOnly` | boolean | false |

`useSwipeableItem(options)` returns one controller for
`SwipeableItem.RootProvider value={controller}`. RootProvider also accepts
Root's visual props and host composition. `SwipeableItem.Context` reads it
inside either root. These parts, hook, `SwipeableItemController`,
`UseSwipeableItemProps` and `SwipeableItemRootProviderProps` are exported from
the root and component subpath.

Call `open(side)`, `close()` or `reset()`; reset skips animated travel.
Controlled owners must accept requests. `onOpenSideChange` is not a motion
completion event. `onSettle` reports completion and is canceled when superseded.
The controller exposes `dragging`, `settling`, `armedSide`, and destination
`offset`; `getOffset()` and `getProgress()` read the current presentation.

### Actions

`gap` and `inset` use shared `SpacingValue`, both defaulting to 2.
`closeOnClick` defaults to true for an unprevented button/link/action activation;
panel padding does not close. Use false for application-owned async completion.
Buttons and IconButtons retain their own sizes and recipes. Choose usable
targets rather than relying on a wrapper to enlarge a compact control.

### Content

Content defaults to `tabIndex=0`; disabled forces -1, read-only remains
focusable. Native editing controls retain their gesture ownership; use
`data-swipeable-ignore` on other drag-owning descendants. A recognized swipe
suppresses its following pointer click, not normal taps or keyboard activation.

## Visual recipes and states

Plain removes a component-owned visible border for composition inside an
existing row. Outline supplies a standalone rounded boundary. Content remains
opaque above the actions and translates as Atom reports its offset. Disabled
and read-only retain geometry while Atom blocks state changes.

## Tokens and CSS hooks

Stable classes are `.brick-swipeable-item`,
`.brick-swipeable-item__content`, and `.brick-swipeable-item__actions`.
Default `data-slot` values are `swipeable-item`, `swipeable-item-content`, and
`swipeable-item-actions`; Root exposes `data-variant` alongside Atom state.

Public variables:

- `--brick-swipeable-item-background`
- `--brick-swipeable-item-foreground`
- `--brick-swipeable-item-action-background`
- `--brick-swipeable-item-action-foreground`
- `--brick-swipeable-item-border-color`
- `--brick-swipeable-item-border-width`
- `--brick-swipeable-item-radius`
- `--brick-swipeable-item-focus-color`
- `--brick-swipeable-item-focus-width`
- `--brick-swipeable-item-focus-offset`
- `--brick-swipeable-item-action-gap`
- `--brick-swipeable-item-action-padding-inline`
- `--brick-swipeable-item-action-min-size`
- `--brick-swipeable-item-transition-duration`
- `--brick-swipeable-item-transition-easing`

## Customization

Choose the boundary recipe first, then override public variables on a local
Root. Root owns clipping for both recipes, so custom action fills and translated
Content retain one shared radius without sharp exposed corners.

## Responsive behavior

Swipeable Item fills its containing inline size and introduces no component
maximum measure. Long authored content must wrap. Logical positioning follows
RTL, `touch-action: pan-y` preserves vertical page scrolling, and the visible
alternative remains reachable at narrow widths and high zoom.

## Accessibility

Give each Actions group a localized accessible name and use named Button or
IconButton controls. Closed groups are unavailable until their side opens.
Content supports Arrow-key reveal and Escape close while nested controls retain
their own keys. Forced colors preserves boundaries and focus; reduced motion
removes settlement animation.

## Composition, native props, and refs

Keep surrounding List or Feed semantics and place the authored row inside
Content. Applications own commands, confirmation, undo, persistence, and
coordination between open rows. All three parts preserve native props, refs,
custom classes/slots, `render`, and `asChild` composition.

## Examples

### Controlled open side

```tsx
const [openSide, setOpenSide] = useState<"start" | "end" | null>(null);

<SwipeableItem.Root openSide={openSide} onOpenSideChange={setOpenSide}>
  {/* labeled Actions and authored Content */}
</SwipeableItem.Root>
```

Expose the same commands through a visible overflow trigger inside Content so
mouse, keyboard, switch, and voice users never depend on a drag gesture.

## Evidence

- [Playground source](../../../playground/src/components/swipeable-item/SwipeableItemPage.tsx)
- [Unit tests](../../../test/components/swipeable-item/swipeable-item.test.tsx)
- [Type tests](../../../test/types/components/swipeable-item.test.ts)
- [Browser behavior](../../../playground/tests/components/swipeable-item/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/swipeable-item/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/swipeable-item.md)

The playground is available at `/swipeable-item`; `/components/swipeable-item`
resolves to the same component route.

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
