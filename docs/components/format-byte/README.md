# Format Byte

Format Byte renders bit and byte quantities with locale-aware units and bounded precision.

## When and where to use

Use `FormatByte` for storage, transfer, attachment, and payload sizes. Use `formatByte` when a localized string is needed outside JSX.

## When not to use

Do not hand-author unit suffixes, use it for rates that need additional per-time wording, or treat it as a general measurement formatter.

## Installation and imports

```tsx
import { FormatByte } from "@flowstack-ui/brick/format-byte";
import "@flowstack-ui/brick/styles.css";
```

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/format-byte.css";
```

Public exports are `FormatByte`, `FormatByteProps`, `FormatByteOptions`, `FormatByteUnit`, `FormatByteUnitDisplay`, `FormatByteUnitSystem`, and `formatByte`.

## Quick start

```tsx
<FormatByte value={1450} />
```

## Anatomy and DOM ownership

The component renders one `span` with `data-slot="format-byte"`. The string helper renders no DOM.

## API

| Prop | Value | Default |
| --- | --- | --- |
| `value` | required numeric quantity | none |
| `locale` | BCP 47 locale | inherited `LocaleProvider`, then `en-US` |
| `precision` | significant digits | `3` |
| `unit` | `bit`, `byte` | `byte` |
| `unitDisplay` | `long`, `short`, `narrow` | `short` |
| `unitSystem` | `binary`, `decimal` | `decimal` |
| `formatOptions` | remaining `Intl.NumberFormatOptions` | none |

## Visual recipes and states

Output inherits surrounding typography and color. There are no visual variants or interactive states.

## Tokens and CSS hooks

The stable hook is `data-slot` with value `format-byte`. The component exposes no paint token; its modular stylesheet is intentionally empty.

## Customization

Choose semantic unit options on the formatter and place it inside Text when a typography recipe is required.

## Responsive behavior

Unit formatting does not change with viewport size. Surrounding layout owns responsive placement.

## Accessibility

Use `unitDisplay="long"` when abbreviated units would be unclear in the surrounding context.

## Composition, native props, and refs

`FormatByte` forwards native span attributes and its ref. The pure `formatByte` helper accepts the same format options.

## Examples

```tsx
<FormatByte value={2048} unitSystem="binary" />
<FormatByte value={1450} unit="bit" unitDisplay="long" />
```

## Evidence

- [Playground evidence](../../../playground/src/components/format-byte/)
- [Focused component tests](../../../test/components/format-byte/)
- [Type tests](../../../test/types/components/format-byte.test.ts)
- [Browser behavior](../../../playground/tests/components/format-byte/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/format-byte/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/format-byte.md)

## Changelog

See the [Format Byte changelog](CHANGELOG.md) and the [package changelog](../../../CHANGELOG.md).
