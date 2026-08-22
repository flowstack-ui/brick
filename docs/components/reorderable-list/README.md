# Reorderable List

Reorderable List is Brick's finished manual-order composition, backed by the
published `@flowstack-ui/atom@0.23.0` Reorder behavior.

## When and where to use

Use it when a person deliberately arranges a small linear collection into an
order the application will save, such as deployment steps, dashboard sections,
or priority rules.

## When not to use

Use List for static content, Data Grid for automatic tabular sorting, and a
dedicated Kanban, tree, spatial, or file-transfer composition when items move
between containers, parents, coordinates, or applications.

## Installation and imports

```tsx
import { ReorderableList } from "@flowstack-ui/brick/reorderable-list";
import "@flowstack-ui/brick/styles.css";
```

For a measured route-aware build, load core once and the component stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/reorderable-list.css";
```

Public exports include `ReorderableList`, `ReorderableListRoot`,
`ReorderableListItem`, `ReorderableListHandle`, `ReorderableListContent`,
`ReorderableListActions`, `ReorderableListMoveBefore`,
`ReorderableListMoveAfter`, `ReorderableListMoveToStart`,
`ReorderableListMoveToEnd`, and `ReorderableListDropIndicator`. Public types
include `ReorderableListRootProps`, `ReorderableListItemProps`,
`ReorderableListHandleProps`, `ReorderableListContentProps`,
`ReorderableListActionsProps`, `ReorderableListMoveProps`,
`ReorderableListDropIndicatorProps`, `ReorderableListSize`, and
`ReorderableListVariant`.

## Quick start

```tsx
const [items, setItems] = useState(["connect", "configure", "verify"]);
const labels = { connect: "Connect source", configure: "Configure deployment", verify: "Verify setup" };

<ReorderableList.Root
  items={items}
  getItemLabel={(value) => labels[value]}
  onItemsChange={setItems}
>
  {items.map((value) => (
    <ReorderableList.Item key={value} value={value}>
      <ReorderableList.Handle aria-label={`Reorder ${labels[value]}`}>⋮⋮</ReorderableList.Handle>
      <ReorderableList.Content>{labels[value]}</ReorderableList.Content>
      <ReorderableList.Actions>
        <ReorderableList.MoveBefore aria-label={`Move ${labels[value]} earlier`}>↑</ReorderableList.MoveBefore>
        <ReorderableList.MoveAfter aria-label={`Move ${labels[value]} later`}>↓</ReorderableList.MoveAfter>
      </ReorderableList.Actions>
      <ReorderableList.DropIndicator />
    </ReorderableList.Item>
  ))}
</ReorderableList.Root>
```

## Anatomy and DOM ownership

`Root` renders an ordered list. `Item` renders a list item. `Handle`,
`MoveBefore`, `MoveAfter`, `MoveToStart`, and `MoveToEnd` render buttons by
default. `Content` and `Actions` render divs. `DropIndicator` renders a
decorative span. Root, Item, Handle, movement controls, and DropIndicator
preserve Atom composition props and exact refs.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `outline`, `soft` | `outline` |

Root also requires `items`, `getItemLabel`, and `onItemsChange`, and forwards
Atom's `orientation`, `disabled`, `readOnly`, `instructions`, localized
`messages`, native ordered-list props, and composition escape hatches. Item
requires a stable `value`. Handle and movement controls require authored
localized `aria-label` values.

Named exports cover the complete namespace anatomy and their corresponding
public prop, size, and variant types.

## Visual recipes and states

Outline draws an item boundary; soft uses a quieter filled item surface. Size
changes spacing while every interaction target remains at least 44px. Atom
state attributes drive dragging, valid insertion targets, disabled, read-only,
orientation, and movement availability.

## Tokens and CSS hooks

Stable classes are `.brick-reorderable-list`, `__item`, `__handle`, `__content`,
`__actions`, `__move`, and `__drop-indicator`. Root exposes `data-size`,
`data-variant`, `data-orientation`, `data-disabled`, and `data-readonly`. Every
public part exposes `data-slot`. Atom also exposes item dragging, target,
position, and unavailable-control state.

Public variables are `--brick-reorderable-list-gap`,
`--brick-reorderable-list-item-background`,
`--brick-reorderable-list-item-border`,
`--brick-reorderable-list-item-radius`,
`--brick-reorderable-list-item-padding-block`,
`--brick-reorderable-list-item-padding-inline`,
`--brick-reorderable-list-item-gap`,
`--brick-reorderable-list-item-shadow`,
`--brick-reorderable-list-target-background`,
`--brick-reorderable-list-handle-background`,
`--brick-reorderable-list-handle-background-hover`,
`--brick-reorderable-list-control-foreground`,
`--brick-reorderable-list-control-foreground-hover`,
`--brick-reorderable-list-control-size`,
`--brick-reorderable-list-control-radius`,
`--brick-reorderable-list-action-gap`,
`--brick-reorderable-list-content-min-inline-size`,
`--brick-reorderable-list-focus-ring`,
`--brick-reorderable-list-indicator-color`,
`--brick-reorderable-list-indicator-size`,
`--brick-reorderable-list-dragging-opacity`,
`--brick-reorderable-list-transition-duration`, and
`--brick-reorderable-list-horizontal-item-min-inline-size`.

## Customization

Prefer recipes, then scope public variables for a deliberate exception:

```tsx
<ReorderableList.Root
  items={items}
  getItemLabel={getItemLabel}
  onItemsChange={setItems}
  style={{
    "--brick-reorderable-list-indicator-color": "var(--brick-color-success-solid)",
    "--brick-reorderable-list-item-radius": "var(--brick-radius-full)",
  }}
