# Timeline agent guide

## Purpose

Present a static ordered chronology with connected event markers.

## Use when

- Authored events need a chronological visual connection.

## Choose something else when

- Users navigate progress or workflow stages. Use Steps.
- Content is a live activity stream. Use Feed.

## Required composition

- Compose direct Root > Item > Connector and Content; Connector contains Indicator and Separator.
- Use For for data collections and authored time elements for localized timestamps.

## Rules

- **MUST:** Preserve native ol/li order. Decorative Connector and Indicator cannot contain interactive controls; repeat status in Content.
- **MUST:** Use Content side before or after for logical placement; do not add empty content wrappers or page-colored connector masks.
- **MUST:** Load styles.css or core.css plus timeline.css and styles for composed owners.

## Common mistakes

- **Avoid:** Using Timeline as an interactive stepper. **Instead:** Use Steps for current-step state and navigation.
- **Avoid:** Adding custom CSS to stretch markers or draw connector lines. **Instead:** Use the component's Indicator geometry and Separator anatomy.

## Validation checklist

- Check marker squares, stretched separators, final-line policy, rich content, reading order, narrow width, RTL, forced colors and nested surfaces.

## Related guidance

- `steps`
- `feed`
- `list`
- `avatar`
- `icon`
- `for`
