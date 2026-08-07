# Carousel manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Carousel |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/carousel` |

Scenario order: `01 Overview`, `02 Optional controls`, `03 User-controlled rotation`, `04 Placement, size, and appearance`

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

## Step 1 — Controls and touch

Operate arrows and picker dots by pointer, keyboard, and touch swipe. Confirm one slide settles at a time, focus remains visible, labels match destinations, and the control-free example remains usable by native horizontal scrolling.

Result:
Notes or issue:

## Step 2 — Automatic rotation

Start rotation, then hover, focus inside, and use the stop control. Confirm rotation pauses for interaction, does not restart without explicit action after focus, and all direct controls remain available.

Result:
Notes or issue:

## Step 3 — Reflow and preferences

Review light, dark, forced colors, reduced motion, RTL, 200%, 400%, and mobile. Confirm controls remain perceivable, slide content is not clipped, picker dots do not wrap incorrectly, and surrounding layout does not shift.

Result:
Notes or issue:

## Step 4 — Assistive technology

With a screen reader, navigate the labelled carousel, active slide, controls, and picker. Confirm inactive content is not reachable and rotation announcements do not create repeated speech.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
