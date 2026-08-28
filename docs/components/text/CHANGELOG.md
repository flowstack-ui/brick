# Text changelog

Text follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Added themeable `display-sm`, `display-md`, and `display-lg` recipes plus
  responsive visual-variant and logical-alignment values that keep the
  semantic host unchanged.

- Added direct `Heading`, `Paragraph`, `Caption`, and `Eyebrow` exports over
  the same Text implementation. Heading requires an explicit semantic level;
  Heading and Paragraph keep constrained visual-variant families.
- Added the explicit `transform` recipe with `none`, `uppercase`, `lowercase`,
  and `capitalize` values without treating CSS capitalization as authored
  title case.

- Expanded Agent Knowledge for parent-owned foreground inheritance, semantic
  eyebrow selection, and gap-based alignment of separately meaningful inline
  text.

- Added the `eyebrow` Text variant for short uppercase editorial labels.

- Added public Agent Knowledge for component selection, composition,
  CSS-delivery, recurring mistakes, and validation.

- Initial Text API with independent semantic hosts and nine visual type
  recipes.
- Primary, secondary, muted, accent, info, success, warning, danger, and
  inherited foreground roles; regular, medium, semibold, and inherited weight;
  and logical alignment.
- Natural, nowrap, balanced, and pretty wrapping plus explicit single-line
  truncation and bounded multi-line clamping.
- Native attributes, an `HTMLElement` ref, stable class/slot/recipe metadata,
  public Text variables, expanded semantic type tokens, appearance, forced
  colors, RTL, and narrow-layout support.
