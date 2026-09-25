# Checkmark

Checkmark is a passive visual state mark for checked, unchecked, and indeterminate presentations.

## When and where to use

Use `Checkmark` inside a larger selectable card, plan row, or read-only status presentation when the interaction owner already exists elsewhere.

## When not to use

Do not use it as a checkbox or button. Use Checkbox or Checkbox Group for selection behavior, form participation, focus, and accessible state.

## Installation and imports

```tsx
import { Checkmark } from "@flowstack-ui/brick/checkmark";
import "@flowstack-ui/brick/styles.css";
```

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/checkmark.css";
```

Public exports are `Checkmark`, `CheckmarkProps`, `CheckmarkSize`, `CheckmarkTone`, and `CheckmarkVariant`.

## Quick start

```tsx
<Checkmark checked />
```

## Anatomy and DOM ownership

The component renders one decorative SVG host. A single path is rendered only for checked or indeterminate state.

### Recipe alignment

Use responsive sizes and variants. Subtle and soft paint a muted box in every state; plain is unboxed, inverted is transparent unless filled, and boxed md/lg use 2px inset. invalid is visual only; disabled adds one fade and a disabled cursor.

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
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `size` | Responsive `xs`, `sm`, `md`, `lg` | `md` |
| `tone` | `neutral`, `accent`, `contrast`, `info`, `success`, `warning`, `danger` | `accent` |
| `variant` | responsive `solid`, `outline`, `subtle`, `soft`, `plain`, `inverted` | `solid` |
| `radius` | `Radius` | theme default |

## Visual recipes and states

Solid fills checked states, outline retains the surface, soft uses semantic subtle paint, and plain removes the box. State is exposed as checked, unchecked, or indeterminate.

Unchecked marks in the default solid recipe are transparent. `filled` adds a canvas background;
`inverted` is transparent unless filled, with semantic foreground and border. These are visual
options, not selection behavior. `plain` stays unboxed even with `filled`.

## Tokens and CSS hooks

Stable hooks are `.brick-checkmark`, `data-disabled`, `data-filled`, `data-size`, `data-slot`, `data-state`, `data-tone`, `data-variant`, and `--brick-checkmark-size`.

## Customization

Supported palette tokens are `--brick-checkmark-solid`, `--brick-checkmark-on-solid`,
`--brick-checkmark-soft` and `--brick-checkmark-text`. Supply compatible foreground and
background values together through a scoped class or style when the semantic
`tone` choices do not express a category palette; verify light/dark contrast.
`data-invalid` is a visual hook, not aria-invalid. Parent controls retain focus,
validation meaning, form state and disabled interaction. Avoid applying disabled
opacity independently to both a disabled parent and its nested mark.

Prefer the public recipe props. Override `--brick-checkmark-size` only for a bounded composition that cannot use a standard size.

## Responsive behavior

The mark is intrinsically square and fixed in flex layouts. Size supports sparse
responsive values, for example `size={{ initial: "sm", md: "lg" }}`. The square
scale is 12/16/20/24px, shared with Checkbox. `subtle` and the retained `soft`
variant paint the unchecked box too. Variant supports the same responsive shape.

## Accessibility

The SVG is always `aria-hidden` because the parent control or accompanying text owns meaning. Do not rely on the mark alone to communicate state.

## Composition, native props, and refs

Native SVG attributes, `className`, event handlers, and the SVG ref pass through. The state props are visual only and do not create input behavior.

## Examples

```tsx
<Checkmark checked variant="soft" tone="success" size="sm" />
<Checkmark indeterminate variant="outline" />
```

## Evidence

- [Playground evidence](../../../playground/src/components/checkmark/)
- [Focused component tests](../../../test/components/checkmark/)
- [Type tests](../../../test/types/components/checkmark.test.ts)
- [Browser behavior](../../../playground/tests/components/checkmark/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/checkmark/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/checkmark.md)

## Changelog

See the [Checkmark changelog](CHANGELOG.md) and the [package changelog](../../../CHANGELOG.md).
