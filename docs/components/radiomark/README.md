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

The component renders one passive span and one nested dot span, or replacement decorative children. It adds no input, button, role, or focus target.

### Recipe alignment

Use responsive sizes and variants. Outline uses a 0.6 dot; other recipes use 0.4. Inverted uses solid palette foreground. invalid is visual only; disabled adds one fade and a disabled cursor. Preserve passive custom artwork.

These passive utilities live under Utilities in the playground. Four sizes match
12/16/20/24px geometry; button and field height names do not determine mark size.
Neutral and contrast retain their shared palette. No new input semantics, focus,
polymorphic host API or framework styling engine is added.

## API

| Prop | Value | Default |
| --- | --- | --- |
| `invalid` | `boolean` | `false` |
| `filled` | `boolean` | `false` |
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `size` | responsive `xs`, `sm`, `md`, `lg` | `md` |
| `tone` | `neutral`, `contrast`, `accent`, `info`, `success`, `warning`, `danger` | `accent` |
| `variant` | responsive `solid`, `outline`, `soft`, `subtle`, `inverted` | `solid` |
| `children` | decorative ReactNode replacing the dot | dot |

## Visual recipes and states

Solid fills the selected circle, outline keeps the surrounding surface, and soft uses semantic subtle paint. Unchecked state retains a visible neutral boundary.

Unchecked marks in the default solid recipe are transparent. `filled` adds a canvas background;
`inverted` uses canvas with a semantic foreground and border. These are visual
options, not selection behavior.

## Tokens and CSS hooks

Stable hooks are `.brick-radiomark`, `.brick-radiomark__dot`, `data-disabled`, `data-filled`, `data-size`, `data-slot`, `data-state`, `data-tone`, `data-variant`, and `--brick-radiomark-size`.

## Customization

Supported palette tokens are `--brick-radiomark-solid`, `--brick-radiomark-on-solid`,
`--brick-radiomark-soft` and `--brick-radiomark-text`. Supply compatible foreground and
background values together through a scoped class or style when the semantic
`tone` choices do not express a category palette; verify light/dark contrast.
`data-invalid` is a visual hook, not aria-invalid. Parent controls retain focus,
validation meaning, form state and disabled interaction. Avoid applying disabled
opacity independently to both a disabled parent and its nested mark.

Prefer the recipe props. Override `--brick-radiomark-size` only for a bounded composition that cannot use a standard size.

Replacement artwork is centered independently of surrounding text line height.
Prefer an SVG or `Icon size="inherit"` for a predictable decorative shape;
text glyphs still depend on the selected font. Do not add positioning offsets.

## Responsive behavior

The mark remains circular. Size and variant support sparse responsive values.
Subtle is an alias of soft. Neutral and contrast share the current palette.

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
