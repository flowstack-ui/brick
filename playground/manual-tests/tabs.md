# Tabs manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Tabs |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/tabs` |
| Qualification route(s) | `/tabs` (docs), `/tabs?qualification=1` (matrix) |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Layout`,
`05 States`, `06 Behavior`, `07 Composition`, `08 Theme`, `09 Stress`.

Additional parity checks: inspect filled and line indicator motion in both
directions after scrolling; selected paint must not double. Check explicit
lazy retention, fade exits, dynamic removal, disabled composed links, all
responsive resets and controller/provider. Text-only panels should enter Tab
order, while a panel with a focusable control should lead to that control.
Switch dynamic documents repeatedly: only one non-animated panel should paint
at any instant, with no temporary extra row or height jump. Repeat with retained
panels. Explicit fades may cross-fade; reduced motion must remove that overlap.
At fade completion, outgoing text must stay transparent until removal. Switch
rapidly between all three animated panels and confirm only the final one remains.
Add a document in LTR and RTL: the horizontal indicator must stay on its baseline
throughout its slide, never travel diagonally from the top of the trigger.
Human screen-reader, physical-device and actual browser-zoom results must remain
unperformed until an operator executes them; automated viewport checks are not
substitutes.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until
tested.

## Step 1 — Defaults, variants, sizes

Also compare neutral soft selection with the accent default: both are flat;
solid retains elevation. Check light, dark, high contrast and keyboard focus.
The existing protective inset remains intentional until the focus audit.

Open `/tabs`; review 01–03. Focus and activate identical tabs in each recipe.
Expected: defaults are medium line; only the named variant or size changes;
selection, panel content, alignment, and focus remain clear. Reload while
watching the variants: line may enhance its already visible selected edge with
the measured Indicator, while solid, soft, and enclosed never reveal an extra
underline or change selected paint during hydration.
Confirm the square-line example has zero Trigger radius while its selected
underline and complete focus ring remain visible.

## Step 2 — Layout, content, states

Review 04–05. Use arrows in horizontal and vertical lists and try Locked.
Expected: correct arrow axis, equal fitted width, aligned icon/long labels, and
disabled tabs never focus or activate. Focus the first and last Trigger in
solid and soft Lists inside the clipped responsive Card; every side of the
focus ring remains visible. The responsive vertical example uses
two equal visual columns at phone width and one column beside its panel at the
desktop breakpoint while Arrow Up and Arrow Down remain unchanged.

## Step 3 — Activation and composition

Review 06–07 using keyboard. Expected: automatic changes on focus; manual
changes only with Enter/Space; focusable panel is reachable; live HTML matches
roles, IDs, classes, slots, and selected state.

## Step 4 — Theme and stress

Review 08–09 in light/dark, phone width, 200%/400%, RTL, forced colors, and
reduced motion. Expected: customization matches code; tabs scroll without
wrapping; RTL arrows mirror; selected/focus states persist; indicator stops
animating when reduced motion is active.

## Step 5 — Assistive technology

Traverse Overview. Expected: one named tablist, selected/disabled states and
related panels announce once; arrow navigation does not add extra tab stops.

## Step 6 — Focus presentation qualification

Action: Keyboard-focus every tabs action or owned focus part, including
first and last items where relevant. Repeat in light/dark, RTL, OS high
contrast and actual 200%/400% zoom. Check selected/loading states where
supported and rounded or scrolling boundaries.

Expected: Visible focus without layout shifts or clipped edges. Tab triggers
and focusable panels use the shared semantic focus color independently of
neutral/accent label tone, with Highlight outlines in high contrast.
Selection and focus remain distinguishable. Browser
emulation does not replace OS or assistive-technology checks.

Result: not run for this manual protocol revision.
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
