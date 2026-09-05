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

## API

| Prop | Value | Default |
| --- | --- | --- |
| `checked` | `boolean` | `false` |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `size` | `xs`, `sm`, `md`, `lg` | `md` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `accent` |
| `variant` | `solid`, `outline`, `soft`, `plain` | `solid` |

## Visual recipes and states

Solid fills checked states, outline retains the surface, soft uses semantic subtle paint, and plain removes the box. State is exposed as checked, unchecked, or indeterminate.

## Tokens and CSS hooks

Stable hooks are `.brick-checkmark`, `data-disabled`, `data-size`, `data-slot`, `data-state`, `data-tone`, `data-variant`, and `--brick-checkmark-size`.

## Customization

Prefer the public recipe props. Override `--brick-checkmark-size` only for a bounded composition that cannot use a standard size.

## Responsive behavior

The mark is intrinsically square and fixed in flex layouts. The component has no responsive prop; choose a containing layout or standard size appropriate to the context.

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
