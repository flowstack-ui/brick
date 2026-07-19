# Toggle

Toggle is one persistent pressed/unpressed command. Atom owns native button
semantics, controlled or uncontrolled state, keyboard activation, composition,
disabled behavior, `aria-pressed`, and refs; Brick supplies the finished visual
recipe.

## Use and avoid

Use Toggle for commands such as Favorite, Pin, Bold, or Show completed when the
visible label remains stable. Use Button for one-shot actions, Checkbox for
submitted selections, Switch for immediate settings, Badge for passive labels,
and ToggleGroup for related pressed commands.

## Import and use

```tsx
import { Toggle } from "@flowstack-ui/brick/toggle";
import "@flowstack-ui/brick/styles.css";

<Toggle defaultPressed>Bold</Toggle>
<Toggle ariaLabel="Pin project" iconOnly><PinIcon aria-hidden="true" /></Toggle>
<Toggle shape="pill">Favorites</Toggle>
```

Toggle is also exported from the package root. It renders a native button and
forwards Atom's `pressed`, `defaultPressed`, `onPressedChange`, `disabled`,
`ariaLabel`, `render`, `asChild`, native props, class, style, slot, and ref
contract. Standalone `value`, semantic tone, loading, generated labels, and
Button icon-placement props are intentionally absent.

## Visual API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `soft`, `outline`, `ghost` | `soft` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `rounded`, `pill` | `rounded` |
| `iconOnly` | boolean | `false` |

Selected state uses the accent token family. The stable root hook is
`.brick-toggle`, the slot defaults to `toggle`, and visual state is exposed by
`data-state`, `data-variant`, `data-size`, `data-shape`, and `data-icon-only`.
Public component tokens begin with `--brick-toggle-`, including min block size,
inline padding, gap, radius, and icon size.

Keep the label stable across pressed states and give icon-only content an
accessible name. Toggle supports light/dark appearance, forced colors, RTL,
zoom/reflow, and reduced-motion preferences.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
