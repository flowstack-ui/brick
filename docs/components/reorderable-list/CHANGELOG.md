# Reorderable List changelog

Reorderable List follows the package version of `@flowstack-ui/brick`.

## Unreleased

### Added

- Add passive pointer Preview, animated displacement, reduced-motion support,
  responsive recipes, shared radius and an explicit filled surface variant.
- Expose Atom activation and auto-scroll controls; retain visible direct
  movement alternatives and controlled final-order semantics.
- Scale movement controls and use grab/grabbing cursors; keep outline
  transparent and disabled handles free from hover treatment.

- Add the initial `ReorderableList` namespace with outline and soft recipes,
  three sizes, accessible handles and direct movement controls, insertion
  feedback, logical orientation, container-responsive narrow composition, and
  published Atom 0.23.0 behavior.

## Unreleased — layout motion

- Added row-major grid targeting and spatial keyboard movement.
- Replaced fixed single-axis displacement with collection-level measured layout projection and committed FLIP.
- Added an indicator-only `displacement="none"` escape for unsupported CSS layouts.

- Keep a decorative six-dot grip visible in the default pointer preview; custom preview content remains fully author-owned.

- Keep the grabbing cursor throughout pointer reordering and restore authored cursors when the drag ends.
