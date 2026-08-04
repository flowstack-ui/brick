# Component name

One short paragraph describing the component's public purpose and its Brick
boundary.

## When and where to use

Explain the general-purpose situations this component is designed for.

## When not to use

Name misuse cases, the correct related component or Atom primitive, and
important exclusions that consumers could otherwise assume are supported.

## Installation and imports

Show the root export, stable component subpath, and complete stylesheet as the
recommended default. Then show the optional route-aware alternative:
`styles/core.css` once plus the exact component stylesheet. State that modular
styles replace rather than accompany `styles.css` and `tokens.css`, and that
consumers must load a stylesheet for every Brick component the route renders.

## Quick start

Provide the shortest finished and accessible example using public imports.

## Anatomy and DOM ownership

Document each public part, default rendered element, ref target, backing Atom
part, and any Brick-added DOM. Mark decorative or implementation-only anatomy
as private.

## API

Document every public export and component-owned prop in tables with allowed
values and defaults. Describe inherited Atom/native behavior separately.
Explicitly list important exclusions.

## Visual recipes and states

Describe each supported recipe dimension and observable state. Explain what
changes and what remains stable without reproducing the stylesheet.

## Tokens and CSS hooks

List only adopted public component tokens, stable classes, default slots,
public visual attributes, and relevant Atom state attributes. Distinguish
public hooks from private implementation variables or elements.

## Customization

Show the supported order: props, semantic tokens, component tokens, compound
parts, then `className` and `style` escape hatches.

## Responsive behavior

Explain constrained-width behavior, zoom/reflow, wrapping, directionality,
localization, and which responsive layout decisions remain application-owned.

## Accessibility

Document semantics, accessible naming, keyboard and focus behavior, target
size, contrast, unavailable/loading states, preferences, and consumer
responsibilities.

## Composition, native props, and refs

Document `asChild`, `render`, native prop forwarding, form behavior, and the
exact ref target when applicable. State `Not applicable` with a reason when the
component exposes no composition path.

## Examples

Provide practical, copyable examples exercised by tests or the playground.

## Evidence

Link the component playground route, focused unit test, type owner, browser
spec, visual spec, manual protocol, and any relevant integration consumer.

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
