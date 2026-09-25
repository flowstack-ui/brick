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
optional span. Indicator is an Atom-owned decorative measured span.
Refs target those rendered elements; Indicator never owns selection or naming.

## API

Root adds `tone` (default `"neutral"`) using `SegmentGroupTone`:
`neutral`, `accent`, or `contrast`.
Neutral is a raised neutral selection; accent uses the solid accent and its
on-solid foreground; contrast uses primary foreground as fill and base surface
as text. The track stays neutral. Tone is not a status or validation signal.

`SegmentGroup.Items` / `SegmentGroupItems` accepts
`items: readonly (string | { value: string; label: ReactNode; disabled?: boolean })[]`.
Values must be unique. It renders Item and ItemText and never duplicates native
inputs. Use manual Item for icon-only labels, refs or custom native props.
Additional exports: `SegmentGroupTone` and `SegmentGroupItemsProps`.

```tsx
<SegmentGroup.Root aria-label="View" defaultValue="List" tone="accent">
  <SegmentGroup.Indicator />
  <SegmentGroup.Items items={["List", "Grid", "Board"]} />
</SegmentGroup.Root>
```

Root accepts Atom Radio Group props and adds `size: "2xs" | "xs" | "sm" | "md" | "lg"`
(default `"md"`) and `fullWidth` (default `false`). Orientation defaults to
`"horizontal"`. Item accepts Atom Radio props and `iconOnly` (default false).

Public exports are `SegmentGroup`, `SegmentGroupRoot`, `SegmentGroupItem`,
`SegmentGroupItemText`, `SegmentGroupIndicator`, their prop types, and
`SegmentGroupSize`.

Public prop types are `SegmentGroupRootProps`, `SegmentGroupItemProps`,
`SegmentGroupItemTextProps`, and `SegmentGroupIndicatorProps`.

| Prop          | Values                        | Default      |
| ------------- | ----------------------------- | ------------ |
| `tone`        | `neutral`, `accent`, `contrast` | `neutral` |
| `size`        | `2xs`, `xs`, `sm`, `md`, `lg` | `md`         |
| `orientation` | `horizontal`, `vertical`      | `horizontal` |
| `fullWidth`   | `boolean`                     | `false`      |
| `iconOnly`    | `boolean`                     | `false`      |

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

All sizes retain Brick's shared named outer control heights. `2xs` is the 24px
compact application-control recipe intended for dense property and editor
panels; `xs` is the polished 32px marketing and compact-form recipe, and
ordinary touch-first choices should continue to use `sm` or larger. Segment
labels use regular-weight content typography rather than button-label weight,
with component-owned horizontal padding and gaps. Resting Items use primary
text and the selected Item uses the tone's foreground. Indicator fills the selected
Item's complete segmented area with a borderless shallow elevation, while the
Root uses an inset boundary that does not enlarge the shared control size. The
unselected rail uses the subtle surface, the selected
segment uses the raised surface, with a soft outer edge in light appearance
and an inset highlight in dark appearance. Short inset default-boundary rules keep every adjacent option
distinct without drawing a full-height boxed edge. Dividers touching the
selected item are hidden so they do not double its visual edge.
Indicator moves and resizes without layout changes. Named forms keep separators
despite Atom's interleaved hidden inputs. Before hydration/measurement the checked
Item paints the same selected surface; the first indicator placement does not
animate from the origin. Public data-slot overrides do not change host ownership.
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
`--brick-segment-group-selected-foreground`,
`--brick-segment-group-focus-ring`, `--brick-segment-group-divider`, and
`--brick-segment-group-divider-inset`.

Root exposes `data-size`, `data-tone` and `data-full-width`; Item exposes
`data-icon-only` alongside Atom's state and value attributes.

## Customization

Prefer `size`, `tone`, `radius` and `fullWidth`, then public component variables. Keep the
Indicator visibly distinct, preserve focus, and do not place accessible text
on Indicator.

For a local custom indicator, override `--brick-segment-group-indicator-background`
and `--brick-segment-group-selected-foreground` together on Root. The public
`--brick-segment-group-indicator-shadow` override can remove elevation. These
instance extensions take precedence over tone and must preserve readable contrast;
they do not require changing a global theme. Invalid state is independent of tone.

Controlled form-library adapters bind `value` and `onValueChange` (a string,
not an event or details object). Put `name` on Root for native submission.
Do not render an additional hidden input. A form-library dependency is not
required by Brick; use the adapter supplied by your application.

## Responsive behavior

Root stays intrinsic by default and can fill its allocated width with
`fullWidth`. Items remain ordered at narrow widths and zoom. Indicator
remeasures after layout and font changes. Logical geometry and Atom keyboard
direction support RTL. Wrap long labels in `SegmentGroup.ItemText` so the
finished text can break within its measured segment instead of painting into a
neighbor.

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
