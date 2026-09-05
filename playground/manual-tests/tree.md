# Tree manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Tree |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/tree` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Variants`,
`04 Sizes and guides`, `05 Selection and interaction`, `06 Appearance and
customization`, `07 Responsive, RTL, and content stress`, `08 Preference
boundaries`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Keyboard, focus, expansion, and selection

Enter each tree once with Tab. Confirm entry activates the first visible
selected item, bounded Up/Down and Home/End navigation, logical expand/collapse
arrows, activation, typeahead, focus restoration, single/multiple selection,
and disabled/read-only boundaries. Confirm focus and selection remain visually
distinct.

Result:
Notes or issue:

## Step 2 — Semantics and assistive technology

Confirm a screen reader announces the Tree name, item labels, levels,
selection, expansion, and disabled state. Confirm ItemContent adds no role,
Indicator and guides are silent, hidden groups are absent or hidden correctly,
and authored metadata does not replace ItemText as the name.

Result:
Notes or issue:

## Step 3 — Appearance and content quality

Inspect plain/soft/outline, subtle/default/strong outline borders, sm/md, guides, leading content, trailing metadata,
hover, active, selected, expanded, disabled, light/dark, customized tokens,
long text, and deep nesting. Confirm outline clipping retains rounded corners
and no row or guide paint overflows the root.

Result:
Notes or issue:

## Step 4 — Reflow, direction, preferences, and touch

At 320 CSS px and 200/400% zoom, confirm no page-level overflow or clipped
focus. Confirm RTL mirrors indentation, guide position, metadata alignment, and
closed chevrons while open chevrons point down. Confirm reduced motion removes
rotation transitions and forced colors retain focus, selection, disabled, and
hierarchy boundaries. Operate md rows on a physical touch device.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
