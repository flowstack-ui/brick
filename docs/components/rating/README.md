# Rating

Rating is Brick's styled rating input, backed by Atom 0.19.3. It exposes one accessible slider rather than five radio buttons, supports fractional precision, and works alone or as the sole control in `Field`. It does not require `Fieldset`.

```tsx
import { Field, Rating } from "@flowstack-ui/brick";

<Field.Root>
  <Field.Label>Product rating</Field.Label>
  <Rating.Root defaultValue={3.5} step={0.5} name="rating">
    {[1, 2, 3, 4, 5].map((value) => <Rating.Item key={value} value={value} />)}
  </Rating.Root>
</Field.Root>
```

## Anatomy and API

`Rating` exposes `Root` and `Item`. Root accepts Atom's controlled/uncontrolled value, range, precision, direction, form and validation props plus Brick's `size="sm|md|lg"`, `tone="accent|neutral"`, and `variant="solid|outline"`. Item requires its endpoint `value` and accepts optional decorative artwork; Brick renders that artwork in empty and proportionally clipped fill layers.

Root forwards `HTMLDivElement`; Item forwards `HTMLSpanElement`. Stable classes are `.brick-rating`, `.brick-rating__item`, and artwork-layer classes. Default slots are `rating` and `rating-item`.

## Behavior, forms, and accessibility

Atom owns click/drag/touch and direction-aware keyboard interaction, fractional values, controlled state, Field state inheritance, hidden form value, form reset, and ARIA. Root is one focusable `slider` with numeric value and localized value text; items and artwork are decorative. Disabled Rating leaves tab order. Read-only Rating remains focusable for value discovery but cannot change.

Use one `Field` for label, description, and error. Standalone Rating may use an explicit accessible name and state props. A named Rating submits one hidden scalar value.

## Styling and resilience

Customize `--brick-rating-item-size`, `--brick-rating-gap`, `--brick-rating-empty-color`, and `--brick-rating-fill-color`. Brick preserves 44px item targets, proportional RTL clipping, forced-color boundaries, reduced motion, zoom, coarse pointer input, and narrow containment.

## Evidence

- [Playground](../../../playground/src/components/rating/)
- [Unit tests](../../../test/components/rating/)
- [Type tests](../../../test/types/components/rating.test.ts)
- [Browser tests](../../../playground/tests/components/rating/behavior.spec.ts)
- [Visual tests](../../../playground/tests/components/rating/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/rating.md)
