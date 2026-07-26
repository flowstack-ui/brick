# Sidebar manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Sidebar |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/sidebar` |

Scenario order: `01 Overview`, `02 States`, `03 Variants`, `04 Sizes`,
`05 Sides and position`, `06 Panel regions and composition`,
`07 Behavior and output`, `08 Appearance and customization`,
`09 Responsive and stress`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Record a follow-up issue for each failure or blocker.

## Step 1 — Layout, recipes, and regions

Setup: Open `/sidebar` in system appearance and review scenarios 01–06 top to bottom.

Action: Compare states, variants, sizes, sides, sticky behavior, regions, Scroll Area, and composed output. Tab through every visible control.

Expected: Only the named dimension changes; panel and main never overlap or clip. Rail controls remain named, right placement mirrors, sticky content stays usable, and Header/Content/Footer remain aligned.

Result:
Notes or issue:

## Step 2 — Controlled, disabled, and offcanvas behavior

Setup: Continue to scenario 07.

Action: Activate the controlled Trigger with pointer, Enter, and Space. Compare live state and rendered HTML. Try the disabled Trigger and tab after offcanvas output.

Expected: Expanded changes to rail, generated relationships match output, disabled state cannot change, and focus never enters inert offcanvas content.

Result:
Notes or issue:

## Step 3 — Appearance, reflow, direction, and preferences

Setup: Review scenarios 08–09 in light, dark, forced colors, reduced motion, 200%, 400%, low-height, mobile, and right-side environments.

Action: Repeat the primary Trigger interaction and inspect customized and localized shells.

Expected: State, hierarchy, focus, borders, names, and main content remain perceivable without overlap, clipping, unwanted page scrolling, or motion when reduced motion is requested.

Result:
Notes or issue:

## Step 4 — Assistive technology

Setup: Enable the recorded screen reader and review overview, rail, controlled, disabled, and offcanvas specimens.

Action: Navigate landmarks, Trigger, panel navigation, and main content; activate Trigger in each supported state.

Expected: Complementary, navigation, and main landmarks are distinct; controls/expanded/disabled state is accurate; rail names remain meaningful; offcanvas Panel is absent.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
