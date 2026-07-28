# Pagination

Pagination navigates a finite, known set of numbered pages with native buttons.

## When and where to use

Use Pagination when an application knows the total page count and people benefit from direct movement to nearby or boundary pages. Keep result data, page size, loading, routing, and post-load focus in the application.

## When not to use

Do not use Pagination for unknown totals, load-more flows, tabs, steps, carousels, or URL navigation. Version 1 is button-based; it does not provide an anchor or router contract.

## Installation and imports

Import `Pagination` from `@flowstack-ui/brick` or `@flowstack-ui/brick/pagination`, and load `@flowstack-ui/brick/styles.css` once.

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

The frozen namespace contains `Root`, `List`, `Previous`, `Items`, `Item`, `Ellipsis`, and `Next`. Root renders `nav`; List renders `ol`; every control or gap receives an Atom-owned `li`; Previous, Item, and Next render native `button type="button"`; Ellipsis renders an assistive-hidden span. Items has no host and renders Atom's calculated Item/Ellipsis sequence.

## API

### Exports

`Pagination`, `PaginationRoot`, `PaginationList`, `PaginationPrevious`,
`PaginationItems`, `PaginationItem`, `PaginationEllipsis`, `PaginationNext`,
`PaginationRootProps`, `PaginationListProps`, `PaginationPreviousProps`,
`PaginationItemsProps`, `PaginationItemProps`, `PaginationEllipsisProps`,
`PaginationNextProps`, `PaginationVariant`, and `PaginationSize` are available
from root and subpath imports.

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `plain`, `soft`, `outline` | `plain` |
| `size` | `sm`, `md`, `lg` | `md` |

Root preserves Atom's `totalPages`, controlled `page`, `defaultPage`, `onPageChange`, `siblingCount`, `boundaryCount`, `disabled`, `previousAriaLabel`, `nextAriaLabel`, and `getItemAriaLabel`. Previous and Next use logical chevrons when children are omitted. Authored children replace that visible content.

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

Give Root a purpose-specific `aria-label` when more than one navigation landmark exists. Every generated page receives a destination label, the current page receives `aria-current="page"`, boundary buttons disable natively, and Ellipsis is not focusable. Tab reaches each enabled button in DOM order; there is no roving focus or arrow-key model. Use Root localization props instead of rebuilding Items.

## Composition, native props, and refs

Refs target the Root nav, List ol, control buttons, and Ellipsis span. Parts preserve native props, `render`, `asChild`, custom classes, styles, and slots, but link-shaped final hosts are outside the supported v1 contract. Pagination composes beside Table, List, Select, and result summaries without owning them.

## Examples

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

## Evidence

- [Playground source](../../../playground/src/components/pagination/)
- [Unit tests](../../../test/components/pagination/pagination.test.tsx)
- [Type tests](../../../test/types/components/pagination.test.ts)
- [Browser behavior](../../../playground/tests/components/pagination/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/pagination/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/pagination.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
