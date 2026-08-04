# Code

Code renders short inline technical text with native `code` semantics and
finished Brick recipes.

## When and where to use

Use Code inside prose for identifiers, attributes, commands, filenames, and
other short technical literals.

## When not to use

Do not use it for multi-line source, scrolling, language metadata, copy
controls, keyboard input (`kbd`), output (`samp`), or variables (`var`). Use
Code Block for structured source.

## Installation and imports

```tsx
import { Code } from "@flowstack-ui/brick/code";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/code.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


`Code` is also available from `@flowstack-ui/brick`.

## Quick start

```tsx
<Text as="p">Use <Code>aria-label</Code> for the accessible name.</Text>
```

## Anatomy and DOM ownership

Code owns exactly one native `code` element. It has no Root/Item anatomy and
does not own a block, scroll region, language detector, or copy interaction.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `subtle`, `plain` | `subtle` |
| `tone` | `neutral`, `inherit` | `neutral` |
| `size` | `inherit`, `sm`, `md` | `inherit` |
| `slot` | `string` | `code` |

Public exports are `Code`, `CodeProps`, `CodeVariant`, `CodeTone`, and
`CodeSize`.

## Visual recipes and states

`subtle` adds a quiet surface and border; `plain` changes no surrounding
paint. `neutral` uses technical-text colors while `inherit` follows its
parent. `inherit` size preserves prose rhythm; `sm` and `md` are explicit.
Code has no interactive, disabled, loading, validation, or selected state.

## Tokens and CSS hooks

Use `.brick-code`, `data-slot`, `data-variant`, `data-tone`, and `data-size`.
Public variables are `--brick-code-foreground`, `--brick-code-background`,
`--brick-code-border-color`, `--brick-code-border-width`,
`--brick-code-radius`, `--brick-code-padding-block`,
`--brick-code-padding-inline`, `--brick-code-font-family`,
`--brick-code-font-size`, `--brick-code-font-weight`,
`--brick-code-line-height`, and `--brick-code-letter-spacing`.

## Customization

```tsx
<Code style={{ "--brick-code-background": "lavender" }}>npm test</Code>
```

Prefer the recipe props first. Use public variables for a deliberate local
theme and a class for a reusable consumer recipe.

## Responsive behavior

Code follows surrounding inline flow, wrapping, direction, and typography. It
adds no breakpoint, width, overflow, or viewport behavior.

## Accessibility

Native `code` semantics identify a computer-code fragment. Keep the literal
inside meaningful surrounding content. Do not add a role or tab stop. Forced
colors preserves system text and border colors.

## Composition, native props, and refs

Code forwards native `HTMLElement` attributes, events, `className`, `style`,
slot overrides, children, and its `HTMLElement` ref. Its host is intentionally
fixed to `code`; polymorphism would weaken the semantic guarantee.

## Examples

### Plain inherited code

```tsx
<Code variant="plain" tone="inherit">data-state</Code>
```

### Explicit compact code

```tsx
<Code size="sm">npm run check</Code>
```

## Evidence

- [Playground route source](../../../playground/src/components/code/)
- [Focused component tests](../../../test/components/code/)
- [Type tests](../../../test/types/components/code.test.ts)
- [Browser behavior](../../../playground/tests/components/code/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/code/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/code.md)

## Changelog

See the [Code changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
