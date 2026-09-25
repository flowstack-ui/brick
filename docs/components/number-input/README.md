# Number Input


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

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/number-input.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<Field.Root id="quantity" required>
  <Field.Label>Quantity</Field.Label>
  <NumberInput.Root min={1} name="quantity">
    <NumberInput.Input />
    <NumberInput.Control
      incrementLabel="Increase quantity"
      decrementLabel="Decrease quantity"
    />
  </NumberInput.Root>
  <Field.Error>Enter at least one item.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership

For an internal `NumberInput.Label`, compose it before a direct
`NumberInput.Group` containing Input and Control. Group is the painted field;
Root remains the shared state and recipe boundary. This keeps the label outside
the input border. Existing Input/Control-only roots need no Group.

`NumberInputGroup`, `NumberInputGroupProps`, `NumberInputElement`, and
`NumberInputElementProps` are also exported. Group and Element render native
divs and forward native attributes and refs. Group inherits size, variant,
radius, and state from Root or RootProvider. Use it with `layout="field"`;
keep detached steppers ungrouped. Element accepts `placement="start" | "end"`
(default `start`) and reserves a non-overlapping content column. Place a
Scrubber containing a decorative Icon in Element for compact leading drag
control. It supplements, never replaces, the accessible Input.

```tsx
<NumberInput.Root defaultValue={3}>
  <NumberInput.Label>Quantity</NumberInput.Label>
  <NumberInput.Group>
    <NumberInput.Input />
    <NumberInput.Control />
  </NumberInput.Group>
</NumberInput.Root>
```

`Root` renders Atom's `div` and is the Brick visual boundary. `Input` renders the native `input[type=text]` with `role=spinbutton` and receives the input ref. `Control` groups the logical-end stacked step actions and generates both actions when children are omitted. `Increment` and `Decrement` render Atom buttons and receive button refs. Their default SVGs are private decorative artwork. `Unit` renders a presentational suffix. Public slots cover every part through the matching `number-input-*` names; stable classes use the matching `.brick-number-input*` names.

Generated Control actions inherit their generic accessible labels from
`LocaleProvider`. `incrementLabel` and `decrementLabel` remain authoritative
when the field needs product-specific wording.

## API

Public exports are `NumberInput`, `NumberInputRoot`, `NumberInputInput`,
`NumberInputUnit`, `NumberInputControl`,
`NumberInputIncrement`, `NumberInputDecrement`, `NumberInputRootProps`,
`NumberInputInputProps`, `NumberInputUnitProps`, `NumberInputIncrementProps`,
`NumberInputDecrementProps`, `NumberInputVariant`, `NumberInputSize`,
`NumberInputControlProps`, `NumberInputShape`, `NumberInputStepperVisibility`,
and `NumberInputLayout`.

