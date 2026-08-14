# Link agent guide

## Purpose

Render finished native navigation as inline, standalone, or button-like content without changing its link semantics.

## Use when

- The user moves to a route, URL, document, download, email address, or telephone destination.

## Choose something else when

- The interaction changes current state without navigating. Use Button.

## Required composition

- Provide a real href or compose a router-owned anchor. Leave variant="theme" to follow the project decoration policy, or choose underline/plain for a local exception.
- When a Link completes a sentence or paragraph, keep it inside that semantic Text owner and use size="inherit" so typography and wrapping remain one coherent text flow; use layout components only for independently meaningful peer items.

## Rules

- **MUST:** Preserve anchor semantics and a real destination even when the link looks like a button.
- **MUST:** Keep a Link that completes surrounding prose inside the owning sentence or paragraph and inherit its typography; do not split one sentence into layout siblings merely to align it.
- **MUST:** When a theme removes the resting underline, keep accent link text at least 3:1 distinct from adjacent primary text and restore the underline on interaction.
- **MUST:** Load styles.css or core.css plus link.css.

## Common mistakes

- **Avoid:** Replacing a destination with Button because the design is prominent. **Instead:** Use Link and select the appropriate Brick variant.
- **Avoid:** Rendering prose and the Link that completes it as separate Stack children. **Instead:** Render one semantic Text sentence with an inline Link using size="inherit"; reserve Stack for independent peers.
- **Avoid:** Removing resting underlines globally without validating links against surrounding text. **Instead:** Use the Theme Link input so compilation validates the required text distinction, or keep underlines.

## Validation checklist

- Inspect href and accessible name.
- For inline prose links, confirm the Link remains inside the owning sentence or paragraph, inherits its typography, and wraps as one text flow.
- Test focus, Enter navigation, visited/external behavior when relevant, and contrast.
- For no-resting-underline themes, verify the compiled 3:1 text-distinction result and the interactive underline.

## Related guidance

- `@flowstack-ui/atom/agents/link`
- `text`
- `stack`
- `button`
