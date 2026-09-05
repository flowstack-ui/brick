# Color Picker

Color Picker is the finished Atom-backed editor for one color. It supports popup and inline layouts, area and channel editing, alpha, RGB/HSL/HSB formats, named presets, native form submission, the browser color chooser, and the platform EyeDropper when available.

## When and where to use

Use Color Picker in settings, theme editors, creative tools, and forms where users must inspect or change a color. Use Color Swatch when the interface only previews a value.

## When not to use

Color Picker does not provide gradients, automatic color names, contrast scoring, palette persistence, or a color wheel. Those are application-owned specialist features that may compose around this control.

## Installation and imports

```tsx
import { ColorPicker } from "@flowstack-ui/brick/color-picker";
import "@flowstack-ui/brick/styles.css";
```

For modular styles, load the foundation once and this component stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/color-picker.css";
```

Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<ColorPicker.Root defaultValue="rgba(91, 91, 214, 0.75)" name="accent">
  <ColorPicker.Label>Accent color</ColorPicker.Label>
  <ColorPicker.Control>
    <ColorPicker.Trigger aria-label="Open accent color editor">
      <ColorPicker.ValueSwatch />
    </ColorPicker.Trigger>
    <ColorPicker.Input />
  </ColorPicker.Control>
  <ColorPicker.Positioner>
    <ColorPicker.Content aria-label="Accent color editor">
      <ColorPicker.Area>
        <ColorPicker.AreaBackground />
        <ColorPicker.AreaThumb />
      </ColorPicker.Area>
      <ColorPicker.ChannelSlider channel="hue">
        <ColorPicker.ChannelSliderLabel>Hue</ColorPicker.ChannelSliderLabel>
        <ColorPicker.ChannelSliderTrack />
        <ColorPicker.ChannelSliderThumb />
      </ColorPicker.ChannelSlider>
    </ColorPicker.Content>
  </ColorPicker.Positioner>
  <ColorPicker.HiddenInput />
</ColorPicker.Root>
```

## Anatomy and DOM ownership

Brick directly styles the matching public Atom 0.26.1 parts. Atom owns parsing, format conversion, pointer and keyboard behavior, focus, popup positioning and dismissal, selected state, Field inheritance, form reset, and platform-capability detection. Brick owns finished sizes, surfaces, spacing, focus visuals, and responsive containment.

The namespace contains `Root`, `Context`, `Label`, `Control`, `Input`, `ChannelInput`, `NativeInput`, `HiddenInput`, `Trigger`, `Positioner`, `Content`, `ValueText`, `ValueSwatch`, `Area`, `AreaBackground`, `AreaThumb`, `ChannelSlider`, `ChannelSliderLabel`, `ChannelSliderTrack`, `ChannelSliderThumb`, `ChannelSliderValueText`, `TransparencyGrid`, `EyeDropperTrigger`, `SwatchGroup`, `SwatchTrigger`, `Swatch`, `SwatchIndicator`, `FormatSelect`, `FormatTrigger`, and `View`.

## API

| Prop or part | Values or important props | Default or purpose |
| --- | --- | --- |
| `size` | `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` | `md` |
| `variant` | `outline`, `soft` | `outline` |
| `Root` | Atom root props plus the Brick recipes | Supports popup or `inline` |
| `Control.layout` | `separate`, `integrated` | `separate`; `integrated` paints one shared field border |
| `Area` | `xChannel`, `yChannel` | Two-dimensional color editing |
| `ChannelSlider` | `channel` | Hue, alpha, and supported format channels |
| `ChannelInput` | `channel` | Numeric channel editing in the active format |
| `FormatSelect` / `FormatTrigger` | native select/button props | Switch between RGBA, HSLA, and HSBA views |
| `View` | `format` | Shows children only for its active format |
| `ValueSwatch.shape` | `sharp`, `rounded`, `circle` | `rounded` |
| `SwatchTrigger` | required `value`; `frame` is `none` or `outline`; `shape` is `sharp`, `rounded`, or `circle` | Atom-owned preset selection with an outline frame by default |
| `Swatch.shape` | `sharp`, `rounded`, `circle` | Inherits the trigger frame recipe when omitted |
| `SwatchIndicator` | optional `value`, `respectAlpha` | Inherits from a Swatch or ValueSwatch parent |
| `NativeInput` | native input props | Browser or operating-system color chooser |
| `EyeDropperTrigger` | native button props | Progressive enhancement; disabled when unsupported |
| `HiddenInput` | native hidden-input props | Root name, form, and current value |

