# Tabs

Tabs switches between related peer panels while preserving complete keyboard,
selection, and panel relationships through Atom.

## When and where to use

Use Tabs for a small set of peer views that share one context and can be loaded
without changing the page's primary location.

## When not to use

Do not use Tabs for site navigation, sequential steps, independent form
choices, or content whose activation is actually a route transition.

## Installation and imports

```tsx
import { Tabs } from "@flowstack-ui/brick/tabs";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<Tabs.Root defaultValue="overview">
  <Tabs.List ariaLabel="Account sections">
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="overview">Overview panel</Tabs.Content>
  <Tabs.Content value="activity">Activity panel</Tabs.Content>
</Tabs.Root>
```

## Anatomy and DOM ownership

Root defaults to `div`, List to `div role="tablist"`, Trigger to `button
role="tab"`, Content to `div role="tabpanel"`, and Indicator to a decorative
`div`. Atom owns IDs, ARIA, roving focus, selection, and panel mounting.

## API

Public exports are `Tabs`, `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`,
`TabsIndicator`, `TabsRootProps`, `TabsListProps`, `TabsTriggerProps`,
`TabsContentProps`, `TabsIndicatorProps`, `TabsSize`, and `TabsVariant`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `line`, `solid`, `soft`, `enclosed` | `line` |
| `fullWidth` | `boolean` | `false` |

List, Trigger, Content, and Indicator extend their exact Atom props. Atom also
supplies `orientation`, `activationMode`, `loop`, controlled/uncontrolled
value, `keepMounted`, and `focusable`.

## Visual recipes and states

Line emphasizes selection with an edge and optional moving Indicator. Solid
uses a neutral contained rail, soft uses accent-soft selection, and enclosed
joins the active trigger to the panel. Sizes change control typography and
rhythm. Hover, active, selected, disabled, and focus-visible remain distinct.

## Tokens and CSS hooks

Stable classes are `.brick-tabs`, `.brick-tabs-list`, `.brick-tabs-trigger`,
`.brick-tabs-content`, and `.brick-tabs-indicator`. Root exposes `data-size`,
`data-variant`, `data-full-width`, and Atom's `data-orientation`. Public tokens
include `--brick-tabs-foreground`, `--brick-tabs-selected-foreground`,
`--brick-tabs-hover-background`,
`--brick-tabs-list-background`, `--brick-tabs-selected-background`,
`--brick-tabs-border-color`, `--brick-tabs-indicator-color`,
`--brick-tabs-focus-ring`, `--brick-tabs-gap`, `--brick-tabs-trigger-gap`,
`--brick-tabs-trigger-height`, `--brick-tabs-trigger-padding`,
`--brick-tabs-panel-padding`, and `--brick-tabs-radius`.

## Customization

Set supported variables on Root. Use `className` or `style` for local layout;
do not replace selected/focus affordances or rewrite Atom state attributes.

## Responsive behavior

Horizontal lists stay on one line and scroll when constrained. Vertical layout
stays vertical because orientation changes keyboard and ARIA behavior; choose a
responsive orientation in application state rather than CSS alone.

## Accessibility

Give every List a useful label, pair each Trigger value with one Content value,
and choose an initial value. Automatic activation is the default; choose manual
when activating a panel is costly. Disabled tabs are skipped. Forced colors and
reduced motion retain selection and focus.

## Composition, native props, and refs

Root, List, Trigger, and Content preserve Atom `render`, `asChild`, native
attributes, class, style, custom slot, and refs. Indicator accepts native div
attributes, class, style, and slot.

## Examples

See the [component playground](../../../playground/src/components/tabs/) for
variants, sizes, vertical/full-width layout, disabled and icon content,
automatic/manual activation, panel lifecycle, composition, customization, and
responsive/RTL evidence.

## Evidence

- [Unit tests](../../../test/components/tabs/)
- [Type tests](../../../test/types/components/tabs.test.ts)
- [Browser behavior](../../../playground/tests/components/tabs/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/tabs/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/tabs.md)

## Changelog

See [Tabs changelog](CHANGELOG.md).
