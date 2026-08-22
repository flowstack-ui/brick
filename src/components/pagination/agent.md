# Pagination agent guide

## Purpose

Present polished movement through ordered result pages with current, boundary, and ellipsis states.

## Use when

- A result set or collection is divided into multiple ordered pages.

## Choose something else when

- The controls move between guide articles, ancestors, or local panels. Use Link composition, Breadcrumb, or Tabs.

## Required composition

- Compose Root and List with Previous, Items or explicit Item and Ellipsis parts, and Next.
- For URL-backed results, provide Root getPageHref and derive controlled page from the current route; keep fetching, sorting, filters, and post-load focus in the application.

## Rules

- **MUST:** Use Root getPageHref for URL-backed pages so controls are real anchors and native reload, sharing, history, and modified clicks continue to work.
- **MUST:** Keep the authored range in one scrollable inline row at narrow widths without removing previous/next meaning or current-page state.
- **MUST:** Load styles.css or core.css plus pagination.css.

## Common mistakes

- **Avoid:** Rendering URL-backed pages as buttons, composing anchors while Root remains in button mode, or using Pagination for previous/next documentation guides. **Instead:** Select link mode with Root getPageHref; use ordinary guide navigation links when page numbers do not carry meaning.
- **Avoid:** Allowing controls to wrap into an unreadable grid or leaving boundary anchors live. **Instead:** Keep the list in its owned inline overflow and verify boundary links have no href and leave sequential focus.

## Validation checklist

- Check first, middle, last, current, disabled, ellipsis, long labels, narrow widths, focus, touch targets, and RTL.
- For URL mode, confirm real href values, reload, share, Back/Forward, Cmd/Ctrl-click, and inert boundary links.
- Confirm CSS is loaded.

## Related guidance

- `breadcrumb`
- `link`
- `button`
