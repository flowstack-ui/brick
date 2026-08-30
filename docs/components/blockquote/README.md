# Blockquote

Blockquote composes a semantic extended quotation, optional source URL, and attribution with finished Brick styling.

## When and where to use

Use Blockquote when an extended quotation and optional attribution form one self-contained content unit.

## When not to use

Use native `q` inside the surrounding content owner for an inline quotation. Use Card or a product Block when media, ratings, actions, or testimonial layout own the experience.

## Installation and imports

```tsx
import { Blockquote } from "@flowstack-ui/brick/blockquote";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/blockquote.css";
```

`Blockquote` and every named part are also available from `@flowstack-ui/brick`.

## Quick start

```tsx
<Blockquote.Root>
  <Blockquote.Content cite="https://example.com/design-systems">
    A system should make the correct decision easier to repeat.
  </Blockquote.Content>
  <Blockquote.Caption>
    Pat Lee, <Blockquote.Cite>Designing Durable Systems</Blockquote.Cite>
  </Blockquote.Caption>
</Blockquote.Root>
```

## Anatomy and DOM ownership

Root is `figure`. Content is its native `blockquote` child. Caption is a sibling `figcaption`, keeping attribution outside the quoted words. Cite is native `cite` for a work or source. Icon is a decorative `span` with a default curly quote.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `accent`, `surface`, `plain` | `accent` |
| `align` | `start`, `center`, `end` | `start` |
| `data-slot` | `string` | `blockquote` |
| Content `cite` | source URL string | none |
| Icon children | React content | `“` |

Public exports are `Blockquote`, `BlockquoteRoot`, `BlockquoteIcon`,
`BlockquoteContent`, `BlockquoteCaption`, `BlockquoteCite`,
`BlockquoteRootProps`, `BlockquoteIconProps`, `BlockquoteContentProps`,
`BlockquoteCaptionProps`, `BlockquoteCiteProps`, `BlockquoteVariant`, and
`BlockquoteAlign`.

## Visual recipes and states

Accent uses a logical quotation rule, surface adds a quiet framed background, and plain keeps only typography. Alignment is logical and works in LTR and RTL. The component is passive and has no interactive state.

## Tokens and CSS hooks

Use `.brick-blockquote`, `.brick-blockquote__icon`, `.brick-blockquote__content`, `.brick-blockquote__caption`, `.brick-blockquote__cite`, `data-align`, `data-variant`, and these variables:

`--brick-blockquote-background`, `--brick-blockquote-foreground`, `--brick-blockquote-muted-foreground`, `--brick-blockquote-accent`, `--brick-blockquote-border-color`, `--brick-blockquote-border-width`, `--brick-blockquote-radius`, `--brick-blockquote-padding-block`, `--brick-blockquote-padding-inline`, `--brick-blockquote-gap`, `--brick-blockquote-icon-font-family`, `--brick-blockquote-icon-size`, `--brick-blockquote-icon-font-weight`, `--brick-blockquote-icon-line-height`, `--brick-blockquote-content-font-family`, `--brick-blockquote-content-font-size`, `--brick-blockquote-content-font-weight`, `--brick-blockquote-content-line-height`, `--brick-blockquote-content-letter-spacing`, `--brick-blockquote-caption-font-family`, `--brick-blockquote-caption-font-size`, `--brick-blockquote-caption-font-weight`, `--brick-blockquote-caption-line-height`, and `--brick-blockquote-caption-letter-spacing`.

## Customization

Choose variant and alignment first. Override documented variables for a deliberate local quotation recipe. Compose Link separately when the source should be an actionable destination.

## Responsive behavior

Blockquote occupies available inline space and wraps its content naturally. Logical padding, border placement, and alignment adapt to writing direction without JavaScript.

## Accessibility

Native elements carry quotation and caption semantics. Icon is decorative by default and adds no announcement. Keep Caption outside Content. Use Content's `cite` for the source URL; use Cite for a referenced work or source title rather than merely a person's name.

## Composition, native props, and refs

Every part forwards native attributes, events, class, style, children, slot, and its native ref. Keep Content and optional Caption as siblings inside Root. Icon may appear before Content and remains decorative unless intentionally changed.

## Examples

```tsx
<Blockquote.Root align="center" variant="surface">
  <Blockquote.Icon />
  <Blockquote.Content>Clarity compounds.</Blockquote.Content>
  <Blockquote.Caption>— Rowan Chen</Blockquote.Caption>
</Blockquote.Root>
```

## Evidence

- [Playground route source](../../../playground/src/components/blockquote/)
- [Focused component tests](../../../test/components/blockquote/)
- [Type tests](../../../test/types/components/blockquote.test.ts)
- [Browser behavior](../../../playground/tests/components/blockquote/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/blockquote/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/blockquote.md)

## Changelog

See the [Blockquote changelog](CHANGELOG.md) and [package changelog](../../../CHANGELOG.md).
