# Image agent guide

## Purpose

Provide styled resilient media with Atom loading/fallback behavior, sizing recipes, and accessible image semantics.

## Use when

- A product image, brand asset, illustration, content image, or larger editorial/profile portrait needs Brick sizing, authored aspect ratio, fit, focal position, radius, loading, or fallback presentation.

## Choose something else when

- A person or entity needs a compact fixed-square identity token with explicit fallback content. Use Avatar.
- A framework optimizer provides a required measured optimization Brick does not expose. Use a documented Image adapter that preserves semantics and reports the capability gap.

## Required composition

- Compose Image.Content and optional Image.Fallback inside Image.Root; use Brick Stack or layout components around it rather than wrapper spans for alignment.
- In a React Server Component, import ImageRoot, ImageContent, and ImageFallback directly; the compound Image namespace is intended for client module composition.

## Rules

- **MUST:** Use Brick Image for ordinary interface media; document any native or framework image fallback and the missing capability.
- **MUST:** Provide meaningful alt text, or alt="" for a decorative image.
- **MUST:** For a profile portrait, preserve the person's name as alt when the portrait communicates identity; use alt="" only when that specific portrait is intentionally decorative.
- **SHOULD:** Reserve dimensions or aspect ratio to prevent layout shift.
- **MUST:** Use explicit fill when Image must consume a parent-established block size, such as Surface.Media; retain fit and position for the intended crop.
- **MUST:** Name and preserve the parent sizing box when fill is used; Image propagates into available geometry but does not create that geometry.
- **MUST:** Load styles.css or core.css plus image.css.
- **MUST:** Use direct named Image parts across a React Server Component boundary instead of wrapping the complete consumer in use client.

## Common mistakes

- **Avoid:** Using next/image automatically, forcing a larger authored profile portrait into Avatar's compact square recipe, wrapping Image in spans for ordinary alignment, or applying one blanket alt decision to all portraits. **Instead:** Start with Brick Image for larger authored media, use Avatar for compact identity, decide alt from each image's context, and adapt only for a measured missing optimizer capability.

## Validation checklist

- Check loaded, loading, error, cached, responsive size, parent-fill geometry, crop, layout shift, contextual alt text—including identity-bearing and intentionally decorative portraits—contrast of fallback content, and RTL where relevant.
- Confirm CSS and any adapter report are complete.

## Related guidance

- `aspect-ratio`
- `stack`
- `avatar`
- `surface`
