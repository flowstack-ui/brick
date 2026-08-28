# Pagination

Pagination navigates a finite, known set of numbered pages with native buttons
or real URL destinations.

## When and where to use

Use Pagination when an application knows the total page count and people benefit from direct movement to nearby or boundary pages. When each page has a URL, provide `getPageHref` and control `page` from the current route. Keep result data, page size, loading, routing, and post-load focus in the application.

## When not to use

Do not use Pagination for unknown totals, load-more flows, tabs, steps, or carousels. Do not render URL-backed results as state-only buttons.

## Installation and imports

Import `Pagination` from `@flowstack-ui/brick` or `@flowstack-ui/brick/pagination`, and load `@flowstack-ui/brick/styles.css` once.


The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/pagination.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.

## Quick start

```tsx
<Pagination.Root totalPages={20} aria-label="Search result pages">
  <Pagination.List>
    <Pagination.Previous />
    <Pagination.Items />
    <Pagination.Next />
  </Pagination.List>
</Pagination.Root>
```

## Anatomy and DOM ownership

The frozen namespace contains `Root`, `List`, `Previous`, `Items`, `Item`, `Ellipsis`, and `Next`. Root renders `nav`; List renders `ol`; every control or gap receives an Atom-owned `li`; Previous, Item, and Next render native `button type="button"` by default or anchors when Root provides `getPageHref`; Ellipsis renders an assistive-hidden span. Items has no host and renders Atom's calculated Item/Ellipsis sequence.

## API

### Exports

`Pagination`, `PaginationRoot`, `PaginationList`, `PaginationPrevious`,
`PaginationItems`, `PaginationItem`, `PaginationEllipsis`, `PaginationNext`,
`PaginationRootProps`, `PaginationListProps`, `PaginationPreviousProps`,
`PaginationItemsProps`, `PaginationItemProps`, `PaginationEllipsisProps`,
`PaginationNextProps`, `PaginationVariant`, `PaginationBoundaryVariant`, and `PaginationSize` are available
from root and subpath imports.

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `plain`, `soft`, `outline` | `plain` |
| `boundaryVariant` | `plain`, `outline` | `plain` |
| `size` | `sm`, `md`, `lg` | `md` |

Root preserves Atom's `totalPages`, controlled `page`, `defaultPage`, `onPageChange`, `siblingCount`, `boundaryCount`, `disabled`, `previousAriaLabel`, `nextAriaLabel`, `getItemAriaLabel`, and `getPageHref`. Previous and Next use logical chevrons when children are omitted. Authored children replace that visible content.

`boundaryVariant="outline"` gives only Previous and Next a bounded control
treatment while generated page numbers retain the Root recipe. Use it instead
of styling the two boundary parts independently.

`getPageHref` receives `page`, `currentPage`, `totalPages`, and `isCurrent`.
When present, the application route owns the current page and activation does
not call `onPageChange`. Ordinary anchors preserve reload, copy/share,
Back/Forward, and modified clicks. A router may progressively enhance ordinary
clicks through the control `onClick` prop, but must preserve the generated
destination and modified-click behavior. Disabled and boundary links have no
`href`, expose `aria-disabled="true"`, and leave sequential focus order.

`Items` accepts shared `itemProps` and `ellipsisProps`. Explicit Item and Ellipsis composition remains supported when an application intentionally authors the complete range.

## Visual recipes and states

Variants change containing paint and padding; sizes coordinate 32px, 40px, and 48px-class controls and label recipes. Hover, active, current, focus-visible, and disabled states change paint without moving controls.

## Tokens and CSS hooks

Stable classes are `.brick-pagination`, `.brick-pagination__list`, `.brick-pagination__previous`, `.brick-pagination__item`, `.brick-pagination__ellipsis`, and `.brick-pagination__next`. Root exposes `data-variant` and `data-size`; Atom state, page, direction, disabled, and `data-slot` attributes remain available.

Public variables:

- `--brick-pagination-root-background`
- `--brick-pagination-root-border-color`
- `--brick-pagination-root-radius`
- `--brick-pagination-root-padding`
- `--brick-pagination-list-gap`
- `--brick-pagination-list-overflow-padding`
- `--brick-pagination-control-min-size`
- `--brick-pagination-control-inline-padding`
- `--brick-pagination-control-radius`
- `--brick-pagination-control-foreground`
- `--brick-pagination-control-background`
- `--brick-pagination-control-border-color`
- `--brick-pagination-control-hover-background`
- `--brick-pagination-control-pressed-background`
- `--brick-pagination-current-background`
- `--brick-pagination-current-foreground`
- `--brick-pagination-current-border-color`
- `--brick-pagination-current-hover-background`
- `--brick-pagination-current-pressed-background`
- `--brick-pagination-disabled-foreground`
- `--brick-pagination-focus-ring`
- `--brick-pagination-ellipsis-foreground`
- `--brick-pagination-icon-size`
- `--brick-pagination-transition-duration`
- `--brick-pagination-font-family`
- `--brick-pagination-font-size`
- `--brick-pagination-font-weight`
- `--brick-pagination-line-height`
- `--brick-pagination-letter-spacing`

## Customization

Choose a variant and size first, then use Brick semantic tokens or documented `--brick-pagination-*` variables. Compound parts, `className`, and `style` remain available for intentional local adaptation without replacing Atom behavior.

## Responsive behavior

Pagination remains one no-wrap row. When constrained, its ordered list scrolls along the inline axis without hiding or rearranging pages. Applications may choose smaller sibling or boundary counts for a known layout, but Brick does not make that decision responsively.

## Accessibility

Give Root a purpose-specific `aria-label` when more than one navigation landmark exists. Every generated page receives a destination label, the current page receives `aria-current="page"`, boundary buttons disable natively, and boundary links become inert without a destination. Ellipsis is not focusable. Tab reaches each enabled control in DOM order; there is no roving focus or arrow-key model. Use Root localization props instead of rebuilding Items.

## Composition, native props, and refs

Refs target the Root nav, List ol, inner button or anchor controls, and Ellipsis span. Parts preserve native props, `render`, `asChild`, custom classes, styles, and slots. Select link mode through Root `getPageHref`; do not compose an anchor while Root remains in button mode. Pagination composes beside Table, List, Select, and result summaries without owning them.

## Examples

### In-place state

```tsx
<Pagination.Root
  page={page}
  onPageChange={setPage}
  totalPages={12}
  variant="outline"
  previousAriaLabel="Earlier results"
  nextAriaLabel="Later results"
>
  <Pagination.List>
    <Pagination.Previous />
    <Pagination.Items />
    <Pagination.Next />
  </Pagination.List>
</Pagination.Root>
```

### URL-backed results

```tsx
<Pagination.Root
  aria-label="Incident result pages"
  page={pageFromRoute}
  totalPages={totalPages}
  getPageHref={({ page }) => `/incidents?status=open&page=${page}`}
>
  <Pagination.List>
    <Pagination.Previous />
    <Pagination.Items />
    <Pagination.Next />
  </Pagination.List>
</Pagination.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/pagination/)
- [Unit tests](../../../test/components/pagination/pagination.test.tsx)
- [Type tests](../../../test/types/components/pagination.test.ts)
- [Browser behavior](../../../playground/tests/components/pagination/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/pagination/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/pagination.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
