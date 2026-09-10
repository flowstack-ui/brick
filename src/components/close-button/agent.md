# CloseButton agent guide

## Purpose

Provide a consistently sized and named X action through IconButton.

## Use when

- The user dismisses an overlay, banner or other visible region.

## Choose something else when

- The action clears input, deletes data or toggles navigation. Use The specific component action or IconButton.

## Required composition

- Compose inside Dialog.Close, Drawer.Close or Popover.Close using the owner's asChild path. Keep size and contextual accessible name explicit when needed. The default name uses LocaleProvider close text.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep dismissal, placement and focus restoration with the existing owner; CloseButton does not close automatically.
- **MUST:** Load styles.css or core.css plus close-button.css, which includes the IconButton recipe.
- **MUST:** Support scalar focusRing="outside" | "inside"; omission stays outside. Inside uses paired foreground and canonical negative-width offset without changing Atom behavior.

## Common mistakes

- **Avoid:** Replacing an overlay's Close behavior with a standalone X. **Instead:** Keep the compound Close owner and compose CloseButton as its visual action.

## Validation checklist

- Verify naming, form non-submission, custom icon, size/hover/focus parity, disabled/loading and overlay focus return.

## Related guidance

- `icon-button`
- `dialog`
- `drawer`
- `popover`
- `locale-provider`
