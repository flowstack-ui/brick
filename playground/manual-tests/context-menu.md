# Context Menu manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Context Menu |
| Version or commit | Unreleased; record the tested commit |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/context-menu` |

Scenario order: defaults and recipes → state and behavior → composition and output →
appearance and stress → assistive technology → additional visual recipes.

Review the documentation examples in page order, then use the supplemental
qualification route (`?qualification=1`) for exhaustive state and composition cases.
Use `pass`, `fail`, `blocked`, or `not applicable`; leave results blank until tested.

## Step 1 — Defaults and recipes

Open `/context-menu` and review the basic, size, and anatomy examples top to bottom. Operate each example.
Expected: the default is medium; only the named size or anatomy changes; text,
icons, shortcuts, focus, and popup geometry remain aligned. Confirm `sm`, `md`,
and `lg` popup rows have 24px, 32px, and 44px minimum heights with
12px, 14px, and 16px regular text; popup padding is 4px, 6px, and 8px.
For Menubar, strip `size` and popup `menuSize` are independent.

## Step 2 — State and behavior

Review the state and selection examples with pointer and keyboard. Exercise enabled,
disabled, selected, danger, controlled, and nested examples that are present.
Expected: state is clear; disabled items do not activate; selection persists;
nested content opens and dismisses without losing focus.

## Step 3 — Composition and output

Review the composition examples. Expected: the authored host remains the only
host; live HTML preserves native semantics, Atom state and ARIA, Brick classes,
custom slots, handlers, and refs without duplicate interactive elements.

## Step 4 — Appearance and stress

Review the theme and stress examples in light/dark, phone width, 200%/400%, RTL,
forced colors, and reduced motion. Expected: customization matches its code;
content stays in the viewport; logical alignment and keyboard direction mirror;
focus and state remain visible without required motion.

## Step 5 — Assistive technology

Traverse the default example with a screen reader and keyboard. Expected:
trigger, menu or navigation structure, open/selected/disabled state, groups,
items, and focus changes announce once and in a useful order.

## Additional visual recipe qualification

Manual execution status: **unperformed**. Record browser and device details above
before marking these checks complete.

- Compare subtle, solid, and plain highlighting with all six tones in light/dark.
  Root tone changes highlighted colors, not resting primary labels; explicit item
  tone colors resting text, and explicit neutral resets an inherited palette.
- Check popup inset none/sm/md/lg, itemInset none, automatic versus reserved
  leading space, and row/stack layouts. Rich labels and shortcuts share the first
  line; descriptions sit below labels, and unchecked choice rows do not shift.
- Check default/custom/null submenu indicators, including an asChild button.
  A replacement must produce one indicator and one interactive host.
- Check popup and individual-item public token overrides at every size.
  Portals must retain recipe props without assuming CSS inheritance from a
  DOM-less Root. Verify solid danger links retain readable highlighted text.
- Verify keyboard focus remains visible inside zero-inset popups, pointer hover
  does not manufacture a keyboard ring, and forced colors/RTL remain usable.
- Check arrows remain attached and unclipped while popup content scrolls.

## Completion

Manual execution remains unperformed until a reviewer records the environment,
results, and follow-up issues. Automated checks do not substitute for screen-reader,
physical-device, or actual browser-zoom verification.

## Results

Overall result:
Follow-up issues:
Workbook updated:
