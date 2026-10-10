# Navigation Menu manual-test protocol

## Expanded recipe and policy review

### Visual redesign checks (unperformed manual qualification)

- Hover an inline destination beyond closeDelay: it must remain usable until
  the pointer leaves the panel. Repeat inside nested disclosures.
- Scroll an open vertical menu toward the browser edge: its collision position
  must update without resizing the browser.
- Close a menu and reopen during exit: the arrow must fade with the panel at
  its last position, not disappear early or jump. Repeat with reduced motion.

1. Hover each destination: the whole row highlights with compact corners;
   leaving it clears paint. Contrast must not create an inverse white pill.
2. Compare a raised bar, Viewport and arrow in light/dark: paint is coordinated,
   the arrow seam is closed, and keyboard focus is not clipped.
3. Inspect rich grids, transparent header integration, inline and nested
   disclosures at 200% actual browser zoom and with long localized titles.
4. Switch unequal panels rapidly, close/reopen, and enable reduced motion.
   No origin flash, diagonal jump, stale panel or clipped destination is allowed.
5. Open the second inline disclosure: its panel starts at its own Item, not
   the first trigger. In the header example, the panel and arrow center on
   Resources; the arrow's entire base remains inside the panel corners,
   including after resizing.
6. Verify an asChild native anchor retains destination styling without a
   second styled Link owner. In horizontal RTL, the disclosure chevron points
   down when closed and up when open, never sideways.

These additional manual checks are unperformed until a human completes them;
automated results do not substitute for screen-reader or physical-device review.

- Compare sm/md/lg: 36/40/44px controls, 12/14/16px type, neutral
  subtle hover/open and plain unchanged backgrounds, with visible focus.
- Review light/dark, tone, radius and content inset. Check panel Link focus on
  a direct Surface and its fallback without one.
- Replace indicator with custom ItemIndicator, remove with null and repeat
  asChild. No duplicated glyph or unwanted accessible artwork should appear.
- Inspect shared and inline panels, start/center/end alignment, RTL/vertical,
  nested Sub, and large content in one bounded ScrollArea.
- Type a retained draft, close and reopen. Hidden content must be unavailable
  to keyboard/screen readers while its state survives.
- Verify controller/Context, independent delays, pointer policy flags,
  canceled selection/dismissal and Dialog composition without clipping/focus
  leakage. Repeat relevant cases on touch and actual browser zoom.

| Run information | Value |
| --- | --- |
| Component | Navigation Menu |
| Version or commit | Local 0.2.3 worktree; unpublished changes |
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
and `lg` links and triggers have 36px, 40px, and 44px minimum heights. Confirm
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

Before the assistive-technology pass, compare the basic shared navigation in
LTR and RTL. Switch both directions rapidly, grow and shrink the panel, close
and reopen it, then enable reduced motion. Expected: no snap, stacked panels,
clipped trailing edge or empty closing box. The basic example uses navigation
anchoring; the other default examples continue to follow their active trigger.

Traverse the default example with a screen reader and keyboard. Expected:
trigger, menu or navigation structure, open/selected/disabled state, groups,
items, and focus changes announce once and in a useful order.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
