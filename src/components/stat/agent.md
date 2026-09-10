# Stat agent guide

## Purpose

Present a labeled metric with optional units and comparison text.

## Use when

- A read-only value needs a label, unit and contextual comparison.

## Choose something else when

- The value is editable. Use NumberInput.
- The metric needs a background. Use Card or Surface around Stat.

## Required composition

- Compose Root, Label, ValueText and optional HelpText; use FormatNumber or FormatByte inside ValueText.
- Use Group for shared size defaults; explicit Root size wins.

## Rules

- **MUST:** Preserve dl/dt/dd grammar; HelpText defaults to dd, not a direct span beneath dl.
- **MUST:** Keep calculation and messages application-owned; compose the existing locale and formatting helpers.
- **MUST:** Provide comparison wording and choose tone independently of arrow direction.
- **MUST:** Load styles.css or core.css plus stat.css and styles for composed components.

## Common mistakes

- **Avoid:** Using a heading solely to size a number. **Instead:** Use ValueText and the Stat size recipe.
- **Avoid:** Converting missing data to zero. **Instead:** Render an authored unavailable message.

## Validation checklist

- Check label/value reading order, unit baseline, wrapping, locales, narrow width, RTL, light/dark and forced colors.

## Related guidance

- `format-number`
- `format-byte`
- `card`
- `data-list`
