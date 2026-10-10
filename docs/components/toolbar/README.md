# Toolbar

Toolbar presents related commands as one named, keyboard-navigable control group.

## When and where to use

Use Toolbar for three or more related editor, canvas, or data-view controls that benefit from one Tab entry point.

## When not to use

Use ordinary Buttons in Stack when every control needs its own Tab stop. Toolbar is not AppBar layout, ButtonGroup, Menubar, Tabs, Pagination, or an application command-state system.

## Installation and imports

Import `Toolbar` from `@flowstack-ui/brick` or `@flowstack-ui/brick/toolbar`, and load `@flowstack-ui/brick/styles.css` once.


The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/toolbar.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<Toolbar.Root ariaLabel="Document tools"><Toolbar.Button>Undo</Toolbar.Button><Toolbar.Link href="/help">Help</Toolbar.Link></Toolbar.Root>
```

## Anatomy and DOM ownership

`Root` renders the Atom `div[role=toolbar]`; `Button` and `ToggleItem` render buttons; `Link` renders an anchor; `Separator` renders a semantic separator; and `ToggleGroup` renders a named group. Group renders a named div; Input uses the existing Input wrapper and a native input. Action content uses the existing Button wrappers without nesting buttons. All eight parts forward refs to their corresponding host (Input to the input).

## API

Named exports: ToolbarRoot, ToolbarButton, ToolbarLink, ToolbarSeparator,
ToolbarGroup, ToolbarInput, ToolbarToggleGroup and ToolbarToggleItem.
Their public props are ToolbarRootProps, ToolbarButtonProps, ToolbarLinkProps,
ToolbarSeparatorProps, ToolbarGroupProps, ToolbarInputProps,
ToolbarToggleGroupProps and ToolbarToggleItemProps.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `plain`, `soft`, `outline`, `surface` | `soft` |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` (responsive) | `md` |

`Toolbar.ToggleGroup` configures every direct ToggleItem while preserving
Toolbar keyboard behavior.

| ToggleGroup prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `soft`, `subtle`, `surface`, `outline`, `ghost`, `plain` | `ghost` |
| `tone` | `accent`, `neutral`, `contrast` | `neutral` |

Root inherits Atom `orientation`, `dir`, `loop`, `disabled` and `ariaLabel`; native `aria-label` also works. Named exports include `ToolbarGroup`, `ToolbarInput` and their `ToolbarGroupProps`/`ToolbarInputProps` types alongside the original Root, Button, Link, Separator, ToggleGroup and ToggleItem exports and matching Props types. `ToolbarSize`, `ToolbarVariant`, `ToolbarToggleTone` and `ToolbarToggleVariant` describe recipes.

Button shares Button's variant, tone, responsive size, radius/shape, fullWidth, icons and loading presentation. Defaults are neutral ghost, inherited size and inside focus ring. It remains a command rather than a destination; use Link for navigation. Link shares Button visual props and native link semantics. ToggleItem shares Toggle geometry and paint, with iconOnly, responsive size, radius and focusRing. ToggleGroup supplies visual defaults; explicit item props override them. Toggle tones are neutral, accent and contrast. Single selection accepts strings; multiple selection requires type="multiple" and string arrays. Use onValueChange for controlled state.

Root size defaults to md and supplies all uncomposed controls; explicit asChild/render hosts own presentation and should receive their own size and inside focus ring. Do not nest interactive hosts. Root disabled dominates all parts. Button focusableWhenDisabled preserves discovery, never activation. Separator defaults perpendicular to Root and supports decorative. Group introduces no new keyboard scope. Input shares Input's variants, responsive sizing, radius/shape, native value/defaultValue and accessible labeling, but intentionally excludes clear/adornment actions that would add unmanaged Tab stops. Place a single Input last in a horizontal toolbar; native editing arrows and Home/End stay with it, and Tab exits.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Variants change the root surface; sizes coordinate target and typography geometry. Hover, focus-visible, disabled, and pressed states do not change layout. Focus-visible uses an inward ring so first, middle, and last controls remain fully visible inside the scrolling root.

Disabled commands use a faded disabled foreground. Disabled ToggleItems share
Toggle's quiet disabled surface and border, and neither acquires hover or
pressed paint.

## Tokens and CSS hooks

Stable classes are `.brick-toolbar`, `.brick-toolbar__button`, `.brick-toolbar__link`, `.brick-toolbar__separator`, `.brick-toolbar__toggle-group`, `.brick-toolbar__group`, `.brick-input` and `.brick-toggle`. Root exposes `data-variant`, `data-size`, and Atom orientation; ToggleGroup exposes `data-variant` and `data-tone`; toggle items expose Atom pressed state.

Public variables are `--brick-toolbar-surface`,
`--brick-toolbar-border-color`, `--brick-toolbar-radius`,
`--brick-toolbar-padding`, `--brick-toolbar-gap`,
`--brick-toolbar-separator-color`.

Actions and selection now use the shared Button/Toggle variables and classes. The former toolbar-item geometry/paint variables are replaced by those owners’ props and variables; migrate item-selected-background to --brick-toggle-selected-background. Outline is transparent; use surface for the former filled bordered treatment.

## Customization

Prefer recipes, then semantic tokens and `--brick-toolbar-*` variables. Every part accepts `className` and `style` through its public Atom/native surface.

## Responsive behavior

Toolbar never wraps. It stays content-sized up to its container and scrolls on its main axis when constrained. Its focus treatment remains inside that scrolling boundary in both orientations. Consumers own placement, item priority, overflow menus, and orientation changes.

## Accessibility

Provide `ariaLabel` on Root and icon-only controls. Tab enters once; orientation-aware arrows, Home/End, looping, disabled omission, link behavior, and `aria-pressed` are Atom-owned. Input retains native editing keys as described above. Avoid additional composites that consume the same navigation axis.

## Composition, native props, and refs

Parts preserve Atom `render`/`asChild`, native props, slots, and exact host refs. Popup triggers compose through `Toolbar.Button`; Toolbar does not own popup behavior.

## Examples

```tsx
<Toolbar.Root ariaLabel="Formatting" variant="outline"><Toolbar.ToggleGroup ariaLabel="Text style" tone="neutral" type="multiple" variant="solid"><Toolbar.ToggleItem value="bold">Bold</Toolbar.ToggleItem><Toolbar.ToggleItem value="italic">Italic</Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Separator orientation="vertical" /><Toolbar.Button>Clear</Toolbar.Button></Toolbar.Root>
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
