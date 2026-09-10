# Radius

`Radius` is a shared, token-only type available from the package root and
`@flowstack-ui/brick/radius`. It does not render a component.

Core choices are `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, and `4xl`.
They select the corresponding `--brick-radius-core-*` foundation variable.
Semantic choices `subtle`, `control`, `surface`, and `overlay` follow the theme.
`none` removes rounding; `full` uses the full-radius token without changing size.

Omitting the prop keeps the component's semantic default. Core sizes must never
be confused with semantic roles or application-wide coordinated radius presets.
The core variables are appearance-invariant derived Theme foundations under
`foundations.radius.core`; existing role paths remain unchanged.

The following public parts accept this contract:

| Family | Part |
| --- | --- |
| Actions | Button, IconButton, Toggle, ToggleGroup.Root, SegmentGroup.Root, Toolbar.Root |
| Action wrappers | CloseButton, DownloadTrigger, QrCode.DownloadTrigger |
| Fields | Input, Textarea.Root, NumberInput.Root, PasswordToggleField, FileUpload.Root |
| Compound fields | NativeSelect.Root, PinInput.Root/RootProvider, TagsInput.Root/RootProvider, DateInput.Root, DatePicker.Root |
| Choices | Select.Root, MultiSelect.Root, Combobox.Root, RadioCard.Root |
| Independent popup boundaries | Select.Content, MultiSelect.Content, Combobox.Content, DatePicker.Content, ColorPicker.Content |
| Surfaces | Card.Root, Surface, Dialog.Content, AlertDialog.Content, Popover.Content, Drawer.Content, FloatingPanel.Content, ActionBar.Content |
| Menus | DropdownMenu.Content/SubContent, ContextMenu.Content/SubContent, Menubar.Content/SubContent, Tooltip.Content |
| Compact content | Badge, Chip.Root, Tabs.List |
| Media and progress | Avatar, AvatarGroup, ColorSwatch.Root/Mix, Carousel.Root, Progress.Root |
| Collections | Table.Root, Tree.Root, DataGrid.Root, TreeGrid.Root, List.Root, Feed.Root |
| Disclosures | Accordion.Root, Collapsible.Root |

Underline fields deliberately exclude corner selection. Popup radius is separate
from trigger radius: selecting a pill trigger must not create a pill popup.
`Tabs.List` retains `default` as a compatibility spelling for omission; its inner
corners are clamped to zero when the inset is larger than the outer radius.
Drawer still rounds only free edges; full-screen and viewport-edge constraints
remain part of its geometry recipe.

AvatarGroup owns a shared member radius, including its generated overflow avatar;
nested groups establish their own presentation. Carousel viewport radius does
not change the geometry of its navigation buttons. Progress radius changes the
track ends, not the meaning or orientation of the progress indicator.

Image and AspectRatio also accept shared Radius, with omitted radius remaining
none. Migration: their historical sm/md/lg meant subtle/control/surface. Use
those semantic names to preserve the former appearance; sm/md/lg now select
the same core tokens as other shared-Radius components.

```tsx
<Button radius="sm">Save</Button>
<Toggle radius="control">Bold</Toggle>
<ToggleGroup.Root radius="none" attached>{/* items */}</ToggleGroup.Root>
```

Radius and legacy corner `shape` choices are mutually exclusive in TypeScript.
For untyped callers explicit radius takes precedence. Existing shapes remain
supported; prefer radius for new corner-only choices. A documented instance
CSS variable supplied through `style` remains the final explicit override.
Unknown untyped radius values are ignored, not forwarded to the DOM or CSS.

ToggleGroup owns shared item radius through `--brick-toggle-group-radius`.
Attached inner corners stay square, while outer corners consume the resolved
item radius. Nested groups reset the group-level selection.

No JavaScript viewport logic or new behavior dependency is involved. Token
references are deterministic during server rendering and remain theme-aware.
