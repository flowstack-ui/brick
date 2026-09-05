# Appearance

Appearance applies an explicit light, dark, or inherited semantic-token scope
to one native or existing Brick host. It adds no paint, spacing, state,
persistence, or required client provider.

## When and where to use

Use Appearance when one region intentionally differs from its ancestor, when
an existing component such as App Bar or Tabs should own the boundary, or when
portalled visual roots must reproduce a local scope.

## When not to use

Do not use it for document preference persistence, theme generation, or
visual surface paint. Applications and framework adapters own preference and
pre-paint policy; Surface owns neutral paint.

## Installation and imports

```tsx
import { Appearance } from "@flowstack-ui/brick/appearance";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS, load `@flowstack-ui/brick/styles/core.css` once, then
`@flowstack-ui/brick/styles/appearance.css` plus the modular styles for every
component composed inside it.

Exports are `Appearance`, `AppearanceProps`, and `AppearanceValue`.

## Quick start

```tsx
<Appearance value="dark">
  <AppBar.Root>...</AppBar.Root>
</Appearance>
```

## Anatomy and DOM ownership

Appearance requires exactly one existing React element and decorates that host
without adding a wrapper. The host can contain any number of descendants. Its
component slot, props, handlers, styles, and refs remain owned by the child.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `value` | `light`, `dark`, `inherit` | `inherit` |

The direct child must accept DOM props and a ref. Strings, Fragments, and
multiple direct children are invalid. If the boundary needs semantic markup,
author that element explicitly as the child.

## Visual recipes and states

Appearance has no component recipe or state. It applies
`data-brick-appearance`; the complete token stylesheet assigns `color-scheme`
and semantic values. Themes must supply complete assignments for every
appearance they support, including the paired native selection background and
foreground roles.

## Tokens and CSS hooks

Stable hooks are `.brick-appearance` and `data-brick-appearance`. Appearance
publishes no component tokens and preserves the child's existing slot.

## Customization

Use a complete theme assignment at explicit light and dark selectors. Put
native attributes, events, class, and style on the child host. Do not set
component colors on Appearance or use it as another theme-value authority.

## Responsive behavior

Appearance has no breakpoint behavior. The existing child host keeps its
responsive contract unchanged.

## Accessibility

Appearance adds no role, accessible name, focus behavior, or client state.
Choose valid host semantics. The output is deterministic during SSR and
hydration; applications that persist a root preference must apply it before
paint.

## Composition, native props, and refs

Portalled content does not inherit the trigger's DOM scope. Portal into a
container inside the desired scope or compose Appearance onto every portalled
visual root:

```tsx
<Drawer.Portal>
  <Appearance value="dark"><Drawer.Overlay /></Appearance>
  <Appearance value="dark"><Drawer.Content /></Appearance>
</Drawer.Portal>
```

Appearance refs compose with the child ref and target the existing host.
Appearance adds its class and data attribute; every authored prop remains on
the child, which keeps its component slot.

## Examples

```tsx
<Appearance value="dark">
  <section>
    <Appearance value="light">
      <Surface>Light content inside a dark section</Surface>
    </Appearance>
  </section>
</Appearance>
```

## Evidence

See the [playground](../../../playground/src/components/appearance/AppearancePage.tsx),
[unit test](../../../test/components/appearance/appearance.test.tsx),
[type test](../../../test/types/components/appearance.test.ts),
[browser test](../../../playground/tests/components/appearance/behavior.spec.ts),
[visual owner](../../../playground/tests/components/appearance/visual.spec.ts),
and [manual protocol](../../../playground/manual-tests/appearance.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
