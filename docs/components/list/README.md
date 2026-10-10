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
Grid/Stack for repetition without list meaning, and Data List for
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
`ListDensity`, `ListAlign`, `ListInset`, and `ListMarker`.

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
A composed `asChild` li retains typography; keep normal Item composition for
Leading/Content/Trailing so the structured row wrapper remains available.
Use `density="none"` and `inset="none"` for flush typography. `gap` separates
siblings without adding an outer gap; sparse breakpoint objects use the
normal density recipe below their first breakpoint.

## API

### Root

| Prop | Values | Default |
| --- | --- | --- |
| `ordered` | boolean | `false` |
| `variant` | `plain`, `divided`, `bordered` | `plain` |
| `size` | `inherit`, `sm`, `md`, `lg` | `md` |
| `density` | `none`, `compact`, `comfortable` | `comfortable` |
| `gap` | `ResponsiveValue<SpacingValue>` | density recipe |
| `nestedInset` | `ResponsiveValue<SpacingValue>` | space-6, nested Roots only |
| `markerTone` | `TextTone` | secondary via marker color variable |
| `align` | `start`, `center`, `end` | `start` |
| `inset` | `default`, `none` | `default` |
| `marker` | `auto`, `disc`, `circle`, `square`, `decimal`, `lower-alpha`, `upper-alpha`, `lower-roman`, `upper-roman`, `none` | `auto` |

Root preserves Atom `render`, `asChild`, slots, refs, and native attributes.
Native ordered-list `start`, `reversed`, and `type` pass through. `auto` uses
disc for unordered and decimal for ordered roots, including composed `ol`
hosts. Native `type="a"`, `"A"`, `"i"`, or `"I"` chooses alphabetic or Roman
numbering when marker is auto; an explicit marker takes precedence.

`size="inherit"` preserves surrounding font family, size, weight, line height
and letter spacing through Item and canonical Content > Title/Description.
It keeps the md inline inset and the title/description color roles. For a
complete typography recipe, wrap the list with `Text as="div"`; don't merge
Text and Root onto one host, since both own `data-variant`.

`markerTone` accepts `inherit`, `primary`, `secondary`, `muted`, `accent`,
`info`, `success`, `warning`, or `danger`. It colors only native markers, not
item text or authored icons. Omission preserves `--brick-list-marker-color`;
inherit follows current text color. Set Icon's own tone for an authored icon.

### Item and structured parts

Item preserves Atom `disabled`, `render`, `asChild`, native item attributes
including `value`, and its ref. Disabled adds `aria-disabled` and
`data-disabled` but does not suppress events. Passive parts forward their
native attributes, data/ARIA attributes, classes, styles, slots, and refs.
Item also accepts `markerTone`, overriding the Root for that Item only.
All five passive parts accept `asChild`: one non-Fragment element receives
their class, slot, attributes, styles and composed ref. Keep normal Item when
using structured parts. Leading reserves at least one text line and centers
its authored visual within that line; use Icon for glyph dimensions and color.
Host projection does not add a keyboard model or generate an icon.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Plain has no component border. Divided adds boundaries between peer Items.
Bordered adds an outer rounded boundary and peer dividers. Size changes shared
typography and leading metrics. Density changes only vertical row space.
Marker changes only marker presentation. `align` changes the cross-axis
alignment shared by Leading, Content, and Trailing in structured rows; it has
no effect on simple text Items. `inset="none"` removes ordinary item inline
padding so leading content can share a logical start with adjacent content;
the default preserves size-owned List rhythm, while bordered marker geometry
remains controlled by the bordered recipe.

Items support simple direct content or a three-column structured row. Long
Title and Description content wraps rather than truncates. Disabled changes
opacity only. Item selected is presentation, and actionable hover applies only
to an ActionDelegate host. List adds no active, loading, validation, focus,
or motion behavior. Bordered lists keep visible native markers beside the first
content line for both simple and structured rows.

## Tokens and CSS hooks

Stable classes are `.brick-list`, `.brick-list__item`,
`.brick-list__leading`, `.brick-list__content`, `.brick-list__title`,
`.brick-list__description`, and `.brick-list__trailing`. Slots use the matching
`list`, `list-item`, `list-leading`, `list-content`, `list-title`,
`list-description`, and `list-trailing` names.

Root exposes `data-variant`, `data-size`, `data-density`, `data-align`,
`data-inset`, `data-marker`, and Atom `data-ordered`. Every part exposes `data-slot`; Item exposes Atom
`data-disabled` when applicable. Root and Item expose `data-marker-tone` when
specified; selected Item exposes `data-selected`.

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

Gap and nestedInset support the shared sm/md/lg/xl CSS breakpoints, with scalar,
explicit initial and sparse default-inheriting forms. nestedInset is set on
the nested Root itself; omission keeps space-6. Logical padding and columns follow direction.
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

Brick's `variant="plain"` means no boundary, not no markers. Use
`marker="none"` for an icon list, with `Leading` rather than a second Indicator
alias. List does not expose Chakra's generic style-prop engine, recipe
providers or unstyled switch. Use focused Brick props and composition first,
public CSS variables for deliberate exceptions, or Atom for headless output.

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
<List.Root align="center" marker="none" variant="divided">
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

### Record selection

Item accepts optional selected (boolean, default false). This is
presentation only: it emits data-selected, not aria-selected, a role,
or a tab stop. Compose a named Checkbox with the public selection utility;
optional ActionDelegate targets a real descendant primary control.
See [record selection](../../guides/record-selection.md) for the complete
state, scope, delegation and accessibility contract.

Local styling variables: --brick-list-selected-background,
--brick-list-selected-foreground, --brick-list-hover-background.
Selected paint uses `--brick-color-accent-soft` and primary text. Actionable
hover mixes primary text at 6% over the base surface; selected paint wins.
Selected paint overrides hover without changing geometry. Forced colors
uses system canvas colors; the checkbox conveys selection without color.
