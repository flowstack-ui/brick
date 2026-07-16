# AGENTS.md — @flowstack-ui/brick

This repository contains the public `@flowstack-ui/brick` package.

## Boundary

- Use public `@flowstack-ui/atom` entrypoints only.
- Keep the package framework-neutral and independent of application code.
- Source belongs in `src/`, tests in `test/`, package scripts in `scripts/`,
  public documentation in `docs/`, and the repository-only development app in
  `playground/`.
- Do not edit or commit `dist/`, `.brick-cache/`, coverage output, playground
  build output, or `node_modules/`.
- Public JavaScript must never require consumers to run a CSS processor.
- Public CSS classes and variables use the `brick-` and `--brick-` prefixes.
- Components use public Atom behavior directly; do not create local headless
  primitives or compatibility wrappers.
- Every component requires implementation, tests, playground evidence, public
  documentation, and a component changelog before release.
