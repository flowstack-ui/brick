# AlertDialog manual-test protocol

Component: AlertDialog
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: Not run
Playground route: `/alert-dialog`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Record a
follow-up issue for each failure or blocker. Automated assertions are linked
from the coverage workbook; these steps retain human visual, interaction,
device, and assistive-technology judgment.

## Step 1 — Finished decision and sizes

Setup: Open `/alert-dialog` at 390 × 844 with system appearance.

Action: Open Overview, then the sm and md examples under Sizes.

Expected: Purpose, consequence, Cancel, and Action are immediately clear. The
surface is centered with a distinct scrim; both sizes remain bounded; Cancel
receives visible initial focus; no content crosses the viewport.

Result: not run
Notes or issue:

## Step 2 — Keyboard, decisions, and focus restoration

Setup: Use only the keyboard in Overview and Decisions and state.

Action: Open with Enter/Space, traverse forward and backward, close separately
with Cancel, Action, and Escape, and operate the Escape-disabled example.

Expected: Focus stays in the top alert, follows source order, and returns to its
Trigger. Outcomes are clear. Escape-disabled stays open until an explicit
response and the page is operable immediately after exit.

Result: not run
Notes or issue:

## Step 3 — Pointer, touch, disabled Trigger, and pending Action

Setup: Review Decisions and state with mouse and a real touch device.

Action: Try the scrim, the disabled Trigger, and Start pending action.

Expected: Scrim interaction never dismisses; the disabled Trigger is visibly
unavailable and inert; the prevented Action remains open with clear pending
feedback; touch opening does not summon an unrelated virtual keyboard.

Result: not run
Notes or issue:

## Step 4 — Nested modal ownership

Setup: Open Edit draft project, then Discard draft.

Action: Navigate the child, Cancel it, continue in the parent, then close the
parent. Repeat using Escape for the child.

Expected: Only the AlertDialog is active while open. Cancel or one Escape
returns focus and control to the parent; closing the parent restores its page
Trigger with no inert or unclickable page left behind.

Result: not run
Notes or issue:

## Step 5 — Long Body, phone, and virtual keyboard

Setup: Open Responsive and long detail at a phone viewport and on a real phone.

Action: Scroll from the first through final consequence and operate both
responses; repeat with the on-screen keyboard visible if available.

Expected: Supplemental Body content scrolls while the critical message and
responses stay reachable. The complete panel remains within the usable visual
viewport and page scrolling does not replace Body scrolling.

Result: not run
Notes or issue:

## Step 6 — Appearance and user preferences

Setup: Review light, dark, both scoped examples, reduced motion, and forced
colors where available.

Action: Open and close representative AlertDialogs in each mode.

Expected: Message, surface, scrim, focus, Cancel, and danger Action remain
distinct; local scope stays local; reduced motion removes scale; forced colors
retains a system boundary and operable controls.

Result: not run
Notes or issue:

## Step 7 — Reflow, localization, and RTL

Setup: Use 200% and 400% zoom, a 256 CSS-pixel width where meaningful, and the
Stress and RTL example.

Action: Open the Arabic/long-reference AlertDialog and inspect every region and
response.

Expected: No meaningful content or response is lost; no horizontal page
scrolling appears; logical alignment mirrors while DOM, reading, and focus
order remain coherent.

Result: not run
Notes or issue:

## Step 8 — Screen reader

Setup: Enable VoiceOver or the selected screen reader and open Overview.

Action: Read the alert, description, optional Body where present, responses,
then Cancel and continue on the page.

Expected: `alertdialog` is announced once with its visible name and alert
message; background content is unavailable; Cancel is initially focused; focus
restoration is announced coherently.

Result: not run
Notes or issue:

## Step 9 — Customization and scope

Setup: Open Customization and both scoped examples with developer tools.

Action: Inspect stable classes, custom slots, tokens, state, and portal output.

Expected: Local radius/space and slots apply without losing Brick styling;
inline scoped alerts inherit the expected appearance; the same Atom behavior
remains intact.

Result: not run
Notes or issue:

## Completion

Overall result: not run
Follow-up issues: None recorded; owner review pending.
Workbook updated: Automated evidence may be recorded, but the manual and
package-complete rows remain open until this protocol passes.
