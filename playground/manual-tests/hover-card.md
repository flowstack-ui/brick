# Hover Card manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Hover Card |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/hover-card` |

Scenario order: `01 Overview`, `02 Sizes`, `03 Sides`, `04 Alignments`,
`05 States`, `06 Composition`, `07 Theme`, `08 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and genuine link behavior

Setup: Open `/hover-card` and `01 Overview`.

Action: Focus and hover `Ada Lovelace`, move the pointer between link and
preview, close with Escape, then activate the underlying link.

Expected: Preview opens without moving focus, remains open across the pointer
bridge, contains no interactive descendants, closes with Escape, and the
genuine link still navigates to the complete destination.

Result:
Notes or issue:

## Step 2 — Sizes, sides, Arrow, and alignments

Setup: Review `02 Sizes`, `03 Sides`, and `04 Alignments`.

Action: Open every preview.

Expected: Size changes preferred width only. Side/alignment changes geometry
only; collision handling keeps content visible. Arrow follows the resolved side
except the explicitly arrowless specimen.

Result:
Notes or issue:

## Step 3 — State, timing, content, and composition

Setup: Open `05 States` and `06 Composition`.

Action: Test controlled, default-delay, and disabled triggers. Inspect profile
and document content plus asChild/render HTML output.

Expected: Timing/state follow labels, disabled never opens, Escape leaves link
focus in place, preview content remains passive, and actual anchor output
matches each composition panel.

Result:
Notes or issue:

## Step 4 — Theme and customization

Setup: Open `07 Theme`; switch system, light, and dark appearance.

Action: Open both scoped previews and the customized preview; compare code with
the live surface.

Expected: Portal content uses its local scope. Text, Arrow, surface, and focus
remain readable; customization stays local and preserves link semantics,
timing, placement, classes, and slots.

Result:
Notes or issue:

## Step 5 — Reflow, RTL, touch, and preferences

Setup: Open `08 Stress`; test at 390 px, 200%, and 400% zoom, RTL, reduced
motion, and forced colors.

Action: Open long/unbroken previews near viewport edges. Tap the trigger on a
real touch device.

Expected: Preview remains contained and readable, logical placement/content are
correct in RTL, touch activates the link rather than trapping a hover preview,
and preferences preserve boundaries, focus, and access to the destination.

Result:
Notes or issue:

## Step 6 — Screen reader

Setup: Enable the recorded screen reader.

Action: Navigate Overview and Composition without forcing pointer hover.

Expected: The genuine link name and destination semantics remain primary.
Hover Card adds no dialog role, focus stop, or essential information unavailable
at the destination.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable touch or assistive-technology environments `blocked`.
