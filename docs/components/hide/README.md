# Hide

Hide keeps content mounted while removing it from visual layout from one fixed viewport breakpoint. It is CSS layout, not conditional React rendering.

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

Exports: `Hide`, `HideProps`, `HideBreakpoint`, and `HideElement`.

## Quick start

```tsx
<Hide from="md"><nav aria-label="Compact workspace">Menu</nav></Hide>
```

## Anatomy and DOM ownership

Hide renders one native host, `div` by default, with `.brick-hide`, `data-from`, and `data-slot="hide"`. Children always render. The ref targets the selected `HTMLElement`.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `from` | `sm`, `md`, `lg`, `xl` | required |
| `as` | `div`, `span`, `section`, `article`, `nav`, `header`, `footer`, `main`, `aside`, `ul`, `ol`, `li` | `div` |
| `slot` | string | `hide` |
| `children` | ReactNode | required |

Thresholds are `30rem`, `48rem`, `64rem`, and `80rem`.

## Visual recipes and states

Below `from`, Hide assigns no display; from the threshold upward it applies `display:none`. It has no visual or interaction recipes.

## Tokens and CSS hooks

Stable hooks are `.brick-hide`, `data-from`, and `data-slot`. There are no public variables.

## Customization

Native attributes, events, class, and non-display styles pass through. Use application CSS instead of overriding `display`.

## Responsive behavior

Exact width ranges complement Show without gaps. Hidden children stay mounted. Paged media follows page-box width.

## Accessibility

Hide adds no role or ARIA. Hidden descendants leave focus navigation and the accessibility tree. Preserve essential functionality and own focus recovery on live resize.

## Composition, native props, and refs

Choose a valid semantic host. Hide adds a real wrapper and has no `asChild`, render, fallback, or unmount API. Avoid invalid table grammar and duplicate responsive content identity.

## Examples

```tsx
<Hide as="aside" from="lg" aria-label="Compact help">Swipe for actions</Hide>
```

## Evidence

See the [playground](../../../playground/src/components/hide/HidePage.tsx), [unit test](../../../test/components/hide/hide.test.tsx), [type test](../../../test/types/components/hide.test.ts), [browser test](../../../playground/tests/components/hide/behavior.spec.ts), [visual owner](../../../playground/tests/components/hide/visual.spec.ts), and [manual protocol](../../../playground/manual-tests/hide.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
