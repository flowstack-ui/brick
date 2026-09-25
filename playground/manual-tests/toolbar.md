# Toolbar manual-test protocol

Unreleased shared-recipe check: compare the three owners in Shared toggle
recipes for every tone/variant, light/dark and pointer state. Toolbar shares
Button/Toggle geometry and an inset focus ring. Top review controls now use neutral
ghost. Verify the documented selected-background customization still works.

| Run information | Value |
| --- | --- |
| Component | Toolbar |
| Version or commit | Local Brick 0.2.3 / digest-locked Atom 0.26.1 candidate; record commit when available |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/toolbar` |
| Qualification route(s) | `/toolbar`; exhaustive scenarios at `/toolbar?qualification=1` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Variants`, `04 Sizes`, `05 Commands, links, and disabled state`, `06 Toggle selection`, `07 Orientation and keyboard order`, `08 Appearance and customization`, `09 Responsive overflow and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Semantics and keyboard
Check Group naming, the Input's native editing keys, root disabled propagation,
focusable-but-inert disabled commands, loading, iframe navigation, and popup
focus return. Check responsive sizes, per-item overrides and seven size steps.
These new checks remain unperformed manually until a reviewer fills the result.
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

## Step 4 — Focus presentation qualification

Action: Keyboard-focus every toolbar action or owned focus part, including
first and last items where relevant. Repeat in light/dark, RTL, OS high
contrast and actual 200%/400% zoom. Check selected/loading states where
supported and rounded or scrolling boundaries.

Expected: Visible focus without layout shifts or clipped edges. Inside
actions use paired foreground paint; field focus survives without shadows
in high contrast. Selection and focus remain distinguishable. Browser
emulation does not replace OS or assistive-technology checks.

Result: not run for this manual protocol revision.
Notes or issue:

## Completion
Overall result:
Follow-up issues:
Workbook updated:
