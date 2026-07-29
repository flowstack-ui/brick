# Rating manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Rating |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/rating` |

Scenario order: `01 Overview`, `02 Values`, `03 Recipes`, `04 States`, `05 Input`, `06 Artwork`, `07 Form`, `08 Theme`, `09 Stress`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every Result. Record an
issue for each failure.

## Steps

1. Review 01–06 with repeated selected-star clicks, cross-item drags, touch,
   arrows, Home, and End. Confirm default selection remains stable, the
   `allowClear` example clears only when explicitly enabled, capture loss keeps
   the live value, fractional and RTL input remain precise, one focus stop is
   exposed, custom artwork remains decorative, and every item target is at
   least 44px.
2. Review 04 and 07 inside and outside Field. Confirm one label, focusable read-only state, coherent invalid/disabled/required paint, one named hidden value, submit, and reset.
3. Review 08–09 in light/dark, phone width, 200%/400%, RTL, reduced motion, and forced colors. Confirm compact badges, separate padded examples, exact customization, containment, and recognizable state.
4. With assistive technology, confirm one named slider announces numeric and human-readable value text; every artwork layer remains silent.

## Completion

Overall result:

Follow-up issues:

Workbook updated:
