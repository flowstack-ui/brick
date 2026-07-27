# Progress Circle manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Progress Circle |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/progress-circle` |

Scenario order: `01 Overview`, `02 States`, `03 Tones`, `04 Sizes`, `05 Geometry`, `06 Content`, `07 Output`, `08 Theme`, `09 Stress`. Use `pass`, `fail`, `blocked`, or `not applicable`; leave every result blank until tested.

## Step 1 — Defaults through geometry

Review 01–05 top to bottom. Expected: indeterminate motion is clear; value states, six tones, five diameters, three stroke weights, and both caps remain circular, centered, evenly spaced, and unclipped.

Result:
Notes or issue:

## Step 2 — Content and output

Review 06–07. Expected: values remain centered, long labels wrap below the ring, custom `3/5` stays contained, and rendered HTML matches the live name, range, SVG path length, and state.

Result:
Notes or issue:

## Step 3 — Theme and stress

Review 08–09 in light/dark, phone width, 200%/400%, RTL, forced colors, and reduced motion. Expected: customization matches code, rings stay clockwise in RTL, no label or arc clips, forced colors preserve both rings, and reduced motion leaves a static recognizable arc.

Result:
Notes or issue:

## Step 4 — Assistive technology

Read determinate, indeterminate, custom-range, and busy-region examples. Expected: each announces one progressbar name; determinate values are announced, indeterminate omits a numeric value, and decorative SVG parts remain silent.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
