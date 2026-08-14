# Sidebar

Sidebar coordinates a finished persistent complementary panel with main
content on Atom Sidebar state and accessibility behavior.

## When and where to use

Use Sidebar for application navigation or tools that remain beside main
content and may expand, narrow to a rail, or move offcanvas.

## When not to use

Use Drawer for temporary modal content, Nav List for destinations without the
shell, and Surface for paint without coordinated layout. Sidebar does not own
breakpoints, routing, persistence, scrollspy, or mobile Drawer switching.

## Installation and imports

```tsx
import { Sidebar } from "@flowstack-ui/brick/sidebar";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/sidebar.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Sidebar.Root collapsedState="rail">
  <Sidebar.Trigger aria-label="Toggle workspace sidebar">☰</Sidebar.Trigger>
  <Sidebar.Panel aria-label="Workspace tools">
    <Sidebar.Header>Workspace</Sidebar.Header>
    <Sidebar.Content>{navigation}</Sidebar.Content>
    <Sidebar.Footer>{account}</Sidebar.Footer>
  </Sidebar.Panel>
  <Sidebar.Main>{page}</Sidebar.Main>
</Sidebar.Root>
```

## Anatomy and DOM ownership

`Root`, `Trigger`, `Panel`, and `Main` style the matching Atom parts. Atom owns
state, generated relationships, native button behavior, inert offcanvas
content, semantic hosts, composition, and refs. Brick-only `Header`, `Content`,
and `Footer` are static panel regions.

## API

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `docked`, `floating` | `docked` |
| `size` | `sm`, `md`, `lg` | `md` |
| `position` | `static`, `sticky` | `static` |
| `surface` | `transparent`, `base`, `raised` | `base` when docked; `raised` when floating |
| `defaultState` | `expanded`, `rail`, `offcanvas` | `expanded` |
| `collapsedState` | `rail`, `offcanvas` | `offcanvas` |
| `side` | `left`, `right` | `left` |
| `disabled` | `boolean` | `false` |

Root preserves controlled `state`/`onStateChange`. Trigger preserves
`toState`. Panel preserves landmark naming. Every part preserves native props,
class, style, slot, ref, `render`, and `asChild`.

## Visual recipes and states

Docked attaches the panel to the shell edge with a logical separator.
Floating adds gap, radius, border, and elevation. Surface selects panel paint
independently: transparent lets an ancestor Surface own the shell background,
base uses the ordinary panel surface, and raised uses the elevated panel
surface. Size controls closed expanded
and rail widths. Static participates in normal layout; sticky uses the public
offset and available-height variables.

Rail changes width only; consumers explicitly provide compact, accessibly
named content. Offcanvas reaches a zero track and Atom immediately makes Panel
inert and hidden from assistive technology.

Root emits `data-variant`, `data-size`, `data-position`, and `data-surface`; Atom emits
`data-state`, `data-side`, `data-collapsed-state`, and disabled metadata.

## Tokens and CSS hooks

Parts use `.brick-sidebar`, `.brick-sidebar__trigger`,
`.brick-sidebar__panel`, `.brick-sidebar__header`,
`.brick-sidebar__content`, `.brick-sidebar__footer`, and
`.brick-sidebar__main`.

Public variables include `--brick-sidebar-expanded-width-sm`,
`--brick-sidebar-expanded-width-md`, `--brick-sidebar-expanded-width-lg`,
`--brick-sidebar-rail-width-sm`, `--brick-sidebar-rail-width-md`,
`--brick-sidebar-rail-width-lg`,
`--brick-sidebar-panel-width`, `--brick-sidebar-panel-background`,
`--brick-sidebar-panel-border`, `--brick-sidebar-panel-radius`,
`--brick-sidebar-panel-gap`, `--brick-sidebar-region-padding-inline`,
`--brick-sidebar-region-padding-block`, `--brick-sidebar-content-gap`,
`--brick-sidebar-sticky-offset`, `--brick-sidebar-available-block-size`,
`--brick-sidebar-transition-duration`, and
`--brick-sidebar-transition-easing`.

## Customization

```tsx
<Sidebar.Root
  position="sticky"
  surface="transparent"
  style={{ "--brick-sidebar-sticky-offset": "3rem" }}
>
  {/* parts */}
</Sidebar.Root>
```

Prefer the closed surface recipes for panel paint. A transparent Sidebar may
be nested in an ancestor Surface so that one outer region owns the background;
do not override Sidebar background selectors to make the panel blend.

## Responsive behavior

Sidebar has no breakpoint. Applications decide when to render a desktop
Sidebar and when to present the same navigation in Drawer. This avoids hidden
media-query, portal, and focus-policy coupling.

## Accessibility

Panel is an `aside`/complementary landmark, not navigation. Put a named Nav
List inside it. Name Panel when multiple complementary landmarks exist. Keep a
reopening Trigger outside an offcanvas Panel. Rail controls require accessible
names. Enter, Space, click, disabled state, generated controls/expanded
relationships, and offcanvas inert behavior are Atom-owned.

## Composition, native props, and refs

Root renders `div`, Trigger `button`, Panel `aside`, Main `main`, and static
regions `div` by default. `render` and `asChild` replace those hosts while
preserving classes, slots, behavior, and refs. Avoid multiple Main landmarks.

## Examples

### Controlled state

```tsx
const [state, setState] = useState<"expanded" | "rail" | "offcanvas">("expanded");

<Sidebar.Root state={state} onStateChange={setState} collapsedState="rail">
  <Sidebar.Trigger aria-label="Toggle sidebar">☰</Sidebar.Trigger>
  <Sidebar.Panel>{navigation}</Sidebar.Panel>
  <Sidebar.Main>{content}</Sidebar.Main>
</Sidebar.Root>
```

### Mobile policy

At an application breakpoint, hide the desktop Sidebar and open Brick Drawer
from the App Bar. Drawer may reuse the same Nav List; Sidebar never renders it.

## Evidence

- [Focused component tests](../../../test/components/sidebar/)
- [Type tests](../../../test/types/components/sidebar.test.ts)
- [Playground route source](../../../playground/src/components/sidebar/)
- [Browser behavior](../../../playground/tests/components/sidebar/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/sidebar/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/sidebar.md)

## Changelog

See the [Sidebar changelog](CHANGELOG.md) and package changelog.
