# Alert manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Alert |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/alert` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — All recipes

Inspect every specimen in the 16 numbered scenarios. Compare border and text
contrast, glyph size, padding and content containment in light and dark.

Result:
Notes or issue:

## Step 2 — Reflow

Inspect narrow mobile width, long RTL text and actual 200/400% zoom. Indicators
stay square, content wraps and actions remain visible and reachable.

Result:
Notes or issue:

## Step 3 — Interaction and announcements

Dismiss via keyboard and confirm focus returns to Restore notice. Trigger the
polite update with a real screen reader. Static content must not acquire an
unexpected announcement. Test authored assertive messages separately.

Result:
Notes or issue:

## Step 4 — Preferences

Check forced colors, reduced motion with a composed Spinner and touch actions.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Scenario order: 01 alert.basic; 02 alert.description; 03 alert.statuses; 04 alert.variants; 05 alert.sizes; 06 alert.tone; 07 alert.inline; 08 alert.close; 09 alert.loading; 10 alert.custom; 11 alert.no-icon; 12 alert.actions; 13 alert.rich; 14 alert.semantics; 15 alert.narrow; 16 alert.appearance.
