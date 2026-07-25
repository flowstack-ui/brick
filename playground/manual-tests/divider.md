# Divider manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Divider |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/divider` |

Scenario order: `01 Overview`, `02 Orientation`, `03 Variants`,
`04 Thickness`, `05 Inset`, `06 Labels`, `07 Semantics and composition`,
`08 Appearance and customization`, `09 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable`.

## Step 1 — Default and visual recipes

Setup: Open `/divider`; review `01`–`06` top to bottom.

Action: Compare each controlled row without changing page controls.

Expected: Default is quiet and full width. Orientation, line style, thickness,
inset, and label placement each change only their named dimension.

Result:
Notes or issue:

## Step 2 — Semantics and composition

Setup: Continue to `07`.

Action: Inspect output, activate **Inspect ref**, and read the decorative and
named semantic examples with the recorded screen reader.

Expected: Decorative line is not announced; named semantic line is announced
as a separator; composed output has one selected root; ref reports `HR`.

Result:
Notes or issue:

## Step 3 — Appearance and customization

Setup: Review `08` in light, dark, and forced colors.

Action: Compare the default lines and the customization description/result.

Expected: Lines remain visible without excessive emphasis. The customized
result changes exactly color, inset, and label gap. Forced colors use a visible
system boundary.

Result:
Notes or issue:

## Step 4 — Responsive, RTL, zoom, and mobile

Setup: Review `09` at 320 CSS px, 200%, 400%, RTL, and a physical phone.

Action: Read the long label, inspect start inset, and compare the vertical row.

Expected: No horizontal overflow or clipping; label wraps; start inset mirrors;
vertical dashed Divider stretches between equal peer content.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable device or assistive-technology environments `blocked`.
