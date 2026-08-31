# Color Swatch

Color Swatch provides a finished passive preview for one CSS color or a compact mix. Its checkerboard reveals alpha, and its closed shape recipes cover sharp, rounded, and circular presentations without application CSS.

## When and where to use

Use Color Swatch beside names and values, inside a semantic preset control, or in palettes and token documentation. Use Color Picker when the user must edit or select the value.

## When not to use

Do not use Color Swatch as an input, selection owner, contrast validator, or the only carrier of meaning. Keep interaction and state on a semantic owning control.

## Installation and imports

```tsx
import { ColorSwatch } from "@flowstack-ui/brick/color-swatch";
import "@flowstack-ui/brick/styles.css";
```

For modular styles, load the foundation once and this component stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/color-swatch.css";
```

Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<ColorSwatch.Root shape="circle" value="rgb(91 91 214 / 65%)" />
<ColorSwatch.Mix shape="rounded" values={["#5b5bd6", "#e5484d"]} />
```

## Anatomy and DOM ownership

`Root` and `Mix` each render one native `span`. They are passive, content-sized visual elements and add no selection, button, input, or live-region behavior.

## API

| Part | Prop | Values | Default |
| --- | --- | --- | --- |
| `Root` | `value` | valid CSS color | required |
| `Mix` | `values` | two or more valid CSS colors | required |
| `size` | both | `sm`, `md`, `lg` | `md` |
| `shape` | both | `sharp`, `rounded`, `circle` | `rounded` |
| both | `label` | localized string | none |

Public exports are `ColorSwatch`, `ColorSwatchRoot`, `ColorSwatchMix`, `ColorSwatchRootProps`, `ColorSwatchMixProps`, `ColorSwatchSize`, and `ColorSwatchShape`.

## Visual recipes and states

Sizes are 1rem, 1.5rem, and 2rem. Sharp removes radius, rounded uses the public radius token, and circle uses a full radius. Mix divides its footprint evenly into conic segments. Alpha remains visible through the checkerboard.

## Tokens and CSS hooks

Both parts expose `data-slot`, `data-size`, and `data-shape`. Stable classes are `.brick-color-swatch` and `.brick-color-swatch--mix`. Public properties are `--brick-color-swatch-size`, `--brick-color-swatch-value`, `--brick-color-swatch-border-color`, and `--brick-color-swatch-radius`.

## Customization

Prefer `size` and `shape`, then public component properties. Preserve a visible boundary against neighboring surfaces and keep alpha perceivable. Do not add interaction directly to the passive span.

## Responsive behavior

The swatch remains content-sized across breakpoints. The owning Stack, Grid, picker, control, palette, or Block owns responsive arrangement.

## Accessibility

Without `label`, the swatch is `aria-hidden` because adjacent text or its owning control carries meaning. With `label`, it becomes `role="img"` with that accessible name. Color alone must never communicate selection, validation, or action.

## Composition, native props, and refs

Native span attributes, class, style, events, and refs pass through. Put interaction on Button or `ColorPicker.SwatchTrigger`. Use `shape` for standard geometry before overriding radius.

## Examples

```tsx
<button type="button">
  <ColorSwatch.Root aria-hidden value="#5b5bd6" />
  Select iris
</button>

<ColorSwatch.Mix
  label="Iris and tomato mix"
  shape="circle"
  values={["#5b5bd6", "#e5484d"]}
/>
```

## Evidence

- [Playground source](../../../playground/src/components/color-swatch/)
- [Unit tests](../../../test/components/color-swatch/)
- [Type tests](../../../test/types/components/color-swatch.test.ts)
- [Browser behavior](../../../playground/tests/components/color-swatch/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/color-swatch/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/color-swatch.md)

## Changelog

See the [Color Swatch changelog](CHANGELOG.md).
