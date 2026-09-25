# Code Block manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Code Block |
| Version or commit | Brick 0.1.12 candidate |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/code-block` |

Scenario order: Overview → Variants → Sizes → Optional anatomy → Content and
language → Wrapping and overflow → Copy states → Appearance and customization
→ Line metadata → Bounded and collapsible source → Responsive and RTL.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

In Optional anatomy, also inspect the headerless dark example: its named ghost
IconButton must remain above/right without covering source at 320px, tablet,
desktop and zoom. Activate by keyboard, confirm exact copied source and the
success indicator; deny clipboard access to check truthful failure feedback.
Light page appearance must not lighten this locally dark example. This is an
additional manual check, not a completed result.

| Step | Setup and action                                                                          | Expected                                                                                                                                                                                                                                                                                                 | Result | Notes or issue |
| ---- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------- |
| 1    | Open Overview and inspect the live structure.                                             | No header/action/status; one named focusable viewport; exact `pre > code` source.                                                                                                                                                                                                                        |        |                |
| 2    | Review Variants then Sizes top to bottom.                                                 | Only named surface/density changes; source and behavior remain identical.                                                                                                                                                                                                                                |        |                |
| 3    | Traverse Optional anatomy by keyboard and copy once.                                      | Title, `tsx`, Copy source, Content, and Status follow logical focus order; status moves pending to copied and focus stays on Trigger.                                                                                                                                                                    |        |                |
| 4    | Review raw markup and trusted pre-tokenized React output.                                 | Raw markup displays as text; the tokenized `import` is styled without unsafe markup execution.                                                                                                                                                                                                           |        |                |
| 5    | Focus Scroll, use horizontal keys, then compare Wrap.                                     | Preserved lines remain reachable through one scroll owner; Wrap reflows the same source without a second scroll region.                                                                                                                                                                                  |        |                |
| 6    | Inspect every Line metadata state in preserved and wrapped examples.                      | Authored numbers align; focus/highlight remain distinct; additions/removals stay readable without reducing sibling contrast.                                                                                                                                                                             |        |                |
| 7    | Keyboard-scroll bounded source, then activate Show full source and Hide full source.      | Exactly five complete preview lines are shown with no partial sixth line; `aria-expanded` and action wording change truthfully; opening grows smoothly from the preview height; bounded preview leaves the accessibility tree; Collapsible Content becomes the controlled region and reveals every line. |        |                |
| 8    | Run Success, Error, and Disabled copy states.                                             | Truthful copied/error wording resets after about 1.5 seconds; disabled never copies; Trigger focus is retained.                                                                                                                                                                                          |        |                |
| 9    | Compare light/dark defaults and the customized dark block.                                | Customized surface, text, border, and radius match the visible contract while focus and source remain readable.                                                                                                                                                                                          |        |                |
| 10   | Repeat at 320/390 px, 200% text, 400% zoom, text-spacing override, long content, and RTL. | No page overflow; all lines remain reachable; logical header mirrors while source remains LTR.                                                                                                                                                                                                           |        |                |
| 11   | Repeat the primary path with keyboard, forced colors, and the recorded screen reader.     | Every viewport has its authored name, focus remains visible, and copy status is announced politely once without duplicate content.                                                                                                                                                                       |        |                |

## Step 1 — Focus presentation qualification

Action: Keyboard-focus every code-block action or owned focus part, including
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

Overall result: pending recorded run

Follow-up issues:

Workbook updated:
## September 12 parity follow-up — manual checks pending

Inspect the new documentation route in light/dark appearance, narrow widths,
actual browser zoom and forced colors. Confirm Shiki palette readability, exact copying, diff signs, line focus, bounded expansion and floating actions. Screen-reader and physical-device checks are not marked passed by automation.
