# HoverCard Manual Verification

Status: **Completed July 21, 2026 with one non-blocking touch follow-up**
Route: `/hover-card`

HoverCard is a progressive visual preview. Every trigger must remain a genuine,
complete link and every preview must remain non-interactive and nonessential.

1. Open the route in light mode. Hover **Ada Lovelace**; confirm the elevated
   preview, Avatar, Badge, spacing, border, shadow, and Arrow look intentional.
2. Move the pointer from the Ada link into the preview. Confirm it stays open,
   then closes after leaving both surfaces.
3. Focus the Ada link with Tab. Confirm the preview opens without moving focus.
   Press Escape; confirm it closes and focus stays on the link.
4. Activate the Ada link with Enter and by pointer/touch. Confirm the link
   destination still works and does not depend on preview content.
5. Inspect `sm`, `md`, and `lg`. Confirm the preferred widths differ while text,
   Avatar, and Badge sizing remain stable.
6. Inspect Top, Right, Bottom, and Left. Confirm collision may change the final
   side, Arrow follows it, and **Left, no arrow** has no visual artifact.
7. Inspect controlled, disabled, and default-delay examples. Confirm controlled
   opens, disabled never opens, and default delay feels like 700/300 ms.
8. Inspect profile and document composition. Confirm there are no links,
   buttons, inputs, menus, required instructions, or recovery actions inside.
9. Switch to dark mode. Repeat the overview and composition checks; confirm
   surface hierarchy and text/border contrast remain clear.
10. Enable reduced motion. Confirm the preview does not scale or translate.
11. Enable forced colors when available. Confirm a visible system-color border
    and Arrow boundary remain without relying on shadow.
12. At 200% and 400% zoom, and at 256 px CSS width, inspect long and Arabic
    previews. Confirm wrapping, internal overflow, viewport containment, and no
    horizontal page scroll.
13. In RTL, confirm internal content follows RTL and collision alignment remains
    logical rather than mirrored incorrectly.
14. On physical iPhone Safari and Android Chrome, tap every link normally.
    Confirm navigation works with no hold gesture or preview reliance.
15. With VoiceOver or another screen reader, confirm each trigger is announced
    as a complete link and no dialog, popup, expanded state, or preview content
    is promised.
16. Audit the examples one last time: every preview fact is duplicated on the
    visible page or available at the destination. Record pass/fail and device
    coverage in the component workbook.

## Recorded outcome

The owner passed the visual, pointer, keyboard, VoiceOver, responsive, RTL,
preference, and content audits. Physical mobile/tablet testing found that some
fast taps near a Trigger edge can still open the preview intermittently. Native
link activation remains available and the preview is duplicate, noninteractive,
and nonessential, so this finding remains a non-blocking Atom follow-up rather
than a HoverCard completion or Core-retirement blocker.
