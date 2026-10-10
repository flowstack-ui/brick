# Field manual-test protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

| Run information | Value |
| --- | --- |
| Component | Field |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/field` |

Scenario order: `01 Overview`, `02 Anatomy`, `03 States`, `04 Errors`,
`05 Layout`, `06 Relations`, `07 Compose`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Default anatomy and states

Setup: Open `/field`; review `01 Overview` through `03 States`.

Action: Click every visible label and operate required, optional, disabled, and
read-only controls.

Expected: Each label focuses its control. Description and indicators stay
aligned with the same default anatomy. Only the named state changes; disabled
and read-only behavior remains distinct.

Result:
Notes or issue:

## Step 2 — Errors and layout

Setup: Open `04 Errors` and `05 Layout`.

Action: Compare invalid, matched, forced, and message-free errors. Resize the
horizontal example until it returns to one column.

Expected: Error visibility and invalid styling match each case without surprise
announcements. Vertical content stays aligned; horizontal layout reflows before
labels or controls clip.

Result:
Notes or issue:

## Step 3 — Relationships and composition output

Setup: Open `06 Relations` and `07 Compose`.

Action: Compare generated and explicit examples with the HTML shown beside
each. Repeat for default, render, and asChild composition.

Expected: Visible results remain equivalent. Displayed IDs, `for`, and ARIA
references resolve to the live label, control, description, and error. Each
composition path keeps the intended element, slots, classes, and relationships.

Result:
Notes or issue:

## Step 4 — Theme, customization, and stress

Setup: Open `08 Theme` and `09 Stress`; test light/dark, 390 px, 200%, 400%,
and RTL.

Action: Focus and enter content in every stressed example.

Expected: Custom colors retain readable contrast and remain local. Long labels,
unbroken descriptions, horizontal reflow, focus, and logical invalid cues stay
contained and correctly aligned.

Result:
Notes or issue:

## Step 5 — Screen reader

Setup: Enable the recorded screen reader.

Action: Navigate Overview, state, error, generated, and explicit examples.

Expected: Each control has one name; its description, required/read-only/
disabled state, and applicable error are announced through the relationships
shown in the output.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable assistive-technology environments `blocked`.
## Additional qualification — unrun

1. Activate the Price label in Target control. Confirm Amount receives focus,
   Currency retains its own accessible name, and both controls have unique IDs.
2. With a screen reader, inspect helper/error associations before and after an
   error is removed. Confirm the decorative ErrorIcon is not announced.
3. At 200% and 400% zoom and in RTL, check horizontal reflow, label width,
   long messages, required-marker count and keyboard focus visibility.

Result: Unrun. Record actual browser, device and assistive-technology versions.

Field adds Item, Context, ErrorIcon and useFieldContext. Item takes a unique
value; Root.target selects the Item activated by Label. Secondary controls need
an accessible name. Root.ids accepts control, label, description and error IDs;
use ids.control for an authored control ID. Existing one-control composition
still works unchanged. Field invalidity is independent of Fieldset's summary.

size and orientation accept responsive initial/sm/md/lg/xl values. labelWidth
accepts a CSS inline size or pixel number for horizontal labels. Existing
primary/secondary tone remains label emphasis, not control paint. ErrorIcon
uses Icon presentation props and defaults to inherited text size.

Labels/messages use quieter spacing and text styling; read-only no longer adds
italics and invalid no longer adds wavy underlines or error-edge stripes.
Required markers remain automatic: disable the default before adding a custom
RequiredIndicator. Keep error text meaningful, not color alone.
