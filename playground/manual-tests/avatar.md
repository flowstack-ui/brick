# Avatar manual-test protocol

Component: Avatar
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: Not run
Playground route: `/avatar`

Use `pass`, `fail`, `blocked`, or `not applicable` for each completed result.
Automated evidence does not pre-mark these human judgment checks.

## Step 1 — Identity hierarchy and crop

Review the overview, all sizes, both shapes, loaded local images, and explicit
fallbacks in light and dark. Expected: Avatar reads as a passive recognition
aid, crops images naturally, keeps fallback content centered, and remains
clearly secondary to the nearby visible identity text. Result: pass.
Notes: Overview, sizes, shapes, local image crops, and explicit fallbacks remain
passive, centered, and secondary to nearby identity text in light and dark.

## Step 2 — Loading and fallback quality

Review missing, loading with delay, successful, broken, and source-removed
examples. Expected: Image/Fallback transitions preserve the frame without
layout shift or distracting flash; failed images restore useful content.
Result: pass.
Notes: Loaded, broken, and missing source transitions preserve the frame and
nearby layout, restore the centered fallback, and show no distracting flash.

## Step 3 — Status rings

Compare online, away, busy, offline, and no-status examples on circle and
rounded shapes. Expected: every ring follows the exact geometry, sits outside
the neutral frame, does not alter size, and offline remains distinct from no
status. Nearby text communicates every status without relying on color.
Result: pass.
Notes: All statuses remain distinct and text-supported across both shapes. The
status treatment was moved inside the fixed Avatar boundary so status and
no-status Avatars share one visual footprint without inventing a no-status
ring; the custom-hook example was adjusted to avoid competing borders.

## Step 4 — Notification composition

Inspect count/dot NotificationBadge examples around Avatar and a native image,
including an Avatar that also has a distinct status ring. Expected: indicators
stay on the intended logical corner, do not obscure the ring or change layout,
and each meaning remains clear in nearby text/control naming. Result: pass.
Notes: Count and dot indicators remain attached to their intended corners
without obscuring status geometry, changing frame size, or shifting nearby
content; visible text preserves both meanings.

## Step 5 — Keyboard, pointer, and touch

Tab and pointer through Avatar inside named Button/Link examples and passive
rows. Expected: passive Avatar never becomes a focus target or looks
interactive; only the owning control receives focus/activation and maintains a
comfortable target. Result: pass.
Notes: Keyboard, pointer, and touch activate only the named Profile button;
passive Avatars remain unfocusable. Button icon slots now follow component
content intrinsically, so the 32px Avatar preserves the standard 8px gap while
ordinary SVG/image icons retain Button's size recipe.

## Step 6 — Zoom, mobile, and direction

Review at 200% and 400% zoom, at 256 CSS pixels where meaningful, on constrained
mobile and wide layouts, and in RTL. Expected: frames remain square, rings and
indicators do not clip, adjacent identity/status text reflows, and no horizontal
page overflow appears. Result: pass.
Notes: Native notification imagery now remains a fixed square and composition
rows wrap without overlap. At 200%/400%, narrow mobile, and RTL, Avatar frames,
rings, indicators, and adjacent localized text remain contained and reachable.

## Step 7 — Screen reader

Read informative loaded/fallback, decorative loaded/fallback beside visible
text, Avatar inside a named control, and ring-status examples with VoiceOver.
Expected: informative identity is announced once, decorative imagery remains
silent, controls keep one functional name, and localized nearby text—not ring
color—communicates status. Result: pass.
Notes: VoiceOver announces the informative Grace Hopper fallback once, skips
decorative identity and status Avatars, reads nearby identity/status text, and
announces the Profile control once without exposing its decorative initials.

## Step 8 — Preferences and system colors

Review light, dark, forced colors, reduced motion, and reduced transparency.
Expected: frame/fallback hierarchy remains visible, forced colors preserve ring
geometry while text preserves exact status, and no unnecessary motion or
transparency is introduced. Result: pass.
Notes: Light/dark frames, fallbacks, rings, and status text remain clear under
reduced motion and reduced transparency. Manual forced-colors review is
unavailable on this Mac and remains covered by the Chromium automated check.

## Step 9 — Localization and customization

Inspect one/two-character Latin and non-Latin fallbacks, long stress content,
root slot/class/style overrides, and component-token examples. Expected:
content remains clipped within the frame without affecting layout, public hooks
are accurate, and customization does not change semantics. Result: pass.
Notes: Latin and non-Latin fallbacks remain centered and contained, localized
text reflows without changing frame geometry, and CX-only radius, inset-ring,
and fallback-color hooks remain local without changing passive semantics.

## Completion

Overall result: pass
Follow-up issues: None recorded.
Workbook updated: Avatar manual evidence verified July 20, 2026.
