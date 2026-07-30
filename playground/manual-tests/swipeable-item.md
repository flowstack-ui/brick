# Swipeable Item manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Swipeable Item |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/swipeable-item` |

Scenario order: `01 Overview`, `02 Anatomy and output`, `03 Variants`,
`04 Start and end actions`, `05 Visible alternative`, `06 Disabled and read
only`, `07 Controlled state`, `08 Appearance`, `09 Customized`,
`10 Responsive and RTL`.

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

## Completion

Overall result:
Follow-up issues:
Workbook updated:
