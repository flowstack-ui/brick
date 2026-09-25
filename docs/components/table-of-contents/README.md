# Table of Contents

## When and where to use

Use TableOfContents for an explicitly authored outline of a long document with
current-section feedback. Labels and translations remain application content.

## When not to use

Use NavList for routes, Tabs for panels, Tree for composite hierarchy interaction,
or Link and List for a static outline without reading-position feedback.

## Installation and imports

```tsx
import { TableOfContents, useTableOfContents } from "@flowstack-ui/brick/table-of-contents";
import "@flowstack-ui/brick/styles.css";
```

The root package also exports this API. Alternatively load
`@flowstack-ui/brick/styles/core.css` once plus
`@flowstack-ui/brick/styles/table-of-contents.css` and the modular styles for
other components in the composition. Do not mix aggregate and modular styles.

## Quick start

```tsx
<TableOfContents.Root items={[{ id: "usage", depth: 2 }]}>
  <TableOfContents.Nav>
    <TableOfContents.Title>On this page</TableOfContents.Title>
    <TableOfContents.List>
      <TableOfContents.Item value="usage">
        <TableOfContents.Link>Usage</TableOfContents.Link>
      </TableOfContents.Item>
    </TableOfContents.List>
  </TableOfContents.Nav>
</TableOfContents.Root>
// Elsewhere in the document: <section id="usage">...</section>
```

## Anatomy and DOM ownership

Root renders div, Nav nav, Title p, List ul, Item li, Link a, Indicator span.
RootProvider and Context render no host. Nested Lists belong inside their parent
Item. Indicator is an optional sibling of List inside Nav, never an ul child.
Atom owns IDs, native anchors, aria-current, tracking, focus, history and geometry.
Brick owns only visual recipes. Page layout, sticky offsets and mobile disclosure
remain compositions outside TableOfContents.

## API

Root and RootProvider add these recipe props:

| Prop | Values | Default |
| --- | --- | --- |
| `size` | ResponsiveValue of `sm`, `md` | `sm` |
| `variant` | ResponsiveValue of `plain`, `line` | `plain` |
| `tone` | `neutral`, `accent` | `neutral` |

Root preserves the options accepted by `useTableOfContents`:

| Prop | Type / behavior | Default |
| --- | --- | --- |
| items | readonly TableOfContentsItemData[]: unique id and integer depth 1–6 | required |
| activeId | controlled accepted current ID | uncontrolled |
| defaultActiveId | initial current ID | empty string |
| onActiveIdChange | (id, details) callback | none |
| enabled | enable target tracking | true |
| getTargetRoot | Document, ShadowRoot or HTMLElement getter | document |
| getScrollElement | article scroll-element getter | document scrolling |
| scrollOffset | number or getter in CSS pixels | computed scroll padding + target margin |
| scrollBehavior | instant, smooth (managed mode) | smooth |
| navigation | native, managed | native for document; managed for element/shadow roots |
| history | push, replace, none (managed mode) | push |
| focusTarget | focus destination after managed activation | true |

RootProvider `value` is the controller returned by useTableOfContents. Context
`children` is a function receiving TableOfContentsApi. The API exposes activeId,
visibleIds, pendingId, getItemState(id), navigateTo(id) and refresh(). Navigation
returns whether a rendered registered target was found, not a completion promise.
Controlled activeId stays authoritative even when its callback rejects a request.
visibleIds identifies visible target boxes, not multiple current locations.

Item `value` is the registered target ID. Link owns its encoded fragment href
and aria-current location; it retains normal modifier clicks and handler cancellation.
Nav `autoScroll` defaults true; its `getScrollElement` is an optional **rail**
viewport, distinct from the article viewport. This never scrolls ancestors.
Nav requires Title or aria-label/aria-labelledby. For a custom Title id, provide
the matching Nav aria-labelledby too, including server-rendered markup.

Native mode leaves default fragment navigation and history to the browser;
managed mode explicitly scrolls only the selected root, preserves history.state,
and focuses the target without scrolling unrelated ancestors. Passive scrolling
does not change the hash. Call refresh after externally owned layout changes that
do not resize targets, such as virtualized or repositioned content.

Named component exports mirror the namespace: TableOfContentsRoot,
TableOfContentsRootProvider, TableOfContentsContext, TableOfContentsNav,
TableOfContentsTitle, TableOfContentsList, TableOfContentsItem,
TableOfContentsLink and TableOfContentsIndicator. Their Props types are exported,
along with TableOfContentsRecipeProps, TableOfContentsSize, TableOfContentsVariant,
TableOfContentsTone, TableOfContentsController, TableOfContentsItemState and
TableOfContentsChangeDetails. TableOfContentsOptions is the shared hook contract.

## Visual recipes and states

Plain is transparent with zero base inline inset. Line adds a logical-start rail
and reserves one shared inset for title and links. Both use secondary resting
text, primary current text for neutral, and accent text for accent. Current and
hover links are underlined, with constant weight to prevent wrapping shifts.
No fill or shadow appears on selection. sm uses body-sm and 1.75rem minimum rows;
md uses body-md and 2.25rem minimum rows. Title uses the strong label weight.
Optional Indicator appears only after Atom measures a line Nav's current link.

## Tokens and CSS hooks

Classes: `.brick-table-of-contents` and `.brick-table-of-contents__nav`, `__title`,
`__list`, `__item`, `__link`, `__indicator`. Nav emits `data-size`, `data-variant`,
`data-tone` and data-indicator-ready. Item emits data-depth, data-level,
data-current, data-visible and data-pending. Parts preserve data-slot.

Public instance variables:

- --brick-table-of-contents-foreground
- --brick-table-of-contents-current
- --brick-table-of-contents-focus-ring
- --brick-table-of-contents-indent
- --brick-table-of-contents-title-gap
- --brick-table-of-contents-row-gap
- --brick-table-of-contents-row-padding
- --brick-table-of-contents-row-size
- --brick-table-of-contents-rail-color
- --brick-table-of-contents-rail-gap
- --brick-table-of-contents-rail-width
- --brick-table-of-contents-font-family
- --brick-table-of-contents-font-size
- --brick-table-of-contents-font-weight
- --brick-table-of-contents-line-height
- --brick-table-of-contents-letter-spacing

These inherit semantic text, focus, border, space and full typography recipes.
Measured position/size and normalized depth come from Atom; do not overwrite
those variables to repair composition.

## Customization

Prefer the closed recipes. Public variables can be set on Nav's style for a
deliberate instance override, e.g. `--brick-table-of-contents-indent: 1.5rem`.
Do not add consumer focus-protection gutters, selection fills or scroll observers.

## Responsive behavior

Long labels wrap and logical indentation follows dir. Size and variant accept
scalar values or sparse initial/sm/md/lg/xl breakpoint objects. Omitted initial
values retain sm/plain defaults; later values persist until overridden.
Stack/Grid/Frame/ScrollArea and Show/Collapsible own responsive placement. A
bounded rail needs an explicit height owner; content scrolling has a separate root.

## Accessibility

One current anchor per Nav uses aria-current="location". No menu/tree/tab roles,
roving focus, live announcements on scrolling or arrow-key takeover. Managed
navigation restores temporary tabindex on blur and honors reduced motion. Focus
uses the semantic accent ring inside the row. Forced colors retain a double
underline for current state and a visible focus/indicator. Passive scroll never
moves keyboard focus. Name each Nav distinctly when several are present.

## Composition, native props, and refs

All DOM parts preserve native props, className, style, render, asChild and refs.
asChild requires one element and excludes render. A delegated Link must remain
an anchor. Root ref is HTMLDivElement; Nav HTMLElement; Title HTMLParagraphElement;
List HTMLUListElement; Item HTMLLIElement; Link HTMLAnchorElement; Indicator
HTMLSpanElement. Recipe props never leak as native attributes.

## Examples

```tsx
const controller = useTableOfContents({items, getScrollElement: () => article.current,
  getTargetRoot: () => article.current, history: "none"});
<TableOfContents.RootProvider value={controller} variant="line" tone="accent">
  <TableOfContents.Nav aria-label="Article outline">
    <TableOfContents.List>{/* Item and Link children */}</TableOfContents.List>
    <TableOfContents.Indicator />
  </TableOfContents.Nav>
</TableOfContents.RootProvider>
```

## Evidence

- [Adapter tests](../../../test/components/table-of-contents/table-of-contents.test.tsx)
- [Type matrix](../../../test/types/components/table-of-contents.test.ts)
- [Examples](../../../playground/src/components/table-of-contents/TableOfContentsPage.tsx)
- [Browser behavior](../../../playground/tests/components/table-of-contents/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/table-of-contents/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/table-of-contents.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
