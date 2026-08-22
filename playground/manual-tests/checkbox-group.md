# Checkbox Group manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Checkbox Group |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/checkbox-group` |

Scenario order: `01 Overview`, `02 Ownership`, `03 Parent`, `04 Sizes`,
`05 Layout`, `06 Content`, `07 Form`, `08 Compose`, `09 Theme`, `10 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Default, ownership, and parent aggregation

Setup: Open `/checkbox-group`; review `01 Overview` through `03 Parent`.

Action: Toggle items in uncontrolled and controlled groups. In each parent
example, toggle the parent and individual children through none, some, and all.

Expected: Ownership changes only where the value array is stored. Parent state
accurately derives unchecked, mixed, and checked and updates all available
items without replacing child semantics.

Result:
Notes or issue:

## Step 2 — Sizes, layout, content, and states

Setup: Open `04 Sizes` through `06 Content`.

Action: Compare identical groups at every size and orientation; resize the
horizontal row. Operate structured, disabled, and invalid examples.

Expected: Size differences are visible across complete rows. Horizontal content
wraps safely. Complete rows remain clickable without painted row feedback;
hover, press, and focus-visible treatment stays on each visual square. Item
labels/descriptions stay associated; group- and item-level disabled/invalid
states remain visually and behaviorally distinct.

Result:
Notes or issue:

## Step 3 — Form flow and composition output

Setup: Open `07 Form` and `08 Compose`.

Action: Submit empty, correct, submit, and reset the Fieldset form. Inspect the
submitted repeated values. Operate default, render, and asChild examples while
checking their displayed HTML.

Expected: One shared legend/error describes the group, invalid submission
focuses correctly, repeated values match selection, and reset restores it.
Composition retains the group, items, parent, content parts, slots, and state.

Result:
Notes or issue:

## Step 4 — Theme, customization, and stress

Setup: Open `09 Theme` and `10 Stress`; test light/dark, forced colors,
390 px, 200%, 400%, and RTL.

Action: Operate long-content groups by keyboard and touch.

Expected: Customization is visible and local. Labels, descriptions, wrapping,
touch targets, focus, invalid cues, and logical order remain clear without
overflow.

Result:
Notes or issue:

## Step 5 — Screen reader

Setup: Enable the recorded screen reader.

Action: Navigate parent aggregation, structured content, disabled/invalid, and
Form examples.

Expected: Group context and each item’s full name, role, checked/mixed state,
description, and unavailable/invalid information are announced once.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable touch or assistive-technology environments `blocked`.
