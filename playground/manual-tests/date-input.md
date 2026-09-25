# Date Input manual-test protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

| Run information | Value |
| --- | --- |
| Component | Date Input |
| Version or commit | Unpublished local candidate |
| Reviewer | Pending independent manual review |
| Date | Not performed |
| Browser and version | Not performed |
| Operating system | Not performed |
| Viewport and zoom | Actual 200% and 400% zoom pending |
| Physical device | Unavailable |
| Assistive technology | Unavailable |
| Playground route | `/date-input` |

Scenario order: 01 date-input.sizes; 02 date-input.recipes; 03 date-input.forms; 04 date-input.locale; 05 date-input.granularity; 06 date-input.format; 07 date-input.controlled; 08 date-input.constraints.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.
Automated browser checks are separate evidence, not manual passes.

## Step 1 — Visible scenarios and interaction

Setup: Open `/date-input` and follow the scenario order above.

Action: Operate each example with keyboard and pointer. Edit or select dates,
exercise the displayed modes, and compare selected state with displayed value.
Check disabled and read-only examples where shown. For form examples, submit an
empty required value, enter a valid date and reset the form.

Expected: Date values, labels, selection and focus remain synchronized. Invalid
entry does not silently submit a previous value. Reset restores initial values.
Single and range segments retain their independent names and editing order.
DateInput has no popup or multiple-selection mode; those are DatePicker and
Calendar checks, not requirements for this route.

Result:
Notes or issue: Human interaction-quality review remains unperformed.

## Step 2 — Theme, reflow, direction and preferences

Setup: Inspect light and dark appearance, forced colors, RTL, real 200% and
400% browser zoom, and a physical touch device.

Action: Repeat the main interaction and inspect every scenario.

Expected: Targets, focus and state remain perceivable; adjacent specimens reflow
without overlap. Segments remain vertically aligned with clear actions, editable
text is not clipped, and localized range endpoints retain distinct names.

Result:
Notes or issue: Emulated mobile checks do not replace actual zoom or hardware.

## Step 3 — Assistive technology

Setup: Enable VoiceOver or NVDA and record its browser and version above.

Action: Navigate labels and date segments, edit a date, and inspect invalid-state
messages, clearing, and focus movement between range endpoints.

Expected: Names, roles, values, descriptions and state are announced without
duplicate speech. Segment keyboard editing and native form validation focus are usable.

Result:
Notes or issue: Screen-reader review has not been performed.

## Expanded capabilities

Follow every numbered scenario above, including all labelled specimens.
Compare sizes independently of variants. Exercise any controlled reset, clear,
parent-state change or disabled example and confirm the displayed outcome.
Inspect the complete page in both appearances and at narrow width, not only its
first overview. Record any missing capability or unclear demonstration here.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues: Independent assistive-technology, real zoom and physical touch review.
Workbook updated: Manual coverage remains open; no manual pass is claimed.

## Form surface comparison

- Compare outline and surface on light/dark canvas and raised parents: outline stays transparent; surface owns its neutral fill without adding a shadow.
- Hover, focus, disable and mark invalid; preserve visible boundaries and explicit state treatment. Compare matched size recipes including their outer borders.
- Check narrow/RTL containment and forced colors. Segment emphasis must remain distinct from placeholders.
# Presentation follow-up checks

- [ ] Check segment glyphs and clear icons at every size in light/dark.
- [ ] Check trailing actions in LTR/RTL, including narrow range entry.
- [ ] Compare neutral and accent focus across outline/subtle/underline.
- [ ] Verify placeholder readability, forced colors and real 200–400% zoom.
