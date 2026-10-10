# Combobox Manual Test Protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

Status: Unrun

| Environment | Record before testing |
| --- | --- |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/combobox` |

Scenario order: `01 combobox.overview` → `02 combobox.anatomy` → `03 combobox.recipes` → `04 combobox.sizing` → `05 combobox.filtering` → `06 combobox.behavior` → `07 combobox.states` → `08 combobox.appearance` → `09 combobox.stress`.

Use `?qualification=1` for this preserved scenario sequence; review the ordinary documentation examples separately.
| Mobile URL | Use the LAN URL printed by `npm run dev:playground:network` |

Default route: focused feature examples with Usage, Examples and Props TOC.
The original nine scenario fixtures remain at `/combobox?qualification=1`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every Result. Record reviewer, date, commit/version, and an issue for failures.

## Step 1: Visual hierarchy and recipes

Scan the focused examples and qualification fixtures at 100% zoom. Expect aligned
controls, compact option rows and recipe-specific styling. The control uses the
shared seven-size scale; option minimum heights are 24/24/28/32/36/40/56px.

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

## Added parity checks (manual status: Unrun)

- Multiple: select/remove Chips, required submission and native reset; announce
  selected options and the multiple listbox without moving focus off the input.
- Controller: preserve controlled refusal; reset defaults; rehydrate labels.
- Opening: click, focus, query threshold and arrow-key policies independently.
- Input behavior: first-match highlight, keyboard completion, preserved query.
- Virtualization: Home/End and arrows reach offscreen rows with valid active IDs.
- Links: pointer/keyboard activation, disabled links, custom host refs.
- Dialog: fixed popup remains reachable while scrolling, with safe dismissal.
- Motion: rapid open/close, exit content inert, reduced-motion preferences.
- Creatable and optional Hook Form: stable values, errors, focus and reset.

Overall result:

Follow-up issues:

Workbook updated:

## Form surface comparison

- Compare outline and surface on light/dark canvas and raised parents: outline stays transparent; surface owns its neutral fill without adding a shadow.
- Hover, focus, disable and mark invalid; preserve visible boundaries and explicit state treatment. Compare matched size recipes including their outer borders.
- Check narrow/RTL containment and forced colors. Popup panels and selection marks must retain their independent paint.
