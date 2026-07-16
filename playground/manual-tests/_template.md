# Component manual-test protocol

Component:
Version or commit:
Reviewer:
Date:
Playground route:

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Record a
follow-up issue for each failure or blocker.

## Step 1 — Shortest finished state

Setup: Open the canonical overview state at the constrained mobile viewport.

Action: Inspect the component without interacting.

Expected: Purpose, hierarchy, content, state, and touch targets are immediately
understandable with no clipping or horizontal scrolling.

Result:
Notes or issue:

## Step 2 — Keyboard and focus

Setup: Reload the canonical interactive state.

Action: Operate the complete component using only the keyboard.

Expected: Focus order is logical, every focus indicator is visible, all
documented keys work, and focus restores to the documented target.

Result:
Notes or issue:

## Step 3 — Appearance and preferences

Setup: Review light, dark, forced-colors, reduced-motion, and any relevant
reduced-transparency state.

Action: Repeat the component's primary interaction in each applicable mode.

Expected: Meaning, hierarchy, focus, state, and content remain perceivable.

Result:
Notes or issue:

## Step 4 — Reflow and content stress

Setup: Use 200% zoom, then 400% where applicable; load long localized content
and right-to-left direction.

Action: Inspect and operate the component at constrained and wide widths.

Expected: Content reflows without loss, overlap, or unexpected scroll; order
and directional styling remain correct.

Result:
Notes or issue:

## Step 5 — Assistive-technology spot check

Setup: Enable the selected screen reader for components that add meaningful
structure, feedback, or visual affordances.

Action: Navigate and operate the documented path.

Expected: Names, roles, states, descriptions, and announcements match the
public accessibility contract.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
