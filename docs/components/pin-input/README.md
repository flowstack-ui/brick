# Pin Input


## When and where to use
Use it for fixed-length PINs or short verification, recovery and pairing codes.
Set `otp` for one-time-code autocomplete; general PINs do not opt into it.

## When not to use
Do not use it for unrestricted passwords, PIN storage, arbitrary variable-length
identifiers, or unrelated fields. It does not send, verify or store codes, manage
expiry, or submit unless `autoSubmit` is explicitly enabled.

## Installation and imports
```tsx
import { Field, PinInput } from "@flowstack-ui/brick";
// or import { PinInput } from "@flowstack-ui/brick/pin-input";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/pin-input.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start
```tsx
<Field.Root id="verification" required>
  <Field.Label>Verification code</Field.Label>
  <PinInput.Root length={6} name="code" otp>
    <PinInput.Group>{Array.from({ length: 6 }, (_, index) => <PinInput.Input index={index} key={index} />)}</PinInput.Group>
  </PinInput.Root>
  <Field.Error>Enter all six digits.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership
`Root` and `RootProvider` render Atom's div and automatic named hidden input.
`Input` renders a native cell; `Separator` a decorative span; `Group` a static
div. `Label` renders Atom's label, `Control` its wrapping div and `Context` no
element. Slots/classes are `pin-input`, `pin-input-label`, `pin-input-control`,
`pin-input-group`, `pin-input-input`, `pin-input-separator`, with `.brick-` classes.

## API
Public exports are `PinInput`, `PinInputRoot`, `PinInputGroup`, `PinInputInput`,
`PinInputSeparator`, `PinInputRootProps`, `PinInputGroupProps`,
`PinInputInputProps`, `PinInputSeparatorProps`, `PinInputVariant`,
`PinInputSize`, `PinInputShape`, and `PinInputLayout`.
Also exported: `PinInputRootProvider`, `PinInputContext`, `PinInputLabel`,
`PinInputControl`, `usePinInput`, `usePinInputContext`,
`PinInputRootProviderProps`, `PinInputContextProps`, `PinInputLabelProps`,
`PinInputControlProps`, `PinInputController`, `PinInputOptions`,
`PinInputValueChangeDetails`, `PinInputInvalidDetails`, and `PinInputType`.

