# IconButton manual-test protocol

Component: IconButton
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: 2026-07-20
Playground route: `/icon-button`

Use `pass`, `fail`, `blocked`, or `not applicable` for each completed result.
Automated evidence does not pre-mark these human judgment checks.

## Step 1 — Hierarchy and naming

Review variants, tones, sizes, shapes, disabled/loading, action, and link
examples in light/dark. Read them with VoiceOver. Expected: each purpose is
announced once, icons add no duplicate name, compact hierarchy remains clear,
and loading remains centered. Result: pass.

## Step 2 — Interaction and semantics

Activate action and link examples with pointer, touch, Enter, and Space where
appropriate; Tab through disabled/loading/composed examples. Expected: button
and link semantics remain distinct, focus is visible, and inactive controls do
not activate. Result: pass.

## Step 3 — Zoom, mobile, RTL, and preferences

Review at mobile widths, 200%/400% zoom, 256 CSS pixels where meaningful, RTL,
forced colors, reduced motion/transparency, and long localized context.
Expected: square targets and icons remain centered, no page overflow appears,
and focus/boundaries remain visible. Result: pass. The Overview IconButton was
updated to resist flex shrinking, and its adjacent playground text now wraps.
The reviewer confirmed 200% and 400% zoom; a 150 CSS-pixel viewport was noted
as below the protocol's 256 CSS-pixel minimum.

## Completion

Overall result: pass
Follow-up issues: None open. Loading centering and constrained flex sizing were
corrected during the review and covered by browser regression tests.
Workbook updated: Automated, Consumer, and retirement evidence is recorded;
the owner-run row is complete.
