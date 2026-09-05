# Radiomark

Radiomark is a passive circular visual state mark for selected and unselected presentations.

## When and where to use

Use `Radiomark` inside a larger choice card or read-only selection summary when another component already owns selection behavior.

## When not to use

Do not use it as a radio control. Use Radio Group or Radio Card for focus, keyboard navigation, form participation, and accessible selection state.

## Installation and imports

```tsx
import { Radiomark } from "@flowstack-ui/brick/radiomark";
import "@flowstack-ui/brick/styles.css";
```

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/radiomark.css";
```

Public exports are `Radiomark`, `RadiomarkProps`, `RadiomarkSize`, `RadiomarkTone`, and `RadiomarkVariant`.

## Quick start

```tsx
<Radiomark checked />
```

## Anatomy and DOM ownership

The component renders one passive span and one nested dot span. It adds no input, button, role, or focus target.

## API

| Prop | Value | Default |
| --- | --- | --- |
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `size` | `xs`, `sm`, `md`, `lg` | `md` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `accent` |
| `variant` | `solid`, `outline`, `soft` | `solid` |

## Visual recipes and states

Solid fills the selected circle, outline keeps the surrounding surface, and soft uses semantic subtle paint. Unchecked state retains a visible neutral boundary.

## Tokens and CSS hooks

Stable hooks are `.brick-radiomark`, `.brick-radiomark__dot`, `data-disabled`, `data-size`, `data-slot`, `data-state`, `data-tone`, `data-variant`, and `--brick-radiomark-size`.

## Customization

Prefer the recipe props. Override `--brick-radiomark-size` only for a bounded composition that cannot use a standard size.

## Responsive behavior

The mark remains circular and fixed in flex layouts. It has no viewport-dependent behavior.

## Accessibility

The visual is always `aria-hidden`; the parent choice or adjacent text must expose the selected state and accessible name.

## Composition, native props, and refs

Native span attributes, `className`, event handlers, and the span ref pass through. `checked` is visual state only.

## Examples

```tsx
<Radiomark checked variant="outline" size="sm" />
<Radiomark disabled variant="soft" />
```

## Evidence

- [Playground evidence](../../../playground/src/components/radiomark/)
- [Focused component tests](../../../test/components/radiomark/)
- [Type tests](../../../test/types/components/radiomark.test.ts)
- [Browser behavior](../../../playground/tests/components/radiomark/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/radiomark/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/radiomark.md)

## Changelog

See the [Radiomark changelog](CHANGELOG.md) and the [package changelog](../../../CHANGELOG.md).
