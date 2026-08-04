# Popover

Popover presents click-open contextual content anchored to a trigger or anchor.

## When and where to use

Use it for small interactive panels such as filters, details, and compact
editing controls.

## When not to use

Use Tooltip for short noninteractive help, HoverCard for previews, and Dialog
for work that requires modal focus and an explicit task boundary.

## Installation and imports

```tsx
import { Popover } from "@flowstack-ui/brick/popover";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/popover.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Popover.Root>
  <Popover.Trigger>Details</Popover.Trigger>
  <Popover.Portal>
    <Popover.Content>
      <Popover.Title>Details</Popover.Title>
      <Popover.Body>Contextual content</Popover.Body>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
```

## Anatomy and DOM ownership

Public parts are `Root`, `Anchor`, `Trigger`, `Portal`, `Content`, `Header`,
`Title`, `Description`, `Body`, `Footer`, `Close`, and `Arrow`. Header/Body/
Footer default to Brick `div`s; Title/Description remain Atom semantic parts.
Content is a `div`, Close a `button`, Arrow an `svg`, and composed trigger/
anchor/structure refs are `HTMLElement`.

## API

Public exports are the `Popover` namespace; named `PopoverRoot`,
`PopoverAnchor`, `PopoverTrigger`, `PopoverPortal`, `PopoverContent`,
`PopoverHeader`, `PopoverTitle`, `PopoverDescription`, `PopoverBody`,
`PopoverFooter`, `PopoverClose`, and `PopoverArrow` parts; and
`PopoverRootProps`, `PopoverAnchorProps`, `PopoverTriggerProps`,
`PopoverPortalProps`, `PopoverContentProps`, `PopoverHeaderProps`,
`PopoverTitleProps`, `PopoverDescriptionProps`, `PopoverBodyProps`,
`PopoverFooterProps`, `PopoverCloseProps`, `PopoverArrowProps`,
`PopoverStructureProps`, and `PopoverSize`.

| Content prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `sideOffset` | `number` | `8` |

| Header/Body/Footer prop | Values | Default |
| --- | --- | --- |
| `asChild` | `boolean` | `false` |

Root always fixes Atom `triggerMode` to `click`; `triggerMode`, `openDelay`, and
`closeDelay` are excluded. Content adds the size recipe. Other public parts inherit their Atom props.
Header/Body/Footer add native attributes, `asChild`, and `render`.

## Visual recipes and states

Size controls maximum inline width. Atom owns controlled/uncontrolled state,
click interaction, dismissal, focus, placement, collision handling, presence,
portal, and Arrow position.

## Tokens and CSS hooks

Stable classes and overridable `data-slot` values cover every styled part.
Content reflects `data-size`. Public tokens are
`--brick-popover-background`, `--brick-popover-foreground`,
`--brick-popover-muted-foreground`, `--brick-popover-border`,
`--brick-popover-radius`, `--brick-popover-shadow`,
`--brick-popover-space`, `--brick-popover-max-block-size`,
`--brick-popover-max-inline-size-sm`,
`--brick-popover-max-inline-size-md`, and
`--brick-popover-max-inline-size-lg`.

## Customization

Use Atom placement/state props and Brick size first, then public tokens, then
public structure parts. Part `className` and `style` are escape hatches.

## Responsive behavior

Content respects viewport constraints and Atom may flip or shift it. The
application owns responsive content layout; logical placement supports RTL.

## Accessibility

Use Title and Description when they clarify the panel. Atom owns trigger
relationships, focus behavior, outside/Escape dismissal, and portal semantics.
Do not use Popover for a task that must block the rest of the page.

## Composition, native props, and refs

Atom parts inherit Atom composition and native props. Header/Body/Footer accept
one `asChild` child or a `render` element and merge refs, class, and style.

## Examples

```tsx
<Popover.Content size="lg" side="bottom">
  <Popover.Header><Popover.Title>Filters</Popover.Title></Popover.Header>
  <Popover.Body>…</Popover.Body>
  <Popover.Footer><Popover.Close>Done</Popover.Close></Popover.Footer>
  <Popover.Arrow />
</Popover.Content>
```

## Evidence

- [Playground](../../../playground/src/components/popover/PopoverPage.tsx)
- [Unit test](../../../test/components/popover/popover.test.tsx)
- [Type owner](../../../test/types/components/popover.test.ts)
- [Browser spec](../../../playground/tests/components/popover/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/popover/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/popover.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
