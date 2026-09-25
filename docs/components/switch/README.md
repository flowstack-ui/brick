# Switch


## When and where to use

Use Switch when changing an on/off setting takes effect immediately.

## When not to use

Use Checkbox for a choice applied later and Toggle for a pressed command.
Switch does not represent mixed, loading or pending state.

## Installation and imports

```tsx
import { Switch, useSwitch } from "@flowstack-ui/brick/switch";
import "@flowstack-ui/brick/styles.css";
```

For a measured route-aware build, replace the complete stylesheet with the
shared foundation and Switch stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/switch.css";
```

Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<Switch.Field name="reports" value="weekly">
  <Switch.Control />
  <Switch.Label>Weekly reports</Switch.Label>
  <Switch.HiddenInput />
</Switch.Field>
```

The compound path has one state owner, one focusable Control and exactly one
HiddenInput. Control supplies one default Thumb only when children are omitted.

## Anatomy and DOM ownership

| Part | Default element and responsibility | Ref |
| --- | --- | --- |
| `SwitchField` / `Switch.Field` | Compound state, ID and form owner | `HTMLDivElement` |
| `SwitchRoot` / `Switch.Root` | Compatible standalone button switch | `HTMLButtonElement` |
| `SwitchControl` / `Switch.Control` | Compound keyboard and focus owner | `HTMLButtonElement` |
| `SwitchThumb` / `Switch.Thumb` | Decorative moving artwork | `HTMLSpanElement` |
| `SwitchLabel` / `Switch.Label` | Native label associated to Control | `HTMLLabelElement` |
| `SwitchHiddenInput` / `Switch.HiddenInput` | Native checkbox proxy | `HTMLInputElement` |
| `SwitchIndicator` / `Switch.Indicator` | Checked/fallback track artwork | `HTMLSpanElement` |
| `SwitchThumbIndicator` / `Switch.ThumbIndicator` | Checked/fallback thumb artwork | `HTMLSpanElement` |
| `SwitchRootProvider` / `Switch.RootProvider` | Field supplied by `useSwitch` | `HTMLDivElement` |

Indicators are decorative. Indicator stays centered in the open half of the
track, opposite Thumb; ThumbIndicator stays centered and clipped inside Thumb.
Put links and actions in or beside Label, not in Control. Changing artwork must
not change the accessible setting name.

## API

Public types are `SwitchRootProps`, `SwitchFieldProps`,
`SwitchRootProviderProps`, `SwitchControlProps`, `SwitchThumbProps`,
`SwitchLabelProps`, `SwitchHiddenInputProps`, `SwitchIndicatorProps`,
`SwitchThumbIndicatorProps`, `SwitchPresentationProps`, `SwitchController` and
`UseSwitchProps`. `useSwitchContext` reads the nearest owner's state without
creating another owner.

| Prop | Values | Default |
| --- | --- | --- |
| `size` (`SwitchSize`) | responsive `xs`, `sm`, `md`, `lg` | `md` |
| `variant` (`SwitchVariant`) | responsive `solid`, `raised` | `solid` |
| `tone` (`SwitchTone`) | `neutral`, `accent`, `contrast`, `info`, `success`, `warning`, `danger` | `accent` |
| `labelPlacement` (`SwitchLabelPlacement`) | `start`, `end` on Field/RootProvider | `end` |

Field owns `checked`, `defaultChecked`, boolean `onCheckedChange`, `disabled`,
`readOnly`, `invalid`, `required`, `name`, `value`, `form` and validation.
RootProvider's `value` is its `SwitchController`; use `inputValue` for the
submitted checkbox value.

Use Field/RootProvider `ids={{ control, label, input }}` for custom part IDs
that must be associated in server-rendered HTML. Local part `id` overrides
synchronize automatic associations after mounting, including changes/removal.
Explicit Control `aria-labelledby` and Label `htmlFor` remain caller-owned.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Switch is Brick's finished binary immediate-setting control. Atom owns state,
keyboard, focus, validation, native forms, IDs and host composition. Brick owns
the track, thumb, indicators, responsive recipes, paint and motion.

Tone selects checked paint and does not imply validation. Invalid changes the
boundary separately. The visible track scales while the target remains at
least 44px. `solid` fills the track. `raised` separates a softened rail from a
solid colored, elevated thumb. Read-only remains visibly on or off while being
distinct from disabled. State is emitted through `data-size`, `data-variant`,
`data-tone`, `data-state`, `data-disabled`, `data-readonly` and `data-invalid`.

