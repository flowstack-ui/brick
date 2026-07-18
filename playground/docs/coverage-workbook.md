# Coverage Workbook

`component-coverage.xlsx` is Brick's reviewable component evidence tracker. It
does not replace source, tests, manual protocols, public documentation, or the
private Core dependency ledger.

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
sheet only when its brief identifies the public anatomy and applicable evidence.

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
- live-consumer cutover and legacy Core retirement

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
- Package completion and Core retirement remain separate visible gates.
- A component is not `complete` while any required row is unresolved or either
  completion gate remains open.

Update the workbook in the same workstream as the evidence. After editing,
recalculate formulas, scan for formula errors, visually inspect every changed
sheet, and confirm the Index agrees with the component sheets. Before declaring
package completion, sample every `tested` and `verified` row against its exact
assertion; formulas summarize statuses but cannot validate the evidence claim.
