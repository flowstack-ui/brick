# Pagination agent guide

## Purpose

Present polished movement through ordered result pages with current, boundary, and ellipsis states.

## Use when

- A result set or collection is divided into multiple ordered pages.

## Choose something else when

- The controls move between guide articles, ancestors, or local panels. Use Link composition, Breadcrumb, or Tabs.

## Required composition

- Compose Root and List with Previous, Page, Ellipsis, and Next parts; use real destinations when each page has a URL.

## Rules

- **MUST:** Adapt visible page ranges at narrow widths without removing previous/next meaning or current-page state.
- **MUST:** Load styles.css or core.css plus pagination.css.

## Common mistakes

- **Avoid:** Using Pagination for previous/next documentation guides or allowing controls to wrap into an unreadable grid. **Instead:** Use ordinary guide navigation links and reserve Pagination for numbered collections.

## Validation checklist

- Check first, middle, last, current, disabled, ellipsis, long labels, narrow widths, focus, touch targets, and RTL.
- Confirm URL pages are links and CSS is loaded.

## Related guidance

- `breadcrumb`
- `link`
- `button`
