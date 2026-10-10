# Scroll Area manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Scroll Area |
| Version or commit | Record tested package/archive identity |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/scroll-area` |
| Qualification route | `/scroll-area?qualification=1` |

The documentation route contains concise public examples. The qualification
route preserves this exhaustive native-regression order.

Scenario order:
`01 Overview`, `02 Orientations`, `03 Layout constraints`,
`04 Scrollbar gutter`, `05 Scrollbar visibility`, `06 Focus and semantics`,
`07 Composition and output`, `08 Appearance and customization`, and
`09 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable`.

## Custom-mode parity review

On `/scroll-area`, inspect sizes, horizontal/both axes, visibility, gutter,
controller/shadows, customization, RTL, dynamic content, bottom-following,
virtualization, menu integration and native mode. Repeat light/dark, a narrow
viewport, real zoom and a physical touch device. Drag each thumb beyond its
track, cancel a drag, and use native wheel/keyboard input. Check the two-axis
corner, shadow edges and focus visibility. In OS high contrast, custom bars
must disappear and native scrolling must remain usable. OS settings may hide
native bars until scrolling, so compare with an ordinary native scroller.

Use a screen reader to verify named regions and menu item announcements. Custom
tracks are not extra keyboard stops or ARIA sliders. In the conversation, adding
a message follows only when already at the bottom. Scrolling away must preserve
position. The virtual archive must reach all 10,000 rows without rendering them
all simultaneously. Record observed results, not inferred passes from CI.

Result:
Notes or issue:

## Step 1 — Default, axes, constraints, and gutter

Review `01`–`04`. Scroll each viewport by wheel, trackpad, touch, scrollbar,
and keyboard where available. Expect only named axes to move, content to remain
contained, and stable gutter to reserve space without changing content.

Result:
Notes or issue:

## Step 2 — Visibility and keyboard access

Review `05`–`06`. Compare auto/always/interaction at rest, hover interaction,
then Tab to the named plain region and scroll with arrows/Page Up/Page Down.
Expect scrolling in every mode, interaction color on hover/focus, a visible
inset focus ring, and no extra viewport stop around the buttons.

Result:
Notes or issue:

## Step 3 — Composition and appearance

Review `07`–`08`. Inspect output, activate **Inspect viewport ref**, then
repeat in light, dark, and forced colors. Expect one composed root and viewport,
ref host `ARTICLE`, visible native scrollbars/focus, and customization limited
to the two documented scrollbar colors.

Result:
Notes or issue:

## Step 4 — Mobile, RTL, writing mode, zoom, and nesting

Review `09` at 320 CSS px, 200%, 400%, RTL, and a physical phone. Scroll every
available axis and return to document scrolling at each boundary. Expect no
trapped page scrolling, inaccessible content, layout escape, or reversed
content order; platform overlay scrollbars may differ visually.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
