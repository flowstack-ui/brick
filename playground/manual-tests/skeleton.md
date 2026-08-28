# Skeleton manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Skeleton |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/skeleton` |

Scenario order: `01 Overview`, `02 Variants`, `03 Animation`, `04 Dimensions`,
`05 Text lines`, `06 Loading`, `07 Composition`, `08 Theme`, `09 Stress`.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until
tested.

## Step 1 — Shapes, motion, dimensions

Open `/skeleton`; review 01–05. Expected: four distinct shapes, three distinct
motion recipes, exact dimensions, and correct one/three/five-line geometry.

## Step 2 — Loading and composition

Review 06–07; use Show content/Show skeleton. Expected: layout does not jump,
hidden controls cannot be focused, the same root remains, and loaded Brick
content is fully interactive.

## Step 3 — Theme and stress

Review 08–09 in light/dark, phone width, 200%/400%, RTL, forced colors, and
reduced motion. Expected: defaults adapt, customization matches code, geometry
does not clip, contextual placeholder paint remains visibly distinct on base,
raised, and overlay surfaces in both appearances, forced colors retain shapes,
and animation stops.

## Step 4 — Assistive technology

Traverse the busy-region example. Expected: placeholders are silent and never
focus; the owning region exposes busy state and its accessible name.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
