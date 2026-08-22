# List

List presents related static content through native unordered or ordered list
semantics, finished markers and boundaries, and optional structured row
anatomy. Atom owns list semantics; Brick owns visual presentation.

## When and where to use

Use List for features, requirements, release steps, people, files, statuses,
and passive rows with independently focusable trailing actions. Use `ordered`
when changing item order would change meaning.

## When not to use

Use Nav List for destinations, Listbox or selection controls for choices,
Grid/Stack for repetition without list meaning, and a future Data List for
name/value records. List does not provide row activation, selection, routing,
reordering, virtualization, or feed behavior.

## Installation and imports

```tsx
import { List } from "@flowstack-ui/brick";
// or
import { List } from "@flowstack-ui/brick/list";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/list.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Public exports include `List`, `ListRootProps`, `ListItemProps`,
`ListLeadingProps`, `ListContentProps`, `ListTitleProps`,
`ListDescriptionProps`, `ListTrailingProps`, `ListVariant`, `ListSize`,
`ListDensity`, and `ListMarker`.

## Quick start

```tsx
<List.Root>
  <List.Item>Package build</List.Item>
  <List.Item>Browser checks</List.Item>
  <List.Item>Release notes</List.Item>
</List.Root>
```

## Anatomy and DOM ownership

```tsx
<List.Root>
  <List.Item>
    <List.Leading />
    <List.Content>
      <List.Title />
      <List.Description />
    </List.Content>
    <List.Trailing />
  </List.Item>
</List.Root>
```

| Part | Default element | Ref | Responsibility |
| --- | --- | --- | --- |
| `List.Root` | `ul`, or `ol` when ordered | `HTMLUListElement \| HTMLOListElement` | native list plus recipes |
| `List.Item` | `li` | `HTMLLIElement` | native item and disabled metadata |
| `List.Leading` | `span` | `HTMLSpanElement` | optional leading visual |
| `List.Content` | `div` | `HTMLDivElement` | flexible title/description column |
| `List.Title` | `span` | `HTMLSpanElement` | primary item text |
| `List.Description` | `span` | `HTMLSpanElement` | supporting item text |
| `List.Trailing` | `div` | `HTMLDivElement` | optional passive/status/action region |

Item contains a private row wrapper so native markers and structured grid
layout can coexist. It is not a public part or customization hook.

## API

### Root

| Prop | Values | Default |
| --- | --- | --- |
| `ordered` | boolean | `false` |
| `variant` | `plain`, `divided`, `bordered` | `plain` |
| `size` | `sm`, `md`, `lg` | `md` |
| `density` | `compact`, `comfortable` | `comfortable` |
| `marker` | `auto`, `disc`, `circle`, `square`, `decimal`, `lower-alpha`, `upper-alpha`, `lower-roman`, `upper-roman`, `none` | `auto` |

Root preserves Atom `render`, `asChild`, slots, refs, and native attributes.
Native ordered-list `start`, `reversed`, and `type` pass through. `auto` uses
disc for unordered and decimal for ordered roots.

### Item and structured parts

Item preserves Atom `disabled`, `render`, `asChild`, native item attributes
including `value`, and its ref. Disabled adds `aria-disabled` and
`data-disabled` but does not suppress events. Passive parts forward their
native attributes, data/ARIA attributes, classes, styles, slots, and refs.

## Visual recipes and states

Plain has no component border. Divided adds boundaries between peer Items.
Bordered adds an outer rounded boundary and peer dividers. Size changes shared
typography and leading metrics. Density changes only vertical row space.
Marker changes only marker presentation.

Items support simple direct content or a three-column structured row. Long
Title and Description content wraps rather than truncates. Disabled changes
opacity only; List has no hover, active, selected, loading, validation, focus,
or motion state. Bordered lists keep visible native markers beside the first
content line for both simple and structured rows.

## Tokens and CSS hooks

Stable classes are `.brick-list`, `.brick-list__item`,
`.brick-list__leading`, `.brick-list__content`, `.brick-list__title`,
`.brick-list__description`, and `.brick-list__trailing`. Slots use the matching
`list`, `list-item`, `list-leading`, `list-content`, `list-title`,
`list-description`, and `list-trailing` names.

Root exposes `data-variant`, `data-size`, `data-density`, `data-marker`, and
Atom `data-ordered`. Every part exposes `data-slot`; Item exposes Atom
`data-disabled` when applicable.

Public variables:

- `--brick-list-row-gap`
- `--brick-list-row-padding-inline`
- `--brick-list-row-padding-block`
- `--brick-list-item-column-gap`
- `--brick-list-marker-style`
- `--brick-list-marker-color`
- `--brick-list-marker-gap`
- `--brick-list-border-color`
- `--brick-list-border-width`
- `--brick-list-radius`
- `--brick-list-title-color`
- `--brick-list-description-color`
- `--brick-list-leading-color`
- `--brick-list-disabled-opacity`
- `--brick-list-nested-inset`
- `--brick-list-part-align`
- `--brick-list-title-font-size`
- `--brick-list-title-line-height`
- `--brick-list-description-font-size`
- `--brick-list-description-line-height`

## Customization

Prefer recipes, then public variables for a deliberate exception:

```tsx
<List.Root
  variant="bordered"
  style={{
    "--brick-list-border-color": "var(--brick-color-accent-border)",
    "--brick-list-marker-color": "var(--brick-color-accent-solid)",
  }}
