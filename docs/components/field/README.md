# Field

Field supplies the finished structure, relationships, state, and layout for
one labeled form control. Atom owns generated IDs and accessibility behavior;
Brick owns the visual system.

## When to use

Use Field around a control with a visible label and optional description or
error. Use Fieldset instead for a semantic group of controls. Field does not
create a control, infer validation rules, or replace a visible label with a
placeholder.

## Imports and anatomy

```tsx
import { Field } from "@flowstack-ui/brick";
// or: import { Field } from "@flowstack-ui/brick/field";
import "@flowstack-ui/brick/styles.css";

<Field.Root required>
  <Field.Label>Email</Field.Label>
  <Input.Root name="email" type="email" />
  <Field.Description>Use your work address.</Field.Description>
  <Field.Error>Enter a valid address.</Field.Error>
</Field.Root>
```

`Field` is a frozen namespace with `Root`, `Label`, `Description`, `Error`, and
`RequiredIndicator`. Every part is also available as a named export from the
`@flowstack-ui/brick/field` subpath, while the root package exposes the
namespace. Brick requires exactly Atom 0.6.12.

## Root API

`Field.Root` renders `div`, forwards an `HTMLDivElement` ref and native div
props, and accepts:

| Prop | Values | Default |
| --- | --- | --- |
| `invalid` | boolean | `false` |
| `disabled` | boolean | `false` |
| `required` | boolean | `false` |
| `readOnly` | boolean | `false` |
| `orientation` | `vertical`, `horizontal` | `vertical` |

An explicit root `id` becomes the stable prefix for generated control, label,
description, and error IDs. Otherwise Atom uses a hydration-stable ID. State is
provided to Field-aware Atom controls; explicit control ARIA remains
authoritative.

## Parts

- `Field.Label` renders `label`, forwards an `HTMLLabelElement` ref, and
  supports state overrides plus `requiredIndicator` (default `" *"`) and
  `optionalIndicator`.
- `Field.Description` renders `p`, forwards an `HTMLParagraphElement` ref, and
  participates in the control's generated description relationship.
- `Field.Error` conditionally renders `p`. `match` selects the matching invalid
  condition and `forceMatch` exposes server/application errors independently.
  It deliberately has no forced live-region role.
- `Field.RequiredIndicator` conditionally renders `span`: children while
  required and `fallback` while optional. Set Label's
  `requiredIndicator={null}` when placing this part separately.

Every part forwards applicable global, native, ARIA, data, event, class, style,
and slot props plus its native ref. Every part supports mutually exclusive
`asChild` and `render` composition. `asChild` requires one element; composed
output must retain suitable semantics and forward props/ref.

## Responsive layout

Vertical fields follow semantic source order in one column. Horizontal fields
use intrinsic CSS: label and control form two logical columns only while both
minimums fit, then reflow to one column without a JavaScript breakpoint.
Description and Error align with the control column at wide sizes. Long text,
RTL, 200%/400% zoom, and 256 CSS-pixel layouts wrap rather than clip.

## Accessibility and state

Use one visible Label. Description and the currently visible Error are linked
to Field-aware controls in server markup and after hydration. Required text is
decorative to assistive technology because required state reaches the control;
optional text remains readable. Disabled, read-only, required, invalid, and
orientation states are exposed as data attributes. Invalid styling uses both
danger color and a wavy label underline.

Add `role="alert"`, `role="status"`, or `aria-live` to Error only when the
timing of newly inserted feedback needs it.

## Stable hooks and tokens

Classes: `.brick-field`, `.brick-field-label`,
`.brick-field-description`, `.brick-field-error`, and
`.brick-field-required-indicator`. Slots use matching `field-*` names and may
be overridden. Root states include `data-orientation`, `data-disabled`,
`data-required`, `data-readonly`, and `data-invalid`.

```text
--brick-field-row-gap
--brick-field-column-gap
--brick-field-label-min-inline-size
--brick-field-control-min-inline-size
--brick-field-label-foreground
--brick-field-label-foreground-disabled
--brick-field-label-font-family
--brick-field-label-font-size
--brick-field-label-font-weight
--brick-field-label-line-height
--brick-field-indicator-foreground
--brick-field-indicator-gap
--brick-field-optional-foreground
--brick-field-description-foreground
--brick-field-description-font-size
--brick-field-description-line-height
--brick-field-error-foreground
--brick-field-error-font-size
--brick-field-error-font-weight
--brick-field-error-line-height
```

Prefer semantic token scopes, then these anatomy tokens, then `className` or
`style`. Verify consumer color overrides across states and appearances.

See [`CHANGELOG.md`](CHANGELOG.md).
