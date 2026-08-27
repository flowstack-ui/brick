# Segment Group manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Segment Group |
| Version or commit | Unreleased 0.1.9 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/segment-group` |

Scenario order: `01 Overview`, `02 Sizes`, `03 Layout`, `04 States`,
`05 Theme`, `06 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Leave
every result blank until the named environment is actually tested.

## Step 1 — Selection and keyboard ownership

Setup: Open `/segment-group` and review `01 Overview`.

Action: Tab into the group, then use arrow keys, Home, End, Space, and pointer
selection.

Expected: The group exposes one radio-group relationship and one selected
value. Only the selected Item is in the Tab sequence. Keyboard and pointer
selection move both the checked state and the visual Indicator together.

Result:
Notes or issue:

## Step 2 — Sizes and layout

Setup: Review `02 Sizes` and `03 Layout`.

Action: Compare `sm`, `md`, and `lg`; resize full-width and intrinsic groups.

Expected: Size changes shared control geometry consistently. Full-width Items
share available space; intrinsic groups remain content-sized. The Indicator
fills the selected Item rather than appearing as a smaller inset tile. Icon-only
artwork stays centered on both axes. The inset Root boundary does not add to
the shared control size, and the shallow Indicator elevation does not obscure
its visible boundary. The Indicator introduces no layout space.

Result:
Notes or issue:

## Step 3 — Disabled and read-only states

Setup: Review `04 States`.

Action: Try the disabled Item, disabled Root, and read-only Root with keyboard
and pointer input.

Expected: Disabled choices cannot operate and are skipped appropriately.
Read-only choices remain understandable without changing value. Selection,
focus, disabled, and read-only treatments remain distinct.

Result:
Notes or issue:

## Step 4 — Theme and Indicator motion

Setup: Review `05 Theme`; switch light/dark appearance, accents, fonts, and
radius settings.

Action: Select each Item after every theme change.

Expected: Text remains readable, the selected Indicator uses semantic theme
paint, and its geometry follows the selected Item. Reduced motion removes the
travel animation without delaying selection.

Result:
Notes or issue:

## Step 5 — Reflow, zoom, RTL, and forced colors

Setup: Review `06 Stress`; test 320 px, 200% text size, 400% zoom, RTL,
reduced motion, and forced colors.

Action: Operate every Item and move between the first and last values.

Expected: Labels remain contained, complete focus rings stay visible, logical
navigation mirrors in RTL, and system colors preserve selected and focus
states. Indicator measurement remains aligned after reflow.

Result:
Notes or issue:

## Step 6 — Assistive technology

Setup: Enable the recorded screen reader or voice-control environment.

Action: Enter the group, move selection, and inspect disabled/read-only states.

Expected: The group name, radio names, position, checked state, and unavailable
states announce once and agree with the visible selection.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical-device or assistive-technology environments
`blocked`.
