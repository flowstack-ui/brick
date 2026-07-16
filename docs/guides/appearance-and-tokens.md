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

Button validates the initial interaction-token and contrast relationships.
Later reference components may refine private values without changing the
public semantic roles.
