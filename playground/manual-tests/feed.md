# Feed manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Feed |
| Version or commit | Unreleased 0.2.3 candidate; record exact archive digest |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/feed` |

Normal documentation: basic, variants, responsive density, divider strength,
rich content, keyboard, loading/empty/retry, logical positions, defaults, RTL.
Each example has matching source; Props and TOC are available on `/feed`.

Legacy qualification route: `/feed?qualification=1`.
Scenario order: `01 Overview`, `02 Anatomy and semantics`, `03 Variants`,
`04 Density`, `05 Dynamic state`, `06 Keyboard and focus`, `07 Rich
composition`, `08 Appearance`, `09 Customized`, `10 Responsive and RTL`.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Keyboard, focus, and visible positioning

Tab to an Item and use Page Up/Page Down from the article and an article-local
control. Confirm bounded movement, Control/Command Home/End exit, consumer
prevention, and visible nearest scrolling in both the page and bounded viewport.
Hide or make an intermediate article inert: navigation must skip it. Hidden,
disabled and inert outside controls must not trap Control/Command Home/End.
Textareas, inputs and editable content retain native editing keys. Nested feeds
must not cause the parent feed to navigate. Verify negative-tabIndex articles
remain available to programmatic article navigation.

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
Compare subtle and default divider strengths: both must preserve the same
geometry, while default provides a clearer internal boundary on compact trays.
Resize both directions across 30/48/64/80rem boundaries; recipes must reset.
Hide the first article and confirm the first visible article has no separator.
Apply a public padding token on an ancestor and confirm it reaches each Item.

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
