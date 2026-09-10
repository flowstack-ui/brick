# Spinner

## When and where to use

Use a compact CSS loading indicator beside application-owned feedback.

## When not to use

Use ProgressCircle for semantic progress, Skeleton for a content placeholder,
and Button's loading prop for a busy action. Spinner never owns request state.

## Installation and imports

```tsx
import { Spinner } from "@flowstack-ui/brick/spinner";
import "@flowstack-ui/brick/styles.css";
```

Alternatively load styles/core.css and styles/spinner.css. Do not mix CSS modes.
```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/spinner.css";
```
Root imports and the spinner subpath export Spinner, SpinnerProps, SpinnerSize,
SpinnerTone, SpinnerEmphasis and SpinnerThickness.

## Quick start

```tsx
<Spinner />
```

## Anatomy and DOM ownership

One span with class brick-spinner and data-slot="spinner"; no nested control,
SVG, wrapper or progressbar. The ref targets HTMLSpanElement.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `inherit`, `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `tone` | `inherit`, `primary`, `secondary`, `muted`, `accent`, `info`, `success`, `warning`, `danger` | `inherit` |
| `emphasis` | `text`, `solid` | `text` |
| `thickness` | `thin`, `regular`, `thick` | `regular` |
| label | authored accessible graphic name | absent |
| aria-labelledby | ID reference instead of label | absent |

Label and aria-labelledby are mutually exclusive. No children, asChild, render,
value, loading, role or aria-hidden props. Native color is omitted in favor of
tone. Other native span attributes, className, style and data-slot pass through.

## Visual recipes and states

Sizes xs/sm/md/lg/xl are 12/16/20/32/40px at a 16px root; inherit is 1em.
Thickness is 1/2/3px. The arc rotates clockwise every 500ms and becomes static
with reduced motion. Circle geometry does not follow the Theme surface radius.
Emphasis solid selects solid semantic palette paint; inherit and text tones
retain their normal paint. Forced colors use the inherited system foreground.

## Tokens and CSS hooks

Stable class: brick-spinner. Attributes: `data-size`, `data-tone`, `data-emphasis`,
`data-thickness`, `data-slot`. Instance variables: --brick-spinner-size,
--brick-spinner-color, --brick-spinner-track-color, --brick-spinner-thickness,
--brick-spinner-duration. Defaults are currentColor, transparent track, 2px
thickness and 500ms duration. Theme semantic text/status colors supply tones.

## Customization

```tsx
<Spinner style={{ "--brick-spinner-duration": "1s", "--brick-spinner-track-color": "var(--brick-color-border-default)" }} />
```

Use positive CSS lengths and durations; excessively thick rings lose their
opening. Keep sufficient contrast and preserve reduced-motion preferences.

## Responsive behavior

Sizes are scalar. Use inherit to follow surrounding responsive typography.
Parent layout owns placement; the nonshrinking ring remains square.

## Accessibility

Decorative by default with aria-hidden=true. A label or aria-labelledby creates
one role=img name, not a live announcement. Compose visible localized Text with
role=status when an update needs polite feedback. Applications own aria-busy,
request state and announcement timing. No keyboard or focus behavior is added.

## Composition, native props, and refs

A span ref and native attributes are forwarded. Recipe props do not reach the
DOM. Compose into HStack, Alert indicators or a ZStack overlay. Do not replace
an existing semantic control with a named Spinner.

## Examples

```tsx
<Spinner size="lg" tone="accent" emphasis="solid" />
<Spinner size="inherit" thickness="thin" />
<Spinner label="Preparing preview" />
```

## Evidence

- [Unit](../../../test/components/spinner/spinner.test.tsx)
- [Types](../../../test/types/components/spinner.test.ts)
- [Browser](../../../playground/tests/components/spinner/behavior.spec.ts)
- [Visual](../../../playground/tests/components/spinner/visual.spec.ts)
- [Manual](../../../playground/manual-tests/spinner.md)
- [Playground](../../../playground/src/components/spinner/SpinnerPage.tsx)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
