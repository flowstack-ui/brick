# Center manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Center / Square / Circle |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/center` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: `01 Center, Square, and Circle`,
`02 Surface and Icon composition`, `03 Responsive and flex pressure`,
`04 Inline, RTL, and zoom`.

## Step 1 — Identity and one-host composition

Confirm Center, Square, and Circle each render one host, center their content on
both axes, add no role or tab stop, and preserve semantic hosts through
`asChild`.

Result:
Notes or issue:

## Step 2 — Equal geometry and flex pressure

Inspect the 32px icon holders beside long content. Confirm computed inline and
block dimensions remain exactly equal and the holder does not shrink at narrow
viewport widths, 200% text size, or 400% zoom.

Result:
Notes or issue:

## Step 3 — Composition and appearance

Inspect light, dark, inherited, and forced-colors appearances. Confirm Surface
owns visible paint and radius, Square or Circle owns geometry, and Icon stays
16px without clipping or custom application layout CSS.

Result:
Notes or issue:

## Step 4 — Responsive, inline, and writing direction

Confirm responsive sizes carry forward at Brick breakpoints, inline Center
participates in text flow, and RTL content preserves logical ordering. Run axe
and confirm there is no viewport overflow.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
