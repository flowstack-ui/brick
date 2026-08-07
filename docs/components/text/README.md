# Text

Text is Brick's finished component for authored headings, paragraphs, inline
copy, captions, supporting descriptions, and status copy. The selected HTML
element supplies semantics; the visual recipe supplies typography.

## When and where to use

Use Text for standalone copy that should follow Brick's typography and
foreground system. Choose an explicit heading host from the document
hierarchy, a paragraph for prose, or the default span for inline content.

## When not to use

Use the owning component for Field labels, Dialog titles, Button labels, and
other component anatomy. Use future Link, Code, Code Block, or List components
for those distinct roles.

Text does not provide margins, content width, arbitrary font properties,
automatic heading levels, live status behavior, editing, copying controls, or
rich-text policy.

## Installation and imports

Import from the root or stable subpath and load Brick styles once:

```tsx
import { Text } from "@flowstack-ui/brick";
// or
import { Text } from "@flowstack-ui/brick/text";

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


Public exports are `Text`, `TextProps`, `TextElement`, `TextVariant`,
`TextTone`, `TextWeight`, `TextAlign`, `TextWrap`, and `TextLineClamp`.

## Quick start

```tsx
<Text as="h2" variant="title-md">
  Account settings
</Text>
<Text as="p" tone="secondary">
  Manage the details used across your workspace.
</Text>
```

`as` and `variant` are independent. Choose `h2` because it is the correct
heading level, not because of its visual size.

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

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `span`, `p`, `div`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6` | `span` |
| `variant` | `display`, `title-lg`, `title-md`, `title-sm`, `body-lg`, `body-md`, `body-sm`, `caption`, `eyebrow` | `body-md` |
| `tone` | `inherit`, `primary`, `secondary`, `muted`, `accent`, `info`, `success`, `warning`, `danger` | `primary` |
| `weight` | `inherit`, `regular`, `medium`, `semibold` | recipe default |
| `align` | `start`, `center`, `end` | natural/start |
| `wrap` | `wrap`, `nowrap`, `balance`, `pretty` | `wrap` |
| `truncate` | `boolean` | `false` |
| `lineClamp` | `2`, `3`, `4`, `5`, `6` | none |
| `slot` | `string` | `text` |
| `children` | `ReactNode` | required |

`truncate` and `lineClamp` are mutually exclusive. `slot` controls the
component's `data-slot` hook; it is not forwarded as the native HTML `slot`
attribute. `className`, `style`, native global attributes, events, ARIA, and
data attributes pass to the selected host. The ref type is `HTMLElement`.

## Visual recipes and states

- `display` is the largest restrained product headline.
- `title-lg`, `title-md`, and `title-sm` create heading hierarchy.
- `body-lg`, `body-md`, and `body-sm` cover prose and supporting copy.
- `caption` covers compact metadata without replacing accessible labels.
- `eyebrow` covers a short uppercase editorial label placed before a heading;
  it is not body copy, status, or category semantics.

Display/title recipes use the heading family, semibold weight, tight leading,
and restrained negative tracking. Body/caption recipes use the body family,
regular weight, and readable leading.

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

Recipe metadata uses `data-variant`, `data-tone`, and, when applicable,
`data-weight`, `data-align`, `data-wrap`, `data-truncate`, and
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

Text has no responsive prop objects or breakpoints. It wraps naturally within
its parent, allows long words to break, inherits direction, and uses logical
alignment. It imposes no fixed height, width, measure, or surrounding margin.

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
