# Toggle manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Toggle |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/toggle` |

Scenario order: `01 Overview`, `02 Variants`, `03 States`, `04 Sizes`,
`05 Shapes`, `06 Composition`, `07 Disabled`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview, variants, and pressed states

Setup: Open `/toggle` in system appearance.

Action: Activate `01 Overview`; compare every recipe in `02 Variants` and both
pressed states in `03 States`.

Expected: Default soft medium rounded Toggle changes pressed state once and
retains focus. Variants remain visually distinct when pressed. State changes
do not alter size, label, or geometry.

Result:
Notes or issue:

## Step 2 — Sizes, shapes, and icon content

Setup: Open `04 Sizes` and `05 Shapes`.

Action: Compare the full size scale, each shape, text content, and icon-only
content.

Expected: Sizes change coordinated target/content geometry only. Shapes change
radius only. Icon-only Toggle remains completely named and its icon stays
centered without changing the selected treatment.

Result:
Notes or issue:

## Step 3 — State ownership and composition output

Setup: Open `06 Composition`.

Action: Operate controlled/uncontrolled state examples, inspect render and
asChild output, then activate the rendered Toggle while watching its HTML.

Expected: Ownership changes only who stores state. Each host remains a native
pressed button with expected classes/slots, and displayed `aria-pressed` and
`data-state` update with the live control.

Result:
Notes or issue:

## Step 4 — Disabled states

Setup: Open `07 Disabled`.

Action: Tab through and attempt to activate disabled unpressed and pressed
examples.

Expected: Both preserve their visible state and geometry, are skipped or
announced unavailable according to native behavior, and never change state.

Result:
Notes or issue:

## Step 5 — Theme and customization

Setup: Open `08 Theme`; switch system, light, and dark appearance.

Action: Inspect scoped examples and compare customization code with its live
Toggle.

Expected: Rest, hover, pressed, disabled, and focus remain clear. Customization
visibly changes the Toggle itself, stays local, and preserves pressed behavior,
classes, slots, and accessible name.

Result:
Notes or issue:

## Step 6 — Reflow, RTL, input, and preferences

Setup: Open `09 Stress`; test at 390 px, 200%, and 400% zoom and in RTL, then
reduced motion and forced colors.

Action: Operate long-content examples using keyboard, pointer, and touch.

Expected: Content wraps without overflow, geometry remains usable, logical
order mirrors in RTL, activation occurs once, touch retains no false hover,
motion is nonessential, and system colors preserve state/focus.

Result:
Notes or issue:

## Step 7 — Screen reader

Setup: Enable the recorded screen reader.

Action: Navigate Overview, icon-only, composition, and disabled examples.

Expected: Every Toggle announces one complete name, button role, pressed state,
and unavailable state without duplicate icon speech.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable touch or assistive-technology environments `blocked`.
