# Number Input

Number Input is a finished numeric entry control backed by Atom Number Input. Atom owns numeric value, parsing, formatting, bounds, stepping, validation, and form behavior; Brick owns the visual recipes and fixed step artwork.

## When and where to use
Use it when a person may type a number or adjust it in known increments, such as quantity, seats, or a bounded measurement.

## When not to use
Use Input for numeric-looking identifiers that are not quantities. Use Select or Radio Group when only a small fixed set is valid. Number Input does not choose units, calculate business rules, or replace a Slider for approximate adjustment.

## Installation and imports
```tsx
import { Field, NumberInput } from "@flowstack-ui/brick";
// or import { NumberInput } from "@flowstack-ui/brick/number-input";
import "@flowstack-ui/brick/styles.css";
```

## Quick start
```tsx
<Field.Root id="quantity" required>
  <Field.Label>Quantity</Field.Label>
  <NumberInput.Root min={1} name="quantity">
    <NumberInput.Input />
    <NumberInput.Increment aria-label="Increase quantity" />
    <NumberInput.Decrement aria-label="Decrease quantity" />
  </NumberInput.Root>
  <Field.Error>Enter at least one item.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership
`Root` renders Atom's `div` and is the Brick visual boundary. `Input` renders the native `input[type=text]` with `role=spinbutton` and receives the input ref. `Increment` and `Decrement` render Atom buttons and receive button refs. Their default SVGs are private decorative artwork. Public slots are `number-input`, `number-input-control`, `number-input-increment`, and `number-input-decrement`; stable classes use the matching `.brick-number-input*` names.

## API
Public exports are `NumberInput`, `NumberInputRoot`, `NumberInputInput`,
`NumberInputIncrement`, `NumberInputDecrement`, `NumberInputRootProps`,
`NumberInputInputProps`, `NumberInputIncrementProps`,
`NumberInputDecrementProps`, `NumberInputVariant`, `NumberInputSize`, and
`NumberInputShape`.

| Root prop | Values | Default |
| --- | --- | --- |
| `variant` | `outline`, `soft`, `underline` | `outline` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `sharp`, `rounded`, `pill` | `rounded` |
| `fullWidth` | boolean | `true` |

`underline` rejects `shape`. Root also preserves Atom's `value`, `defaultValue`, `onValueChange`, `min`, `max`, `step`, `largeStep`, `precision`, `clampOnBlur`, `formatter`, `parser`, `placeholder`, state, validation, name, form, and ARIA props. Step children replace Brick artwork; name custom actions explicitly.

## Visual recipes and states
Recipes align with Input: outline has a complete boundary, soft uses a subtle surface, and underline uses a single indicator. Sizes change the complete control; shapes change geometry. Focus, invalid, disabled, read-only, and boundary-unavailable state derive from Atom attributes and native state.

## Tokens and CSS hooks
Public root variables are `--brick-number-input-height`, `--brick-number-input-radius`, `--brick-number-input-background`, and `--brick-number-input-border`. Stable public attributes are `data-variant`, `data-size`, `data-shape`, `data-full-width`, and `data-slot`. Do not target private SVG paths.

## Customization
Prefer recipe props, then semantic tokens, then component variables. Classes and styles on Root scope a single instance; action children replace the default artwork.

## Responsive behavior
The grid uses logical sizing, a shrinkable input column, and a fixed action column. Full width remains contained at narrow widths and the action column moves to the logical end in RTL.

## Accessibility
Provide a visible Field label or an explicit accessible name. The input exposes spinbutton semantics, values, bounds, and Field relationships. Increment and Decrement require accessible names because their artwork is decorative. Atom owns keyboard stepping, focus retention, boundary availability, validation, and form reset.

## Composition, native props, and refs
Root, Input, Increment, and Decrement preserve their public Atom/native props. Root ref targets `HTMLDivElement`, Input ref targets `HTMLInputElement`, and action refs target `HTMLButtonElement`. The compound must remain under Root.

## Examples
Decimal pricing uses `step={0.25}` and `precision={2}`. An external control uses `form="order-form"` and `name="quantity"` on Root.

## Evidence
[Playground source](../../../playground/src/components/number-input/), [unit test](../../../test/components/number-input/number-input.test.tsx), [type test](../../../test/types/components/number-input.test.ts), [browser spec](../../../playground/tests/components/number-input/behavior.spec.ts), [visual spec](../../../playground/tests/components/number-input/visual.spec.ts), and [manual protocol](../../../playground/manual-tests/number-input.md).

## Changelog
See [CHANGELOG.md](CHANGELOG.md).
