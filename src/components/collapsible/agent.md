# Collapsible agent guide

## Purpose

Reveal one independent in-flow region while Atom owns disclosure state, relationships, keyboard behavior, and measured mount lifecycle.

## Use when

- One control should progressively reveal one related region without creating an overlay or modal interaction.

## Choose something else when

- Several named peer sections form one coordinated set. Use Accordion.
- The temporary content must layer, dismiss outside, lock scroll, or contain focus. Use Dialog, Drawer, Popover, or Menu according to the interaction.

## Required composition

- Compose Root with one Trigger and one Content; put ContentInner inside Content so visible padding does not corrupt measured animation geometry.
- Use Indicator inside Trigger for the canonical decorative state cue; the default points down while closed and up while open, and normal Brick layout and content components belong inside ContentInner.

## Rules

- **MUST:** Use Root, Trigger, Content, and ContentInner rather than rebuilding disclosure state, ARIA relationships, measurement, or animation lifecycle.
- **MUST:** Let Collapsible Trigger own its finished control recipe; do not compose Button or Icon Button into Trigger because competing visual recipes would own one element.
- **MUST:** Keep visible padding in ContentInner rather than Content so Atom can measure and animate the region accurately.
- **MUST:** Use Collapsible for in-flow disclosure, not as a substitute for modal Drawer behavior or responsive Show/Hide policy.
- **MUST:** Load styles.css or core.css plus collapsible.css.
- **MUST:** Keep the default Indicator pointing down while closed and up while open in both LTR and RTL; use custom decorative artwork only for a deliberate alternate state language.

## Common mistakes

- **Avoid:** Using Collapsible Trigger asChild around a finished Button or Icon Button. **Instead:** Use Trigger as the only visual control owner and author its label, icon, and optional Indicator directly.
- **Avoid:** Putting padding on Content or animating an application wrapper independently. **Instead:** Keep Content as the measured motion boundary and put visible spacing in ContentInner.
- **Avoid:** Choosing Collapsible when the page must be inert behind the open panel. **Instead:** Use Drawer or Dialog so Atom can own modal isolation, focus, dismissal, and scroll locking.

## Validation checklist

- Test the accessible Trigger name, aria-expanded/aria-controls relationship, Enter and Space, controlled and uncontrolled state, disabled behavior, focus retention, and the default down/up Indicator state.
- Test open/close measurement, dynamic content, reduced motion, long labels, narrow widths, RTL, and horizontal overflow.
- When adapting Collapsible inside another surface, report any Root geometry override instead of silently treating plain as a behavior-only recipe.

## Related guidance

- `accordion`
- `drawer`
- `app-bar`
- `nav-list`
- `show`
- `hide`
- `stack`
