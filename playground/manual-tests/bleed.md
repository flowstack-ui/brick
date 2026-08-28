# Bleed manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Bleed |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/bleed` |

Scenario order: `01 Overview`, `02 Axis and edge ownership`,
`03 Responsive values`, `04 Nested composition`,
`05 Narrow, zoom, RTL, and long content`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Axis and edge ownership

Review the inline, block, and one-edge specimens at their default width.

Expected: Each specimen crosses only the authored parent inset. Content that
does not use Bleed retains the parent's ordinary alignment, and the document
does not gain unexpected horizontal overflow.

Result:
Notes or issue:

## Step 2 — Responsive and nested values

Resize through the documented `sm`, `md`, `lg`, and `xl` states, then inspect
the nested specimen.

Expected: Each responsive value begins at its authored breakpoint and persists
until superseded. A directional edge overrides its matching axis edge. Nested
Bleed values remain scoped to their own element and do not inherit from the
parent Bleed.

Result:
Notes or issue:

## Step 3 — Narrow, zoom, RTL, and assistive technology

Review at 320 CSS px, 200% text, 400% zoom, RTL, and forced colors. Use a
physical mobile device and available screen reader when possible.

Expected: Logical edges reverse correctly in RTL, text remains readable, focus
for interactive descendants is not clipped, and Bleed adds no role, name, or
keyboard behavior of its own. No viewport produces accidental document
overflow.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
