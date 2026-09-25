# Progress Circle

Progress Circle is Brick's compact circular task-progress component for known
and unknown work.

## When and where to use

Use Progress Circle for compact loading and completion feedback in cards,
toolbars, dialogs, and other bounded regions.

## When not to use

Use linear Progress when horizontal space communicates change more clearly,
native meter for stable measurements, Steps for workflow stages, and Skeleton for
layout placeholders. Do not use it as a decorative activity spinner without
an accessible task name.

## Installation and imports

```tsx
import { ProgressCircle } from "@flowstack-ui/brick/progress-circle";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/progress-circle.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<ProgressCircle.Root value={64}>
  <ProgressCircle.Circle>
    <ProgressCircle.Track />
    <ProgressCircle.Indicator />
  </ProgressCircle.Circle>
  <ProgressCircle.Value />
  <ProgressCircle.Label>Export report</ProgressCircle.Label>
</ProgressCircle.Root>
```

## Anatomy and DOM ownership

| Part | Default element | Owner | Ref target |
| --- | --- | --- | --- |
| `Root` | `div` with `role="progressbar"` | Atom state/ARIA + Brick layout | `HTMLDivElement` |
| `Circle` | decorative `svg` | Brick geometry | `SVGSVGElement` |
| `Track` | `circle` | Brick inactive ring | `SVGCircleElement` |
| `Indicator` | `circle` | Atom context + Brick active ring | `SVGCircleElement` |
| `Label` | `span` | Brick naming and typography | `HTMLSpanElement` |
| `Value` | `span` | Brick visible formatting | `HTMLSpanElement` |

## API

### Root

| Prop | Type | Default |
| --- | --- | --- |
| `value` | `number \| null` | `undefined` (indeterminate) |
| `min` / `max` | `number` | `0` / `100` |
| `size` | `ResponsiveValue<"xs" \| "sm" \| "md" \| "lg" \| "xl">` | `"md"` |
| `thickness` | `"thin" \| "regular" \| "thick"` | `"regular"` |
| `cap` | `"round" \| "butt"` | `"round"` |
| `tone` | `"neutral" \| "accent" \| "info" \| "success" \| "warning" \| "danger"` | `"accent"` |
| `locale` | `Intl.LocalesArgument` | `LocaleProvider.locale` |
| `formatOptions` | `Intl.NumberFormatOptions` | percent, 0 fraction digits |

Root retains public Atom Progress props. Circle accepts SVG props except
`viewBox`; Track accepts circle props except component-owned `cx`, `cy`, and
`r`; Indicator also owns `pathLength`, `strokeDasharray`, and
`strokeDashoffset` so its circumference-based visible arc always matches
Atom's normalized value across SVG implementations.
Label accepts native span props except `id`. Value accepts
native span props and custom children or a render function with formatted and
raw progress details. Public exports include every named part and prop type
plus `ProgressCircleSize`, `ProgressCircleThickness`, `ProgressCircleCap`,
`ProgressCircleTone`, and `ProgressCircleValueDetails`.

The complete public export surface is `ProgressCircle`,
`ProgressCircleRoot`, `ProgressCircleRootProps`, `ProgressCircleCircle`,
`ProgressCircleCircleProps`, `ProgressCircleTrack`,
`ProgressCircleTrackProps`, `ProgressCircleIndicator`,
`ProgressCircleIndicatorProps`, `ProgressCircleLabel`,
`ProgressCircleLabelProps`, `ProgressCircleValue`,
`ProgressCircleValueProps`, `ProgressCircleValueDetails`,
`ProgressCircleSize`, `ProgressCircleThickness`, `ProgressCircleCap`, and
`ProgressCircleTone`.

Closed values are:

- size: `xs`, `sm`, `md`, `lg`, `xl`;
- thickness: `thin`, `regular`, `thick`;
- cap: `round`, `butt`;
- tone: `neutral`, `accent`, `info`, `success`, `warning`, `danger`.

## Visual recipes and states

Determinate Indicator advances clockwise from twelve o'clock. Indeterminate
Indicator rotates a changing arc. At a 16px root font, xs/sm/md/lg/xl diameter
is 24/32/40/48/64px and regular stroke is 4/5/6/7/8px. Thin multiplies stroke
by 0.5; thick by 1.5. The radius follows stroke width so the outer paint stays
inside the allocated square. Zero normalized progress has no active paint,
including with round caps and a nonzero minimum. Cap changes arc ends; tone
changes the active ring. Track remains visible in every state.

