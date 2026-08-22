# Show

Show keeps content mounted and adds it to visual layout from one fixed viewport breakpoint. It is CSS responsive visibility, not conditional React rendering. When visible, its host is layout-transparent so parent flex and grid spacing continue to apply directly to its children.

## When and where to use

Use Show for a secondary desktop treatment when deterministic SSR and always-mounted children are appropriate.

## When not to use

Do not use Show to prevent effects, fetching, state initialization, or access to essential functionality. Use application CSS for custom/container queries and React conditionals for actual mounting.

## Installation and imports

```tsx
import { Show } from "@flowstack-ui/brick";
// or from "@flowstack-ui/brick/show"
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/show.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Exports: `Show`, `ShowProps`, `ShowBreakpoint`, and `ShowElement`.

## Quick start

```tsx
<Show from="md"><nav aria-label="Workspace">Desktop tools</nav></Show>
```

## Anatomy and DOM ownership

Show renders one native host, `div` by default, with `.brick-show`, `data-from`, and `data-slot="show"`. The host remains in the DOM and the ref targets it, but its visible `display: contents` layout contributes no wrapper box. Children are not inspected or conditionally rendered.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `from` | `sm`, `md`, `lg`, `xl` | required |
| `as` | `div`, `span`, `section`, `article`, `nav`, `header`, `footer`, `main`, `aside`, `ul`, `ol`, `li` | `div` |
| `slot` | string | `show` |
| `children` | ReactNode | required |

Thresholds are `30rem`, `48rem`, `64rem`, and `80rem`.

## Visual recipes and states

Below `from`, Show applies `display:none`; from the threshold upward it applies `display:contents`. It has no colors, spacing, typography, interaction, appearance, RTL, or motion recipe.

## Tokens and CSS hooks

Stable hooks are `.brick-show`, `data-from`, and `data-slot`. There are no public variables.

## Customization

Native attributes, events, class, and non-display styles pass through. Do not override `display`; use application media CSS when the fixed policy is unsuitable.

## Responsive behavior

Queries use exact width ranges with no fractional gap. Hidden children remain in the DOM and mounted. Paged media follows page-box width.

## Accessibility

Show adds no role or ARIA. `display:none` removes hidden descendants from focus navigation and the accessibility tree. Preserve an equivalent path to essential content and own focus recovery if live resize hides the active control.

## Composition, native props, and refs

Omit `as` when the default `div` is sufficient. Use `as` only for deliberate HTML semantics or valid document structure; it does not create a layout box. Put backgrounds, borders, padding, and sizing on a child layout component rather than the layout-transparent Show host. Show has no `asChild`, render, fallback, `when`, or unmount API. Avoid invalid table grammar and duplicate IDs/forms/landmarks across responsive copies.

## Examples

```tsx
<Show as="aside" from="lg" aria-label="Release guidance">Review checklist</Show>
```

## Evidence

See the [playground](../../../playground/src/components/show/ShowPage.tsx), [unit test](../../../test/components/show/show.test.tsx), [type test](../../../test/types/components/show.test.ts), [browser test](../../../playground/tests/components/show/behavior.spec.ts), [visual owner](../../../playground/tests/components/show/visual.spec.ts), and [manual protocol](../../../playground/manual-tests/show.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
