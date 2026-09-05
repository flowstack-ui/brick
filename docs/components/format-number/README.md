# Format Number

Format Number renders locale-aware numeric text with the platform `Intl.NumberFormat` implementation.

## When and where to use

Use `FormatNumber` for prices, percentages, compact counts, measurements, and other numeric content that must follow an inherited or explicit locale. Use `formatNumber` when a formatted string is required outside JSX.

## When not to use

Do not preformat data at module load, concatenate currency symbols manually, or use this component for dates, messages, or plural selection.

## Installation and imports

```tsx
import { FormatNumber } from "@flowstack-ui/brick/format-number";
import "@flowstack-ui/brick/styles.css";
```

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/format-number.css";
```

Public exports are `FormatNumber`, `FormatNumberProps`, and `formatNumber`.

## Quick start

```tsx
<FormatNumber value={2499} formatOptions={{ style: "currency", currency: "USD" }} />
```

## Anatomy and DOM ownership

The component renders one semantic-neutral `span` with `data-slot="format-number"`. The string helper renders no DOM.

## API

| Prop | Value | Default |
| --- | --- | --- |
| `value` | required finite number | none |
| `locale` | BCP 47 locale | inherited `LocaleProvider`, then `en-US` |
| `formatOptions` | `Intl.NumberFormatOptions` | `{}` |

Native span attributes and the span ref pass through.

## Visual recipes and states

Formatted output inherits surrounding typography and color. There are no visual variants or interactive states.

## Tokens and CSS hooks

The stable hook is `data-slot` with value `format-number`. The component exposes no paint token; its modular stylesheet is intentionally empty.

## Customization

Compose with Text or another typographic owner instead of adding a typography recipe to the formatter.

## Responsive behavior

Formatting is data- and locale-driven, not viewport-driven. Use responsive layout components around the formatted value when placement changes.

## Accessibility

The visible localized string is exposed as normal text. Supply surrounding context when a standalone value would be ambiguous.

## Composition, native props, and refs

`FormatNumber` accepts native span props and forwards its ref. `formatNumber` uses the same cached formatter path without React.

## Examples

```tsx
<FormatNumber value={0.42} formatOptions={{ style: "percent" }} />
<FormatNumber value={1200} formatOptions={{ notation: "compact" }} />
```

## Evidence

- [Playground evidence](../../../playground/src/components/format-number/)
- [Focused component tests](../../../test/components/format-number/)
- [Type tests](../../../test/types/components/format-number.test.ts)
- [Browser behavior](../../../playground/tests/components/format-number/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/format-number/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/format-number.md)

## Changelog

See the [Format Number changelog](CHANGELOG.md) and the [package changelog](../../../CHANGELOG.md).
