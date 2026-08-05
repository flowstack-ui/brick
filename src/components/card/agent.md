# Card agent guide

## Purpose

Group content about one subject in a finished static compound surface with header, content, and footer anatomy.

## Use when

- A bounded subject needs a title, supporting content, and optional actions as one visual unit.

## Choose something else when

- Only generic background, border, radius, or elevation is needed. Use Surface.

## Required composition

- Compose Card.Root with only the Header, Title, Description, Content, and Footer parts the subject needs.

## Rules

- **MUST:** Do not turn the whole Card into an unnamed clickable div; place explicit Link or Button controls inside or use a valid link composition.
- **MUST:** Load styles.css or core.css plus card.css and styles for nested components.

## Common mistakes

- **Avoid:** Using Card for every spacing group. **Instead:** Use Stack or Surface when there is no bounded card subject.

## Validation checklist

- Check heading order and explicit action names.
- Check content flow, focus visibility, narrow widths, and appearance contrast.

## Related guidance

- `surface`
- `stack`
- `grid`
- `button`
- `link`
