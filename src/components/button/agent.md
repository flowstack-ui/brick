# Button agent guide

## Purpose

Render a finished accessible action or emphasized native link with Brick size, tone, variant, loading, and composition contracts.

## Use when

- The user triggers an action such as submit, save, open, dismiss, or retry.
- A destination intentionally needs a filled, soft, outlined, or ghost action treatment.

## Choose something else when

- A destination should read as ordinary inline or standalone navigation. Use Link.

## Required composition

- Omit href for actions and supply href for emphasized destinations; choose tone, variant, and size from intent and add an icon only when it improves recognition. Use a mobile-first responsive size value when the complete recipe changes at a shared Brick breakpoint. Omit initial when the normal 44px lg default is the intended baseline, and supply it only to replace that baseline. Use contrast for a high-emphasis neutral action, neutral for quieter secondary/cancel actions, and accent for the normal branded product action.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use action mode for operations and href link mode for emphasized destinations; visual prominence never justifies hiding navigation in onPress.
- **MUST:** Load styles.css or core.css plus button.css.
- **MUST:** Support scalar focusRing="outside" | "inside"; omission stays outside. Inside uses paired foreground and canonical negative-width offset without changing Atom behavior.

## Common mistakes

- **Avoid:** Navigating from onPress without a real href. **Instead:** Use Button href mode for emphasized navigation or Link for ordinary navigation.

## Validation checklist

- Confirm an accessible name and action semantics.
- Confirm responsive size values change minimum block size, typography, padding, gap, and icon geometry together without duplicating the control.
- Test focus, keyboard activation, disabled/loading behavior, and contrast in every supported appearance; disabled labels must remain readable while ghost and outline controls stay transparent.

## Related guidance

- `@flowstack-ui/atom/agents/button`
- `link`
- `form`
