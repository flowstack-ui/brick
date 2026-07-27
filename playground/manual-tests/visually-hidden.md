# Visually Hidden manual-test protocol

| Run information | Value |
| --- | --- |
| Version or commit |  |
| Browser and version |  |
| Operating system |  |
| Viewport and zoom |  |
| Physical device |  |
| Assistive technology |  |
| Playground route | `/visually-hidden` |

Scenario order: `01 Overview`, `02 Naming`, `03 Output`, `04 Composition`, `05 Native props`, `06 Stress`. Use `pass`, `fail`, `blocked`, or `not applicable`.

## 1 — Naming and output

Open `/visually-hidden`; review 01–03. Expected: hidden text never appears or changes layout; the Search action is announced as “Search projects”; the destructive action is announced as “Delete project permanently”; inspected HTML retains a span, Brick class/slot, and Atom inline hiding styles.

## 2 — Composition and native ownership

Review 04–05 and activate Inspect ref host. Expected: render produces `strong`, asChild produces `em`, neither becomes visible, native class/data/slot survive, and the ref status reads `SPAN`.

## 3 — Stress and assistive technology

Review 06 in light/dark, RTL, a phone viewport, 200% and 400% zoom, and forced colors. Navigate by buttons with a screen reader. Expected: long English and Arabic names are complete and unique, no hidden phrase is read alone, no visible footprint or horizontal overflow appears, and every action remains keyboard operable with visible focus.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
