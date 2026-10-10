# CloseButton



## When and where to use
Use for a consistent icon-only dismissal action in an overlay or visible region.

## When not to use
Use specific clear/remove/delete or navigation-toggle owners for those jobs.

## Installation and imports
```tsx
import "@flowstack-ui/brick/styles.css";
import { CloseButton } from "@flowstack-ui/brick/close-button";
```
Alternatively, load only the modular foundation and component styles:
```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/close-button.css";
```
Import { CloseButton } from "@flowstack-ui/brick/close-button" or the package root.
Load reset.css then styles.css, or core.css plus styles/close-button.css.

## Quick start
```tsx
<CloseButton aria-label="Close settings" onPress={dismiss} />
```

## Anatomy and DOM ownership
One native button through IconButton and Atom Button. The default SVG is decorative.
Root class brick-close-button supplements brick-icon-button; slot close-button.

## API
CloseButtonProps inherits IconButton action props, responsive size, variant, tone,
shape, disabled/loading, onClick/onPress, className/style and HTMLElement ref.
children optionally replaces the decorative X. Defaults: size lg, ghost, neutral,
rounded. href/target/rel/type/asChild/render are not supported; type is button.
aria-label or aria-labelledby supplies contextual naming; otherwise LocaleProvider
localeText.close defaults to Close. aria-labelledby suppresses the fallback label.

### Shared radius selection

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
Uses IconButton's complete seven-size scale, ghost/solid/soft/outline, semantic tones,
rounded/circle shape and unchanged hover, pressed, focus, disabled/loading treatment.

## Tokens and CSS hooks
Inherits IconButton semantic tokens and public hooks. No independent CSS values.

## Customization
Use supported action props. Custom icon children remain decorative; do not use them
as the accessible label. No implicit dismissal or positioning.

## Responsive behavior
Sparse responsive size inherits the normal lg default. Match adjacent control sizes.

## Accessibility

### Focus presentation

Support scalar focusRing="outside" | "inside"; omission stays outside. Inside uses paired foreground and canonical negative-width offset without changing Atom behavior.
See [Focus presentation](../../guides/focus-presentation.md).
Name the button contextually when useful. Keyboard behavior comes from Atom Button.
The default name can be translated through LocaleProvider; Tooltip is supplemental.

## Composition, native props, and refs
```tsx
<Dialog.Close placement="corner" asChild>
  <CloseButton aria-label="Close settings" size="sm" />
</Dialog.Close>
```
Dialog.Close owns dismissal, placement and focus restoration. CloseButton does not
replace that owner and never submits a form. Forwarded refs target the button.

## Examples
Use onPress for application-owned banner dismissal, or compose through an overlay
Close part. Preserve a contextual aria-label when migrating an existing IconButton.

## Evidence
- [Playground](../../../playground/src/components/close-button/)
- [Visual](../../../playground/tests/components/close-button/visual.spec.ts)
- [Unit](../../../test/components/close-button/close-button.test.tsx)
- [Types](../../../test/types/components/close-button.test.ts)
- [Browser](../../../playground/tests/components/close-button/behavior.spec.ts)
- [Manual](../../../playground/manual-tests/close-button.md)
Manual screen-reader, actual zoom and physical touch results are recorded separately.

## Changelog
[Component changelog](CHANGELOG.md).

### Shared action family

Button owns shared rendering and recipes. IconButton wraps its internal icon-only path; CloseButton wraps IconButton. Equal explicit variant/tone values share hover, expanded, disabled and focus presentation. Icon-only controls remain square and named. Custom spinner is available on ordinary/render IconButton and CloseButton; IconButton asChild excludes it. No visible loadingText or fullWidth icon-only mode. This supersedes earlier independent IconButton paint rules.
