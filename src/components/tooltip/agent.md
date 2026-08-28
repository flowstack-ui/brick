# Tooltip agent guide

## Purpose

Present one brief supplemental description for an already named focusable or hoverable trigger while Atom owns timing, relationships, dismissal, presence, portal, and positioning.

## Use when

- An icon-only control, abbreviation, or unfamiliar compact trigger benefits from a short hint on hover and keyboard focus.

## Choose something else when

- The content is required, interactive, lengthy, or a preview with richer context. Use Visible text, Popover, or HoverCard according to the interface job.

## Required composition

- Compose Root > Trigger asChild around one already named focusable control plus Portal > Content, with optional Arrow. Use Title and Description only for short non-interactive rich content, and use Provider when a coherent region shares delay policy.

## Rules

- **MUST:** Keep Tooltip supplemental: the trigger retains its own complete accessible name and required instructions, warnings, errors, and recovery remain visible.
- **MUST:** Keep Content non-interactive and concise; use Popover or another owning component for links, buttons, fields, or lengthy help.
- **MUST:** Use Trigger, Portal, and Content with Root so Atom owns hover/focus relationships, Escape dismissal, presence, collision handling, and logical placement.
- **MUST:** When a local Appearance scope is intended, portal into that scope or apply Appearance to the portalled visual root; do not assume trigger ancestry crosses the portal.
- **MUST:** Load styles.css or core.css plus tooltip.css and every composed trigger component stylesheet.

## Common mistakes

- **Avoid:** Using Tooltip as an icon-only control's sole name, placing interactive help inside Content, or hand-positioning a text bubble. **Instead:** Name the trigger directly, keep the description supplemental and non-interactive, and use the complete Tooltip anatomy.

## Validation checklist

- Check hover and keyboard-focus discovery, trigger naming, generated description relationships, delay behavior, Escape and scroll dismissal, pointer travel, touch non-blocking behavior, collision placement, and focus stability.
- Verify concise wrapping, light/dark and nested appearance, forced colors, reduced motion, RTL, portal behavior, and complete CSS delivery.

## Related guidance

- `icon-button`
- `hover-card`
- `popover`
- `appearance`
