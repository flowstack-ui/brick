# Breadcrumb manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Breadcrumb |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/breadcrumb` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Content`,
`05 Collapse`, `06 Links`, `07 Compose`, `08 Theme`, `09 Stress`.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until
the named environment is actually tested.

## Step 1 — Defaults, variants, and sizes

Setup: Open `/breadcrumb`; review scenarios 01–03 top to bottom.
Action: Hover and focus ancestor links, then compare `sm`, `md`, and `lg`.
Expected: Order and content match; plain underlines only on interaction;
underline persists; only typography and spacing change with size.
Result:
Notes or issue:

## Step 2 — Content and contrast

Setup: Continue through scenario 04 in light and dark appearance.
Action: Inspect the custom separator, Home icon, and long current-page title.
Expected: Icon and separators align without becoming destinations; the long
title wraps without clipping or page-level horizontal scrolling; contrast holds.
Result:
Notes or issue:

## Step 3 — Collapse control

Setup: Continue to scenario 05 using keyboard only.
Action: Tab to **Show two collapsed pages** and press Enter.
Expected: Focus is visible; Library and Reports appear in order; status confirms
expansion; the static ellipsis never enters the tab order.
Result:
Notes or issue:

## Step 4 — Native links and composition

Setup: Continue through scenarios 06–07.
Action: Inspect native link menus, then compare each live trail with its HTML.
Expected: Target/download affordances remain native; landmarks, lists, anchors,
current page, hidden separators, classes, slots, and adapter attributes agree.
Result:
Notes or issue:

## Step 5 — Appearance and customization

Setup: Continue to scenario 08 and use the page appearance controls.
Action: Focus scoped and customized ancestor links.
Expected: Both scopes remain equivalent; only the customized trail uses the
shown purple links, green page, wider spacing, and thicker underline; focus holds.
Result:
Notes or issue:

## Step 6 — Mobile, zoom, RTL, and forced colors

Setup: Continue to scenario 09. Test a physical phone, 200%/400% zoom, text
spacing, RTL, and forced colors/high contrast.
Action: Traverse every ancestor link and the interactive ellipsis.
Expected: Trails wrap without clipping or page overflow; sticky UI compacts;
targets remain usable; Arabic order is natural and the chevron mirrors.
Result:
Notes or issue:

## Step 7 — Assistive technology

Setup: Return to Overview with the recorded screen reader or voice-control tool.
Action: Traverse the complete trail, then the static and interactive ellipses.
Expected: Breadcrumb landmark, ordered list, ancestor links, and current page
are announced once in order; decorative separators are silent; control name is clear.
Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
