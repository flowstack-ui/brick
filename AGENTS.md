# AGENTS.md — @flowstack-ui/brick

This repository contains the public `@flowstack-ui/brick` package.

## Boundary

- Use public `@flowstack-ui/atom` entrypoints only.
- Keep the package framework-neutral and independent of application code.
- Source belongs in `src/`, tests in `test/`, package scripts in `scripts/`,
  public documentation in `docs/`, exhaustive component evidence in
  `playground/`, and realistic package composition in `apps/consumer/`.
- Do not edit or commit `dist/`, `.brick-cache/`, coverage output, playground
  build output, or `node_modules/`.
- Public JavaScript must never require consumers to run a CSS processor.
- Public CSS classes and variables use the `brick-` and `--brick-` prefixes.
- Components use public Atom behavior directly; do not create local headless
  primitives or compatibility wrappers.
- Classify behavior, semantics, accessibility, focus, interaction, state,
  portals, positioning, and headless composition as Atom-owned before writing
  Brick code.
- If implementation exposes missing or incorrect Atom behavior, stop the
  affected slice. Fix and verify Atom in its repository, release Atom through
  its GitHub Actions workflow, verify the published package, then upgrade
  Brick's exact Atom dependency and rerun regressions. Do not reproduce the
  behavior inside Brick or depend on an unpublished Atom checkout.
- Every component requires implementation, tests, playground evidence, public
  documentation, and a component changelog before release.
- Before changing `playground/component-coverage.xlsx`, read
  `playground/docs/coverage-workbook.md` and preserve its formulas, validation,
  formatting, and completion rules.
