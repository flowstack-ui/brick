# Segment Group

Segment Group is Brick's compact single-choice mode control. Atom Radio Group
owns semantics and behavior; Brick owns the segmented surface, shared sizes,
and moving selected indicator.

## When and where to use

Use Segment Group for a short visible choice such as list/grid view, density,
or appearance where exactly one immediate mode is active.

## When not to use

Use Toggle Group for independent pressed commands, Tabs for paired panels,
Radio Group for ordinary form choices, and Select for longer compact lists.

## Installation and imports

```tsx
import { SegmentGroup } from "@flowstack-ui/brick/segment-group";
import "@flowstack-ui/brick/styles.css";
```

For modular styles, load the foundation once and this component stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/segment-group.css";
```

Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<SegmentGroup.Root aria-label="View" defaultValue="list" size="sm">
  <SegmentGroup.Indicator />
  <SegmentGroup.Item aria-label="List view" iconOnly value="list">
    <ListIcon />
  </SegmentGroup.Item>
  <SegmentGroup.Item aria-label="Grid view" iconOnly value="grid">
    <GridIcon />
  </SegmentGroup.Item>
</SegmentGroup.Root>
```

## Anatomy and DOM ownership

Root is an Atom `radiogroup` div. Item is an Atom radio button. ItemText is an
optional span. Indicator is a decorative span that measures the active Item.
Refs target those rendered elements; Indicator never owns selection or naming.

## API

Root accepts Atom Radio Group props and adds `size: "sm" | "md" | "lg"`
(default `"md"`) and `fullWidth` (default `false`). Orientation defaults to
`"horizontal"`. Item accepts Atom Radio props and `iconOnly` (default false).

Public exports are `SegmentGroup`, `SegmentGroupRoot`, `SegmentGroupItem`,
`SegmentGroupItemText`, `SegmentGroupIndicator`, their prop types, and
`SegmentGroupSize`.

Public prop types are `SegmentGroupRootProps`, `SegmentGroupItemProps`,
`SegmentGroupItemTextProps`, and `SegmentGroupIndicatorProps`.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `orientation` | `horizontal`, `vertical` | `horizontal` |
| `fullWidth` | `boolean` | `false` |
| `iconOnly` | `boolean` | `false` |

## Visual recipes and states

All sizes align with Brick's shared named control geometry. Resting Items use
secondary text and the selected Item uses primary text. Indicator fills the
selected Item's complete segmented area with a quiet border and shallow
elevation, while the Root uses an inset boundary that does not enlarge the
shared control size. Indicator moves and resizes without layout changes.
Disabled state stays visible but unavailable;
read-only selection remains focusable and stable.

## Tokens and CSS hooks

Stable classes and slots are `segment-group`, `segment-group-indicator`,
`segment-group-item`, and `segment-group-item-text`. Public variables include
`--brick-segment-group-min-block-size`,
`--brick-segment-group-item-padding-inline`,
`--brick-segment-group-item-gap`, `--brick-segment-group-icon-size`,
`--brick-segment-group-inset`, `--brick-segment-group-background`,
`--brick-segment-group-border`, `--brick-segment-group-root-shadow`,
`--brick-segment-group-indicator-background`,
`--brick-segment-group-indicator-border`,
`--brick-segment-group-indicator-shadow`,
`--brick-segment-group-foreground`,
`--brick-segment-group-selected-foreground`, and
`--brick-segment-group-focus-ring`.

Root exposes `data-size` and `data-full-width`; Item exposes
`data-icon-only` alongside Atom's state and value attributes.

## Customization

Prefer `size` and `fullWidth`, then public component variables. Keep the
Indicator visibly distinct, preserve focus, and do not place accessible text
on Indicator.

## Responsive behavior

Root stays intrinsic by default and can fill its allocated width with
`fullWidth`. Items remain ordered at narrow widths and zoom. Indicator
remeasures after layout and font changes. Logical geometry and Atom keyboard
direction support RTL.

## Accessibility

Give Root a complete name. Visible Item content names text choices; icon-only
Items require `aria-label`. Atom owns radio roles, one-value state, roving
focus, arrows, Home/End, direction, disabled/read-only state, forms,
validation, and reset. Indicator is hidden from assistive technology.

## Composition, native props, and refs

Root and Item preserve Atom native props, `render`, and `asChild`. ItemText and
Indicator preserve span attributes. Root, Item, ItemText, and Indicator refs
target their final rendered hosts. Keep Indicator as a direct Root child so it
can measure the selected Item.

## Examples

```tsx
<SegmentGroup.Root aria-label="Density" defaultValue="comfortable" fullWidth>
  <SegmentGroup.Indicator />
  <SegmentGroup.Item value="compact">Compact</SegmentGroup.Item>
  <SegmentGroup.Item value="comfortable">Comfortable</SegmentGroup.Item>
</SegmentGroup.Root>
```

## Evidence

- [Playground route source](../../../playground/src/components/segment-group/)
- [Focused component tests](../../../test/components/segment-group/)
- [Type tests](../../../test/types/components/segment-group.test.ts)
- [Browser behavior](../../../playground/tests/components/segment-group/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/segment-group/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/segment-group.md)

## Changelog

See the [Segment Group changelog](CHANGELOG.md).
