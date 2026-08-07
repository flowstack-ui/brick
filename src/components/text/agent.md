# Text agent guide

## Purpose

Apply Brick typography roles, sizes, tones, weight, alignment, and wrapping while preserving the chosen semantic text element.

## Use when

- Interface copy needs Brick typography, including headings, paragraphs, labels, captions, metadata, or inline text.

## Choose something else when

- A component such as Button, Link, Field.Label, Card.Title, or Badge already owns the text role. Use that component's named text part.

## Required composition

- Choose the semantic element first, then select the closest Brick text role, size, and tone; use Stack for text layout rather than wrapper spans.

## Rules

- **MUST:** Do not choose heading or paragraph semantics solely from the desired font size.
- **MUST:** Use Text for standalone styled interface copy instead of native spans plus duplicate typography CSS.
- **MUST:** Preserve readable body sizing, line height, measure, contrast, and user font scaling.
- **MUST:** Load styles.css or core.css plus text.css.

## Common mistakes

- **Avoid:** Using five spans to build brand text, selecting all-caps eyebrow styling for paragraph descriptions, or setting headings from appearance. **Instead:** Use Text with semantic elements and reserve display treatments for their intended short roles.

## Validation checklist

- Check heading order, semantics, line length, wrapping, truncation, user font scaling, zoom, contrast, themes, and RTL.
- Confirm parent component text parts are not bypassed and CSS is loaded.

## Related guidance

- `stack`
- `link`
- `card`
- `field`
- `badge`
