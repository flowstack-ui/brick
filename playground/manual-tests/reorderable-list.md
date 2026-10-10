# Reorderable List manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Reorderable List |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/reorderable-list` |
| Qualification route(s) | `/reorderable-list?qualification=1` and default docs route |

Scenario order: `01 Overview`, `02 Recipes`, `03 Direct movement`, `04 Input and cancellation`, `05 States`, `06 Orientation and direction`, `07 Theme, customization, and stress`

Also inspect the default documentation route's preview, scroll-container,
dialog and rich-content examples. During dragging verify the passive preview
does not duplicate screen-reader content, source focus survives, displaced
rows do not double-paint, and Escape cancels the drag before closing a dialog.
Test physical touch hold, release outside clipped content, window blur and
source removal. Inspect settlement and cancellation with and without reduced
motion. These instructions do not record a completed human run.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Record a
follow-up issue for each failure or blocker.

## Step 1 — Finish and direct movement

Setup: Open scenarios 01–03 with system appearance.

Action: Inspect every size and recipe. Move first, middle, and last items with
the visible movement controls and follow keyboard focus after each move.

Expected: Rows, control centers, text starts, focus rings, and insertion gaps
are visually finished and aligned. Unavailable movement controls are clear,
focus stays with the moved item, and the visible order changes once.

Result:
Notes or issue:

## Step 2 — Keyboard, mouse, touch, and cancellation

Setup: Open scenario 04 on desktop and a physical touch device.

Action: Lift with Space, move with arrows, drop with Space, and cancel with
Escape. Repeat by mouse and touch, including an abandoned drag outside valid
targets.

Expected: Valid moves commit once, cancelled or abandoned moves preserve the
starting order, the target boundary remains perceivable, focus is retained,
and page scrolling remains available outside an owned touch drag.

Result:
Notes or issue:

## Step 3 — State, theme, reflow, direction, and preferences

Setup: Review scenarios 05–07 in light, dark, forced colors, reduced motion,
RTL, 200%, 400%, and a 320px viewport.

Action: Repeat one direct and one handle-based move in every applicable state.

Expected: Disabled and read-only states never imply a completed move. Meaning,
focus, insertion feedback, content, and logical before/after placement remain
visible without clipped rings or unintended page overflow. Horizontal content
scrolls within its owner.

Result:
Notes or issue:

## Step 4 — Assistive technology

Setup: Enable the recorded screen reader and open scenarios 01 and 04.

Action: Navigate to each handle, lift, move, cancel, commit, and use direct
movement controls.

Expected: Item and control names are complete, instructions are available,
position and completion announcements are understandable, and no movement is
announced twice.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

## Grid and wrapping motion

Drag across each row boundary in Grid and Wrapping cards. Reverse rapidly and cancel with Escape. Confirm no callback until drop, focus stays on the keyed handle, no CSS order remains, and preview does not resize. Repeat RTL, reduced motion, touch, scrolling, narrow viewport and browser zoom. Keyboard: left/right stays within a row, up/down selects adjacent row, Home/End selects boundaries. Verify with VoiceOver and NVDA; browser automation is not a substitute for these checks.

Default preview: drag by the six-dot grip in linear and grid examples. Confirm the grip stays visible beside the label at the same content-row offset. The preview must expose no second focusable handle; custom Preview children replace the default grip/label artwork.

Pointer cursor: drag over card content, action buttons, gaps, and outside the list.
The closed-hand cursor should remain until drop or cancellation. Repeat with no
Preview; test Escape, window blur and removal of the active list. Normal cursors
must return afterward, and keyboard reordering must not change page cursors.
