# Float manual protocol

Status: pending manual execution. Automated tests are recorded separately.

| Run information | Value |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/float` |

Scenario order: Basic; Placement; Offsets; Avatar; Responsive; Inline anchor; Composition.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

1. Open /float; compare all seven previews in light/dark with Inter and Outfit.
2. Check nine placements, outward offsets, centered axes and sibling avatar badge.
3. Resize from 320px to desktop; confirm responsive movement and no unexpected page overflow.
4. Switch example direction to RTL; start/end must mirror without moving the docs shell.
5. Tab to Edit project: focus is visible, action works and no nested controls exist.
6. At real browser zoom 200% and 400%, verify labels, targets and intentional overhang.
7. On a physical touch device check action reachability; with a screen reader verify target/name order and no duplicate announcement.
8. Inspect forced colors and reduced motion; children retain their own semantics and appearance.

Do not mark unavailable manual/device environments as passed.

## Completion

Overall result: pending
Follow-up issues: physical-device, real zoom and screen-reader checks unperformed.
Workbook updated: pending qualification.
