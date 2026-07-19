# ToggleGroup

ToggleGroup coordinates related single- or multiple-selection pressed
commands. Atom owns values, roving focus, keyboard navigation, orientation,
looping, RTL behavior, disabled state, composition, semantics, and refs; Brick
owns group/item presentation.

## Import and use

```tsx
import { ToggleGroup } from "@flowstack-ui/brick/toggle-group";

<ToggleGroup.Root ariaLabel="Project view" attached defaultValue="cards">
  <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
</ToggleGroup.Root>

<ToggleGroup.Root ariaLabel="Filters" type="multiple" shape="pill">
  <ToggleGroup.Item value="active">Active</ToggleGroup.Item>
  <ToggleGroup.Item value="owned">Owned by me</ToggleGroup.Item>
</ToggleGroup.Root>
```

The namespace and named `ToggleGroupRoot`/`ToggleGroupItem` exports are also
available from the package root and subpath. Root's type discriminates single
string values from multiple string arrays. An empty single selection is valid;
an application requiring a persistent choice should reject `""` in its
controlled callback.

## Root API

Root forwards Atom behavior/native props and adds `variant`, `size`, `shape`,
`attached`, and `fullWidth`. It is separated and wrapping by default;
`attached` joins borders and logical corners, while `fullWidth` distributes
items. Root owns the recipe, so Item exposes only Atom item behavior plus
`iconOnly`.

Use a stable accessible group name through `ariaLabel`, `aria-label`, or
`aria-labelledby`. Use horizontal orientation by default and choose vertical
when the content/layout needs it. Arrow keys, Home/End, disabled-item skipping,
one roving Tab stop, and RTL mirroring come from Atom.

Stable hooks are `.brick-toggle-group` and `.brick-toggle-group-item`; slots
default to `toggle-group` and `toggle-group-item`. Group data includes
orientation, attachment, full-width, variant, size, and shape. Items expose
Atom `data-state` and `data-value`.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
