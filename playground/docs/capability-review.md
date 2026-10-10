# Capability review

An owner is not fully qualified just because its route and test files exist.
For each public API change, review the capability-to-example inventory before
implementation, then qualify the rendered examples after the build.

`recent-component-capabilities.json` records the minimum reviewed scenario
inventory for the recent component family, a concrete browser assertion and
the independent manual protocol. Its named assertion proves only what that
test asserts, not every capability in the owner. Focused owner tests carry the
remaining behavioral assertions. Manual status stays open until actually run.

The repository validator rejects stale scenario inventories and missing named
assertions. The integration suite checks actual rendered order, missing
scenarios, runtime exceptions and narrow/wide page overflow. Neither substitutes
for examining spacing, typography, theme paint, focus, states and geometry.

When adding a component or capability:

1. List supported modes, sizes, recipes, state and composition branches.
2. Map each meaningful capability to a labelled example. Avoid conflating a
   different size with a different variant in a size comparison.
3. Add precise assertions for changed behavior and geometry. Add the owner to
   the ledger and include it in the integration run.
4. Inspect light/dark, narrow/wide, direction and focus output. Update a visual
   baseline only after reviewing the intended change.
5. Update public docs, Agent Knowledge and the manual protocol. Keep exclusions
   explicit; an unsupported Chakra feature must not be described as hidden in
   the playground. Time-only input and application scheduling are not promised
   by the current date-family contract.

FormatNumber and FormatByte inherit typography through a span; For and
LocaleProvider do not introduce a DOM host. Passive Checkmark/Radiomark need
an accessible parent or visible text, not their own interaction semantics.
