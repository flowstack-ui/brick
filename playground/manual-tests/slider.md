# Slider manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Slider |
| Version or commit | Unreleased 0.1.0 |
| Reviewer |  |
| Date |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/slider` |

Scenario order: `01 Overview`, `02 Values`, `03 Recipes`, `04 States`, `05 Direction`, `06 Content`, `07 Form`, `08 Theme`, `09 Stress`.

## Steps

1. Review 01–06 with repeated track clicks, thumb drags, touch, arrows, Page Up/Down, Home, and End. Confirm committed values do not revert, range thumbs never cross, dependent ARIA bounds update, vertical and RTL axes are correct, marker labels remain contained, and every target is at least 44px.
2. Review 04 and 07 inside and outside Field. Confirm one label, coherent invalid/disabled/read-only/required paint, named hidden values, submit, and reset.
3. Review 08–09 in light/dark, phone width, 200%/400%, RTL, reduced motion, and forced colors. Confirm compact badges, separate padded examples, exact customization, containment, and recognizable state.
4. With assistive technology, confirm each thumb is one named slider with value, bounds, orientation, and invalid/disabled state; decorative markers/value labels are silent.

Overall result:
Notes or issues:
Workbook updated:
