# Stat manual-test protocol

Status: not run. Record reviewer, package identity, date, browser, device and zoom.

| Run information | Value |
| --- | --- |
| Component | Stat |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/stat` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order:

1. stat.basic
2. stat.sizes
3. stat.formats
4. stat.locales
5. stat.units
6. stat.trends
7. stat.icons
8. stat.support
9. stat.group
10. stat.values
11. stat.appearance

## Review

1. Read label/value/comparison with a screen reader; no duplicate arrow announcement.
2. Compare three sizes and unit baselines with the reference under matched font settings.
3. Inspect currency, compact, percent, byte and locale examples; no clipped signs/units.
4. Inspect reversed and neutral trends: wording must convey direction without color.
5. Inspect grouping, explicit size override, narrow RTL, dark and forced-color states.
6. Review actual 200/400% zoom and physical touch for composed tooltip controls.
7. Confirm skeleton/unavailable/zero do not imply the same data state.

Every result remains not run until recorded; automated browser evidence is separate.

Reviewer:
Date:
Package identity:
Browser/device/assistive technology:
Result:
Notes or issue:
Overall result:

## Completion

Follow-up issues:
Workbook updated:
