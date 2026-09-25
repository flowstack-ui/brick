# Bottom Navigation manual-test protocol

| Run information | Value |
| --- | --- |
| Version or commit |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/bottom-navigation` |
| Qualification route(s) | `/bottom-navigation?qualification=1` |

Scenario order: `01 Overview`, `02 Recipes`, `03 Layout`, `04 Size + position`, `05 Selection`, `06 Content`, `07 Behavior`, `08 Theme`, `09 Stress`. Use `pass`, `fail`, `blocked`, or `not applicable`.

## 1 — Defaults and recipes

Open `/bottom-navigation`; review 01–02 top to bottom. Expected: Overview is outline/accent/full/equal/md/static with a pill Icon indicator and four labeled links. Accent and neutral each show visibly distinct solid, soft, outline, and ghost surfaces without changing item geometry; neutral uses no accent paint.

## 2 — Layout, size, position, and selection

Review 03–05. Resize the browser and Tab through every bar. Expected: full fills its container, floating fits and stays inset, equal divides width, centered uses closed centered targets, sizes coordinate the entire bar, and the four position previews retain their named CSS position. Indicator shapes affect only Icon paint; Item shapes affect the complete selected target; focus never clips or shifts layout.

## 3 — Labels, content, and behavior

Review 06–07. Activate links and controlled Search; try Disabled Inbox; inspect the composed HTML. Expected: hidden and active-only labels remain named, 3/4/5 destinations remain usable, Notification Badge adds no focus stop, the status becomes `Current view: search`, disabled does nothing, and the router anchor owns Brick/Atom attributes without an extra interactive wrapper.

## 4 — Appearance, effects, customization, and stress

Review 08–09 in light/dark, RTL, narrow mobile, 200% and 400% zoom, reduced motion/transparency, and forced colors. Resize and scroll the phone viewport while watching several bars. Expected: elevation and blur do not change geometry; amber preview exactly matches its code; every bar of the same size keeps one stable height and its Icon/Label columns do not move while browser chrome opens or closes; small positioned examples show their complete label line; long labels truncate visually but retain their full accessible names; Arabic order follows RTL; only the shell-owned example omits safe-area data; there is no horizontal page overflow or clipped focus.

## 5 — Assistive technology

Navigate by landmarks, links, and buttons. Expected: every navigation has a concise name; active links announce current page; controlled destinations announce as buttons; disabled state is announced; all Icons are silent; hidden labels and Notification Badge cause no duplicate speech.

## September API additions — pending manual qualification

Use the normal `/bottom-navigation` docs route for responsive size/arrangement,
surface versus transparent outline, root/selection radius, named elevation and
soft/outline/plain selection examples. Check narrow widths, keyboard focus,
200%/400% browser zoom, both directions and native landmark names. The fixed
preview intentionally overlays the viewport: application content compensation
is not supplied by BottomNavigation. Check real-device safe-area behavior.

Verify disabled composed anchors have no destination, button triggers do not
submit forms by default, and modified/download/non-self link activation does
not change current-document selection. Automated tests do not replace these checks.

## Completion

Overall result:
Follow-up issues:
Workbook updated:

## Surface effects qualification

Pending manual review: compare the translucent and exact-value example in light/dark and narrow widths; scroll bright/dark content behind the root; confirm focus and popup placement, physical reduced-transparency behavior, and low-powered mobile performance. Ordinary and legacy-only paint must match the prior recipe. Automated engine checks are recorded separately and do not complete these manual judgments.
