# Prose

Prose applies coherent descendant typography, rhythm, and readable measure to
trusted React content.

## When and where to use

Use Prose after an application, CMS adapter, or Markdown renderer has produced
trusted React children. Use Text or a direct Brick component for smaller or
more structured interface copy.

## When not to use

Do not use Prose to parse or sanitize content, inject HTML strings, style a
control layout, or replace the direct component that owns richer anatomy.

## Installation and imports

```tsx
import { Prose } from "@flowstack-ui/brick/prose";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/prose.css";
```

Prose and its public types are also exported from `@flowstack-ui/brick`.

## Quick start

```tsx
<Prose as="article">
  <h1>Release notes</h1>
  <p>Build dependable interfaces with exact package guidance.</p>
</Prose>
```

## Anatomy and DOM ownership

Prose renders exactly one selected native root and does not add or rewrite any
descendant. Stable output includes `.brick-prose`, `data-slot="prose"`,
`data-size`, and `data-measure`.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `as` | `div`, `article`, `section` | `div` |
| `size` | `sm`, `md`, `lg` | `md` |
| `measure` | `narrow`, `default`, `wide`, `none` | `default` |
| `slot` | string data-slot override | `prose` |
| `children` | trusted React nodes | — |

Native attributes, class, style, data slot, and an `HTMLElement` ref pass
through. Prose never accepts an HTML string, parses Markdown, injects markup,
fetches content, or sanitizes content.

Public exports are `Prose`, `ProseProps`, `ProseElement`, `ProseSize`, and
`ProseMeasure`.

## Visual recipes and states

Prose styles native headings, paragraphs, links, lists, quotes, citations,
tables, inline code, preformatted code, rules, media, figures, captions,
strong/emphasis, mark, and keyboard notation. Direct Brick components retain
their own stronger class contracts when composed inside Prose.

## Tokens and CSS hooks

Use `.brick-prose`, `data-slot`, `data-size`, `data-measure`, and the documented
`--brick-prose-*` variables for measure, rhythm, foregrounds, accent, border,
surface, body/heading/code typography, table cells, and media radius.
Descendant selectors use `:where()` so consumer and direct Brick component
styles can override them without specificity escalation.

The complete token surface is `--brick-prose-measure`,
`--brick-prose-flow-space`, `--brick-prose-section-space`,
`--brick-prose-foreground`, `--brick-prose-muted-foreground`,
`--brick-prose-link-foreground`, `--brick-prose-accent`,
`--brick-prose-border-color`, `--brick-prose-surface`,
`--brick-prose-body-font-family`, `--brick-prose-body-font-size`,
`--brick-prose-body-font-weight`, `--brick-prose-body-line-height`,
`--brick-prose-body-letter-spacing`, `--brick-prose-heading-font-family`,
`--brick-prose-heading-font-weight`, `--brick-prose-heading-letter-spacing`,
`--brick-prose-code-font-family`, `--brick-prose-code-font-size`,
`--brick-prose-code-radius`, `--brick-prose-media-radius`,
`--brick-prose-table-cell-padding-block`, and
`--brick-prose-table-cell-padding-inline`.

## Customization

Choose size and measure first. Use documented `--brick-prose-*` variables for
a deliberate local editorial recipe; use a Theme for reusable brand values.
Do not increase selector specificity to override a direct Brick component.

## Responsive behavior

The root never exceeds its selected reading measure. Native tables and
preformatted code wrap within the region; use Table or Code Block when content
must preserve horizontal scrolling through an accessible dedicated owner.
Media scales within the region. Logical spacing, natural height, safe wrapping,
text spacing, zoom, RTL, dark appearance, and forced colors remain supported.

## Accessibility

React children are the boundary. If an application starts with untrusted HTML,
it must sanitize and parse that content before rendering it. The application
also owns heading hierarchy, link destinations, alternative text, table
headers, language, and document landmarks. Prose adds no role, focus target,
keyboard behavior, or ARIA state.

## Composition, native props, and refs

Compose trusted native descendants directly. Use Brick Link, List, Blockquote,
Code Block, Table, or Image when their richer public anatomy is required.
Native root attributes, class, style, slot data, and an `HTMLElement` ref pass
through.

## Examples

```tsx
<Prose as="section" measure="wide" size="lg">
  <h2>Architecture notes</h2>
  <p>Keep parsing and content trust in the application.</p>
</Prose>
```

## Evidence

- [Playground route](../../../playground/src/components/prose/)
- [Unit tests](../../../test/components/prose/)
- [Type tests](../../../test/types/components/prose.test.ts)
- [Browser behavior](../../../playground/tests/components/prose/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/prose/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/prose.md)

## Changelog

See the [Prose changelog](CHANGELOG.md) and [package changelog](../../../CHANGELOG.md).
