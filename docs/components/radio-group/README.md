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

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/radio-group.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


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

Item retains its button ref and automatic passive Radiomark. For open composition,
use ItemRoot (div), exactly one ItemHiddenInput (native radio), ItemControl,
ItemIndicator, ItemText (label), and optional ItemDescription. Label names the
group. Context and ItemContext expose state through render-function children.
RootProvider accepts the controller returned by useRadioGroup.

## API

Root accepts released Atom Radio Group props, including `value`,
`defaultValue`, `onValueChange`, `name`, `form`, `disabled`, `readOnly`,
`required`, `invalid`, `validationBehavior`, `orientation`, `loop`, `render`,
`dir`, and `asChild`. Brick adds responsive `size: "xs" | "sm" | "md" | "lg"`, defaulting to `"md"`.
Item requires `value` and visible `children`, and accepts Atom Item native,
disabled, render, and asChild props. Root presentation inherits into Item and
ItemRoot; explicit item overrides win.

Every namespace part is also exported with a RadioGroup prefix. Hooks are
useRadioGroup, useRadioGroupContext and useRadioGroupItemContext.
Named exports include RadioGroupRoot, RadioGroupItem, RadioGroupRootProps,
RadioGroupItemProps, RadioGroupSize and RadioGroupVariant.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | responsive `xs`, `sm`, `md`, `lg` | `md` |
| `variant` | responsive `solid`, `outline`, `subtle` | `solid` |
| `tone` | accent, neutral, contrast, info, success, warning, danger | accent |
| `density` | comfortable, compact | comfortable |
| `labelPlacement` | start, end | end |
| `gap` | responsive SpacingValue | theme space 1 |
| `orientation` | `vertical`, `horizontal` | `vertical` |
| `asChild` | `boolean` | `false` |

## Visual recipes and states

Sizes use the selection-family 12/16/20/24px mark scale at a 16px root.
Rows are intrinsic; horizontal groups wrap. Outline stays transparent; solid
fills checked marks; subtle keeps the circle visible. Neutral and contrast
currently share a palette. Danger tone does not imply invalid semantics.
Read-only keeps normal contrast; disabled dims once. Focus uses the Theme ring.

## Tokens and CSS hooks

Stable hooks are `.brick-radio-group`, `.brick-radio-group-item`,
`.brick-radio-group-control` and `.brick-radio-group-label`. The passive dot
is now Radiomark's `.brick-radiomark__dot`. Root and items expose responsive
size/variant data attributes (`data-size`, `data-variant`), tone, density and label placement.

Public variables include `--brick-radio-group-gap`,
`--brick-radio-control-size`,
`--brick-radio-target-min-size`, `--brick-radio-item-gap`,
`--brick-radio-item-padding-inline`, `--brick-radio-item-radius`,
`--brick-radio-foreground`, `--brick-radio-checked`,
`--brick-radio-focus-ring` and `--brick-radio-invalid`.

Migration: default md changes from 18px to 20px and selected paint becomes solid.
Use outline for the nearest previous appearance. The old dot-size,
control-background/control-border and readonly-background variables are retired:
use the variant/tone API and Radiomark presentation hooks rather than painting a
read-only row. The invalid side stripe and compulsory row hover are removed.

## Customization

Prefer the size prop, semantic tokens, then component variables. For example,
set `--brick-radio-checked` and `--brick-radio-group-gap` on Root. Do not remove
the visible focus or checked distinction.

## Responsive behavior

Horizontal rows wrap; both orientations use intrinsic items. Size, variant and
gap accept sparse responsive values. Orientation is scalar because it owns
keyboard semantics. Labels and descriptions wrap; logical placement supports RTL.

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

Closed Item children must be noninteractive. Use the native open anatomy for
links. Clicking a link in ItemText must not change selection; description text
is associated separately with aria-describedby. Do not add role or tabIndex to
ItemControl/ItemIndicator, and never put a second hidden input beside the owned one.
Native input refs target ItemHiddenInput. Stable unique nonempty values are required.
Missing/disabled selected values recover an enabled Tab entry without changing
application state; required validity needs an available selected choice.

React Hook Form is an optional separate dependency: use Controller with value,
onValueChange and onBlur; attach field.ref to a closed Item or ItemHiddenInput
for error focus. Do not spread register onto a group div.

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
