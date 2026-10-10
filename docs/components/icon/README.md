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
interactive SVG drawing tools.

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

Public exports are `Icon`, `IconProps`, `IconSize`, `IconTone`, and
`IconEmphasis`, `ResponsiveIconSize`, `createIcon`, `CreateIconOptions`,
`CreatedIconProps`, `IconPropsProvider`, `IconPropsProviderProps`, and `IconPresentationProps`.

## Quick start

```tsx
function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 20 20">
      <path d="m4 10 4 4 8-8" stroke="currentColor" />
    </svg>
  );
}

<Icon tone="success">
  <CheckIcon />
</Icon>;
```

The SVG uses `currentColor`, so the semantic success tone controls its stroke.

## Anatomy and DOM ownership

Decorative output is the default:

```html
<span
  aria-hidden="true"
  class="brick-icon"
  data-size="md"
  data-emphasis="text"
  data-slot="icon"
  data-tone="inherit"
>
  <svg>…</svg>
</span>
```

An informative icon supplies one contextual name:

```html
<span
  class="brick-icon"
  data-size="md"
  data-emphasis="text"
  data-slot="icon"
  data-tone="warning"
  role="img"
  aria-label="Warning"
>
  <svg>…</svg>
</span>
```

The root and immediate SVG occupy the same square. Brick does not inspect or
rewrite path data, viewBox, stroke, or fill construction.

## API

### Composition and rendering guarantees

Icon uses Atom's public composeHost. Owner handlers run before child handlers;
both run even when an event is default-prevented. Both refs receive the composed
SVG, with React 18 detach and React 19 callback cleanup support. Child class,
style, native attributes and authored geometry survive; explicit owner values
win and Icon's accessibility mode has final authority.

Fragments and known non-SVG intrinsic hosts are rejected. Custom components
must forward every supplied prop and ref to one noninteractive SVG; arbitrary
custom internals cannot be statically validated. Wrapper children must also be
noninteractive SVGs. Direct composition enforces focusable=false and removes
sequential tab stops; invalid tab stops and empty names produce development
diagnostics. Do not use native title/description to compete with contextual
naming. Informative roots are one named image; label actions and leave their
icons decorative.

Button and IconButton slots own artwork geometry for wrapped, direct and raw
SVGs, regardless of Icon/provider size. Explicit semantic tone remains available;
default inherit follows the action foreground. No compensating size prop is needed.
NotificationBadge keeps its independently sized indicator.

Directional mirroring follows effective `:dir(rtl)`, including nested LTR scopes.
The independent CSS scale property composes with authored transforms without
mirroring both wrapper and child. Fixed fills are never rewritten.

Icon, its provider and factory introduce a client module boundary because they
consume React context. React server rendering and hydration are supported;
React Server Component applications must define factory calls inside client
modules. This is not a claim that createIcon can execute in a server-only module.
No icon library is a mandatory runtime dependency.

Brick defaults remain a span, md=1.5rem, inherited foreground and text emphasis.
The scale is inherit=1em, 2xs=.75rem, xs=1rem, sm=1.25rem, md=1.5rem,
lg=1.75rem, xl=2rem and 2xl=2.5rem. These names and defaults are not Chakra's scale.


### createIcon

```tsx
import { createIcon } from "@flowstack-ui/brick/icon";

const CheckIcon = createIcon({
  displayName: "CheckIcon",
  viewBox: "0 0 24 24",
  path: <path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeWidth="2" />,
  defaultProps: { size: "sm", tone: "success" },
});

<CheckIcon label="Verified" />;
```

Call the factory once at module scope. Choose exactly one `d: string` or
`path: ReactElement | ReactElement[]`; path content may contain fragments,
groups and fixed multicolor fills. The d shortcut defaults to a currentColor
fill. `viewBox` defaults to `0 0 24 24`; `displayName` defaults to `CreatedIcon`
and never supplies a name.

`defaultProps` supports presentation and SVG defaults, excluding refs, children,
host substitution and informative naming. Instances accept
`CreatedIconProps`: Icon presentation, contextual label/aria-labelledby and
SVG-native attributes such as fill, stroke, strokeWidth, preserveAspectRatio and
viewBox. They exclude children, asChild, raw role/aria-hidden/aria-label, keyboard
interaction and tab stops. Ref targets exactly one SVGSVGElement; output has no
span wrapper or nested SVG.

