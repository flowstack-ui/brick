# Group

Group creates a compact inline visual cluster and can attach direct children
without changing their semantics or keyboard behavior.

## When and where to use

Use Group when Buttons, IconButtons, fields, or mixed bordered components need
one compact cluster. Enable `attached` when they should share outside logical
corners and one continuous border silhouette.

## When not to use

Use HStack or Stack for ordinary application layout, responsive direction,
wrapping, or distribution. Use Toolbar for one named roving-focus command set,
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
no inner wrapper, never clones children, and adds no role or accessible name.
Rendered direct elements are the visual items. Refs target the selected host.

## API

| Prop          | Values                          | Default      |
| ------------- | ------------------------------- | ------------ |
| `as`          | `div`, `span`                   | `div`        |
| `orientation` | `horizontal`, `vertical`        | `horizontal` |
| `gap`         | Brick spacing value             | `2`          |
| `attached`    | boolean                         | `false`      |
| `grow`        | boolean                         | `false`      |
| `slot`        | Brick `data-slot` hook override | `group`      |

Public exports are `Group`, `GroupProps`, `GroupElement`, and
`GroupOrientation`.

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

Group is intentionally content-sized and non-wrapping. Attached groups remain
one continuous row or column at narrow widths and high zoom. The application
owns available width, overflow, or an alternative composition. Use Stack when
orientation or wrapping changes at application breakpoints.

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
