# Feed manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Feed |
| Version or commit | Unreleased 0.1.0 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/feed` |

Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Variants`,
`04 Density`, `05 Dynamic state`, `06 Keyboard and focus`, `07 Rich
composition`, `08 Appearance`, `09 Customized`, `10 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Keyboard, focus, and visible positioning

Tab to an Item and use Page Up/Page Down from the article and an article-local
control. Confirm bounded movement, Control/Command Home/End exit, consumer
prevention, and visible nearest scrolling in both the page and bounded viewport.

Result:
Notes or issue:

## Step 2 — Semantics and assistive technology

Confirm a screen reader announces the Feed name, useful Item names and
descriptions, positions, known/unknown totals, and busy updates. Compare APG
support with NVDA, macOS/iOS VoiceOver, and Android TalkBack without assuming
identical announcement phrasing.

Result:
Notes or issue:

## Step 3 — Dynamic and rich application composition

Prepend, append, and remove articles; toggle busy and known/unknown totals; and
operate article-local links and buttons. Confirm focus remains stable when the
focused Item stays mounted and application-owned status copy stays adjacent.

Result:
Notes or issue:

## Step 4 — Appearance, customization, and focus ownership

Inspect plain/divided/outline, compact/comfortable, Item focus, descendant
focus, light/dark scopes, and the token override. Confirm no Item hover or
whole-row action affordance and no background escapes rounded outline Items.

Result:
Notes or issue:

## Step 5 — Reflow, direction, preferences, and touch

At 320 CSS px and 200/400% zoom, confirm long content and actions wrap without
page-level overflow or clipped focus. Confirm genuine RTL content reverses
metadata/actions, forced colors retain boundaries/focus, reduced motion removes
the focus transition, and the page remains reachable with a mobile keyboard.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
