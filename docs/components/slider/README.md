# Slider

Containment uses the visible thumb, independently of its expanded 44px pointer
area. Keep pointer/focus clearance around the rail; do not add track padding or
set `thumbSize` to the hit-target size to compensate. Responsive visual sizes
are measured automatically. Scalar boundary fills reach the rail caps; ranges
join thumb centers. Primary track activation focuses the chosen thumb without
scrolling; secondary mouse buttons do not edit the value.

Slider is Brick's styled approximate numeric input for one value or an ordered range. Atom owns state, interaction, coordinates, focus, accessibility and forms; Brick owns recipes and convenience composition.

## When and where to use

Use Slider when direct manipulation of an approximate numeric value or bounded range is more useful than exact entry.

## When not to use

Use Number Input for exact entry, Select or Radio Group for a small named choice set, and Progress for read-only completion.

## Installation and imports

```tsx
import { Slider, useSlider } from "@flowstack-ui/brick/slider";
import "@flowstack-ui/brick/styles.css";
```

For route-aware modular CSS, replace the complete stylesheet with both imports:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/slider.css";
```

Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<Slider.Root defaultValue={40}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track><Slider.Range /></Slider.Track>
    <Slider.Thumb />
  </Slider.Control>
</Slider.Root>
```

## Anatomy and DOM ownership

| Part | Default element and responsibility | Ref |
| --- | --- | --- |
| `Root` / `RootProvider` | Shared behavior, state, direction and form owner | `HTMLElement` |
| `Control` | Pointer-coordinate and interaction region | `HTMLDivElement` |
| `Track` | Visual track; legacy interaction owner when Control is absent | `HTMLDivElement` |
| `Range` | Decorative selected fill | `HTMLSpanElement` |
| `Thumb` | Focusable slider for one indexed value | `HTMLSpanElement` |
| `Label` | Shared visible naming source | `HTMLLabelElement` |
| `ValueText` | External ordinary value output | `HTMLOutputElement` |
| `MarkerGroup`, `Marker`, `MarkerIndicator`, `MarkerLabel` | Decorative scale positioning, artwork and text | `HTMLDivElement` / `HTMLSpanElement` |
| `ValueLabel` | Persistent bubble inside one Thumb | `HTMLSpanElement` |
| `DraggingIndicator` | Active pointer-drag bubble | `HTMLSpanElement` |
| `HiddenInput` | Explicit-mode native form proxy | `HTMLInputElement` |

`Thumbs` and `Marks` are Brick shortcuts over the same parts. Legacy `Root > Track > Range + Thumb` and simple Marker text remain supported. Do not put both Control and Track in charge of the same pointer geometry.

## API

Root accepts scalar or array `value`/`defaultValue`, `onValueChange`, `onValueCommit`, `min`, `max`, `step`, `largeStep`, `minStepsBetweenThumbs`, availability/validation props, `orientation`, `dir`, `origin`, `thumbAlignment`, `thumbSize`, `thumbCollisionBehavior`, `name`, `form`, `hiddenInputMode`, naming props and `ariaValueText`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | responsive `sm`, `md`, `lg` | `md` |
| `variant` | responsive `outline`, `solid`, `soft` | `outline` |
| `tone` | `neutral`, `accent`, `contrast` | `accent` |
| `frame` | `none`, `outline`, `panel`, `inline` | `none` |
| `origin` | `start`, `center`, `end` | `start` |
| `thumbAlignment` | `contain`, `center` | `contain` |
| `thumbCollisionBehavior` | `none`, `push`, `swap` | `none` |
| `hiddenInputMode` | `automatic`, `explicit` | `automatic` |

`useSlider` returns the same `SliderController` used by Root. Give it to RootProvider and use Context or `useSliderContext` to read values, IDs, focus/drag indices and part helpers without creating another owner.

Named component exports are `SliderRoot`, `SliderRootProvider`, `SliderControl`, `SliderTrack`, `SliderRange`, `SliderThumb`, `SliderThumbs`, `SliderLabel`, `SliderValueText`, `SliderMarkerGroup`, `SliderMarker`, `SliderMarkerIndicator`, `SliderMarkerLabel`, `SliderMarks`, `SliderValueLabel`, `SliderDraggingIndicator`, and `SliderHiddenInput`.

Public prop and helper types are `SliderRootProps`, `SliderRootProviderProps`, `SliderControlProps`, `SliderTrackProps`, `SliderRangeProps`, `SliderThumbProps`, `SliderThumbsProps`, `SliderLabelProps`, `SliderValueTextProps`, `SliderMarkerGroupProps`, `SliderMarkerProps`, `SliderMarksProps`, `SliderMark`, `SliderValueLabelProps`, `SliderValueLabelDetails`, `SliderDraggingIndicatorProps`, `SliderHiddenInputProps`, `UseSliderProps`, `SliderValue`, `SliderSize`, `SliderVariant`, `SliderTone`, `SliderFrame`, `SliderOrigin`, `SliderThumbAlignment`, `SliderThumbSize`, `SliderCollisionBehavior`, and `SliderHiddenInputMode`.

