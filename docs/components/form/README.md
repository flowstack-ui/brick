# Form

Form is the styled native form boundary for submitting and resetting related
controls. It composes Atom's form behavior while leaving validation rules,
field generation, requests, and success workflows with the application.

## When to use

Use Form around controls that submit together, whether submission uses a URL,
a React function action, `onSubmit`, native `FormData`, or a form library.

Do not use Form as a Card, page grid, validation schema, action bar, or field
factory. Those concerns compose around or inside it.

## Imports and quick start

```tsx
import { Form } from "@flowstack-ui/brick";
// or: import { Form } from "@flowstack-ui/brick/form";
import "@flowstack-ui/brick/styles.css";

<Form action="/account" method="post">
  {/* Fields and native submit/reset controls */}
</Form>
```

Brick requires exactly `@flowstack-ui/atom` 0.6.17 and React 18 or newer.

## API and native behavior

Form is a direct component—there is intentionally no `Form.Root`. It renders
`form`, forwards an `HTMLFormElement` ref, and accepts the applicable native
form, global, ARIA, data, event, class, and style props. This includes URL or
React function `action`, `method`, `encType`, `target`, `name`,
`acceptCharset`, `autoComplete`, `noValidate`, external controls associated by
native `form`, `onSubmit`, `onReset`, and `onInvalid`.

| Atom prop | Default | Purpose |
| --- | --- | --- |
| `validationBehavior` | inherited/automatic | use `inline` to suppress browser bubbles and present invalid state through compatible Field/Fieldset errors, or `native` to retain browser validation UI |
| `preventDefaultOnSubmit` | `false` | deliberately prevent native submission before `onSubmit` |
| `validateOnSubmit` | none | synchronous or asynchronous callback validation |
| `asChild` | `false` | compose one element/component that still renders a native form |
| `render` | none | element or callback composition adapter |

`asChild` and `render` are mutually exclusive. An `asChild` child must forward
the supplied props and ref and retain valid form semantics.

## Submission state

Atom exposes callback-path state through `[data-submitting]`,
`[data-submitted]`, and `[data-invalid]`. Brick preserves those styling hooks
without drawing a container outline around the otherwise unboxed Form;
applications provide explicit inline feedback or a transient Toast according
to the workflow. React function-action pending state remains owned by React's
`useFormStatus` and is not merged into Atom state automatically.

Native submission, uncontrolled `FormData`, controlled state, React Hook Form,
sync or async `onSubmit`, and function actions are all supported. Brick does
not prescribe one submission model. A native reset also clears Atom callback
metadata unless the reset event is cancelled.

Native constraint validation still blocks an invalid submission in both
presentation modes. A compatible `Field.Error` or `Fieldset.Error` selects
inline presentation for that scope automatically: the browser bubble is
suppressed, native validity becomes the scope's `data-invalid` state, and the
first invalid visible control receives focus. Set `validationBehavior="native"`
on Form, Field, Fieldset, or an individual control when browser validation UI
is deliberately required. An explicit value on the nearest control wins.

## Styling and customization

Stable hooks are `.brick-form`, overridable `data-slot="form"`, and the three
state attributes above. Public tokens are:

```text
--brick-form-gap
--brick-form-fieldset-gap
```

The default is an unboxed, full-available-width vertical grid. Use ordinary
application CSS for page columns, surfaces, and responsive action placement.
The default `--brick-form-fieldset-gap` preserves the same initial rhythm
between a Fieldset Legend and its first content as a Field Label and its
control.

## Accessibility

Form adds no role or keyboard model because native form semantics are already
correct. Give separate forms accessible names when the page contains more than
one comparable form. Validation errors are not forced live regions: announce
new asynchronous feedback deliberately and avoid repeating every error.

## Example

```tsx
<Form
  preventDefaultOnSubmit
  validateOnSubmit={(data) =>
    data.get("email") ? undefined : "Enter an email address"
  }
  onSubmit={async ({ formData }) => saveProfile(formData)}
>
  <Field.Root required>
    <Field.Label>Email</Field.Label>
    <Input.Root name="email" type="email" />
    <Field.Error>Enter a valid email address.</Field.Error>
  </Field.Root>
  <Button type="submit">Save profile</Button>
</Form>
```

See [`CHANGELOG.md`](CHANGELOG.md).
