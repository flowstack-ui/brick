# Locale Provider manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Locale Provider |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/locale-provider` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: 01 locale-provider.inheritance; 02 locale-provider.nesting; 03 locale-provider.controls.

## Step 1 — Locale and direction

Confirm the Arabic specimen is RTL and uses Arabic locale separators without an extra provider host.

Result:
Notes or issue:

## Step 2 — Accessibility and stress

Confirm nested text remains readable at 400% zoom and mobile width; light and dark appearance, forced-colors, RTL, keyboard use, and accessibility remain correct; explicit labels override defaults and axe reports no violations.

Result:
Notes or issue:

## Expanded capabilities

Follow every numbered scenario above, including all labelled specimens.
Compare sizes independently of variants. Exercise any controlled reset, clear,
parent-state change or disabled example and confirm the displayed outcome.
Inspect the complete page in both appearances and at narrow width, not only its
first overview. Record any missing capability or unclear demonstration here.

Result:
Notes or issue:

## Completion

Overall result:
Follow-up issues:
Workbook updated:
## Internationalization parity follow-up

Not performed: physical-device, screen-reader, and actual browser zoom review.
Inspect the modern default route and the preserved ?qualification=1 route.
Verify native language/direction semantics, narrow containment, explicit locale
overrides, and light/dark text clarity. For NumberInput also inspect typed,
wheel, press-and-hold and scrubber paths, and distinguish disabled from read-only.
Do not mark these manual checks passed from automated results alone.
