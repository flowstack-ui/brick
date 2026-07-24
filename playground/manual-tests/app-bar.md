# App Bar manual-test protocol

| Run information | Value |
| --- | --- |
| Component | App Bar |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/app-bar` |

Scenario order: `01 Overview`, `02 Variants`, `03 Tones`, `04 Density`,
`05 Surface`, `06 Positions`, `07 Composition`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and visual recipes

Setup: Open `/app-bar` in system appearance and LTR direction.

Action: Inspect `01 Overview`, then compare `02 Variants` and every group in
`03 Tones`.

Expected: The default is a neutral surface landmark with clear start, center,
and end regions. Variants and tones change surface treatment only; content,
height, alignment, and landmark meaning remain consistent.

Result:
Notes or issue:

## Step 2 — Density, surface, and position

Setup: Open `04 Density`, `05 Surface`, and `06 Positions`.

Action: Compare compact, comfortable, and spacious toolbars; inspect bordered,
shadowed, and blurred surfaces; then scroll each position example.

Expected: Density changes coordinated height and spacing. Surface options stay
independent and readable. Static, sticky, absolute, and fixed positions behave
as labeled without covering required content or causing horizontal scrolling.

Result:
Notes or issue:

## Step 3 — Composition output

Setup: Open `07 Composition`.

Action: Compare default, render, and asChild App Bars with the actual HTML shown
beside each live result. Tab through their Icon Button actions and links.

Expected: Every path preserves the banner landmark, toolbar regions, native
host element, slots, names, square actions, and centered content. The displayed
HTML matches the live host.

Result:
Notes or issue:

## Step 4 — Theme and customization

Setup: Open `08 Theme`.

Action: Switch system, light, and dark appearance. Inspect scoped panels and
compare each customization code sample with its live App Bar.

Expected: Text, icons, boundaries, blur, and focus remain readable.
Customization stays local and preserves landmark structure, layout regions,
public classes, slots, and action geometry.

Result:
Notes or issue:

## Step 5 — Reflow, RTL, keyboard, and assistive technology

Setup: Open `09 Stress`; test at 390 px, 200%, and 400% zoom, then use the RTL
example. Enable the recorded screen reader when available.

Action: Operate every visible action and link using keyboard, pointer, and a
touch device when available. Read the landmark and its controls.

Expected: Content reflows without overlap or page overflow, the center remains
visually balanced when possible, actions stay reachable, logical start/end
mirror in RTL, and the landmark plus control names announce once.

Result:
Notes or issue:

## Step 6 — Preferences

Setup: Review representative surfaces in reduced motion, reduced transparency,
and forced colors.

Action: Scroll sticky/fixed examples and focus their actions.

Expected: Nonessential motion and transparency are removed when requested;
opaque fallbacks, boundaries, content, and focus remain visible.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical or assistive-technology environments `blocked`.
