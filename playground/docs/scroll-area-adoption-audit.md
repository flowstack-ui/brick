# Scroll Area playground adoption audit

Status: **Implemented**

## Migrated owners

- Desktop component navigation: constrained vertical navigation.
- Scenario navigation: constrained horizontal rail.
- Stack no-wrap evidence: intentional horizontal overflow.
- App Bar position stage: intentional bounded vertical scrolling.

## Retained native overflow

- `pre` and rendered-output regions remain with Code Block, their future owner.
- Container boundary diagnostics retain raw overflow to expose geometry.
- `overflow: hidden` and `overflow: visible` remain clipping, containment,
  or overlay-placement decisions, not Scroll Area candidates.
- Responsive layouts that can reflow remain Grid/Stack.

## Rule

Adopt Scroll Area only when scrolling is intentional user-facing behavior.
Do not mechanically replace every CSS overflow declaration.