| Root prop | Values | Default |
| --- | --- | --- |
| `variant` | `outline`, `surface`, `soft`, `subtle`, `ghost`, `plain`, `underline`; responsive map | `outline` |
| `tone` | `neutral`, `accent` | `accent` |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`; or a responsive value | `lg` |
| `shape` | `sharp`, `rounded` | `rounded` |
| `layout` | `separated`, `attached` | `separated` |

`underline` and responsive variant maps reject explicit `shape` and `radius`.
Responsive maps inherit the previous breakpoint, starting from outline.
RootProvider accepts the same recipe options and a
controller from `usePinInput(options)`. Root behavior is delegated unchanged:

| Behavior option | Values / default |
| --- | --- |
| `value`, `defaultValue` | `string[]`; empty cells by default |
| `onValueChange` | `({value, valueAsString, complete}) => void` |
| `onComplete` | `(code: string) => void`, after accepted complete state commits |
| `length` | number, default 6; render that many cells |
| `type`, `pattern` | numeric (default), alphabetic, alphanumeric, or per-character RegExp |
| `otp`, `mask` | false; mask also accepts a custom visual string |
| `placeholder`, `selectOnFocus` | `"○"`, true |
| `autoFocus`, `autoSubmit`, `blurOnComplete` | false |
| `sanitizeValue` | pasted/autofilled string transform; trims outer whitespace by default |
| `onValueInvalid` | `({value, index, reason: "invalidCharacter"}) => void` |
| `disabled`, `readOnly`, `required`, `invalid` | explicit override, otherwise Field inheritance |
| `name`, `form`, `inputId` | native submission, external form and first cell ID |
| `getInputLabel`, `translations` | localized cell function and `{label?, required?}` |
| `dir`, `validationBehavior` | inherited direction; inline/native validation |

Input accepts optional explicit index, native input handlers, accessible naming,
placeholder/autocomplete overrides, refs and Atom render/asChild. Separator
defaults to an en dash. Group has static div props. Label has native label props
and a generated association; Control has native div props. `Context` takes a
render function. Create the hook inside its Field/Form/Direction providers.

The controller exposes array `value`, `valueAsString`, `complete`, `focusedIndex`,
`setValue(array)`, `setValueAtIndex(index, character)`, `clearValue()`, `focus(index?)`,
and `blur()`. Disabled/readOnly prevent writes. Root owns one named hidden value;
do not add a duplicate proxy. Arrays preserve holes; never reconstruct controlled
state from joined `valueAsString`.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.


PinInput is fixed-length PIN and code entry backed by Atom PinInput. Atom owns
accepted characters, focus, paste, native masking, completion, validation, reset,
and form participation; Brick owns polished cell recipes and Group layout.
Outline is transparent, soft uses a semantic subtle surface, and underline has
only its bottom border. Every size changes square border-box cells and type
together using the shared form-control scale. Shape follows the Theme control
radius or explicit sharp geometry. Attached joins cells with single seams;
separated keeps gaps. Focus, invalid, disabled and readOnly paint follow Atom
state with forced-color and reduced-motion fallbacks.

## Tokens and CSS hooks
Public variables use the `--brick-pin-input-` prefix: `size`, `radius`,
`background`, `hover-background`, `border`, `hover-border`, `foreground`,
`placeholder`, `focus-ring` and `error-color`. Use semantic token values for paint.
Root exposes `data-variant`, `data-size`, responsive variant/size attributes, `data-tone`,
`data-shape`, `data-layout` and `data-slot`. Invalid overrides interaction color;
underline retains bottom-only focus. Neutral does not remove visible focus.
The exported `PinInputTone` and `ResponsivePinInputVariant` describe these props.

## Customization
Prefer recipe props and semantic tokens, then documented component variables.
Compose Groups and Separators to express readable code grouping; do not alter
cell order visually. Attached cells must be adjacent native input hosts within
each run; asChild may project onto an input but must not add intervening wrappers.

## Responsive behavior
Groups use logical flex layout and may wrap only at group boundaries. Keep code length appropriate for the available width. RTL preserves authored cell order while logical groups and separators remain contained.

## Accessibility
Use Field for a visible group label when that label helps the interface. When
nearby instructions make another visible label genuinely redundant, give Root
an equivalent standalone accessible name with `aria-label` or
`aria-labelledby`. Each cell receives a position-aware accessible name;
localize it with `getInputLabel`. Only the first cell owns native required
validity so the segmented control contributes one validation target and one
named form value. Masking is visual privacy, not secure storage.

Keep `autoFocus` off unless the product deliberately moves focus into an
already-explained code challenge and verifies keyboard, screen-reader, error,
and focus-recovery behavior. Keep completion separate from submission unless
the application explicitly owns the complete automatic-submission workflow.

## Composition, native props, and refs
Root, Input, and Separator preserve Atom composition/native props; Group preserves div props. Root and Group refs target divs, Input targets `HTMLInputElement`, and Separator targets `HTMLSpanElement`.

## Examples
Use `mask` for native password cells, `type="alphanumeric"` for mixed codes, and
`getInputLabel={(index, length) => ...}` for localization. Custom mask strings are
visual-only, not native password protection. Paste validates every character
after sanitization and rejects the entire invalid candidate; valid excess
characters truncate to length. Required validates every position. Native reset
works without a name, with external form and with prevented reset. Optional
incomplete FormData is joined text; use array state for positional partial data.

```tsx
const [value, setValue] = useState<string[]>([]);
<PinInput.Root value={value} onValueChange={({value}) => setValue(value)} length={4}>
  <PinInput.Label>Access PIN</PinInput.Label>
  <PinInput.Control>
    <PinInput.Group>{[0, 1, 2, 3].map(index => <PinInput.Input key={index} index={index} />)}</PinInput.Group>
  </PinInput.Control>
</PinInput.Root>
```

### Migration

PinInput replaces OTPField, its `/otp-field` import and stylesheet route with
`/pin-input`; no compatibility alias remains. Update imports/classes, change
string state to arrays/details callbacks, and set `otp` for existing one-time
code consumers. Rename custom hooks to `--brick-pin-input-size` and
`--brick-pin-input-radius`. Prior published artifacts retain their old API.

## Evidence
[Playground source](../../../playground/src/components/pin-input/), [unit test](../../../test/components/pin-input/pin-input.test.tsx), [type test](../../../test/types/components/pin-input.test.ts), [browser spec](../../../playground/tests/components/pin-input/behavior.spec.ts), [visual spec](../../../playground/tests/components/pin-input/visual.spec.ts), and [manual protocol](../../../playground/manual-tests/pin-input.md).

## Changelog
See [CHANGELOG.md](CHANGELOG.md).
