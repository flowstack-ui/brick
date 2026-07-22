# Fieldset

Fieldset supplies native grouped-control semantics plus a finished Legend,
Description, Error, state model, and rhythm.

## When to use

Use Fieldset for related checkboxes, radio buttons, or a set of Fields that
needs one group name. Do not use it as a decorative Card or generic section;
use ordinary layout and headings when no native control group exists.

## Imports and anatomy

```tsx
import { Fieldset } from "@flowstack-ui/brick";
// or: import { Fieldset } from "@flowstack-ui/brick/fieldset";
import "@flowstack-ui/brick/styles.css";

<Fieldset.Root required>
  <Fieldset.Legend>Contact method</Fieldset.Legend>
  <Fieldset.Description>Choose one option.</Fieldset.Description>
  <RadioGroup.Root name="contact">
    <RadioGroup.Item value="email">Email</RadioGroup.Item>
    <RadioGroup.Item value="phone">Phone</RadioGroup.Item>
  </RadioGroup.Root>
  <Fieldset.Error>Select a contact method.</Fieldset.Error>
</Fieldset.Root>
```

`Fieldset` is a frozen namespace with `Root`, `Legend`, `Description`, and
`Error`; each part is also a named export from the
`@flowstack-ui/brick/fieldset` subpath, while the root package exposes the
namespace. Brick requires exactly Atom 0.6.12.

## API

`Fieldset.Root` renders native `fieldset`, forwards an
`HTMLFieldSetElement` ref and native props, and accepts `disabled`, `required`,
and `invalid` booleans (all default `false`). Native `disabled` behavior is
preserved. Invalid state emits `aria-invalid`; required state is communicated
by Legend and the actual grouped controls rather than invalid
`aria-required` on `fieldset` or `role="group"`.

- `Fieldset.Legend` renders native `legend`, forwards an `HTMLLegendElement`
  ref, and accepts `requiredIndicator` (default `" *"`) and
  `optionalIndicator`.
- `Fieldset.Description` renders `p`, forwards an `HTMLParagraphElement` ref,
  and supplies the generated group description.
- `Fieldset.Error` conditionally renders `p` while invalid or when
  `forceMatch` is true. It has no forced live-region role.

All parts forward applicable native/global/ARIA/data/event props, class,
style, slot, and native refs. Every part supports mutually exclusive `asChild`
and `render`. Root composition must still render a real fieldset and Legend
composition must still render a real legend if native grouping and disabled
behavior are expected.

## Relationships and accessibility

Legend gives compatible Atom CheckboxGroup and RadioGroup controls their
accessible group name. Visible Description and Error IDs are included in the
group's server-rendered and hydrated description relationship. Errors are not
automatically live; add an appropriate native live role only when newly
inserted feedback must be announced.

Fieldset has no border, surface, radius, or elevation. Its semantic source
order remains Legend, Description, controls/Fields, then Error. Long content,
RTL, forced colors, narrow layouts, and zoom wrap without changing that order.
Invalid styling combines danger color with a wavy Legend underline.

## Stable hooks and tokens

Classes are `.brick-fieldset`, `.brick-fieldset-legend`,
`.brick-fieldset-description`, and `.brick-fieldset-error`. Matching slots are
overridable. Root exposes `data-disabled`, `data-required`, and `data-invalid`;
Legend exposes resolved required/disabled state.

```text
--brick-fieldset-gap
--brick-fieldset-control-gap
--brick-fieldset-legend-foreground
--brick-fieldset-legend-foreground-disabled
--brick-fieldset-legend-font-family
--brick-fieldset-legend-font-size
--brick-fieldset-legend-font-weight
--brick-fieldset-legend-line-height
--brick-fieldset-indicator-foreground
--brick-fieldset-indicator-gap
--brick-fieldset-optional-foreground
--brick-fieldset-description-foreground
--brick-fieldset-description-font-size
--brick-fieldset-description-line-height
--brick-fieldset-error-foreground
--brick-fieldset-error-font-size
--brick-fieldset-error-font-weight
--brick-fieldset-error-line-height
```

Prefer semantic scopes, then anatomy tokens, then class/style escape hatches.

See [`CHANGELOG.md`](CHANGELOG.md).
