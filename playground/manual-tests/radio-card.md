# Radio Card manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Radio Card |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Physical device | |
| Assistive technology | |
| Playground route | `/radio-card` |

Scenario order: Basic, Sizes, Variants, Tones, States, Addon, No Indicator,
Controlled, Controller, Attached, Custom Indicator, Responsive, Form, Alignment.
Use `/radio-card?qualification=1` for the numbered qualification surface.

The native input is the radio; Item is a label. Confirm the option name excludes
description/addon metadata, which remains separately discoverable. Check read-only
focus without value changes, one notification per click and external-form ownership.
Review subtle/surface without an outline inset, responsive variable resets and
attached corners in both appearances. Actual zoom, screen reader and physical
device results remain blank until performed.

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

## Step 1 — Selection and semantics

Tab into each group and use arrows, Home, End, and Space. Confirm one named
radiogroup, one roving Tab stop, complete option names, checked state, disabled
and read-only behavior, required/invalid reporting, and correct form reset.
Result:
Notes or issue:

## Step 2 — Recipes and authored content

Inspect every size and variant, leading and trailing indicators, custom
indicator content, and addons. Confirm the whole card activates, rich content
does not create another control, and checked, hover, focus, invalid, disabled,
and read-only states remain distinct. Confirm horizontal Control anatomy is the
default, vertical orientation stacks Control content, and the checked outline
indicator is an accent disc with a contrasting dot.
Result:
Notes or issue:

## Step 3 — Reflow and preferences

Inspect light/dark appearance, long localization, 200% text, 400% zoom, narrow
width, touch, RTL, forced colors, and reduced motion. Confirm no horizontal page
scroll, complete target geometry, logical alignment, and visible card, selected,
and focus boundaries.
Result:
Notes or issue:

## Step 4 — Assistive technology

Navigate and select every option with the recorded screen reader. Confirm the
group name, option name, position, checked state, help/error relationships, and
unavailable state are announced once.
Result:
Notes or issue:

## Completion

Overall result:

Follow-up issues:

Workbook updated:
