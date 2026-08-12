# Checkbox manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Checkbox |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/checkbox` |

Scenario order: `01 Overview`, `02 States`, `03 Sizes`, `04 Ownership`,
`05 Availability`, `06 Form`, `07 Compose`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Default, states, and sizes

Setup: Open `/checkbox`; review `01 Overview` through `03 Sizes`.

Action: Toggle each checkbox by its row and with Space; compare unchecked,
checked, indeterminate, and each size.

Expected: Activation happens once and focus stays visible. State changes only
the native state/mark; the complete row remains clickable without receiving a
painted hover, press, or focus treatment; feedback stays on the visual square.
Sizes change the complete row and control together while identical content
makes comparisons reliable.

Result:
Notes or issue:

## Step 2 — Ownership and availability

Setup: Open `04 Ownership` and `05 Availability`.

Action: Operate uncontrolled, controlled, read-only, disabled, invalid, and
required examples using pointer and keyboard.

Expected: Ownership changes only where state is stored. Read-only and disabled
do not change; disabled artwork keeps medium geometry in every state. Invalid
and required cues remain distinct.

Result:
Notes or issue:

## Step 3 — Form flow and composition output

Setup: Open `06 Form` and `07 Compose`.

Action: Submit empty, correct, resubmit, and reset the form; test its external
owner. Operate default, render, and asChild paths while inspecting their HTML.

Expected: Validation focuses the checkbox and clears after correction; reset
restores defaults and external ownership targets only its form. Every
composition path keeps one semantic checkbox, content, slots, and native state.

Result:
Notes or issue:

## Step 4 — Theme, customization, and stress

Setup: Open `08 Theme` and `09 Stress`; test light/dark, forced colors,
390 px, 200%, 400%, and RTL.

Action: Operate long-content examples by keyboard and touch.

Expected: Customization visibly changes only its row with sufficient contrast.
Content wraps without clipping; control, mark, focus, touch target, and logical
invalid placement remain clear.

Result:
Notes or issue:

## Step 5 — Screen reader

Setup: Enable the recorded screen reader.

Action: Navigate all states, Form, and composition examples.

Expected: Each checkbox announces one complete name, checkbox role, current
checked/mixed state, and applicable unavailable/required/invalid information.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable touch or assistive-technology environments `blocked`.
