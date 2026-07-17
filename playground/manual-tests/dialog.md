# Dialog manual-test protocol

Component: Dialog
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: July 17, 2026
Playground route: `/dialog`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Record a
follow-up issue for each failure or blocker.

## Step 1 — Surface and size

Setup: Open `/dialog` at 390 × 844 with system appearance.

Action: Open Overview, then each Dialog under Sizes.

Expected: The surface is centered with a clear scrim and border; sm, md, and lg
change preferred width without changing behavior; no panel crosses the viewport.

Result: pass
Notes or issue: Overview and all three sizes remain centered, bounded, and
operable at the reviewed phone viewport.

## Step 2 — Keyboard and focus restoration

Setup: Open States and dismissal with a keyboard.

Action: Tab forward and backward through every control, then close with Escape.

Expected: Focus remains in the top Dialog, follows source order, and returns to
the opening Trigger. The page behind becomes operable immediately after exit.

Result: pass
Notes or issue: Forward and reverse traversal remain contained; Escape closes
once, restores the Trigger, and leaves the page operable.

## Step 3 — Pointer, touch, and dismissal policy

Setup: Open States and dismissal using mouse, pen if available, and touch.

Action: Close separately with the scrim, Cancel, Save, and Escape.

Expected: Only an exact scrim target dismisses; every method closes once; the
event log shows the matching reason; touch opening does not summon a keyboard.

Result: pass
Notes or issue: Overlay, Cancel, Save, and Escape dismissal pass with matching
event evidence; clicks inside Content do not dismiss.

## Step 4 — Nested ownership

Setup: Open the parent and then the nested Dialog.

Action: Tab in the child, press Escape once, then continue in the parent.

Expected: The child alone owns focus and Escape while open; closing it returns
to the parent; a second Escape closes the parent and restores its Trigger.

Result: pass
Notes or issue: The child owns focus and Escape, returns control to the parent,
and closing the parent restores the page without retained `inert` state.

## Step 5 — Long Body and virtual keyboard

Setup: Open Long content and mobile at a phone viewport, then repeat with the
on-screen keyboard visible on a real phone.

Action: Scroll from the first through final section and operate Footer actions.

Expected: Only Body scrolls, scrolling does not chain to the page, Header and
Footer remain reachable, and the keyboard does not push the complete panel out
of reach.

Result: pass
Notes or issue: Reviewed on a real phone through the LAN playground. Body
scrolling, viewport containment, and action reachability pass with the virtual
keyboard.

## Step 6 — Appearance and preferences

Setup: Review light, dark, both scoped examples, reduced motion, and forced
colors where available.

Action: Open and close representative Dialogs in each mode.

Expected: Text, border, focus, actions, scrim, and surface remain distinct;
scope remains local; reduced motion removes scale; forced colors retains a
system boundary and operable controls.

Result: pass
Notes or issue: Light, dark, scoped appearance, and reduced motion pass.
Real-Windows forced colors was unavailable; the automated forced-colors check
passes and physical Windows review remains optional compatibility evidence.

## Step 7 — Reflow, long content, and RTL

Setup: Use 200% and 400% zoom, 256 CSS-pixel width, and Stress and RTL.

Action: Open the Arabic/long-reference Dialog and inspect every region/action.

Expected: No horizontal page scrolling or clipped content; logical alignment
mirrors while DOM, reading, and focus order remain meaningful.

Result: pass
Notes or issue: Desktop 200% and 400% pass; 256px passes through 200%. Combining
a 256px physical window with 400% produces an out-of-scope effective viewport
near 64 CSS pixels. The review found and corrected lost portal RTL direction
and direction-sensitive centering; the corrected title, description, body,
footer, and viewport geometry pass the browser matrix.

## Step 8 — Screen reader

Setup: Enable VoiceOver or the selected screen reader and open Overview.

Action: Read the Dialog, description, body, actions, then close and continue.

Expected: The modal is announced once with its visible name and description;
background content is unavailable; focus restoration is announced coherently.

Result: pass
Notes or issue: VoiceOver announces the dialog title and exposes its description
through normal VO navigation. Background isolation, content navigation, close,
and focus restoration pass.

## Step 9 — Customization and scope

Setup: Open Customization and both scoped examples with developer tools.

Action: Inspect stable classes, custom slots, tokens, state, and portal output.

Expected: Local radius/space and slots apply without losing Brick styling;
inline scoped dialogs inherit the expected appearance; no behavior is copied.

Result: pass
Notes or issue: Custom radius, spacing, slots, classes, scoped appearance, and
behavior remain intact.

## Completion

Overall result: pass
Follow-up issues: Real-Windows forced-colors review remains optional
compatibility evidence.
Workbook updated: Yes. The physical workbook records package and consumer gates
complete, with only dependency-led Core retirement blocked.
