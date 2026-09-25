# Record selection and primary actions

Use native Table for column comparison, List for records without columns, and
Card with Grid/Stack for galleries. Selection does not require DataGrid. Choose
DataGrid when users need its composite active-cell keyboard model.

Import `useSelection`, `useSelectionCheckbox` and `ActionDelegate` from Brick
or the `selection` and `action-delegate` subpaths. These are public Atom-backed
utilities with no extra DOM or CSS. Keep the styles of the rendered Table,
List, Card, Checkbox and actions loaded normally.

```tsx
const selection = useSelection({ orderedKeys: records.map(record => record.id) });
```

Call `useSelectionCheckbox({ selection, value: record.id, rangeSelection: true })`
inside a row component and spread the returned props onto `Checkbox` (or
`Checkbox.Control` in the compound anatomy, not its Field-like `Checkbox.Root`).
Do not call hooks inside `For` callbacks. Give each checkbox a meaningful name
such as “Select invoice 1042”. Use `selected={selection.isSelected(record.id)}`
on `Table.Row`, `List.Item` or `Card.Root`. This prop adds visual state only,
not `aria-selected`, a role or a new tab stop. The Checkbox carries the state.

## State contract

`orderedKeys` is required: unique nonempty string IDs in the current display
order. `mode` defaults to `multiple`, or use `single` for at most one ID.
`selectedKeys` controls state; otherwise `defaultSelectedKeys` initializes it.
`onSelectionChange` receives a new immutable array. `disabled`, `readOnly` and
`disabledKeys` prevent user selection changes. Defaults are false and empty.

State exposes `selectedKeys`, `isSelected`, `canSelect`, `setSelected`, `toggle`,
`setSelection`, `clearSelection`, `selectRange`, `setScopeSelected` and
`getScopeState`. Scope state is `none`, `some` or `all`, excluding disabled IDs.
An empty eligible scope is `none`. Name scope selection explicitly: “Select
this page”. Offscreen IDs survive filtering, sorting, paging and unmounting.
After deletion, call `setSelection` with reconciled IDs. There is no implicit
all-server-results selection or form submission.

The Checkbox adapter's `rangeSelection` defaults false. When enabled,
Shift-click and Shift+Space extend from the last ordinary activation, skipping
disabled records. Changing display order or selection mode resets that anchor.
The adapter is for Brick Checkbox, not arbitrary native input props. Changing
to single mode requires reconciling any multiple selected IDs first.

## Primary actions

```tsx
<ActionDelegate targetId="open-invoice-1042">
  <Table.Row selected={selection.isSelected("1042")}>
    <Table.Cell>
      <Link id="open-invoice-1042" href="/invoices/1042">Invoice 1042</Link>
    </Table.Cell>
  </Table.Row>
</ActionDelegate>
```

`targetId` points to a real visible descendant link, button or checkbox.
`children` is one non-Fragment element; `disabled` defaults false. Forwarded
refs still target the host. Background clicks activate only this target;
the actual control remains keyboard accessible. Target a checkbox instead when
background clicks should select, never select and open simultaneously.

Independent controls, portals, selected text, cancelled events, drag, and
modified/middle clicks do not delegate. Consumer `preventDefault()` cancels
delegation. Use `data-action-delegate-ignore` for custom interactive regions.
Do not nest delegates or wrap rich rows/cards in a button. Native link
modifier-click/context-menu behavior belongs to the real link, not blank space.

## Presentation and limits

### Pagination and bulk actions

Compose `Pagination.Root` alongside the collection. The application calculates
`totalPages`, controls the one-based `page`, and supplies the current page IDs
to selection. Reset or clamp the page after filtering/removal. Disable the
scope checkbox when no eligible records remain; retained off-page selection
does not mean the current page is checked.

Compose a named `ActionBar` separately from Table. Derive visibility from
selected IDs and an explicit dismissal state; use `closeOnInteractOutside={false}`
when people need to keep selecting rows. Dismissing is not clearing: provide
a way to reopen the actions and a separate clear-selection action. Confirm
destructive application operations, then reconcile IDs and restore focus to a
surviving control before removing the focused records or action bar.

The transaction playground uses these existing owners with local demo data.
It performs no remote deletion, refund or backend operation.

### Visual state

Selection paint overrides actionable hover and table striping without changing
dimensions. Hosts expose `data-selected`; enabled delegation exposes
`data-action-delegate`. Each visual owner documents its local selected and
hover variables. A checkbox/checkmark, not color alone, conveys selection.
Keep secondary actions visible and independently named. Filtering, sorting,
column visibility, bulk-action confirmation, data services and focus recovery
after removal are application workflows, not Table or selection-hook behavior.

No utility introduces listbox roles, cell navigation, virtualization, or a
server data engine. Mutually exclusive form cards still use RadioCard.
