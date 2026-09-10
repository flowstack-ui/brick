# Steps manual qualification

Pending physical-device and assistive-technology execution; automated results are recorded separately.

| Run information | Value |
| --- | --- |
| Component | Steps |
| Version or commit | Unpublished local candidate |
| Reviewer | Pending |
| Date | Not performed |
| Browser and version | Not performed |
| Operating system | Not performed |
| Viewport and zoom | Actual 200% and 400% pending |
| Assistive technology | Not performed |
| Playground route | `/steps` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: 01 steps.workflow; 02 steps.recipes; 03 steps.vertical; 04 steps.validation; 05 steps.variants; 06 steps.content; 07 steps.states.

## Step 1 — Workflow and recipes

1. steps.workflow — interactive state, retained values, completion, and reset.
2. steps.recipes — four marker sizes and both recipes.
3. steps.vertical — vertical RTL and long labels.
4. steps.validation — controlled forward validation.
5. steps.variants — both variants and both tones with equivalent content.
6. steps.content — vertical progress beside content, retained input and unmounted details.
7. steps.states — custom indicators, disabled navigation and initial completion.

Action: Complete and reset the workflow, then test backward movement and the
validation guard. Enter an account name in the vertical editor, move forward and
back, and inspect retention. Compare each independent size and recipe.

Expected: The application value and visible stage agree. Invalid forward
movement is blocked. Disabled triggers do not navigate. Vertical content wraps
within a narrow host without distorting its markers.

Result:
Notes or issue:

## Step 2 — Accessibility and visual stress

- VoiceOver/Safari and NVDA/Firefox: ordered list, current stage, named active content, native buttons, completion text.
- Tab, Shift+Tab, Space, Enter: no arrow-key tablist behavior; no hidden form controls in focus order.
- Linear validation: invalid forward navigation preserves stage and focus; backward movement works.
- Touch and 200%/400% zoom: targets remain operable; narrow vertical labels wrap without marker distortion.
- RTL, light/dark, forced colors: connectors and current/completed states remain distinguishable.
- Retained panel focus moves into the newly active panel; unmounted-panel focus is application-owned.

Result:
Notes or issue:

## Expanded capabilities

Follow every numbered scenario above, including all labelled specimens.
Compare sizes independently of variants. Exercise any controlled reset, clear,
parent-state change or disabled example and confirm the displayed outcome.
Inspect the complete page in both appearances and at narrow width, not only its
first overview. Record any missing capability or unclear demonstration here.

Result:
Notes or issue:

## Step 3 — Focus presentation qualification

Action: Keyboard-focus every steps action or owned focus part, including
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
Follow-up issues: Physical devices, actual zoom and assistive technology remain unperformed.
Workbook updated: No independent manual pass is claimed.
