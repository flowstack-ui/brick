# Appearance and tokens

Brick ships complete light and dark semantic tokens. With no explicit setting,
the default follows `prefers-color-scheme`.

Set an appearance on the document or any subtree:

```html
<html data-brick-appearance="dark">
```

```html
<section data-brick-appearance="light">
  <!-- This region uses light semantic values. -->
</section>
```

Remove the attribute to return to the system preference.

## Custom themes

Override public semantic variables through ordinary CSS:

```css
.brand-theme {
  --brick-color-accent-solid: #5b5bd6;
  --brick-color-accent-on-solid: #ffffff;
  --brick-radius-control: 0.75rem;
}
```

```tsx
<section className="brand-theme">...</section>
```

Override foreground and background roles together, then verify contrast and
all supported states. Arbitrary consumer overrides are outside Brick's visual
accessibility guarantee.

## Typography recipes

Brick exposes complete semantic typography tuples instead of asking each
component to independently choose a font size, weight, line height, and letter
spacing. Every recipe has these five variables:

```text
--brick-typography-<recipe>-font-family
--brick-typography-<recipe>-font-size
--brick-typography-<recipe>-font-weight
--brick-typography-<recipe>-line-height
--brick-typography-<recipe>-letter-spacing
```

The public recipe names are:

- authored content: `display`, `title-lg`, `title-md`, `title-sm`, `body-lg`,
  `body-md`, `body-sm`, and `caption`;
- component anatomy: `label-md`, `label-strong`, `supporting-sm`,
  `validation-sm`, `overlay-title`, `compact-title`, `compact-title-lg`,
  `surface-title-sm`, `surface-title-md`, `surface-title-lg`,
  `field-value-md`, and `field-value-lg`;
- controls: `control-xs`, `control-sm`, `control-md`, `control-lg`, and
  `control-xl`.

Component anatomy owns its semantic element and styling contract. It does not
nest `Text`; its local variables alias the same semantic recipes that `Text`
uses. Override a semantic recipe to change a role across Brick, or a documented
component variable for one component only.

Run `npm run verify:typography` to reject incomplete recipes, light/dark drift,
and component typography that bypasses the shared system.
