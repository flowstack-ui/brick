# Color Swatch

Color Swatch provides a finished passive preview for one CSS color or a compact mix of colors. Its checkerboard reveals alpha without requiring application CSS.

## When and where to use

Use Color Swatch beside color names and values, inside a semantic preset control, or in palettes and design-token documentation. Use Color Picker when the user must edit or select the value.

## When not to use

Do not use Color Swatch as a color input, selection owner, contrast validator, or the only carrier of meaning. Use the appropriate semantic control and keep visible text for color names and states.

## Installation and imports

```tsx
import { ColorSwatch } from "@flowstack-ui/brick/color-swatch";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS, load the foundation once and the component stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/color-swatch.css";
```

## Quick start

```tsx
<ColorSwatch.Root value="#5b5bd6" />
```

## Anatomy and DOM ownership

`Root` and `Mix` each render one native `span`. They are passive, content-sized visual elements and add no selection, button, input, or live-region behavior.

## API

| Part | Prop | Values | Default |
| --- | --- | --- | --- |
| `Root` | `value` | Any valid CSS color | required |
| `Mix` | `values` | Two or more valid CSS colors | required |
| both | `size` | `sm`, `md`, `lg` | `md` |
| both | `label` | localized string | - |
| `size` | `ColorSwatchSize` | `sm`, `md`, `lg` | `md` |

Public exports are `ColorSwatch`, `ColorSwatchRoot`, `ColorSwatchMix`, `ColorSwatchRootProps`, `ColorSwatchMixProps`, and `ColorSwatchSize`.

## Visual recipes and states

Small, medium, and large sizes are 1rem, 1.5rem, and 2rem. The checkerboard stays visible beneath alpha colors. Mix divides one swatch evenly into conic segments. Color Swatch owns no interactive states.

## Tokens and CSS hooks

Stable hooks are `.brick-color-swatch`, `.brick-color-swatch--mix`, `data-slot`, and `data-size`. Public variables are `--brick-color-swatch-size`, `--brick-color-swatch-value`, `--brick-color-swatch-border-color`, and `--brick-color-swatch-radius`.

## Customization

Prefer `size` before overriding the size variable. Set semantic color strings through `value` or `values`; do not replace the checkerboard or use custom CSS merely to create a standard swatch.

## Responsive behavior

The swatch is content-sized, uses logical dimensions, and does not change across breakpoints. The owning Stack, Grid, control, palette, or Block owns responsive arrangement.

## Accessibility

Without `label`, a swatch is `aria-hidden` because adjacent text or its owning control must carry meaning. With `label`, it becomes `role="img"` with that accessible name. Color alone must never communicate selection, validation, or action.

## Composition, native props, and refs

Native span attributes, `className`, `style`, events, and refs pass through. Keep interaction on a semantic Button or Atom-owned Color Picker preset; Color Swatch remains passive.

## Examples

```tsx
<ColorSwatch.Root value="rgb(91 91 214 / 60%)" />
<ColorSwatch.Mix values={["#5b5bd6", "#e5484d", "#30a46c"]} label="Brand palette" />
```

## Evidence

- [Playground source](../../../playground/src/components/color-swatch/)
- [Unit tests](../../../test/components/color-swatch/)
- [Type tests](../../../test/types/components/color-swatch.test.ts)
- [Browser behavior](../../../playground/tests/components/color-swatch/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/color-swatch/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/color-swatch.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
