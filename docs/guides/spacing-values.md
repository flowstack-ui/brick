# Layout spacing values

Stack and Grid share one responsive spacing grammar for `gap`, Grid axis
gaps, and Stack logical edge spacing.

## Preferred: numeric factors

Use a non-negative number for ordinary layout spacing:

```tsx
<VStack gap={8}>…</VStack>
<Grid.Root gap={6} rowGap={8}>…</Grid.Root>
```

Brick calculates numbers from its smallest maintained spacing unit:

```css
calc(var(--brick-space-1) * 8)
```

This supports any finite non-negative factor without requiring a new type,
attribute selector, or CSS recipe for each number.

## Existing string tokens

String values `"0"` through `"6"` remain supported and preserve Brick's
established nonlinear token scale. In particular, `"5"` and `"6"` retain
their existing 1.5rem and 2rem geometry. Prefer numbers in new code when the
value is intended as a base-unit factor.

Numeric strings above the legacy scale are treated as factors for migrated or
untyped code, so an old `gap="8"` no longer emits metadata without spacing.

## Explicit CSS values

Use a nonnumeric string for a measured exception or application token:

```tsx
<VStack gap="2rem">…</VStack>
<VStack gap="var(--product-section-gap)">…</VStack>
<VStack gap="clamp(1rem, 2vw, 2.5rem)">…</VStack>
```

Numeric factors should remain the normal choice because they preserve shared
rhythm. Explicit values are an escape hatch for a real layout requirement,
not a replacement for the spacing system. Consumers own the validity and
availability of explicit CSS expressions and custom properties.

## Responsive mixtures

Every supported spacing prop accepts the same responsive object. Each
breakpoint may independently use a token, numeric factor, or explicit value:

```tsx
<VStack gap={{ initial: 3, md: 6, lg: "4rem" }}>…</VStack>

<Grid.Root
  columns={{ initial: 1, md: 2, lg: 4 }}
  gap={{ initial: 3, md: 6 }}
  rowGap={{ initial: "1rem", lg: "var(--section-row-gap)" }}
>
  …
</Grid.Root>
```

Objects require `initial` and may add `sm`, `md`, `lg`, and `xl`. Brick emits
one source tree and CSS media-query values; it does not measure the viewport
in JavaScript.

## Invalid values

Negative numbers, non-finite numbers, empty strings, and negative numeric
strings are invalid. Brick warns and resolves these obvious failures to zero
so layout does not silently lose its spacing recipe. Browsers validate other
authored CSS strings.
