# Radio Group

Radio Group is Brick's finished single-selection control for short visible
choice sets. Atom owns selection, keyboard, focus, form, validation, direction,
and read-only behavior; Brick owns the circular visual, sizes, layout, states,
and stable customization hooks.

## When and where to use

Use Radio Group when one choice must be selected from a short list and seeing
every option helps the decision. Compose it with Fieldset for a visible legend,
description, required indicator, or error.

## When not to use

Use Checkbox Group for several choices, Select for a compact longer list, and
Toggle Group for immediate commands. Radio Group is not a radio-card, menu,
segmented-control, or standalone-radio API.

## Installation and imports

```tsx
import { RadioGroup } from "@flowstack-ui/brick";
// or
import { RadioGroup } from "@flowstack-ui/brick/radio-group";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<RadioGroup.Root aria-label="Notification channel" defaultValue="email" name="channel">
  <RadioGroup.Item value="email">Email</RadioGroup.Item>
  <RadioGroup.Item value="sms">SMS</RadioGroup.Item>
</RadioGroup.Root>
```

## Anatomy and DOM ownership

| Part | Default element | Owner | Ref target |
| --- | --- | --- | --- |
| `Root` | `div` with `radiogroup` | Atom behavior + Brick layout | `HTMLDivElement` |
| `Item` | `button` with `radio` | Atom behavior + Brick visual | `HTMLButtonElement` |

Each Item contains stable internal control, dot, and label slots. They are
customization hooks, not separately exported parts.

## API

Root accepts released Atom Radio Group props, including `value`,
`defaultValue`, `onValueChange`, `name`, `form`, `disabled`, `readOnly`,
`required`, `invalid`, `validationBehavior`, `orientation`, `loop`, `render`,
`dir`, and `asChild`. Brick adds `size: "sm" | "md" | "lg"`, defaulting to `"md"`.
Item requires `value` and visible `children`, and accepts Atom Item native,
disabled, render, and asChild props. Root owns the shared size.

Public exports are `RadioGroup`, `RadioGroupRoot`, `RadioGroupItem`,
`RadioGroupRootProps`, `RadioGroupItemProps`, and `RadioGroupSize`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `orientation` | `vertical`, `horizontal` | `vertical` |
| `asChild` | `boolean` | `false` |

## Visual recipes and states

Radio Group has one canonical unchecked circle and accent checked dot. Vertical
groups stack full-width rows; horizontal groups use fit-content rows and wrap.
Small, medium, and large change control/dot size, gap, padding, and typography.
Focus, hover, active, disabled, read-only, and invalid states have explicit
paint. There are no variant, tone, color, shape, or gap props.

## Tokens and CSS hooks

Stable hooks are `.brick-radio-group`, `.brick-radio-group-item`,
`.brick-radio-group-control`, `.brick-radio-group-dot`, and
`.brick-radio-group-label`, with matching `data-slot` values. Root exposes
`data-size`; Atom exposes orientation and state attributes.

Public variables include `--brick-radio-group-gap`,
`--brick-radio-control-size`, `--brick-radio-dot-size`,
`--brick-radio-target-min-size`, `--brick-radio-item-gap`,
`--brick-radio-item-padding-inline`, `--brick-radio-item-radius`,
`--brick-radio-foreground`, `--brick-radio-control-background`,
`--brick-radio-control-border`, `--brick-radio-checked`,
`--brick-radio-focus-ring`, `--brick-radio-invalid`, and
`--brick-radio-readonly-background`.

## Customization

Prefer the size prop, semantic tokens, then component variables. For example,
set `--brick-radio-checked` and `--brick-radio-group-gap` on Root. Do not remove
the visible focus or checked distinction.

## Responsive behavior

Horizontal rows wrap; vertical rows fill the group. Long labels wrap within
their item. Logical spacing and the invalid cue support RTL. Minimum targets,
narrow widths, mobile, and 200%/400% zoom remain contained.

## Accessibility

Give Root an accessible group name, normally Fieldset Legend or native ARIA.
Item children name each radio. Atom supplies one roving Tab stop, arrows,
Home/End, Space, disabled-item skipping, loop, RTL navigation, required/invalid
state, validation focus, reset, and form submission. Read-only remains
focusable and submitted but cannot change selection.
An explicit Root `dir` controls both logical layout and horizontal arrow keys;
otherwise Atom uses its nearest Direction provider.

## Composition, native props, and refs

Root and Item retain Atom `render` and `asChild`; Brick preserves the built-in
control/dot/label content in custom hosts. Native props pass through unless
Atom owns them. Root and Item refs target their rendered elements.

## Examples

```tsx
<Fieldset.Root id="channel" required>
  <Fieldset.Legend>Notification channel</Fieldset.Legend>
  <Fieldset.Description>Choose one delivery method.</Fieldset.Description>
  <RadioGroup.Root defaultValue="email" name="channel">
    <RadioGroup.Item value="email">Email</RadioGroup.Item>
    <RadioGroup.Item value="sms">SMS</RadioGroup.Item>
  </RadioGroup.Root>
  <Fieldset.Error>Choose a channel.</Fieldset.Error>
</Fieldset.Root>
```

## Evidence

- [Playground route](../../../playground/src/components/radio-group/RadioGroupPage.tsx)
- [Component test](../../../test/components/radio-group/radio-group.test.tsx)
- [Type test](../../../test/types/components/radio-group.test.ts)
- [Browser test](../../../playground/tests/components/radio-group/behavior.spec.ts)
- [Visual test](../../../playground/tests/components/radio-group/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/radio-group.md)
- [Packed Consumer](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
