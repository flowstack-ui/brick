# Pagination manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Pagination |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/pagination` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Variants`, `04 Sizes`, `05 State and boundaries`, `06 Localization and custom content`, `07 Appearance and customization`, `08 Responsive overflow and RTL`, `09 URL-backed results`.

## Step 0 — URL-backed results

In scenario 09, confirm every page control is a real anchor with a destination.
Open page 3, reload, use Back and Forward, copy the URL into a new tab, and
Cmd/Ctrl-click another page. Confirm the route restores the current page and
modified clicks retain normal browser behavior. On page 1 and page 5, confirm
the unavailable boundary control has no destination and is skipped by Tab.

Result:
Notes or issue:

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Semantics and interaction

Confirm a labelled navigation landmark and ordered list, one current page, localized control labels, decorative Ellipsis, native Tab/Enter/Space behavior, changed-page callbacks, and correct first/last/whole-root disabled boundaries.

Result:
Notes or issue:

## Step 2 — Visual recipes and preferences

Inspect all variants and sizes in light, dark, forced colors, and reduced motion. Confirm stable geometry across hover, active, current, focus-visible, and disabled states; visible focus; centered labels and icons; and current/disabled meaning beyond color.
Confirm the current page retains its accent-on-solid foreground and uses the
accent-solid hover and pressed states instead of the neutral page-control
background.

Result:
Notes or issue:

## Step 3 — Reflow, direction, and touch

At 320 CSS px and 200/400% zoom, confirm the list stays within its container, scrolls inline, never wraps or hides items, and all controls remain reachable. Confirm logical icon mirroring and order in RTL, then operate the targets on a physical touch device.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
