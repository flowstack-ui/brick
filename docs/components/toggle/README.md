# Toggle

Toggle is a persistent pressed/unpressed command built on Atom Toggle with
Brick visual recipes.

## When and where to use

Use it for commands such as Favorite, Pin, Bold, or Show completed when the
control keeps the same meaning in both states.

## When not to use

Use Button for one-shot actions, Checkbox for submitted choices, and
ToggleGroup for related pressed commands. Toggle has no loading, tone, or icon
placement API.

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

Public exports are `Toggle`, `ToggleProps`, `ToggleVariant`, `ToggleSize`, and
`ToggleShape`.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `soft`, `outline`, `ghost` | `soft` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `rounded`, `pill` | `rounded` |
| `iconOnly` | `boolean` | `false` |

Atom supplies `pressed`, `defaultPressed`, `onPressedChange`, `disabled`,
native button props, `asChild`, and `render`. Native `color` and standalone
`value` are excluded.

## Visual recipes and states

Each variant keeps a distinct resting and pressed treatment. Sizes change the
whole control geometry; `pill` changes radius; `iconOnly` makes the control
square. Atom exposes pressed, hover, focus, active, and disabled state.

## Tokens and CSS hooks

Stable hooks are `.brick-toggle`, slot `toggle`, `data-variant`, `data-size`,
`data-shape`, `data-icon-only`, `data-state`, and `data-disabled`. Public
tokens are `--brick-toggle-min-block-size`, `--brick-toggle-padding-inline`,
`--brick-toggle-gap`, `--brick-toggle-radius`, and
`--brick-toggle-icon-size`.

## Customization

Choose props first, then semantic or public Toggle tokens. Use `className` or
`style` for a local exception while preserving pressed and focus distinction.

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
<Toggle variant="outline" pressed={pinned} onPressedChange={setPinned}>
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
