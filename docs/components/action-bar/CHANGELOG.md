# ActionBar changelog

ActionBar follows the package version of `@flowstack-ui/brick`.

## Unreleased

- Expose the ActionBar controller and Positioner host composition.
- Use compact token-owned corners and honor initial animation suppression.
- Add focused documentation examples and per-part API references while retaining
  exhaustive qualification scenarios.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Added

- Delegate Positioner layer registration to Atom so its fixed wrapper follows
  the same overlay order as Content and nested modal surfaces.

- Add detached action anatomy and safe-area-aware logical placement.
- Add theme-owned surface, shadow, dashed selection action and inset separator.
- Delegate focus, disclosure, portal and mount policy to Atom ActionBar.
