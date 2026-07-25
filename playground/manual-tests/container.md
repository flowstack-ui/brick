# Container manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Container |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/container` |

Scenario order: `01 Overview`, `02 Measures`, `03 Gutters`,
`04 Semantic hosts`, `05 Composition`, `06 Nesting`,
`07 Appearance and customization`, `08 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Defaults, measures, and gutters

Setup: Open `/container`; review `01` through `03` while resizing the window.

Action: Compare the default, five measures, and four gutters top to bottom.

Expected: Default is a wide centered region with medium gutters. Only the
labeled maximum or gutter changes. Content remains contained without
page-level horizontal scrolling.

Result:
Notes or issue:

## Step 2 — Semantics, composition, and nesting

Setup: Continue through `04`–`06`.

Action: Inspect the output, activate **Inspect ref**, then compare Stack/Grid
composition and the nested narrow region.

Expected: Output contains one authored host, no invented role or inner wrapper,
and ref reports `SECTION`. Stack/Grid own child layout. The nested region is
deliberately narrower and does not duplicate gutters.

Result:
Notes or issue:

## Step 3 — Appearance and customization

Setup: Continue through `07`; switch light and dark.

Action: Compare geometry and the customized maximum/gutter with its label.

Expected: Appearance changes no geometry. Customization visibly produces a
48rem maximum and 2.5rem logical gutter without changing component paint.

Result:
Notes or issue:

## Step 4 — Mobile, zoom, RTL, vertical writing, and screen reader

Setup: Review `08` at 320 CSS px, 200% text, 400% zoom, forced colors, and an
available physical mobile device; then enable the recorded screen reader.

Action: Read both writing directions, focus the RTL button, resize/rotate, and
navigate by landmarks and headings.

Expected: Logical gutters follow each writing mode; content, focus, and text
remain visible without Container-caused scrolling. Container adds no spoken
role or landmark beyond the authored host.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
