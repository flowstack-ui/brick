# Tooltip manual test

Use `/tooltip` on desktop and the documented LAN URL on a physical touch
device. Record browser/device, viewport, appearance, direction, zoom, result,
and notes in the Tooltip coverage sheet.

1. Hover the overview trigger: it opens after the delay, remains while moving
   across the trigger/content bridge, and closes after leaving.
2. Focus it by keyboard: the Tooltip opens without moving focus; Escape closes
   it and focus remains on the trigger.
3. Move quickly across placement triggers: provider skip-delay behavior is
   predictable and each arrow follows the final side.
4. Verify rich title/description are announced as supplemental description and
   contain no interactive targets.
5. On iPhone Safari and Android Chrome, a quick tap activates normally without
   leaving a Tooltip open; a deliberate hold opens it without selecting text;
   release/outside tap/scroll dismiss according to Atom's contract.
6. Check light, dark, RTL, reduced motion, and forced colors where available.
7. Check 200% and 400% zoom plus a 256px-wide viewport: content wraps, remains
   reachable, and introduces no page-level horizontal overflow.
