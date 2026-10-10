# Color Picker manual-test protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

| Run information | Value |
| --- | --- |
| Component | Color Picker |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/color-picker` |
| Qualification route(s) | `/color-picker?qualification=1`; documentation at `/color-picker` |

## Controller and lifecycle regression checks

- In Store, verify the external action updates the color.
- In Lifecycle, verify closing removes the panel from keyboard and screen-reader navigation.
- In Dialog, press Escape once and confirm only the picker closes and focus returns
  to its trigger. A second Escape may close the dialog.
- Verify channel labels with a screen reader and actual browser zoom and physical touch.

Scenario order: `01 Overview`, `02 Inline editor`, `03 Sizes and variants`, `04 Entry points`, `05 Formats`, `06 State`, `07 Swatches`, `08 Integration`, `09 Platform`, `10 States`, `11 Adaptation`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Area, channel, text, and preset synchronization

Expected: Area pointer/keyboard changes, hue and alpha sliders, text, channel inputs, and every named preset update one shared value. Swatch and ValueText remain synchronized, including alpha. TransparencyGrid is a stable white and light-neutral checker beneath the alpha gradient, not a replacement for it, and remains light in dark appearance. Translucent ValueSwatch and Swatch previews instead use an appearance-aware surface checker beneath Atom's represented color.

Result:
Notes or issue:

## Step 1a — Density and control geometry

Expected: All seven sizes remain distinct and usable. In each finished editor,
the format select, value input, and alpha input share one block size; every
slider thumb is centered above its track and remains fully visible at middle and
endpoint values; the 15rem 2xs/xs popup and 16rem default
editor contain their controls without clipping. A swatch-only Trigger is
square. The integrated input has one outer border with aligned inner parts and
local ghost-action hover. Its current-value preview stays compact (16px at
`xs`, 18px at `sm`) while selectable preset swatches retain their larger size.
Square, rounded, and circle swatch frames match their
swatches, and the frameless recipe has no visible frame while retaining focus
and selection cues. Area and channel color planes have no decorative hard
border; the track and transparency check share one subtle radius, and thumbs
use a white ring with the small Theme shadow rather than a hard dark outline.
Move alpha to zero and one. Expected: the thumb remains one opaque selected
color at both endpoints while its position, value text, and track communicate
the actual alpha.
Presets appear only in examples that explicitly own them.

Result:
Notes or issue:

## Step 2 — Formats, popup, keyboard, and focus

Expected: RGBA, HSLA, and HSBA switch without changing the represented color. Pointer and keyboard interaction visibly change the area and sliders. Trigger opens the Brick editor; EyeDropper opens only the native platform tool where supported. Tab reaches controls in order; arrows operate the area/sliders; Escape closes and restores focus; outside interaction dismisses without losing the committed value.

Result:
Notes or issue:

## Step 3 — Platform paths, forms, and states

Expected: Native chooser updates the shared value. EyeDropper is usable only where supported and remains a progressive enhancement; the ordinary editor or NativeInput remains available as the fallback. HiddenInput submits one current value and reset restores the default. Disabled prevents opening and mutation; read-only blocks mutating popup controls and remains inspectable when composed inline; invalid keeps a persistent danger boundary.

Result:
Notes or issue:

## Step 4 — Appearance, forced colors, and motion

Expected: Light and dark preserve text, area, tracks, thumb, inputs, popup, selected, hover, and focus contrast. Forced colors keeps system boundaries and a visible non-color selected cue. Reduced motion removes nonessential transitions.

Result:
Notes or issue:

## Step 5 — Reflow, zoom, RTL, and localization

Expected: At 320 px, 200% text, 400% zoom, and RTL, the page has no horizontal overflow; controls wrap without overlap; floating content remains reachable; long labels and preset names wrap.

Result:
Notes or issue:

## Step 6 — Assistive technology and devices

Expected: Label names the primary input, every channel and platform action has a clear name, presets announce names and checked state, the hidden value is not announced, and area/slider/preset targets remain usable on physical mobile hardware.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

## Form surface comparison

- Compare outline and surface on light/dark canvas and raised parents: outline stays transparent; surface owns its neutral fill without adding a shadow.
- Hover, focus, disable and mark invalid; preserve visible boundaries and explicit state treatment. Compare matched size recipes including their outer borders.
- Check narrow/RTL containment and forced colors. Popup panels and selection marks must retain their independent paint.
