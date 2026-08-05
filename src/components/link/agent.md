# Link agent guide

## Purpose

Render finished native navigation as inline, standalone, or button-like content without changing its link semantics.

## Use when

- The user moves to a route, URL, document, download, email address, or telephone destination.

## Choose something else when

- The interaction changes current state without navigating. Use Button.

## Required composition

- Provide a real href or compose a router-owned anchor, then choose a visual variant independently from navigation semantics.

## Rules

- **MUST:** Preserve anchor semantics and a real destination even when the link looks like a button.
- **MUST:** Load styles.css or core.css plus link.css.

## Common mistakes

- **Avoid:** Replacing a destination with Button because the design is prominent. **Instead:** Use Link and select the appropriate Brick variant.

## Validation checklist

- Inspect href and accessible name.
- Test focus, Enter navigation, visited/external behavior when relevant, and contrast.

## Related guidance

- `@flowstack-ui/atom/agents/link`
- `button`
