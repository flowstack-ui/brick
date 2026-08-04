# Progress Circle

Progress Circle is Brick's compact circular task-progress component for known
and unknown work.

## When and where to use

Use Progress Circle for compact loading and completion feedback in cards,
toolbars, dialogs, and other bounded regions.

## When not to use

Use linear Progress when horizontal space communicates change more clearly,
Meter for stable measurements, Steps for workflow stages, and Skeleton for
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
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |
| `thickness` | `"thin" \| "regular" \| "thick"` | `"regular"` |
| `cap` | `"round" \| "butt"` | `"round"` |
| `tone` | `"neutral" \| "accent" \| "info" \| "success" \| "warning" \| "danger"` | `"accent"` |
| `locale` | `Intl.LocalesArgument` | runtime locale |
| `formatOptions` | `Intl.NumberFormatOptions` | percent, 0 fraction digits |

Root retains released Atom Progress props. Circle accepts SVG props except
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
Indicator rotates a fixed arc. Five sizes change diameter while the SVG keeps
the regular stroke proportional; thickness overrides stroke; cap changes arc ends; tone changes the
active ring. Track remains visible in every state.

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
documented native props and refs. Use Track before Indicator within Circle.
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
