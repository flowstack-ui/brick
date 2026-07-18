# Drawer manual-test protocol

Component: Drawer
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: Not run
Playground route: `/drawer`

Use `pass`, `fail`, `blocked`, or `not applicable` for every completed result.
Automated assertions are linked from the coverage workbook; these steps retain
human visual, interaction, device, and assistive-technology judgment.

## Step 1 — Finished surface, placements, and sizes

Setup: Open `/drawer` at 390 × 844 with system appearance.

Action: Open Overview, all four Placements, then all four Sizes.

Expected: Edge attachment is clear; every panel stays bounded; sm, md, lg, and
full remain visually distinct; only full occupies the complete relevant
viewport; the visible page context decreases progressively.

Result: not run
Notes or issue:

## Step 2 — Keyboard, focus, and dismissal

Setup: Use only the keyboard in Overview and States and dismissal.

Action: Open with Enter/Space, traverse forward and backward, then close
separately with Close, Escape, and the Overlay. Repeat the dismissal-disabled
case.

Expected: Focus remains in the top Drawer, follows source order, and returns to
the Trigger. Disabled dismissal does nothing and its visible Close path remains
reachable. The page is immediately operable after exit.

Result: not run
Notes or issue:

## Step 3 — Pointer, touch, and disabled Trigger

Setup: Review Overview and States with mouse and a real touch device.

Action: Open and close through Trigger, controls, Overlay, and the disabled
Trigger. Scroll Body without starting a page scroll.

Expected: Exact Overlay interaction dismisses only when enabled; the disabled
Trigger is visibly unavailable; controls are comfortable by touch; opening does
not summon an unrelated virtual keyboard. No swipe/drag gesture is expected.

Result: not run
Notes or issue:

## Step 4 — Nested ownership and Branch

Setup: Open the parent Drawer and nested Dialog, then Portals and Branch.

Action: Navigate and close the child, continue in the parent, operate the
portalled Branch action, then close the parent.

Expected: Only the top modal owns focus and dismissal. The child returns to its
parent; Branch remains interactive without dismissing the Drawer; final close
leaves no inert or unclickable page state.

Result: not run
Notes or issue:

## Step 5 — Long Body, phone, and virtual keyboard

Setup: Open Mobile, stress, and RTL on a real phone, then repeat with the
on-screen keyboard visible where possible.

Action: Scroll from first to last paragraph and operate Footer actions.

Expected: Only Body scrolls; Header, Footer, and Close remain reachable; safe
areas protect controls; the visual keyboard does not make the workflow
unreachable.

Result: not run
Notes or issue:

## Step 6 — Appearance and preferences

Setup: Review light, dark, scoped examples, reduced motion, and forced colors.

Action: Open and close representative side and block-edge Drawers.

Expected: Surface, scrim, text, border, controls, and focus remain distinct;
scope remains local; reduced motion removes travel; forced colors retains a
system boundary and operable controls.

Result: not run
Notes or issue:

## Step 7 — Reflow, sizes, localization, and RTL

Setup: Use 200% and 400% zoom, a 256 CSS-pixel width where meaningful, and the
Arabic start-placement stress example.

Action: Inspect every region and repeat sm, md, lg, and full.

Expected: No meaningful content/control is lost; no horizontal page scroll
appears; sizes remain distinct where the effective viewport permits; RTL start
attaches right and preserves reading/focus order.

Result: not run
Notes or issue:

## Step 8 — Screen reader

Setup: Enable VoiceOver or the selected screen reader and open Overview.

Action: Read the Drawer name, description, Body, and actions, close it, and
continue on the page.

Expected: The modal is announced once with its visible name and description;
background content is unavailable; close and focus restoration are announced
coherently.

Result: not run
Notes or issue:

## Step 9 — Customization and scope

Setup: Open Appearance and customization with developer tools.

Action: Inspect stable classes, custom slots, tokens, state, placement, size,
and inline Portal output.

Expected: Local radius/space and slots apply without losing Brick styling;
scoped Drawers inherit the expected appearance; Atom behavior remains intact.

Result: not run
Notes or issue:

## Completion

Overall result: not run
Follow-up issues: None recorded; owner review intentionally deferred.
Workbook updated: Automated evidence may be recorded, but human rows and the
package-complete gate remain open until this protocol passes.
