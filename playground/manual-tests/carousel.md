# Carousel manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Carousel |
| Version or commit | |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/carousel` |

Scenario order: `01 carousel.overview` → `02 carousel.controls` → `03 carousel.rotation` → `04 carousel.appearance`.

Use `?qualification=1` for this preserved scenario sequence; review the ordinary documentation examples separately.

The normal route has source-paired feature examples. Legacy regression scenarios
remain available at `/carousel?qualification=1`. This protocol is unperformed
until a named reviewer records results below; automated emulation is separate.

Scenario order: basic, geometry, interaction, composition, preferences.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

## Step 1 — Controls and touch

Operate arrows and picker dots by pointer, keyboard, and touch swipe. Confirm one
snap page settles at a time, including multiple visible slides; visible peer links
remain usable and fully offscreen controls leave the tab order. Confirm labels
match destinations and the control-free example works with native scrolling.

Tab to the native Viewport at each rounded edge. Confirm its rounded indicator
appears above the active slide without being covered by media or cropped by
Viewport or parent clipping.

With looping enabled, advance from the last slide to the first and back from
the first to the last. Confirm the requested direction never reverses, only
the authored slides exist in the accessibility tree, and the silent boundary
reposition does not flash or announce a duplicate.

Result:
Notes or issue:

## Step 2 — Automatic rotation

Start rotation, then hover, focus inside, and use the stop control. Confirm rotation pauses for interaction, does not restart without explicit action after focus, and all direct controls remain available.

Confirm the compact rotation control is the first focusable carousel control.
For interaction-only arrows, confirm fine-pointer hover and keyboard focus
reveal them, touch interaction reveals them briefly, and picker visibility is
independent of arrow visibility.

Result:
Notes or issue:

## Step 3 — Reflow and preferences

Review light, dark, forced colors, reduced motion, RTL, 200%, 400%, and mobile. Confirm controls remain perceivable, slide content is not clipped, picker dots do not wrap incorrectly, and surrounding layout does not shift.

Give the Overview Carousel's immediate parent a fixed block size. Confirm
Root, Viewport, Track, and the active Slide fill it without making the page or
authored slide content viewport-sized.

Result:
Notes or issue:

## Step 4 — Assistive technology

With a screen reader, navigate the labelled carousel, visible slides, controls, and picker. Confirm fully offscreen content is not reachable, visible peer content remains reachable, and rotation announcements do not create repeated speech.

Result:
Notes or issue:

## Step 5 — New geometry, state and compositions

Check grouped movement, fractional peeking, padding and variable dimensions in
both axes and directions. Resize while moving, load late images/fonts, remove or
reorder the selected item, and interrupt motion rapidly. Confirm no blank frame,
diagonal movement, stale selection or recreated slide content. Short collections
that cannot loop seamlessly without duplication use an instant boundary reset;
review this explicitly rather than claiming identical motion for every layout.

Drag with mouse, cancel, leave the window, and click nested links/buttons. Confirm
only an actual drag suppresses the following click. Test native touch with page
scrolling on physical iPhone and Android. Check controlled acceptance/rejection,
external store commands, Dialog focus return, thumbnail names, localized labels,
and dynamically changing reduced-motion preferences.

Result:
Notes or issue:

## Completion record

Overall result:
Follow-up issues:
Workbook updated:
