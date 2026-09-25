# Password Toggle Field


## When and where to use

Use it when revealing a typed password helps people verify long or complex credentials.

## When not to use

Use Input with `type="password"` when no reveal action is wanted. Do not use it for OTP codes or imply that visible text remains private. Password strength, generation, storage, and policy remain application concerns.

## Installation and imports

```tsx
import { Field, PasswordToggleField } from "@flowstack-ui/brick";
// or import { PasswordToggleField } from "@flowstack-ui/brick/password-toggle-field";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/password-toggle-field.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<Field.Root id="password" required>
  <Field.Label>Password</Field.Label>
  <PasswordToggleField.Root>
    <PasswordToggleField.Input
      name="password"
      autoComplete="current-password"
    />
    <PasswordToggleField.Toggle />
  </PasswordToggleField.Root>
  <Field.Error>Enter a password.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership

`Root` provides Atom state and renders Brick's visual `span`. `Input` renders the native input and receives its ref. `Toggle` renders the Atom button and receives its ref. `Icon` renders Atom's state-switching span and receives its ref. Default SVG eye artwork is private. Stable slots/classes are `password-toggle-field`, `password-toggle-field-input`, `password-toggle-field-toggle`, and `password-toggle-field-icon` with matching `.brick-*` classes.

## API

Public exports are `PasswordToggleField`, `PasswordToggleFieldRoot`,
`PasswordToggleFieldInput`, `PasswordToggleFieldToggle`,
`PasswordToggleFieldIcon`, `PasswordToggleFieldRootProps`,
`PasswordToggleFieldInputProps`, `PasswordToggleFieldToggleProps`,
`PasswordToggleFieldIconProps`, `PasswordToggleFieldVariant`,
`PasswordToggleFieldSize`, and `PasswordToggleFieldShape`.

| Root prop   | Values                                                                               | Default        |
| ----------- | ------------------------------------------------------------------------------------ | -------------- |
| `variant`   | `outline`, `surface`, `soft`, `subtle`, `ghost`, `plain`, `underline`; or responsive | `outline`      |
| `size`      | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`; or responsive                            | `lg`           |
| `shape`     | `sharp`, `rounded`, `pill`                                                           | `rounded`      |
| `fullWidth` | boolean                                                                              | `true`         |
| `showLabel` | string                                                                               | locale default |
| `hideLabel` | string                                                                               | locale default |

`underline` and responsive variants reject `shape` and `radius`. Root preserves controlled/uncontrolled visibility, change callback, disabled, read-only, invalid, required, and validation props. Input preserves supported password input/native props. Toggle children replace the default Icon. Icon accepts visible/hidden artwork, with Brick defaults when omitted.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Password Toggle Field is native password entry with an explicitly named visibility action, backed by Atom Password Toggle Field. Atom owns visibility state, Field and Form relationships, reset, submission safety, and native input behavior; Brick owns recipes and default eye artwork.

The field recipes are `outline`, `surface`, `soft`, `subtle`, `ghost`,
`plain` and `underline`, with responsive initial/sm/md/lg/xl values. `outline`
is transparent at rest; `surface` is filled and bordered; `soft` and `subtle`
provide quieter fills; `ghost` paints on interaction; and `plain` has no field
fill. Underline uses zero start inset and bottom-only focus. Responsive variant
objects exclude explicit radius/shape. These choices do not repaint the
independently focusable visibility action.
Recipes, sizes, and shapes align with Input. Visibility changes native input
type and artwork only, not geometry. The default artwork is optically centered
inside the square action. Pointer interaction with Toggle preserves Input focus
and its field focus presentation. Sequential keyboard focus moves to Toggle,
removes the field focus paint, and gives the action its own compact inset ring.
Forced colors uses a real system-color outline for the currently focused owner. Invalid,
disabled, read-only, and required states derive from Atom.

## Tokens and CSS hooks

Public variables are `--brick-password-height` and `--brick-password-radius`. Root exposes `data-variant`, `data-size`, `data-shape`, `data-full-width`, and `data-slot`; Atom exposes visibility and form-state data attributes. Do not target private SVG paths.

## Customization

Prefer recipe props, semantic tokens, then component variables. Replace Toggle children or compose Icon for product artwork while retaining an accessible action name.

## Responsive behavior

The input shrinks while the square action remains contained at the logical end. Long values edit natively, localization does not alter the fixed visual target, and RTL mirrors placement logically.

## Accessibility

### Focus presentation

Forced colors preserves a real system-color focus outline; shadows are not the sole focus cue.
See [Focus presentation](../../guides/focus-presentation.md).
Use a visible Field label. The action name describes the next action and changes between `showLabel` and `hideLabel`; do not add `aria-pressed`. `LocaleProvider.localeText.showPassword` and `hidePassword` supply inherited defaults, while explicit Root labels take precedence. Atom connects Field-generated IDs, descriptions, errors, and state to Input. Reset returns uncontrolled visibility to its default. Before native submit, Atom restores `type="password"` even if the value was visible.

## Composition, native props, and refs

Input, Toggle, and Icon preserve their public Atom/native props. Input ref targets `HTMLInputElement`, Toggle targets `HTMLButtonElement`, and Icon targets `HTMLSpanElement`. Root is a state provider with a Brick visual span and no ref.

## Examples

Use `autoComplete="new-password"` for account creation and `current-password`
for sign-in. React Hook Form and password-strength scoring are optional,
application-owned integrations: install their dependencies directly, keep the
native Input ref/value path intact, and never put a password value in status,
analytics, logs, persistent UI, or live-region feedback. A client-side strength
heuristic is not a security guarantee or substitute for server policy.

For a custom action surface, compose `Toggle asChild` with `IconButton` and keep
the Atom-provided action name and handlers. Do not add a second visibility
state owner.

## Evidence

[Playground source](../../../playground/src/components/password-toggle-field/), [unit test](../../../test/components/password-toggle-field/password-toggle-field.test.tsx), [type test](../../../test/types/components/password-toggle-field.test.ts), [browser spec](../../../playground/tests/components/password-toggle-field/behavior.spec.ts), [visual spec](../../../playground/tests/components/password-toggle-field/visual.spec.ts), and [manual protocol](../../../playground/manual-tests/password-toggle-field.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
