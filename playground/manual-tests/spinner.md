# Spinner manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Spinner |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/spinner` |
| Qualification route(s) | `/spinner` and `/spinner?qualification=1` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Recipes

Inspect all 16 numbered scenarios, including every size, color, thickness and
customization. Rings must be square, separated from labels and not clipped.
On the normal docs route, inspect custom artwork with no additional ring,
responsive sizing and the contained overlay. Check both appearance modes.

Result:
Notes or issue:

## Step 2 — Motion and preferences

Inspect normal motion, reduced motion and forced colors. Reduced motion must
leave a static visible arc. Compare light/dark and RTL without direction drift.

Result:
Notes or issue:

## Step 3 — Real devices and zoom

Inspect narrow width and actual 200/400% browser zoom. Inspect all action sizes,
loading and disabled+loading; no label or indicator may move or clip.

Result:
Notes or issue:

## Step 4 — Assistive technology

Check decorative indicators are silent, a named graphic has one name, and the
localized status composition announces only its authored text. Test with a real
screen reader. Do not infer a pass from automated accessibility scans.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Scenario order: 01 spinner.basic; 02 spinner.sizes; 03 spinner.inherit; 04 spinner.tones; 05 spinner.emphasis; 06 spinner.color; 07 spinner.track; 08 spinner.thickness; 09 spinner.duration; 10 spinner.status; 11 spinner.name; 12 spinner.overlay; 13 spinner.actions; 14 spinner.feedback; 15 spinner.preferences; 16 spinner.appearance.
