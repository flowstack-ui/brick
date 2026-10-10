# Tree

Tree presents a one-dimensional hierarchy with Atom-owned focus, keyboard,
selection, expansion, typeahead, direction, form, and accessibility behavior.
Brick supplies a finished content row, decorative indicator, recipes, depth,
guides, states, motion, and customization hooks.

## When and where to use

Use Tree to browse or select nested categories, files, or component groups.

## When not to use

Use Tree Grid for hierarchical rows with navigable columns, Data Grid for flat
interactive tabular data, List for static hierarchy, and Accordion or
Collapsible for arbitrary disclosure content. Applications own records, routing,
persistence, drag/drop and windowing. Atom supplies checking, abortable lazy-load
lifecycle, collection filtering and an opt-in interaction mode for native links
and application-owned rename controls.

## Installation and imports

Windowing is an optional application integration. The windowing example uses
`@tanstack/react-virtual`; install it separately when copying that example.
Keep complete logical hierarchy metadata and retain the active target and
pending reveal target in the mounted range. Brick does not bundle a virtualizer.

```tsx
import { Tree } from "@flowstack-ui/brick";
// or import { Tree } from "@flowstack-ui/brick/tree";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/tree.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Tree.Root aria-label="Repository" defaultExpandedValue={["src"]}>
  <Tree.Item value="src">
    <Tree.ItemContent>
      <Tree.Indicator />
      <Tree.ItemText>src</Tree.ItemText>
    </Tree.ItemContent>
    <Tree.Group>
      <Tree.Item value="index">
        <Tree.ItemContent>
          <Tree.Indicator />
          <Tree.ItemText>index.ts</Tree.ItemText>
        </Tree.ItemContent>
      </Tree.Item>
    </Tree.Group>
  </Tree.Item>
</Tree.Root>
```

## Anatomy and DOM ownership

Root, Item, ItemText, and Group adapt Atom `div`, `div`, `span`, and `div`
parts. ItemContent is Brick's required visual `div` row; Group is its sibling
so state paint cannot include descendants. Indicator is a decorative `span`
with stable space and default chevron artwork. Nest Items only inside Group.

## API

### Exports

`Tree`, `TreeRoot`, `TreeItem`, `TreeItemContent`, `TreeIndicator`,
`TreeItemText`, `TreeGroup`, `TreeRootProps`, `TreeItemProps`,
`TreeItemContentProps`, `TreeIndicatorProps`, `TreeItemTextProps`,
`TreeGroupProps`, `TreeRootProvider`, `TreeRootProviderProps`, `TreeTrigger`, `TreeTriggerProps`, `TreeCheckbox`,
`TreeCheckboxProps`, `createTreeCollection`, `useTreeController`, `useTreeContext`,
`useTreeItemContext`, `TreeNode`, `TreeCollection`, `TreeVariant`, `TreeSize`,
`TreeDensity`, `TreeTone`, `TreeSelectionVariant`, and `TreeBorderTone` are available from root and
subpath imports.

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `plain`, `soft`, `outline` | defaults to `"plain"` |
| `size` | `xs`, `sm`, `md` (responsive) | `md` |
| `density` | `compact`, `comfortable` (responsive) | `comfortable` |
| `tone` | `neutral`, `accent` | `neutral` |
| `selectionVariant` | `subtle`, `solid` | `subtle` |
| `showGuide` | boolean | defaults to `false` |
| `borderTone` | `subtle`, `default`, `strong` | defaults to `"default"` |

Atom selection, expansion, `multiple`, disabled/read-only, required/invalid,
`loop`, name/form, direction, composition, native props, events, and refs are
forwarded. Brick Tree is vertical-only and omits Atom `orientation`. Boundary
navigation is bounded by default; opt into wrapping with `loop`.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Plain leaves the root transparent, soft adds a subtle root surface, and
outline adds a clipped rounded boundary. ItemContent owns hover, active focus,
selected, and disabled paint. Active focus is an inset ring independent of the
selection fill. Indicator is optional: omit it for folder/file artwork without
an extra chevron column. When explicitly composed, it rotates when expanded;
leaves retain its space but hide the artwork. `showGuide` defaults to false and
draws decorative logical-start group lines aligned with a 16px artwork column.
Use `--brick-tree-guide-offset` for custom artwork geometry and set
`--brick-tree-depth-indent: 0px` only for deliberately unindented trees.

### Keyboard and selection

Root is one focus stop with an active descendant. On entry Atom activates the
first visible selected item, then the first enabled visible item. Up/Down,
Home/End, expand/collapse arrows, activation, and typeahead follow Atom's Tree
contract. Selection does not follow focus. Set `selectionMode="none"` for
disclosure-only trees. `Item.selectable={false}` preserves navigation and
expansion but omits selection. In multiple mode, plain click replaces selection,
Ctrl/Command-click toggles an item, and Shift+click/Space or Shift+navigation
extends a visible eligible range. Ctrl/Command+A toggles eligible visible nodes.
Checking uses solid checkmark paint independent of the row selection variant.

Set `Item.interactive` for links, buttons or editors. Enter/F2 enters owned
controls, Escape returns to Root, and text-editing/IME keys remain native.
Applications own rename draft, validation, commit/cancel and persistence.
Use `Trigger` with `expandOnClick={false}` for independent disclosure.
When only parents have a leading Trigger and child icons or checkboxes should
align with the parent's matching column, set `--brick-tree-depth-indent` to
`calc(var(--brick-tree-trigger-size) + var(--brick-tree-row-gap))` on Root.
This accounts for the complete disclosure column without empty leaf triggers
or changing the default indentation of icon-only trees.

### Checking, loading and controllers

`checkable`, `checkedValue`/`defaultCheckedValue`/`onCheckedValueChange` and
`checkPropagation="descendants"` control checking independently from selection.
Supply a complete `createTreeCollection(nodes)` for unmounted descendants;
disabled branches are excluded. `Tree.Checkbox` shows mixed state. `name` submits
selection, not checked values; submit checked values explicitly when required.

`loadChildren(value, { signal })` owns an abortable request per branch. The
application inserts loaded children and respects the signal. Public context
exposes `loadingValues`, `loadErrors` and `retryLoad`; failed loads require retry.
Use empty `children: []` for a known empty branch, not an unknown unloaded one.

`useTreeController({ collection, ...props })` exposes controlled `rootProps`,
state setters, `expandAll`, `collapseAll`, and `getNodeState`. Spread `rootProps`
onto Root, or pass the controller to RootProvider.value. Collections provide `find`, `visible`, ancestor-retaining `filter`,
immutable `remove` and `update`. Stable unique values are mandatory.

`Group.animate` opts into measured height motion. Closing content becomes inert
immediately; `forceMount` retains hidden DOM and `onExitComplete` reports exit.

## Tokens and CSS hooks

Stable classes are `.brick-tree`, `.brick-tree__item`,
`.brick-tree__item-content`, `.brick-tree__indicator`,
`.brick-tree__item-text`, and `.brick-tree__group`; matching slots are `tree`,
`tree-item`, `tree-item-content`, `tree-indicator`, `tree-item-text`, and
`tree-group`. Public state hooks include `data-variant`, `data-size`,
`data-guide`, `data-border-tone`, `data-slot`, and Atom state attributes.

Public variables:

- `--brick-tree-background`
- `--brick-tree-border-color`
- `--brick-tree-border-width`
- `--brick-tree-radius`
- `--brick-tree-padding`
- `--brick-tree-row-min-block-size`
- `--brick-tree-row-radius`
- `--brick-tree-row-gap`
- `--brick-tree-row-padding-block`
- `--brick-tree-row-padding-inline`
- `--brick-tree-depth-indent`
- `--brick-tree-guide-color`
- `--brick-tree-guide-offset`
- `--brick-tree-foreground`
- `--brick-tree-indicator-color`
- `--brick-tree-hover-background`
- `--brick-tree-active-background`
- `--brick-tree-selected-background`
- `--brick-tree-selected-foreground`
- `--brick-tree-disabled-opacity`
- `--brick-tree-focus-ring`
- `--brick-tree-focus-ring-width`
- `--brick-tree-motion-duration`
- `--brick-tree-motion-easing`

## Customization

Choose a recipe first, then override public variables on a local scope.
ItemContent accepts authored leading icons and trailing metadata. Custom
Indicator children replace the chevron and remain hidden from assistive
technology.

## Responsive behavior

Root is inline-size bounded. Long text wraps within ItemContent. Indentation,
guide placement, metadata alignment, and the closed chevron use logical
direction and mirror in RTL. The open chevron remains downward.

## Accessibility

Provide a stable accessible name with Field, `aria-label`, or
`aria-labelledby`. Atom owns tree roles, levels, names, relationships, focus,
keyboard, selection, expansion, states, and forms. Brick keeps active and
selected visually distinct, makes indicators and guides decorative, removes
transitions for reduced motion, and retains forced-color boundaries. Comfortable
density keeps 44px minimum rows; compact xs/sm/md target 24/28/32px independently
of responsive typography. Size, density and variant support sparse breakpoints.

## Composition, native props, and refs

Atom-backed parts preserve their composition, native props, events, slots,
and exact refs. ItemContent and Indicator forward native props and refs to
their Brick-authored elements. Import Atom directly for raw composition that
does not use the required Brick ItemContent row.

## Examples

The quick start is canonical. Use controlled `value`/`onValueChange` for
application-owned selection and controlled `expandedValue` when expansion
must be observed or restored.

## Evidence

- [Unit tests](../../../test/components/tree/tree.test.tsx)
- [Type tests](../../../test/types/components/tree.test.ts)
- [Playground source](../../../playground/src/components/tree/)
- [Browser behavior](../../../playground/tests/components/tree/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/tree/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/tree.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
