# Hide manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Hide |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/hide` |

Scenario order: `01 Overview`, `02 Breakpoints`, `03 Exact edges and live resize`, `04 Native display preservation`, `05 Hosts, props, and refs`, `06 Show and Hide composition`, `07 Mounted state and accessibility output`, `08 Reflow, localization, and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Responsive layout and natural display
Setup: Review 01–04 across every threshold. Action: Inspect exact edges and display specimens. Expected: Hide disappears exactly from its threshold and never changes visible display. Result:
Notes or issue:

## Step 2 — Composition and retained state
Setup: Review 05–07. Action: Inspect the ref, increment state, resize, and keyboard-navigate. Expected: The semantic root remains mounted, hidden controls leave navigation, and state survives. Result:
Notes or issue:

## Step 3 — Reflow, direction, print, and physical mobile
Setup: Review 08 at 200%/400%, 320px, RTL, print preview, and physical mobile. Action: Resize and rotate. Expected: Content remains contained and no essential function is lost. Result:
Notes or issue:

## Step 4 — Assistive technology
Setup: Enable the recorded screen reader. Action: Navigate below and above md. Expected: Hidden content is absent and visible content retains authored semantics. Result:
Notes or issue:

## Completion
Overall result:
Follow-up issues:
Workbook updated:
