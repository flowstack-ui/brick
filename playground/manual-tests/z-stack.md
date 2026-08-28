# ZStack manual-test protocol

| Run information | Value |
| --- | --- |
| Component | ZStack |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/z-stack` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: `01 Overview`, `02 Nine-position placement`,
`03 Composition`, `04 Accessibility and stress`.

## Step 1 — Overlap and placement

Review scenarios 01 and 02. Confirm every layer shares one region, the root
keeps natural size, the Overlay remains visibly above the positioned
Foundation layer, and top-start, center, and bottom-end placement match their
labels without absolute positioning.

Result:
Notes or issue:

## Step 2 — Composition and source order

Review scenario 03 and inspect the composed action. Confirm it is the direct
root child, receives ZStack.Item hooks, has no additional wrapper, remains
inset from the logical edges, and participates above ancestor content without
consumer positioning CSS.

Result:
Notes or issue:

## Step 3 — Responsive and accessibility stress

Review scenario 04 at 390px, 200% text size, 400% zoom, RTL, light/dark, and forced colors. Tab through both actions and confirm visible focus, source-order focus, readable content, and no page overflow or blocked input.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
