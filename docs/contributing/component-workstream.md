# Component Workstream

This is the public repository execution order for one approved component. The
private product contract, when available to a maintainer, decides what to
build; this guide decides how evidence is represented in this repository.

## Before implementation

1. Confirm the requirement is visual/styled Brick work rather than reusable
   Atom behavior.
2. Confirm the released, exact Atom dependency exposes every required
   primitive capability. Never implement around a missing Atom capability.
3. Name the component's public anatomy, API, visual recipes, states,
   accessibility promises, responsive behavior, tokens, CSS hooks, and
   exclusions.
4. Audit collisions between Brick semantic props and inherited native
   attributes before finalizing the API. Rename or intentionally omit the
   native attribute when one public prop name cannot represent both meanings
   safely.
5. Map every promise to exactly one primary evidence layer before coding.
6. Create one component-owned file in each applicable evidence surface. Do not
   append a new component to a family or neighboring component file.
7. Choose one realistic, semantically distinct content set for controlled
   playground comparisons. Labels, values, descriptions, statuses, and actions
   must be understandable without repeating placeholder words.

## Implement together

- `src/components/<component>/` — React adapter and static CSS
- root and subpath exports — public runtime and type surface
- `test/components/<component>/<component>.test.tsx` — Brick-owned DOM and
  adapter contract
- `test/types/components/<component>.test.ts` — focused type owner, with
  positive and negative public API matrices retained in `test/types/`
- `test/package/` — exports, CSS, server, tarball, and boundary checks
- `playground/tests/components/<component>/behavior.spec.ts` — real-browser
  contract
- component-owned visual baselines — only risk-selected states
- `playground/manual-tests/<component>.md` — numbered owner judgments
- deterministic playground route — every contract scenario is findable
- `docs/components/<component>/` — guide and changelog
- `playground/component-coverage.xlsx` — assertion-level evidence rows
- `apps/consumer/` — realistic packed-package composition when applicable

For layout-sensitive components, implement browser geometry assertions with
the playground rather than waiting for screenshot review. Cover aligned peer
starts, containment of conditional parts and adornments, logical RTL
placement, and the inset between content and its border/focus boundary.
State-specific CSS must change only the properties promised by the contract.

## Documentation reconciliation

Before the component is considered complete:

1. Read the final public source and subpath exports rather than copying the
   brief or playground prose.
2. Reconcile every public export, prop, value, default, rendered element, ref,
   composition path, state, slot, class, attribute, and adopted token with the
   component README.
3. Verify that examples use supported public imports and accessible
   combinations.
4. Link the component-owned unit, type, browser, visual, manual, and playground
   evidence.
5. Compare the source diff with the component and package changelogs. Record
   every observable change and remove implementation-only or stale dependency
   history.
6. Run `npm run docs:component -- <component>`.

## Visual reconciliation

Before completion:

1. Inspect every playground scenario at normal and narrow widths.
2. Inspect every claimed appearance and RTL behavior.
3. Confirm controlled comparisons keep the same defaults and content except
   for their named variable.
4. Confirm peer specimens align and conditional content does not create
   accidental vertical offsets.
5. Confirm icons, adornments, actions, loaders, and text remain centered or
   logically placed and contained by the component.
6. Confirm state styling adds no undocumented background, spacing, sizing, or
   contrast change.
7. Run the focused browser and visual owners, then inspect each changed
   snapshot rather than accepting an update command as review.

## Evidence gate

A row is complete only when the named assertion exists and passes. Rendering a
part nearby, sharing a family test, or inheriting a percentage from the
workbook is not evidence.

During development run `npm run test:component -- <component>` and
`npm run docs:component -- <component>` first. Before release, run every
command and human gate in
[Releasing](../guides/releasing.md).

## Change work

For an intentional public change, update the approved product contract before
source. Then update every affected evidence surface in the same workstream.
For a defect, add the smallest failing test at the owning layer first. If that
layer is Atom, release Atom and upgrade Brick's exact dependency before
finishing the Brick change.
