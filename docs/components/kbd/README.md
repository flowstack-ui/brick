# Kbd

Kbd renders native keyboard-input notation with finished Brick sizing and visual recipes.

## When and where to use

Use Kbd inside meaningful copy to name one key, or repeat it for an authored key sequence.

## When not to use

Do not use Kbd to register shortcuts, listen for keys, translate platform labels, or render ordinary technical literals. Application behavior owns shortcuts; use Code for literals.

## Installation and imports

```tsx
import { Kbd } from "@flowstack-ui/brick/kbd";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/kbd.css";
```

`Kbd` is also available from `@flowstack-ui/brick`.

## Quick start

```tsx
<Text as="p">Press <Kbd>F12</Kbd> to open developer tools.</Text>
```

## Anatomy and DOM ownership

Kbd owns exactly one native `kbd` element and no wrapper, separator, state, or interaction.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `raised`, `outline`, `subtle`, `plain` | `raised` |
| `size` | `sm`, `md`, `lg` | `md` |
| `slot` | `string` | `kbd` |

Public exports are `Kbd`, `KbdProps`, `KbdVariant`, and `KbdSize`.

## Visual recipes and states

Raised suggests a physical key, outline preserves a lighter boundary, subtle uses a quiet filled surface, and plain keeps only typographic notation. Sizes adjust the compact key footprint without creating a control target.

## Tokens and CSS hooks

Use `.brick-kbd`, `data-slot`, `data-size`, `data-variant`,
`--brick-kbd-background`, `--brick-kbd-foreground`,
`--brick-kbd-border-color`, `--brick-kbd-border-block-end-color`,
`--brick-kbd-radius`, `--brick-kbd-font-family`, `--brick-kbd-font-size`,
`--brick-kbd-font-weight`, `--brick-kbd-line-height`,
`--brick-kbd-letter-spacing`,
`--brick-kbd-min-block-size`, `--brick-kbd-padding-inline`, and
`--brick-kbd-shadow`.

## Customization

Choose size and variant first, then documented variables for a deliberate local recipe.

## Responsive behavior

Kbd stays inline and prevents one key label from wrapping. Sequences wrap between separately authored key hosts and separators.

## Accessibility

Native `kbd` communicates keyboard input. Kbd adds no role, tab stop, or shortcut behavior. Forced colors restores a system-readable boundary for every variant.

## Composition, native props, and refs

Keep Kbd inside its sentence-level content owner. For sequences, author one Kbd per key and visible separators outside the key hosts. Native attributes, events, class, style, slot, children, and an `HTMLElement` ref pass to the host.

## Examples

```tsx
<Text as="p">
  Press <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>.
</Text>
```

## Evidence

- [Playground route source](../../../playground/src/components/kbd/)
- [Focused component tests](../../../test/components/kbd/)
- [Type tests](../../../test/types/components/kbd.test.ts)
- [Browser behavior](../../../playground/tests/components/kbd/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/kbd/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/kbd.md)

## Changelog

See the [Kbd changelog](CHANGELOG.md) and [package changelog](../../../CHANGELOG.md).
