# Brick interface composition

## Purpose

Build complete interfaces from Brick's structural, content, navigation, action, responsive, and surface components before adding narrow application styling.

## Decision order

1. Map the page into landmarks, bounded regions, layout relationships, content, navigation, actions, media, and responsive changes.
2. Choose the Brick owner for each relationship and read every selected component guide before implementation.
3. Compose from the outside inward: AppBar or page landmark, Container, Grid or Stack, Surface or Card, then content and controls.
4. Follow the customization order completely: component owner, supported props, semantic theme tokens, component tokens, public parts, and only then a narrow stable-hook escape hatch.
5. Audit responsive behavior, accessibility, CSS delivery, and native fallbacks before treating the composition as complete.

## Selection map

- **page width and gutters:** use Container. Do not reproduce max-width and inline padding on every section.
- **row or column relationship:** use HStack or VStack. Use Stack when direction is selected dynamically.
- **track-based responsive layout:** use Grid. Use Stack when only one axis matters.
- **visual region:** use Surface or Card. Use Card for titled or actionable contained content and Surface for a general visual boundary.
- **brand or content image:** use Image. Keep alt text and fallback behavior intentional.
- **one of several peer campaigns or authored content regions:** use Carousel. Keep invariant evidence outside; let each Slide own a complete Surface when its media and message belong together.
- **site navigation:** use NavigationMenu or NavList. Use NavigationMenu for disclosure navigation and NavList for persistent route lists.
- **responsive desktop and mobile alternatives:** use Show and Hide. Keep one CSS-controlled breakpoint contract and avoid hydration-dependent visibility; distinct navigation patterns should consume one application-owned destination model.
- **grouped application actions:** use Toolbar. Do not use AppBar.Toolbar as an ARIA toolbar.

## Rules

- **MUST:** Assign page structure to Brick components before writing element-level CSS.
- **MUST:** Do not use Stack, Surface, Button, or another convenient component when a more specific Brick navigation, media, content, or interaction component owns the job.
- **MUST:** Preserve document landmarks and semantic elements when Brick does not provide an owner; Brick-first is not permission to erase HTML meaning.
- **MUST:** When desktop and mobile require distinct navigation components, share application-owned destination labels, hrefs, values, and ordering while preserving each pattern's correct Brick anatomy; do not duplicate navigation content or force one interaction tree across breakpoints.
- **MUST:** Use Show and Hide for first-paint visibility; when a controlled interactive overlay may remain open across a breakpoint, synchronize its application state at that boundary so a hidden modal cannot retain focus, scroll lock, or isolation.
- **SHOULD:** Express reusable brand values through semantic Brick tokens and a theme rather than repeating literal application values.
- **MUST:** For a locally dark or light region, set data-brick-appearance on the region owner and provide the complete semantic token set in the theme; do not recolor each descendant independently.
- **SHOULD:** Keep decorative annotations that must not redistribute primary content outside Stack or Grid flow through narrow application-owned positioning; do not invent a Brick component solely for their coordinates.
- **MUST:** Classify findings before changing a package: behavior and accessibility belong to Atom, finished reusable component paint belongs to Brick, brand values belong to Theme, repeated responsive section composition may belong to Block or Blueprint, and one-page art direction remains application-owned.
- **MUST:** When styles.css or styles/core.css is loaded, change the document canvas, foreground, and body typography through semantic Brick tokens instead of repeating the body bindings that Brick's foundation already owns.
- **MUST:** Do not write a direct declaration against a Brick part until the correct component, supported props, semantic tokens, component tokens, and public compound parts have been checked in order.
- **MUST:** Target only documented Brick tokens, public compound parts, stable brick-* base classes, documented slots, and documented state attributes; inspected internal wrappers or implementation selectors are not APIs.
- **MUST:** When a direct stable-hook override remains because no public prop or token expresses the requirement, emit the required customization gap report and classify its owner before treating the interface as complete.
- **SHOULD:** Classify repeated purposeful sections as Block candidates and repeated page arrangements as Blueprint candidates only after real reuse evidence.
- **SHOULD:** Split long product compositions by stable responsibility—authored content, repeated item, invariant supporting region, and outer assembly—without pretending those local modules are reusable Brick components.
- **MUST:** Comment non-obvious ownership, accessibility order, breakpoint, sizing, and browser-lifecycle constraints; do not add comments that only translate a component name or prop into prose.

## Customization order

1. **Correct Brick component:** Select the component whose semantic, behavioral, layout, content, navigation, or surface contract owns the job; styling a convenient substitute is not equivalent.
2. **Supported props and recipes:** Use the component's documented variant, tone, size, density, orientation, placement, and other closed recipes when they express the result.
3. **Semantic theme tokens:** Assign reusable brand color, typography, spacing, radius, surface, focus, and motion roles through a theme scope, preserving required foreground/background and interaction-state pairs.
4. **Documented component tokens:** Use stable --brick-<component>-* variables for supported anatomy-specific adjustments instead of overriding the declaration that consumes them.
5. **Public compound parts:** Place product-specific composition classes on the public part that owns the region; do not create slot maps or select private wrappers.
6. **Narrow stable-hook escape hatch:** Use className or style only for application-owned composition or a value Brick does not expose, and target a documented public hook when direct CSS is unavoidable.

**Class name policy:** className scopes a product composition or supplies consumer-defined token values. It must not replace a supported prop, repeat a reusable theme value, or depend on undocumented anatomy.

**Direct CSS policy:** Direct declarations on a stable Brick class are a last resort. Keep them narrow, preserve component state and accessibility, verify the affected responsive and appearance states, and report the missing public capability.

### Required gap report

Emit this record for every native/framework fallback or direct stable-hook declaration that remains after the ordered search.

- `interfaceJob`
- `brickOwnerSearched`
- `supportedPropsChecked`
- `semanticTokensChecked`
- `componentTokensChecked`
- `publicPartsChecked`
- `fallbackOrOverride`
- `missingCapability`
- `proposedOwner`
- `verification`

## Native fallback

1. Review the interface map against the manifest and selected component guides, including layout, text, image, visibility, and navigation owners.
2. Keep native landmarks and product-specific semantic structures where no Brick component adds a useful contract; add only narrow composition classes.
3. Record what Brick lacked, whether an adapter or new component is warranted, and whether the pattern belongs to Theme, Block, Blueprint, or the application.

## Validation checklist

- Inspect the rendered DOM, accessible names, heading order, landmarks, focus order, keyboard operation, touch targets, contrast, zoom, and RTL behavior.
- Test every adopted breakpoint without JavaScript-dependent first-paint flicker.
- Confirm layout primitives own ordinary gap, alignment, wrapping, width, and visibility before accepting custom CSS; verify separately meaningful inline nodes use layout gap rather than literal spaces or offsets.
- Confirm local appearance scopes supply complete semantic foreground, background, boundary, action, focus, and interaction-state token pairs without child-by-child recoloring.
- Confirm repeated CSS values are theme tokens, component-specific values use documented component tokens, and every remaining direct stable-hook declaration has a complete customization gap report.
- Confirm source order follows rendered ownership, static content is separate from interaction assembly when it obscures the component tree, and comments explain why a constraint exists rather than what an obvious line does.
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
