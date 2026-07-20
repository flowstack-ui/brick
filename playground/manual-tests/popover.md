# Popover Manual Verification

Status: **Owner run required before package completion**
Route: `/popover`

1. In light mode, open **Project settings** by pointer, Enter, and Space. Confirm
   the elevated surface, spacing, border, shadow, controls, actions, and Arrow.
2. Confirm the screen reader announces the dialog title and description. Close
   with Escape and **Done**; confirm focus returns to the trigger.
3. Inspect `sm`, `md`, and `lg`. Confirm width changes while control and Button
   heights remain stable and Footer actions wrap before clipping.
4. Inspect Anatomy. Confirm Header, Body, Footer, custom radius/spacing, explicit
   native name/description, and Close remain correct.
5. Test controlled, disabled, modal, and explicit-close examples. Confirm modal
   Tab/Shift+Tab stay within the panel and outside/Escape cannot close the
   explicit-close example.
6. Open every placement and the separate Anchor example. Confirm collision may
   change the final side and Arrow follows the resolved side.
7. Open parent then nested panel. Escape closes only the nested panel first;
   parent controls remain usable, then parent closes and restores focus.
8. Switch to dark mode; repeat Overview and Anatomy. Confirm clear surface,
   border, text, input, Button, and Arrow hierarchy.
9. Enable reduced motion. Confirm opening/closing has no meaningful scale or
   translation. In forced colors, confirm a system-color boundary and controls.
10. At 200% and 400% zoom and 256 px CSS width, open long settings. Confirm all
    content/actions are reachable, Body scrolls, and the page does not overflow.
11. In RTL, confirm title, description, controls, action order, placement, and
    padding follow logical direction without moving the panel off-screen.
12. On physical iPhone Safari and Android Chrome, tap triggers, inputs, outside,
    and Close. Confirm one tap opens, no text-selection gesture is required, the
    virtual keyboard appears only after deliberately focusing the input, and
    every action remains reachable.
13. Audit usage: examples are compact interactive panels, not Tooltip,
    HoverCard, Menu, Dialog, or destructive AlertDialog cases. Record results and
    device coverage in the component workbook.
