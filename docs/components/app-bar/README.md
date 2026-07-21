# AppBar

AppBar is a styled top surface with one aligned Toolbar and logical Start,
Center, and End regions. Atom owns its server-safe anatomy while Brick supplies
positioning, density, surface, color, and appearance recipes.

## When to use

Use AppBar for application-level branding, navigation, context, and persistent
actions. Applications supply all content and decide which items hide, truncate,
or move into a menu at narrow widths.

Do not use AppBar as a table header, complete navigation product, responsive
menu, or scroll-reactive application shell.

## Installation and imports

```tsx
import { AppBar, IconButton } from "@flowstack-ui/brick";
// or: import { AppBar } from "@flowstack-ui/brick/app-bar";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<AppBar.Root position="sticky" tone="accent" variant="solid">
  <AppBar.Toolbar>
    <AppBar.Start>Flowstack</AppBar.Start>
    <AppBar.Center>Projects</AppBar.Center>
    <AppBar.End>
      <IconButton aria-label="Search"><SearchIcon /></IconButton>
    </AppBar.End>
  </AppBar.Toolbar>
</AppBar.Root>
```

## API

### Root

| Prop | Values | Default |
| --- | --- | --- |
| `position` | `static`, `absolute`, `sticky`, `fixed` | `static` |
| `variant` | `solid`, `surface`, `transparent` | `surface` |
| `tone` | `neutral`, `accent` | `neutral` |
| `bordered` | boolean | `true` |
| `elevated` | boolean | `false` |
| `blurred` | boolean | `false` |

Root also forwards Atom composition, native props, ARIA/data attributes,
`className`, `style`, slot, and ref.

### Toolbar and regions

`AppBar.Toolbar` accepts Atom's `comfortable` and `compact` densities.
`AppBar.Start`, `AppBar.Center`, and `AppBar.End` forward Atom section props and
refs. Toolbar is structural and intentionally does not receive `role="toolbar"`.

## Color and variants

Neutral is ordinary application chrome. Accent is for branded or strongly
emphasized application chrome.

| Variant | Neutral | Accent |
| --- | --- | --- |
| `solid` | Raised neutral surface | Full accent surface with inverse content |
| `surface` | Standard neutral surface | Soft accent surface |
| `transparent` | Neutral content without fill | Accent content without fill |

Status tones such as success, warning, and danger are intentionally excluded.
Use a status component for transient or semantic status communication.

## Positioning

- `static` participates in normal flow and scrolls with the page.
- `sticky` participates in flow, then sticks within its scrolling container.
- `absolute` overlays content relative to its nearest positioned ancestor.
- `fixed` overlays content relative to the viewport in ordinary layouts.

Absolute and fixed bars do not reserve page space. The application owns any
required content offset. AppBar's stacking level remains below modal overlays
and is still constrained by ancestor stacking contexts.

## Responsive behavior

Toolbar remains one logical row. Start and End occupy equal flexible tracks so
Center stays at the geometric center even when the side content has unequal
widths. Applications must define overflow policy for their own content:

```css
.project-name {
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 38rem) {
  .optional-app-navigation { display: none; }
}
```

## Tokens and customization

Stable hooks are `.brick-app-bar`, `.brick-app-bar-toolbar`,
`.brick-app-bar-start`, `.brick-app-bar-center`, and `.brick-app-bar-end`, plus
Atom slots and Brick state data attributes.

Public component tokens:

```text
--brick-app-bar-background
--brick-app-bar-foreground
--brick-app-bar-border-color
--brick-app-bar-blurred-background
--brick-app-bar-shadow
```

Prefer `tone` and `variant` for supported recipes. Use component tokens for a
custom brand treatment:

```css
.brand-app-bar {
  --brick-app-bar-background: #124e78;
  --brick-app-bar-foreground: #ffffff;
  --brick-app-bar-border-color: #0d3b5c;
  --brick-app-bar-blurred-background: rgb(18 78 120 / 88%);
}
```

Custom colors are outside Brick's contrast guarantee. Consumers must verify
text, links, composed controls, focus indicators, appearances, and forced-color
behavior. Composed components can be styled independently when their default
recipe is unsuitable for a custom background.

## Accessibility

Give Root a useful accessible label when multiple landmark-like top surfaces
need differentiation. Keep navigation inside a native `nav` with its own label.
Every composed action retains its own name and semantics. AppBar does not add
roving focus, menu behavior, routing, or keyboard shortcuts.

Use logical Start and End regions for RTL. Brick reverses their physical
placement while preserving the geometric Center. Forced colors remove custom
surface effects and restore system colors and visible boundaries.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
