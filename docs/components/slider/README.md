# Slider

Slider is Brick's styled numeric single-value and range input, backed by Atom 0.19.3. It works alone or as the sole control in `Field`; use `Field.Label`, `Field.Description`, and `Field.Error` for form composition. Slider is not a grouped choice collection and does not require `Fieldset`.

```tsx
import { Field, Slider } from "@flowstack-ui/brick";

<Field.Root>
  <Field.Label>Volume</Field.Label>
  <Slider.Root defaultValue={[40]} name="volume">
    <Slider.Track>
      <Slider.Range />
      <Slider.Thumb><Slider.ValueLabel /></Slider.Thumb>
    </Slider.Track>
  </Slider.Root>
</Field.Root>
```

## Anatomy and API

`Slider` exposes `Root`, `Track`, `Range`, `Thumb`, `Marker`, and `ValueLabel`. Root accepts Atom's controlled/uncontrolled values, `min`, `max`, `step`, `largeStep`, `orientation`, `dir`, form props, validation props, and Brick's closed `size="sm|md|lg"` and `variant="solid|soft"` recipes. Range values author one indexed Thumb per value. `Marker` requires a numeric `value` and belongs inside Track; it is decorative, while a pointer press at its position passes through to the interactive Track. `ValueLabel` is optional, must be inside Thumb, and may render `{ index, percent, value }`.

Slider does not show a numeric value by default. Add `ValueLabel` only when a persistent value beside the thumb is useful. Brick reserves vertical space for an authored horizontal ValueLabel. For dense ranges, long formatted values, or nearby Field text, prefer an external application-owned output so two persistent labels cannot collide.

Root forwards `HTMLDivElement`; Track forwards `HTMLDivElement`; Range, Thumb, Marker, and ValueLabel forward `HTMLSpanElement`. Stable classes match `.brick-slider` and each `__part`; stable slots match `slider` and each `slider-*` part.

## Behavior, forms, and accessibility

Atom owns pointer/touch dragging, keyboard input, RTL/vertical axes, effective dependent bounds, cancellation rollback, controlled state, hidden form inputs, form reset, Field state inheritance, and ARIA. Each Thumb is a separate named `slider`; Root has no extra group role. Disabled controls leave tab order, read-only controls remain focusable, and visual markers/value labels are decorative.

Use one `Field` for the complete Slider. Root may also receive explicit `aria-label`, `invalid`, `disabled`, `readOnly`, or `required` when standalone. A named single Slider submits one value; a named range submits its values through Atom's form contract.

## Styling and resilience

Customize semantic properties such as `--brick-slider-track-background`, `--brick-slider-track-border`, `--brick-slider-range-background`, `--brick-slider-thumb-background`, `--brick-slider-thumb-border`, `--brick-slider-thumb-size`, `--brick-slider-marker-color`, and value-label colors. Brick preserves 44px thumb targets, logical RTL geometry, vertical layout, forced colors, reduced motion, zoom, and narrow containment.

## Evidence

- [Playground](../../../playground/src/components/slider/)
- [Unit tests](../../../test/components/slider/)
- [Type tests](../../../test/types/components/slider.test.ts)
- [Browser tests](../../../playground/tests/components/slider/behavior.spec.ts)
- [Visual tests](../../../playground/tests/components/slider/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/slider.md)
