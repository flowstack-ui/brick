# Format Byte agent guide

## Purpose

Render or return locale-aware bit and byte quantities with explicit scaling and unit presentation.

## Use when

- Storage, transfer, attachment, or payload sizes need localized units.

## Choose something else when

- The value is another measurement or a rate needing authored per-time wording. Use Format Number plus application-owned context.

## Required composition

- Place FormatByte inside Text and keep the source value numeric until render time.

## Rules

- **MUST:** Choose bit or byte and decimal or binary scaling explicitly when the domain requires it.
- **MUST:** Prefer LocaleProvider inheritance and use unitDisplay long when abbreviations would be ambiguous.
- **MUST:** Load styles.css or core.css plus format-byte.css.

## Common mistakes

- **Avoid:** Embedding a preformatted size string in Block content. **Instead:** Store the numeric quantity and format it at the application rendering boundary.

## Validation checklist

- Verify bit and byte modes, decimal and binary scaling, precision, localized long and short units, and SSR output.

## Related guidance

- `locale-provider`
- `format-number`
- `text`
