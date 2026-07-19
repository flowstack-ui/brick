# IconButton and AppBar manual-test protocol

Component: IconButton and AppBar
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: Not run
Playground routes: `/icon-button`, `/app-bar`

Use `pass`, `fail`, `blocked`, or `not applicable`. Automated evidence does
not pre-mark human judgment.

## Step 1 — IconButton hierarchy and naming

Review variants, tones, sizes, shapes, disabled/loading, action, and link
examples in light/dark. Read them with VoiceOver. Expected: each purpose is
announced, icons add no duplicate name, and compact hierarchy remains clear.
Result: not run.

## Step 2 — IconButton interaction

Activate action and link examples with pointer, touch, Enter, and Space where
appropriate; Tab through disabled/loading/composed examples. Expected: button
and link semantics remain distinct, focus is visible, and inactive controls do
not activate. Result: not run.

## Step 3 — AppBar anatomy and positions

Review all variants, densities, and position examples while scrolling.
Expected: static/sticky/fixed behavior matches its name, sections align, and
fixed examples document rather than conceal their page-offset requirement.
Result: not run.

## Step 4 — Mobile, zoom, RTL, and preferences

Review both routes at mobile widths, 200/400% zoom, 256 CSS pixels where
meaningful, RTL, forced colors, reduced motion/transparency, and long localized
content. Expected: no page overflow or unintended AppBar second row; focus and
surface boundaries remain visible. Result: not run.

## Completion

Overall result: not run
Follow-up issues: None recorded.
Workbook updated: yes. Automated, Consumer, and retirement evidence is
recorded; the two owner-run rows remain open until this protocol is performed.
