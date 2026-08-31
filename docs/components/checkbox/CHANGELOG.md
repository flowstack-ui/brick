# Checkbox changelog

Checkbox follows the package version of `@flowstack-ui/brick`.

## Unreleased

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
