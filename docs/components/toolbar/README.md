# Toolbar

Toolbar presents related commands as one named, keyboard-navigable control group.

## When and where to use

Use Toolbar for three or more related editor, canvas, or data-view controls that benefit from one Tab entry point.

## When not to use

Use ordinary Buttons in Stack when every control needs its own Tab stop. Toolbar is not AppBar layout, ButtonGroup, Menubar, Tabs, Pagination, or an application command-state system.

## Installation and imports

Import `Toolbar` from `@flowstack-ui/brick` or `@flowstack-ui/brick/toolbar`, and load `@flowstack-ui/brick/styles.css` once.

## Quick start

```tsx
<Toolbar.Root ariaLabel="Document tools"><Toolbar.Button>Undo</Toolbar.Button><Toolbar.Link href="/help">Help</Toolbar.Link></Toolbar.Root>
```

## Anatomy and DOM ownership

`Root` renders the Atom `div[role=toolbar]`; `Button` and `ToggleItem` render buttons; `Link` renders an anchor; `Separator` renders a semantic separator; and `ToggleGroup` renders a named group. Brick adds no DOM. Refs target Root, Button, Link, and ToggleItem hosts.

## API

Root adds `variant` (`plain | soft | outline`, default `soft`) and `size` (`sm | md | lg`, default `md`). It inherits Atom `orientation`, `dir`, `loop`, and `ariaLabel`. The other five parts preserve their Atom props, including controlled/uncontrolled single or multiple toggle values.

## Visual recipes and states

Variants change the root surface; sizes coordinate target and typography geometry. Hover, focus-visible, disabled, and pressed states do not change layout.

## Tokens and CSS hooks

Stable classes are `.brick-toolbar`, `.brick-toolbar__button`, `.brick-toolbar__link`, `.brick-toolbar__separator`, `.brick-toolbar__toggle-group`, and `.brick-toolbar__toggle-item`. Root exposes `data-variant`, `data-size`, and Atom orientation; toggle items expose Atom pressed state. Component variables use the `--brick-toolbar-` prefix.

## Customization

Prefer recipes, then semantic tokens and `--brick-toolbar-*` variables. Every part accepts `className` and `style` through its public Atom/native surface.

## Responsive behavior

Toolbar never wraps. It stays content-sized up to its container and scrolls on its main axis when constrained. Consumers own placement, item priority, overflow menus, and orientation changes.

## Accessibility

Provide `ariaLabel` on Root and icon-only controls. Tab enters once; orientation-aware arrows, Home/End, looping, disabled omission, link behavior, and `aria-pressed` are Atom-owned. Avoid descendants that consume the same arrow keys.

## Composition, native props, and refs

Parts preserve Atom `render`/`asChild`, native props, slots, and exact host refs. Popup triggers compose through `Toolbar.Button`; Toolbar does not own popup behavior.

## Examples

```tsx
<Toolbar.Root ariaLabel="Formatting" variant="outline"><Toolbar.ToggleGroup ariaLabel="Text style" type="multiple"><Toolbar.ToggleItem value="bold">Bold</Toolbar.ToggleItem><Toolbar.ToggleItem value="italic">Italic</Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Separator orientation="vertical" /><Toolbar.Button>Clear</Toolbar.Button></Toolbar.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/toolbar/)
- [Unit tests](../../../test/components/toolbar/toolbar.test.tsx)
- [Type tests](../../../test/types/components/toolbar.test.ts)
- [Browser behavior](../../../playground/tests/components/toolbar/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/toolbar/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/toolbar.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
