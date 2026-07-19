# AlertDialog manual-test protocol

Component: AlertDialog
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: July 19, 2026
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

Result: pass
Notes or issue: Overview and the sm and md examples remain clear, centered,
bounded, and operable at the reviewed 390 × 844 viewport. Cancel receives
visible initial focus and no content crosses the viewport.

## Step 2 — Keyboard, decisions, and focus restoration

Setup: Use only the keyboard in Overview and Decisions and state.

Action: Open with Enter/Space, traverse forward and backward, close separately
with Cancel, Action, and Escape, and operate the Escape-disabled example.

Expected: Focus stays in the top alert, follows source order, and returns to its
Trigger. Outcomes are clear. Escape-disabled stays open until an explicit
response and the page is operable immediately after exit.

Result: pass
Notes or issue: Keyboard opening, forward and reverse focus containment,
Cancel, Action, Escape, Escape-disabled behavior, focus restoration, and page
operability pass. Manual review found that the solid Action has greater optical
weight but composes the same default Button size as Cancel. The default md
surface was increased to 30rem so the valid tracked-decision labels remain on
one row; Chromium verifies row and height parity within sub-pixel tolerance.

## Step 3 — Pointer, touch, disabled Trigger, and pending Action

Setup: Review Decisions and state with mouse and a real touch device.

Action: Try the scrim, the disabled Trigger, and Start pending action.

Expected: Scrim interaction never dismisses; the disabled Trigger is visibly
unavailable and inert; the prevented Action remains open with clear pending
feedback; touch opening does not summon an unrelated virtual keyboard.

Result: pass
Notes or issue: Scrim interaction does not dismiss, the disabled Trigger is
unavailable and inert, the prevented pending Action remains open with visible
feedback, and real-touch opening does not summon an unrelated virtual
keyboard.

## Step 4 — Nested modal ownership

Setup: Open Edit draft project, then Discard draft.

Action: Navigate the child, Cancel it, continue in the parent, then close the
parent. Repeat using Escape for the child.

Expected: Only the AlertDialog is active while open. Cancel or one Escape
returns focus and control to the parent; closing the parent restores its page
Trigger with no inert or unclickable page left behind.

Result: pass
Notes or issue: The child AlertDialog exclusively owns focus and interaction;
Cancel and one Escape return control to the parent Dialog. Closing the parent
restores its page Trigger with no retained overlay, inert state, or unclickable
page.

## Step 5 — Long Body, phone, and virtual keyboard

Setup: Open Responsive and long detail at a phone viewport and on a real phone.

Action: Scroll from the first through final consequence and operate both
responses; repeat with the on-screen keyboard visible if available.

Expected: Supplemental Body content scrolls while the critical message and
responses stay reachable. The complete panel remains within the usable visual
viewport and page scrolling does not replace Body scrolling.

Result: pass
Notes or issue: On a real phone, supplemental Body content scrolls from first
through final consequence while the critical message and both responses remain
reachable. The panel stays within the usable viewport, page scrolling does not
replace Body scrolling, and the virtual-keyboard review passes.

## Step 6 — Appearance and user preferences

Setup: Review light, dark, both scoped examples, reduced motion, and forced
colors where available.

Action: Open and close representative AlertDialogs in each mode.

Expected: Message, surface, scrim, focus, Cancel, and danger Action remain
distinct; local scope stays local; reduced motion removes scale; forced colors
retains a system boundary and operable controls.

Result: pass
Notes or issue: Light, dark, scoped appearances, and reduced motion pass.
Physical Windows forced-colors testing was unavailable; the automated
forced-colors baseline passes and physical Windows review remains optional
compatibility evidence.

## Step 7 — Reflow, localization, and RTL

Setup: Use 200% and 400% zoom, a 256 CSS-pixel width where meaningful, and the
Stress and RTL example.

Action: Open the Arabic/long-reference AlertDialog and inspect every region and
response.

Expected: No meaningful content or response is lost; no horizontal page
scrolling appears; logical alignment mirrors while DOM, reading, and focus
order remain coherent.

Result: pass
Notes or issue: The initial review found clipped responses at 256px/200% and
wide-screen 400%. A bounded whole-Content scrolling fallback was added for
extreme effective widths and heights. Both supported cases now keep all text
and responses reachable without horizontal page scrolling; RTL alignment,
reading order, focus order, and centering pass. The 256px/400% combination
remains out of scope.

## Step 8 — Screen reader

Setup: Enable VoiceOver or the selected screen reader and open Overview.

Action: Read the alert, description, optional Body where present, responses,
then Cancel and continue on the page.

Expected: `alertdialog` is announced once with its visible name and alert
message; background content is unavailable; Cancel is initially focused; focus
restoration is announced coherently.

Result: pass
Notes or issue: VoiceOver announces the alert dialog once with its visible
title, exposes the consequence message through normal VO navigation, and
starts on Cancel. Background content is unavailable while open, and closing
returns focus and VoiceOver context coherently to the page Trigger.

## Step 9 — Customization and scope

Setup: Open Customization and both scoped examples with developer tools.

Action: Inspect stable classes, custom slots, tokens, state, and portal output.

Expected: Local radius/space and slots apply without losing Brick styling;
inline scoped alerts inherit the expected appearance; the same Atom behavior
remains intact.

Result: pass
Notes or issue: Stable Brick classes, custom Content and Header slots, local
radius and spacing tokens, Atom state, and portal output remain inspectable.
Light and dark inline scopes inherit locally without affecting the surrounding
page, and Cancel autofocus, Action, close, and focus restoration remain intact.

## Completion

Overall result: pass
Follow-up issues: None.
Workbook updated: Pending tool availability. The manual protocol is complete;
the physical coverage workbook still needs its AlertDialog manual and
package-complete rows updated.
