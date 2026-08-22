# Collapsible manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Collapsible |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/collapsible` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 States`,
`05 Anatomy`, `06 Composition`, `07 Theme`, `08 Orientation`, `09 Stress`.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until
tested.

## Step 1 — Defaults, recipes, and anatomy

Open `/collapsible`; review 01–05 top to bottom and toggle every enabled
Trigger. Expected: the default is closed/plain/medium; three surfaces and sizes
are visibly distinct; open, controlled, disabled, and mounted states work; the
default Indicator points down while closed and up while open without changing
layout.

## Step 2 — Keyboard and relationships

Tab through 01–06. Activate each Trigger with Enter, close it with Space, then
inspect Composition output. Expected: focus is visible and stays on Trigger;
state changes once; disabled never opens; `aria-expanded`, `aria-controls`,
IDs, and labelled region match the visible state.

## Step 3 — Appearance, orientation, content changes, and reflow

Review 07–09 in light/dark. Open and close both orientations, then add/remove
live content. Repeat at phone width, 200% and 400%, RTL, reduced motion, and
forced colors. Expected: customization matches its code; vertical height and
horizontal width animate without text reflow; horizontal scrolling stays
inside the component; motion stops when requested; the complete outward focus
ring remains visible in vertical mode and the inset focus ring remains visible
inside horizontal scroll boundaries.

## Step 4 — Assistive technology

Read 01–06 with VoiceOver or the available screen reader and operate each
Trigger. Expected: one named button announces expanded/collapsed and disabled
state; the open region is named by that Trigger; decorative indicators are
silent; focus does not jump into the panel.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
