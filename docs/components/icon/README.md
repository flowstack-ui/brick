# Icon

Icon gives one consumer-supplied SVG a consistent Brick size, semantic color,
alignment, direction, and accessibility mode. Brick supplies no icon catalog
or string registry.

## When and where to use

Use Icon for custom inline SVGs and React icon-library components that render
SVG. It works for decorative icons beside text, icons inside named controls,
standalone informative symbols, semantic status color, and explicitly
directional glyphs.

## When not to use

Use IconButton or another control for interaction, Image for raster media and
loading/fallback behavior, and the owning component's internal indicator or
spinner for component anatomy. Do not use Icon for photos, emoji, font icons,
complex illustrations, logos requiring independent semantics, or arbitrary
SVG construction.

## Installation and imports

```tsx
import { Icon } from "@flowstack-ui/brick";
// or
import { Icon } from "@flowstack-ui/brick/icon";

import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/icon.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Public exports are `Icon`, `IconProps`, `IconSize`, and `IconTone`.

## Quick start

```tsx
function CheckIcon() {
  return <svg fill="none" viewBox="0 0 20 20"><path d="m4 10 4 4 8-8" stroke="currentColor" /></svg>;
}

<Icon tone="success"><CheckIcon /></Icon>
```

The SVG uses `currentColor`, so the semantic success tone controls its stroke.

## Anatomy and DOM ownership

Decorative output is the default:

```html
<span aria-hidden="true" class="brick-icon" data-size="md"
  data-slot="icon" data-tone="inherit">
  <svg>…</svg>
</span>
```

An informative icon supplies one contextual name:

```html
<span class="brick-icon" data-size="md" data-slot="icon"
  data-tone="warning" role="img" aria-label="Warning">
  <svg>…</svg>
</span>
```

The root and immediate SVG occupy the same square. Brick does not inspect or
rewrite path data, viewBox, stroke, or fill construction.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `children` | one SVG element/component | required |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `tone` | `inherit`, `primary`, `secondary`, `muted`, `accent`, `info`, `success`, `warning`, `danger` | `inherit` |
| `directional` | `boolean` | `false` |
| `label` | nonempty contextual string | decorative when absent |
| `aria-labelledby` | ID reference | decorative when absent |
| `asChild` | direct SVG composition | `false` |
| `slot` | `string` | `icon` |

`label` and `aria-labelledby` are mutually exclusive. Icon controls `role`,
`aria-label`, and `aria-hidden`; contradictory native props are not accepted.
Native global/data attributes, `className`, `style`, and an
`HTMLElement | SVGSVGElement` ref pass through.

## Visual recipes and states

Sizes resolve to 12, 16, 20, 24, 32, and 40 pixels. Icon has no padding,
background, border, radius, shadow, touch target, or interaction state.

`tone="inherit"` follows the parent's `currentColor`. Other tones resolve to
Brick semantic foreground tokens. A single-color SVG must use
`fill="currentColor"` or `stroke="currentColor"` to consume the tone. Fixed
authored fills remain unchanged, which preserves multicolor artwork.

`directional` mirrors the graphic horizontally only under an RTL ancestor.
Use it for arrows, chevrons, forward/back, undo/redo, and similar glyphs. Most
objects, status symbols, logos, checks, clocks, and media controls must not opt
in.

## Tokens and CSS hooks

Stable hooks are `.brick-icon`, `data-slot` (`[data-slot="icon"]`), `data-size`, `data-tone`,
and the presence-only `data-directional` attribute.

Public variables:

- `--brick-icon-size-2xs`
- `--brick-icon-size-xs`
- `--brick-icon-size-sm`
- `--brick-icon-size-md`
- `--brick-icon-size-lg`
- `--brick-icon-size-xl`
- `--brick-icon-size`
- `--brick-icon-color`
- `--brick-icon-vertical-align`
- `--brick-icon-direction-scale`

## Customization

Use recipes first, then variables for a deliberate exception:

```tsx
<Icon
  style={{
    "--brick-icon-size": "1.75rem",
    "--brick-icon-color": "rebeccapurple",
  }}
>
  <CustomSvg />
</Icon>
```

Arbitrary colors and dimensions are escape-hatch CSS, not additional recipe
values.

## Responsive behavior

Icon is an intrinsic square and does not choose breakpoints. It remains
non-shrinking in inline and flex composition. Owning controls may normalize a
nested Icon to their icon-slot dimensions. Icon adds no overflow or layout
around siblings.

## Accessibility

Decorative Icon sets `aria-hidden="true"`. Supply `label` or
`aria-labelledby` only when the standalone graphic conveys information not
already present in nearby text. Informative output uses `role="img"` and the
authored name.

For icon-only controls, label the Button, IconButton, Link, or Toggle and leave
Icon decorative:

```tsx
<IconButton aria-label="Search">
  <Icon size="sm"><SearchIcon /></Icon>
</IconButton>
```

Icon never guesses meaning, receives focus, adds keyboard handling, creates a
tooltip, or announces tone changes. Semantic color cannot be the only carrier
of state meaning.

## Composition, native props, and refs

The default span wrapper is safest for third-party SVG components. Use
`asChild` only with one direct SVG when wrapper-free output matters:

```tsx
<Icon asChild label="Published" tone="success">
  <svg viewBox="0 0 20 20">…</svg>
</Icon>
```

Never use `asChild` with an interactive element: Icon's accessibility mode
would hide or replace the control semantics. Child classes and styles are
preserved before Icon's authoritative recipe/accessibility props.

## Examples

### Visible text owns the meaning

```tsx
<HStack gap="2">
  <Icon tone="success"><CheckIcon /></Icon>
  <Text>Published</Text>
</HStack>
```

### Visible label reference

```tsx
<Text id="sync-state">Sync paused</Text>
<Icon aria-labelledby="sync-state" tone="warning"><PauseIcon /></Icon>
```

### Directional navigation glyph

```tsx
<Icon directional><ArrowForwardIcon /></Icon>
```

## Evidence

- [Playground route source](../../../playground/src/components/icon/)
- [Focused component tests](../../../test/components/icon/)
- [Type tests](../../../test/types/components/icon.test.ts)
- [Browser behavior](../../../playground/tests/components/icon/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/icon/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/icon.md)

## Changelog

See the [Icon changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
