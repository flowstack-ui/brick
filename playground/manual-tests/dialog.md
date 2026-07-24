# Dialog manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Dialog |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/dialog` |

Scenario order: `01 Overview`, `02 Sizes`, `03 Anatomy`, `04 Semantics`,
`05 States`, `06 Composition`, `07 Theme`, `08 Customization`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and focus lifecycle

Setup: Open `/dialog` and `01 Overview`.

Action: Open the Dialog with keyboard, inspect initial focus, Tab and
Shift+Tab through it, close with its visible action, reopen, then press Escape.

Expected: The modal is named and described, focus enters a safe control, stays
inside, closes once, and returns to the trigger. Background content cannot be
operated while open.

Result:
Notes or issue:

## Step 2 — Sizes, anatomy, and headings

Setup: Review `02 Sizes`, `03 Anatomy`, and `04 Semantics`.

Action: Open every size and anatomy example; inspect optional parts and every
Title heading level.

Expected: Sizes change preferred measure and inset only. Only authored Header,
Body, Footer, Close, Title, and Description parts appear. Title uses the
labeled heading level and relationships remain correct.

Result:
Notes or issue:

## Step 3 — States, dismissal, and composition

Setup: Open `05 States` and `06 Composition`.

Action: Test controlled/open states, disabled dismissal policies, outside
interaction, nested modal/portalled content, and all composition examples.

Expected: Each policy behaves as labeled; unavailable dismissal paths do
nothing. The top layer owns focus and Escape, nested layers restore focus in
order, and composed parts preserve one modal boundary and correct semantics.

Result:
Notes or issue:

## Step 4 — Theme and customization

Setup: Open `07 Theme` and `08 Customization`.

Action: Open each scoped Dialog in system, light, and dark appearance; compare
customization code with the live surface.

Expected: Portal content uses its intended scope. Surface, overlay, text,
focus, and controls remain readable. Customization stays local and preserves
modal semantics, focus lifecycle, anatomy, classes, and slots.

Result:
Notes or issue:

## Step 5 — Reflow, RTL, touch, and preferences

Setup: Open `09 Stress`; test at 390 px, 200%, and 400% zoom, RTL, reduced
motion, and forced colors.

Action: Operate the long-content Dialog using keyboard and touch.

Expected: The surface remains reachable and contained; Body scrolls when
needed, Footer actions wrap, close controls stay available, RTL order is
logical, reduced motion removes nonessential animation, and forced colors
preserves boundaries and focus.

Result:
Notes or issue:

## Step 6 — Screen reader

Setup: Enable the recorded screen reader.

Action: Open Overview, a semantic-title example, and a nested example.

Expected: Dialog role, title, description, controls, modal state, and layer
changes announce once; background content is not exposed as the active task.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical or assistive-technology environments `blocked`.
