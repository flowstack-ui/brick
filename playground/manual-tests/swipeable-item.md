# Swipeable Item manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Swipeable Item |
| Version or commit | Record exact candidate digest before testing |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/swipeable-item` |

Scenario order: `01 swipeable-item.overview` → `02 swipeable-item.anatomy` → `03 swipeable-item.variants` → `04 swipeable-item.sides` → `05 swipeable-item.alternative` → `06 swipeable-item.states` → `07 swipeable-item.controlled` → `08 swipeable-item.appearance` → `09 swipeable-item.customized` → `10 swipeable-item.stress`.

Use `?qualification=1` for this preserved scenario sequence; review the ordinary documentation examples separately.

Use the public examples first. Legacy technical/appearance fixtures remain at
`/swipeable-item?qualification=1`. Do not treat emulated touch as physical-device
qualification.

Scenario order: Basic, Composition, Logical sides, Presentation, Controlled,
Controller, Dismissal, Motion, Full swipe, Async actions, States and RTL.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Pointer ownership and settlement

On desktop and a physical touch device, drag below and beyond the reveal
threshold in both directions. Confirm a mostly vertical gesture scrolls the
page, an interrupted owned drag restores its starting state, only the matching
logical panel opens, and no command runs during the gesture.

Result:
Notes or issue:

## Step 2 — Keyboard, nested controls, and commands

Focus Content and use Arrow Left/Right and Escape. Confirm focus remains
visible, nested More actions menu keys do not change the open side, selecting a
revealed action closes the panel without unexpected focus movement, and the
visible menu exposes the same Archive and Delete commands without swiping.

Result:
Notes or issue:

## Step 3 — State, control, and direction

Confirm disabled and read-only rows cannot open by drag or keyboard. Exercise
all controlled-state buttons and compare the displayed state to the revealed
panel. In genuine RTL, confirm logical start/end and keyboard directions mirror
according to document direction.

Result:
Notes or issue:

## Step 4 — Appearance, customization, and layout

Confirm every scenario has a separate padded evidence container and compact,
spaced specimen labels where needed. Compare light/dark scopes and inspect the
custom radius with both sides open; no action background may escape or create a
sharp corner above the rounded outline.

Result:
Notes or issue:

## Step 5 — Reflow and user preferences

At 320 CSS px and 200/400% zoom, confirm long content wraps, the visible menu
remains reachable, and no component-created page overflow appears. With reduced
motion and forced colors enabled, confirm settlement, boundaries, and focus
remain usable.

Result:
Notes or issue:

## Step 6 — Assistive technology

With a screen reader, confirm closed Actions are unavailable, the opened
localized action group is discoverable, every native action has a clear name,
and the always-visible More actions alternative has an understandable label.

Result:
Notes or issue:

## Step 7 — Interrupted motion and reset

Re-grab during both opening and closing. Reverse direction without lifting.
There must be no jump to the old destination or lag behind the finger. In the
controller example, Reset must stop travel immediately. Change reduced-motion
preference during settlement and repeat with a narrow row and larger text.

Result:
Notes or issue:

## Step 8 — Full swipe safety and recovery

Use the Full swipe example. Cross the threshold, move back and release: no
command should run. Release beyond the threshold: the reversible command runs
once. Cancellation, lost capture, Escape and repeated arrows never execute it.
The armed surface must identify the available action without unexplained blank
space. Confirm the visible button performs the same command.

In Async actions, the first save deliberately fails after a brief pending state.
Reopen actions and retry: success remains visible and no row is silently removed.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
