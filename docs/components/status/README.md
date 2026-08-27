# Status

Status presents one compact passive state with a semantic indicator and a
visible readable label, or a decorative indicator beside text that already
carries the same state.

## When and where to use

Use Status for availability, health, review, connection, and similar
dot-plus-label states. Choose its tone from state meaning, not decoration.

## When not to use

Use Badge for categories, counts, or accolades; Progress for completion;
Alert for consequential messages; and Avatar status for a presence ring. Use
an application-owned live region when changes must be announced.

## Installation and imports

```tsx
import { Status } from "@flowstack-ui/brick/status";
import "@flowstack-ui/brick/styles.css";
```

For a measured route-aware build, load the foundation once and the component
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/status.css";
```

Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<Status.Root tone="success">
  <Status.Indicator />
  <Status.Label>Available</Status.Label>
</Status.Root>
```

## Anatomy and DOM ownership

Root, Indicator, and Label render native `span` elements. Indicator is always
decorative. Status adds no live-region role, update policy, state machine, or
interaction behavior.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `neutral` |

Public exports are `Status`, `StatusRoot`, `StatusRootProps`,
`StatusIndicator`, `StatusLabel`, `StatusPartProps`, `StatusSize`, and
`StatusTone`.

## Visual recipes and states

Tone colors Indicator while Label remains primary text. Size coordinates dot,
gap, and text scale. Status owns no selected, pressed, loading, or interactive
state.

## Tokens and CSS hooks

Stable hooks are `.brick-status`, `.brick-status__indicator`,
`.brick-status__label`, and their `data-slot` values. `data-size` and
`data-tone` are Root recipe attributes. Public variables include
`--brick-status-indicator-size`, `--brick-status-gap`,
`--brick-status-color`.

## Customization

Prefer the closed size and semantic tone recipes. Scope public variables only
when a deliberate local composition needs them. Do not recolor Label to match
Indicator or communicate state through color alone.

## Responsive behavior

Status is content-sized and does not wrap its dot away from its label. Place it
in Stack or Grid when surrounding layout changes responsively. Long localized
labels remain visible and determine the component width.

## Accessibility

Always provide localized state text. Normally render it through Status.Label.
Indicator-only composition is allowed only when adjacent visible text or
visually hidden text already carries the same state; mark that decorative Root
`aria-hidden`. Indicator is `aria-hidden`. Status
does not add `role="status"`; an application may deliberately author a live
region only when it owns timing, repetition, focus, and announcement policy.

## Composition, native props, and refs

Compose Root with one Indicator and one Label by default. Omit Label only for
the documented decorative indicator-only composition. All parts merge native
attributes, events, `className`, and `style`; refs target the exact spans.
Root may receive deliberate ARIA attributes, while Indicator remains
decorative.

## Examples

```tsx
<Status.Root size="sm" tone="warning">
  <Status.Indicator />
  <Status.Label>Needs review</Status.Label>
</Status.Root>
```

```tsx
<HStack>
  <Status.Root aria-hidden="true" size="sm" tone="accent">
    <Status.Indicator />
  </Status.Root>
  <Text>Unread notification</Text>
</HStack>
```

## Evidence

- [Playground source](../../../playground/src/components/status/)
- [Unit tests](../../../test/components/status/)
- [Type tests](../../../test/types/components/status.test.ts)
- [Browser behavior](../../../playground/tests/components/status/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/status/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/status.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
