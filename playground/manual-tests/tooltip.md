# Tooltip manual-test protocol

Component: Tooltip
Version or commit: Unreleased 0.1.0 with Atom 0.6.1
Reviewer: Product owner
Date: 2026-07-20
Playground route: `/tooltip`

Use `/tooltip` on desktop and the documented LAN URL on a physical touch
device. Record browser/device, viewport, appearance, direction, zoom, result,
and notes in the Tooltip coverage sheet.

1. Hover the overview trigger: it opens after the delay, remains while moving
   across the trigger/content bridge, and closes after leaving. Result: pass.
   Initial positioning, plain hover persistence, arrow seams, and rounded/pill
   shapes were corrected during review and covered by browser tests.
2. Focus it by keyboard: the Tooltip opens without moving focus; Escape closes
   it and focus remains on the trigger. Result: pass.
3. Move quickly across placement triggers: provider skip-delay behavior is
   predictable and each arrow follows the final side. Result: pass.
4. Verify rich title/description are announced as supplemental description and
   contain no interactive targets. Result: pass. VoiceOver exposes the rich
   description through the current item's More Content command.
5. On iPhone Safari and Android Chrome, a quick tap activates normally without
   leaving a Tooltip open; a deliberate hold opens it without selecting text;
   release/outside tap/scroll dismiss according to Atom's contract. Result:
   pass on iPhone Safari after the Atom 0.6.1 fix; Android Chrome not applicable.
6. Check light, dark, RTL, reduced motion, and forced colors where available.
   Result: pass for light, dark, RTL, and reduced motion; forced colors not
   applicable because no Windows device was available.
7. Check 200% and 400% zoom plus a 256px-wide viewport: content wraps, remains
   reachable, and introduces no page-level horizontal overflow. Result: pass.

## Completion

Overall result: pass
Follow-up issues: None open.
Workbook updated: Owner-run rows are complete; unavailable Android Chrome and
forced-colors contexts are recorded as not applicable rather than passed.
