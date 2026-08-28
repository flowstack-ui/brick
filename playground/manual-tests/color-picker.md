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

Scenario order: `01 Overview`, `02 Sizes and variants`, `03 Presets and form`, `04 States`, `05 Responsive composition`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Text, native, preset, and form behavior

Expected: Valid short or long hex text normalizes; invalid text reverts on blur; the native chooser and every named preset update one value; submit reports that value and reset restores the default.

Result:
Notes or issue:

## Step 2 — Popover keyboard and focus

Expected: Trigger opens the presets; Tab reaches every enabled preset in order; Enter or Space selects; Escape closes and restores focus; outside interaction dismisses without losing the committed value.

Result:
Notes or issue:

## Step 3 — Disabled, read-only, and invalid

Expected: Disabled prevents opening and mutation. Read-only remains inspectable and can open but cannot mutate. Invalid has a persistent danger boundary without relying on color alone when composed in Field.

Result:
Notes or issue:

## Step 4 — Appearance, forced colors, and motion

Expected: Light and dark preserve text, border, swatch, selected, hover, and focus contrast. Forced colors keeps system boundaries and a non-color selected cue. Reduced motion removes nonessential transitions.

Result:
Notes or issue:

## Step 5 — Reflow, zoom, RTL, and localization

Expected: At 320 px, 200% text, 400% zoom, and RTL, the page has no horizontal overflow; controls wrap without overlap; floating content remains reachable; long labels and preset names wrap.

Result:
Notes or issue:

## Step 6 — Assistive technology and devices

Expected: Label names the editable input, the native chooser has a clear name, presets announce names and pressed state, the hidden value is not announced, and touch targets remain usable on a physical mobile device.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
