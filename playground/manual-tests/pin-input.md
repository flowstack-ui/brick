# Pin Input manual-test protocol

## Disabled appearance regression

Compare individual and Fieldset-inherited disabled states in light/dark and
forced colors. Preserve variant paint, fade each visual boundary once, and
check the cursor over labels, editors, indicators and nested actions. Read-only
remains separate. Record physical-device and assistive checks independently.

| Run information | Value |
| --- | --- |
| Component | Pin Input |
| Version or commit | Unreleased local 0.2.3 candidate; no physical checks performed |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/pin-input` |

Scenario order: `01 Overview`, `02 Variants`, `03 Sizes and shapes`, `04 Layouts`, `05 Input behavior`, `06 States`, `07 Form and Field`, `08 Appearance and customization`, `09 Responsive and RTL`, `10 Character types and acceptance`, `11 Controller and sparse values`, `12 Focus, completion and platform policy`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Recipes, cells, and input behavior
Setup: Review 01–05. Action: Type, paste, erase, arrow between cells, complete masked and localized examples. Expected: Cells align, accepted characters advance predictably, paste distributes once, and focus remains visible. Result:
Notes or issue:

## Step 2 — States and form composition
Setup: Review 06–07. Action: Operate all states, submit empty, partial and complete values, then reset. Expected: One native value participates, required validates all positions using the first cell, and Field state reaches the field. Result:
Notes or issue:

## Step 3 — Theme, reflow, direction, and preferences
Setup: Review 08–09 in light, dark, forced colors, reduced motion, zoom, mobile, and RTL. Action: Repeat entry and paste. Expected: Every cell remains contained and logical without clipping or horizontal page overflow. Result:
Notes or issue:

## Step 4 — Assistive technology
Setup: Enable the recorded screen reader. Action: Navigate every cell and complete the code. Expected: Position-aware localized names, value, required, invalid, disabled, and read-only states are announced without duplicate group speech. Result:
Notes or issue:

## Completion
Before completion, use actual mobile OTP suggestions, native password masking,
physical IME composition and clipboard paste. Check selectOnFocus=false,
blurOnComplete, delayed autosubmit FormData, invalid paste, controlled refusal,
clear/fill/focus controller actions, dynamic length, and deletion of a middle
position. The on-screen platform note is not evidence that these manual checks
have passed. Record actual devices and any password-manager limitations.

Overall result:
Follow-up issues:
Workbook updated:

## Form surface comparison

- Compare outline and surface on light/dark canvas and raised parents: outline stays transparent; surface owns its neutral fill without adding a shadow.
- Hover, focus, disable and mark invalid; preserve visible boundaries and explicit state treatment. Compare matched size recipes including their outer borders.
- Check narrow/RTL containment and forced colors. Popup panels and selection marks must retain their independent paint.
# September 18 parity qualification additions

Use `/pin-input` for focused documentation and `/pin-input?qualification=1` for
the twelve retained scenarios. Check all seven recipes, neutral/accent focus,
invalid focus, responsive underline-to-filled restoration, attached runs in RTL,
and Hook Form focus recovery. Real SMS suggestions, screen readers, physical IME,
device input and 200–400% zoom remain unperformed until explicitly recorded.
