# CloseButton changelog


## Unreleased

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.


CloseButton follows the package version of `@flowstack-ui/brick`.

- Support scalar focusRing="outside" | "inside"; omission stays outside. Inside uses paired foreground and canonical negative-width offset without changing Atom behavior.

- Add shared token-only radius selection to the boundary parts documented in the Radius guide; preserve omitted defaults and independent internal geometry.

### Added

- Add a localized, IconButton-backed close action with standard decorative X.

- Consolidated shared action presentation and icon-only custom loading.
