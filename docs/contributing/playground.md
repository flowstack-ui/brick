# Playground Evidence

The playground is Brick's deterministic, exhaustive component evidence
surface. It is not a demo application and it does not replace the Consumer.

## Component route

Give each component a navigable route and a navigation entry. Keep its
scenarios in a component-owned module instead of extending one unbounded
application file.

Keep routing, the shared shell, shared scenario styles, and component evidence
separate. Component-specific CSS belongs beside its page. Do not retain
duplicate or compatibility playground implementations after their evidence
has moved to component ownership.

Number and label scenarios so tests, manual protocols, workbook rows, and
reviewers can refer to the same state. Include, when applicable:

1. canonical finished state
2. every public recipe and size
3. content and icon combinations
4. interactive and validation states
5. disabled, loading, and unavailable states
6. long content, localization, and constrained width
7. dark appearance and token overrides
8. right-to-left direction
9. reduced motion, forced colors, and other relevant preferences
10. cross-component composition explicitly promised by the contract

Scenarios must not depend on current time, random values, external network
requests, animation timing, or test order. Add stable semantic labels or
component-owned scenario identifiers; do not design the page around brittle
CSS selectors.

## Controlled comparisons

Keep every specimen on the component defaults except for the exact prop, state,
or environment named by its scenario. Repeat the same representative content
across a comparison so label length or content structure does not obscure the
dimension under review.

Representative content must be realistic, short, and unambiguous. A visible
label and its entered value, status, description, or action text must not
repeat the same words unless that repetition is itself the evidence. Reuse the
same label/value pair across controlled comparisons, but give each part a
distinct meaning so reviewers can identify what they are reading.

Intentional multi-axis evidence, such as a complete variant-by-tone matrix, is
allowed when the scenario names both dimensions. Composition, semantic
hierarchy, stress, and customization may depart from defaults only when the
departure is part of the stated evidence; do not add unrelated recipe props.

Use the shared playground specimen label for titles inside comparison cells.
It renders Brick Badge explicitly as `soft`, `neutral`, `sm`, and `rounded` so
labels remain consistent without competing with the component under review.
Headings, code output, and appearance identifiers retain their own semantics
and must not be converted into specimen badges.

## Specimen layout and state styling

Comparison cells must align their specimens from the same logical starting
edge. Interactive state, validation text, conditional output, or differing
content must not push one peer lower than another unless the layout shift is
the behavior being tested. Use the shared preview-grid alignment utilities
before adding component-specific offsets, fixed heights, or spacer elements.

Decorative parts, adornments, badges, icons, clear actions, and loading
indicators must remain inside the component boundary in every supported size,
direction, and constrained width. Check both physical containment and logical
placement: start/end behavior must reverse correctly in RTL while visual
centering, hit targets, and spacing remain stable.

State examples should change only the visual properties promised by the
component contract. For example, an invalid state must not introduce an
uncontracted fill, shadow, size, or layout change merely to make the state more
obvious. Customization examples must visibly demonstrate the exact documented
override without obscuring focus, text, or contrast.

## Rendered output

When the scenario tests resulting markup—such as `render`, `asChild`,
generated or explicit IDs, `aria-*` relationships, native elements, forwarded
attributes, slots, or adapter attributes—show the live result and its actual
rendered HTML side by side. Capture the DOM rather than maintaining a
hand-written example, and keep state attributes current as the specimen
changes.

Do not add rendered HTML to ordinary recipe, content, layout, or stress
comparisons where markup is not the evidence.

## Visual ownership

Visual specs and reviewed snapshots belong beside each component’s browser
owner:

```text
playground/tests/components/<component>/visual.spec.ts
playground/tests/components/<component>/visual.spec.ts-snapshots/
```

Keep the set risk-based rather than exhaustive. Cover the canonical result,
important visual dimensions, high-risk states, narrow/RTL behavior, and
relevant dark or forced-color boundaries. Update a component’s snapshots only
for an intentional reviewed change; never refresh every baseline simply to
clear failures.

When capturing a tall scenario state, exclude sticky playground shell chrome
from the screenshot or otherwise ensure it cannot cover the scenario evidence.
The shell may remain visible in ordinary page review, but it is not component
evidence and must not obscure a baseline.

Before calling a page complete, inspect every scenario at normal desktop width,
its documented narrow width, RTL, and each appearance it claims. Compare peer
bounding boxes and component boundaries rather than relying only on visual
impression. Add browser geometry assertions for regressions such as unequal
vertical starts, clipped or overflowing parts, misplaced logical adornments,
or content touching a focus/border edge. Review the resulting screenshots
after the assertions pass.

## Division of responsibility

- The playground makes contract states observable.
- Playwright asserts browser behavior and selected computed results.
- Screenshots protect representative visual risks.
- The manual protocol records human judgment.
- The Consumer proves realistic use of the packed public package.

These surfaces may use the same scenario, but none substitutes for another.
