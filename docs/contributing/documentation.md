# Component Documentation

Every independently exported public component owns:

- `docs/components/<component>/README.md`
- `docs/components/<component>/CHANGELOG.md`

It must also appear exactly once in both public entry points:

- the categorized component index in `README.md`;
- the categorized component index in `docs/README.md`.

The README is the public usage contract for the released package. It explains
what a consumer can rely on without exposing private planning or repository
history. Start from `docs/components/_template/`.

The component changelog records observable changes to that public contract.
It is not a development diary, evidence log, or dependency-upgrade ledger.

## Source-of-truth order

Write or review a component guide against these sources in order:

1. the current public source and subpath export;
2. the exact installed Atom public types and released behavior;
3. the adopted private component contract, when available to the maintainer;
4. focused type, component, browser, visual, and manual evidence;
5. the component playground route.

Source decides what exists. The adopted contract decides what is intentionally
public. Tests and playground evidence prove claims; they do not create API.
Never copy private research, migration history, machine paths, or unreleased
plans into the public guide.

## Required README structure

Use these level-two sections in this order:

1. `When and where to use`
2. `When not to use`
3. `Installation and imports`
4. `Quick start`
5. `Anatomy and DOM ownership`
6. `API`
7. `Visual recipes and states`
8. `Tokens and CSS hooks`
9. `Customization`
10. `Responsive behavior`
11. `Accessibility`
12. `Composition, native props, and refs`
13. `Examples`
14. `Evidence`
15. `Changelog`

The title is the human-readable component name. A short opening paragraph
states its public purpose and boundary. A section may say `Not applicable`
with the reason, but must not be removed merely because the component is
simple.

## Accuracy requirements

- Document every public export, part, component-owned prop, allowed value, and
  default. Separate inherited Atom/native behavior from Brick visual props.
- Show the default rendered element, public parts, ref target, and any
  Brick-added DOM. Identify decorative or private anatomy as non-public.
- State semantic differences such as action versus navigation; do not describe
  an Atom capability as Brick implementation.
- List only adopted public tokens, stable classes, default slots, public visual
  attributes, and relevant Atom state attributes. A CSS variable appearing in
  source is not automatically a public customization promise.
- State supported recipes and observable states without duplicating internal
  CSS declarations.
- Name exclusions that prevent likely misuse or false API assumptions.
- Keep examples short, accessible, copyable, and limited to public imports.
  Every example must typecheck or be exercised by repository evidence.
- Link the component playground, focused unit/type/browser/visual owners, and
  manual protocol in `Evidence`.
- Use the exact released dependency version only when it materially affects
  consumer behavior. Do not preserve obsolete implementation history.

## Maintenance gate

Review the guide whenever public source, defaults, exports, anatomy, recipes,
states, tokens, composition, or consumer responsibilities change. Update the
component changelog for every observable change and the package changelog for
release-facing changes.

A component documentation review is complete only when:

- all required sections exist in the required order;
- API values and defaults match public types and implementation;
- DOM, slots, state attributes, and tokens match adopted source;
- examples use valid public imports and supported combinations;
- evidence links resolve to component-owned files;
- both public documentation indexes link to the component guide exactly once;
- the guide contains no private paths, stale versions, or future API stated as
  current behavior.

Documentation is a release gate, not follow-up work.

## Component changelog contract

Each component changelog:

- starts with the human-readable component name and states that it follows the
  package version;
- keeps current work under `## Unreleased`;
- uses only applicable Keep a Changelog categories such as `Added`, `Changed`,
  `Deprecated`, `Removed`, `Fixed`, or `Security`;
- records consumer-visible API, semantics, DOM, CSS, token, accessibility,
  responsive, and visual changes;
- describes the resulting public behavior, not internal implementation steps,
  test organization, private research, or obsolete dependency versions;
- links to migration guidance when a change requires consumer action;
- omits documentation-only corrections unless they repair a materially false
  public instruction that consumers may have followed.

Before closing component work, compare the changelog to the source diff and
the package changelog. Every observable component change belongs in both
places when release-facing; neither file should duplicate private history.

## Package changelog contract

The root `CHANGELOG.md` is the release-facing summary across the package. It:

- starts with `# Changelog` and keeps current work under `## Unreleased`;
- uses the same Keep a Changelog categories as component changelogs;
- names every newly released component and consolidates related component
  entries without hiding consumer-relevant differences;
- records the resulting public package behavior, including migrations and
  breaking changes when applicable;
- omits test counts, evidence inventories, review milestones, tooling changes,
  private plans, and dependency-version ledgers;
- remains consistent with every affected component changelog.

Package-level detail should help a consumer decide whether and how to upgrade.
Component-specific implementation history belongs nowhere in the public
changelog system.

## Commands

Run the focused documentation gate while working:

```sh
npm run docs:component -- <component>
```

Run `npm run docs:component` to verify every component. The repository-wide
`npm run check` command includes this all-component documentation gate.

Components with a source-backed semantic manifest also run through:

```sh
npm run docs:component:semantic
npm run docs:component:semantic -- button
```

This gate compares the adopted documentation manifest with actual exports,
closed recipes, implementation defaults, visual attributes, CSS definitions,
and README claims. Every released component must remain covered; add a manifest
only after auditing the component's source and adopted public hooks.
