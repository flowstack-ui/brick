# Date Picker manual-test protocol

## Focused documentation follow-up

- Compare localized basic/size/variant fields and month/year endpoints with their displayed source.
- Check separate range borders and decorative arrows in narrow and RTL layouts.
- Open custom headers, month/year selects, presets/sidebar, fixed weeks, Persian and popup-time examples.
- Confirm custom content has the same inset as a plain calendar, with no doubled Calendar padding.
- Confirm Today navigates without selecting, Clear disappears when empty, and 12-hour time exposes AM/PM.
- Physical-device, screen-reader and actual browser zoom qualification still require a human run.

| Run information | Value |
| --- | --- |
| Component | Date Picker |
| Version or commit | Unpublished local candidate |
| Reviewer | Pending independent manual review |
| Date | Not performed |
| Browser and version | Not performed |
| Operating system | Not performed |
| Viewport and zoom | Actual 200% and 400% zoom pending |
| Physical device | Unavailable |
| Assistive technology | Unavailable |
| Playground route | `/date-picker` |

Scenario order: 01 date-picker.single; 02 date-picker.range; 03 date-picker.multiple; 04 date-picker.nested; 05 date-picker.controlled; 06 date-picker.constraints; 07 date-picker.custom.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.
Automated browser checks are separate evidence, not manual passes.

## Step 1 — Visible scenarios and interaction

Setup: Open `/date-picker?qualification=1` for the scenario order above, then
review the source-paired examples at `/date-picker`.

Action: Operate each example with keyboard and pointer. Edit or select dates,
exercise the displayed modes, and compare selected state with displayed value.
Check disabled and read-only examples where shown. For form examples, submit an
empty required value, enter a valid date and reset the form.

Expected: Date values, labels, selection and focus remain synchronized. Invalid
entry does not silently submit a previous value. Reset restores initial values.
Popup selection closes only after single or complete range selection;
multiple selection remains open. Escape in the nested example closes only the
date popup and restores trigger focus. Click a date in the nested popup: the
parent backdrop must not intercept it. Check the custom trigger keeps its full
button width; change month and year using its calendar selects.

Result:
Notes or issue: Human interaction-quality review remains unperformed.

## Step 2 — Theme, reflow, direction and preferences

Setup: Inspect light and dark appearance, forced colors, RTL, real 200% and
400% browser zoom, and a physical touch device.

Action: Repeat the main interaction and inspect every scenario.

Expected: Targets, focus and state remain perceivable; calendar cells remain
square; adjacent specimens reflow without overlap. Input text remains editable,
and localized endpoints retain distinct names. Popup stays within the viewport.

Result:
Notes or issue: Emulated mobile checks do not replace actual zoom or hardware.

## Step 3 — Assistive technology

Setup: Enable VoiceOver or NVDA and record its browser and version above.

Action: Navigate labels, date segments or calendar grids, select a date, and
inspect any invalid-state message and popup focus transition.

Expected: Names, roles, values, descriptions and state are announced without
duplicate speech. Calendar keyboard movement and native form focus are usable.

Result:
Notes or issue: Screen-reader review has not been performed.

## Expanded capabilities

Exercise both segmented Input and native TextInput. Type invalid and partial
dates, paste a complete date and use an IME. The draft must remain visible until
an intentional commit; moving to a calendar or clear button must not prematurely
discard it. Invalid text must never submit the previously committed value.
Test Enter, boundary blur, Escape, reset, custom DD/MM/YYYY parsing, range
endpoints and semicolon-separated multiple dates. Check month/year precision,
presets, time-preserving date edits, Fieldset toggling and React Hook Form.
Compare first popup focus with the typed selection; arrows must follow the
visible day or period grid. Record actual screen-reader announcements.

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
- Check narrow/RTL containment and forced colors. Popup panels and selection marks must retain their independent paint.
# Presentation follow-up checks

- [ ] Check segment glyphs and clear/open icons at every size in light/dark.
- [ ] Check trailing actions in LTR/RTL, including narrow range entry.
- [ ] Compare neutral and accent focus across outline/subtle/underline.
- [ ] Verify placeholder readability, forced colors and real 200–400% zoom.
