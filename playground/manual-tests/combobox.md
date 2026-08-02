# Combobox Manual Test Protocol

Status: Unrun

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/combobox` |
| Mobile URL | Use the LAN URL printed by `npm run dev:playground:network` |

Scenario order: Overview; Anatomy and semantics; Variants; Sizes and shapes; Filtering and empty state; Selection, clearing, and free text; Disabled, read-only, and loading; Appearance and customization; Responsive, RTL, keyboard, and touch.

Use `pass`, `fail`, `blocked`, or `not applicable` for every Result. Record reviewer, date, commit/version, and an issue for failures.

## Step 1: Visual hierarchy and recipes

Scan 01–09 at 100% zoom. Expect aligned controls, compact appearance badges, no abnormal gap between 08 and 09, no sticky navigation overlap, and each named recipe to change only its documented dimension. Confirm `sm`, `md`, and `lg` controls and option rows match at 36px, 44px, and 52px minimum heights.

Result:

## Step 2: Filtering, keyboard, and focus

Type to filter; confirm non-matches disappear; use Arrow keys, Home, End, Enter, Escape, and Tab. Click the chevron and expect it to toggle the popup. On a phone with the virtual keyboard open, expect this path to focus and reveal the input just as tapping the input does. Expect enabled-option navigation, one selected value, safe dismissal, visible focus, and no focus trap.

Result:

## Step 3: Pointer, touch, and positioning

Select and clear by pointer. Confirm the popup is at least as wide as the whole visible control. On real touch hardware, open near the viewport edge and with the keyboard visible; scroll the page and list, confirm collision flipping keeps all options reachable, the popup does not paint over the sticky playground navigation, a drag does not dismiss, and an outside tap dismisses only after release.

Result:

## Step 4: Semantics and assistive technology

With VoiceOver, confirm Field label/error relationships, combobox expanded state, active option, selected option, disabled/read-only/invalid state, empty/loading messages, named disclosure button, and decorative artwork are announced appropriately.

Result:

## Step 5: Appearance, responsive, and localization

Check light/dark, forced colors, reduced motion, 320px, 200%/400% zoom, long content, and Arabic RTL. Expect reachable content, logical indicator placement, visible state distinctions, and no page overflow.

Result:

## Completion

Overall result:

Follow-up issues:

Workbook updated:
