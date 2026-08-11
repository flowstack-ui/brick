# Section manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Section |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/section` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: `01 Overview`, `02 Spacing scale`, `03 Asymmetric rhythm`,
`04 Responsive rhythm`, `05 Surface composition`, `06 Stress`.

## Step 1 — Scale and responsive rhythm

Compare `none` through `2xl`, then resize the responsive example through the
`sm`, `md`, `lg`, and `xl` boundaries. Confirm each scale step produces a
clear larger page-region rhythm and each responsive value changes only at its
declared boundary without changing child layout.

Result:
Notes or issue:

## Step 2 — Logical edges and semantics

Confirm independent start/end recipes change only the named logical edge.
Inspect `section`, `div`, `article`, and `aside` examples and verify each host
matches the authored document meaning. Repeat in RTL and vertical writing
mode; logical edges must follow the writing mode without clipping or
reordering content.

Result:
Notes or issue:

## Step 3 — Surface and Container composition

Inspect `Surface asChild > Section > Container`. Confirm one semantic host owns
both full-width paint and complete Section block padding. Inspect the contained
Surface example and confirm paint stops at the Container boundary while
Section rhythm remains outside it. Repeat in light and dark appearance.

Result:
Notes or issue:

## Step 4 — Reflow, focus, and assistive technology

Test 390px, 200% text size, 400% zoom, keyboard focus, forced colors, and a
screen-reader heading/landmark review. Confirm no page overflow, clipped focus,
or invented landmark exists and only intentionally semantic examples enter the
document structure.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
