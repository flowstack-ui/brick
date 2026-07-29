# OTP Field manual-test protocol

| Run information | Value |
| --- | --- |
| Component | OTP Field |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/otp-field` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes and shapes`, `04 Layouts`, `05 Input behavior`, `06 States`, `07 Form, Fieldset, and Field`, `08 Appearance and customization`, `09 Responsive and RTL`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Recipes, cells, and input behavior
Setup: Review 01–05. Action: Type, paste, erase, arrow between cells, complete masked and localized examples. Expected: Cells align, accepted characters advance predictably, paste distributes once, and focus remains visible. Result:
Notes or issue:

## Step 2 — States and form composition
Setup: Review 06–07. Action: Operate all states, submit empty and complete values, then reset. Expected: One native value participates, validation targets the first cell, and Fieldset state reaches the field. Result:
Notes or issue:

## Step 3 — Theme, reflow, direction, and preferences
Setup: Review 08–09 in light, dark, forced colors, reduced motion, zoom, mobile, and RTL. Action: Repeat entry and paste. Expected: Every cell remains contained and logical without clipping or horizontal page overflow. Result:
Notes or issue:

## Step 4 — Assistive technology
Setup: Enable the recorded screen reader. Action: Navigate every cell and complete the code. Expected: Position-aware localized names, value, required, invalid, disabled, and read-only states are announced without duplicate group speech. Result:
Notes or issue:

## Completion
Overall result:
Follow-up issues:
Workbook updated:
