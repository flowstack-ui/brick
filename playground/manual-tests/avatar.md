# Avatar manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Avatar |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/avatar` |

Scenario order: `01 Overview`, `02 Sizes`, `03 Shapes`, `04 Images`,
`05 Semantics`, `06 Statuses`, `07 Notifications`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview, sizes, and shapes

Setup: Open `/avatar` in system appearance.

Action: Inspect `01 Overview`, then compare `02 Sizes` and `03 Shapes`.

Expected: The fallback is centered and readable. Sizes change only the square
frame and fallback scale. Shapes change only clipping/radius; images and
fallbacks never stretch or alter surrounding layout.

Result:
Notes or issue:

## Step 2 — Image and fallback states

Setup: Open `04 Images`.

Action: Switch among loaded, broken, and missing source states.

Expected: The loaded image is cropped cleanly. Broken and missing sources show
the informative fallback without layout shift, broken-image artwork, or
distracting flash.

Result:
Notes or issue:

## Step 3 — Semantics and composition

Setup: Open `05 Semantics`.

Action: Compare informative, decorative, and Button-owned Avatar examples;
activate the Button-owned example.

Expected: Informative Avatar exposes the supplied identity. Decorative Avatar
is silent beside visible text. The owning Button supplies one action name,
focus, and activation without duplicate Avatar speech.

Result:
Notes or issue:

## Step 4 — Status and Notification Badge composition

Setup: Open `06 Statuses` and `07 Notifications`.

Action: Inspect every status on circle and rounded shapes, then count/dot
Notification Badges with and without an Avatar status.

Expected: Status rings follow the frame without changing its size and have
nearby visible meaning beyond color. Notification Badge remains separately
attached and does not distort the Avatar or replace status meaning.

Result:
Notes or issue:

## Step 5 — Theme and customization

Setup: Open `08 Theme`; switch system, light, and dark appearance.

Action: Compare scoped examples and customization code with its live Avatar.

Expected: Fallback, image, status, and indicator boundaries remain readable.
Customization stays local and preserves the frame, crop, public hooks, and
loading/fallback behavior.

Result:
Notes or issue:

## Step 6 — Reflow, RTL, and assistive technology

Setup: Open `09 Stress`; test at 390 px, 200%, and 400% zoom and in RTL. Enable
the recorded screen reader.

Action: Inspect non-Latin fallback and long adjacent content, then navigate the
semantic examples.

Expected: The frame remains square and unclipped with no page overflow;
adjacent text wraps and logical layout mirrors in RTL. Informative,
decorative, and owning-control announcements match Step 3 exactly.

Result:
Notes or issue:

## Step 7 — Forced colors

Setup: Enable forced colors.

Action: Inspect fallback, status rings, Notification Badge, and focused owner.

Expected: Frame, statuses, indicators, and focus remain visible without
depending only on authored color.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable assistive-technology environments `blocked`.
