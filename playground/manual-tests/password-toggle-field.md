# Password Toggle Field manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Password Toggle Field |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/password-toggle-field` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Shapes`, `05 Visibility and localization`, `06 States`, `07 Form, Fieldset, and Field`, `08 Appearance and customization`, `09 Responsive and RTL`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Recipes and visibility
Setup: Review 01–05. Action: Compare recipes and toggle default and localized examples by pointer and keyboard. Expected: Text never shifts, eye artwork remains optically centered inside its square action, focus remains visible, and action names always describe the next action. Result:
Notes or issue:

## Step 2 — States and form composition
Setup: Review 06–07. Action: Operate all states, submit while visible, and reset. Expected: Field relationships remain correct, disabled/read-only distinctions hold, submission restores password type, and reset hides uncontrolled content. Result:
Notes or issue:

## Step 3 — Theme, reflow, direction, and preferences
Setup: Review 08–09 in light, dark, forced colors, reduced motion, zoom, mobile, and RTL. Action: Toggle long localized actions. Expected: Text and action stay contained and logically placed without clipping or page overflow. Result:
Notes or issue:

## Step 4 — Assistive technology
Setup: Enable the recorded screen reader. Action: Edit and toggle each important state. Expected: Label, password entry state, description, validity, and localized next-action name are announced once. Result:
Notes or issue:

## Completion
Overall result:
Follow-up issues:
Workbook updated:
