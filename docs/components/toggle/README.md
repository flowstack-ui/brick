# Toggle

Toggle is a persistent pressed/unpressed command built on Atom Toggle with
Brick visual recipes.

## When and where to use

Use it for commands such as Favorite, Pin, Bold, or Show completed when the
control keeps the same meaning in both states.

## When not to use

Use Button for one-shot actions, Checkbox for submitted choices, and
ToggleGroup for related pressed commands. Toggle has no loading, semantic
status tone, or icon placement API.

## Installation and imports

```tsx
import { Toggle } from "@flowstack-ui/brick/toggle";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/toggle.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


`Toggle` is also exported from `@flowstack-ui/brick`.

## Quick start

```tsx
<Toggle aria-label="Favorite" defaultPressed>Favorite</Toggle>
```

## Anatomy and DOM ownership

Toggle renders Atom `Toggle.Root` as a native `button` and forwards an
`HTMLButtonElement` ref. Brick adds no private DOM.

## API

Public exports are `Toggle`, `ToggleProps`, `ToggleVariant`, `ToggleTone`,
`ToggleSize`, and `ToggleShape`.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `soft`, `subtle`, `surface`, `outline`, `ghost`, `plain` | `ghost` |
| `tone` | `accent`, `neutral`, `contrast` | `neutral` |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` (responsive) | `md` |
| `focusRing` | `outside`, `inside` | theme default |
| `shape` | `rounded`, `pill` | `rounded` |
| `iconOnly` | `boolean` | `false` |

Atom supplies `pressed`, `defaultPressed`, `onPressedChange`, `disabled`,
native button props, `asChild`, and `render`. Native `color` and standalone
`value` are excluded.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

The default is neutral ghost: transparent when off, a flat soft fill when on.
Hover strengthens gently; pressed hover remains stronger than unpressed hover.
Soft uses a uniform border without an inset bottom shadow. Accent is opt-in.

Each variant keeps a distinct resting and pressed treatment. Tone selects an
accent or neutral pressed-state palette without implying status. Sizes change the
whole control geometry; `pill` changes radius; `iconOnly` makes the control
square. Atom exposes pressed, hover, focus, active, and disabled state.

Neutral solid selection uses a strong theme-derived neutral surface with the
normal foreground instead of the inverse black/white pair.

Outline selection uses the tone's solid accent for its border while preserving
the normal primary foreground. Selected outline adds a soft fill.

Disabled Toggles use a faded disabled foreground and quiet surface; selected
disabled state does not retain the enabled outline or inset selection edge.
The control fades once to 50% opacity and uses a not-allowed cursor. Do not
add a faded wrapper. Forced colors keeps opacity at 1 and uses system colors.

## Tokens and CSS hooks

Stable hooks are `.brick-toggle`, slot `toggle`, `data-variant`, `data-size`,
`data-tone`, `data-shape`, `data-icon-only`, `data-state`, and `data-disabled`. Public
tokens are `--brick-toggle-min-block-size`, `--brick-toggle-padding-inline`,
`--brick-toggle-gap`, `--brick-toggle-radius`, and
`--brick-toggle-icon-size`.

## Customization

Choose props first, then semantic or public Toggle tokens. Use `className` or
`style` for a local exception while preserving pressed and focus distinction.

### Shared action scale

Sizes share Button geometry: 24, 32, 36, 40, 44, 48, and 64px. Default md is 40px. Use `size={{ lg: "lg" }}` for md below lg and lg above it; explicit initial values are supported. Toggle retains Atom behavior instead of nesting Button. Contrast supplies inverse solid selection; neutral remains the default. Subtle is borderless, surface has an inset edge, and plain marks selection with a bottom edge.

## Responsive behavior

Text may wrap under narrow constraints. Geometry uses logical properties and
works in RTL. The application owns placement and breakpoint behavior.

## Accessibility

Atom owns button activation and `aria-pressed`. Keep the accessible name stable
between states and provide a complete name for icon-only controls. Brick owns
visible focus, target geometry, contrast, and forced-color presentation.

## Composition, native props, and refs

Native button props, `asChild`, and `render` follow Atom. Preserve button
semantics when composing. The ref targets the rendered `HTMLButtonElement`.

## Examples

```tsx
<Toggle tone="neutral" variant="outline" pressed={pinned} onPressedChange={setPinned}>
  Pin
</Toggle>
```

## Evidence

- [Playground](../../../playground/src/components/toggle/TogglePage.tsx)
- [Unit test](../../../test/components/toggle/toggle.test.tsx)
- [Type owner](../../../test/types/components/toggle.test.ts)
- [Browser spec](../../../playground/tests/components/toggle/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/toggle/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/toggle.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).


### Icon artwork sizing

The owning artwork slot sets final Icon dimensions even with larger standalone/provider sizes; do not add compensating Icon size props. Text and interactive adornments retain their own layout.
