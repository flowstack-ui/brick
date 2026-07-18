# Badge family manual-test protocol

Component: Badge and NotificationBadge
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: Not run
Playground route: `/badge`

Use `pass`, `fail`, `blocked`, or `not applicable` for each completed result.
Automated evidence does not pre-mark these human judgment checks.

## Step 1 — Hierarchy and recipes

Review Overview and the complete variant/tone matrix in light and dark.
Expected: labels feel passive, every treatment is legible, semantic meaning is
visible in text, and neither component looks like an action. Result: not run.

## Step 2 — Sizes, shapes, and tag routing

Compare all sizes and shapes plus the pill Badge and pill Button examples.
Expected: sizes are distinct and readable; rounded is moderate; pill clearly
supports a passive tag while the Button remains visibly interactive. Result:
not run.

## Step 3 — Inline content and localization

Inspect heading, paragraph, number, Arabic, mixed-direction, and long-token
examples. Expected: baseline alignment is natural, reading order is correct,
and content wraps without clipping or page overflow. Result: not run.

## Step 4 — Notification geometry

Inspect one- and multi-digit counts, `99+`, zero, dot, four placements, and both
overlaps on rectangular and circular anchors. Expected: one digit/dot is
circular, longer values become pills, corners mirror in RTL, and indicators do
not change layout or pointer targets. Result: not run.

## Step 5 — Keyboard, pointer, and touch

Tab to and activate every notification anchor with keyboard, mouse, and touch.
Expected: only the owning control receives focus/activation, its target remains
comfortable, the indicator ignores pointer events, and focus remains visible.
Result: not run.

## Step 6 — Zoom and text spacing

Review at 200% and 400% zoom, at 256 CSS pixels where meaningful, then apply
increased text spacing. Expected: no meaningful text/control is lost, long
Badge content reflows, and notification counts stay legible. Result: not run.

## Step 7 — Screen reader

Read the inline contexts and notification anchors with VoiceOver. Expected:
Badge text follows normal reading order; owning controls announce complete
count/presence context once; visual indicators add no duplicate announcement;
changing a count is silent unless the application deliberately supplies a live
region. Result: not run.

## Step 8 — Direction and preferences

Review RTL/mixed direction, light/dark, forced colors, and reduced motion.
Expected: logical corners mirror, visible boundaries survive forced colors,
hierarchy survives dark mode, and no unnecessary motion is present. Result:
not run.

## Step 9 — Customization and public hooks

Inspect classes, slots, data attributes, semantic/component tokens, and local
style overrides. Expected: hooks are accurate and local, custom presentation
does not alter semantics, and both components remain server-safe. Result: not
run.

## Completion

Overall result: not run
Follow-up issues: None recorded.
Workbook updated: Automated evidence may be recorded later; human rows remain
open until this protocol is performed.