`onValueChange` receives Atom details including `value` and `valueAsString`. The value may be hexadecimal, RGB(A), HSL(A), or HSB(A); do not assume an opaque hex-only contract.

Named part exports are `ColorPickerRoot`, `ColorPickerContext`, `ColorPickerLabel`, `ColorPickerControl`, `ColorPickerInput`, `ColorPickerChannelInput`, `ColorPickerNativeInput`, `ColorPickerHiddenInput`, `ColorPickerTrigger`, `ColorPickerPositioner`, `ColorPickerContent`, `ColorPickerValueText`, `ColorPickerValueSwatch`, `ColorPickerArea`, `ColorPickerAreaBackground`, `ColorPickerAreaThumb`, `ColorPickerChannelSlider`, `ColorPickerChannelSliderLabel`, `ColorPickerChannelSliderTrack`, `ColorPickerChannelSliderThumb`, `ColorPickerChannelSliderValueText`, `ColorPickerTransparencyGrid`, `ColorPickerEyeDropperTrigger`, `ColorPickerSwatchGroup`, `ColorPickerSwatchTrigger`, `ColorPickerSwatch`, `ColorPickerSwatchIndicator`, `ColorPickerFormatSelect`, `ColorPickerFormatTrigger`, and `ColorPickerView`.

Their public prop types are `ColorPickerRootProps`, `ColorPickerContextProps`, `ColorPickerLabelProps`, `ColorPickerControlProps`, `ColorPickerInputProps`, `ColorPickerChannelInputProps`, `ColorPickerNativeInputProps`, `ColorPickerHiddenInputProps`, `ColorPickerTriggerProps`, `ColorPickerPositionerProps`, `ColorPickerContentProps`, `ColorPickerValueTextProps`, `ColorPickerValueSwatchProps`, `ColorPickerAreaProps`, `ColorPickerAreaBackgroundProps`, `ColorPickerAreaThumbProps`, `ColorPickerChannelSliderProps`, `ColorPickerChannelSliderLabelProps`, `ColorPickerChannelSliderTrackProps`, `ColorPickerChannelSliderThumbProps`, `ColorPickerChannelSliderValueTextProps`, `ColorPickerTransparencyGridProps`, `ColorPickerEyeDropperTriggerProps`, `ColorPickerSwatchGroupProps`, `ColorPickerSwatchTriggerProps`, `ColorPickerSwatchProps`, `ColorPickerSwatchIndicatorProps`, `ColorPickerFormatSelectProps`, `ColorPickerFormatTriggerProps`, and `ColorPickerViewProps`. Recipe types are `ColorPickerSize`, `ColorPickerVariant`, `ColorPickerControlLayout`, `ColorPickerSwatchFrame`, and `ColorPickerSwatchShape`; the frozen namespace is `ColorPicker`.

### Integrated input composition

`Control layout="integrated"` is the finished one-border field recipe. Compose the
parts the task needs inside it; no application CSS is required:

```tsx
<ColorPicker.Root defaultValue="#e5484d" inline size="xs">
  <ColorPicker.Label>Color</ColorPicker.Label>
  <ColorPicker.Control layout="integrated">
    <ColorPicker.ValueSwatch shape="rounded" />
    <ColorPicker.Input />
    <ColorPicker.EyeDropperTrigger aria-label="Pick color from screen" />
  </ColorPicker.Control>
</ColorPicker.Root>
```

