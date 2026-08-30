# Highlight

Highlight discovers literal queries in plain text through exact Atom behavior and renders finished semantic match styling.

## When and where to use

Use Highlight when one plain text string needs deterministic visible query matches.

## When not to use

Use Mark when relevance is already authored. Keep arbitrary React-node traversal, active-result navigation, result counts, search input state, and announcements in the application.

## Installation and imports

```tsx
import { Highlight } from "@flowstack-ui/brick/highlight";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/highlight.css";
```

`Highlight` and its public types are also available from `@flowstack-ui/brick`.

## Quick start

```tsx
<Highlight text="Build durable interfaces" query="durable" />
```

## Anatomy and DOM ownership

Highlight wraps exact Atom Highlight 0.25.1. It owns one native `span`; Atom creates one native `mark` with `data-slot="highlight-match"` for every selected segment. Original text order remains intact.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `text` | plain `string` | required |
| `query` | `string` or readonly string array | required |
| `ignoreCase` | `boolean` | `true` |
| `matchAll` | `boolean` | `true` |
| `exactMatch` | `boolean` | `false` |
| `variant` | `subtle`, `solid`, `underline` | `subtle` |
| `tone` | `accent`, `neutral` | `accent` |

Public exports are `Highlight`, `HighlightProps`, `HighlightVariant`, and `HighlightTone`.

## Visual recipes and states

Subtle provides quiet filled relevance, solid provides stronger contrast, and underline preserves an unfilled reading surface. Accent and neutral are semantic tones. These are passive recipes, not active-search-result state.

## Tokens and CSS hooks

Use `.brick-highlight`, `[data-slot="highlight-match"]`, `data-slot`, `data-tone`, `data-variant`, `--brick-highlight-background`, `--brick-highlight-foreground`, `--brick-highlight-radius`, `--brick-highlight-padding-inline`, `--brick-highlight-decoration-color`, `--brick-highlight-decoration-thickness`, and `--brick-highlight-decoration-offset`.

## Customization

Choose variant and tone first, then documented variables for a deliberate local recipe. Do not restyle Atom internals other than the documented match slot.

## Responsive behavior

Highlight stays inline, preserves whitespace and text order, and wraps with surrounding copy. Each marked fragment uses cloned inline decoration across line breaks.

## Accessibility

Native `mark` communicates relevance in context. Highlight adds no focus, role, live region, search result count, or keyboard behavior. Forced colors uses system highlight colors for filled recipes and system underline visibility for underline.

## Composition, native props, and refs

Keep Highlight inside its surrounding content owner. Pass only plain text through `text`; do not flatten JSX. Native span props, class, style, data slot, and an `HTMLSpanElement` ref pass through Atom. Brick fixes the host to native `span` and does not expose Atom's polymorphic render override.

## Examples

```tsx
<Text as="p">
  <Highlight
    exactMatch
    query={["design", "system"]}
    text="A design system makes design decisions repeatable."
    variant="underline"
  />
</Text>
```

## Evidence

- [Playground route source](../../../playground/src/components/highlight/)
- [Focused component tests](../../../test/components/highlight/)
- [Type tests](../../../test/types/components/highlight.test.ts)
- [Browser behavior](../../../playground/tests/components/highlight/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/highlight/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/highlight.md)

## Changelog

See the [Highlight changelog](CHANGELOG.md) and [package changelog](../../../CHANGELOG.md).
