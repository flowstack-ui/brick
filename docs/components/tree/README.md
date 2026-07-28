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
Collapsible for arbitrary disclosure content. Tree does not own loading,
filtering, links, checking, rename, drag/drop, virtualization, context menus,
routing, or persistence.

## Installation and imports

```tsx
import { Tree } from "@flowstack-ui/brick";
// or import { Tree } from "@flowstack-ui/brick/tree";
import "@flowstack-ui/brick/styles.css";
```

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
`TreeGroupProps`, `TreeVariant`, and `TreeSize` are available from root and
subpath imports.

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `plain`, `soft`, `outline` | defaults to `"plain"` |
| `size` | `sm`, `md` | defaults to `"md"` |
| `showGuide` | boolean | defaults to `false` |

Atom selection, expansion, `multiple`, disabled/read-only, required/invalid,
`loop`, name/form, direction, composition, native props, events, and refs are
forwarded. Brick Tree is vertical-only and omits Atom `orientation`. Boundary
navigation is bounded by default; opt into wrapping with `loop`.

## Visual recipes and states

Plain leaves the root transparent, soft adds a subtle root surface, and
outline adds a clipped rounded boundary. ItemContent owns hover, active focus,
selected, and disabled paint. Active focus is an inset ring independent of the
selection fill. Indicator rotates when expanded; leaves retain its space but
hide the artwork. `showGuide` draws decorative logical-start group lines.

### Keyboard and selection

Root is one focus stop with an active descendant. On entry Atom activates the
first visible selected item, then the first enabled visible item. Up/Down,
Home/End, expand/collapse arrows, activation, and typeahead follow Atom's Tree
contract. Selection does not follow focus. Interactive descendants are not
supported; compose actions outside Tree.

## Tokens and CSS hooks

Stable classes are `.brick-tree`, `.brick-tree__item`,
`.brick-tree__item-content`, `.brick-tree__indicator`,
`.brick-tree__item-text`, and `.brick-tree__group`; matching slots are `tree`,
`tree-item`, `tree-item-content`, `tree-indicator`, `tree-item-text`, and
`tree-group`. Public state hooks include `data-variant`, `data-size`,
`data-guide`, `data-slot`, and Atom state attributes.

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
transitions for reduced motion, and retains forced-color boundaries. `md` is
the ordinary touch-usable size; `sm` is compact-density usage.

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
