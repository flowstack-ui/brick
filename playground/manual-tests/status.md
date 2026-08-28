# Status manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Status |
| Version or commit | Unreleased 0.1.9 |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/status` |

Scenario order: `01 Overview`, `02 Tones`, `03 Sizes`, `04 Composition`,
`05 Semantics`, `06 Theme`, `07 Stress`

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Overview, tones, and sizes

Setup: Open `/status` in system appearance.

Action: Compare every tone and size, including neutral, informational,
positive, warning, and negative examples.

Expected: Indicator and label remain aligned and readable. The label, not the
dot or color alone, communicates the state. Size changes preserve that
relationship without turning Status into an action.

Result:
Notes or issue:

## Step 2 — Composition and semantics

Setup: Open `04 Composition` and `05 Semantics`.

Action: Inspect Root, Indicator, and Label in accessibility tools, then compare
the passive example with the explicitly application-authored live-status
example.

Expected: Indicator is decorative and hidden from assistive technology. Root
adds no live-region role by default. An application can deliberately add
`role="status"` only when the content is a genuine asynchronous update. An
indicator-only composition is allowed only when adjacent or hidden text already
communicates the same state; the dot remains decorative.

Result:
Notes or issue:

## Step 3 — Theme and system preferences

Setup: Open `06 Theme` and `07 Stress`; switch system, light, and dark
appearance, then enable forced colors and reduced motion.

Action: Inspect every tone and focus any interactive content placed alongside
Status.

Expected: Text and indicator remain distinguishable in every appearance and
forced-colors mode. Status adds no animation and never obscures adjacent focus.

Result:
Notes or issue:

## Step 4 — Reflow, localization, and RTL

Setup: Use 320 px, 200% text, and 400% zoom, then enable RTL.

Action: Inspect short and long localized labels in wrapping containers.

Expected: Labels wrap naturally without clipping or horizontal page overflow;
indicator stays aligned with the first line and logical ordering follows RTL.

Result:
Notes or issue:

## Step 5 — Assistive technology

Setup: Enable the recorded screen reader.

Action: Navigate passive Status examples and the deliberate live-status
example.

Expected: Passive labels are read once in document order with no unsolicited
announcement. Only the explicitly live example follows its application-owned
announcement policy.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:

Mark unavailable physical or assistive-technology environments `blocked`.
