# Textarea manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Textarea |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/textarea` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes`, `04 Shapes`,
`05 Resize`, `06 States`, `07 Form`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Leave
every result blank until the named environment is actually tested.

## Step 1 — Default, variants, sizes, and shapes

Setup: Open `/textarea`; review scenarios 01–04 from top to bottom at normal
desktop width.

Action: Focus and type two lines in Overview. Compare each recipe, size, and
shape without changing page appearance.

Expected: The label focuses the native textarea; Enter creates a newline.
Every comparison keeps identical text and defaults except its title. Sizes are
visibly ordered, underline retains content inset, and no control or focus ring
is clipped.

Result:
Notes or issue:

## Step 2 — Manual and automatic resizing

Setup: Continue to scenario 05.

Action: Try each available drag handle. Add lines to the auto-resize example
until it passes five lines, then remove several lines.

Expected: None, vertical, horizontal, and both match their labels without page
overflow. Auto-resize grows and shrinks from two through five rows, then keeps
additional content scrollable; it has no competing drag handle.

Result:
Notes or issue:

## Step 3 — Values, Count, and states

Setup: Continue to scenario 06.

Action: Edit uncontrolled and controlled values. Observe Count, then inspect
disabled, read-only, required, and invalid controls.

Expected: Both values edit normally and stay aligned. Count follows the value
without covering text. Disabled cannot be edited or focused; read-only can be
focused and copied but not edited. Invalid changes only the promised border
and Field message treatment.

Result:
Notes or issue:

## Step 4 — Form and rendered relationships

Setup: Continue to scenario 07.

Action: Submit empty, correct the summary, submit again, and reset. Inspect the
external control and compare the live generated relationship example with its
rendered HTML.

Expected: Empty submission focuses the textarea and shows its concise error.
Correction submits, reset clears, and external ownership remains native. The
visible IDs, slots, required/invalid state, Count, and `aria-describedby`
values match the live output.

Result:
Notes or issue:

## Step 5 — Appearance and customization

Setup: Continue to scenario 08; test the page-level Light and Dark controls.

Action: Compare scoped light/dark defaults and focus the customized example.

Expected: Both scopes remain readable and structurally identical. The custom
green surface, border, radius, focus ring, foreground, and letter spacing
match the shown code without reducing contrast or clipping.

Result:
Notes or issue:

## Step 6 — Reflow, RTL, zoom, and preferences

Setup: Continue to scenario 09. Test desktop, a physical phone, 200% and 400%
zoom/reflow, reduced motion, and forced-colors/high-contrast mode.

Action: Edit the long value and Arabic value; focus, select, scroll, and resize
where available. Follow the page top to bottom once in each environment.

Expected: Content and focus remain visible without page-level horizontal
scroll. Arabic entry and Count align logically in RTL. Mobile text does not
trigger avoidable focus zoom. Reduced motion is immediate and forced colors
retain focus, invalid, disabled, text, and Count distinctions.

Result:
Notes or issue:

## Step 7 — Keyboard and assistive technology

Setup: Return to the top. Use keyboard only, then the recorded screen reader
or voice-control environment.

Action: Traverse the complete page top to bottom, activate labels, enter
multi-line content, operate form actions, and listen to the explicit Count.

Expected: Focus order follows the page, native editing shortcuts work, labels
name every editable control, descriptions/errors are announced with their
control, read-only and disabled state are conveyed, and Count announcements
are understandable without duplicate or unrelated speech.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
