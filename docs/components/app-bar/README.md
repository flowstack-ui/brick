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
`AppBarSectionProps`, `AppBarVariant`, `AppBarTone`, `AppBarLayout`,
`AppBarDensity`, and `AppBarElevation`.

| Root prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `surface`, `transparent` | `surface` |
| `tone` | `neutral`, `accent` | `neutral` |
| `bordered` | `boolean` | `true` |
| `elevated` | `boolean` (compatibility alias for low elevation) | `false` |
| `elevation` | `none`, `low`, `medium`, `high`; overrides `elevated` | `none` |
| `offset` | responsive spacing value; logical block-start positioning offset | `0` |
| `blurred` | `boolean` | `false` |

| Atom-owned prop | Values | Default |
| --- | --- | --- |
| Root `position` | `static`, `absolute`, `sticky`, `fixed` | `static` |

| Brick Toolbar prop | Values | Default |
| --- | --- | --- |
| `inset` | responsive `default`, `none` | `default` |
| `density` | responsive `compact`, `comfortable` | `comfortable` |
| `layout` | responsive `balanced`, `flex` | `balanced` |
| `gap` | responsive spacing value | density recipe |

Start, Center, and End also accept a responsive `gap` (default spacing 2).

Atom Root and Toolbar supply these layout values plus native/composition props.
Sections inherit Atom section props. Brick adapts responsive density to Atom's initial density and CSS breakpoint attributes.

## Visual recipes and states

Variant controls surface fill, tone selects neutral or accent treatment, and
border, elevation, and blur are independent options. Toolbar uses equal
logical side tracks in `layout="balanced"` so Center remains geometrically centered.
Use `layout="flex"` for ordinary navigation or search rows: Center grows and End
moves to the logical end. Repeated Toolbars provide multiple rows without owning
navigation policy. Low, medium and high elevation use shared shadow roles.
Accent solid surfaces adapt neutral ghost Button and IconButton foreground/hover
colors; explicit non-ghost variants retain their own recipes.

## Tokens and CSS hooks

Stable classes are `.brick-app-bar`, `.brick-app-bar-toolbar`,
`.brick-app-bar-start`, `.brick-app-bar-center`, `.brick-app-bar-end`. Public
attributes include Atom `data-position`/`data-density` and Brick
`data-variant`, `data-tone`, `data-bordered`, `data-elevated`, and
`data-blurred`, `data-elevation`, and Toolbar `data-layout`. Responsive Toolbar
attributes use `-sm`, `-md`, `-lg`, and `-xl` suffixes. Public tokens are `--brick-app-bar-background`,
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

### Surface effects

The painted root accepts `treatment`, `backgroundOpacity`, `backdropBlur`,
`backdropSaturate`, `borderColor` and `borderOpacity`. Use `treatment="translucent"`
for finished defaults or direct values such as `backdropBlur="18px"`.
`SurfaceTreatment` and `BackdropBlur` describe the shared types. See the
[surface effects guide](../../guides/surface-effects.md) for values, precedence,
legacy `blurred` behavior, scoped Theme defaults, fallbacks and composition.

Local input variables: `--brick-surface-effect-opacity`,
`--brick-surface-effect-blur`, `--brick-surface-effect-saturation`,
`--brick-surface-effect-border-color`, `--brick-surface-effect-border-opacity`.
Inherited Theme input: `--brick-app-bar-translucent-opacity`.
Inherited Theme input: `--brick-app-bar-translucent-blur`.
Inherited Theme input: `--brick-app-bar-translucent-saturation`.


## Responsive behavior

Root fills available inline size. AppBar does not wrap itself or prescribe
breakpoints; applications decide what truncates, hides, scrolls, or moves.
Logical tracks and edges support RTL. Sparse responsive values inherit the initial
recipe until the first specified breakpoint. Use `Show`/`Hide` with Drawer or a
navigation owner to reduce content before controls overlap. A balanced center
cannot make arbitrary side content fit; test bounding boxes, not only page overflow.
`offset` positions a sticky/fixed/absolute bar but never reserves document space.

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
  <AppBar.Toolbar density="compact" layout="flex">
    <AppBar.Start>Projects</AppBar.Start>
    <AppBar.End><Button variant="ghost" tone="neutral">Account</Button></AppBar.End>
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
