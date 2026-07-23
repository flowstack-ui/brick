# Playground Evidence

The playground is Brick's deterministic, exhaustive component evidence
surface. It is not a demo application and it does not replace the Consumer.

## Component route

Give each component a navigable route and a navigation entry. Keep its
scenarios in a component-owned module instead of extending one unbounded
application file.

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

## Division of responsibility

- The playground makes contract states observable.
- Playwright asserts browser behavior and selected computed results.
- Screenshots protect representative visual risks.
- The manual protocol records human judgment.
- The Consumer proves realistic use of the packed public package.

These surfaces may use the same scenario, but none substitutes for another.
