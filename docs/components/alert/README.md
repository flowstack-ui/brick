# Alert

## When and where to use

Persistent inline feedback with an optional status indicator and authored content.

## When not to use

Use Toast for transient notifications, AlertDialog for blocking decisions and
Field for an associated form error. Alert has no state, focus or dismissal machine.

## Installation and imports

```tsx
import { Alert } from "@flowstack-ui/brick/alert";
import "@flowstack-ui/brick/styles.css";
```

Or load the modular foundation and component stylesheet, without mixing modes:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/alert.css";
```

## Quick start

```tsx
<Alert.Root status="success">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>Changes saved</Alert.Title>
    <Alert.Description>Your project is up to date.</Alert.Description>
  </Alert.Content>
</Alert.Root>
```

## Anatomy and DOM ownership

Root, Content, Title and Description render div; Indicator renders span with a
decorative SVG by default. Stable classes are brick-alert, brick-alert-content,
brick-alert-title, brick-alert-description and brick-alert-indicator. Slots use
matching names without the brick- prefix. Root supplies visual status context.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `status` | `info`, `warning`, `success`, `error`, `neutral` | `info` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | inferred from status |
| `variant` | `soft`, `surface`, `outline`, `solid` | `soft` |
| `size` | `sm`, `md`, `lg` | `md` |
| `inline` | boolean | `false` |
| `align` | `start`, `center` | `start` |
| `radius` | shared `Radius` | `surface` |
| `accentStart` | boolean | `false` |

Exports: Alert, AlertRoot, AlertIndicator, AlertContent, AlertTitle,
AlertDescription and AlertRootProps, AlertContentProps, AlertTitleProps,
AlertDescriptionProps, AlertIndicatorProps; AlertStatus, AlertTone,
AlertVariant and AlertSize. Size, variant, inline and align accept ResponsiveValue;
status and tone remain scalar. Content accepts tone=`inherit` (default) or `primary`.
Radius accepts none, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, subtle, control,
surface, overlay and full. Error status maps to danger
paint. An explicit tone changes paint without changing the status glyph.
Indicator children replace the default glyph; omit Indicator for no icon.

## Visual recipes and states

Soft has tinted fill; surface adds a semantic border; outline stays transparent;
solid uses paired solid/on-solid colors. Borders are inset paint and do not add size.
Typography sm/md/lg is 12/14/16px at the default root size; indicator 18/20/24px.
Padding 12/16/16px and root gap 8/12/12px. Title is medium weight, description
regular, with sm/md/lg line heights 16/20/24px. Inline centers and wraps title and
description horizontally with a 4px gap. No hover or elevation
is implied by a static message. Radius follows the Theme surface radius.

## Tokens and CSS hooks

Attributes: `data-status`, `data-tone`, `data-variant`, `data-size`,
`data-inline` (true, omitted when initially false), `data-align`, `data-accent-start`, `data-slot`.
Responsive inline attributes serialize true/false so later breakpoints can reset.
Responsive data attributes use sm/md/lg/xl suffixes. Instance variables: --brick-alert-background,
--brick-alert-color, --brick-alert-border-color, --brick-alert-radius,
--brick-alert-padding, --brick-alert-gap, --brick-alert-font-size and
--brick-alert-indicator-size, --brick-alert-line-height, --brick-alert-accent-width,
--brick-alert-accent-color and --brick-alert-content-color. Semantic Theme palette and typography tokens
remain the defaults; internal --brick-alert-tone-* values are not public hooks.

## Customization

Choose recipes before overriding documented variables on the public Root.
Custom indicators may compose Spinner; actions may compose Button and CloseButton.
Use Icon or Spinner size="inherit" to follow the indicator box; explicit child
sizes remain independent. accentStart paints a logical stripe without changing
geometry. Content tone="primary" is useful on soft backgrounds; retain inherited
foreground on solid alerts to preserve the paired contrast. Arbitrary category
palettes are not a separate Alert API; use semantic tone or qualified instance
paint hooks with foreground/background contrast verification.
Load their modular CSS separately. Do not select internal SVG paths.

## Responsive behavior

Root fills its parent and content shrinks and wraps. Indicator does not shrink.
Application Frame/Stack/Grid own placement and responsive widths.
Sparse responsive objects retain md/soft/false/start below their first breakpoint.
Breakpoints use the shared sm/md/lg/xl system; recipes reset on viewport changes
without JavaScript or duplicated content.

## Accessibility

Static by default: no automatic live role, focus transfer or inferred urgency.
Use native role=status for polite updates, role=alert for important new messages.
Keep one announcement path. Applications own dismissal and sensible focus when
removing a focused action. Default SVG is decorative. Custom content retains
its authored semantics. Never communicate status by color alone.

## Composition, native props, and refs

All five parts accept asChild with one non-Fragment element,
merging class/style and refs; refs target the actual HTMLElement. Default Indicator
ref is HTMLSpanElement. Native attributes, event handlers and data-slot pass
through; semantic color is omitted in favor of tone. Recipe props do not leak.
Native title remains a tooltip attribute, not the Alert.Title content shortcut.

## Examples

```tsx
<Alert.Root role="status" inline><Alert.Content><Alert.Title>Ready</Alert.Title><Alert.Description>Your export finished.</Alert.Description></Alert.Content></Alert.Root>
<Alert.Root status="success" tone="accent" variant="surface">Project created.</Alert.Root>
```

## Evidence

- [Unit](../../../test/components/alert/alert.test.tsx)
- [Types](../../../test/types/components/alert.test.ts)
- [Browser](../../../playground/tests/components/alert/behavior.spec.ts)
- [Visual](../../../playground/tests/components/alert/visual.spec.ts)
- [Manual](../../../playground/manual-tests/alert.md)
- [Playground](../../../playground/src/components/alert/AlertPage.tsx)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
