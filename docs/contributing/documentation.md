# Component Documentation

Every public component owns:

- `docs/components/<component>/README.md`
- `docs/components/<component>/CHANGELOG.md`

Start from `docs/components/_template/`. The guide must describe purpose,
when to use and avoid, installation/imports, anatomy, exact API and defaults,
examples, accessibility, keyboard behavior, appearance, responsive behavior,
tokens and CSS hooks, composition, and known exclusions.

Every public example must typecheck or be exercised by repository evidence.
Names, defaults, anatomy, states, and tokens must match source, tests,
playground scenarios, and the approved product contract. Do not document an
Atom capability as if Brick implemented it.

Update the component changelog for any observable component change and the
package changelog for a release-facing package change. Documentation is a
release gate, not a follow-up task.
