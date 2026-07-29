# Skip Link manual test

Use `pass`, `fail`, `blocked`, or `not applicable` for every result. Do not
infer a human result from automated evidence.

| Environment | Value |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Input methods | |
| Playground route | `/skip-link` |
| Date | |
| Tester | |

Scenario order:

1. Overview
2. Focus and activation
3. Target and rendered output
4. Native behavior and failure paths
5. Composition, props, and refs
6. Sticky application chrome
7. Appearance and customization
8. Responsive, localization, and RTL

## Protocol

1. Reload `/skip-link/fixture`, press Tab once, and confirm Skip Link is the
   first focus target, becomes highly visible, is not obscured, and has clear
   wording and focus paint.

   Result:

2. Activate the fixture Skip Link. Confirm visible and assistive-technology
   focus moves to “Fixture main content”, the repeated navigation is bypassed,
   and the next Tab reaches “First main-content link”.

   Result:

3. Review every `/skip-link` scenario without activating its links. Confirm
   unfocused Roots create no visible artifact, empty gap, page overflow, or
   accidental pointer target.

   Result:

4. Focus the default, prevented, native-only, missing-target, render, and
   asChild examples. Confirm each appears immediately; prevented activation
   stays on the link; the other paths match their authored status and target.

   Result:

5. Focus the sticky-chrome example and confirm it is fully visible above the
   sticky navigation without sharp clipping, collision, or motion.

   Result:

6. Inspect light, dark, and customized examples. Confirm badges remain compact,
   each example has its own padded container, and the customized example has a
   badge, title, description, exact code, and unchanged behavior.

   Result:

7. At 200% and 400% zoom and a narrow viewport, reveal the long English and
   Arabic labels. Confirm wrapping, text, focus ring, and logical insets remain
   fully visible without horizontal page scrolling.

   Result:

8. With a real RTL locale/direction, confirm the Arabic link reveals at logical
   inline-start and the English link remains at its own logical inline-start.

   Result:

9. In Windows High Contrast or an equivalent forced-colors environment,
   confirm link text, border, surface, and focus indication remain distinct.

   Result:

10. With VoiceOver, NVDA, or another available screen reader, confirm Root is
    announced as a link with its authored name and activation announces or
    places the virtual cursor/focus at the intended main region.

    Result:

11. On a real mobile device with an external keyboard or platform switch/access
    navigation, confirm the link can be reached, revealed, activated, and
    followed by the first main-content control without being hidden by browser
    or application chrome.

    Result:

## Completion

Overall result:

Follow-up issues:

Workbook updated:

