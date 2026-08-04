# Progress

Progress is Brick's linear, read-only task-progress component for known,
unknown, and buffered work.

## When and where to use

Use Progress for uploads, downloads, processing, synchronization, and other
ongoing tasks. Use a value when completion is measurable and omit it when the
remaining work is unknown.

## When not to use

Use Meter for a stable quantity, Steps for workflow stages, Skeleton when the
finished layout is known but no task percentage exists, and Progress Circle in
compact spaces. Progress is not an input or status message.

## Installation and imports

```tsx
import { Progress } from "@flowstack-ui/brick/progress";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/progress.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Progress.Root value={64}>
  <Progress.Label>Upload files</Progress.Label>
  <Progress.Value />
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

## Anatomy and DOM ownership

```tsx
<Progress.Root>
  <Progress.Label />
  <Progress.Value />
  <Progress.Track>
    <Progress.Buffer />
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

| Part | Default element | Owner | Ref target |
| --- | --- | --- | --- |
| `Root` | `div` with `role="progressbar"` | Atom state/ARIA + Brick layout | `HTMLDivElement` |
| `Label` | `span` | Brick naming and typography | `HTMLSpanElement` |
| `Value` | `span` | Brick visible formatting | `HTMLSpanElement` |
| `Track` | `div` | Brick visual track | `HTMLDivElement` |
| `Buffer` | `div` | Brick optional secondary fill | `HTMLDivElement` |
| `Indicator` | `div` | Atom state + Brick active fill | `HTMLDivElement` |

## API

### Root

| Prop | Type | Default |
| --- | --- | --- |
| `value` | `number \| null` | `undefined` (indeterminate) |
| `min` / `max` | `number` | `0` / `100` |
| `bufferValue` | `number \| null` | — |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |
| `shape` | `"square" \| "rounded" \| "pill"` | `"rounded"` |
| `tone` | `"neutral" \| "accent" \| "info" \| "success" \| "warning" \| "danger"` | `"accent"` |
| `locale` | `Intl.LocalesArgument` | runtime locale |
| `formatOptions` | `Intl.NumberFormatOptions` | percent, 0 fraction digits |

Root retains released Atom Progress props including `aria-valuetext`,
`getValueLabel`, `render`, `asChild`, native div props, class/style, and ref.

Label accepts native span props except `id`, because its generated id owns the
default naming relationship. Value accepts native span props and either custom
children or a render function receiving formatted value, raw value, min, max,
percent, and state. Track and Buffer accept native div props. Indicator accepts
released Atom Progress Indicator props. Public exports include every named
part and prop type plus `ProgressOrientation`, `ProgressSize`, `ProgressShape`,
`ProgressTone`, and `ProgressValueDetails`.

The complete public export surface is `Progress`, `ProgressRoot`,
`ProgressRootProps`, `ProgressLabel`, `ProgressLabelProps`, `ProgressValue`,
`ProgressValueProps`, `ProgressValueDetails`, `ProgressTrack`,
`ProgressTrackProps`, `ProgressBuffer`, `ProgressBufferProps`,
`ProgressIndicator`, `ProgressIndicatorProps`, `ProgressOrientation`,
`ProgressSize`, `ProgressShape`, and `ProgressTone`.

Closed values are:

- orientation: `horizontal`, `vertical`;
- size: `xs`, `sm`, `md`, `lg`, `xl`;
- shape: `square`, `rounded`, `pill`;
- tone: `neutral`, `accent`, `info`, `success`, `warning`, `danger`.

## Visual recipes and states

Determinate progress fills to the normalized percentage; indeterminate
progress moves a fixed segment. Optional Buffer sits behind the current value.
Sizes change thickness, shapes change ends, and tones change the active and
buffer colors. Horizontal fill begins at logical inline-start; vertical fill
rises from block-end.

## Tokens and CSS hooks

Stable classes are `.brick-progress`, `.brick-progress__label`,
`.brick-progress__value`, `.brick-progress__track`,
`.brick-progress__buffer`, and `.brick-progress__indicator`. Default slots use
the matching `progress-*` names. Root exposes `data-orientation`, `data-size`,
`data-shape`, and `data-tone`; Atom exposes state/range attributes.

Public variables are:

```css
--brick-progress-track-background
--brick-progress-buffer-background
--brick-progress-indicator-background
--brick-progress-label-foreground
--brick-progress-value-foreground
--brick-progress-thickness
--brick-progress-length
--brick-progress-radius
```

## Customization

Prefer recipes, then semantic tokens, then the public variables. Buffer and
indicator percentage variables are internal state outputs, not consumer
inputs.

## Responsive behavior

Horizontal Progress fills its available inline size and remains shrinkable.
Vertical Progress uses `--brick-progress-length`. Labels wrap, values retain
tabular numerals, and logical placement supports RTL without consumer changes.

## Accessibility

Root uses Atom's `progressbar` role and normalized ARIA range. Determinate
progress includes `aria-valuenow`; indeterminate progress omits it. Render
Label or provide `aria-label`/`aria-labelledby`. Use `aria-valuetext` when the
numeric range is not meaningful. Mark an updating application region
`aria-busy`; Progress does not own that region or announcements. It has no
keyboard interaction. Reduced motion leaves a static segment and forced colors
preserves boundaries.

## Composition, native props, and refs

Root and Indicator retain Atom `render`/`asChild` composition. Other parts
forward their documented native props and refs. Keep Buffer before Indicator
inside Track so current progress remains visually foremost.

## Examples

### Indeterminate

```tsx
<Progress.Root aria-label="Loading report">
  <Progress.Track><Progress.Indicator /></Progress.Track>
</Progress.Root>
```

### Buffered vertical progress

```tsx
<Progress.Root value={40} bufferValue={75} orientation="vertical">
  <Progress.Label>Download</Progress.Label>
  <Progress.Value />
  <Progress.Track><Progress.Buffer /><Progress.Indicator /></Progress.Track>
</Progress.Root>
```

## Evidence

- [Playground route](../../../playground/src/components/progress/)
- [Component test](../../../test/components/progress/)
- [Type test](../../../test/types/components/progress.test.ts)
- [Browser test](../../../playground/tests/components/progress/behavior.spec.ts)
- [Visual test](../../../playground/tests/components/progress/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/progress.md)
- [Packed Consumer](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
