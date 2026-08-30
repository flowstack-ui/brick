# Em

Em renders native stress emphasis while inheriting the surrounding Brick
typography and foreground.

## When and where to use

Use Em inside a sentence when stress emphasis changes meaning or spoken
cadence.

## When not to use

Do not use Em only to obtain italic paint, for important text that needs
`strong`, or as a standalone typography owner.

## Installation and imports

```tsx
import { Em } from "@flowstack-ui/brick/em";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS, load:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/em.css";
```

`Em` is also available from `@flowstack-ui/brick`.

## Quick start

```tsx
<Text as="p">Review this <Em>before</Em> publishing.</Text>
```

## Anatomy and DOM ownership

Em owns exactly one native `em` element. It adds no wrapper, role, state, or
interaction.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `slot` | `string` | `em` |

`EmProps` forwards native `HTMLElement` attributes and requires `children`.
Public exports are `Em` and `EmProps`. The host is intentionally fixed.

## Visual recipes and states

Em has one inherited recipe: surrounding family, size, weight, line height,
tracking, and foreground with italic font style. It has no variants or states.

## Tokens and CSS hooks

Use `.brick-em`, `data-slot`, and `--brick-em-font-style`.

## Customization

Prefer the inherited default. A theme may set the documented variable for a
deliberate typographic system decision.

## Responsive behavior

Em stays in surrounding inline flow and introduces no breakpoint behavior.

## Accessibility

Native `em` conveys stress emphasis. Do not add a role or tab stop. Em remains
selectable, copyable, and readable in forced colors.

## Composition, native props, and refs

Compose Em inside Text, Heading, Link, Prose, or another content owner. Native
attributes, events, class, style, slot, children, and an `HTMLElement` ref pass
to the `em` host.

## Examples

```tsx
<Heading level={2}>Read this <Em>first</Em></Heading>
```

## Evidence

- [Playground route source](../../../playground/src/components/em/)
- [Focused component tests](../../../test/components/em/)
- [Type tests](../../../test/types/components/em.test.ts)
- [Browser behavior](../../../playground/tests/components/em/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/em/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/em.md)

## Changelog

See the [Em changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
