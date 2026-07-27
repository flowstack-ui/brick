# Radio Group manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Radio Group |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/radio-group` |

Scenario order: `01 Overview`, `02 Sizes`, `03 Layout`, `04 Ownership`,
`05 States`, `06 Validation`, `07 Form`, `08 Compose`, `09 Theme`, `10 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Leave
every result blank until the named environment is actually tested.

## Step 1 — Default, sizes, and layout

Setup: Open `/radio-group`; review scenarios 01–03 from top to bottom.

Action: Select every Overview choice. Compare `sm`, `md`, `lg`, vertical, and
horizontal examples; narrow the viewport until the horizontal row wraps.

Expected: Exactly one choice stays selected. Sizes increase evenly while all
other defaults remain identical. Horizontal content wraps without clipping.

Result:
Notes or issue:

## Step 2 — Keyboard, ownership, and states

Setup: Continue through scenarios 03–05 using keyboard only.

Action: Tab into each group; use arrows and Home/End. Select Text messages in
both ownership examples. Try the disabled item, disabled group, and read-only
group.

Expected: Each group has one Tab stop; arrows select, Home/End reach the ends,
and disabled choices are skipped. Both outputs become `sms`. Read-only arrows
move focus without changing Email reports; disabled controls do not operate.

Result:
Notes or issue:

## Step 3 — Validation and native forms

Setup: Continue through scenarios 06–07.

Action: Submit the empty native example, choose a value, and submit again. In
the form example choose Text messages, save, then reset.

Expected: Empty native validation focuses the first radio; correction clears
the failure. Save reports `Submitted: sms`; reset restores Email reports. The
external group remains Push notifications and participates in the named form.

Result:
Notes or issue:

## Step 4 — Composition and output

Setup: Continue to scenario 08.

Action: Operate both groups and compare their live DOM with the output shown
on the right.

Expected: Both custom hosts retain normal circles, one selected value, roles,
labels, state, and Brick slots. Output shows the authored adapter attributes
without extra wrapper elements.

Result:
Notes or issue:

## Step 5 — Appearance and customization

Setup: Continue to scenario 09; also use the page Light and Dark controls.

Action: Focus and select choices in both scoped examples and the customized
example.

Expected: Both appearances remain readable. Only the customized group has the
larger green selected control and wider spacing shown by its exact code.

Result:
Notes or issue:

## Step 6 — Mobile, zoom, RTL, and preferences

Setup: Continue to scenario 10. Test a physical phone, 200% and 400% zoom,
reduced motion, and forced-colors/high-contrast mode.

Action: Operate the long-label group. In RTL, focus the first choice and press
Left. Follow the page top to bottom once in each environment.

Expected: Labels wrap without page-level horizontal scroll; targets remain
usable. RTL selects the visually next choice and keeps the invalid cue on the
logical start edge. Reduced motion is immediate; forced colors distinguish
focus, checked, disabled, read-only, and invalid states.

Result:
Notes or issue:

## Step 7 — Assistive technology

Setup: Return to the top with the recorded screen reader or voice-control
environment.

Action: Traverse every group, select choices, trigger validation, and inspect
the read-only group.

Expected: Legends/name labels identify each group; radios announce position,
selected state, disabled/read-only state, descriptions, and errors once.
Validation focus and form actions remain understandable.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
