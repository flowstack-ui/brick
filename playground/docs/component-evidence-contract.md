# Component Evidence Contract

AspectRatio is the first documentation-style owner. Its default route contains
linked docs examples; `?qualification=1` preserves exhaustive scenarios and
their stable IDs. PreviewContext-selected scenarios continue to use the evidence
view. Tests must explicitly choose the view they assert; do not silently delete
coverage when simplifying the public page. Other owners remain unchanged.

Documentation rails belong to the shared shell's two-column layout, alongside
the page header and body together. Do not wrap only the component examples:
that starts the rail beside Preview/Code instead of the main title. Preserve
header spacing with public layout props and assert title/rail top alignment,
sticky navigation after scrolling, and hidden rails on narrow viewports.

`playground/component-evidence-contract.json` is the closed machine-readable
inventory for the public Brick component owners. Its current count is validated
from package ownership rather than duplicated in this prose. It complements, and never
replaces, each component's public Agent Knowledge and guide.

Every owner requires a route, unit and type owners, a browser behavior spec, a
risk-selected visual spec with at least one real snapshot, an unfilled manual
protocol until a human run occurs, public documentation, a changelog, and one
coverage-workbook sheet.

The default environment set applies to every owner. App-bar settings control
appearance and example direction; browser automation controls viewport width. Browser/OS
settings own zoom and accessibility media conditions; app CSS does not emulate them.
Component checks may be compact when the environment does not materially change
the result, but absence must be an explicit not-applicable decision rather than
an accidental omission. Motion, portal, and bounded-scroll owners receive the
additional feature checks recorded in the contract.

Categories describe the developer's selection intent. They are not package
ownership layers. In particular, Typography groups authored text presentation,
Forms includes Segment Group, Feedback includes passive Status, and Link Box
remains Navigation. A future standalone Listbox would require a separate public
component proposal and is not implied by this inventory.

`npm run verify:playground-contract` checks the closed inventory, route
categories, required owners, screenshot ownership, scenario identifiers, and
manual-protocol truth before the expensive build and browser gates run.

The `reviewStandards` lists close the gap between “a page exists” and “the page
is reviewable.” Reviewed owners must keep shared top-start specimen labels;
components with public visual properties must pair exact code with a live
preview; paint-owning reviewed components must show explicit matched light and
dark specimens. The verifier reads the page source (including the shared
Show/Hide evidence owner) so removing these patterns fails before screenshots
can conceal the regression.

## Inline playground and standalone test runner

Register the Page and its scenarios together in the canonical app module table,
then run `node scripts/build-preview-registry.mjs`. The generated registry pairs
the runtime module with its real source and automatically adopts the shared
Scenario runner. Do not hand-copy source strings or add a second example implementation.
Keep hooks with effects inside the example they exercise; never mutate the parent
document, its settings, or overlay layers from a component Page.

All docs routes render original inline examples without added iframe boxes or
per-example toolbars. Settings belong in the app bar. The standalone runner is
internal test infrastructure, not the normal docs UI. `?testMode=1` makes owner
evidence settings deterministic. Existing mixed appearance/locale/direction scopes remain
intentional and take precedence over inherited environment settings.

Run `node scripts/verify-preview-environment.mjs` and the catalog/runtime browser
suites after changing this infrastructure. The production playground build runs
the registry, source pairing, settings anatomy and preset artifact checks.

Use `Popover.Content > Popover.Header + Popover.Body` for settings. Header owns
title/description padding; Body owns scrolling. A whole-panel ScrollArea/Frame
wrapper breaks those regions. Test actual title inset and short-screen action
reachability, not only an outer bounding box. Component defects belong in Brick
or Atom, not in shell CSS. Documentation must explain forbidden composition and
the supported alternative; automated guards enforce concrete recurring failures.
