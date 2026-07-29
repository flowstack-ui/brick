# Number Input manual-test protocol

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
Setup: Review 01–05. Action: Compare recipes, focus the spinbutton, and step by pointer and keyboard through both bounds. Expected: Geometry is even, focus remains visible, formatting is stable, and unavailable actions remain understandable. Result:
Notes or issue:

## Step 2 — States and form composition
Setup: Review 06–07. Action: Operate controlled, disabled, read-only, required, invalid, Fieldset, submit, reset, and external-form examples. Expected: Only named states change; one value submits and validation focuses the related control. Result:
Notes or issue:

## Step 3 — Theme, reflow, direction, and preferences
Setup: Review 08–09 in light, dark, forced colors, reduced motion, 200%, 400%, mobile, and RTL. Action: Repeat stepping. Expected: Content and actions remain contained, ordered logically, and visibly focused without page overflow. Result:
Notes or issue:

## Step 4 — Assistive technology
Setup: Enable the recorded screen reader. Action: Navigate, edit, step, submit, and reset. Expected: Label, spinbutton role, value, bounds, description, and state are announced once. Result:
Notes or issue:

## Completion
Overall result:
Follow-up issues:
Workbook updated:
