# Text agent guide

## Purpose

Apply Brick typography roles, sizes, tones, weight, alignment, and wrapping while preserving the chosen semantic text element.

## Use when

- Interface copy needs Brick typography, including headings, paragraphs, short editorial eyebrows, captions, metadata, or inline text.

## Choose something else when

- A component such as Button, Link, Field.Label, Card.Title, or Badge already owns the text role. Use that component's named text part.

## Required composition

- Choose the semantic element first, then select the closest Brick text role, size, and tone; use Stack for text layout rather than wrapper spans.

## Rules

- **MUST:** Do not choose heading or paragraph semantics solely from the desired font size.
- **MUST:** Use Text for standalone styled interface copy instead of native spans plus duplicate typography CSS.
- **MUST:** Preserve readable body sizing, line height, measure, contrast, and user font scaling.
- **MUST:** Reserve variant=eyebrow for short labels that introduce a nearby heading; do not select it merely to make unrelated copy smaller. Use body text for explanatory sentences and Badge for passive status or category content.
- **MUST:** Use tone=inherit when Text is intentionally composed inside a parent such as Badge that owns the foreground and contrast relationship.
- **SHOULD:** Give separately meaningful inline peer labels compatible typography metrics and arrange them with HStack gap rather than literal spaces or manual positional offsets.
- **MUST:** Load styles.css or core.css plus text.css.

## Common mistakes

- **Avoid:** Using five spans to build brand text, selecting all-caps eyebrow styling for paragraph descriptions, allowing nested Text to override a parent's foreground, or aligning peer labels with literal whitespace. **Instead:** Use Text with semantic elements, reserve display treatments for their intended roles, inherit the owning foreground, and use HStack gap for layout between separate nodes.

## Validation checklist

- Check heading order, semantics, line length, wrapping, truncation, user font scaling, zoom, contrast, themes, and RTL.
- Confirm parent component text parts and foreground ownership are not bypassed, peer labels align without positional CSS, and CSS is loaded.

## Related guidance

- `stack`
- `link`
- `card`
- `field`
- `badge`
