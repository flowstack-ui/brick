# Coverage Workbook

`component-coverage.xlsx` is Brick's reviewable component evidence tracker. It
does not replace source, tests, manual protocols, or public documentation.

This file is portable repository guidance. It intentionally does not reference
a contributor's personal filesystem or require one specific spreadsheet
library.

## Required capabilities

Use a structured `.xlsx` authoring tool that preserves:

- formulas and calculated relationships
- styles and number formats
- list validation and conditional formatting
- filters, tables, freeze panes, and hidden validation data
- workbook and worksheet structure

Visually inspect every changed sheet in a spreadsheet application or a faithful
render before committing the workbook. Do not edit raw XLSX XML unless the
available workbook tools cannot perform the task.

## Workbook model

The workbook contains:

- `Index` — formula-driven reference-component summary
- `Instructions` — status vocabulary and maintenance rules
- one sheet per component — component and part-level evidence requirements
- `_Lists` — hidden validation values

The initial reference sheets are `Button`, `Card`, and `Dialog`. Add a component
sheet only when its contract identifies the public anatomy and applicable
evidence. Every independently exported public component owns an independent
sheet. A family sheet may summarize integration, but cannot replace those
component sheets.

## Status vocabulary

Use only:

```text
not started
partial
implemented
tested
verified
blocked
not applicable
```

- `implemented` means the evidence exists.
- `tested` means its automated or repeatable check passes.
- `verified` means required human review also passed.
- `not applicable` requires a short explanation.
- `blocked` requires a blocker or follow-up reference.

## Component rows

Each component sheet tracks:

- implementation, anatomy, exports, types, and CSS
- visual recipes, states, appearance, responsiveness, stress, and customization
- component, type, browser, axe, visual, and relevant mobile tests
- the numbered manual protocol and latest completed run
- public documentation and component changelog
- live-consumer composition and package verification

Replace generic `Component` part labels with the approved public part names
when the component brief is adopted. Add component-specific rows rather than
forcing a generic row to represent behavior it does not cover.

Write evidence descriptions at assertion granularity. Identify whether a row
is proven by Atom's released behavior suite, a Brick adapter test, a real
browser integration test, or a manual result. A file that merely renders the
part, or a neighboring test that exercises a different path, does not support a
`tested` status. Split a broad row when its claims belong to different owners or
evidence layers.

## Completion

The `Index` derives its counts and completion from component sheets.

- Requirements that need human review count as complete only when `verified`.
- Requirements that do not need human review count as complete at `tested` or
  `verified`.
- `not applicable` counts as resolved only when its reason is recorded.
- Package completion remains a separate visible gate.
- A component is not `complete` while any required row is unresolved or its
  package-completion gate remains open.

Update the workbook in the same workstream as the evidence. After editing,
recalculate formulas, scan for formula errors, visually inspect every changed
sheet, and confirm the Index agrees with the component sheets. Before declaring
package completion, sample every `tested` and `verified` row against its exact
assertion; formulas summarize statuses but cannot validate the evidence claim.

## Editing procedure

1. Confirm the available structured workbook tool can preserve formulas,
   styles, validation, conditional formatting, filters, freeze panes, hidden
   data, and sheet structure. If it cannot, leave the workbook unchanged and
   record the gate as blocked.
2. Copy a compatible reference sheet, rename it for exactly one public
   component, and replace all generic anatomy and evidence rows.
3. Add or split rows until each status describes one assertion and one primary
   evidence owner.
4. Update the `Index` reference without replacing formulas with values.
5. Recalculate in a compatible spreadsheet engine and scan every formula cell
   for errors.
6. Render or open every changed sheet and inspect text wrapping, row heights,
   widths, frozen regions, filters, validation, conditional colors, and the
   printable evidence area.
7. Compare the Index totals to the component sheets and sample the cited files
   before committing.

Never use a raw XML edit for routine maintenance, flatten formulas, or mark a
status from neighboring/shared evidence. The workbook is not complete until
both structural validation and visual inspection pass.