The EyeDropper action uses the browser's native EyeDropper API and is disabled
when that API is unavailable. It does not open Brick's popup editor. Use
`Trigger`, `Positioner`, and `Content` when the field must always open the Brick
editor; the integrated Control can contain that Trigger too. In an integrated
Control, Trigger and EyeDropperTrigger use the finished ghost-action treatment
while the shared Control keeps the one field boundary.

## Visual recipes and states

Popup editors use `Trigger`, `Positioner`, and elevated `Content`. Inline editors set `inline` on Root and render Content directly; direct inline Content removes popup border, background, shadow, and padding so the owning application surface controls containment. Sizes are `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`; variants are `outline` and `soft`. The default editor is 16rem wide, while `2xs` and `xs` use a compact 15rem popup for dense toolbars and creative controls. Choose a larger recipe when the surrounding form or touch context needs it. A Trigger whose only child is ValueSwatch is automatically square; a Trigger containing ValueText or other authored content retains content-driven width.

`ValueSwatch` is the compact current-value preview used inside finished fields
and triggers. Its size follows `--brick-color-picker-value-swatch-size`, while
the larger selectable preset swatches continue to follow
`--brick-color-picker-swatch-size`.

`ValueSwatch` and `Swatch` paint an appearance-aware surface checker below the
represented color, so translucent swatches remain integrated with light and
dark application surfaces. The alpha channel's `TransparencyGrid` instead uses
a stable white and light-neutral canvas so its zero-opacity end stays visibly
neutral in every appearance. Channel-slider
thumbs are the top visual layer and remain fully visible at middle and endpoint
values. The area and channel tracks use borderless color planes; each channel
track and its transparency check inherit one subtle semantic radius. Thumbs keep
a white contrast ring and the small Theme shadow without an additional hard
outline. The alpha thumb always previews the selected color opaquely; its
position communicates the current alpha, so the thumb does not become a split
checker-and-surface window at zero opacity.

For alpha, render `TransparencyGrid` as a direct sibling immediately before
`ChannelSliderTrack`. The checker and channel gradient then occupy the same
grid row, with the stable neutral checker below the translucent gradient:

```tsx
<ColorPicker.ChannelSlider channel="alpha">
  <ColorPicker.ChannelSliderLabel>Opacity</ColorPicker.ChannelSliderLabel>
  <ColorPicker.TransparencyGrid size="8px" />
  <ColorPicker.ChannelSliderTrack />
  <ColorPicker.ChannelSliderThumb />
</ColorPicker.ChannelSlider>
```

Put each `Swatch` inside a named `SwatchTrigger`, then put `SwatchIndicator` inside the Swatch. This produces a visible checkmark in addition to color and exposes Atom's checked state. Choose `shape="sharp|rounded|circle"` on the trigger so its interactive frame and swatch share one silhouette. Use `frame="none"` for a visually frameless preset while retaining the accessible button and focus cue. Disabled prevents opening and mutation. Read-only blocks mutating popup controls; use an inline composition when the value must remain visually inspectable. Invalid supplies the finished danger boundary.

Preset swatches are optional popup content. Include them when the product has a
small curated palette; omit them for a compact general-purpose editor. Saved
palettes, recent colors, and persistence remain application-owned compositions
and are not required by Color Picker.

## Tokens and CSS hooks

Every part exposes `.brick-color-picker__*` plus its `data-slot`. Root exposes `data-size`, `data-variant`, and Atom state attributes such as `data-disabled`, `data-readonly`, `data-invalid`, and open state. Control exposes `data-layout`; ValueSwatch and swatch parts expose `data-shape`; SwatchTrigger exposes `data-frame` plus Atom `data-state="checked|unchecked"`.