## Tokens and CSS hooks

Stable hooks include `.brick-switch`, `.brick-switch-control`,
`.brick-switch-field`, `.brick-switch-input`, `.brick-switch-thumb`,
`.brick-switch-label`, `.brick-switch-indicator` and
`.brick-switch-thumb-indicator`.

Public geometry and base paint tokens are `--brick-switch-target-size`,
`--brick-switch-track-inline-size`, `--brick-switch-track-block-size`,
`--brick-switch-thumb-size`, `--brick-switch-track-inset`,
`--brick-switch-track-background`, `--brick-switch-track-border`,
`--brick-switch-track-border-width`, `--brick-switch-track-shadow`,
`--brick-switch-thumb-background`, `--brick-switch-thumb-border`,
`--brick-switch-thumb-border-width`, `--brick-switch-thumb-shadow` and
`--brick-switch-label-gap`.

Public state tokens are `--brick-switch-checked-background`,
`--brick-switch-checked-border`, `--brick-switch-checked-thumb`,
`--brick-switch-checked-hover-background`,
`--brick-switch-checked-hover-border`,
`--brick-switch-checked-pressed-background`,
`--brick-switch-checked-pressed-border`,
`--brick-switch-raised-checked-rail`, `--brick-switch-hover-background`,
`--brick-switch-pressed-background`, `--brick-switch-focus-ring`,
`--brick-switch-invalid-border` and `--brick-switch-readonly-background`.

## Customization

Use size, variant and tone first, then public Switch tokens. Checked hover and
pressed defaults derive from `--brick-switch-checked-background`, so a
base-only brand override remains in-family. Set the explicit state tokens when
the brand system provides exact interaction colors.

```tsx
<Switch.Field
  defaultChecked
  style={{ "--brick-switch-checked-background": "#075985" }}
>
  <Switch.Control />
  <Switch.Label>Ocean status color</Switch.Label>
  <Switch.HiddenInput />
</Switch.Field>
```

## Responsive behavior

`size` and `variant` accept breakpoint objects and emit static `data-size-*`
and `data-variant-*` attributes. Sparse values inherit. Effective CSS direction
mirrors thumb travel, including a nested `dir` override. Logical field layout
supports wrapping labels without making the field fill its container.

## Accessibility

Provide a stable name through Label, `aria-label` or `aria-labelledby`. Space,
Enter and pointer activation preserve the boolean state contract. Visible
focus, forced colors and reduced motion are supported. Native required
validation focuses Control. Screen-reader, physical-device and actual browser
zoom checks remain human release gates.

## Composition, native props, and refs

Existing standalone composition remains compatible:

```tsx
<Switch.Root aria-label="Weekly reports" name="reports">
  <Switch.Thumb />
</Switch.Root>
```

Root remains a button, retains its `HTMLButtonElement` ref, boolean callback,
`render`/`asChild`, and automatic native proxy. It never becomes a wrapper
based on children. Root, Control, Thumb and indicators retain Atom host
composition. A non-button host must remain button-compatible.

Compound composition requires one explicit HiddenInput. Root already manages
its own proxy; never add HiddenInput to Root. Native input event handlers and
refs compose with Atom-owned checked, disabled, required and form metadata.

## Examples

```tsx
const preference = useSwitch({ defaultChecked: true });

<Switch.RootProvider value={preference} inputValue="enabled" name="updates">
  <Switch.Control>
    <Switch.Indicator fallback="Off">On</Switch.Indicator>
    <Switch.Thumb>
      <Switch.ThumbIndicator fallback="0">1</Switch.ThumbIndicator>
    </Switch.Thumb>
  </Switch.Control>
  <Switch.Label>Product updates</Switch.Label>
  <Switch.HiddenInput />
</Switch.RootProvider>
```

React Hook Form is optional. Use Controller, pass its boolean value/change
handler to Field, blur to Control, and ref/name to HiddenInput. Native reset,
external `form`, repeated names and disabled fieldsets remain Atom-owned.

## Evidence

- [Playground](../../../playground/src/components/switch/)
- [Unit tests](../../../test/components/switch/switch.test.tsx)
- [Type owner](../../../test/types/components/switch.test.ts)
- [Browser spec](../../../playground/tests/components/switch/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/switch/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/switch.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
