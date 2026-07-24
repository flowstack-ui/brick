# Component manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Component name |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/component-route` |

Scenario order: `01 Overview`, `02 Scenario name`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Record a
follow-up issue for each failure or blocker.

Follow the playground top to bottom and cover every scenario exactly once.
Combine adjacent scenarios when one uninterrupted flow is clearer. Keep only
steps requiring human visual, interaction-quality, device, or
assistive-technology judgment. When a scenario displays generated IDs, ARIA,
or HTML, compare that output with the live result.

## Step 1 — Overview and first scenario group

Setup: Open `/component-route` in system appearance.

Action: Inspect and operate the named scenarios in top-to-bottom order.

Expected: State the observable visual, interaction, and semantic result in
plain language, including what must remain unchanged.

Result:
Notes or issue:

## Step 2 — Next scenario group

Setup: Open the next named scenarios.

Action: Give the shortest exact interaction needed to test them.

Expected: Give an unfamiliar tester an unambiguous pass condition.

Result:
Notes or issue:

## Step 3 — Theme, reflow, direction, and preferences

Setup: Review the Theme and Stress scenarios in applicable light, dark,
forced-colors, reduced-motion, 200%, 400%, mobile, and RTL environments.

Action: Repeat the primary interaction with keyboard, pointer, and touch where
available.

Expected: Meaning, hierarchy, focus, state, content, and logical layout remain
perceivable without clipping or unintended page scrolling.

Result:
Notes or issue:

## Step 4 — Assistive technology

Setup: Enable the recorded screen reader.

Action: Navigate and operate important states and composition paths.

Expected: Names, roles, states, descriptions, relationships, and announcements
match the public accessibility contract without duplicate speech.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable device or assistive-technology environments `blocked`; do not
pre-fill a pass.
