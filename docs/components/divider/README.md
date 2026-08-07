# Divider

Divider draws a low-emphasis structural line between adjacent content groups.
It uses Atom for decorative or semantic separator behavior and adds finished
line, inset, label, and appearance recipes.

## When and where to use

Use Divider for an explicit horizontal thematic break, a vertical boundary
between peer groups, or a labeled visual break such as “or continue with”.

## When not to use

Prefer spacing or Surface contrast when they already communicate grouping.
Do not use Divider for component edges, focus, validation, selection,
measurement guides, headings, or draggable pane resizing.

## Installation and imports

```tsx
import { Divider } from "@flowstack-ui/brick";
// or
import { Divider } from "@flowstack-ui/brick/divider";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/divider.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Public exports are `Divider`, `DividerProps`, `DividerLineProps`,
`DividerLabelProps`, `DividerComposedProps`, `DividerElement`,
`DividerOrientation`, `DividerVariant`, `DividerThickness`,
`DividerInset`, and `DividerLabelAlign`.

## Quick start

```tsx
<VStack gap="4">
  <Text>Current workspace</Text>
  <Divider />
  <Text>Archived workspace</Text>
</VStack>
```

## Anatomy and DOM ownership

An unlabeled Divider is one Atom-owned `hr`. A labeled Divider uses Atom's
content-bearing `div` plus two decorative line spans and one visible label
span. The root is the forwarded `HTMLHRElement | HTMLDivElement` ref target.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `orientation` | `horizontal`, `vertical` | `horizontal` |
| `decorative` | `boolean` | `true` |
| `variant` | `solid`, `dashed`, `dotted` | `solid` |
| `thickness` | `subtle`, `regular`, `strong` | `subtle` |
| `inset` | `none`, `start`, `both` | `none` |
| `labelAlign` | `start`, `center`, `end` | `center` |
| `stretch` | `boolean` | `false` |
| `slot` | `string` | `divider` |

Labels are horizontal only. `asChild` is a distinct composed-root mode and
cannot also use `labelAlign`. Native attributes, `render`, events,
`className`, `style`, and refs pass through.

## Visual recipes and states

Variant changes only border style; thickness changes only line weight; inset
changes only logical extent. Vertical Divider has no invented height: provide
context height or use `stretch` in a row. Divider has no interaction, status,
focus, disabled, loading, or motion state.

## Tokens and CSS hooks

Hooks include `.brick-divider`, `.brick-divider__line`,
`.brick-divider__label`, anatomy `data-slot` values, and all documented
recipe data attributes.

Root recipe hooks are `data-orientation`, `data-variant`,
`data-thickness`, `data-inset`, optional `data-label-align`, and optional
`data-stretch`.

Public variables:

- `--brick-divider-color`
- `--brick-divider-thickness`
- `--brick-divider-style`
- `--brick-divider-inset`
- `--brick-divider-label-gap`
- `--brick-divider-label-short-segment`

## Customization

```tsx
<Divider
  style={{
    "--brick-divider-color": "rebeccapurple",
    "--brick-divider-inset": "2rem",
  }}
>
  custom boundary
</Divider>
```

## Responsive behavior

Divider follows its parent, uses logical properties, mirrors start/end
geometry in RTL, and contains wrapping labels. It has no responsive prop API.

## Accessibility

The default is decorative with `role="none"`. Set `decorative={false}` for
a meaningful static separator; vertical semantic Divider receives
`aria-orientation="vertical"` from Atom. Provide `aria-label` or
`aria-labelledby` when a semantic separator needs a name. Divider is never a
focusable splitter.

## Composition, native props, and refs

Stack/Grid arrange, Container constrains, Surface paints, and Divider
separates. `render` replaces the root. `asChild` merges the root contract
onto one React element. Labels are passive content and never replace headings,
legends, or field labels.

Place Divider between complete groups under their shared layout owner. A
Divider must not split a disclosure trigger from the content it controls; when
rows repeat, every boundary should occupy the same relative anatomy.

## Examples

### Vertical peer-group boundary

```tsx
<HStack gap="4">
  <Text>Current</Text>
  <Divider orientation="vertical" stretch />
  <Text>Archived</Text>
</HStack>
```

### Named semantic break

```tsx
<Divider decorative={false} aria-label="Archived results" />
```

## Evidence

- [Playground route source](../../../playground/src/components/divider/)
- [Focused component tests](../../../test/components/divider/)
- [Type tests](../../../test/types/components/divider.test.ts)
- [Browser behavior](../../../playground/tests/components/divider/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/divider/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/divider.md)

## Changelog

See the [Divider changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
