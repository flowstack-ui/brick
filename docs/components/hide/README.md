# Hide

Hide keeps content mounted while removing it from visual layout from one fixed viewport breakpoint. It is CSS layout, not conditional React rendering. When visible, its host is layout-transparent so parent flex and grid spacing continue to apply directly to its children.

## When and where to use

Use Hide for compact-only or secondary content that should leave layout at a standard width.

## When not to use

Do not use Hide to prevent mounting, effects, fetching, or access to essential functionality. Use application CSS or React conditionals for different policies.

## Installation and imports

```tsx
import { Hide } from "@flowstack-ui/brick";
// or from "@flowstack-ui/brick/hide"
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/hide.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Exports: `Hide`, `HideProps`, `HideBreakpoint`, and `HideElement`.

## Quick start

```tsx
<Hide from="md"><nav aria-label="Compact workspace">Menu</nav></Hide>
```

## Anatomy and DOM ownership

Hide renders one native host, `div` by default, with `.brick-hide`, `data-from`, and `data-slot="hide"`. The host remains in the DOM and the ref targets it, but its visible `display: contents` layout contributes no wrapper box. Children always render.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `from` | `sm`, `md`, `lg`, `xl` | required |
| `as` | `div`, `span`, `section`, `article`, `nav`, `header`, `footer`, `main`, `aside`, `ul`, `ol`, `li` | `div` |
| `slot` | string | `hide` |
| `children` | ReactNode | required |

Thresholds are `30rem`, `48rem`, `64rem`, and `80rem`.

## Visual recipes and states

Below `from`, Hide applies `display:contents`; from the threshold upward it applies `display:none`. It has no visual or interaction recipes.

## Tokens and CSS hooks

Stable hooks are `.brick-hide`, `data-from`, and `data-slot`. There are no public variables.

## Customization

Native attributes, events, class, and non-display styles pass through. Use application CSS instead of overriding `display`.

## Responsive behavior

Exact width ranges complement Show without gaps. Hidden children stay mounted. Paged media follows page-box width.

## Accessibility

Hide adds no role or ARIA. Hidden descendants leave focus navigation and the accessibility tree. Preserve essential functionality and own focus recovery on live resize.

## Composition, native props, and refs

Omit `as` when the default `div` is sufficient. Use `as` only for deliberate HTML semantics or valid document structure; it does not create a layout box. Put paint and geometry on a child layout component. Hide has no `asChild`, render, fallback, or unmount API. Avoid invalid table grammar and duplicate responsive content identity.

## Examples

```tsx
<Hide as="aside" from="lg" aria-label="Compact help">Swipe for actions</Hide>
```

## Evidence

See the [playground](../../../playground/src/components/hide/HidePage.tsx), [unit test](../../../test/components/hide/hide.test.tsx), [type test](../../../test/types/components/hide.test.ts), [browser test](../../../playground/tests/components/hide/behavior.spec.ts), [visual owner](../../../playground/tests/components/hide/visual.spec.ts), and [manual protocol](../../../playground/manual-tests/hide.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
