# Brick layer selection

## Purpose

Choose the correct FLOWSTACK layer and require Brick-first composition when building a finished interface with Brick.

## Decision order

1. Describe the interface job and semantic relationship before choosing markup or appearance.
2. Search Brick's package guides and component manifest for a component that owns the job.
3. Use Brick public components for finished interface structure, controls, navigation, content, media, responsive visibility, and visual surfaces.
4. Let Brick consume Atom; do not import Atom directly in an ordinary Brick application.
5. Keep purposeful sections in Blocks, page arrangements in Blueprints, theme values in a Theme, and business behavior in the application.

## Selection map

- **text with Brick typography:** use Text. Choose the semantic rendered element through its public API.
- **one-dimensional alignment:** use Stack, HStack, or VStack. Use Grid for two-dimensional track relationships.
- **bounded page width:** use Container. Use Surface or Card when the region also needs a visual boundary.
- **top application or page bar:** use AppBar. Compose navigation and action components inside its sections.
- **responsive presence:** use Show or Hide. Use CSS media visibility rather than rendering two JavaScript-controlled trees.
- **image with resilient loading:** use Image. Use an adapter only when a framework image optimizer provides a measured capability Brick lacks.
- **navigation destination:** use Link or Button with href. Use Link for ordinary navigation and Button only for an emphasized destination.

## Rules

- **MUST:** Use an existing Brick component when it owns the interface job instead of recreating it with native elements and application CSS.
- **MUST:** Do not import @flowstack-ui/atom directly in an application that has selected Brick; report a Brick gap if the finished component is missing.
- **MUST:** Load styles.css once, or core.css once plus every rendered component's modular stylesheet; never mix the two delivery modes.
- **MUST:** Choose components by semantic and interaction intent rather than by visual resemblance.
- **MUST:** After selecting a Brick owner, follow interface-composition's ordered prop, semantic-token, component-token, public-part, and stable-hook customization contract.
- **SHOULD:** Record intentional native or framework fallbacks with the searched Brick component and missing capability.

## Native fallback

1. Search the Brick manifest, package guide selection map, component docs, and public exports before writing native markup or replacement CSS.
2. Use semantic native HTML only for document or application structure Brick does not own, or through a documented adapter when a framework supplies a required measured capability.
3. Record the fallback as a Brick gap, adapter need, higher-layer composition, or intentional application-owned element before continuing.

## Validation checklist

- List every native layout, text, image, navigation, and interactive element and name why Brick does not own it; list every direct Brick stable-hook declaration and its completed customization gap report.
- Confirm there are no direct @flowstack-ui/atom imports.
- Confirm every rendered Brick component has its required modular CSS or the complete stylesheet is loaded once.
- Classify each repeated composition as component, theme, Block, Blueprint, adapter, or application ownership.

## Related guidance

- `interface-composition`
- `app-bar`
- `container`
- `stack`
- `grid`
- `text`
- `image`
- `show`
- `hide`
