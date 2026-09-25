# Format Number manual-test protocol

| Run information | Value |
| --- | --- |
| Component | Format Number |
| Version or commit | Unreleased |
| Reviewer | |
| Date | |
| Browser and version | |
| Operating system | |
| Viewport and zoom | |
| Assistive technology | |
| Playground route | `/format-number` |

Use `pass`, `fail`, `blocked`, or `not applicable` for every result.

Scenario order: 01 format-number.formats; 02 format-number.units; 03 format-number.locales; 04 format-number.values.

## Step 1 — Formats

Confirm currency, percentage, and compact output match the active locale and inherit surrounding typography.

Result:
Notes or issue:

## Step 2 — Accessibility and stress

Confirm long localized output wraps without clipping at mobile widths and 400% zoom; light and dark appearance, forced-colors, RTL, keyboard use, and accessibility remain correct.

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
