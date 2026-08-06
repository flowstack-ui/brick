# Brick interface composition

## Purpose

Build complete interfaces from Brick's structural, content, navigation, action, responsive, and surface components before adding narrow application styling.

## Decision order

1. Map the page into landmarks, bounded regions, layout relationships, content, navigation, actions, media, and responsive changes.
2. Choose the Brick owner for each relationship and read every selected component guide before implementation.
3. Compose from the outside inward: AppBar or page landmark, Container, Grid or Stack, Surface or Card, then content and controls.
4. Use component props and theme tokens before stable component hooks, and use application CSS only for product-specific composition.
5. Audit responsive behavior, accessibility, CSS delivery, and native fallbacks before treating the composition as complete.

## Selection map

- **page width and gutters:** use Container. Do not reproduce max-width and inline padding on every section.
- **row or column relationship:** use HStack or VStack. Use Stack when direction is selected dynamically.
- **track-based responsive layout:** use Grid. Use Stack when only one axis matters.
- **visual region:** use Surface or Card. Use Card for titled or actionable contained content and Surface for a general visual boundary.
- **brand or content image:** use Image. Keep alt text and fallback behavior intentional.
- **site navigation:** use NavigationMenu or NavList. Use NavigationMenu for disclosure navigation and NavList for persistent route lists.
- **responsive desktop and mobile alternatives:** use Show and Hide. Keep one CSS-controlled breakpoint contract and avoid hydration-dependent visibility.
- **grouped application actions:** use Toolbar. Do not use AppBar.Toolbar as an ARIA toolbar.

## Rules

- **MUST:** Assign page structure to Brick components before writing element-level CSS.
- **MUST:** Do not use Stack, Surface, Button, or another convenient component when a more specific Brick navigation, media, content, or interaction component owns the job.
- **MUST:** Preserve document landmarks and semantic elements when Brick does not provide an owner; Brick-first is not permission to erase HTML meaning.
- **SHOULD:** Express reusable brand values through semantic Brick tokens and a theme rather than repeating literal application values.
- **SHOULD:** Classify repeated purposeful sections as Block candidates and repeated page arrangements as Blueprint candidates only after real reuse evidence.

## Native fallback

1. Review the interface map against the manifest and selected component guides, including layout, text, image, visibility, and navigation owners.
2. Keep native landmarks and product-specific semantic structures where no Brick component adds a useful contract; add only narrow composition classes.
3. Record what Brick lacked, whether an adapter or new component is warranted, and whether the pattern belongs to Theme, Block, Blueprint, or the application.

## Validation checklist

- Inspect the rendered DOM, accessible names, heading order, landmarks, focus order, keyboard operation, touch targets, contrast, zoom, and RTL behavior.
- Test every adopted breakpoint without JavaScript-dependent first-paint flicker.
- Confirm layout primitives own ordinary gap, alignment, wrapping, width, and visibility before accepting custom CSS.
- Confirm repeated CSS values are theme tokens and repeated purposeful compositions are recorded for later extraction rather than copied silently.
- Run the package's CSS-delivery check and the application's accessibility, browser, and performance checks.

## Related guidance

- `layer-selection`
- `app-bar`
- `container`
- `stack`
- `grid`
- `surface`
- `card`
- `navigation-menu`
- `show`
- `hide`
