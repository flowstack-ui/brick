# Toggle Group manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Toggle Group |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/toggle-group` |

Scenario order: `01 Overview`, `02 Selection`, `03 Variants`, `04 Sizes`,
`05 Shapes`, `06 Layout`, `07 States`, `08 Theme`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and selection modes

Setup: Open `/toggle-group` and `01 Overview`.

Action: Use Tab and arrow keys to move through the group and select items.
Repeat in `02 Selection` for single and multiple modes.

Expected: One roving tab stop enters the group. Arrow keys move focus in the
documented axis. Single mode owns zero/one value; multiple mode owns an array.
Focus, selection, and pressed styling remain clearly distinct.

Result:
Notes or issue:

## Step 2 — Variants, sizes, shapes, and icon content

Setup: Review `03 Variants`, `04 Sizes`, and `05 Shapes`.

Action: Select the same value in every comparison.

Expected: Solid, soft, and outline selected treatments are visually distinct.
Size changes shared target geometry only. Shape changes radius only. Icon-only
Items have complete names and centered artwork.

Result:
Notes or issue:

## Step 3 — Attachment and width

Setup: Open `06 Layout`.

Action: Compare separated, attached, and full-width groups while resizing the
browser.

Expected: Separated keeps gaps; attached joins logical edges without doubled
borders; full width distributes equal flexible Items. Large Items reflow before
their content becomes an unintended second line.

Result:
Notes or issue:

## Step 4 — Orientation and disabled state

Setup: Open `07 States`.

Action: Use arrow keys in the vertical group, then navigate Root-disabled and
Item-disabled examples.

Expected: Vertical uses its documented arrow axis. Disabled Root and Item
remain visibly unavailable, retain selection, are skipped appropriately, and
cannot change state.

Result:
Notes or issue:

## Step 5 — Theme and customization

Setup: Open `08 Theme`; switch system, light, and dark appearance.

Action: Inspect scoped examples and compare customization code with its result.

Expected: Rest, selected, hover, disabled, and focus remain distinct.
Customization changes visible group/Item geometry locally without replacing
selection, roving focus, classes, or slots.

Result:
Notes or issue:

## Step 6 — Reflow, RTL, touch, and preferences

Setup: Open `09 Stress`; test at 390 px, 200%, and 400% zoom, RTL, reduced
motion, and forced colors.

Action: Operate separated and attached groups with keyboard and touch.

Expected: Separated content wraps safely, attached pressure remains usable and
honest, logical corners and arrow navigation mirror in RTL, touch does not keep
false hover, and system colors preserve selection/focus.

Result:
Notes or issue:

## Step 7 — Screen reader

Setup: Enable the recorded screen reader.

Action: Navigate single, multiple, icon-only, vertical, and disabled groups.

Expected: Group context, Item names, button roles, pressed states, roving focus,
and unavailable states announce once and match the visible selection.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable touch or assistive-technology environments `blocked`.
