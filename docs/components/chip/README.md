# Chip

Chip presents one compact authored or selected value with an optional,
explicitly named remove action. It does not replace Badge, Button, Toggle,
Link, or TagsInput's editable collection behavior.

## When and where to use

Use Chip for values already present in application state: an assignee,
recipient, selected category, or applied filter value. Include RemoveTrigger
only when the surrounding application can remove that value and deliberately
handle focus afterward.

## When not to use

Use Badge for passive status/category metadata, Button for a momentary action,
Toggle or ToggleGroup for selectable filters, Link for navigation, and
NotificationBadge for an attached count/dot. “Tag” is usage terminology, not
a Brick export. Editable tag entry, token navigation, automatic focus recovery,
and arbitrary creation belong to TagsInput.

## Installation and imports

```tsx
import { Chip } from "@flowstack-ui/brick";
// or
import { Chip } from "@flowstack-ui/brick/chip";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/chip.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Chip.Root>
  <Chip.Label>Riley Chen</Chip.Label>
  <Chip.RemoveTrigger
    ariaLabel="Remove Riley Chen"
    onPress={() => removeAssignee("riley")}
  />
</Chip.Root>
```

## Anatomy and DOM ownership

| Part | Default host | Backing owner | Ref |
| --- | --- | --- | --- |
| `Root` | `span` | Atom Badge.Root | `HTMLSpanElement` |
| `Label` | `span` | Atom Badge.Root | `HTMLSpanElement` |
| `RemoveTrigger` | `button` | Atom Button.Root | actual `HTMLElement` host |
| `StartElement`, `EndElement` | `span` | Atom Badge.Root | `HTMLSpanElement` |
| `ActionTrigger` | `button` | Atom Button.Root | actual `HTMLElement` host |

Root stays noninteractive and adds no role or tab stop. ActionTrigger and
RemoveTrigger are independent sibling controls. Never place removal inside the
primary action. Brick's default close SVG is decorative and implementation-only.

## API

### ChipRoot and ChipRootProps

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | Responsive `soft`, `subtle`, `outline`, `surface`, `solid` | `soft` |
| `tone` | `neutral`, `contrast`, `accent`, `info`, `success`, `warning`, `danger` | `neutral` |
| `size` | Responsive `sm`, `md`, `lg`, `xl` | `md` |
| `shape` | `rounded`, `pill` | `pill` |
| `density` | Responsive `comfortable`, `compact` | `comfortable` |
| `unstyled` | `boolean` | `false` |

Root preserves Atom Badge native span props, `asChild`, `render`, class,
style, slot, and ref. `color` is omitted because `tone` owns visual color.

`ChipRoot` is also available through `Chip.Root`. `ChipLabel` and its
`ChipLabelProps` accept native span props and ref. `ChipRemoveTrigger` and its
`ChipRemoveTriggerProps` require
`ariaLabel: string` and preserves Atom Button `disabled`, `onPress`, button
props, composition, class, style, slot, and ref. `href` and `loading` are not
supported. Chip adds no value state, selected state, automatic removal, link,
form behavior, or generated accessible copy.

The public recipe types are `ChipVariant`, `ChipTone`, `ChipSize`, and
`ChipShape` and `ChipDensity`. `ChipLabel` is available as `Chip.Label`, and
`ChipRemoveTrigger` is available as `Chip.RemoveTrigger`.

### Shared radius selection

Use `radius="control"` to follow the theme's control corners. The documentation
examples use this prop so changing the theme radius updates their shape.
Omitting both `radius` and `shape` retains the library's pill default;
`shape="pill"` explicitly keeps rounded ends independently of control radius.

The parts listed for this component in the [Radius guide](../../guides/radius.md)
accept the shared token-only `Radius` contract. Omission preserves the owner’s
normal corners. Core sizes and semantic roles are distinct; arbitrary lengths
and responsive objects are not accepted. Where a legacy corner `shape` exists,
choose either it or `radius`, not both. This does not change behavior, sizing,
or the independently owned corners of other parts.

## Visual recipes and states

Soft supplies a quiet surface; outline supplies a transparent bordered token;
surface adds a semantic boundary; solid uses paired solid/on-solid colors.
Tones never add automatic status semantics. Comfortable minimum heights are
28/32/36/40px. Compact targets are 18/20/24/32px; controls reserve at least 24px
plus the owning border, so small interactive chips are intentionally taller.
Shape changes corners only. Hover, active, focus-visible and disabled states
change action paint without changing geometry.

### Adornments and action types

`ChipStartElementProps` and `ChipEndElementProps` accept native span props,
className, style, data-slot and HTMLSpanElement refs. Named exports are
`ChipStartElement` and `ChipEndElement`. The slots size authored Icon/Avatar
content to the selected density and size; legacy direct children still work.
`ChipActionTriggerProps` accepts Atom Button props except href and loading.
`ChipActionTrigger` preserves native type (button by default), disabled,
onPress, native attributes, asChild/render, className, style, data-slot and ref.
Its authored content supplies the name; name an icon-only action explicitly.

## Tokens and CSS hooks

