# VisuallyHidden agent guide

## Purpose

Keep a short authored name or equivalent context available to assistive technology without adding a visible layout footprint.

## Use when

- A nearby visual already communicates the same short meaning but a control, state, or relationship still needs an accessible text equivalent.

## Choose something else when

- The text is an essential instruction, visible state, error, focusable control, or asynchronous announcement. Use Visible Text or the application-owned feedback and live-region pattern.

## Required composition

- Place a short equivalent phrase in VisuallyHidden.Root at the semantic owner that needs it; keep focusable descendants and live-region policy outside Root.

## Rules

- **MUST:** Keep hidden text short, specific, and equivalent to the nearby visual meaning; do not hide information that benefits everyone.
- **MUST:** Do not place keyboard-focusable or interactive descendants inside VisuallyHidden.Root.
- **MUST:** Do not use VisuallyHidden as a substitute for deliberate visible feedback or application-owned live-region behavior.
- **MUST:** Do not override Atom's authoritative hiding properties or confuse visually hidden content with aria-hidden decorative content.
- **MUST:** Load styles.css or core.css plus visually-hidden.css.

## Common mistakes

- **Avoid:** Hiding essential instructions, placing a focusable control inside Root, or adding aria-hidden to content that should name a control or state. **Instead:** Keep essential content visible, name the semantic owner with short hidden text only when the visual equivalent is already present, and use aria-hidden only for decoration.

## Validation checklist

- Inspect the accessibility tree and confirm the hidden phrase contributes exactly once to the intended name or description.
- Confirm the root has no layout footprint, no focusable descendants, and unchanged behavior across zoom, direction, and appearance.

## Related guidance

- `icon`
- `icon-button`
- `text`
- `status`