Presentation precedence is **instance > nearest provider > factory defaults >
library defaults**. SVG-only defaults use **instance > factory defaults**.
Provider values never inherit names, IDs, refs, handlers, styles or direction.


| Prop              | Values                                                                                       | Default                |
| ----------------- | -------------------------------------------------------------------------------------------- | ---------------------- |
| `children`        | one SVG element/component                                                                    | required               |
| `size`            | `inherit`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`                                        | `md`                   |
| `tone`            | `inherit`, `primary`, `secondary`, `muted`, `accent`, `info`, `success`, `warning`, `danger` | `inherit`              |
| `emphasis`        | `text`, `solid`                                                                              | `text`                 |
| `directional`     | `boolean`                                                                                    | `false`                |
| `label`           | nonempty contextual string                                                                   | decorative when absent |
| `aria-labelledby` | ID reference                                                                                 | decorative when absent |
| `asChild`         | direct SVG composition                                                                       | `false`                |
| `slot`            | `string`                                                                                     | `icon`                 |

`label` and `aria-labelledby` are mutually exclusive. Icon controls `role`,
`aria-label`, and `aria-hidden`; contradictory native props are not accepted.
Native global/data attributes, `className`, `style`, and an
`HTMLElement | SVGSVGElement` ref pass through.

## Visual recipes and states

### Responsive size and presentation defaults

```tsx
<Icon size={{ initial: "sm", md: "xl", lg: "md", xl: "inherit" }}>
  <SearchGraphic />
</Icon>
<IconPropsProvider value={{ size: "lg", tone: "success", emphasis: "text" }}>
  <Icon><CheckGraphic /></Icon>
  <Icon tone="inherit"><CheckGraphic /></Icon>
</IconPropsProvider>
```

The wrapper-free provider accepts only size, tone and emphasis. Undefined values
inherit individual outer properties. A nearer responsive size replaces the entire
outer value; sparse objects start at md and retain the last active breakpoint.
Breakpoints are sm=30rem, md=48rem, lg=64rem and xl=80rem. Scalars preserve data-size.
Explicit inherit resets the provider and follows local typography/foreground.


Sizes resolve to the inherited font size, 12, 16, 20, 24, 28, 32, and 40
pixels. Icon has no padding, background, border, radius, shadow, touch target,
or interaction state.

`tone="inherit"` follows the parent's `currentColor`. Other tones resolve to
Brick semantic foreground tokens. Tone identifies the semantic palette;
`emphasis="text"` uses its readable text foreground and `emphasis="solid"`
uses its stronger solid paint. Keep semantic meaning in labels or adjacent
text rather than color alone. A single-color SVG must use
`fill="currentColor"` or `stroke="currentColor"` to consume the tone. Fixed
authored fills remain unchanged, which preserves multicolor artwork.

`directional` mirrors the graphic horizontally only under an effective RTL direction.
Use it for arrows, chevrons, forward/back, undo/redo, and similar glyphs. Most
objects, status symbols, logos, checks, clocks, and media controls must not opt
in.

## Tokens and CSS hooks

Stable hooks are `.brick-icon`, `data-slot` (`[data-slot="icon"]`), `data-size`,
`data-tone`, `data-emphasis`, and the presence-only `data-directional`
attribute.

Public variables:

- `--brick-icon-size-inherit`
- `--brick-icon-size-2xs`
- `--brick-icon-size-xs`
- `--brick-icon-size-sm`
- `--brick-icon-size-md`
- `--brick-icon-size-lg`
- `--brick-icon-size-xl`
- `--brick-icon-size-2xl`
- `--brick-icon-size`
- `--brick-icon-tone-text`
- `--brick-icon-tone-solid`
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
  <Icon size="sm">
    <SearchIcon />
  </Icon>
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
  <Icon tone="success">
    <CheckIcon />
  </Icon>
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
<Icon directional>
  <ArrowForwardIcon />
</Icon>
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
