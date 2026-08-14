# Show manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Show |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/show` |

Scenario order: `01 Overview`, `02 Breakpoints`, `03 Exact edges and live resize`, `04 Native display preservation`, `05 Hosts, props, and refs`, `06 Show and Hide composition`, `07 Mounted state and accessibility output`, `08 Reflow, localization, and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Responsive layout and natural display
Setup: Review 01–04 while resizing across every named threshold. Action: Inspect exact edges and each child-display specimen. Expected: Show appears only from its threshold and remains layout-transparent while each child retains its authored display and the parent keeps control of gaps. Result:
Notes or issue:

## Step 2 — Composition and retained state
Setup: Review 05–07. Action: Inspect the ref, increment state, resize below and above md, and keyboard-navigate. Expected: One semantic root/ref remains mounted; hidden controls leave navigation; state survives. Result:
Notes or issue:

## Step 3 — Reflow, direction, print, and physical mobile
Setup: Review 08 at 200%/400% zoom, 320px, RTL, print preview, and a physical mobile device. Action: Resize and rotate. Expected: Content remains contained, thresholds remain physical, direction is natural, and no essential function is lost. Result:
Notes or issue:

## Step 4 — Assistive technology
Setup: Enable the recorded screen reader. Action: Navigate below and above md. Expected: Hidden content is absent and shown content retains authored semantics without extra announcement. Result:
Notes or issue:

## Completion
Overall result:
Follow-up issues:
Workbook updated:
