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
4. Map every promise to exactly one primary evidence layer before coding.
5. Create one component-owned file in each applicable evidence surface. Do not
   append a new component to a family or neighboring component file.

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

## Evidence gate

A row is complete only when the named assertion exists and passes. Rendering a
part nearby, sharing a family test, or inheriting a percentage from the
workbook is not evidence.

During development run `npm run test:component -- <component>` first. Before
release, run every command and human gate in
[Releasing](../guides/releasing.md).

## Change work

For an intentional public change, update the approved product contract before
source. Then update every affected evidence surface in the same workstream.
For a defect, add the smallest failing test at the owning layer first. If that
layer is Atom, release Atom and upgrade Brick's exact dependency before
finishing the Brick change.
