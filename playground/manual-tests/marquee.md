# Marquee manual protocol

Status: pending manual verification. Automated tests are not a manual pass.

| Environment | Value |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/marquee` |

Use `pass`, `fail`, `blocked`, or `not applicable` for recorded step results.

Scenario order:
1. marquee.basic
2. marquee.directions
3. marquee.vertical
4. marquee.timing
5. marquee.fill
6. marquee.pause
7. marquee.store
8. marquee.finite
9. marquee.edges
10. marquee.lanes
11. marquee.art
12. marquee.news
13. marquee.cards
14. marquee.preferences
15. marquee.boundaries
16. marquee.safety

## Accessibility review

Review light/dark, RTL, reduced motion and forced-colors environments.

1. Open all 16 /marquee scenarios, light/dark and narrow layouts.
2. Confirm seamless start/end/top/bottom/reverse movement and RTL text order.
3. Pause using keyboard and touch; leaving hover must not undo requested pause.
4. Focus each news link. Motion stops, originals become visible and focus does not jump.
5. Enable system reduced motion. Scroll to every original; copies and fades are absent.
6. Confirm a screen reader encounters each original only once, with a named region and no repeating live announcements.
7. Run finite completion, restart, resize, hidden reveal and content replacement.
8. Check high contrast, actual 200%/400% zoom and physical touch scrolling.
9. Confirm nested/multiple lanes pause independently; unsafe replicas remain stationary.

Record browser, OS, assistive technology, result and any defect. Do not mark Tested=yes until the whole protocol passes.

## Completion

Overall result:
Follow-up issues:
Workbook updated:
