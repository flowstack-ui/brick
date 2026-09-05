# Text manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Text |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/text` |

Scenario order: `01 Overview`, `02 Type variants`, `03 Tones`,
`04 Weight and alignment`, `05 Semantic hosts`,
`06 Wrapping and overflow`, `07 Native attributes and composition`,
`08 Appearance and customization`, `09 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Default, hierarchy, and tones

Setup: Open `/text`; review `01` through `03` top to bottom.

Action: Compare repeated copy across the default, fourteen variants, and nine
tones.

Expected: The default is ordinary primary body text. Type recipes form a clear,
restrained hierarchy without changing content or host; title-2xs is a compact
14px structural heading, title-xs is a small 16px structural heading, and
eyebrow is a short, uppercase, tracked label. Primary is neutral
high-emphasis text; accent is brand-colored. Every tone remains readable and
does not change size, weight, or spacing.

Result:
Notes or issue:

## Step 2 — Weight, alignment, and semantics

Setup: Continue through `04` and `05`.

Action: Compare weights, alignments, and transforms, then inspect the live
semantic hosts, named Heading/Paragraph/Caption/Eyebrow exports, and rendered
HTML.

Expected: Only the named weight, alignment, or transform changes. Start/end
follow the page direction. Authored DOM text is unchanged by visual transform.
Span, paragraph, div, and heading retain identical body-md appearance; named
exports render one correct host, Heading uses its explicit level independently
from title-lg, and the output shows the selected element and attributes.

Result:
Notes or issue:

## Step 3 — Wrapping, clipping, native output, and ref

Setup: Continue through `06` and `07`.

Action: Resize the window, compare wrap modes, confirm truncation/clamping,
inspect the Arabic output, and activate **Inspect ref**.

Expected: In the equal-width wrapping row, natural wrap leaves `person.` alone;
balance redistributes all lines and ends with `for every person.`; pretty keeps
the more natural preceding line and ends with `every person.` in supporting
browsers. Nowrap is deliberately one clipped line. Truncate shows a logical-end
ellipsis and clamp stops at three lines. Native language, direction, ARIA,
data, and strong emphasis match the output. Ref host reports `P`.

Result:
Notes or issue:

## Step 4 — Appearance, spacing, zoom, and RTL

Setup: Review `08` and `09`; test light/dark, forced colors, 390 px, 200% text
size, 400% zoom, and WCAG text-spacing overrides.

Action: Compare scoped defaults and customization, then read all localized and
RTL stress content.

Expected: Customization exactly matches its code. No text overlaps, disappears,
or creates page-level horizontal scrolling. Long words remain contained.
Forced colors stay readable. RTL start/end reverse logically without changing
the recipe.

Result:
Notes or issue:

## Step 5 — Physical mobile and screen reader

Setup: Open `/text` on the recorded physical device, then enable the recorded
screen reader.

Action: Read the page top to bottom, navigate by headings, rotate the device,
select/copy text, and inspect clipped examples.

Expected: Reading and heading order match the authored semantic hosts; visual
size does not invent heading levels. Selection/copy works. Rotation and text
resize preserve content. Important clipped content is not presented as though
it were complete.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
