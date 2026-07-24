# Popover manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Popover |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/popover` |

Scenario order: `01 Overview`, `02 Sizes`, `03 Anatomy`, `04 Placement`,
`05 States`, `06 Composition`, `07 Theme`, `08 Custom`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and focus

Setup: Open `/popover` and `01 Overview`.

Action: Open with keyboard, move through content/actions, close with the
visible control, reopen, then press Escape and click outside.

Expected: The named/described panel opens intentionally, focus behavior matches
non-modal policy, every close path works once, and focus returns to the trigger.
The persistent preview stays below the playground header.

Result:
Notes or issue:

## Step 2 — Sizes, anatomy, and placement

Setup: Review `02 Sizes`, `03 Anatomy`, and `04 Placement`.

Action: Open every size, semantic anatomy, side, and alignment example.

Expected: Size changes preferred width only. Authored parts and explicit/native
relationships match labels. Collision handling keeps panels visible and Arrow
follows the resolved side.

Result:
Notes or issue:

## Step 3 — State, dismissal, anchor, and nesting

Setup: Open `05 States` and `06 Composition`.

Action: Test controlled, disabled, modal, and restricted-dismissal examples;
then use separate Anchor and nested Popover examples.

Expected: Disabled never opens. Modal traps focus; non-modal does not invent a
trap. Outside touch scrolling does not dismiss accidentally, outside tap follows
policy, and the nested top layer owns focus/Escape until it closes.

Result:
Notes or issue:

## Step 4 — Theme and customization

Setup: Open `07 Theme` and `08 Custom`; switch system, light, and dark.

Action: Open scoped and customized panels and compare code with the live result.

Expected: Portal content uses its local scope. Surface, Arrow, content,
controls, and focus remain readable. Customization stays local and preserves
semantics, placement, focus, dismissal, classes, and slots.

Result:
Notes or issue:

## Step 5 — Reflow, RTL, touch, and preferences

Setup: Open `09 Stress`; test at 390 px, 200%, and 400% zoom, RTL, reduced
motion, and forced colors.

Action: Operate long content, scrollable Body, and wrapping Footer actions with
keyboard and touch.

Expected: Panel remains contained and reachable, Body scrolls, actions wrap,
logical placement/order is correct in RTL, motion is nonessential, and system
colors preserve boundaries/focus.

Result:
Notes or issue:

## Step 6 — Screen reader

Setup: Enable the recorded screen reader.

Action: Open Overview, explicit-relationship Anatomy, modal, and nested panels.

Expected: Role, title, description, controls, modal state, and nested-layer
changes announce once in a useful order.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable touch or assistive-technology environments `blocked`.
