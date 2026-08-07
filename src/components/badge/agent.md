# Badge agent guide

## Purpose

Present a short passive category, status, or metadata label with a complete Brick visual recipe.

## Use when

- A short non-interactive label needs a bounded visual treatment that remains understandable in its surrounding content.

## Choose something else when

- The element performs an action, changes state, announces a live update, or displays a count attached to another element. Use Button, an appropriate control, a live-status pattern, or NotificationBadge.

## Required composition

- Place the short label directly in Badge; when an icon or separately styled Text is necessary, keep those children passive and let Badge own their spacing and foreground.

## Rules

- **MUST:** Keep Badge passive; do not add click, press, selection, or disclosure behavior to it.
- **MUST:** When composing Text inside Badge, use tone=inherit unless that Text intentionally communicates a separate semantic tone, so the Badge recipe continues to own foreground contrast.
- **MUST:** Rely on Badge's gap for an icon and label instead of literal whitespace, wrapper margins, or positional offsets.
- **MUST:** Keep the label short and do not use Badge as a container for explanatory prose.
- **MUST:** Load styles.css or core.css plus badge.css.

## Common mistakes

- **Avoid:** Nesting default-tone Text in a Badge, manually spacing an icon and label, or using Badge as an eyebrow solely for uppercase styling. **Instead:** Use plain Badge text when possible, tone=inherit for nested Text, Badge's own gap for children, and Text variant=eyebrow for a short editorial heading introduction.

## Validation checklist

- Check label brevity, passive semantics, child spacing, foreground contrast for every variant and tone, zoom, forced colors, and RTL.
- Confirm nested Text inherits the Badge foreground and CSS is loaded.

## Related guidance

- `text`
- `icon`
- `notification-badge`
- `button`
