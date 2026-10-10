# Checkbox changelog


## Unreleased

- Resolve label sizes and leading through shared semantic typography while preserving the existing size scale.

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.

Checkbox follows the package version of `@flowstack-ui/brick`.

- Add responsive xs–lg sizing, solid/outline/subtle recipes, tones, shared radius,
  density and logical label placement. Coordinate CheckboxGroup and Checkmark.
- Add controller/provider exports, optional Indicator artwork and native input
  ref/props integration. Preserve callable and linked-label compound APIs.

- Add optional Root/Control/Label/Description/Error composition for linked
  consent text without nested interactive elements. Preserve callable Checkbox.
- Reuse Atom Field labeling/validation and Checkbox state/form behavior; add
  size-aware layout, source-paired examples, regression coverage and corrected
  Agent Knowledge.

### Added

- Initial Checkbox API with small, medium, and large sizes, checked and mixed
  artwork, native form behavior, and full-row touch targets.
- Field composition, native props and refs, `asChild` and `render` adapters,
  public state hooks, and customization tokens.

### Fixed

- Ensured the higher-specificity control transition also resolves to zero
  duration when the user requests reduced motion.
- Checkbox hover, press, and focus-visible feedback now stays on the visual
  square while the complete label row remains a comfortable clickable target.
- Required Checkbox validation now remains neutral until interaction, presents
  inline or native errors at the visible control, moves focus and scrolling to
  that control, and clears after correction or reset.
- Invalid presentation now keeps choice text neutral while marking the control
  and logical row-start cue.
- Validation-directed scrolling now remains safe during server and non-browser
  rendering.
