# Drawer

Drawer presents a modal surface attached to a logical or block edge of the
viewport. Atom owns modal state, focus, dismissal, portals, isolation, scroll
containment, presence, and Branch registration; Brick supplies the finished
edge placement, sizing, and visual anatomy.

## When and where to use

Use Drawer for temporary navigation, filters, inspectors, supporting detail,
or bounded workflows that benefit from an edge-attached surface. `full` is
appropriate when the temporary workflow should occupy the complete mobile
viewport while remaining part of the current page context.

## When not to use

Use Dialog for centered tasks, AlertDialog for urgent consequential decisions,
Sidebar or layout for persistent application navigation, and Menu or Popover
for anchored content that leaves the page interactive.

Drawer is modal-only. Swipe/drag gestures, snap points, persistent variants,
navigation policy, application forms, loading, and generated actions are not
part of this release.

## Installation and imports

```tsx
import { Drawer } from "@flowstack-ui/brick/drawer";
import "@flowstack-ui/brick/styles.css";
```

The namespace is also available from `@flowstack-ui/brick`. Advanced consumers
may import the canonical direct parts and public prop types from the Drawer
subpath.

## Quick start

```tsx
import { Button } from "@flowstack-ui/brick/button";
import { Drawer } from "@flowstack-ui/brick/drawer";

export function ProjectFilters() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">Filters</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content placement="end" size="md">
          <Drawer.Header>
            <Drawer.Title>Filter projects</Drawer.Title>
            <Drawer.Description>
              Narrow the visible list without leaving this page.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>{/* application-owned controls */}</Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button>Apply filters</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

Overlay and Content remain siblings. Consumers compose all controls and place
a visible Close path where it fits the workflow.

## Anatomy and DOM ownership

| Part | Default output | Responsibility |
| --- | --- | --- |
| `Root` | no element | Open state, dismissal policy, and modal layer ownership |
| `Trigger` | `button` | Opens Drawer; supports Atom `asChild` and `render` |
| `Portal` | no wrapper | Renders into `body`, a same-document container, or inline |
| `Overlay` | `div` | Scrim and exact-target backdrop dismissal |
| `Content` | `div[role="dialog"]` | Focus/ARIA owner plus Brick placement, size, and surface |
| `Header` | `div` | Title and optional Description region |
| `Title` | `h2` | Visible accessible name; supports `h1`–`h6` |
| `Description` | `p` | Optional accessible description |
| `Body` | `div` | Flexible independently scrollable content region |
| `Footer` | `div` | Wrapping action region in logical source order |
| `Close` | `button` | Closes with Atom's `closeClick` reason |
| `Branch` | consumer element | Registers a portalled composite subtree with the modal |

All DOM-rendering parts accept their relevant native props, refs, `className`,
`style`, and overridable `data-slot`. Brick merges its stable class with the
consumer class.

## API

### Root

Forwards Atom's `open`, `defaultOpen`, `onOpenChange`, `closeOnEscape`,
`closeOnBackdropClick`, `disabled`, and `keepMounted` contract. Root renders no
DOM element and has no ref.

### Content

`placement` accepts logical `"start"`, `"end"`, `"top"`, or `"bottom"` and
defaults to `"end"`. Start and end mirror with document direction.

`size` accepts `"sm"`, `"md"`, `"lg"`, or `"full"` and defaults to `"md"`.
Every value remains available and distinct on mobile. Content also forwards
native ARIA plus Atom's `initialFocus` and `finalFocus` controls.

### Portal and Overlay

Portal forwards `container` and `disabled`. Overlay forwards its independent
`disabled` dismissal control. Root may disable backdrop or Escape dismissal;
applications still provide a visible Close path.

### Trigger, Close, and Branch

These parts forward Atom's `asChild` and `render` composition. A composed
element must accept merged props and refs and retain valid semantics. Branch is
for composite content that must portal outside Content; it does not style or
generate that content.

### Title

Title defaults to `h2`; `as` accepts `h1` through `h6`. A visible Title supplies
the generated accessible name. Consumers that intentionally omit it must add an
explicit native `aria-label` or `aria-labelledby` to Content.

## Placement and size recipes

| Size | Start/end inline size | Top/bottom block size |
| --- | --- | --- |
| `sm` | `min(20rem, 75dvi)` | `min(16rem, 45dvb)` |
| `md` | `min(28rem, 85dvi)` | `min(24rem, 65dvb)` |
| `lg` | `min(36rem, calc(100dvi - 1rem))` | `min(32rem, calc(100dvb - 2rem))` |
| `full` | `100dvi` | `100dvb` |

Non-full mobile sizes preserve progressively less visible Overlay context.
Only full occupies the entire relevant dynamic viewport and removes exposed
outer corners. Side Drawers use full viewport height; top/bottom Drawers use
full viewport width.

## Tokens and CSS hooks

Stable classes and default slots are:

| Part | Class | Slot |
| --- | --- | --- |
| Trigger | `.brick-drawer-trigger` | `drawer-trigger` |
| Overlay | `.brick-drawer-overlay` | `drawer-overlay` |
| Content | `.brick-drawer-content` | `drawer-content` |
| Header | `.brick-drawer-header` | `drawer-header` |
| Title | `.brick-drawer-title` | `drawer-title` |
| Description | `.brick-drawer-description` | `drawer-description` |
| Body | `.brick-drawer-body` | `drawer-body` |
| Footer | `.brick-drawer-footer` | `drawer-footer` |
| Close | `.brick-drawer-close` | `drawer-close` |
| Branch | `.brick-drawer-branch` | `drawer-branch` |

Content exposes these component tokens:

- `--brick-drawer-space`
- `--brick-drawer-radius`
- `--brick-drawer-shadow`
- `--brick-drawer-inline-size-sm`
- `--brick-drawer-inline-size-md`
- `--brick-drawer-inline-size-lg`
- `--brick-drawer-block-size-sm`
- `--brick-drawer-block-size-md`
- `--brick-drawer-block-size-lg`

Atom owns `data-state`, `data-positioned`, and Content's `data-placement` output;
Brick adds `data-size`. Brick honors reduced motion, forced colors, dynamic
viewports, and safe-area insets. Consumers own verification after arbitrary
class, style, or token overrides.

## Customization

Prefer placement and size props, then semantic tokens and the component tokens
above. Use compound parts, stable classes/slots, `className`, and `style` for
localized needs. Responsive application policy remains ordinary CSS; Drawer
does not accept breakpoint objects or arbitrary dimensions.

## Responsive behavior

All sizes remain usable on mobile and are not remapped at a breakpoint. Body
uses contained scrolling so Header, Footer, and the visible Close path remain
reachable. Safe areas protect edge controls, long content wraps, and the panel
does not create page-level overflow. RTL mirrors start/end placement, edge
radii, shadow, and entrance direction while preserving source order.

## Accessibility

Title supplies the accessible name and Description supplies the optional
description. If Title is omitted, Content requires an explicit native
`aria-label` or `aria-labelledby`. Consumers provide a visible, clearly named
Close path and keep action order meaningful.

### Keyboard and focus

| Input | Result |
| --- | --- |
| Enter or Space on Trigger | Opens through native/composed control behavior |
| Tab | Advances within the active Drawer and registered Branches |
| Shift+Tab | Moves backward within the active Drawer |
| Escape | Closes only the top Drawer when enabled |

Focus enters according to Atom's interaction-aware policy and restores to an
explicit `finalFocus`, the prior connected target, or the mounted Trigger.
Touch opening remains fully supported; this release intentionally does not add
swipe or drag gestures.

## Portals and Branch

Default body portals use document-level tokens. To retain a scoped appearance,
portal into an element in that scope or render inline:

```tsx
<Drawer.Portal container={scopedLayerElement}>...</Drawer.Portal>
<Drawer.Portal disabled>...</Drawer.Portal>
```

Register third-party content that must portal outside Content:

```tsx
<ThirdParty.Portal>
  <Drawer.Branch asChild>
    <ThirdParty.Content />
  </Drawer.Branch>
</ThirdParty.Portal>
```

Prefer a third-party container inside Content when available. Branch preserves
the third party's keyboard model while registering its subtree with Atom's
active modal boundary.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
