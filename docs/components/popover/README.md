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
`PopoverStructureProps`, `PopoverSize`, and `PopoverDensity`.

| Content prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `density` | `comfortable`, `compact` | `comfortable` |
| `sideOffset` | `number` | `8` |

| Header/Body/Footer prop | Values | Default |
| --- | --- | --- |
| `asChild` | `boolean` | `false` |

Root always fixes Atom `triggerMode` to `click`; `triggerMode`, `openDelay`, and
`closeDelay` are excluded. Content adds the size recipe. Other public parts inherit their Atom props.
Header/Body/Footer add native attributes, `asChild`, and `render`.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Size controls maximum inline width. Density controls internal panel rhythm;
compact is intended for concise menus and utility panels. Atom owns controlled/uncontrolled state,
click interaction, dismissal, focus, placement, collision handling, presence,
portal, and Arrow position. The finished overlay uses a structural border, and
the Arrow inherits the same border and background so it reads as one continuous
surface at every supported radius.

## Tokens and CSS hooks

Stable classes and overridable `data-slot` values cover every styled part.
Content reflects `data-size` and `data-density`. Public tokens are
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

Content respects viewport constraints. Center-aligned content shifts into the
viewport without changing its authored alignment; edge-aligned content may
resolve an alternate alignment before shifting. The application owns responsive
content layout; logical placement supports RTL.

## Accessibility

### Scrolling and padding: preserve the region anatomy

`Content` already constrains the floating viewport. `Body` supplies padding and
scrolls when content exceeds the available height. Start with this composition:

```tsx
<Popover.Content>
  <Popover.Header>
    <Popover.Title>Preview settings</Popover.Title>
    <Popover.Description>Configure the example environment.</Popover.Description>
  </Popover.Header>
  <Popover.Body>{/* Settings controls; this region scrolls. */}</Popover.Body>
  <Popover.Footer>{/* Optional persistent actions. */}</Popover.Footer>
</Popover.Content>
```

Do not wrap the entire Header/Body/Footer structure in Frame or ScrollArea just
to constrain the panel. That removes the regions from the viewport's flex layout
and can disable body shrinking/scrolling. In particular, bare Title/Description
receive edge padding only as direct Content children; inserting layout/scroll
wrappers between them bypasses that padding. Use Header to group them, not
custom margins, padding CSS or component-hook overrides.

If an independently scrolling list is genuinely needed, compose it **inside
Body**, with its own justified size constraint. Keep Arrow directly in Content.
Verify the accessible name, title/description inset, alignment with body content,
and reachability of the last action at narrow and short heights in both appearances.

Use Title and Description when they clarify the panel. Atom owns trigger
relationships, focus behavior, outside/Escape dismissal, and portal semantics.
Do not use Popover for a task that must block the rest of the page.

## Composition, native props, and refs

Atom parts inherit Atom composition and native props. Header/Body/Footer accept
one `asChild` child or a `render` element and merge refs, class, and style.

## Examples

```tsx
<Popover.Content density="compact" size="lg" side="bottom">
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
