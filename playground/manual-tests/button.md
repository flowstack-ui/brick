# Button manual-test protocol

Component: Button
Version or commit: Unreleased 0.1.0
Reviewer: Project owner
Date: 2026-07-16
Playground route: `/button`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview and hierarchy

Setup: Open `/button` at 390 × 844 with system appearance.

Action: Inspect Overview, Variants, and Tones.

Expected: Default action is highest emphasis; variants form a clear hierarchy;
status tones retain the same anatomy; nothing scrolls horizontally.

Result: pass
Notes or issue: Mobile hierarchy and horizontal reflow passed. Shape and width examples were clarified during review.

## Step 2 — Keyboard and focus

Setup: Reload the route.

Action: Tab through the page and activate representative actions with Enter and Space.

Expected: Focus order is logical, every focus ring is obvious, links use native
link activation, buttons use native button activation, and the counter changes once.

Result: pass
Notes or issue: Enter and Space activate the action once. Active links retain native Enter activation; Space scrolls without navigation. The inactive anchor remains focusable and cannot navigate.

## Step 3 — Pointer, touch, and target comfort

Setup: Review once with mouse and once with touch emulation.

Action: Hover, press, and tap each variant and representative size.

Expected: Hover appears only for mouse capability, pressed feedback remains,
touch does not retain false hover, and md or larger targets feel comfortable.

Result: pass
Notes or issue: Real-phone touch review passed for representative variants and sizes without retained hover or pressed state.

## Step 4 — Disabled and loading

Setup: Find Content and states.

Action: Try Disabled and Saving changes, then focus the loading Button.

Expected: Neither activates; loading stays focusable, preserves its dimensions
and accessible name, and shows one centered spinner.

Result: pass
Notes or issue: Disabled is skipped by normal tab order. Loading remains focusable with one centered spinner and stable dimensions.

## Step 5 — Native forms

Setup: Find the Project name form.

Action: Edit, submit, edit again, and reset.

Expected: Submit follows native behavior without navigation, Reset restores the
initial value, and normal Buttons do not accidentally submit.

Result: pass
Notes or issue: Submit increments once without navigation; Reset restores the initial field value.

## Step 6 — Links and composition

Setup: Find Links and composition.

Action: Inspect and activate all four examples with pointer and keyboard.

Expected: Native, composed, and rendered links remain links. Inactive anchor has
no destination and never navigates. No path becomes an ARIA button unexpectedly.

Result: pass
Notes or issue: Native, composed, and rendered anchors navigate as links. The inactive anchor has no live destination.

## Step 7 — Appearance and contrast

Setup: Switch light, dark, and system, then inspect both scoped panels.

Action: Review solid tones and representative soft, outline, focus, disabled,
and loading states.

Expected: Labels remain readable, hierarchy stays consistent, scoped appearance
is local, and every state retains its boundary and focus.

Result: pass
Notes or issue: Light, dark, system, and both scoped panels passed. Appearance-control spacing was improved during review.

## Step 8 — Forced colors and reduced motion

Setup: Enable each preference in a separate run.

Action: Focus and activate representative Buttons and inspect loading.

Expected: System colors preserve text, boundary, state, and focus. Reduced
motion removes transition timing and slows loading motion without hiding status.

Result: pass
Notes or issue: Reduced motion removes the subtle color transitions and slows the loading spinner without hiding status. Forced colors was not applicable on the macOS/iPhone review environment and remains a later Windows check.

## Step 9 — Reflow and localization

Setup: Use 200% and 400% zoom at constrained width.

Action: Inspect every section, especially the long full-width label.

Expected: Labels wrap, Buttons grow, content remains operable, and there is no
two-dimensional scrolling or lost content.

Result: pass
Notes or issue: Passed at 200% and 400% after correcting Button border-box sizing, intrinsic shrinking, playground grid containment, and narrow-column wrapping. No horizontal scrolling or clipped stress content remains.

## Step 10 — RTL and icon order

Setup: Find the RTL phone frame and the start/end icon examples.

Action: Inspect and focus each Button.

Expected: Logical spacing and icon order follow direction. Decorative icons add
no announced text.

Result: pass
Notes or issue: Logical icon order passed. The RTL example now supplies the appropriate left-pointing directional arrow explicitly.

## Step 11 — Customization hooks

Setup: Find Appearance and customization.

Action: Inspect token, class, style, and custom-slot examples in DevTools.

Expected: Overrides stay local, `.brick-button` remains, the custom slot does not
break styles, and visual attributes match their props.

Result: pass
Notes or issue: Token, class, style, and slot examples remain local and preserve interaction and appearance behavior.

## Step 12 — Screen-reader spot check

Setup: Enable the selected screen reader.

Action: Navigate overview, loading, disabled, link, and form examples.

Expected: Names, roles, busy and unavailable states match intent; decorative
content is silent; live press feedback announces without moving focus.

Result: pass
Notes or issue: Names, roles, unavailable/busy states, decorative icons, and focus retention passed with VoiceOver. The press notification now uses one atomic status region and announces once.

## Completion

Overall result: pass
Follow-up issues: A real-Windows High Contrast review remains useful optional
compatibility evidence. The reviewed Chromium forced-colors baseline,
functional forced-colors checks, and full desktop/mobile browser matrix pass.
Workbook updated: yes
