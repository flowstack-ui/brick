# Pagination

Pagination navigates known result pages with native buttons or real URL destinations.

## When and where to use

Use `count` for record totals or `totalPages` for already calculated page totals,
never both. Fetching, filtering, URL history and result-replacement focus remain
application-owned. Do not use Pagination for unknown totals, guide navigation,
load-more flows, tabs or steps.

## When not to use

Do not use Pagination for unknown totals, guide navigation, load-more flows, tabs or steps.

## Installation and imports

Import `Pagination` and `usePagination` from `@flowstack-ui/brick` or
`@flowstack-ui/brick/pagination`. Load `@flowstack-ui/brick/styles.css` once.
For modular CSS, load `styles/core.css` plus `styles/pagination.css`; the latter
includes its Button and Text dependencies. Add other composed owners' CSS.

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/pagination.css";
```

## Quick start

```tsx
<Pagination.Root count={100} aria-label="Search result pages">
  <Pagination.List>
    <Pagination.Previous />
    <Pagination.Items />
    <Pagination.Next />
  </Pagination.List>
</Pagination.Root>
```

## Anatomy and DOM ownership

Root and RootProvider render a labelled nav. List is an optional ordered list;
controls and gaps receive li wrappers only inside List. Without List, compose
Previous, Items and Next directly inside ButtonGroup, including attached groups.
Items has no host. Item and boundary controls render buttons, or anchors in
getPageHref mode. Ellipsis is an assistive-hidden span. PageText is typography.
Context accepts a render child; usePaginationContext reads the same controller.

## API

### Exports

Root and subpath expose PaginationRoot, PaginationRootProvider, PaginationList,
PaginationPrevious, PaginationNext, PaginationFirst, PaginationLast,
PaginationItems, PaginationItem, PaginationEllipsis, PaginationPageText,
usePagination and usePaginationContext. Their props are PaginationRootProps,
PaginationRootProviderProps, PaginationListProps, PaginationPreviousProps,
PaginationNextProps, PaginationFirstProps, PaginationLastProps,
PaginationItemsProps, PaginationItemProps, PaginationEllipsisProps and
PaginationPageTextProps. Additional types: PaginationPageTextFormatDetails,
PaginationVariant, PaginationSize, PaginationBoundaryVariant, UsePaginationProps,
UsePaginationReturn and PaginationIds.

### Root and RootProvider

Root accepts controlled `page` / `onPageChange(page)` or `defaultPage=1`.
Count mode accepts `pageSize` / `onPageSizeChange(size)` or `defaultPageSize=10`.
Counts and totalPages are safe nonnegative integers; page sizes are positive
safe integers. Invalid inputs throw. Page numbers truncate and clamp;
nonfinite page values normalize to 1. Sibling and boundary counts truncate and
clamp to zero or greater, defaulting to 1 for nonfinite values.

`siblingCount` and `boundaryCount` default to 1. Displayed page clamps when
totals shrink, without emitting callbacks during render. Controlled state
remains parent-owned. A requested page-size change preserves the first visible
record where possible, then clamps. Zero pages render no navigation; one page
retains disabled boundary controls.

| Visual prop | Values | Default |
| --- | --- | --- |
| `variant` | ButtonVariant: solid, soft, subtle, surface, outline, ghost, plain | `ghost` |
| `selectedVariant` | ButtonVariant | `outline` |
| `tone` | neutral, contrast, accent, info, success, warning, danger | `neutral` |
| `size` | ResponsiveValue<ButtonSize>: 2xs, xs, sm, md, lg, xl, 2xl | `md` |
| radius | shared Radius core tokens and semantic roles | control |
| focusRing | outside, inside | inside |

Root supplies visual defaults; individual control overrides win. ButtonGroup
defaults apply when Root does not specify a value. All sizes use Button
geometry, including typography, icons and border-inclusive heights.
`boundaryVariant="outline"` remains a legacy boundary-control shortcut.

RootProvider accepts `value` from `usePagination`, the same visual defaults and
native nav props. Do not mix internal Root state with a separate controller.

### Items and controls

Items accepts `render({page, isCurrent})`, decorative `ellipsis`, `itemProps`
and `ellipsisProps`. Custom render returns one compatible control host; Atom
merges behavior without nesting buttons. Item accepts a required page and optional
children. Previous, Next, First and Last accept replacement children and visual
overrides. First and Last are optional explicit boundary actions.

Native props, refs and asChild remain available on rendered parts. Refs target
the real control, not a list wrapper. Root `ids` accepts root/list/control IDs,
`item(page)` and `ellipsis(rangeIndex)` for distinct generated IDs; direct native
id props take precedence.

### Controller and summaries

`usePagination` exposes page/currentPage, totalPages, items, previousPage,
nextPage, first/last flags, setPage and first/previous/next/last actions.
Count mode additionally exposes count, pageSize, pageRange, setPageSize and
slice(data). pageRange uses zero-based start and exclusive end. slice is only
for a complete local collection, never for an already paginated server response.
Total-pages mode does not invent a record count; slice/setPageSize reject it.

PageText accepts `format="short"` (page / total), `"compact"` (page of total,
default), `"long"` (record range of count), or a callback receiving page,
totalPages, count, pageRange and formatNumber. Long requires count mode.
Numbers follow LocaleProvider; use a callback to translate connecting words.
Use controller-derived empty results outside Root when a zero-count summary is needed.

### URL-backed results

Supply `getPageHref({page, currentPage, totalPages, isCurrent})` and derive
controlled page from the route. Anchors preserve sharing, reload, browser history
and modified clicks; navigation does not call onPageChange. Disabled destinations
have no href, expose aria-disabled and leave sequential focus order.

## Visual recipes and states

Controls reuse Button's complete selected, hover, pressed, disabled, focus and forced-color recipes. Defaults are neutral ghost controls and outline selected state. Changing variants does not change border-inclusive target dimensions.

## Tokens and CSS hooks

Pagination uses Button presentation rather than a second button recipe.
Choose visual props first. `--brick-pagination-list-gap` customizes List spacing.
Classes use `.brick-pagination` and part suffixes; controls carry Button
data-size, data-tone and data-variant alongside Atom state attributes and `data-slot`.

## Customization

Previously variant painted the navigation container and sizes used a separate
scale. Variant now styles controls; wrap in Surface when container paint is
needed. Selected controls default to outline, not fixed accent fill. Set
selectedVariant and tone explicitly when desired. The old pagination root,
control, current, typography and focus CSS variables are retired in favor of
shared Button presentation and public visual props; list-gap remains supported.
boundaryVariant remains supported, but explicit boundary part variant is clearer.

## Responsive behavior

List remains a bounded, no-wrap scrolling row. Compact composition can omit
List and use PageText with boundary controls. Sparse responsive sizes inherit
md before their first breakpoint; width does not automatically change the range.

## Accessibility

Root defaults to aria-label Pagination. Use a purpose-specific label when
multiple navigation landmarks exist. Localize previousAriaLabel, nextAriaLabel,
firstAriaLabel, lastAriaLabel and getItemAriaLabel. Current page has aria-current.
Tab reaches each enabled control; there is no roving arrow-key model. When Root
is disabled, List is keyboard-focusable so its overflow can still be scrolled;
the page controls themselves remain disabled. An explicit List tabIndex overrides
that default, and the application then owns keeping overflow keyboard-accessible.

## Composition, native props, and refs

Root refs target nav, List refs target ol, and control refs target button or anchor, never li. Rendered parts preserve native props and asChild. Custom Items rendering receives merged behavior without nested interactive hosts. Use getPageHref for anchor mode; keep routing and result focus application-owned.

## Examples

For attached controls, compose Root > ButtonGroup attached > Previous, Items, Next without List. For a compact summary, compose Previous, PageText and Next in HStack. For custom visible content use Items render or explicit Item children.

## Evidence

- [Playground source](../../../playground/src/components/pagination/)
- [Unit tests](../../../test/components/pagination/pagination.test.tsx)
- [Type tests](../../../test/types/components/pagination.test.ts)
- [Browser behavior](../../../playground/tests/components/pagination/behavior.spec.ts)
- [Manual protocol](../../../playground/manual-tests/pagination.md)
- [Visual owner](../../../playground/tests/components/pagination/visual.spec.ts)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
