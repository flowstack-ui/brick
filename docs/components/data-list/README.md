# Data List

Data List presents repeated term/value metadata with native description-list
semantics and responsive Brick recipes.

## When and where to use

Use Data List for profile facts, record metadata, specifications, and related
attributes describing one object. It owns visible labels, values, a shared
label measure, optional separators, and vertical or horizontal composition.

## When not to use

Use List for peer items, Table or Data Grid for columnar datasets, and Field
or Fieldset for editable values. Do not use Group or generic Stack rows to
approximate description-list semantics.

## Installation and imports

```tsx
import { DataList } from "@flowstack-ui/brick/data-list";
import "@flowstack-ui/brick/styles.css";
```

For a measured route-aware build, load the foundation once and the component
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/data-list.css";
```

Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<DataList.Root orientation={{ initial: "vertical", md: "horizontal" }}>
  <DataList.Item>
    <DataList.Label>Email</DataList.Label>
    <DataList.Value>maya@example.com</DataList.Value>
  </DataList.Item>
</DataList.Root>
```

## Anatomy and DOM ownership

Root renders `dl`. Item renders the permitted grouping `div`; Label and Value
render `dt` and `dd`. Refs target those exact elements. Root adds no landmark,
name, state, or interaction behavior.

## API

| Part or prop | Values | Default |
| --- | --- | --- |
| `size` | responsive `sm`, `md`, `lg` | `md` |
| `variant` | responsive `subtle`, `bold` | `subtle` |
| `orientation` | responsive `vertical`, `horizontal` | `vertical` |
| `labelWidth` | responsive `auto`, `sm`, `md`, `lg` | `auto` |
| `divide` | boolean | `false` |
| `slot` | string | `data-list-root` |
| Parts | `Root`, `Item`, `Label`, `Value`, `PropsProvider` | — |

Public exports are `DataList`, `DataListRoot`, `DataListRootProps`,
`DataListItem`, `DataListItemProps`, `DataListLabel`, `DataListLabelProps`,
`DataListValue`, `DataListValueProps`, `DataListSize`,
`DataListOrientation`, `DataListLabelWidth`, `DataListVariant`, `DataListRecipeProps`,
`DataListPropsProvider`, and `DataListPropsProviderProps`.

## Visual recipes and states

Size selects 12/14/16px default-theme text with 12/16/20px item rhythm for sm/md/lg.
Compact size/leading shares the semantic menu text metrics (12/16, 14/20 and
16/24px); label/value emphasis keeps its separate semantic weight roles.
Subtle mutes labels; bold emphasizes labels and mutes values. Horizontal orientation
aligns each Item into two logical columns; vertical stacks its source order.
Labels and values stay 4px apart vertically; horizontal columns have a 16px gap.
`divide` adds borders between visible Items without changing semantics.

## Tokens and CSS hooks

Stable hooks are `.brick-data-list`, `.brick-data-list__item`,
`.brick-data-list__label`, `.brick-data-list__value`, and their `data-slot`
values. Root exposes `data-divide`, `data-label-width`, `data-orientation`,
`data-size`, `data-variant`, their responsive suffixes, and `data-slot`. Public variables include `--brick-data-list-gap`,
`--brick-data-list-item-gap`, `--brick-data-list-label-size`,
`--brick-data-list-divider-color`, `--brick-data-list-column-gap`,
`--brick-data-list-label-gap`, `--brick-data-list-label-color`,
`--brick-data-list-value-color`, `--brick-data-list-label-weight`, and
`--brick-data-list-value-weight`.

`--brick-data-list-label-size` accepts a CSS length/percentage, including when
labelWidth is auto. Measures are capped at 40% of the item to preserve the value
column. Auto prefers 120px; sm/md/lg prefer 96/144/192px. Long words wrap.

## Customization

Prefer size, orientation, labelWidth, and divide before changing public
variables. Use native `className` or `style` only for a deliberate local
relationship. Do not restyle private descendants or add redundant ARIA roles.

## Responsive behavior

Size, variant, labelWidth and orientation accept Brick responsive values. Sparse
maps start at component defaults. Keep one Label-then-Value source
tree and switch only presentation. Long values wrap and horizontal layouts
return to a vertical composition at the authored narrow breakpoint.

## Accessibility

Native `dl`, `dt`, and `dd` semantics describe the relationship without ARIA
repair. Every Item needs meaningful visible Label and Value content. Links and
other content inside Value retain their own native behavior.

## Composition, native props, and refs

Place one or more Label parts before one or more Value parts inside each Item.
Root, Item, Label, and Value merge native attributes, ARIA, events,
`className`, `style`, and exact refs. The `slot` prop controls `data-slot` and
does not claim the native HTML slot attribute.

Fixed native hosts are intentional; there is no as/asChild/unstyled API.
PropsProvider takes `value: DataListRecipeProps` and children, emits no host,
and supplies recipe defaults. Explicit Root props win (including divide=false).
An explicit responsive map replaces, rather than merges with, the provider map.
Nested providers inherit omitted keys. Nested Roots otherwise reset to their
own defaults. Compose ToggleTip in Label for optional context and Badge, Status,
Link or formatters in Value; Data List does not add interaction or status tones.

## Examples

```tsx
<DataList.Root divide labelWidth="sm" orientation="horizontal" size="sm">
  <DataList.Item>
    <DataList.Label>Location</DataList.Label>
    <DataList.Value>Toronto, Canada</DataList.Value>
  </DataList.Item>
  <DataList.Item>
    <DataList.Label>Availability</DataList.Label>
    <DataList.Value>Accepting projects</DataList.Value>
  </DataList.Item>
</DataList.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/data-list/)
- [Unit tests](../../../test/components/data-list/)
- [Type tests](../../../test/types/components/data-list.test.ts)
- [Browser behavior](../../../playground/tests/components/data-list/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/data-list/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/data-list.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