Public properties are `--brick-color-picker-control-size`, `--brick-color-picker-gap`, `--brick-color-picker-background`, `--brick-color-picker-border-color`, `--brick-color-picker-focus-ring`, `--brick-color-picker-content-background`, `--brick-color-picker-content-border-color`, `--brick-color-picker-content-radius`, `--brick-color-picker-content-shadow`, `--brick-color-picker-area-block-size`, `--brick-color-picker-checker-size`, `--brick-color-picker-checker-base`, `--brick-color-picker-checker-contrast`, `--brick-color-picker-transparency-grid-base`, `--brick-color-picker-transparency-grid-contrast`, `--brick-color-picker-indicator-color`, `--brick-color-picker-indicator-shadow`, `--brick-color-picker-input-width`, `--brick-color-picker-slider-block-size`, `--brick-color-picker-swatch-gap`, `--brick-color-picker-swatch-radius`, `--brick-color-picker-swatch-size`, `--brick-color-picker-value-swatch-size`, and `--brick-color-picker-thumb-size`.

## Customization

Prefer Root `size` and `variant`, then public custom properties. Use the stable part classes and slots only when the recipe variables cannot express the intended finish. Keep area, hue, alpha, selection, focus, invalid, disabled, and forced-color states distinguishable.

## Responsive behavior

Controls use logical dimensions and may wrap. Content is viewport-constrained, and channel rows collapse at narrow widths. Root direction drives logical layout and Atom keyboard behavior. The owning Stack, Grid, Block, or page owns placement around the picker.

## Accessibility

Give the editable or native input a clear name. Name every preset. Never communicate selection only through color; use `SwatchIndicator` or equivalent visible text. Keep EyeDropper and NativeInput optional so every user retains a normal editing path. When EyeDropper is unavailable, keep the Brick area/channel editor or NativeInput available instead of simulating operating-system screen sampling. Atom owns Escape, focus restoration, keyboard and pointer behavior, and machine semantics; Brick preserves visible focus and forced-color boundaries.

## Composition, native props, and refs

Put `name` on Root and render exactly one `HiddenInput` for form submission and reset. Field owns descriptions and error messages. Native attributes and refs pass through each matching Atom-backed part. Do not reproduce floating placement, color conversion, hidden form state, or focus management in application code.

## Examples

The playground covers the full composition catalog: basic popup, inline,
seven sizes, two variants, integrated input-only, swatch-only, trigger-only,
trigger in an integrated input row, fit-content trigger, outlined square,
rounded, and circle swatches, frameless swatches, controlled value, change-end handling,
context access, close-on-select, format inputs, format-aware channel sliders,
saved swatches, swatch-plus-input, swatch-plus-trigger, form submission/reset,
Dialog containment, native chooser, EyeDropper, disabled, read-only, invalid,
light/dark, customization, narrow layout, and RTL. These are compositions of
the released public anatomy; saved palettes and form-library adapters remain
application state rather than new Color Picker behavior.

An inline format editor can expose the same color through multiple views:

```tsx
<ColorPicker.Root inline defaultValue="hsla(240, 62%, 58%, 0.75)">
  <ColorPicker.Content>
    <ColorPicker.FormatSelect aria-label="Color format" />
    <ColorPicker.View format="rgba">
      <ColorPicker.ChannelInput channel="red" aria-label="Red" />
      <ColorPicker.ChannelInput channel="green" aria-label="Green" />
      <ColorPicker.ChannelInput channel="blue" aria-label="Blue" />
      <ColorPicker.ChannelInput channel="alpha" aria-label="Alpha" />
    </ColorPicker.View>
    <ColorPicker.SwatchGroup aria-label="Presets">
      <ColorPicker.SwatchTrigger value="#5b5bd6" aria-label="Iris">
        <ColorPicker.Swatch value="#5b5bd6">
          <ColorPicker.SwatchIndicator />
        </ColorPicker.Swatch>
      </ColorPicker.SwatchTrigger>
    </ColorPicker.SwatchGroup>
  </ColorPicker.Content>
</ColorPicker.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/color-picker/)
- [Unit tests](../../../test/components/color-picker/)
- [Type tests](../../../test/types/components/color-picker.test.ts)
- [Browser behavior](../../../playground/tests/components/color-picker/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/color-picker/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/color-picker.md)

## Changelog

See the [Color Picker changelog](CHANGELOG.md).
