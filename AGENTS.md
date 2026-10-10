# AGENTS.md — @flowstack-ui/brick

This repository contains the public `@flowstack-ui/brick` package.

## FLOWSTACK Agent Workflows

Choose the primary workflow before doing task work. Review-only or diagnostic
requests use `$flowstack-ui-review`. Package source, component API, Agent
Knowledge, dependency, qualification, or release work uses
`$flowstack-ui-maintainer`. A supplied application-plan composition in the
Consumer or playground uses `$flowstack-ui-compose` only when it does not
change package-owned behavior. Other consumer-style implementation uses
`$flowstack-ui-builder` under the same boundary. The more specific route wins;
all public component changes use Maintainer.

If the matching skill is not discoverable, read its canonical `SKILL.md` from
an installed or checked-out `flowstack-ui/agent-tools` repository and follow
that workflow manually. If neither is available, preserve the mapping, resolve
exact-version package Agent Knowledge directly, and report the missing skill
instead of substituting remembered guidance.

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
- Before theme-contract, token, appearance, or cascade work, read
  [`docs/guides/theme-contract.md`](docs/guides/theme-contract.md) and preserve
  the generated `flowstack.brick-theme-contract.v2` boundary. Constrained inputs
  require the compatible Theme reader; do not publish v2 before that reader.
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
- Read [`docs/contributing/README.md`](docs/contributing/README.md) before
  component work. One public component owns one primary component test,
  browser spec, manual protocol, public guide, changelog, and workbook sheet;
  integration evidence cannot replace those files.
- Before changing `playground/component-coverage.xlsx`, read
  `playground/docs/coverage-workbook.md` and preserve its formulas, validation,
  formatting, and completion rules.

## Playground infrastructure

- Multipart props documentation must give every table a visible part heading
  and short ownership description, with matching level-3 links under Props in
  the TOC. Use short part names (Root, Anchor, Item), or the actual container
  name when it has no Root export (Stack). Share section metadata between
  headings and TOC; accessible table labels alone are insufficient. A single
  props table needs only Props. Follow `playground/docs/component-evidence-contract.md`.

- App-bar settings changes do not authorize converting examples into iframes,
  adding per-example toolbars, viewport boxes or changing page composition.
  Keep ordinary routes inline. Such a presentation migration requires its own
  explicit user request, not an inferred testing-infrastructure improvement.

- Before shell, settings or preview work, read
  `playground/docs/component-evidence-contract.md`,
  `playground/docs/surface-ownership.md`, and `playground/src/preview/README.md`.
- Keep infrastructure changes separate from redesigning component examples.
- Format copyable `playground/src/components/*/examples/*.tsx` source with
  `npm run format:playground-examples`; verify with
  `npm run verify:playground-examples`. Keep displayed raw source identical to
  the executable example, with no test-only IDs. Use shared preview wrappers
  and component anatomy for test locators. The playground build enforces this.
  Preserve the existing Page source and owner evidence unless the task includes
  changing that component. Do not invent a new approval checkpoint after the
  owner has authorized the implementation; report genuine blockers explicitly.
- Read the exact component anatomy before adding layout/scroll wrappers. Built-in
  padded and scrolling regions must retain their ownership. For a settings
  Popover, use direct Header and Body regions, not a whole-panel ScrollArea.
- Add a regression for the actual failure: measure inner inset, scroll to the
  final action on a short viewport, and verify focus return. A build, outer-box
  check or screenshot alone does not establish correct composition.
- Regenerate preview registry/inventory after changing registered Page source;
  run the preview contract and inline-shell/standalone tests. Never claim a full
  component visual/accessibility review from catalog smoke alone.
