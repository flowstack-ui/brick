# Slider

Slider is Brick's styled numeric single-value and range input, backed by Atom 0.19.6. It works alone or as the sole control in `Field`; it is not a grouped choice collection and does not require `Fieldset`.

## When and where to use

Use Slider when people can choose an approximate numeric value or bounded range by pointer, touch, or keyboard.

## When not to use

Use Number Input when exact entry matters, Select for a small set of named choices, and Progress for read-only completion.

## Installation and imports

```tsx
import { Slider } from "@flowstack-ui/brick/slider";
import { Field } from "@flowstack-ui/brick/field";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<Field.Root>
  <Field.Label>Volume</Field.Label>
  <Slider.Root defaultValue={[40]} name="volume">
    <Slider.Track><Slider.Range /><Slider.Thumb /></Slider.Track>
  </Slider.Root>
  <Field.Description>Choose from 0 to 100.</Field.Description>
  <Field.Error>Choose a volume.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership

`Slider` exposes `Root`, `Track`, `Range`, `Thumb`, `Marker`, and `ValueLabel`. Root and Track forward `HTMLDivElement`; Range, Thumb, Marker, and ValueLabel forward `HTMLSpanElement`. Each range value requires one indexed Thumb. Marker belongs inside Track. ValueLabel is optional and belongs inside Thumb.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `solid`, `soft` | `solid` |

Root forwards Atom's controlled and uncontrolled values, `min`, `max`, `step`, `largeStep`, `orientation`, `dir`, form, and validation props. Marker requires numeric `value`; ValueLabel may render its `index`, `percent`, and `value`. Named exports are `Slider`, `SliderRoot`, `SliderTrack`, `SliderRange`, `SliderThumb`, `SliderMarker`, and `SliderValueLabel` with corresponding prop types.

## Visual recipes and states

Recipes change paint and geometry only. Atom state attributes drive disabled, read-only, invalid, orientation, and direction presentation. Slider does not show a number by default; author ValueLabel only when persistent thumb-adjacent output is useful.

## Tokens and CSS hooks

Stable classes are `.brick-slider` and its `__track`, `__range`, `__thumb`, `__marker`, and `__value-label` parts. Public variables include `--brick-slider-track-background`, `--brick-slider-track-border`, `--brick-slider-range-background`, `--brick-slider-thumb-background`, `--brick-slider-thumb-border`, `--brick-slider-thumb-size`, and `--brick-slider-marker-color`.

## Customization

Prefer recipes, then scope public variables: `<Slider.Root style={{ "--brick-slider-range-background": "var(--brick-color-accent-background)" }} />`.

## Responsive behavior

Brick preserves 44px thumb targets, logical RTL geometry, vertical layout, narrow containment, zoom, forced colors, and reduced motion. Endpoint markers remain inside Track. Horizontal ValueLabel receives dedicated space; for dense ranges or long values, use an external application-owned output to avoid collisions.

## Accessibility

Atom owns pointer and touch dragging, keyboard input, RTL and vertical axes, dependent range bounds, pointer cancellation, controlled state, hidden form inputs, reset, Field state inheritance, and ARIA. Each Thumb is a separately named slider. Disabled controls leave tab order; read-only controls remain focusable; markers and value labels are decorative. Use one Field for the complete Slider, or label standalone thumbs explicitly.

## Composition, native props, and refs

DOM parts preserve native props, ARIA, events, `className`, `style`, data attributes, slots, and exact refs. Root may receive `aria-label`, `invalid`, `disabled`, `readOnly`, and `required` standalone. A named single Slider submits one value; a named range submits all values through Atom's form contract.

## Examples

```tsx
<Slider.Root defaultValue={[20, 75]} min={0} max={100} aria-label="Price range">
  <Slider.Track>
    <Slider.Range />
    <Slider.Marker value={0}>0</Slider.Marker>
    <Slider.Marker value={100}>100</Slider.Marker>
    <Slider.Thumb /><Slider.Thumb />
  </Slider.Track>
</Slider.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/slider/)
- [Unit tests](../../../test/components/slider/)
- [Type tests](../../../test/types/components/slider.test.ts)
- [Browser behavior](../../../playground/tests/components/slider/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/slider/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/slider.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
