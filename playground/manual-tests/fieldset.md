# Fieldset manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Fieldset |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/fieldset` |

Scenario order: `01 Overview`, `02 Anatomy`, `03 States`, `04 Descendants`,
`05 Relations`, `06 Compose`, `07 Theme`, `08 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Default anatomy and states

Setup: Open `/fieldset`; review `01 Overview` through `03 States`.

Action: Operate required, optional, disabled, and invalid groups.

Expected: Every group remains an unboxed native grouping with one legend and
related controls. Description/error placement is stable; only the named state
changes, and disabled descendants cannot be changed.

Result:
Notes or issue:

## Step 2 — Descendant composition

Setup: Open `04 Descendants`.

Action: Operate the Checkbox Group and nested Fields from start to finish.

Expected: Descendants keep their own labels, states, and interaction while the
legend and shared messages retain group context. Focus follows source order.

Result:
Notes or issue:

## Step 3 — Relationships and composition output

Setup: Open `05 Relations` and `06 Compose`.

Action: Compare generated and forced error relationships with their displayed
HTML. Inspect default, render, and asChild output.

Expected: Displayed IDs and ARIA references resolve to the live legend,
description, and applicable error. `forceMatch` shows the message without
falsely making the group invalid. Native grouping is preserved when required.

Result:
Notes or issue:

## Step 4 — Theme, customization, and stress

Setup: Open `07 Theme` and `08 Stress`; test light/dark, 390 px, 200%, 400%,
and RTL.

Action: Operate every group with keyboard and touch where available.

Expected: Custom spacing/color is visible and local. Long legends, unbroken
descriptions, choices, errors, and logical alignment reflow without clipping.

Result:
Notes or issue:

## Step 5 — Screen reader

Setup: Enable the recorded screen reader.

Action: Navigate the default, descendant, invalid, and composed groups.

Expected: Legend and group context are announced once with descriptions,
required/disabled/invalid state, applicable errors, and distinct descendant
labels.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable touch or assistive-technology environments `blocked`.
