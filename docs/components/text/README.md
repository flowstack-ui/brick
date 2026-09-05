# Text

Text is Brick's finished family for authored headings, paragraphs, inline
copy, captions, supporting descriptions, and status copy. `Heading`,
`Paragraph`, `Caption`, and `Eyebrow` provide common semantic defaults; `Text`
keeps the selected HTML element independent from its visual recipe.

## When and where to use

Use a named export for ordinary headings, paragraphs, captions, and editorial
eyebrows. Use Text when a deliberate semantic host and visual recipe pairing
falls outside those defaults.

## When not to use

Use the owning component for Field labels, Dialog titles, Button labels, and
other component anatomy. Use future Link, Code, Code Block, or List components
for those distinct roles.

The family does not provide margins, content width, arbitrary font properties,
automatic heading levels, language-aware title casing, live status behavior,
editing, copying controls, or rich-text policy.

## Installation and imports

Import from the root or stable subpath and load Brick styles once:

```tsx
import {
  Caption,
  Eyebrow,
  Heading,
  Paragraph,
  Text,
} from "@flowstack-ui/brick";
// or
import {
  Caption,
  Eyebrow,
  Heading,
  Paragraph,
  Text,
} from "@flowstack-ui/brick/text";

import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/text.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.

Public exports include `Text`, `Heading`, `Paragraph`, `Caption`, `Eyebrow`,
`TextProps`, `HeadingProps`, `ParagraphProps`, `CaptionProps`, `EyebrowProps`,
`HeadingLevel`, `HeadingVariant`, `ParagraphVariant`, `TextElement`,
`TextVariant`, `TextTone`, `TextWeight`, `TextAlign`, `TextWrap`,
`TextTransform`, and `TextLineClamp`.

## Quick start

```tsx
<Heading level={2} variant="title-md">
  Account settings
</Heading>
<Paragraph tone="secondary">
  Manage the details used across your workspace.
</Paragraph>
```

Heading `level` and `variant` are independent. Choose level 2 because it is
correct in the document hierarchy, not because of its visual size.

## Anatomy and DOM ownership

Text renders exactly one selected native element:

```tsx
<Text>Build dependable interfaces.</Text>
```

```html
<span
  class="brick-text"
  data-slot="text"
  data-tone="primary"
  data-variant="body-md"
>
  Build dependable interfaces.
</span>
```

There is no wrapper, Atom primitive, generated ID, role, or ARIA state. The
selected element is the ref target. `.brick-text`, the default `text` slot,
recipe metadata, and documented variables are stable public hooks.

## API

### Core props

| Prop        | Values                                                                                                                                                                            | Default        |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `as`        | `span`, `p`, `div`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`                                                                                                                            | `span`         |
| `variant`   | `display`, `display-sm`, `display-md`, `display-lg`, `display-xl`, `title-xl`, `title-lg`, `title-md`, `title-sm`, `title-xs`, `title-2xs`, `body-xl`, `body-lg`, `body-md`, `body-sm`, `caption`, `eyebrow`; or a responsive value | `body-md` |
| `tone`      | `inherit`, `primary`, `secondary`, `muted`, `accent`, `info`, `success`, `warning`, `danger`                                                                                      | `primary`      |
| `weight`    | `inherit`, `regular`, `medium`, `semibold`                                                                                                                                        | recipe default |
| `align`     | `start`, `center`, `end`; or a responsive value                                                                                                                                   | natural/start  |
| `wrap`      | `wrap`, `nowrap`, `balance`, `pretty`                                                                                                                                             | `wrap`         |
| `transform` | `none`, `uppercase`, `lowercase`, `capitalize`                                                                                                                                    | variant recipe |
| `truncate`  | `boolean`                                                                                                                                                                         | `false`        |
| `lineClamp` | `2`, `3`, `4`, `5`, `6`                                                                                                                                                           | none           |
| `slot`      | `string`                                                                                                                                                                          | `text`         |
| `children`  | `ReactNode`                                                                                                                                                                       | required       |

`truncate` and `lineClamp` are mutually exclusive. `slot` controls the
component's `data-slot` hook; it is not forwarded as the native HTML `slot`
attribute. `className`, `style`, native global attributes, events, ARIA, and
data attributes pass to the selected host. The ref type is `HTMLElement`.

### Named semantic exports

| Export      | Native host             | Visual variants                                                                                                            | Default    |
| ----------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `Heading`   | required `level={1..6}` | `display`, `display-sm`, `display-md`, `display-lg`, `display-xl`, `title-xl`, `title-lg`, `title-md`, `title-sm`, `title-xs`, `title-2xs`; or a responsive value | `title-md` |
| `Paragraph` | `p`                     | `body-xl`, `body-lg`, `body-md`, `body-sm` | `body-md` |
| `Caption`   | `span`                  | fixed                                                                                                                      | `caption`  |
| `Eyebrow`   | `span`                  | fixed                                                                                                                      | `eyebrow`  |

All four render through Text and add no wrapper. Use Text directly when a
different valid host/recipe combination is intentional.

## Visual recipes and states

- `display` preserves Brick's original restrained product headline.
- `display-sm`, `display-md`, `display-lg`, and `display-xl` provide an explicit authored
  display scale without coupling size to heading level.
- `title-xl`, `title-lg`, `title-md`, and `title-sm` create the primary heading hierarchy.
- `title-xs` is the 16px small structural heading for feature titles and other
  places where a heading and body copy intentionally share a size.
- `title-2xs` is the 14px compact structural heading for dense navigation
  groups, table regions, side panels, and similar labelled interface sections.
- `body-xl`, `body-lg`, `body-md`, and `body-sm` cover prose and supporting copy.
- `caption` covers compact metadata without replacing accessible labels.
- `eyebrow` covers a short uppercase editorial label placed before a heading;
  it is not body copy, status, or category semantics.
- `transform` changes visual presentation without rewriting the authored DOM
  text. CSS `capitalize` is not language-aware title case; author names and
  product titles with their correct casing instead.

Display and primary title recipes use the heading family, semibold weight,
tight leading, and restrained negative tracking. `title-xs` and `title-2xs`
keep the heading family and semibold weight with body-scale leading.
Body/caption recipes use the body family, regular weight, and readable leading.

The maintained authored scale resolves `display-sm` to 36/44,
`display-md` to 48/60, `body-lg` to 18/27, `title-sm` to 18/28,
`title-xs` to 16/24, and `title-2xs` to 14/21. Prefer
these recipes over local font-size overrides; component-owned titles such as
Card titles keep their own surface recipe.

`primary` means normal high-emphasis text, not brand color. `accent` is the
brand-colored role. Secondary and muted reduce emphasis; info, success,
warning, and danger add semantic foreground color but never supply meaning
alone.

Use `tone="inherit"` when Text is intentionally nested in a parent component
such as Badge that owns its foreground and contrast pair. When two separately
meaningful inline Text nodes form one row, give them compatible typography
metrics and use `HStack` gap for their relationship instead of literal spaces
or positional offsets.

Text has no interactive state or motion.

## Tokens and CSS hooks

Stable hooks:

```text
.brick-text
[data-slot="text"]
```

Recipe metadata uses `data-variant`, responsive `data-variant-sm|md|lg|xl`,
`data-tone`, and, when applicable,
`data-weight`, `data-align`, `data-transform`, `data-wrap`, `data-truncate`, and
`data-line-clamp`.

Public Text variables:

- `--brick-text-font-family`
- `--brick-text-font-size`
- `--brick-text-font-weight`
- `--brick-text-line-height`
- `--brick-text-letter-spacing`
- `--brick-text-text-transform`
- `--brick-text-foreground`

Each Text variant aliases the matching public semantic recipe:
`--brick-typography-<variant>-font-family`, `font-size`, `font-weight`,
`line-height`, and `letter-spacing`. Component-owned labels, descriptions,
titles, values, and controls consume anatomy or control recipes from the same
system without nesting `Text`. See
[Appearance and tokens](../../guides/appearance-and-tokens.md#typography-recipes).

## Customization

Use variant, tone, and weight first; semantic tokens for a theme; then Text
variables or local CSS:

```tsx
<Text
  style={{
    "--brick-text-font-size": "1.375rem",
    "--brick-text-font-weight": "600",
    "--brick-text-letter-spacing": "-0.015em",
    "--brick-text-foreground": "#18794e",
  }}
>
  Customized project summary
</Text>
```

Arbitrary overrides make contrast, hierarchy, clipping, and reflow the
consumer's responsibility.

## Responsive behavior

`variant` and logical `align` accept Brick's shared
`{ initial, sm?, md?, lg?, xl? }` shape. Use them when visual hierarchy or
alignment should adapt while the native host and heading level remain
unchanged:

```tsx
<Heading
  level={1}
  align={{ initial: "center", lg: "start" }}
  variant={{ initial: "display-sm", md: "display-md", lg: "display-lg" }}
>
  A headline with one stable semantic level
</Heading>
```

Other typography inputs remain scalar. Text wraps naturally, allows long
words to break, inherits direction, and imposes no fixed height, width,
measure, or surrounding margin.

`pretty` is a progressive enhancement. Unsupported browsers retain readable
normal wrapping.

## Accessibility

Choose heading levels from document structure and do not skip levels. Never
use a heading element merely to resize text. `variant` does not change the
accessibility tree.

Tone cannot be the only status cue. Preserve explicit status wording and any
application-owned announcement behavior.

Text supports browser text resize, zoom/reflow, text-spacing overrides,
selection, forced colors, localization, and RTL. If truncation or clamping
hides essential information, provide the complete value through the
application context; Text does not invent a tooltip or accessible alternative.

## Composition, native props, and refs

Text supports native `span`, `p`, `div`, and heading hosts. Global attributes
such as `id`, `lang`, `dir`, `title`, events, ARIA, and data attributes are
forwarded. The `HTMLElement` ref targets that host.

Inline native `strong` and `em` children preserve their semantics. Text does
not expose `asChild`, `render`, links, labels, interactive hosts, or arbitrary
polymorphism; specialized components own those contracts.

## Examples

### Visual heading independent from semantic level

```tsx
<Text as="h3" variant="title-lg">
  Billing history
</Text>
```

### Section eyebrow

```tsx
<Text variant="eyebrow" tone="accent">
  Built for business
</Text>
```

Eyebrow is a content role, not a generic small-text recipe. Use it only for a
short label that introduces a nearby heading.

### Supporting and status copy

```tsx
<Text as="p" tone="secondary">Updated five minutes ago.</Text>
<Text as="p" tone="success">Changes saved successfully.</Text>
```

### Controlled overflow

```tsx
<Text truncate>One-line project title that may exceed its container</Text>
<Text lineClamp={3}>A longer summary constrained to three visible lines.</Text>
```

The parent must provide the inline-size constraint.

## Evidence

- [Playground route source](../../../playground/src/components/text/)
- [Focused component tests](../../../test/components/text/)
- [Type tests](../../../test/types/components/text.test.ts)
- [Browser behavior](../../../playground/tests/components/text/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/text/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/text.md)

## Changelog

See the [Text changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
