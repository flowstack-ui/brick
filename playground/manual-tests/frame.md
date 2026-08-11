# Frame manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Frame |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/frame` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: `01 Overview`, `02 Responsive constraints`,
`03 Nested percentage sizing`, `04 Bounded scrolling`, `05 Stress`.

## Step 1 — Intrinsic and responsive constraints

Inspect the overview and responsive examples at narrow, medium, and wide
viewports. Confirm omitted constraints remain intrinsic, logical minimum and
maximum sizes apply only on their intended axes, and responsive values carry
forward until explicitly replaced.

Result:
Notes or issue:

## Step 2 — Nested percentage sizing

Confirm the nested 50% Frame resolves against its definite parent rather than
the viewport. At wide viewports, confirm the adjacent unconstrained Frame
remains intrinsic and that neither nested Frame inherits another Frame's
private responsive variables.

Result:
Notes or issue:

## Step 3 — Bounded scrolling and focus

Confirm maximum block size composes with ScrollArea, overflow remains owned by
ScrollArea, and keyboard focus is never clipped at any edge. Tab through every
focusable descendant and run axe on the scenario.

Result:
Notes or issue:

## Step 4 — Reflow, writing modes, and appearance

Test 390px, 200% text size, 400% zoom, long and unbroken content, RTL, vertical
writing, light/dark appearance, and forced colors. Confirm Frame changes only
geometry: surrounding paint may change with appearance, source order remains
stable, and no page overflow or inaccessible content is introduced.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
