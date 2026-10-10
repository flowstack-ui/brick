# File Upload manual-test protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

## Dropzone and filename-row regression

- Clicking the default dropzone background opens the picker once; clicking its
  nested Browse action also opens it once, not twice.
- With `disableClick`, the background neither opens the picker nor gains clickable
  hover paint. The nested Browse action and file-drag feedback still work.
- In Input appearance, Clear stays on one line at desktop and narrow widths,
  including after a long filename is selected. Clearing restores the fallback.

| Run information | Value |
| --- | --- |
| Component | File Upload |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/file-upload` |
| Qualification route(s) | `/file-upload` (docs); `/file-upload?qualification=1` (matrix) |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes and shapes`, `04 Acceptance and limits`, `05 States`, `06 File content`, `07 Form and Field`, `08 Appearance and customization`, `09 Responsive and RTL`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## New capability qualification

Verify camera capture on a physical mobile device, native folder selection and nested
directory dropping, paste from a real clipboard, preview cleanup after navigation,
screen-reader naming for custom Button/IconButton actions, and actual browser zoom.
Verify asynchronous preparation can be cleared/reset without restoring stale files.
These are manual gates; an automated browser profile is not physical-device evidence.

## Step 1 — Picker, drag, validation, and removal
Setup: Review 01–06 with representative accepted and rejected files. Action: Open the native picker, select one and multiple files, drag acceptable and unacceptable files, then remove selected files. Expected: Feedback is stable before and after drop, rejected feedback is distinct from field invalidity, file metadata remains readable, and removal has an understandable focus target. Result:
Notes or issue:

## Step 2 — Field, form, and state composition
Setup: Review 05–07. Action: Operate disabled, read-only, required, invalid, submit, and reset examples. Expected: One label names the upload, validation focuses the visible trigger, reset clears files and inline error state, and unavailable actions remain understandable. Result:
Notes or issue:

## Step 3 — Appearance, reflow, direction, and preferences
Setup: Review 08–09 in light, dark, forced colors, reduced motion, 200%, 400%, mobile, and RTL. Action: Repeat selection and removal while comparing boundaries and focus. Expected: Badges remain compact, each example has its own padded surface, content stays contained, RTL visibly mirrors action placement, and no sticky navigation obscures evidence. Result:
Notes or issue:

## Step 4 — Physical touch and assistive technology
Setup: Use the recorded physical device and screen reader. Action: Select and remove files, submit the empty required field, and review status announcements. Expected: Touch targets are comfortable; label, action, constraints, selected files, invalid state, and removal actions are announced once and in a useful order. Result:
Notes or issue:

## Completion
Overall result:
Follow-up issues:
Workbook updated:
Yes — the recalculated File Upload sheet records 27 of 28 requirements resolved; this human protocol is the sole open row.

## Form surface comparison

- Compare outline and surface on light/dark canvas and raised parents: outline stays transparent; surface owns its neutral fill without adding a shadow.
- Hover, focus, disable and mark invalid; preserve visible boundaries and explicit state treatment. Compare matched size recipes including their outer borders.
- Check narrow/RTL containment and forced colors. Popup panels and selection marks must retain their independent paint.
