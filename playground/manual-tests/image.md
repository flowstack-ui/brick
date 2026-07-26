# Image manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Image |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/image` |

Scenario order: `01 Overview`, `02 Accessibility`, `03 Fits`, `04 Positions`,
`05 Radius and frame`, `06 Responsive attributes and output`,
`07 Loading and fallback`, `08 Appearance and customization`,
`09 Responsive and stress`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Default, accessibility, and media geometry

Review `01` through `05` from top to bottom. Confirm the default image is sharp
and uncropped at its intrinsic ratio; informative, decorative, and named-action
examples look identical; every fit visibly matches its label; vertical and
logical focal positions move the expected image region; radius clips cleanly;
and only the subtle frame adds a canvas and border.

Result:
Notes or issue:

## Step 2 — Native output and source states

In `06`, compare the visible responsive Image HTML with the specimen. In `07`,
select Loaded, Broken, Absent, then Loaded again. Confirm attributes and alt are
authored as displayed, Content and Fallback never appear together, each state
keeps exactly the same box, and the final image replaces the fallback cleanly.

Result:
Notes or issue:

## Step 3 — Appearance, direction, reflow, and preferences

Review `08` and `09` in light/dark and forced colors, then at 390 px, 200%, and
400% zoom. Confirm the custom preview matches its code, the subtle frame and
fallback remain readable, RTL start shows the opposite horizontal region from
LTR start without mirroring pixels, long fallback text stays contained, and no
page-level horizontal scrolling appears.

Result:
Notes or issue:

## Step 4 — Physical mobile and screen reader

Open `/image` on the recorded device, rotate it, and repeat source-state
selection. With the recorded screen reader, traverse scenarios `01`, `02`, and
`07`. Informative images must expose one useful authored name; decorative and
named-action images must not add duplicate speech; fallback must remain passive
unless surrounding application text provides status.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
