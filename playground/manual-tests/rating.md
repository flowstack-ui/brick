# Rating manual-test protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

| Run information | Value |
| --- | --- |
| Component | Rating |
| Version or commit | Unpublished 0.2.3; record exact candidate digest at execution |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/rating` |
| Qualification route(s) | `/rating`; legacy scenarios at `/rating?qualification=1` |

Scenario order: `01 Overview`, `02 Values`, `03 Recipes`, `04 States`, `05 Input`, `06 Artwork`, `07 Form`, `08 Theme`, `09 Stress`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every Result. Record an
issue for each failure.

## Steps

1. Review 01–06 with repeated selected-star clicks, cross-item drags, touch,
   arrows, Home, and End. Confirm default selection remains stable, the
   `allowClear` example clears only when explicitly enabled, capture loss keeps
   the live value, fractional and RTL input remain precise, one focus stop is
   exposed, custom artwork remains decorative, and every item target is at
   least 44px in comfortable density or 24px in compact density.
2. Review 04 and 07 inside and outside Field. Confirm one label, focusable read-only state, coherent invalid/disabled/required paint, one named hidden value, submit, and reset.
3. Review 08–09 in light/dark, phone width, 200%/400%, RTL, reduced motion, and forced colors. Confirm compact badges, separate padded examples, exact customization, containment, and recognizable state.
4. With assistive technology, confirm one named slider announces numeric and human-readable value text; every artwork layer remains silent.
5. Review the normal documentation page: independent sizes, half values, hover
   preview, custom icons, single-rendered emoji, color overrides, forms and passive
   aggregates. Compare equivalent compact density against the reference; the
   default 44px target spacing is an intentional difference.
6. Use keyboard and physical touch/pen on the controller example; reset externally.
   Hover must never change the submitted score. Right/middle clicks must not edit.
7. Verify disabled Fieldsets, external form reset and canceled resets. Label click
   focuses the one slider; compound focus paint surrounds only the star strip.
8. Check actual 200–400% browser zoom, mobile screen readers and native high
   contrast. Record these separately; emulation does not establish a human pass.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
