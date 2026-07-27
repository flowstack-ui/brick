# Multi Select Manual Test Protocol

Status: Unrun

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/multi-select` |
| Mobile URL | Use the LAN URL printed by `npm run dev:playground:network` |

Scenario order: Overview; Variants; Sizes; Shapes and width; Options and
scrolling; Content and states; Forms and composition; Appearance and
customization; Responsive, RTL, and preferences.

Use `pass`, `fail`, `blocked`, or `not applicable` for every Result. Keep notes
short and record an issue link for any failure.

## Step 1: Top-to-bottom visual pass

1. At 100% zoom, scan scenarios 01–09 from top to bottom without jumping.
2. Expect default examples to remain outline, medium, rounded, and full width
   unless the scenario names the changed dimension.
3. Expect equal peer starts/heights, contained icons and indicators, readable
   descriptions, and no clipped focus ring, popup, Arrow, or scroll control.
4. In scenarios 02–04, confirm only variant, size, shape, or width changes.
5. In scenario 05, confirm groups, labels, separator, disabled option, Viewport,
   scroll controls, and Arrow are visually distinct and aligned.

Result:

## Step 2: Keyboard flow

1. Start on the Overview trigger and press `ArrowDown`; expect the listbox to
   open with an enabled option highlighted.
2. Use arrows, `Home`, `End`, and typeahead; expect focus to move among enabled
   options without selecting disabled Research.
3. Press `Enter` or `Space`; expect one option to toggle and the popup to stay
   open with listbox focus preserved.
4. Reopen, move highlight, then press `Escape`; expect the previous value to
   remain and focus to return.
5. Reopen and press `Tab`; expect dismissal without trapping focus.

Result:

## Step 3: Screen-reader flow

1. With macOS VoiceOver, read the Overview Field and trigger; expect the label,
   current value, collapsed/expanded state, and required/invalid states when
   applicable.
2. Open and traverse options; expect group labels, multi-selected state, and disabled
   Research to be announced without decorative artwork.
3. Repeat the essential flow with iOS VoiceOver on the LAN URL.
4. Repeat with one additional desktop screen-reader/browser pairing.

Result:

## Step 4: Pointer, touch, and positioning

1. With a mouse, open Overview and choose Writing; expect the summary to add
   one value while the popup stays open. Click outside and expect dismissal.
2. On real touch hardware, tap outside an open Multi Select; expect dismissal only
   after release.
3. Reopen, begin outside contact, then drag or scroll; expect Multi Select to remain
   open because the gesture was not a tap.
4. In scenario 05, scroll the long Viewport; expect conditional scroll buttons,
   bounded content, and an attached Arrow whose side follows collision changes.

Result:

## Step 5: Form and validation

1. In scenario 07, submit the default form; expect output
   `design, engineering`.
2. Toggle Writing, submit, and expect all three values; reset and expect the
   original two values plus `Form reset` output.
3. Test required validation with no value under native and inline policy where
   available; expect focus and error relationships on the visible trigger.
4. Open the asChild example; expect the composed button to retain Multi Select
   behavior, focus, styling, and one host element.

Result:

## Step 6: Responsive and preferences

1. Test 320px width, 200% zoom, then 400% zoom; collapse the sticky review
   header when needed and expect all controls and popups to remain reachable.
2. Test scenario 09 in LTR and RTL; expect logical icon/indicator placement,
   readable long content, and no horizontal page overflow.
3. Test light, dark, reduced motion, and forced colors; expect visible focus,
   multi-selected, highlighted, disabled, read-only, and invalid states.

Result:

## Completion

Overall result:

Follow-up issues:

Workbook updated:
