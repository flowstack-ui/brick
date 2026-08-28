# Color Picker

Color Picker provides a finished Atom-backed control for editing, choosing, and submitting one opaque hexadecimal color. It supports editable text, the browser-native chooser, named presets, and optional floating content without application CSS.

## When and where to use

Use Color Picker in settings, editors, and forms that need one `#rrggbb` value. Use Color Swatch when the interface only previews a color.

## When not to use

Do not use this release for alpha, gradients, area picking, channels, eyedroppers, format conversion, contrast analysis, or persistent palette management. Those behaviors require an Atom-first capability or application specialist.

## Installation and imports

```tsx
import { ColorPicker } from "@flowstack-ui/brick/color-picker";
import { ColorSwatch } from "@flowstack-ui/brick/color-swatch";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS, load the foundation and picker stylesheet. The picker stylesheet includes its Color Swatch dependency:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/color-picker.css";
```

## Quick start

```tsx
<ColorPicker.Root defaultValue="#5b5bd6" name="accent">
  <ColorPicker.Label>Accent color</ColorPicker.Label>
  <ColorPicker.Control>
    <ColorPicker.Input />
    <ColorPicker.NativeInput />
  </ColorPicker.Control>
  <ColorPicker.HiddenInput />
</ColorPicker.Root>
```

## Anatomy and DOM ownership

Root, Label, Control, Input, NativeInput, HiddenInput, Trigger, Content, and SwatchTrigger directly adapt the same public Atom Color Picker parts. Atom owns normalized state, native form semantics, Popover focus and dismissal, preset selection, and Field inheritance. Brick adds classes and visual recipes only.

## API

| Part | Important props | Default |
| --- | --- | --- |
| `Root` | Atom props; `size: sm | md | lg`; `variant: outline | soft` | `md`, `outline` |
| `Label` | native label props | - |
| `Input` | editable text input props | - |
| `NativeInput` | native color input props | accessible name: Open native color chooser |
| `Trigger` / `Content` | Atom Popover props | `sideOffset: 8` on Content |
| `SwatchTrigger` | required hexadecimal `value` | - |
| `HiddenInput` | native hidden input props | Root name/form/value |
| `size` | `ColorPickerSize`: `sm`, `md`, `lg` | `md` |
| `variant` | `ColorPickerVariant`: `outline`, `soft` | `outline` |

Root keeps Atom's `value`, `defaultValue`, `onValueChange`, `open`, `defaultOpen`, `onOpenChange`, disabled, read-only, invalid, required, `name`, `form`, and `inputId` contracts. Valid `#rgb` values normalize to lowercase `#rrggbb`. Native props, class names, styles, events, and refs pass through each part.

Public exports are `ColorPicker`, `ColorPickerRoot`, `ColorPickerLabel`, `ColorPickerControl`, `ColorPickerInput`, `ColorPickerNativeInput`, `ColorPickerHiddenInput`, `ColorPickerTrigger`, `ColorPickerContent`, `ColorPickerSwatchTrigger`, `ColorPickerRootProps`, `ColorPickerLabelProps`, `ColorPickerControlProps`, `ColorPickerInputProps`, `ColorPickerNativeInputProps`, `ColorPickerHiddenInputProps`, `ColorPickerTriggerProps`, `ColorPickerContentProps`, `ColorPickerSwatchTriggerProps`, `ColorPickerSize`, and `ColorPickerVariant`.

### Floating presets

```tsx
<ColorPicker.Root defaultValue="#5b5bd6" name="accent">
  <ColorPicker.Label>Accent color</ColorPicker.Label>
  <ColorPicker.Control>
    <ColorPicker.Input />
    <ColorPicker.Trigger aria-label="Choose an accent preset">
      <ColorSwatch.Root value="#5b5bd6" />
    </ColorPicker.Trigger>
  </ColorPicker.Control>
  <ColorPicker.Content aria-label="Accent presets">
    <ColorPicker.SwatchTrigger aria-label="Use indigo" value="#5b5bd6">
      <ColorSwatch.Root value="#5b5bd6" /> Indigo
    </ColorPicker.SwatchTrigger>
    <ColorPicker.SwatchTrigger aria-label="Use coral" value="#e5484d">
      <ColorSwatch.Root value="#e5484d" /> Coral
    </ColorPicker.SwatchTrigger>
  </ColorPicker.Content>
  <ColorPicker.HiddenInput />
</ColorPicker.Root>
```

## Visual recipes and states

Small, medium, and large controls use the shared 2rem, 2.5rem, and 3rem control geometry. Outline stays transparent with a strong border; Soft uses a subtle surface. Invalid uses danger treatment. Disabled blocks all interaction; read-only remains inspectable and can open its content while mutation stays blocked.

## Tokens and CSS hooks

Stable hooks are `.brick-color-picker` and its `__label`, `__control`, `__input`, `__native-input`, `__trigger`, `__content`, and `__swatch-trigger` parts, plus Atom slots/state attributes and Root `data-size`/`data-variant`.

Public variables are `--brick-color-picker-control-size`, `--brick-color-picker-gap`, `--brick-color-picker-background`, `--brick-color-picker-border-color`, `--brick-color-picker-focus-ring`, `--brick-color-picker-content-background`, `--brick-color-picker-content-border-color`, `--brick-color-picker-content-radius`, and `--brick-color-picker-content-shadow`.

## Customization

Prefer Root `size` and `variant` before overriding public variables. Use Color Swatch for every standard preview. Custom part classes may refine a product composition but must preserve Atom's slots, native names, selected state, focus, and viewport containment.

## Responsive behavior

The component uses logical dimensions and content-sized controls. The control can wrap when the owning layout permits. Floating content is constrained to the dynamic viewport; the application or Block owns page-level responsive placement.

## Accessibility

Use Label or explicit names for both editable and native inputs. Presets are native buttons with `aria-pressed`; give each a meaningful name and do not communicate selection through color alone. Atom owns Escape, focus restoration, disabled/read-only mutation guards, and form reset. Brick preserves visible focus and forced-colors boundaries.

## Composition, native props, and refs

Put `name` on Root and render one HiddenInput. Do not also name Input or NativeInput. Root submits one normalized value and uncontrolled form reset restores the authored default.

Every part passes its supported native attributes, class, style, events, and ref to the released Atom element. Read-only content remains inspectable; disabled content cannot open. Compose with Field when description and error relationships are required, and keep page layout in Stack, Grid, or a higher layer.

## Examples

An inline picker omits Trigger and Content. A floating preset picker composes them as shown above. A controlled application passes `value` and `onValueChange`; it must update the authored value after accepting Atom's normalized callback.

## Evidence

- [Playground source](../../../playground/src/components/color-picker/)
- [Unit tests](../../../test/components/color-picker/)
- [Type tests](../../../test/types/components/color-picker.test.ts)
- [Browser behavior](../../../playground/tests/components/color-picker/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/color-picker/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/color-picker.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
