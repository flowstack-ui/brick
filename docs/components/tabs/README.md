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

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/tabs.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


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
`TabsContentProps`, `TabsIndicatorProps`, `TabsContentInset`, `TabsLayout`,
`TabsListColumns`, `TabsListRadius`, `TabsSize`, and `TabsVariant`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `line`, `solid`, `soft`, `enclosed` | `line` |
| `fullWidth` | `boolean` | `false` |
| `layout` | `auto`, `stacked`, `side`, or responsive object | `auto` |

List accepts `columns={1|2|3|4}` or a responsive object. Omission preserves
the ordinary one-axis list. Explicit columns create equal visual tracks while
keeping Atom's orientation, DOM order, arrow keys, selection, and ARIA model.

List accepts `radius="default|none"`. `default` preserves the variant recipe;
`none` removes List and Trigger corners for a solid or soft selector nested
inside a clipping parent that owns the outer corners.

Content accepts `inset` values `none`, `sm`, `md`, and `lg`. Omission keeps
the root-size-derived panel spacing; `none` supports edge-to-edge media or a
nested Surface. The selected value is exposed as `data-inset`.

List, Trigger, Content, and Indicator extend their exact Atom props. Atom also
supplies `orientation`, `activationMode`, `loop`, controlled/uncontrolled
value, `keepMounted`, and `focusable`.

## Visual recipes and states

Line emphasizes selection with a server-rendered selected edge and an optional
moving Indicator after Atom can measure the active Trigger. The Indicator is a
line-only visual enhancement: solid, soft, and enclosed hide it and render
their complete selected treatment directly on the active Trigger. This keeps
every recipe visually stable on the first paint and through hydration. Sizes
change control typography and rhythm. Hover, active, selected, disabled, and
focus-visible remain distinct.

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
`--brick-tabs-panel-padding`, `--brick-tabs-list-padding`, and
`--brick-tabs-radius`. Solid and soft recipes reserve at least the complete
focus-ring reach in List padding so a clipping parent cannot crop edge
Triggers.

## Customization

Set supported variables on Root. Use `className` or `style` for local layout;
do not replace selected/focus affordances or rewrite Atom state attributes.
Use `Tabs.Indicator` only when a line recipe benefits from the moving accent;
the selected state remains visible without it.

## Responsive behavior

Horizontal lists stay on one line and scroll when constrained. Vertical layout
stays vertical because orientation changes keyboard and ARIA behavior; choose a
responsive orientation in application state rather than CSS alone.

When semantic orientation stays vertical but the surrounding visual
relationship must adapt, use `layout={{ initial: "stacked", lg: "side" }}`.
This changes only List/Content placement at Brick breakpoints; arrow-key and
ARIA orientation remain vertical. Responsive metadata uses `data-layout` and
breakpoint-suffixed variants.

When that vertical selector should be a compact mobile grid, use
`Tabs.List columns={{ initial: 2, lg: 1 }}`. Labels may wrap inside equal
tracks; the selector remains one vertical keyboard sequence.

Use `Tabs.List radius="none"` instead of a class selector when a containing
Card or Surface owns the visible outer radius. Add `triggerRadius="default"`
when that square List should retain individually rounded Trigger surfaces;
omission preserves the existing List-radius relationship. Both radius choices
change only visual geometry and do not affect layout, columns, focus, or Atom
behavior.

## Accessibility

Give every List a useful label, pair each Trigger value with one Content value,
and choose an initial value. Automatic activation is the default; choose manual
when activating a panel is costly. Disabled tabs are skipped. Forced colors and
reduced motion retain selection and focus. Keep the shipped List padding when
solid or soft Tabs sit inside a clipped Card or Surface; it is part of the
focus-visible geometry rather than decorative spacing.

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
