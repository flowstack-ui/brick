# Brick Playground Evidence

The playground is exhaustive package evidence, not a marketing demo. Follow
the repository `AGENTS.md`, exact-version Brick and Atom Agent Knowledge, and
`docs/contributing/playground.md` before changing a route or the shell.

## Required workflow

1. Resolve the exact package guidance for the selected owner.
2. Read `component-evidence-contract.json` and the component's public guide.
3. Keep the route, scenario array, behavior spec, visual spec, manual protocol,
   public docs, changelog, and workbook sheet aligned in the same change.
4. Use Brick components for ordinary layout, responsive visibility, paint,
   scrolling, navigation, controls, icons, images, lists, and typography.
5. Run the focused component browser and visual commands, then the repository
   gate when shared playground code changes.

## Page rules

- Give every scenario a stable component-prefixed ID, number, title, and plain
  description. Keep its content deterministic.
- Use `SpecimenLabel` for controlled comparison cells. Put it at the logical
  top-left and place the example after it through `VStack` or another explicit
  Brick layout owner.
- Use `Grid` for repeated two-dimensional comparisons and `Stack` for one
  primary axis. Use `Frame` for local size constraints and `ScrollArea` only
  when a named ancestor gives it a definite size.
- Do not duplicate content merely to change row/column arrangement. Use
  responsive Stack or Grid values. Use Show/Hide only when the interface itself
  changes.
- Do not use route visibility as visual evidence. Every component visual owner
  must capture at least one reviewed, risk-selected screenshot.
- Default environments are accessibility, appearance, forced colors, mobile,
  RTL, and zoom. Add the feature-specific motion, portal, and scroll evidence
  declared in `component-evidence-contract.json`; record an explicit reason
  when an environment is not applicable.

## Shared shell rules

- Preserve one main landmark, a real Sidebar Panel, a bounded sidebar
  ScrollArea, a Drawer for mobile navigation, and route-backed NavList links.
- Keep application policy such as sticky offsets and route state in the shell.
  Ordinary gap, tracks, wrapping, size constraints, and responsive arrangement
  belong to Brick layout components.
- A scroll test must prove overflow exists and that scroll position changes.
  A remembered value of zero is not scrolling evidence.

## Evidence truth

- Automated checks use `tested`; human-reviewed screenshots and manual steps
  use `verified` only after the review is actually recorded.
- Never prefill manual results or mark the workbook verified from file
  existence alone. Unavailable physical-device or assistive-technology work is
  `blocked`, with the unavailable environment named.
- Run `npm run verify:playground-contract` before committing.
