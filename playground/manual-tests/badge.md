# Badge family manual-test protocol

Component: Badge and NotificationBadge
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: July 19, 2026
Playground route: `/badge`

Use `pass`, `fail`, `blocked`, or `not applicable` for each completed result.
Automated evidence does not pre-mark these human judgment checks.

## Step 1 — Hierarchy and recipes

Review Overview and the complete variant/tone matrix in light and dark.
Expected: labels feel passive, every treatment is legible, semantic meaning is
visible in text, and neither component looks like an action. Result: pass.
Notes: Overview and the complete light/dark variant and tone matrix remain
legible, communicate meaning through text, and read as passive labels rather
than controls.

## Step 2 — Sizes, shapes, and tag routing

Compare all sizes and shapes plus the pill Badge and pill Button examples.
Expected: sizes are distinct and readable; rounded is moderate; pill clearly
supports a passive tag while the Button remains visibly interactive. Result:
pass.
Notes: The revised Sizes, Shapes, and Component routing groups make each intent
explicit. All three sizes are distinct and readable, rounded and pill remain
visually distinct, and the passive Badge is clearly differentiated from the
interactive Button.

## Step 3 — Inline content and localization

Inspect heading, paragraph, number, Arabic, mixed-direction, and long-token
examples. Expected: baseline alignment is natural, reading order is correct,
and content wraps without clipping or page overflow. Result: pass.
Notes: Inline and localized content remains aligned and unclipped. The Arabic
pill preserves the same symmetric inline padding as the other pill examples.

## Step 4 — Notification geometry

Inspect one- and multi-digit counts, `99+`, zero, dot, four placements, and both
overlaps on rectangular and circular anchors. Expected: one digit/dot is
circular, longer values become pills, corners mirror in RTL, and indicators do
not change layout or pointer targets. Result: pass.
Notes: Corrected circular overlap geometry and inherited RTL placement. The
playground now presents every LTR placement above its matching RTL placement
on separate rounded-square anchors, with circular overlap last. All logical
placement symmetry assertions pass.

## Step 5 — Keyboard, pointer, and touch

Tab to and activate every notification anchor with keyboard, mouse, and touch.
Expected: only the owning control receives focus/activation, its target remains
comfortable, the indicator ignores pointer events, and focus remains visible.
Result: pass.
Notes: The playground activation readout confirms keyboard, mouse, and touch
activation reaches the owning control while the visual indicator remains
non-focusable and does not intercept pointer input.

## Step 6 — Zoom and text spacing

Review at 200% and 400% zoom, at 256 CSS pixels where meaningful, then apply
increased text spacing. Expected: no meaningful text/control is lost, long
Badge content reflows, and notification counts stay legible. Result: pass.
Notes: Corrected recipe-cell stretching, safe narrow-content wrapping, and the
extreme-narrow placement grid. Content remains contained and reachable at 200%
and 400% zoom after the fixes.

## Step 7 — Screen reader

Read the inline contexts and notification anchors with VoiceOver. Expected:
Badge text follows normal reading order; owning controls announce complete
count/presence context once; visual indicators add no duplicate announcement;
changing a count is silent unless the application deliberately supplies a live
region. Result: pass.
Notes: VoiceOver announces each owning button's complete accessible label once
when focused, does not separately announce the visual indicator, and remains
silent when the non-live manual activation readout changes.

## Step 8 — Direction and preferences

Review RTL/mixed direction, light/dark, forced colors, and reduced motion.
Expected: logical corners mirror, visible boundaries survive forced colors,
hierarchy survives dark mode, and no unnecessary motion is present. Result:
pass.
Notes: RTL placements mirror their LTR counterparts, light and dark hierarchy
remains clear, and reduced motion introduces no unexpected behavior. Manual
forced-colors review is unavailable on this Mac and remains covered by the
Chromium automated release check.

## Step 9 — Customization and public hooks

Inspect classes, slots, data attributes, semantic/component tokens, and local
style overrides. Expected: hooks are accurate and local, custom presentation
does not alter semantics, and both components remain server-safe. Result: pass.
Notes: Light and dark scoped examples remain contained, the local radius
override is visible only on Custom hooks, and neighboring badges are unchanged.

## Completion

Overall result: pass
Follow-up issues: None recorded.
Workbook updated: Badge manual evidence verified July 20, 2026.
