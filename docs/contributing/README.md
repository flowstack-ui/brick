# Contributing to Brick

Use this index for component work. A component is not complete because its
source renders; every applicable evidence surface must agree.

## Task routes

| Task | Read |
| --- | --- |
| Build or change a component | [`component-workstream.md`](component-workstream.md) |
| Choose and run tests | [`../guides/testing.md`](../guides/testing.md) |
| Add playground evidence | [`playground.md`](playground.md) |
| Run owner review | [`manual-testing.md`](manual-testing.md) |
| Update the workbook | [`../../playground/docs/coverage-workbook.md`](../../playground/docs/coverage-workbook.md) |
| Update public documentation | [`documentation.md`](documentation.md) |
| Prove package integration | [`consumer-verification.md`](consumer-verification.md) |
| Release | [`../guides/releasing.md`](../guides/releasing.md) |

## Non-negotiable ownership

One public component owns one primary component test, browser spec, manual
protocol, public guide, changelog, and workbook sheet. Integration tests may
cover multiple components, but they do not replace any component's primary
evidence.

Brick tests only what Brick owns or adapts. Reusable behavior, semantics,
accessibility, state, focus, interaction, positioning, portals, and headless
composition belong in Atom first.
