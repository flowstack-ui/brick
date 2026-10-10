# Rating


## When and where to use

Use Root and Item when a person chooses a score on a short ordered scale, such as one to five stars. Use Display for a familiar repeated-star average and Summary for a compact one-star numeric aggregate. Fractional values are supported in every mode.

## When not to use

Use Slider for a general numeric setting and Radio Group when choices have distinct meanings. Do not use a read-only Root for an aggregate score: it remains a focusable slider. Use Display instead.

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

<Rating.Display value={4.5} label="4.5 out of 5 stars" size="sm" />

<Rating.Summary
  value={4.8}
  valueText="4.8"
  label="4.8 out of 5 stars"
  size="sm"
/>
```

## Anatomy and DOM ownership

`Rating` exposes Root, RootProvider, PropsProvider, Label, Control, Item,
ItemIndicator, Items, HiddenInput, Context, ItemContext, Display and Summary.

| Part | Host/ref | Responsibility |
| --- | --- | --- |
| Root / RootProvider | HTMLDivElement | One focusable slider, numeric state and form integration |
| Label | HTMLSpanElement | Visible name and focus activation |
| Control | HTMLDivElement | Nonfocusable artwork strip and focus-paint boundary |
| Item | HTMLSpanElement | Decorative pointer target for one numeric endpoint |
| ItemIndicator | HTMLSpanElement | Decorative empty and proportional fill layers |
| HiddenInput | HTMLInputElement | Explicit submission input in manual mode |
| Display / Summary | HTMLSpanElement | One labelled passive image; no tab stop |
| Items / Context / ItemContext / PropsProvider | No host | Generated artwork, state access and presentation defaults |

Named part exports use the Rating prefix and include corresponding Props types.
These include RatingRootProvider/RatingRootProviderProps,
RatingPropsProvider/RatingPropsProviderProps, RatingLabel/RatingLabelProps,
RatingControl/RatingControlProps, RatingItems/RatingItemsProps,
RatingItemIndicator/RatingItemIndicatorProps, RatingHiddenInput/RatingHiddenInputProps,
RatingContext and RatingItemContext.
`useRating`, `useRatingContext`, `useRatingItemContext`, `RatingController`,
`UseRatingProps`, `RatingContextValue`, `RatingItemContextValue`,
`RatingPresentationProps` and `RatingDensity` are available at root and subpath.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | ResponsiveValue of `xs`, `sm`, `md`, `lg` | `md` |
| `tone` | `accent`, `neutral` | `accent` |
| `variant` | ResponsiveValue of `solid`, `outline` | `solid` |
| `density` | ResponsiveValue of `comfortable`, `compact` | `comfortable` |
| `gap` | ResponsiveValue of SpacingValue | `0` |
| `fillColor`, `emptyColor` | CSSProperties color | semantic recipe |
| `allowClear` | boolean | `false` |

Root forwards Atom's controlled and uncontrolled value, `min`, `max`, `step`, `largeStep`, direction, form, validation, and value-label APIs. Item accepts optional decorative artwork. Named exports are `Rating`, `RatingRoot`, and `RatingItem` with `RatingRootProps`, `RatingItemProps`, `RatingSize`, `RatingTone`, and `RatingVariant` types.

Root also accepts `onHoverChange(number | null)`, `inputMode="auto" | "manual"`,
`autoFocus` and `ids={{ root, label, control, input }}`. Defaults are min=0,
max=5, step=1 and value=min. `onValueChange` receives a number, not a detail object.
Omitted Root children generate Control; omitted Control children generate Items.
Explicit null/empty children remain empty. Items supports integer min/max endpoints
with at most 1000 segments; compose explicit Item values for other endpoints.
`step={0.5}` enables half ratings without a competing allowHalf prop.

`useRating(options)` exposes value, setValue, clearValue, reset, hoveredValue,
previewValue, setHoveredValue, min/max/step, items and getItemState. Configure
behavior on the hook and pass `controller` to RootProvider. Context and
ItemContext accept render functions; the item state contains value/fill/dataState.
Hover changes preview artwork only, never the named form value or aria-valuenow.

ItemIndicator and Items accept `icon?: ReactElement`. Item accepts
`contentMode="artwork" | "content"`. Omission recognizes direct ItemIndicator and
ItemContext (also in fragments); other children retain legacy layered artwork.
Use content mode for opaque wrappers and emoji so they render once. Decorative
icons are repeated: do not include IDs, accessible labels or interactive content.

Display requires numeric `value` and a localized `label`. It accepts `max`, defaulting to 5, plus the same size, tone, and variant recipes. Named exports also include `RatingDisplay` and `RatingDisplayProps`.

Summary requires numeric `value` and a localized `label`. It accepts `max`,
`size`, `tone`, `fillColor`, `gap`, `icon`, and optional localized `valueText`. Named exports also include
`RatingSummary` and `RatingSummaryProps`.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Rating is Brick's styled score input and aggregate display. Root and Item expose one accessible Atom-backed slider for choosing a score. Display presents repeated-star aggregate artwork; Summary presents one star beside a visible numeric value.

Recipes change paint and artwork geometry only. Atom state attributes drive disabled, read-only, invalid, required, value, and direction presentation. Repeated activation keeps the selected value stable by default; enable `allowClear` only when the product intentionally supports clearing to the minimum.

## Tokens and CSS hooks

Stable classes include `.brick-rating`, `.brick-rating--display`, `.brick-rating-summary`, `.brick-rating__item`, `.brick-rating__artwork`, and `.brick-rating__star`. Public variables are `--brick-rating-item-size`, `--brick-rating-gap`, `--brick-rating-empty-color`, and `--brick-rating-fill-color`. Root exposes `data-size`, `data-tone`, `data-variant`, and the stable `data-slot` value `rating`; Item uses `rating-item`, Display uses `rating-display`, and Summary uses `rating-summary`.

## Customization

Prefer recipes, then local `fillColor` and `emptyColor`, then documented public
variables. Explicit color props win over authored instance variables, which win
over the semantic recipe. Custom colors are consumer-owned: verify selected and
empty artwork against the actual light/dark surface. PropsProvider inherits only
presentation; it is not a second state owner. Display also accepts custom `icon`.

Additional stable classes are `.brick-rating__control`, `.brick-rating__label`
and `.brick-rating__indicator`. Summary retains `--brick-rating-summary-gap`,
`--brick-rating-summary-artwork-size` and `--brick-rating-summary-color`.
Responsive data attributes include data-size-sm/md/lg/xl, data-variant-sm/md/lg/xl
and `data-density` plus data-density-sm/md/lg/xl. Internal recipe variables are not customization API.

## Responsive behavior

Artwork sizes are xs=14px, sm=16px, md=20px and lg=24px using shared typography
tokens. Comfortable density preserves 44px targets; compact uses at least 24px.
Display cells fit the artwork. Size, variant, density and gap accept sparse
responsive objects; missing initial values use the default. Narrow containment,
local RTL clipping and forced colors remain supported. There is no hover lift or
animation-dependent meaning. A drag can cross gaps while vertical scrolling remains available.

## Accessibility

Atom owns the slider role, current/range/value text, keyboard and pointer input, fractional selection, direction, validation, Field relationships, submission, reset, and cancellation. Items and artwork stay hidden from assistive technology. Disabled Rating leaves tab order; read-only Root remains focusable. Display and Summary expose one localized image label and no control semantics or tab stop. True pointer cancellation rolls back, while capture loss finalizes the live value.

## Composition, native props, and refs

Root and Item preserve native props, ARIA, events, `className`, `style`, data attributes, slots, and exact refs. Use one Field for label, description, and error, or give standalone Root an accessible name. A named Rating submits one scalar value.

Label may replace Field.Label for standalone use; explicit ARIA naming wins.
Root remains the only slider focus owner. Do not nest independent controls inside
it. asChild requires exactly one host; Item places its decorative content inside
that host and preserves its ref/events. Native attributes pass through except
those owned by Atom's semantic contract.

Automatic submission remains the default. Set inputMode="manual" and render one
HiddenInput for explicit composition. Name, value and form remain Root-owned;
the unnamed required-validation proxy remains separate. Native reset returns an
uncontrolled score to defaultValue and clears preview/validation; prevented resets
retain state. Controlled values stay caller-owned. Disabled Fieldsets are honored.
For React Hook Form, connect Controller field.value, onChange, onBlur and ref to
Root; let the form library own validation and do not create a second value store.

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
