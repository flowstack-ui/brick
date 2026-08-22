# App Bar

AppBar is a top surface and one-row alignment structure built on Atom AppBar.

## When and where to use

Use it for branding, location, navigation, search, and persistent actions on
one top surface.

## When not to use

It is not a complete header, menu system, multi-row navigation product,
responsive shell, body-offset manager, or scroll-reactive policy.

## Installation and imports

```tsx
import { AppBar } from "@flowstack-ui/brick/app-bar";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/app-bar.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Named part exports and the root package export are also available.

## Quick start

```tsx
<AppBar.Root>
  <AppBar.Toolbar>
    <AppBar.Start>Brand</AppBar.Start>
    <AppBar.Center>Dashboard</AppBar.Center>
    <AppBar.End>Actions</AppBar.End>
  </AppBar.Toolbar>
</AppBar.Root>
```

## Anatomy and DOM ownership

| Part | Default DOM | Ref |
| --- | --- | --- |
| `Root` | semantic `header` | `HTMLElement` |
| `Toolbar` | structural `div` | `HTMLDivElement` |
| `Start`, `Center`, `End` | section `div` | `HTMLDivElement` |

Brick adds no private DOM. Toolbar intentionally does not create toolbar-widget
semantics.

## API

Public exports are the `AppBar` namespace; named `AppBarRoot`,
`AppBarToolbar`, `AppBarStart`, `AppBarCenter`, and `AppBarEnd` parts; and
`AppBarRootProps`, `AppBarToolbarProps`, `AppBarToolbarInset`,
`AppBarSectionProps`, `AppBarVariant`, and `AppBarTone`.

| Root prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `surface`, `transparent` | `surface` |
| `tone` | `neutral`, `accent` | `neutral` |
| `bordered` | `boolean` | `true` |
| `elevated` | `boolean` | `false` |
| `blurred` | `boolean` | `false` |

| Atom-owned prop | Values | Default |
| --- | --- | --- |
| Root `position` | `static`, `absolute`, `sticky`, `fixed` | `static` |
| Toolbar `density` | `compact`, `comfortable` | `comfortable` |

| Brick Toolbar prop | Values | Default |
| --- | --- | --- |
| `inset` | `default`, `none` | `default` |

Atom Root and Toolbar supply these layout values plus native/composition props.
Sections inherit Atom section props.

## Visual recipes and states

Variant controls surface fill, tone selects neutral or accent treatment, and
border, elevation, and blur are independent options. Toolbar uses equal
logical side tracks so Center remains geometrically centered.

## Tokens and CSS hooks

Stable classes are `.brick-app-bar`, `.brick-app-bar-toolbar`,
`.brick-app-bar-start`, `.brick-app-bar-center`, `.brick-app-bar-end`. Public
attributes include Atom `data-position`/`data-density` and Brick
`data-variant`, `data-tone`, `data-bordered`, `data-elevated`, and
`data-blurred`. Public tokens are `--brick-app-bar-background`,
`--brick-app-bar-foreground`, `--brick-app-bar-border-color`,
`--brick-app-bar-blurred-background`,
`--brick-app-bar-reduced-transparency-background`, and
`--brick-app-bar-shadow`. Brick also publishes the density measurements
`--brick-app-bar-toolbar-min-block-size-comfortable` and
`--brick-app-bar-toolbar-min-block-size-compact`; Toolbar resolves the selected
recipe through `--brick-app-bar-toolbar-min-block-size`. Toolbar's logical
content inset resolves through `--brick-app-bar-toolbar-padding-inline`.

## Customization

Use Root/Toolbar props, then semantic and AppBar tokens, then part
`className`/`style`. The application owns branding, child visibility,
truncation, offsets, and navigation behavior.

## Responsive behavior

Root fills available inline size. AppBar does not wrap itself or prescribe
breakpoints; applications decide what truncates, hides, scrolls, or moves.
Logical tracks and edges support RTL.

When an application-owned opening region must fill the viewport remaining
below a one-row App Bar, reference the token matching the authored Toolbar
density instead of repeating `4rem` or `3rem`. Treat it as a minimum recipe:
zoomed, translated, or enlarged content may make the rendered Toolbar taller,
and the opening region must be allowed to grow rather than clip.

## Accessibility

Atom owns landmark semantics. Label multiple comparable landmarks and nested
navigation, and name every action. Brick owns visible boundaries, contrast,
forced-color output, and reduced-transparency fallback.

## Composition, native props, and refs

Every part forwards its public Atom/native props and composition behavior.
Refs target the elements in the anatomy table.

Keep Root's default `header` when it owns page or application banner content.
Use `asChild` or `render` only when another intentional host is required, such
as neutral AppBar chrome inside a Drawer. When the AppBar surface should remain
full bleed but its content needs a bounded measure, compose
`Root > Container > Toolbar inset="none"`; Container then owns the page gutter
without doubling Toolbar's default viewport-safe inset. Do not cap Root itself.

## Examples

```tsx
<AppBar.Root position="sticky" variant="solid" tone="accent" elevated>
  <AppBar.Toolbar density="compact">
    <AppBar.Start>Projects</AppBar.Start>
    <AppBar.End><button>Account</button></AppBar.End>
  </AppBar.Toolbar>
</AppBar.Root>
```

## Evidence

- [Playground](../../../playground/src/components/app-bar/AppBarPage.tsx)
- [Unit test](../../../test/components/app-bar/app-bar.test.tsx)
- [Type owner](../../../test/types/components/app-bar.test.ts)
- [Browser spec](../../../playground/tests/components/app-bar/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/app-bar/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/app-bar.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
