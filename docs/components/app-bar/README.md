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
| `Root` | Atom AppBar landmark/header | `HTMLElement` |
| `Toolbar` | structural `div` | `HTMLDivElement` |
| `Start`, `Center`, `End` | section `div` | `HTMLDivElement` |

Brick adds no private DOM. Toolbar intentionally does not create toolbar-widget
semantics.

## API

| Root prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `surface`, `transparent` | `surface` |
| `tone` | `neutral`, `accent` | `neutral` |
| `bordered` | `boolean` | `true` |
| `elevated` | `boolean` | `false` |
| `blurred` | `boolean` | `false` |

Atom Root supplies `position` (`static`, `absolute`, `sticky`, `fixed`) and
native/composition props. Toolbar supplies Atom `density` (`comfortable`,
`compact`). Sections inherit Atom section props.

## Visual recipes and states

Variant controls surface fill, tone selects neutral or accent treatment, and
border, elevation, and blur are independent options. Toolbar uses equal
logical side tracks so Center remains geometrically centered.

## Tokens and CSS hooks

Stable classes are `.brick-app-bar`, `.brick-app-bar-toolbar`,
`.brick-app-bar-start`, `.brick-app-bar-center`, `.brick-app-bar-end`. Public
attributes include Atom position/density and Brick variant, tone, bordered,
elevated, and blurred. Public tokens are `--brick-app-bar-background`,
`--brick-app-bar-foreground`, `--brick-app-bar-border-color`,
`--brick-app-bar-blurred-background`,
`--brick-app-bar-reduced-transparency-background`, and
`--brick-app-bar-shadow`.

## Customization

Use Root/Toolbar props, then semantic and AppBar tokens, then part
`className`/`style`. The application owns branding, child visibility,
truncation, offsets, and navigation behavior.

## Responsive behavior

Root fills available inline size. AppBar does not wrap itself or prescribe
breakpoints; applications decide what truncates, hides, scrolls, or moves.
Logical tracks and edges support RTL.

## Accessibility

Atom owns landmark semantics. Label multiple comparable landmarks and nested
navigation, and name every action. Brick owns visible boundaries, contrast,
forced-color output, and reduced-transparency fallback.

## Composition, native props, and refs

Every part forwards its public Atom/native props and composition behavior.
Refs target the elements in the anatomy table.

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
