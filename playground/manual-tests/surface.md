# Surface manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Surface |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/surface` |

Scenario order: `01 Overview`, `02 Levels`, `03 Borders`, `04 Elevation`,
`05 Radius`, `06 Inset`, `07 Semantic hosts and composition`,
`08 Appearance and customization`,
`09 Responsive, nesting, and forced colors`, `10 Layered media`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Defaults and paint recipes

Setup: Open `/surface`; review `01`–`06` from top to bottom.

Action: Compare levels, border, elevation, radius, and inset without changing
the page controls.

Expected: The default is a quiet base surface. Each scenario changes only its
labelled dimension. Shadows form four clear but restrained levels, corners
progress from square to surface radius, and inset increases evenly.

Result:
Notes or issue:

## Step 2 — Semantics and composition

Setup: Continue through `07`.

Action: Inspect the rendered HTML, activate **Inspect ref**, and compare the
Surface/Container/Stack/Grid composition.

Expected: Output contains one authored `section`, no invented role or wrapper,
and ref reports `SECTION`. Surface supplies paint while the layout components
retain width and arrangement.

Result:
Notes or issue:

## Step 3 — Appearance and customization

Setup: Review `08`; switch the page between light and dark.

Action: Compare all four levels, then compare the customization code with its
result.

Expected: Both appearances preserve the same hierarchy. The customized example
changes exactly background, border color, and radius and remains readable.

Result:
Notes or issue:

## Step 4 — Mobile, zoom, RTL, focus, and forced colors

Setup: Review `09` at 320 CSS px, 200% text, 400% zoom, forced colors, and an
available physical mobile device.

Action: Resize/rotate, read the Arabic specimen, tab to **Focus boundary**, and
inspect the elevated nested surface.

Expected: Panels stack in one column; text, edges, and focus remain visible
without horizontal scrolling or clipping. Logical inset is even in RTL.
Forced colors replace lost shadows with visible system-color boundaries.

Result:
Notes or issue:

## Step 5 — Screen reader

Setup: Enable the recorded screen reader and return to `01`, `07`, and `09`.

Action: Read in browse mode and navigate through headings, landmarks, and
controls.

Expected: The default Surface adds no spoken role or announcement. Authored
semantic hosts remain discoverable, and control names/order are unchanged.

Result:
Notes or issue:

## Step 6 — Layered media

Setup: Review `10` in light, dark, RTL, narrow, zoomed, reduced-motion, and
forced-color conditions.

Action: Inspect the Surface, Media, Scrim, Content, and Image output, then
attempt pointer and screen-reader navigation through the decorative layers.

Expected: Media and Scrim fill the Surface behind Content, inherit its radius,
ignore pointer input, and add no accessibility output. The logical gradient
follows direction, foreground content remains readable, ordinary Surface
output elsewhere is unchanged, and forced colors removes decorative layers.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
