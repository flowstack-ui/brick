# Progress manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Progress |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/progress` |

Scenario order: `01 Overview`, `02 States`, `03 Tones`, `04 Sizes`, `05 Geometry`, `06 Buffer`, `07 Output`, `08 Theme`, `09 Stress`. Use `pass`, `fail`, `blocked`, or `not applicable`; leave every result blank until tested.

## Step 1 — Defaults through geometry

Review 01–05 top to bottom. Expected: indeterminate motion is clear; value states, six tones, five thicknesses, three shapes, and both orientations remain aligned; horizontal fill starts at inline-start and vertical fill at the bottom.

Result:
Notes or issue:

## Step 2 — Buffer and output

Review 06–07. Expected: buffer stays behind current progress, custom `3 of 5` is legible, and each visible HTML result matches its specimen's name, range, state, and generated label relationship.

Result:
Notes or issue:

## Step 3 — Theme and stress

Review 08–09 in light/dark, phone width, 200%/400%, RTL, forced colors, and reduced motion. Expected: customization matches code, no part clips or overlaps, RTL reverses only horizontal fill, forced colors preserve boundaries, and reduced motion leaves a static recognizable segment.

Result:
Notes or issue:

## Step 4 — Assistive technology

Read determinate, indeterminate, custom-range, and busy-region examples. Expected: each announces one progressbar name; determinate values are announced, indeterminate omits a numeric value, and the application-owned region reports busy without duplicate progress speech.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
