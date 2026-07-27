# Accordion manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Accordion |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/accordion` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Selection`,
`05 States`, `06 Orientation`, `07 Composition`, `08 Theme`, `09 Stress`.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until
tested.

## Step 1 — Defaults, recipes, selection, and states

Open `/accordion`; review 01–05 top to bottom and activate every enabled
Trigger. Expected: default is closed/plain/medium/vertical; variants and sizes
change only their named recipe; single, collapsible, controlled, and multiple
models report the visible value; disabled controls do not open; the locked-open
Trigger stays focusable but cannot close.

## Step 2 — Keyboard, orientation, and relationships

In 06, Tab to the first vertical Trigger; use Up/Down and Home/End. Repeat on
horizontal with Left/Right, then repeat horizontal in RTL at 09. Activate with
Enter and Space. Inspect 07 output. Expected: focus follows enabled Triggers in
visual reading order; disabled items are skipped; activation happens once;
expanded, controls, IDs, labels, headings, and optional region role match.

## Step 3 — Appearance, responsive overflow, and motion

Review 08–09 in light/dark at desktop, phone width, 200% and 400%, reduced
motion, and forced colors. Open and close vertical and horizontal panels.
Expected: customization matches code; inner content does not reflow while
moving; narrow horizontal scrolling stays inside Accordion; the page does not
overflow; focus, indicator, dividers, and text remain visible.

## Step 4 — Assistive technology

Read 01, 04–07 with VoiceOver or the available screen reader and operate every
model. Expected: each heading contains one named button announcing expanded,
collapsed, or unavailable state; landmark panels are named by their Trigger;
the landmark-free panel adds no region; decorative indicators are silent.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
