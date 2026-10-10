# Pagination manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Pagination |
| Version or commit | Unreleased 0.2.3 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/pagination` |

Scenario order: `01 pagination.overview` → `02 pagination.anatomy` → `03 pagination.variants` → `04 pagination.sizes` → `05 pagination.state` → `06 pagination.localization` → `07 pagination.appearance` → `08 pagination.stress` → `09 pagination.urls`.

Use `?qualification=1` for this preserved scenario sequence; review the ordinary documentation examples separately.

Normal route uses focused documentation examples. Legacy numbered qualification
scenarios remain at `/pagination?qualification=1`.

## Controller and composition

Check count/page-size transitions, clamping, custom Items hosts, attached borders,
PageText formats and translations, First/Last and disabled states. Confirm
Button peers share named sizes, including sparse responsive default md.

Result:
Notes or issue:

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
Confirm neutral ghost controls and outline current page by default. Explicit
selectedVariant and tone must preserve the shared Button interaction palette.
Confirm `boundaryVariant="outline"` borders only Previous and Next while page
numbers retain the Root recipe.

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
