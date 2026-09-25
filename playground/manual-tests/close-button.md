# CloseButton manual protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

| Environment | Recorded value |
| --- | --- |
| Browser and version | Not performed |
| Operating system | Not performed |
| Viewport and zoom | Not performed |
| Assistive technology | Not performed |
| Playground route | `/close-button` |

Use `pass`, `fail`, `blocked`, or `not applicable`.

Scenario order: 01 close-button.sizes; 02 close-button.naming; 03 close-button.dialog; 04 close-button.variants; 05 close-button.popover.

## Accessibility protocol

1. Inspect sizes, centering, light/dark hover, focus, forced colors and RTL.
2. Activate through keyboard and physical touch; ensure one action and correct name.
3. Inspect actual 200%/400% zoom and long localized naming.
4. Verify overlay dismissal and focus return; no form submission.

## Expanded capabilities

Follow every numbered scenario above, including all labelled specimens.
Compare sizes independently of variants. Exercise any controlled reset, clear,
parent-state change or disabled example and confirm the displayed outcome.
Inspect the complete page in both appearances and at narrow width, not only its
first overview. Record any missing capability or unclear demonstration here.

Result:
Notes or issue:

## Step 1 — Focus presentation qualification

Action: Keyboard-focus every close-button action or owned focus part, including
first and last items where relevant. Repeat in light/dark, RTL, OS high
contrast and actual 200%/400% zoom. Check selected/loading states where
supported and rounded or scrolling boundaries.

Expected: Visible focus without layout shifts or clipped edges. Inside
actions use paired foreground paint; field focus survives without shadows
in high contrast. Selection and focus remain distinguishable. Browser
emulation does not replace OS or assistive-technology checks.

Result: not run for this manual protocol revision.
Notes or issue:

## Completion

Overall result:
Follow-up issues: physical device, zoom and assistive-technology execution.
Workbook updated: manual evidence remains open.