| Root prop           | Values                                                            | Default   |
| ------------------- | ----------------------------------------------------------------- | --------- |
| `variant`           | `outline`, `surface`, `soft`, `subtle`, `ghost`, `plain`, `underline`; or a responsive value | `outline` |
| `size`              | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`; or a responsive value | `lg`      |
| `shape`             | `sharp`, `rounded`, `pill`                                        | `rounded` |
| `fullWidth`         | boolean                                                           | `true`    |
| `stepperVisibility` | `always`, `hover`                                                 | `always`  |
| `layout`            | `field`, `stepper`                                                | `field`   |

`NumberInput.Unit` renders a stable suffix column before the stepper, such as
`px` or `%`, without placing presentation text inside the editable value.
Increment and Decrement are optional; when both are omitted, the editable
value reclaims their complete column for compact read-and-type compositions.
`layout="stepper"` places equal square decrement and increment actions on
opposite sides of a centered, editable value. Its default artwork changes to
minus and plus, and its numeric reading scale is larger than compact control
labels. It is intended for quantity, seat, and inventory selection.
`NumberInput.Control` is optional shorthand for both
actions; localize its generated action labels when the interface language is
not English.

`underline` rejects `shape`. Root also preserves Atom's `value`, `defaultValue`, `onValueChange`, `min`, `max`, `step`, `largeStep`, `precision`, `clampOnBlur`, `formatter`, `parser`, `placeholder`, state, validation, name, form, and ARIA props. Step children replace Brick artwork; name custom actions explicitly.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

### Internationalization and controller composition

Numeric mode remains the default (`number | null` and a numeric callback).
Opt into `valueMode="string"` for string values and callbacks containing
`{ value, valueAsNumber }`; blank or invalid text projects NaN in details but
submits an empty native value. Named fields always submit parsed numbers.
`locale` inherits LocaleProvider and `formatOptions` supports native decimal,
currency, percentage and unit presentation. Do not combine it with custom
`parser`/`formatter` callbacks. Those legacy callbacks remain reversible pairs.

`useNumberInput` supplies the same locale-adapted Atom controller to
`RootProvider`. Label associates with Input, ValueText displays the current
editing value, Context is a wrapper-free callback, and Scrubber supplies
horizontal pointer stepping without replacing keyboard access. Increment and
Decrement inherit translated names; explicit aria-label and Control label
props win. RootProvider uses the same visual recipes as Root.

Shift+Arrow uses largeStep, Alt+Arrow uses smallStep (step / 10). Enter and blur
commit, following clampOnBlur. `allowOverflow` permits out-of-range editing by
default; `allowMouseWheel` is false by default and only acts while focused.
`spinOnPress` and `focusInputOnChange` default to true. Commit, focus and range
details are available through onValueCommit, onFocusChange and onValueInvalid.
Use ids for independent root/input/label/action IDs; the legacy id identifies
the input. inputMode and pattern reach the actual input.

Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.



Number Input is a finished numeric entry control backed by Atom Number Input. Atom owns numeric value, parsing, formatting, bounds, stepping, validation, and form behavior; Brick owns the visual recipes and fixed step artwork.

In detached `layout="stepper"`, `surface` fills the two bordered action buttons;
the space around the value remains transparent rather than joining the controls.

The field recipes are `outline`, `surface`, `soft`, `subtle`, `ghost`,
`plain` and `underline`, with responsive initial/sm/md/lg/xl values. Subtle
has a neutral fill and transparent border; ghost gains only a neutral hover
fill; plain has no hover fill. Underline uses zero start inset and bottom-only
focus. Other breakpoints restore normal geometry. Responsive variant objects
exclude explicit radius/shape. These choices do not repaint independent popups
or stepper action buttons.

While a connected Scrubber has `data-scrubbing`, Brick maintains the native
horizontal resize cursor throughout its document and suppresses text selection.
Ending the session restores existing cursor and selection styles automatically;
no application CSS or document inline-style cleanup is required. Pointer lock
and virtual cursor artwork are not used.

Recipes align with Input: outline has a transparent surface and complete boundary, soft uses a subtle surface, and underline uses a single indicator. Sizes change the complete control; shapes change geometry. `field` keeps stacked logical-end steppers; `stepper` uses equal square actions around the value. Focus, invalid, disabled, read-only, and boundary-unavailable state derive from Atom attributes and native state. `stepperVisibility="hover"` applies to `field`, keeps action space stable, reveals the buttons on hover or focus for fine pointers, and keeps them visible on touch/coarse-pointer devices.

## Tokens and CSS hooks

Public root variables are `--brick-number-input-height`, `--brick-number-input-radius`, `--brick-number-input-background`, `--brick-number-input-border`, `--brick-number-input-stepper-value-font-family`, `--brick-number-input-stepper-value-font-size`, `--brick-number-input-stepper-value-font-weight`, and `--brick-number-input-stepper-value-line-height`. Stable public attributes are `data-variant`, `data-size`, `data-shape`, `data-layout`, `data-full-width`, `data-stepper-visibility`, and `data-slot`. Do not target private SVG paths.

## Customization

Prefer recipe props, then semantic tokens, then component variables. Classes and styles on Root scope a single instance; action children replace the default artwork.

## Responsive behavior

The grid uses logical sizing, a shrinkable input column, and a fixed action column. Full width remains contained at narrow widths and the action column moves to the logical end in RTL. On coarse-pointer devices, `sm` and `md` become tall enough to keep each stacked step action at least 24 CSS px; this applies to touch screens at any viewport width.

## Accessibility

### Focus presentation

Forced colors preserves a real system-color focus outline; shadows are not the sole focus cue.
See [Focus presentation](../../guides/focus-presentation.md).

Provide a visible Field label or an explicit accessible name. The input exposes spinbutton semantics, values, bounds, and Field relationships. Increment and Decrement require accessible names because their artwork is decorative. Atom owns keyboard stepping, focus retention, boundary availability, validation, and form reset.

## Composition, native props, and refs

Root, Input, Increment, and Decrement preserve their public Atom/native props. Root ref targets `HTMLDivElement`, Input ref targets `HTMLInputElement`, and action refs target `HTMLButtonElement`. The compound must remain under Root.

## Examples

Decimal pricing uses `step={0.25}` and `precision={2}`. An external control uses `form="order-form"` and `name="quantity"` on Root.

## Evidence

[Playground source](../../../playground/src/components/number-input/), [unit test](../../../test/components/number-input/number-input.test.tsx), [type test](../../../test/types/components/number-input.test.ts), [browser spec](../../../playground/tests/components/number-input/behavior.spec.ts), [visual spec](../../../playground/tests/components/number-input/visual.spec.ts), and [manual protocol](../../../playground/manual-tests/number-input.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
