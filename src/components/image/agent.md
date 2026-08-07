# Image agent guide

## Purpose

Provide styled resilient media with Atom loading/fallback behavior, sizing recipes, and accessible image semantics.

## Use when

- A product image, brand asset, illustration, or content image needs Brick sizing, fit, radius, loading, or fallback presentation.

## Choose something else when

- A framework optimizer provides a required measured optimization Brick does not expose. Use a documented Image adapter that preserves semantics and reports the capability gap.

## Required composition

- Compose Image.Content and optional Image.Fallback inside Image.Root; use Brick Stack or layout components around it rather than wrapper spans for alignment.
- In a React Server Component, import ImageRoot, ImageContent, and ImageFallback directly; the compound Image namespace is intended for client module composition.

## Rules

- **MUST:** Use Brick Image for ordinary interface media; document any native or framework image fallback and the missing capability.
- **MUST:** Provide meaningful alt text, or alt="" for a decorative image.
- **SHOULD:** Reserve dimensions or aspect ratio to prevent layout shift.
- **MUST:** Use explicit fill when Image must consume a parent-established block size, such as Surface.Media; retain fit and position for the intended crop.
- **MUST:** Load styles.css or core.css plus image.css.
- **MUST:** Use direct named Image parts across a React Server Component boundary instead of wrapping the complete consumer in use client.

## Common mistakes

- **Avoid:** Using next/image automatically, wrapping Image in spans for ordinary alignment, or duplicating the caption in alt text. **Instead:** Start with Brick Image, use Brick layout components, and adapt only for a measured missing optimizer capability.

## Validation checklist

- Check loaded, loading, error, cached, responsive size, parent-fill geometry, crop, layout shift, alt text, contrast of fallback content, and RTL where relevant.
- Confirm CSS and any adapter report are complete.

## Related guidance

- `aspect-ratio`
- `stack`
- `avatar`
- `surface`
