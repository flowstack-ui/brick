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

- Documentation Props sections use shared PropsTable and owner-local typed rows.
  Read shared/PropsTable.md under playground/src for its source/default,
  composition and narrow-screen rules. Do not list reference-library props that
  Brick does not expose or expand the table with every native HTML attribute.

- Documentation-style pages use shared DocsSection, ExamplePreview and
  ExampleSource: one linked title, secondary Paragraph description and one
  Preview/Code pair per feature, with related values compared together. Use
  Heading for section hierarchy. Never append exhaustive qualification panels
  to a migrated docs page. Preserve their stable scenario IDs and separate
  qualification access for browser/manual evidence. Do not migrate other pages
  unless requested. This overrides legacy numbered-specimen presentation for
  the explicitly migrated documentation owners only.

- Omit redundant props after checking both the component default and its parent
  layout. Frame defaults to auto inline size, not 100%; in normal block flow or
  a stretching column layout, use only `maxInlineSize` when that already gives
  the intended bounded width. Keep explicit `inlineSize="100%"` when the actual
  composition requires it (for example, a non-stretching flex parent). Do not
  add it mechanically or ban it globally. Verify narrow and wide layouts after
  removing sizing props.
- Give every scenario a stable component-prefixed ID, number, title, and plain
  description. Keep its content deterministic.
- Use `SpecimenLabel` for controlled comparison cells. Put it at the logical
  top-left and place the example after it through `VStack` or another explicit
  Brick layout owner.
- In documentation comparisons, put a value inside the specimen when its
  content naturally serves as the label (for example, plain or radius control
  in a centered AspectRatio). Do not repeat an external label and identical
  placeholder content in every item. Keep external labels when necessary to
  understand clipping, content layout or the specimen's own semantics.
- Use `EvidenceGroup` when one scenario demonstrates independent dimensions
  such as sizes and variants. Give each group a heading and description, then
  place one value per `Specimen` in a responsive row.
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
