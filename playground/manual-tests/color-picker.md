# Color Picker manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Color Picker |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/color-picker` |

Scenario order: `01 Overview`, `02 Inline editor`, `03 Sizes and variants`, `04 Formats and channel inputs`, `05 Presets and selected indicator`, `06 Native chooser and EyeDropper`, `07 States and form`, `08 Appearance, customization, and RTL`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Area, channel, text, and preset synchronization

Expected: Area pointer/keyboard changes, hue and alpha sliders, text, channel inputs, and every named preset update one shared value. Swatch and ValueText remain synchronized, including alpha.

Result:
Notes or issue:

## Step 2 — Formats, popup, keyboard, and focus

Expected: RGBA, HSLA, and HSBA switch without changing the represented color. Trigger opens the editor; Tab reaches controls in order; arrows operate the area/sliders; Escape closes and restores focus; outside interaction dismisses without losing the committed value.

Result:
Notes or issue:

## Step 3 — Platform paths, forms, and states

Expected: Native chooser updates the shared value. EyeDropper is usable only where supported and remains a progressive enhancement. HiddenInput submits one current value and reset restores the default. Disabled prevents opening and mutation; read-only blocks mutating popup controls and remains inspectable when composed inline; invalid keeps a persistent danger boundary.

Result:
Notes or issue:

## Step 4 — Appearance, forced colors, and motion

Expected: Light and dark preserve text, area, tracks, thumb, inputs, popup, selected, hover, and focus contrast. Forced colors keeps system boundaries and a visible non-color selected cue. Reduced motion removes nonessential transitions.

Result:
Notes or issue:

## Step 5 — Reflow, zoom, RTL, and localization

Expected: At 320 px, 200% text, 400% zoom, and RTL, the page has no horizontal overflow; controls wrap without overlap; floating content remains reachable; long labels and preset names wrap.

Result:
Notes or issue:

## Step 6 — Assistive technology and devices

Expected: Label names the primary input, every channel and platform action has a clear name, presets announce names and checked state, the hidden value is not announced, and area/slider/preset targets remain usable on physical mobile hardware.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
