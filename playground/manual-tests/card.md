# Card manual-test protocol

Component: Card
Version or commit: Unreleased 0.1.0
Reviewer: Product owner
Date: July 16, 2026
Playground route: `/card`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Record a
follow-up issue for each failure or blocker.

## Step 1 — Overview and hierarchy

Setup: Open `/card` at 390 × 844 with system appearance.

Action: Inspect Overview, Variants, and Sizes without interacting.

Expected: Outline is the clear default; elevated and subtle communicate
different prominence; all sizes remain readable; nothing scrolls horizontally.

Result: pass
Notes or issue: The Sizes comparison was corrected to preserve each Card's
natural height before approval.

## Step 2 — Anatomy and source order

Setup: Find Anatomy and the canonical Overview Card.

Action: Inspect each partial composition and tab through the Overview Card.

Expected: Omitted parts produce no empty regions; title and description precede
the trailing action in reading order; Root itself is not a focus stop.

Result: pass
Notes or issue: None.

## Step 3 — Explicit actions and focus

Setup: Find Overview and Composition.

Action: Operate the nested Buttons and single-action link using Tab, Enter,
Space where native, pointer, and touch.

Expected: Each real control owns one visible focus ring and native activation.
Static Cards never gain a role, cursor, focus, hover, or press state.

Result: pass
Notes or issue: The single-action link wrapper was corrected so its focus ring
follows the Card's natural height.

## Step 4 — Light, dark, and scoped appearance

Setup: Switch system, light, and dark, then inspect both scoped Cards.

Action: Compare all variants and nested controls in every appearance.

Expected: Surface hierarchy, boundaries, text, and nested control contrast stay
clear; scoped appearance remains local.

Result: pass
Notes or issue: Dark elevated surfaces were strengthened with a subtle raised
surface difference so elevation does not depend on shadow alone.

## Step 5 — Forced colors and reduced motion

Setup: Enable forced colors and reduced motion separately where supported.

Action: Inspect every variant and focus each nested control.

Expected: All variants retain a system-color boundary, elevated does not rely
on shadow, focus remains visible, and Card adds no motion.

Result: pass
Notes or issue: Reduced motion passed manually on macOS. Forced colors remains
covered by the passing automated Chromium evidence because macOS has no native
Windows forced-colors mode.

## Step 6 — Reflow and zoom

Setup: Review at 200% and 400% zoom, then constrain the viewport to 256 CSS
pixels.

Action: Inspect every section, especially Mobile and stress.

Expected: No document-level horizontal scrolling, clipped content, overlapping
regions, hidden focus rings, or inaccessible actions.

Result: pass
Notes or issue: Standard 400% reflow passed with no clipping or horizontal
scrolling. A reduced-width browser also remained usable at 500%; presentation
below the required effective viewport width was treated as exploratory only.

## Step 7 — Long content and localization

Setup: Find the long Latin and Arabic stress Cards.

Action: Inspect long titles, unbroken references, action placement, and wrapping
footer controls at narrow and wide widths.

Expected: Content wraps inside Card, Footer wraps rather than clips, and large
actions do not collide with header text.

Result: pass
Notes or issue: The 20rem stress frame is intentionally constrained and Card
uses the width supplied by its surrounding layout.

## Step 8 — RTL

Setup: Find the right-to-left stress Card.

Action: Read and tab through the complete Card.

Expected: Logical inset and inline-end action placement mirror correctly while
DOM, reading, and focus order remain meaningful.

Result: pass
Notes or issue: None.

## Step 9 — Customization hooks

Setup: Find Appearance and customization and open developer tools.

Action: Inspect the custom Card and header slot, class, inline component tokens,
and computed variant/size attributes.

Expected: Stable `.brick-card*` classes remain; custom slots do not remove
styles; spacing, radius, and shadow overrides stay local.

Result: pass
Notes or issue: None.

## Step 10 — Screen-reader structure

Setup: Enable the selected screen reader.

Action: Navigate the Overview article, headings, supporting text, explicit
actions, partial anatomy, and single-action link.

Expected: Native article/heading/link/button semantics match the markup; Card
adds no invented widget announcement or focus stop; source order is coherent.

Result: pass
Notes or issue: VoiceOver document navigation confirmed native article,
heading, button, and link semantics without an invented Card widget.

## Completion

Overall result: pass
Follow-up issues: None. All findings discovered during the run were corrected
and retested before completion.
Workbook updated: Yes — Card requirements and package, consumer, and retirement
gates were recorded and visually verified on July 17, 2026.
