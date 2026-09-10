# Timeline manual protocol

| Run information | Value |
| --- | --- |
| Component | Timeline |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/timeline` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order:

1. timeline.basic — list reading order and authored descriptions.
2. timeline.sizes — marker 16/20/24/32px and coordinated text.
3. timeline.recipes — all variants, semantic tone overrides, visible dark borders.
4. timeline.indicators — icon/avatar/number containment.
5. timeline.sides — logical before/after placement.
6. timeline.alternating — shared axis, DOM chronology and unequal text.
7. timeline.rich — keyboard actions in Content only.
8. timeline.time — authored timestamp announcement.
9. timeline.last — final hidden/continued/single/empty behavior.
10. timeline.surfaces — stretched connectors and nested recipe isolation.
11. timeline.appearance — light/dark RTL and narrow containment.

## Manual checks

At 200% and 400% browser zoom, verify no clipped text/markers or page overflow.
Use a screen reader to confirm ol/li chronology and that decorative artwork is
not announced. Tab to the rich-content link/action; no connector receives focus.
Check physical touch, forced-colors and large system text. Change Theme radius:
markers stay circular and separator paint follows semantic borders.

## Latest run

Not performed. Automated browser and image evidence does not replace manual
screen-reader, actual browser zoom or physical-device qualification.

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
