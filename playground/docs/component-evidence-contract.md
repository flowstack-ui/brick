# Component Evidence Contract

`playground/component-evidence-contract.json` is the closed machine-readable
inventory for the 95 public Brick component owners. It complements, and never
replaces, each component's public Agent Knowledge and guide.

Every owner requires a route, unit and type owners, a browser behavior spec, a
risk-selected visual spec with at least one real snapshot, an unfilled manual
protocol until a human run occurs, public documentation, a changelog, and one
coverage-workbook sheet.

The default environment set applies to every owner because the playground shell
can change appearance, direction, width, zoom, and accessibility conditions.
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
