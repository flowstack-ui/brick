# TagsInput manual protocol

Not performed. Record platform, browser, screen reader, zoom, reviewer and date.

| Environment | Recorded value |
| --- | --- |
| Browser and version | Not performed |
| Operating system | Not performed |
| Viewport and zoom | Not performed |
| Assistive technology | Not performed |
| Playground route | `/tags-input` |

Use `pass`, `fail`, `blocked`, or `not applicable` for each recorded check.

Scenario order: tags-input.basic; tags-input.controlled; tags-input.editing;
tags-input.paste; tags-input.validation; tags-input.limits; tags-input.states;
tags-input.tones; tags-input.forms; tags-input.suggestions; tags-input.recipes;
tags-input.translations.

1. Basic: add/remove with keyboard and touch, inspect focus recovery and announcements.
2. Controlled: change collection/draft separately; two controller additions retain both.
3. Editing: keyboard/double-click, failed edit, empty deletion, Escape and blur cancel.
4. Paste: physical clipboard with delimiters; entire invalid batch stays as draft.
5. Validation: normalize case and reject duplicate/domain failures.
6. Limits: count, length, overflow invalid paint and no cropped values.
7. States: disabled item navigation, readonly, required focus and disabled submission.
8. Tones: light/dark contrast, custom content, target spacing and focus rings.
9. Forms: JSON submission, reset, external association and required collection validation.
10. Suggestions: physical keyboard/touch selection, nested Dialog, two Escape layers,
    empty/loading, rejected suggestion draft and portalled outside behavior.
11. Recipes: all seven sizes, three variants, shapes, actual 200/400% zoom,
    narrow wrapping, forced colors and reduced motion; no overlapping targets.
12. Translations: real Japanese/Chinese IME, Arabic RTL caret/navigation, localized
    spoken feedback and errors.

For every step record pass/fail/blocked, evidence and unresolved issue. Do not
mark physical testing complete based on browser emulation.

## Step 1 — Focus presentation qualification

Action: Keyboard-focus every tags-input action or owned focus part, including
first and last items where relevant. Repeat in light/dark, RTL, OS high
contrast and actual 200%/400% zoom. Check selected/loading states where
supported and rounded or scrolling boundaries.

Expected: Visible focus without layout shifts or clipped edges. Inside
actions use paired foreground paint; field focus survives without shadows
in high contrast. Selection and focus remain distinguishable. Browser
emulation does not replace OS or assistive-technology checks.

Result: not run for this manual protocol revision.
Notes or issue:

## Completion

Overall result: Not performed.
Follow-up issues: Physical IME, screen reader, touch, clipboard and zoom checks.
Workbook updated: Manual gates remain open.
