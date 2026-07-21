# Checkbox

Checkbox is one independent submitted selection. Atom owns checked and mixed
state, native form participation, validation, reset, keyboard interaction,
composition, and refs; Brick supplies the finished row, control, and built-in
check/dash artwork.

## Use and avoid

Use Checkbox for an acknowledgement or independent option. Use
CheckboxGroup for multiple related choices, RadioGroup for exactly one choice,
Switch for an immediately applied setting, and Toggle for a persistent command.

## Import and quick start

```tsx
import { Checkbox } from "@flowstack-ui/brick/checkbox";
import "@flowstack-ui/brick/styles.css";

<Checkbox name="terms" required value="accepted">
  Accept the terms
</Checkbox>
```

Checkbox is also exported from the package root. Brick requires exactly
`@flowstack-ui/atom` 0.6.11 and React 18 or newer.

## API

Checkbox forwards Atom's complete `checked`, `defaultChecked`,
`onCheckedChange`, `disabled`, `readOnly`, `invalid`, `required`, `name`,
`value`, `form`, native button/global/ARIA/data/event props, `className`,
`style`, `data-slot`, `render`, `asChild`, and button ref contract.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |

`asChild` and `render` are mutually exclusive. `asChild` requires one element;
Brick prepends its visual control to that element's existing children while
Atom still merges semantics, events, class, style, slot, and ref.

Visible children, `aria-label`, or `aria-labelledby` must name the control.
Brick does not generate fallback copy or a hidden label.

## State and forms

`checked` accepts `true`, `false`, or `"indeterminate"`. Mixed state is
announced through `aria-checked="mixed"`; it does not submit as checked.
Unchecked controls are absent from FormData. Checked controls submit their
configured name/value, disabled controls are omitted, `required` participates
in native validity, `form` supports an external owner, and native reset restores
the uncontrolled default.

Compose Checkbox as the control inside Brick Field when it needs an external
label, instructions, required/invalid state, and error. Checkbox does not create
Field automatically.

## Styling

The stable root is `.brick-checkbox`; the slot defaults to `checkbox` and Atom
exposes `data-state`, `data-disabled`, `data-readonly`, `data-invalid`, and
`data-required`. Brick adds `data-size`.

Public component tokens are:

```text
--brick-checkbox-control-size
--brick-checkbox-target-min-size
--brick-checkbox-gap
--brick-checkbox-border-width
--brick-checkbox-radius
--brick-checkbox-indicator-size
--brick-checkbox-row-padding-inline
--brick-checkbox-label-foreground
--brick-checkbox-description-foreground
--brick-checkbox-control-background
--brick-checkbox-control-border
--brick-checkbox-control-checked-background
--brick-checkbox-control-checked-foreground
--brick-checkbox-invalid-foreground
```

Every size retains at least a 44 CSS-pixel row target. Light, dark, forced
colors, reduced motion, RTL, long text, and 200%/400% reflow are supported.

See [CHANGELOG.md](CHANGELOG.md).