Stable classes are `.brick-chip`, `.brick-chip__label`, and
`.brick-chip__remove-trigger`. Stable slots are `badge` on Root,
`chip-label`, and `chip-remove-trigger`. Root exposes `data-variant`,
`data-tone`, `data-size`, and `data-shape`; RemoveTrigger exposes Atom
`data-disabled` when applicable. Every part exposes its stable `data-slot`.

Additional hooks: `.brick-chip__start-element`, `.brick-chip__end-element`,
`.brick-chip__action-trigger`, their matching `chip-*` slots, and root
`data-density`. ActionTrigger also exposes Atom data-disabled.
`--brick-chip-avatar-size` controls avatar slot geometry. Palette hooks are
`--brick-chip-tone-solid`, `--brick-chip-tone-on-solid`,
`--brick-chip-tone-soft`, `--brick-chip-tone-on-soft`,
`--brick-chip-tone-border` and `--brick-chip-tone-text`.

Public component properties:

- `--brick-chip-background`, `--brick-chip-foreground`,
  `--brick-chip-border-color`, `--brick-chip-radius`;
- `--brick-chip-min-block-size`, `--brick-chip-padding-inline-start`,
  `--brick-chip-padding-inline-end`, `--brick-chip-gap`,
  `--brick-chip-font-size`, `--brick-chip-leading-size`;
- `--brick-chip-remove-size`, `--brick-chip-remove-foreground`,
  `--brick-chip-remove-background`, `--brick-chip-remove-hover-background`,
  and `--brick-chip-remove-active-background`.

## Customization

Prefer component recipes, then semantic tokens and the documented
`--brick-chip-*` properties. Author Icon or Avatar before Label. Use className
and style only as final escape hatches, preserving the passive Root and actual
button semantics.

## Responsive behavior

One Chip is inline-flex, max-inline-size 100%, and truncates a one-line Label
without displacing leading content or RemoveTrigger. Surrounding layout owns
wrapping between Chips. Logical padding and child order work in RTL. Consumers
must not hide the only removal action at narrow widths.

## Accessibility

Root adds no role, tab stop, selection state, or announcement. Every
RemoveTrigger needs a localized accessible name containing the visible value,
for example “Remove Riley Chen.” Atom owns Enter/Space activation and disabled
behavior; Brick owns focus visibility, contrast, target geometry, zoom,
forced-color, and RTL paint.

`onPress` only requests removal. The parent owns state mutation, any needed
announcement, and the next focus destination if the focused trigger disappears.
Standalone Chip does not promise Backspace/Delete token removal, group
navigation, form submission, or editable-field semantics.

## Composition, native props, and refs

All six parts preserve public Atom `asChild` and `render`. Static parts default
to spans; projected refs reach their actual host. RemoveTrigger's ref targets the
actual Atom host. ActionTrigger is a sibling of RemoveTrigger and may contain
Label and adornments, never another control. Both default to non-submitting
buttons. Applications own primary-action results and post-removal focus.

### Modern recipes and composition

- `size`, `variant` and `density` accept sparse shared ResponsiveValue objects with initial/sm/md/lg/xl. Omitted initial entries use established defaults; no viewport hooks or remounts.
- Keep soft/neutral/md/comfortable/pill defaults. Use compact/surface/radius=control for the reference-like rounded recipe. Subtle equals soft; contrast is inverse text/surface paint, not neutral.
- All six parts project through public Atom asChild/render. Root unstyled delegates its subtree; a nested root resets ownership. Part unstyled delegates that part only, including focus paint.
- Six --brick-chip-tone-* palette variables require coherent solid/on-solid and soft/on-soft pairs. Bind semantic tokens to support both appearances.
- Fade only an unavailable action to 50% with not-allowed cursor; keep the passive label and independent sibling actions unchanged. Do not add parent opacity. Native fieldset disabling applies.
- Supply focus visibility and usable target geometry when delegating with unstyled. Do not nest interactive hosts.
- Compact sm/md/lg/xl passive heights are 18/20/24/32px, padding 6/6/8/10px, text 12/12/14/14px, icons 12/14/16/18px, avatars 12/14/18/24px at a 16px root. Actions remain at least 24px and can increase actual height.
- Use TagsInput for editable collection state; Chip has no automatic removal, selection or exit animation.

## Examples

```tsx
<Chip.Root variant="outline">
  <Chip.Label>Release 42</Chip.Label>
</Chip.Root>

<Chip.Root tone="accent">
  <Avatar alt="" fallback="RC" size="xs" />
  <Chip.Label>Riley Chen</Chip.Label>
  <Chip.RemoveTrigger ariaLabel="Remove Riley Chen" onPress={removeRiley} />
</Chip.Root>

// A passive category tag uses Badge instead.
<Badge shape="pill">Design</Badge>

<Chip.Root density="compact" tone="accent" variant="surface">
  <Chip.ActionTrigger onPress={openRiley}>
    <Chip.StartElement><Avatar alt="" fallback="RC" size="xs" /></Chip.StartElement>
    <Chip.Label>View Riley</Chip.Label>
  </Chip.ActionTrigger>
  <Chip.RemoveTrigger ariaLabel="Remove Riley assignment" onPress={removeRiley} />
</Chip.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/chip/)
- [Unit tests](../../../test/components/chip/chip.test.tsx)
- [Type tests](../../../test/types/components/chip.test.ts)
- [Browser behavior](../../../playground/tests/components/chip/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/chip/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/chip.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
