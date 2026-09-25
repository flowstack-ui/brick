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

For an explicitly requested reference-docs migration, begin with the reference's
simple basic specimen and preserve its applicable example sequence. Give each
feature its own titled Preview/Code section; do not replace sizes, variants,
striping, captions or scrolling with one complex workflow. Place additional
Brick-only capabilities and application integrations after the reference
examples. Keep exhaustive qualification scenarios on their existing route.
Tests must assert this structure as well as behavior; a functional showcase is
not evidence of reference-page parity.

Each docs example teaches one capability or meaningful composition through one
representative use case. Do not enumerate every placement, tone or state on the
main page. Keep exhaustive matrices and light/dark specimens in qualification;
shared appearance controls serve docs. Avoid unrelated props, diagnostic counters
and arrows in examples about other features. Use intrinsic trigger widths unless
width is the feature. Verify painted joins, not just bounding-box contact.

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

## Copy-owned composition demonstrations

`compositionEntries` is a separate navigation inventory, not an extension of
the public component/API owner matrix. The Rich Text Editor route embeds only
deterministically exported, source-leak-checked compiled assets. Paid source,
raw code tabs and source-local props remain in the private Blocks catalog.
It is an explicit iframe exception required by that distribution boundary,
not authorization to iframe ordinary component routes. Its theme bridge loads
the same compiled preset artifacts and updates settings without reloading or
discarding the edited document. Do not link a composition to a nonexistent
Brick source directory or add it to public Agent Knowledge component coverage.

`npm run verify:playground-contract` checks the closed inventory, route
categories, required owners, screenshot ownership, scenario identifiers, and
manual-protocol truth before the expensive build and browser gates run.

The `reviewStandards` lists close the gap between “a page exists” and “the page
is reviewable.” Reviewed owners must keep shared top-start specimen labels;
components with public visual properties must pair exact code with a live
preview; paint-owning reviewed components must retain explicit matched light and
dark specimens in qualification evidence, not duplicated on the normal docs page.
The verifier reads the page source (including the shared
Show/Hide evidence owner) so removing these patterns fails before screenshots
can conceal the regression.

## Inline playground and standalone test runner

### Props sections and table-of-contents hierarchy

When a page documents multiple public parts, place each props table inside a
level-3 DocsSection under Props. Give it a visible short part title (Root,
Anchor, Item) and a brief explanation of which element owns those props.
For an unnamed root export, use its real component name (for example Stack),
not an invented Root API. Retain the full API name in the table's accessible
label. A lone props table does not require an extra subsection.

Register every part subsection immediately after Props in the page's section
metadata at level 3. Use that same metadata for DocsSection and the TOC so
names, anchor IDs and nesting cannot drift. Browser checks must verify visible
headings, correctly scoped tables, and TOC links navigating to their matching
sections. Do not rely on aria-label alone to explain adjacent tables.

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
