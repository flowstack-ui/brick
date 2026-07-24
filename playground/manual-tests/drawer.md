# Drawer manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Drawer |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/drawer` |

Scenario order: `01 Overview`, `02 Placements`, `03 Sizes`, `04 Anatomy`,
`05 States`, `06 Composition`, `07 Theme`, `08 Customization`, `09 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and focus lifecycle

Setup: Open `/drawer` and `01 Overview`.

Action: Open with keyboard, move through the filters and actions, close with
the visible control, reopen, then press Escape.

Expected: Drawer is named/described, focus enters safely and remains contained,
internal controls work, background interaction is blocked, and focus returns
to the trigger after closing.

Result:
Notes or issue:

## Step 2 — Placements, sizes, and anatomy

Setup: Review `02 Placements`, `03 Sizes`, and `04 Anatomy`.

Action: Open every start/end/top/bottom placement and size; inspect optional
parts and Title levels.

Expected: Each surface attaches to the labeled logical edge. Sizes change the
correct axis; full uses the viewport intentionally. Authored Header, Body,
Footer, Title, Description, and Close parts stay ordered and reachable.

Result:
Notes or issue:

## Step 3 — States and composition

Setup: Open `05 States` and `06 Composition`.

Action: Test controlled and dismissal-policy examples, outside interaction,
nested/portalled content, and composition paths.

Expected: Every policy behaves as labeled, the top layer owns focus and Escape,
nested layers restore focus in order, and composition preserves one modal
boundary, native semantics, classes, and slots.

Result:
Notes or issue:

## Step 4 — Theme and customization

Setup: Open `07 Theme` and `08 Customization`.

Action: Review each portal scope in system, light, and dark appearance; compare
custom code with the live Drawer.

Expected: Overlay, surface, content, controls, and focus remain readable.
Customization stays local and preserves placement, modal behavior, anatomy,
classes, and slots.

Result:
Notes or issue:

## Step 5 — Mobile, scrolling, RTL, and touch

Setup: Open `09 Stress` on a real phone when available; also test 390 px, 200%,
400% zoom, and RTL.

Action: Open long Drawers from each relevant edge, scroll Body content, operate
Footer actions, rotate the device if available, and close.

Expected: The Drawer stays attached and reachable, background scroll is locked,
Body—not the whole modal—scrolls as intended, safe-area/keyboard constraints do
not hide controls, actions wrap, and start/end mirror correctly in RTL.

Result:
Notes or issue:

## Step 6 — Preferences and screen reader

Setup: Enable reduced motion, forced colors, and the recorded screen reader.

Action: Open and close Overview and one alternate placement.

Expected: Motion is nonessential, boundaries/focus remain visible, and dialog
role, title, description, controls, placement-independent reading order, and
modal state announce correctly.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

A physical phone check is required for scroll lock, virtual-keyboard reach,
safe-area behavior, and touch quality. Mark it `blocked` if not performed.
