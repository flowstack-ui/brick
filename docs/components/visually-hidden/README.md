# Visually Hidden

Visually Hidden keeps authored text available to assistive technology while removing its visual layout footprint.

## When and where to use

Use it for an accessible name or short supplemental context when an adjacent visual already communicates the same meaning, such as an icon-only action.

## When not to use

Do not hide text that benefits everyone, keyboard-focusable content, essential instructions, visible errors, or content requiring a live announcement. `aria-hidden` is for decorative content and does the opposite.

## Installation and imports

```tsx
import { VisuallyHidden } from "@flowstack-ui/brick/visually-hidden";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<button type="button">
  <SearchIcon aria-hidden="true" />
  <VisuallyHidden.Root>Search</VisuallyHidden.Root>
</button>
```

## Anatomy and DOM ownership

The namespace has one `Root`. It delegates directly to Atom VisuallyHidden, defaults to a `span`, adds `.brick-visually-hidden`, and defaults `data-slot` to `visually-hidden`. Atom's inline hiding behavior remains authoritative.

## API

Public exports are `VisuallyHidden`, `VisuallyHiddenRoot`, and `VisuallyHiddenRootProps`. Root accepts Atom's children, native span attributes, style, ref, `render`, and `asChild`. It has no visual recipe props.

## Visual recipes and states

There are no variants, tones, sizes, or interaction states. Root always applies Atom's behavior-preserving visually-hidden style.

## Tokens and CSS hooks

The stable class is `.brick-visually-hidden`; the stable default hook is `data-slot="visually-hidden"`. There are no CSS variables because Atom's inline accessibility behavior is authoritative.

## Customization

Native attributes, consumer classes, and non-conflicting styles pass through. Do not override the hiding properties. Use visible Text instead when visual presentation is required.

## Responsive behavior

Behavior is identical at every viewport, zoom level, direction, and appearance. The hidden content contributes no visible layout size.

## Accessibility

Content remains in the accessibility tree and can contribute to an ancestor's accessible name. Do not place keyboard-accessible descendants inside Root. Keep the hidden phrase short, specific, and equivalent to the visual meaning.

## Composition, native props, and refs

Root preserves Atom's default span, `render`, `asChild`, native props, authored slot, consumer class/style, and ref. Composition changes the host without changing the hiding contract.

## Examples

See the [component playground](../../../playground/src/components/visually-hidden/) for icon-only naming, supplemental context, composition, and inspected output.

## Evidence

- [Unit tests](../../../test/components/visually-hidden/)
- [Type tests](../../../test/types/components/visually-hidden.test.ts)
- [Browser behavior](../../../playground/tests/components/visually-hidden/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/visually-hidden/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/visually-hidden.md)

## Changelog

See [Visually Hidden changelog](CHANGELOG.md).
