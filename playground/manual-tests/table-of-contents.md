# TableOfContents manual protocol

Status: not run. Automated checks are not manual screen-reader or physical-device evidence.

| Run information | Value |
| --- | --- |
| Component | TableOfContents |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/table-of-contents` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Scenario order

Scenario order: table-of-contents.basic; table-of-contents.nested; table-of-contents.sizes; table-of-contents.variants; table-of-contents.indicator; table-of-contents.controlled; table-of-contents.disclosure; table-of-contents.dynamic; table-of-contents.rtl; table-of-contents.native; table-of-contents.empty.

1. table-of-contents.basic
2. table-of-contents.nested
3. table-of-contents.sizes
4. table-of-contents.variants
5. table-of-contents.indicator
6. table-of-contents.controlled
7. table-of-contents.disclosure
8. table-of-contents.dynamic
9. table-of-contents.rtl
10. table-of-contents.native
11. table-of-contents.empty

## Manual checks

1. Keyboard: tab through links, activate with Enter, verify destination focus and subsequent Tab order.
2. Native links: use modifier/middle clicks and browser back/forward. Verify no unexpected interception.
3. Scrolling: click distant/final sections, interrupt scrolling, remove a target and restore it.
4. Rail: scroll a long outline, focus a different link, then scroll the article; focus must not move.
5. Screen reader: verify named navigation/list hierarchy, exactly one current location and no noisy live announcements.
6. Appearance: inspect plain/line, sm/md, neutral/accent, current/hover/focus in light/dark and forced colors.
7. Reflow: use real 200% and 400% browser zoom, large text, long labels and RTL; verify no clipped focus or content.
8. Physical touch: activate links and scroll each independent region; verify comfortable targets and containment.
9. Reduced motion: change OS setting during navigation and verify motion stops without losing current state.

Record environment, date, result and defects for each numbered item before marking verified.

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable device or assistive-technology environments `blocked`.
