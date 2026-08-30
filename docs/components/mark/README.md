# Mark

Mark renders a native static marked passage with restrained, theme-aware Brick
paint.

## When and where to use

Use Mark for authored content whose relevance is already known.

## When not to use

Do not use Mark for query matching, document-search state, stress emphasis, or
selection behavior. Use Highlight for matching and Em for stress emphasis.

## Installation and imports

```tsx
import { Mark } from "@flowstack-ui/brick/mark";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/mark.css";
```

`Mark` is also available from `@flowstack-ui/brick`.

## Quick start

```tsx
<Text as="p">Deploy during the <Mark>approved window</Mark>.</Text>
```

## Anatomy and DOM ownership

Mark owns exactly one native `mark` element and no wrapper, generated text,
state, or interaction.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `subtle`, `solid`, `plain` | `subtle` |
| `tone` | `accent`, `neutral` | `accent` |
| `slot` | `string` | `mark` |

Public exports are `Mark`, `MarkProps`, `MarkVariant`, and `MarkTone`.

## Visual recipes and states

Subtle is a quiet marked surface, solid is high emphasis, and plain preserves
semantic marking without background paint. Accent and neutral choose closed
semantic color relationships.

## Tokens and CSS hooks

Use `.brick-mark`, `data-slot`, `data-tone`, `data-variant`,
`--brick-mark-background`, `--brick-mark-foreground`,
`--brick-mark-radius`, and `--brick-mark-padding-inline`.

## Customization

Choose props first, then documented variables for a deliberate local recipe.

## Responsive behavior

Mark follows surrounding inline flow and wraps with the marked passage.

## Accessibility

Native `mark` expresses relevance. Mark adds no role or focus. Forced colors
uses system highlight colors; plain remains distinguishable with an underline.

## Composition, native props, and refs

Keep Mark inside its sentence-level content owner. Native attributes, events,
class, style, slot, children, and an `HTMLElement` ref pass to the mark host.

## Examples

```tsx
<Mark variant="solid" tone="neutral">Scheduled maintenance</Mark>
```

## Evidence

- [Playground route source](../../../playground/src/components/mark/)
- [Focused component tests](../../../test/components/mark/)
- [Type tests](../../../test/types/components/mark.test.ts)
- [Browser behavior](../../../playground/tests/components/mark/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/mark/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/mark.md)

## Changelog

See the [Mark changelog](CHANGELOG.md) and [package changelog](../../../CHANGELOG.md).
