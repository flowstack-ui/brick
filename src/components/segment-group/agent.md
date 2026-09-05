# SegmentGroup agent guide

## Purpose

Present one mutually exclusive immediate mode in a compact segmented surface with radio semantics and a moving visual indicator.

## Use when

- A small visible set such as list/grid, density, or appearance must keep exactly one immediate mode selected.

## Choose something else when

- Commands may be independently pressed, the choices select paired panels, or an ordinary form choice is needed. Use ToggleGroup, Tabs, or RadioGroup according to the interaction.

## Required composition

- Compose Root with one Indicator and directly owned Items; give Root a complete accessible name and every icon-only Item its own complete name.
- Choose one shared size on Root so its outer height aligns through Brick's control contract. Segment labels keep component-owned regular typography and inline rhythm. Reserve 2xs for dense application tools such as property panels; use xs for the polished 32px compact recipe.

## Rules

- **MUST:** Use SegmentGroup only for one mutually exclusive value and preserve Atom Radio Group semantics and keyboard behavior.
- **MUST:** Render one decorative Indicator for the canonical moving-selection recipe; selection and naming must remain on Items.
- **MUST:** Do not use SegmentGroup for paired content panels or route navigation; use Tabs or navigation destinations.
- **MUST:** Use 2xs only when the surrounding expert interface deliberately uses 28px compact controls; use sm or larger for ordinary touch-first choice surfaces.
- **MUST:** Load styles.css or core.css plus segment-group.css.

## Common mistakes

- **Avoid:** Using ToggleGroup single mode for a required one-of-many mode or using SegmentGroup as visual tabs. **Instead:** Choose SegmentGroup for one compact radio-semantic mode and Tabs only when panels are paired.

## Validation checklist

- Check click, Space, arrows, Home/End, looping, controlled state, disabled/read-only state, and complete accessible naming.
- Check indicator movement after selection and resize, exact shared outer sizes, regular label typography, component-owned inline padding, subtle unselected rail, short inset default-boundary separator rules that disappear beside the selected Item, base-surface light selection, raised-surface dark selection, inset Root boundary, borderless shallow selected elevation, focus containment, reduced motion, forced colors, zoom, and RTL.

## Related guidance

- `radio-group`
- `toggle-group`
- `tabs`
- `button`
- `select`
- `toolbar`