>
  <List.Item>Package build</List.Item>
</List.Root>
```

## Responsive behavior

List defines no breakpoint. Logical padding and columns follow direction.
Structured Content uses the remaining width while Leading and Trailing remain
contained. Text wraps at narrow widths and nested lists use logical
indentation. Surround List with Container, Grid, or Stack for page layout.

## Accessibility

Native `ul`, `ol`, and `li` expose relationship, item count, and sequence. Use
ordered only when sequence matters. Because marker-free CSS can hide list
semantics from WebKit's accessibility tree, `marker="none"` supplies
`role="list"` when the consumer did not author another role.

List adds no keyboard or focus behavior. A trailing control needs its own
accessible name and state. Disabled Item is descriptive only: explicitly
disable every interactive descendant separately. Forced colors retains
readable markers, supporting text, and divided/bordered boundaries.

## Composition, native props, and refs

Root and Item retain Atom `render` and `asChild`. Composed hosts must remain
valid list/list-item elements. Root children are Items; nested Root belongs
inside its owning Item. `asChild` Item uses the authored host's own internal
layout rather than Brick's private row wrapper.

Classes and styles merge. Root, Item, and passive-part refs target their
documented native elements. List never proxies props to Icon, Avatar, Badge,
Button, Card, Surface, or other composed components.

## Examples

### Ordered release steps

```tsx
<List.Root ordered start={3}>
  <List.Item>Build the package</List.Item>
  <List.Item>Verify the archive</List.Item>
  <List.Item>Publish the release</List.Item>
</List.Root>
```

### Structured status rows

```tsx
<List.Root marker="none" variant="divided">
  <List.Item>
    <List.Leading><Icon aria-hidden="true">{/* SVG */}</Icon></List.Leading>
    <List.Content>
      <List.Title>Browser checks</List.Title>
      <List.Description>Desktop and mobile checks passed.</List.Description>
    </List.Content>
    <List.Trailing><Badge>Ready</Badge></List.Trailing>
  </List.Item>
</List.Root>
```

### Nested requirements

```tsx
<List.Root ordered>
  <List.Item>
    Prepare package
    <List.Root marker="circle">
      <List.Item>Run unit checks</List.Item>
      <List.Item>Inspect browser output</List.Item>
    </List.Root>
  </List.Item>
</List.Root>
```

## Evidence

- [Playground route source](../../../playground/src/components/list/)
- [Focused component tests](../../../test/components/list/)
- [Type tests](../../../test/types/components/list.test.ts)
- [Browser behavior](../../../playground/tests/components/list/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/list/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/list.md)

## Changelog

See the [List changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
