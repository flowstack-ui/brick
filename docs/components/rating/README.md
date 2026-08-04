# Rating

Rating is Brick's styled small-scale score input, backed by Atom 0.19.6. It exposes one accessible slider with decorative repeated artwork and works alone or as the sole control in `Field`; it does not require `Fieldset`.

## When and where to use

Use Rating when a person chooses a score on a short ordered scale, such as one to five stars. Fractional steps are appropriate when the product genuinely accepts them.

## When not to use

Use Slider for a general numeric setting, Radio Group when choices have distinct meanings, and a read-only display for an aggregate score.

## Installation and imports

```tsx
import { Rating } from "@flowstack-ui/brick/rating";
import { Field } from "@flowstack-ui/brick/field";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/rating.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Field.Root>
  <Field.Label>Product rating</Field.Label>
  <Rating.Root defaultValue={3} name="rating">
    {[1, 2, 3, 4, 5].map(value => <Rating.Item key={value} value={value} />)}
  </Rating.Root>
  <Field.Error>Choose a rating.</Field.Error>
</Field.Root>
```

## Anatomy and DOM ownership

`Rating` exposes `Root` and `Item`. Root forwards `HTMLDivElement` and is the single focusable slider. Item forwards `HTMLSpanElement`, requires an endpoint `value`, and stays decorative. Brick renders default or authored artwork in empty and proportionally clipped fill layers.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `tone` | `accent`, `neutral` | `accent` |
| `variant` | `solid`, `outline` | `solid` |
| `allowClear` | boolean | `false` |

Root forwards Atom's controlled and uncontrolled value, `min`, `max`, `step`, `largeStep`, direction, form, validation, and value-label APIs. Item accepts optional decorative artwork. Named exports are `Rating`, `RatingRoot`, and `RatingItem` with `RatingRootProps`, `RatingItemProps`, `RatingSize`, `RatingTone`, and `RatingVariant` types.

## Visual recipes and states

Recipes change paint and artwork geometry only. Atom state attributes drive disabled, read-only, invalid, required, value, and direction presentation. Repeated activation keeps the selected value stable by default; enable `allowClear` only when the product intentionally supports clearing to the minimum.

## Tokens and CSS hooks

Stable classes are `.brick-rating`, `.brick-rating__item`, `.brick-rating__artwork`, and `.brick-rating__star`. Public variables are `--brick-rating-item-size`, `--brick-rating-gap`, `--brick-rating-empty-color`, and `--brick-rating-fill-color`. Root exposes `data-size`, `data-tone`, `data-variant`, and the stable `data-slot` value `rating`; Item uses `rating-item`.

## Customization

Prefer recipes, then scope public variables: `<Rating.Root style={{ "--brick-rating-fill-color": "rebeccapurple" }} />`. Item children replace the default star artwork and remain decorative.

## Responsive behavior

Brick preserves 44px item targets, narrow containment, proportional RTL clipping, forced colors, reduced motion, zoom, and coarse-pointer input. A drag can cross gaps and the complete item scale while vertical page scrolling remains available.

## Accessibility

Atom owns the slider role, current/range/value text, keyboard and pointer input, fractional selection, direction, validation, Field relationships, submission, reset, and cancellation. Items and artwork stay hidden from assistive technology. Disabled Rating leaves tab order; read-only Rating remains focusable. True pointer cancellation rolls back, while capture loss finalizes the live value.

## Composition, native props, and refs

Root and Item preserve native props, ARIA, events, `className`, `style`, data attributes, slots, and exact refs. Use one Field for label, description, and error, or give standalone Root an accessible name. A named Rating submits one scalar value.

## Examples

```tsx
<Rating.Root aria-label="Service rating" defaultValue={3.5} step={0.5} allowClear>
  {[1, 2, 3, 4, 5].map(value => <Rating.Item key={value} value={value} />)}
</Rating.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/rating/)
- [Unit tests](../../../test/components/rating/)
- [Type tests](../../../test/types/components/rating.test.ts)
- [Browser behavior](../../../playground/tests/components/rating/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/rating/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/rating.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
