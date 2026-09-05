# OTP Field

OTP Field is segmented one-time-code entry backed by Atom OTP Field. Atom owns accepted characters, focus movement, paste, masking, completion, validation, reset, and one-value form participation; Brick owns cell recipes and the static Group layout part.

## When and where to use
Use it for short verification, recovery, or pairing codes delivered through another channel.

## When not to use
Do not use it for passwords, permanent PIN storage, arbitrary serial numbers, or unrelated fields. It does not send codes, manage expiry, or submit automatically unless `autoSubmit` is explicitly enabled.

## Installation and imports
```tsx
import { Field, OTPField } from "@flowstack-ui/brick";
// or import { OTPField } from "@flowstack-ui/brick/otp-field";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/otp-field.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start
```tsx
<Field.Root id="verification" required>
  <Field.Label>Verification code</Field.Label>
  <OTPField.Root length={6} name="code">
    <OTPField.Group>{Array.from({ length: 6 }, (_, index) => <OTPField.Input index={index} key={index} />)}</OTPField.Group>
  </OTPField.Root>
  <Field.Error>Enter all six digits.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership
`Root` renders Atom's `div`; `Input` renders native one-character inputs; `Separator` renders Atom's decorative `span`; Brick-only `Group` renders a static `div`. Refs target those elements. Public slots/classes are `otp-field`, `otp-field-group`, `otp-field-input`, and `otp-field-separator` with `.brick-otp-field*` classes.

## API
Public exports are `OTPField`, `OTPFieldRoot`, `OTPFieldGroup`, `OTPFieldInput`,
`OTPFieldSeparator`, `OTPFieldRootProps`, `OTPFieldGroupProps`,
`OTPFieldInputProps`, `OTPFieldSeparatorProps`, `OTPFieldVariant`,
`OTPFieldSize`, `OTPFieldShape`, and `OTPFieldLayout`.

| Root prop | Values | Default |
| --- | --- | --- |
| `variant` | `outline`, `soft`, `underline` | `outline` |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`; or a responsive value | `lg` |
| `shape` | `sharp`, `rounded` | `rounded` |
| `layout` | `separated`, `attached` | `separated` |

`underline` rejects `shape`. Root preserves Atom's controlled/uncontrolled value, completion, length (default 6), type (default numeric), pattern, mask (default false), state, `autoFocus`/`autoSubmit` (both false), name, form, `inputId`, localized `getInputLabel`, and validation props. Input accepts an optional explicit index. Separator defaults visually to an en dash; Group has static div props.

## Visual recipes and states
Outline, soft, and underline follow the form-family paint. Size changes every cell. Shape changes cell geometry. Attached removes gaps and joins adjacent cells; separated retains individual boundaries. State paint derives from Atom data attributes.

## Tokens and CSS hooks
Public variables are `--brick-otp-size` and `--brick-otp-radius`. Root exposes `data-variant`, `data-size`, `data-shape`, `data-layout`, and `data-slot`. Stable classes and slots are listed above.

## Customization
Prefer recipe props and semantic tokens, then the two component variables. Compose Groups and Separators to express readable code grouping; do not alter cell order visually.

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
Use `mask` for shoulder-surfing resistance, `type="alphanumeric"` for mixed codes, and `getInputLabel={(index, length) => ...}` for localization.

## Evidence
[Playground source](../../../playground/src/components/otp-field/), [unit test](../../../test/components/otp-field/otp-field.test.tsx), [type test](../../../test/types/components/otp-field.test.ts), [browser spec](../../../playground/tests/components/otp-field/behavior.spec.ts), [visual spec](../../../playground/tests/components/otp-field/visual.spec.ts), and [manual protocol](../../../playground/manual-tests/otp-field.md).

## Changelog
See [CHANGELOG.md](CHANGELOG.md).
