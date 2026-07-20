# Drawer manual-test protocol

Component: Drawer
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: July 19, 2026
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

Result: pass
Notes or issue: At 390 x 844 with system appearance, Overview, all four
placements, and all four sizes remain correctly edge-attached and bounded.
The sm, md, lg, and full sizes are visually distinct; only full occupies the
complete relevant viewport, and visible page context decreases progressively.

## Step 2 — Keyboard, focus, and dismissal

Setup: Use only the keyboard in Overview and States and dismissal.

Action: Open with Enter/Space, traverse forward and backward, then close
separately with Close, Escape, and the Overlay. Repeat the dismissal-disabled
case.

Expected: Focus remains in the top Drawer, follows source order, and returns to
the Trigger. Disabled dismissal does nothing and its visible Close path remains
reachable. The page is immediately operable after exit.

Result: pass
Notes or issue: Keyboard opening with Enter and Space, forward and reverse
focus traversal, Close, Escape, Overlay dismissal, and Trigger focus
restoration pass. The dismissal-disabled example remains open for Escape and
Overlay interaction, its visible Close path remains reachable, and the page is
immediately operable after exit.

## Step 3 — Pointer, touch, and disabled Trigger

Setup: Review Overview and States with mouse and a real touch device.

Action: Open and close through Trigger, controls, Overlay, and the disabled
Trigger. Scroll Body without starting a page scroll.

Expected: Exact Overlay interaction dismisses only when enabled; the disabled
Trigger is visibly unavailable; controls are comfortable by touch; opening does
not summon an unrelated virtual keyboard. No swipe/drag gesture is expected.

Result: pass
Notes or issue: Mouse and real-touch Trigger, controls, enabled Overlay
dismissal, disabled Trigger, and Body scrolling pass. Opening does not summon
an unrelated virtual keyboard, background page scrolling does not replace Body
scrolling, and no swipe or drag behavior is exposed. Follow-up observation:
on iOS Safari, the browser menu's explicit Hide Toolbar command can leave the
top of the open Drawer visually clipped. Normal automatic toolbar collapse
does not reproduce the issue. Classify against Drawer dynamic-viewport sizing
and the playground document shell before package completion; this may affect
other modal components and is not yet assigned to Brick or the playground.

## Step 4 — Nested ownership and Branch

Setup: Open the parent Drawer and nested Dialog, then Portals and Branch.

Action: Navigate and close the child, continue in the parent, operate the
portalled Branch action, then close the parent.

Expected: Only the top modal owns focus and dismissal. The child returns to its
parent; Branch remains interactive without dismissing the Drawer; final close
leaves no inert or unclickable page state.

Result: pass
Notes or issue: The nested Dialog exclusively owns focus and dismissal while
open, then returns control to the parent Drawer. The portalled Branch action
remains interactive without dismissing the Drawer, and final close leaves no
inert or unclickable page state.

## Step 5 — Long Body, phone, and virtual keyboard

Setup: Open Mobile, stress, and RTL on a real phone, then repeat with the
on-screen keyboard visible where possible.

Action: Scroll from first to last paragraph and operate Footer actions.

Expected: Only Body scrolls; Header, Footer, and Close remain reachable; safe
areas protect controls; the visual keyboard does not make the workflow
unreachable.

Result: fail
Notes or issue: On an iPhone 16 Pro Max running iOS 26.5.2, opening a modal
summons Safari's compact black address bar both with and without the explicit
Hide Toolbar option. In normal mode, the Drawer is laid out below that bar. If
Hide Toolbar was selected, the bar instead obscures the top of start, end, and
top Drawers. Bottom does not visibly reproduce at its current height, but a
sufficiently tall bottom Drawer is expected to reach the same obscured top
boundary. Normal automatic toolbar collapse works. Adding
`viewport-fit=cover` to the playground did not correct the failure, even though
Drawer already consumes safe-area inset variables. Opening Brick Dialog after
the same Hide Toolbar command reproduces the compact black address bar, so the
finding is shared modal behavior rather than Drawer presentation. Keep package
completion open while Atom's scroll-lock and visual-viewport behavior is
reproduced and corrected through a released public Atom version.

## Step 6 — Appearance and preferences

Setup: Review light, dark, scoped examples, reduced motion, and forced colors.

Action: Open and close representative side and block-edge Drawers.

Expected: Surface, scrim, text, border, controls, and focus remain distinct;
scope remains local; reduced motion removes travel; forced colors retains a
system boundary and operable controls.

Result: pass
Notes or issue: Light, dark, scoped appearance, and reduced-motion review
pass. Surface, scrim, text, borders, controls, focus, and local scope remain
distinct and coherent, and reduced motion removes Drawer travel. Physical
Windows forced-colors testing was unavailable; the automated forced-colors
baseline remains the available evidence.

## Step 7 — Reflow, sizes, localization, and RTL

Setup: Use 200% and 400% zoom, a 256 CSS-pixel width where meaningful, and the
Arabic start-placement stress example.

Action: Inspect every region and repeat sm, md, lg, and full.

Expected: No meaningful content/control is lost; no horizontal page scroll
appears; sizes remain distinct where the effective viewport permits; RTL start
attaches right and preserves reading/focus order.

Result: pass
Notes or issue: The initial review found unreachable controls at 400% zoom
and incorrect RTL start travel. An extreme-height whole-Drawer scrolling
fallback now keeps Header, Body, Footer, and actions reachable when they cannot
fit together, and explicit RTL selectors return entrance and exit through the
physical right edge. Focused Playwright coverage passes, and owner retesting
passes at 200%, 400%, constrained width, and RTL.

## Step 8 — Screen reader

Setup: Enable VoiceOver or the selected screen reader and open Overview.

Action: Read the Drawer name, description, Body, and actions, close it, and
continue on the page.

Expected: The modal is announced once with its visible name and description;
background content is unavailable; close and focus restoration are announced
coherently.

Result: pass
Notes or issue: VoiceOver announces the modal once with its visible name and
description, exposes Body content and actions coherently, and keeps background
content unavailable while open. Closing and focus restoration are announced
coherently, and page navigation resumes afterward.

## Step 9 — Customization and scope

Setup: Open Appearance and customization with developer tools.

Action: Inspect stable classes, custom slots, tokens, state, placement, size,
and inline Portal output.

Expected: Local radius/space and slots apply without losing Brick styling;
scoped Drawers inherit the expected appearance; Atom behavior remains intact.

Result: pass
Notes or issue: Light and dark inline Portal examples inherit their local
appearance without changing the surrounding page. Stable Brick classes,
custom Content and Header slots, local radius and spacing variables, state,
placement, and size metadata remain inspectable. Customized opening, closing,
focus, and dismissal behavior remains intact without leaking styles.

## Completion

Overall result: blocked
Follow-up issues: Step 5 reproduces shared Atom modal scroll-lock and visual-
viewport failure on iPhone 16 Pro Max with iOS 26.5.2. Opening Drawer or Dialog
after Safari's explicit Hide Toolbar command summons the compact black address
bar above the page but leaves fixed modal content underneath it. Resolve at the
public Atom boundary, release Atom, upgrade Brick's exact dependency, and
retest. Step 7's initial RTL travel and 400% reachability findings were
corrected in Brick and pass focused automation plus owner retesting.
Workbook updated: Pending spreadsheet authoring runtime. Keep the manual row
and package-complete gate open while the Atom-owned Step 5 blocker remains.
