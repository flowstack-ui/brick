# ScrollArea agent guide

## Purpose

Style a bounded scroll viewport and scrollbar anatomy while preserving Atom and native input behavior.

## Use when

- A rail, code region, table wrapper, or bounded panel needs Brick scrollbar presentation and owned overflow behavior.

## Choose something else when

- Ordinary page or content overflow works with native browser scrolling. Use native overflow.

## Required composition

- Compose Viewport and the needed Scrollbar/Thumb parts inside Root, adding Corner for two-axis presentation; give the wrapper a real size constraint.

## Rules

- **MUST:** Provide a bounded size; ScrollArea cannot create meaningful scrolling without a constrained viewport.
- **MUST:** Preserve wheel, trackpad, touch, keyboard, focus, and nested page scrolling.
- **MUST:** Load styles.css or core.css plus scroll-area.css.

## Common mistakes

- **Avoid:** Using ScrollArea for every overflow or hiding clipped table content without horizontal scrolling. **Instead:** Use native overflow by default and add ScrollArea with explicit horizontal behavior where it improves the contract.

## Validation checklist

- Test both axes, mouse, trackpad, touch, keyboard, focus ring, nested scrolling, mobile tables, zoom, and RTL.
- Confirm the viewport constraint and CSS are loaded.

## Related guidance

- `table`
- `data-grid`
- `code-block`
- `sidebar`
