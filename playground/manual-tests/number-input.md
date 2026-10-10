# Number Input manual-test protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

| Run information | Value |
| --- | --- |
| Component | Number Input |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/number-input` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Shapes`, `05 Stepping and bounds`, `06 States`, `07 Form, Fieldset, and Field`, `08 Appearance and customization`, `09 Responsive and RTL`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Recipes and stepping
Setup: Review 01–05. Action: Compare recipes, focus the spinbutton, and step by pointer and keyboard through both bounds. Expected: Geometry is even, focus remains visible, formatting is stable, and unavailable actions remain understandable. The field layout keeps its compact logical-end actions; the stepper layout shows separated square actions around a centered value. In the hover-stepper example, actions appear on hover or focus without changing the field width and remain visible on a coarse pointer. Result:
Notes or issue:

## Step 2 — States and form composition
Setup: Review 06–07. Action: Operate controlled, disabled, read-only, required, invalid, Fieldset, submit, reset, and external-form examples. Expected: Only named states change; one value submits and validation focuses the related control. Result:
Notes or issue:

## Step 3 — Theme, reflow, direction, and preferences
Setup: Review 08–09 in light, dark, forced colors, reduced motion, 200%, 400%, mobile, and RTL. Action: Repeat stepping and inspect each stacked action on a touch device. Expected: Content and actions remain contained, ordered logically, and visibly focused without page overflow; each step action is at least 24 CSS px tall under coarse-pointer input. Result:
Notes or issue:

## Step 4 — Assistive technology
Setup: Enable the recorded screen reader. Action: Navigate, edit, step, submit, and reset. Expected: Label, spinbutton role, value, bounds, description, and state are announced once. Result:
Notes or issue:

## Step 5 — Focus presentation qualification

Action: Keyboard-focus every number-input action or owned focus part, including
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

## Form surface comparison

- Compare outline and surface on light/dark canvas and raised parents: outline stays transparent; surface owns its neutral fill without adding a shadow.
- Hover, focus, disable and mark invalid; preserve visible boundaries and explicit state treatment. Compare matched size recipes including their outer borders.
- Check narrow/RTL containment and forced colors. Popup panels and selection marks must retain their independent paint.
## Internationalization parity follow-up

Visual correction checks: compare 200px examples at desktop and narrow widths.
In Controller and label, the label is outside Group with aligned leading edges.
In Scrubber, drag the compact leading icon and confirm keyboard entry remains
available. On a fine pointer, move away from Responsive and hover controls:
both actions and their divider disappear, with no geometry change. Focus reveals
them; touch keeps them visible. Test grouped fields in RTL and forced colors.

Not performed: physical-device, screen-reader, and actual browser zoom review.
Inspect the modern default route and the preserved ?qualification=1 route.
Verify native language/direction semantics, narrow containment, explicit locale
overrides, and light/dark text clarity. For NumberInput also inspect typed,
wheel, press-and-hold and scrubber paths, and distinguish disabled from read-only.
Do not mark these manual checks passed from automated results alone.
