# Show

Show offers two exclusive modes: `when` conditionally renders content without a host; `from` keeps content mounted and controls CSS visibility. Responsive `asChild` preserves an existing child's layout box.

## When and where to use

Use Show for a secondary desktop treatment when deterministic SSR and always-mounted children are appropriate.

## When not to use

Do not use responsive Show to prevent effects, fetching or state initialization. Conditional Show removes the inactive subtree, but is not authorization, focus recovery or a data-fetching policy.

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

Responsive Show renders one native host by default, with `.brick-show`, `data-from`, and `data-slot="show"`. Its visible `display: contents` contributes no wrapper box. With `asChild`, `data-show-from` carries the threshold on the existing child and visible display is untouched. Conditional Show renders no host.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `from` | `sm`, `md`, `lg`, `xl` | required |
| `as` | `div`, `span`, `section`, `article`, `nav`, `header`, `footer`, `main`, `aside`, `ul`, `ol`, `li` | `div` |
| `slot` | string | `show` |
| `children` | ReactNode | required |
| `asChild` | boolean (responsive mode only) | false |

Alternatively use `when: T`, optional `fallback: ReactNode` (default null), and
`children: ReactNode | ((value: Truthy<T>) => ReactNode)`. Never combine this mode
with `from`, native host props, `as`, `asChild` or a ref. Zero, empty string,
false, null, undefined and NaN are falsy; empty arrays are truthy. Use a length
comparison for collections. Function children run only for truthy values;
already evaluated JSX expressions are not deferred. Normal React reconciliation
applies. The type excludes representable falsy union members, not zero/NaN from
the broad number type.

```tsx
<Show when={user} fallback={<Text>No user</Text>}>
  {(user) => <Text>{user.name}</Text>}
</Show>
<Show from="md" asChild><HStack gap="3">Desktop tools</HStack></Show>
```

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

Omit default `as`. Responsive `asChild` requires one non-Fragment child forwarding
props and refs; do not combine with `as`. Classes, styles, events and refs merge.
The child retains its slot unless explicitly overridden. Use projection for valid
table grammar. Put paint/geometry on the child. Avoid duplicate identities;
CSS-hidden controls may still submit and portals are outside the hidden host.
Use separate hosts for nested responsive rules, not two projections on one host.

## Examples

```tsx
<Show as="aside" from="lg" aria-label="Release guidance">Review checklist</Show>
```

## Evidence

See the [playground](../../../playground/src/components/show/ShowPage.tsx), [unit test](../../../test/components/show/show.test.tsx), [type test](../../../test/types/components/show.test.ts), [browser test](../../../playground/tests/components/show/behavior.spec.ts), [visual owner](../../../playground/tests/components/show/visual.spec.ts), and [manual protocol](../../../playground/manual-tests/show.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
