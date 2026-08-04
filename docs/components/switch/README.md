# Switch

Switch is Brick's finished binary setting control. Atom owns semantics, state,
keyboard, validation, forms, and composition; Brick owns track/thumb visuals,
sizes, state paint, motion, and customization hooks.

## When and where to use

Use Switch when turning a setting on or off takes effect immediately.

## When not to use

Use Checkbox for choices applied later and Toggle for a pressed command. Switch
does not represent mixed state, loading, or a choice among several values.

## Installation and imports

```tsx
import { Switch } from "@flowstack-ui/brick/switch";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/switch.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Switch.Root aria-label="Weekly reports">
  <Switch.Thumb />
</Switch.Root>
```

## Anatomy and DOM ownership

| Part | Default element | Ref target |
| --- | --- | --- |
| `Root` | `button` with `role="switch"` | `HTMLButtonElement` |
| `Thumb` | decorative `span` | `HTMLSpanElement` |

Brick adds no wrapper. Atom may render a transparent checkbox proxy before
Root when `name` or `required` needs native form behavior.

## API

Root accepts released Atom Switch props, including `checked`, `defaultChecked`,
`onCheckedChange`, `disabled`, `readOnly`, `invalid`, `required`,
`validationBehavior`, `name`, `value`, `form`, `render`, and `asChild`. Brick
adds `size`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |

Public exports are `Switch`, `SwitchRoot`, `SwitchThumb`, `SwitchRootProps`,
`SwitchThumbProps`, and `SwitchSize`.

## Visual recipes and states

One canonical recipe uses a neutral unchecked track and accent checked track.
Three sizes scale track, thumb, and travel together. Focus, hover, active,
disabled, read-only, required, and invalid states are explicit. Invalid changes
the border only. There are no variant, tone, color, shape, or loading props.

## Tokens and CSS hooks

Stable classes/slots are `.brick-switch` / `switch` and
`.brick-switch-thumb` / `switch-thumb`. Root exposes `data-size`; Atom exposes
state and availability attributes.

Public variables are `--brick-switch-target-size`,
`--brick-switch-track-inline-size`, `--brick-switch-track-block-size`,
`--brick-switch-thumb-size`, `--brick-switch-track-inset`,
`--brick-switch-track-background`, `--brick-switch-track-border`,
`--brick-switch-thumb-background`, `--brick-switch-thumb-border`,
`--brick-switch-checked-background`, `--brick-switch-checked-border`,
`--brick-switch-checked-thumb`, `--brick-switch-hover-background`,
`--brick-switch-pressed-background`, `--brick-switch-focus-ring`,
`--brick-switch-invalid-border`, and `--brick-switch-readonly-background`.

## Customization

Prefer `size`, semantic theme tokens, then the public component variables.
Keep checked, focus, disabled, and invalid distinctions visible.

## Responsive behavior

Switch is intrinsic and never stretches. Logical thumb travel mirrors in RTL;
state meaning does not reverse. Minimum targets, narrow layouts, mobile, and
200%/400% zoom remain operable.

## Accessibility

Provide a stable setting name with Field Label, native label association,
`aria-label`, or `aria-labelledby`. Atom supplies `role="switch"`, boolean
`aria-checked`, click/Space/Enter activation, focus, disabled/read-only,
validation, and form behavior. Thumb is always hidden from assistive
technology. Mixed state is not supported.

## Composition, native props, and refs

Root and Thumb retain Atom `render` and `asChild`. Native props pass through
unless Atom owns them. Refs target the rendered Root and Thumb hosts.

## Examples

```tsx
<Field.Root id="reports" required>
  <Field.Label>Weekly reports</Field.Label>
  <Switch.Root name="reports" required value="enabled">
    <Switch.Thumb />
  </Switch.Root>
  <Field.Description>Changes take effect immediately.</Field.Description>
  <Field.Error>Turn on weekly reports.</Field.Error>
</Field.Root>
```

## Evidence

- [Playground route](../../../playground/src/components/switch/SwitchPage.tsx)
- [Component test](../../../test/components/switch/switch.test.tsx)
- [Type test](../../../test/types/components/switch.test.ts)
- [Browser test](../../../playground/tests/components/switch/behavior.spec.ts)
- [Visual test](../../../playground/tests/components/switch/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/switch.md)
- [Packed Consumer](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
