# For

For is a typed render-loop helper with an explicit empty-state fallback and no wrapper element.

## When and where to use

Use `For` for authored collections rendered into JSX. It is especially useful in examples and Blocks, including when an empty fallback belongs beside the collection rendering.

## When not to use

Use native array methods for data transformations such as filtering, grouping, projection, and aggregation. Use the owning collection system for virtualization. Keep stable-key policy explicit on the element returned by `For`.

## Installation and imports

```tsx
import { For } from "@flowstack-ui/brick/for";
import "@flowstack-ui/brick/styles.css";
```

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/for.css";
```

Public exports are `For`, `ForProps`, `ForCollection`, and `ForItem`. Explicit
generic annotations describe the collection type; ordinary usage infers it from
`each`.

## Quick start

```tsx
<For each={items} fallback={<Text>No items</Text>}>
  {(item) => <Card key={item.id}>{item.label}</Card>}
</For>
```

## Anatomy and DOM ownership

`For` returns the render results directly. It never inserts a wrapper and never chooses React keys for the consumer.

## API

| Prop | Value | Default |
| --- | --- | --- |
| `each` | mutable, readonly, or heterogeneous union array; or `undefined` | none |
| `children` | `(item, index) => ReactNode` | none |
| `fallback` | `ReactNode` | `null` |

## Visual recipes and states

The helper owns no presentation or interaction state.

## Tokens and CSS hooks

There are no hooks because `For` renders no host. Its modular stylesheet is intentionally empty.

## Customization

Customize the returned children and fallback with their own finished Brick components.

## Responsive behavior

Collection rendering is independent of viewport size; Grid, Stack, Show, and Hide own responsive layout.

## Accessibility

Choose semantic collection hosts such as List or Grid around `For` output when the items form a meaningful collection. Keep keys on returned item roots.

## Composition, native props, and refs

`For` accepts no native props or ref because it has no host. It preserves item order and passes the source index to the render function.

## Examples

```tsx
<List.Root>
  <For each={features}>{(feature) => <List.Item key={feature.id}>{feature.label}</List.Item>}</For>
</List.Root>
```

## Evidence

- [Playground evidence](../../../playground/src/components/for/)
- [Focused component tests](../../../test/components/for/)
- [Type tests](../../../test/types/components/for.test.ts)
- [Browser behavior](../../../playground/tests/components/for/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/for/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/for.md)

## Changelog

See the [For changelog](CHANGELOG.md) and the [package changelog](../../../CHANGELOG.md).