Size accepts ResponsiveValue with initial/sm/md/lg/xl breakpoints. Sparse
objects start at md and inherit previous values. Value uses real typography,
not a paint transform: caption for xs/sm/md, body-sm for lg, body-md for xl.
Use outside labels for small rings; use xl for centered percentages or longer
values. Arbitrary content can exceed a ring's useful text area.

### Controller and formatting

Additional exports are `ProgressCircleRootProvider`,
`ProgressCircleRootProviderProps`, `ProgressCircleContext` and
`ProgressCircleValueFormat`. `ProgressCircle.Context` renders its function
child with normalized state and an optional setter, adding no DOM element.
`ProgressCircle.RootProvider` takes an external `ProgressController` as value
plus Root's visual/native props, without a second min/max/defaultValue/ids.

Import shared `useProgress`, `ProgressController` and `UseProgressProps` from
`@flowstack-ui/brick/progress` or the package root. The hook serves both visual
owners; no separate circular state machine is created. Root accepts optional
defaultValue (null), onValueChange (normalized changed controller requests),
and ids (explicit root/label IDs). Controlled value is authoritative.

`valueFormat="percent"` (default) formats percent / 100; `value` formats the
normalized raw task value. Both use locale and formatOptions. Accessible
aria-valuetext/getValueLabel are independent; explicit aria-valuetext wins.
NaN is indeterminate, infinities clamp and invalid ranges normalize in Atom.

## Tokens and CSS hooks

Stable classes are `.brick-progress-circle` and the `__circle`, `__track`,
`__indicator`, `__label`, and `__value` parts. Default slots use matching
`progress-circle-*` names. Root exposes `data-size`, `data-thickness`,
`data-cap`, and `data-tone`; Atom range/state attributes remain visible.

Public variables are:

```css
--brick-progress-circle-track
--brick-progress-circle-indicator
--brick-progress-circle-label-foreground
--brick-progress-circle-value-foreground
--brick-progress-circle-size
--brick-progress-circle-stroke
```

## Customization

Prefer recipes, then semantic tokens, then public variables. Keep sufficient
track and indicator contrast on custom backgrounds.

`--brick-progress-circle-stroke` remains unitless in the 100-unit viewBox;
it is not a pixel length. Its size-specific default now gives the paired
stroke progression above. Thickness multiplies it, with a safe 0–100 clamp.
`--brick-progress-circle-size` is a CSS length. Native radius/dash attributes
are unstyled fallbacks; recipe CSS owns thickness-aware radius, circumference
and offset. State percentage, effective stroke, stroke factor, circumference
and value-size variables are internal, not public customization inputs.

## Responsive behavior

The ring keeps a square aspect ratio and never reverses in RTL: determinate and
indeterminate progress remain clockwise. Labels wrap below the ring. Explicit
size variables remain consumer-owned but should fit the surrounding region.

## Accessibility

Root uses Atom's read-only progressbar semantics. Determinate values expose
`aria-valuenow`; indeterminate values omit it. Label supplies the default name,
or use native ARIA naming. SVG anatomy is decorative and silent. There is no
keyboard interaction. Reduced motion retains a static arc and forced colors
retains both track and indicator.

## Composition, native props, and refs

Root retains Atom `render`/`asChild`; the SVG and text parts retain their
documented native props and refs and support `asChild`. Project Circle only
onto svg, Track/Indicator only onto circle, and text onto noninteractive text
hosts. ViewBox and progress geometry remain owned. Use Track before Indicator within Circle.
Value and Label are optional; an accessible name is not optional.

## Examples

### Indeterminate

```tsx
<ProgressCircle.Root aria-label="Loading analytics">
  <ProgressCircle.Circle>
    <ProgressCircle.Track />
    <ProgressCircle.Indicator />
  </ProgressCircle.Circle>
</ProgressCircle.Root>
```

### Custom task range

```tsx
<ProgressCircle.Root value={3} min={1} max={5}>
  <ProgressCircle.Circle>
    <ProgressCircle.Track />
    <ProgressCircle.Indicator />
  </ProgressCircle.Circle>
  <ProgressCircle.Value>{({ value, max }) => `${value}/${max}`}</ProgressCircle.Value>
  <ProgressCircle.Label>Setup tasks</ProgressCircle.Label>
</ProgressCircle.Root>
```

## Evidence

- [Playground route](../../../playground/src/components/progress-circle/)
- [Component test](../../../test/components/progress-circle/)
- [Type test](../../../test/types/components/progress-circle.test.ts)
- [Browser test](../../../playground/tests/components/progress-circle/behavior.spec.ts)
- [Visual test](../../../playground/tests/components/progress-circle/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/progress-circle.md)
- [Packed Consumer](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
