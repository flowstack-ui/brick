# Group

Group creates a compact inline visual cluster and can attach direct children
without changing their semantics or keyboard behavior.

## When and where to use

Use Group when Buttons, IconButtons, fields, or mixed bordered components need
one compact cluster. Enable `attached` when they should share outside logical
corners and one continuous border silhouette.

## When not to use

Use HStack or Stack for ordinary application layout, general page layout. Use Toolbar for one named roving-focus command set,
ToggleGroup for pressed selection, and Fieldset for form-group semantics. Use
List, Grid, DataList, or Stack for tags, skills, social destinations, profile
facts, or responsive actions; those are content collections, not an attached
control silhouette.

## Installation and imports

Import `Group` from `@flowstack-ui/brick` or
`@flowstack-ui/brick/group`, and load
`@flowstack-ui/brick/styles.css` once.

For a measured route-aware build, load the shared foundation and every
composed component stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/group.css";
import "@flowstack-ui/brick/styles/icon-button.css";
```

Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<Group aria-label="History controls" attached role="group">
  <IconButton aria-label="Previous item" variant="outline" />
  <IconButton aria-label="Add item" variant="outline" />
  <IconButton aria-label="Next item" variant="outline" />
</Group>
```

## Anatomy and DOM ownership

Group renders one native `div` by default or a deliberate `span`. It renders
no inner wrapper and adds no role or accessible name. By default it styles rendered direct children. With skip or stacking, it flattens fragments and annotates participating React elements.
Rendered direct elements are the visual items. Refs target the selected host.

## API

| Prop          | Values                          | Default      |
| ------------- | ------------------------------- | ------------ |
| `as`          | `div`, `span`                   | `div`        |
| `orientation` | Responsive `horizontal`, `vertical` | `horizontal` |
| `gap`         | Responsive Brick spacing value  | `2`          |
| `attached`    | boolean                         | `false`      |
| `grow`        | Responsive boolean              | `false`      |
| `slot`        | Brick `data-slot` hook override | `group`      |

Public exports are `Group`, `GroupProps`, `GroupElement`, and
`GroupOrientation`, `GroupAlign`, `GroupJustify`, `GroupWrap`, and `GroupStacking`.

### Expanded layout and composition

| Prop | Values | Default |
| --- | --- | --- |
| `align` | ResponsiveValue<GroupAlign>: start, end, center, stretch, baseline | center |
| `justify` | ResponsiveValue<GroupJustify>: start, end, center, space-between, space-around, space-evenly | start |
| `wrap` | ResponsiveValue<GroupWrap>: nowrap, wrap, wrap-reverse | nowrap |
| `stacking` | GroupStacking: first-on-top, last-on-top | native order |
| `skip` | (child: ReactElement) => boolean | unset |
| `asChild` | boolean | false |

asChild merges onto one non-Fragment element and excludes as. Child and owner
refs/events/styles are preserved. With skip or stacking, the composed host's
children are annotated. Custom children must forward data attributes and style
to their actual visual host. Returning multiple hosts cannot represent one item.

skip leaves excluded content in place but omits its attachment and growth.
Hidden elements are not automatically skipped; filter them or supply skip when
that is intended. Fragments flatten with stable keyed identities in managed
mode. Group never removes content based on selection or visibility policy.

Stacking is local. Hover rises above the default stack and focus above hover.
Internal markers are data-managed, data-group-item, data-group-first,
data-group-last, data-group-skip and data-stacking. New input/resolved variables
are private; existing gap and overlap hooks remain public.

## Visual recipes and states

Detached Group uses tokenized spacing and retains each child's complete
silhouette. Attached Group sets the effective gap to zero, overlaps adjacent
borders by one Brick border width, and removes only joined logical corner
radii. First and last children retain their authored outside radii.

Hover and focus only change stacking order so adjacent borders cannot cover
the active child's own paint. Group never changes a child's color, background,
border, variant, size, disabled state, focus ring, or motion.

## Tokens and CSS hooks

Stable hooks are `.brick-group`, `data-slot="group"`, `data-slot`,
`data-orientation`, `data-attached`, and `data-grow`.

Public variables are `--brick-group-gap` and `--brick-group-overlap`.
Customize overlap only when coordinating a deliberate child border width.

## Customization

Prefer the public Group variables for relationship geometry and child
component recipes for paint. Native `className` and `style` pass through when
an application needs a deliberate local value. Do not use Group variables to
resize, recolor, or restyle its children.

## Responsive behavior

Group is content-sized and non-wrapping by default. Orientation, gap, grow,
align, justify and wrap support sparse initial/sm/md/lg/xl responsive values.
Attached wrapping follows source-order corners, not visual row edges.
Prefer detached wrapping when one continuous silhouette cannot fit.

## Accessibility

Group adds no role, label, selection, or keyboard behavior. Ordinary controls
remain separate Tab stops. Author `role="group"` and an accessible name when
the cluster is one meaningful accessibility relationship. IconButton children
still require individual accessible names.

Group does not clip child focus outlines. Logical attachment works in RTL and
vertical writing modes, and Group adds no paint that could interfere with
forced colors.

## Composition, native props, and refs

Place the intended bordered elements directly inside Group. A wrapper becomes
the visual item. Native and ARIA attributes, events, `className`, `style`, and
the host ref pass through. The `slot` prop follows Brick's layout convention
and overrides `data-slot`; it is not forwarded as the native HTML `slot`
attribute.

## Examples

```tsx
<Group attached orientation="vertical">
  <Button variant="outline">Move up</Button>
  <Button variant="outline">Move down</Button>
</Group>

<Group grow>
  <Button variant="outline">Draft</Button>
  <Button variant="outline">Published</Button>
</Group>
```

## Evidence

- [Playground source](../../../playground/src/components/group/)
- [Unit tests](../../../test/components/group/group.test.tsx)
- [Type tests](../../../test/types/components/group.test.ts)
- [Browser behavior](../../../playground/tests/components/group/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/group/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/group.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
