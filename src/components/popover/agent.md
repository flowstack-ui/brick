# Popover agent guide

## Purpose

Present a compact click-open panel anchored to a trigger while Atom owns placement, focus, dismissal, and portal behavior.

## Use when

- A trigger needs a small contextual panel for details, filters, or compact editing that does not block the rest of the page.

## Choose something else when

- The content is short noninteractive help, a hover preview, or a task that must create a modal boundary. Use Tooltip, HoverCard, or Dialog according to the interaction.

## Required composition

- Compose Root > Trigger plus Portal > Content; place Title and Description when they clarify the panel, and arrange authored content through Header, Body, Footer, and Close as needed.
- When a local Appearance scope owns the trigger, portal into that scope or apply the same Appearance to Content because ordinary portal ancestry does not preserve the local theme boundary.

## Rules

- **MUST:** Use Popover for compact nonmodal click-open work; do not use it for a blocking workflow or as a substitute for persistent page content.
- **MUST:** Keep Trigger and portalled Content inside one Root and use the public structure parts instead of recreating panel spacing and hierarchy with private selectors.
- **MUST:** When Content leaves a local appearance or theme scope through Portal, reproduce that scope on the portalled visual root or target a container inside it.
- **MUST:** Give the trigger a complete accessible name and include Title or Description when the panel purpose would otherwise be unclear.
- **MUST:** Load styles.css or core.css plus popover.css.

## Common mistakes

- **Avoid:** Hand-positioning a floating div, assuming a portalled panel inherits a nearby theme scope, or putting a modal task in Popover. **Instead:** Use complete Popover anatomy, make the portal scope explicit, and choose Dialog when focus must remain inside the task.

## Validation checklist

- Check trigger naming, open and close behavior, focus return, Escape and outside dismissal, collision placement, zoom, narrow viewports, and RTL.
- Check light and dark appearance on the actual portalled Content and confirm the matching CSS is loaded.

## Related guidance

- `dialog`
- `hover-card`
- `tooltip`
- `appearance`
- `stack`
