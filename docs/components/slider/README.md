# Slider

Slider is Brick's styled numeric single-value and range input, backed by the installed exact Atom dependency. It works alone or as the sole control in `Field`; it is not a grouped choice collection and does not require `Fieldset`.

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

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/slider.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


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

`Slider` exposes `Root`, `Track`, `Range`, `Thumb`, `Marker`, and `ValueLabel`. Root and Track forward `HTMLDivElement`; Range, Thumb, Marker, and ValueLabel forward `HTMLSpanElement`. Each range value requires one indexed Thumb. Marker belongs inside Track. Thumb accepts decorative Icon or other authored content. ValueLabel is optional and belongs inside Thumb without inheriting the decorative thumb-content sizing.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `solid`, `soft` | `solid` |
| `frame` | `none`, `outline` | `none` |

Root forwards Atom's controlled and uncontrolled values, `min`, `max`, `step`, `largeStep`, `orientation`, `dir`, form, and validation props. Marker requires numeric `value`; ValueLabel may render its `index`, `percent`, and `value`.

Named exports are `Slider`, `SliderRoot`, `SliderTrack`, `SliderRange`,
`SliderThumb`, `SliderMarker`, and `SliderValueLabel`. Public types are
`SliderRootProps`, `SliderTrackProps`, `SliderRangeProps`, `SliderThumbProps`,
`SliderMarkerProps`, `SliderValueLabelProps`, `SliderValueLabelDetails`,
`SliderSize`, `SliderVariant`, and `SliderFrame`.

## Visual recipes and states

Recipes change paint and geometry only. Visible Thumb/Track sizes are 16/6px,
20/8px, and 24/10px for `sm`, `md`, and `lg`. The neutral Track uses a
translucent emphasized boundary role; the outlined Thumb uses the canvas
surface without extra elevation. Atom state attributes drive disabled,
read-only, invalid, orientation, and direction presentation. Slider does not
show a number by default; author ValueLabel only when persistent
thumb-adjacent output is useful.
Use `frame="outline"` when the slider must align with adjacent outlined inputs
inside a compact property row; the frame owns the control boundary while the
Track remains the interactive value visualization.

## Tokens and CSS hooks

Stable classes are `.brick-slider` and its `__track`, `__range`, `__thumb`, `__marker`, and `__value-label` parts. Root exposes `data-frame`, `data-size`, `data-variant`, and `data-slot`; Marker exposes `data-edge`, `data-orientation`, `data-selected`, `data-value`, and `data-slot`.

Public variables are `--brick-slider-track-background`,
`--brick-slider-track-border`, `--brick-slider-track-border-width`,
`--brick-slider-track-size`,
`--brick-slider-track-length`, `--brick-slider-track-inset`,
`--brick-slider-range-background`,
`--brick-slider-thumb-background`, `--brick-slider-thumb-border`,
`--brick-slider-thumb-foreground`, `--brick-slider-thumb-shadow`, `--brick-slider-thumb-size`,
`--brick-slider-marker-color`, `--brick-slider-marker-selected-color`,
`--brick-slider-marker-border`,
`--brick-slider-marker-size`,
`--brick-slider-value-label-background`, and
`--brick-slider-value-label-foreground`.

## Customization

Prefer recipes, then scope public variables: `<Slider.Root style={{ "--brick-slider-range-background": "var(--brick-color-accent-background)" }} />`.
`--brick-slider-track-inset` defaults to half the complete Thumb target. Set
it to `0px` only when the surrounding composition provides enough space for
the endpoint target and focus ring to extend beyond the visual Track.

## Responsive behavior

Brick preserves 44px thumb targets, logical RTL geometry, vertical layout,
narrow containment, zoom, forced colors, and reduced motion. Horizontal
and vertical Tracks reserve half a target at each endpoint so the complete
Thumb hit area and focus treatment remain inside the Slider boundary, even
when a surrounding disclosure or scrolling region clips overflow. Horizontal
endpoint marker dots remain visibly inset within the rounded Track caps while
optional endpoint labels remain contained. The neutral Track keeps a clear
appearance-aware contrast from its surrounding surface. Unselected dots use
the primary foreground while selected dots use the active canvas surface with
a subtle derived border. Every dot is centered on its Track axis. Both adapt to the active
appearance, accent, and solid or soft recipe. Horizontal ValueLabel receives
dedicated space; for dense ranges or long values, use an external
application-owned output to avoid collisions.

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

Authored thumb artwork composes directly alongside an optional value label:

```tsx
<Slider.Root aria-label="Seats" defaultValue={[40]} size="lg">
  <Slider.Track>
    <Slider.Range />
    <Slider.Thumb>
      <Icon size="inherit"><ChevronsLeftRight aria-hidden="true" /></Icon>
    </Slider.Thumb>
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
