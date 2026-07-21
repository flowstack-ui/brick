# AppBar manual-test protocol

Component: AppBar
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: 2026-07-20
Playground route: `/app-bar`

Use `pass`, `fail`, `blocked`, or `not applicable` for each completed result.
Automated evidence does not pre-mark these human judgment checks.

## Step 1 — Anatomy, hierarchy, and positions

Review all variants, densities, anatomy regions, surface options, and position
examples while scrolling. Expected: static/sticky/fixed behavior matches its
name, sections align, and fixed examples document rather than conceal their
page-offset requirement. Result: pass. Center alignment was corrected to use
equal grid tracks so unequal side content does not shift it geometrically.

## Step 2 — Mobile, zoom, RTL, and preferences

Review at mobile widths, 200%/400% zoom, 256 CSS pixels where meaningful, RTL,
forced colors, reduced motion/transparency, and long localized content.
Expected: no page overflow or unintended second row appears; landmarks,
focus, alignment, and surface boundaries remain clear. Result: pass. Consumer
labels now truncate at narrow widths, and the approved neutral/accent tone
contract is covered across solid, surface, and transparent variants.

## Completion

Overall result: pass
Follow-up issues: None open. Geometric centering, narrow label truncation, and
the neutral/accent color contract were completed during the review and covered
by browser regression tests.
Workbook updated: Automated, Consumer, and retirement evidence is recorded;
the owner-run row is complete.