>
  {/* Items */}
</ReorderableList.Root>
```

## Responsive behavior

Vertical items keep controls content-sized while content receives the flexible
track and wraps first. When the list's own container becomes narrow, direct
movement actions move below the content so the editable or descriptive region
keeps a useful measure. This follows the component's allocated width rather than the viewport,
so the same behavior works in pages, cards, drawers, and sidebars. Horizontal
orientation becomes an intentionally scrollable single row rather than
squeezing each item below a useful measure. Logical insertion edges and source
order follow direction. Zoom and long localized content must not create
page-level horizontal overflow.

## Accessibility

Atom owns lift, target movement, commit, cancellation, pointer and touch
movement, focus preservation, direct movement, unavailable states, and live
announcements. Space lifts or drops, arrow keys move the active target, Escape
cancels, and direct movement buttons provide an equivalent non-drag path.
Authors provide human item labels and localized control names. Read-only keeps
the collection understandable without implying a successful reorder; disabled
removes interaction.

## Composition, native props, and refs

The application owns data objects, persistence, Undo, optimistic updates,
server conflicts, validation, analytics, and automatic sorting. Use stable
item values rather than array indexes and update application order from
`onItemsChange`. Root and Item preserve Atom `render` and `asChild`; their
composed hosts must remain valid ordered-list and list-item elements. Classes,
styles, data attributes, ARIA, native events, and refs merge on every owning
part. Content and Actions forward div attributes and refs.

## Examples

### Read-only policy order

```tsx
<ReorderableList.Root
  items={items}
  getItemLabel={getItemLabel}
  onItemsChange={setItems}
  readOnly
>
  {items.map((value) => (
    <ReorderableList.Item key={value} value={value}>
      <ReorderableList.Handle aria-label={`Reorder ${getItemLabel(value)}`}>⋮⋮</ReorderableList.Handle>
      <ReorderableList.Content>{getItemLabel(value)}</ReorderableList.Content>
      <ReorderableList.DropIndicator />
    </ReorderableList.Item>
  ))}
</ReorderableList.Root>
```

### Horizontal sequence

```tsx
<ReorderableList.Root
  items={items}
  getItemLabel={getItemLabel}
  onItemsChange={setItems}
  orientation="horizontal"
>
  {/* Same item anatomy */}
</ReorderableList.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/reorderable-list/)
- [Unit tests](../../../test/components/reorderable-list/)
- [Type tests](../../../test/types/components/reorderable-list.test.ts)
- [Browser behavior](../../../playground/tests/components/reorderable-list/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/reorderable-list/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/reorderable-list.md)
- [Packed consumer composition](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