## Visual recipes and states

Disabled controls preserve their recipe and use one 50% fade with a not-allowed cursor. Forced colors restores full opacity and uses system disabled colors.

The visible sm/md/lg thumbs are 16/20/24px, tracks are 6/8/10px, and the target remains at least 44px. Outline uses a canvas thumb with colored border; solid uses a filled thumb; soft reduces emphasis. Explicit `variant="solid"` now has filled-thumb semantics. Choose outline for the former appearance. Tone selects paint while invalid remains independent state. Arbitrary Chakra-style color palettes are intentionally outside this API.

Brick presentation emits `data-size`, `data-variant`, `data-tone`, `data-frame`, `data-slot`, and marker `data-edge`; Atom emits orientation, value, origin, alignment, collision, selected, focus, dragging, availability and validation state on the appropriate parts.

## Tokens and CSS hooks

Stable hooks include `.brick-slider`, `.brick-slider__control`, `__track`, `__range`, `__thumb`, `__label`, `__value-text`, `__marker-group`, `__marker`, `__marker-indicator`, `__marker-label`, `__value-label`, `__dragging-indicator` and `__hidden-input`.

Public variables are `--brick-slider-track-size`, `--brick-slider-thumb-size`, `--brick-slider-hit-size`, `--brick-slider-track-color`, `--brick-slider-range-color`, `--brick-slider-thumb-color`, `--brick-slider-thumb-border-color` and `--brick-slider-marker-color`.

## Customization

Prefer recipes, then scope public variables on Root. The old `--brick-slider-track-inset` workaround is retired because Atom owns target containment; applying it again would double-correct endpoints.

```tsx
<Slider.Root
  defaultValue={60}
  style={{ "--brick-slider-range-color": "var(--brick-color-accent-solid)" }}
>
  <Slider.Label>Mix</Slider.Label>
  <Slider.Control><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb /></Slider.Control>
</Slider.Root>
```

## Responsive behavior

Size and variant accept sparse breakpoint objects and emit static data attributes. Contain alignment keeps the visible thumb inside the rail, not its expanded 44px pointer area or focus ring; leave unclipped clearance for both. Center alignment additionally permits visible endpoint overhang. Do not compensate with track padding or a 44px `thumbSize`. Local `dir` controls horizontal pointer, range, thumb and marker geometry; vertical composition also respects logical inline placement. Responsive visual thumb changes are remeasured. Hidden and zero-sized controls recover when revealed or resized.

## Accessibility

Explicit Thumb `aria-label` or `aria-labelledby` wins over Root naming; Root naming wins over Slider.Label or Field fallback. Give range thumbs distinct names. `ariaValueText` formats assistive output; ValueText is not a live region and markers never name the control. Arrow keys use `step`; Shift+Arrow and Page Up/Down use `largeStep`; Home/End use bounds. Visible focus, invalid+focus, forced colors and reduced motion are supported.

## Composition, native props, and refs

Every value needs one indexed Thumb or `Thumbs`. Origin changes scalar fill only; arrays fill between their extreme values. None constrains collisions, push propagates neighbors and swap transfers active pointer identity; keyboard movement remains constrained. Cancellation restores pointer-start values without commit, while lost capture commits latest values once.

Automatic form mode emits one hidden input per named thumb in index order. Explicit mode requires one authored HiddenInput per submitted thumb. Disabled values are omitted; reset restores uncontrolled defaults; `form` supports external ownership. React Hook Form Controller is optional and should own the scalar/array value and explicit input ref.

## Examples

```tsx
<Slider.Root defaultValue={[20, 80]} minStepsBetweenThumbs={10}>
  <Slider.Label>Price range</Slider.Label>
  <Slider.ValueText>{({ values }) => `$${values[0]}–$${values[1]}`}</Slider.ValueText>
  <Slider.Control>
    <Slider.Track><Slider.Range /></Slider.Track>
    <Slider.Marks marks={[0, { value: 50, label: "Mid" }, 100]} />
    <Slider.Thumb aria-label="Minimum price" index={0} />
    <Slider.Thumb aria-label="Maximum price" index={1} />
    <Slider.DraggingIndicator />
  </Slider.Control>
</Slider.Root>
```

Use external ValueText for dense ranges or long localized values. ValueLabel stays persistent; DraggingIndicator is drag-only. Automatic value-label collision avoidance is not promised.

## Evidence

- [Playground](../../../playground/src/components/slider/)
- [Unit tests](../../../test/components/slider/slider.test.tsx)
- [Type owner](../../../test/types/components/slider.test.ts)
- [Browser spec](../../../playground/tests/components/slider/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/slider/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/slider.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
