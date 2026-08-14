# Toolbar manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Toolbar |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/toolbar` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Variants`, `04 Sizes`, `05 Commands, links, and disabled state`, `06 Toggle selection`, `07 Orientation and keyboard order`, `08 Appearance and customization`, `09 Responsive overflow and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Semantics and keyboard
Confirm one Tab entry, orientation-aware arrows, Home/End, looping, disabled omission, activation, links, toggle announcements, and visible focus. Move focus across the first, middle, and last command, link, and toggle controls; confirm the ring remains complete inside soft, outline, and zero-padding plain roots.

Confirm neutral solid selection is raised and white-ish over a light Toolbar,
stronger raised neutral over dark, and changes again on hover/press. Disabled
commands and selected ToggleItems must fade and remove enabled selection paint.

Result:
Notes or issue:

## Step 2 — Visual recipes
Inspect all variants and sizes in light, dark, forced colors, and reduced motion. Confirm coordinated targets, centered icons/text, separators, state-only paint changes, and the neutral solid ToggleGroup while retaining one Toolbar keyboard model.

Result:
Notes or issue:

## Step 3 — Reflow and direction
At 320 CSS px and 200/400% zoom, confirm main-axis scrolling keeps every item reachable without wrapping or page overflow. Confirm horizontal and vertical scrolling boundaries do not clip focused edge controls. Confirm RTL navigation and logical layout.

Result:
Notes or issue:

## Completion
Overall result:
Follow-up issues:
Workbook updated:
