# Navigation Menu manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Navigation Menu |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/navigation-menu` |

Scenario order: `01 Overview`, `02 Links`, `03 Size`, `04 Orientation`, `05 Content`, `06 States`, `07 Composition`, `08 Theme`, `09 Stress`.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until tested.

## Step 1 — Defaults and recipes

Open `/navigation-menu` and review scenarios 01–03 top to bottom. Operate each example.
Expected: the default is medium; only the named size or anatomy changes; text,
icons, shortcuts, focus, and popup geometry remain aligned. Confirm `sm`, `md`,
and `lg` links and triggers have 32px, 44px, and 48px minimum heights. Confirm
the automatic chevrons remain visually compact and current links use a thin,
offset underline. Confirm panel Links fill their grid cell, wrap rich content,
and make each direct Surface child one coherent clickable and focused area.
In Composition, focus the fallback panel Link and confirm its own outline stays
visible when no direct Surface is present.

## Step 2 — State and behavior

Review the middle scenarios with pointer and keyboard. Exercise enabled,
disabled, selected, danger, controlled, and nested examples that are present.
Expected: state is clear; disabled items do not activate; selection persists;
nested content opens and dismisses without losing focus. The optional Indicator
must appear as a small arrow connecting the open trigger to the Viewport rather
than a thick bar, in horizontal, vertical, and RTL examples. In the vertical
example, switch from Products to Solutions and confirm the shorter Viewport
moves with Solutions while the arrow remains connected to its edge.

## Step 3 — Composition and output

Review the composition scenario. Expected: the authored host remains the only
host; live HTML preserves native semantics, Atom state and ARIA, Brick classes,
custom slots, handlers, and refs without duplicate interactive elements.

## Step 4 — Appearance and stress

Review the last two scenarios in light/dark, phone width, 200%/400%, RTL,
forced colors, and reduced motion. Expected: customization matches its code;
each open light/dark Viewport remains contained and centered under its trigger;
content stays in the viewport; the restrained default radius and customized
radius remain visibly distinct; logical alignment and keyboard direction
mirror; focus and state remain visible without required motion.

## Step 5 — Assistive technology

Traverse the default example with a screen reader and keyboard. Expected:
trigger, menu or navigation structure, open/selected/disabled state, groups,
items, and focus changes announce once and in a useful order.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
