# Menubar manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Menubar |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/menubar` |

Scenario order: `01 Overview`, `02 Orientation`, `03 Density`, `04 Triggers`, `05 Anatomy`, `06 Selection`, `07 Composition`, `08 Theme`, `09 Stress`.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until tested.

## Step 1 — Defaults and recipes

Open `/menubar` and review scenarios 01–03 top to bottom. Operate each example.
Expected: the default is medium; only the named size or anatomy changes; text,
icons, shortcuts, focus, and popup geometry remain aligned.

## Step 2 — State and behavior

Review the middle scenarios with pointer and keyboard. Exercise enabled,
disabled, selected, danger, controlled, and nested examples that are present.
Expected: state is clear; disabled items do not activate; selection persists;
nested content opens and dismisses without losing focus.

## Step 3 — Composition and output

Review the composition scenario. Expected: the authored host remains the only
host; live HTML preserves native semantics, Atom state and ARIA, Brick classes,
custom slots, handlers, and refs without duplicate interactive elements.

## Step 4 — Appearance and stress

Review the last two scenarios in light/dark, phone width, 200%/400%, RTL,
forced colors, and reduced motion. Expected: customization matches its code;
content stays in the viewport; logical alignment and keyboard direction mirror;
focus and state remain visible without required motion.

## Step 5 — Assistive technology

Traverse the default example with a screen reader and keyboard. Expected:
trigger, menu or navigation structure, open/selected/disabled state, groups,
items, and focus changes announce once and in a useful order.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
