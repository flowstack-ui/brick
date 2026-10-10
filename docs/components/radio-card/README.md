# RadioCard

## When and where to use

Use for mutually exclusive rich options. Compose one named Root with Items,
each containing exactly one HiddenInput, Control, Title and optional Description,
Indicator and Addon. Item is now a label; its ref targets HTMLLabelElement.
HiddenInput owns native radio focus, events and submission. Existing button-item
consumers must add HiddenInput and move input-specific refs/ARIA onto that part.

## When not to use

Use CheckboxCard for independent choices, RadioGroup for simple choices, and Card
with separate controls for records containing links or actions.

## Installation and imports

```tsx
import { RadioCard } from "@flowstack-ui/brick/radio-card";
import "@flowstack-ui/brick/styles.css";
```

Or load modular styles:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/radio-card.css";
```

## Quick start

```tsx
<RadioCard.Root name="plan" defaultValue="team">
  <RadioCard.Label>Choose a plan</RadioCard.Label>
  <RadioCard.Item value="team">
    <RadioCard.HiddenInput />
    <RadioCard.Control>
      <RadioCard.Content>
        <RadioCard.Title>Team</RadioCard.Title>
        <RadioCard.Description>For collaborative projects</RadioCard.Description>
      </RadioCard.Content>
      <RadioCard.Indicator />
    </RadioCard.Control>
  </RadioCard.Item>
</RadioCard.Root>
```

## Anatomy and DOM ownership

Root and RootProvider render divs. Item renders a label. HiddenInput renders the
native radio input. Label, Control, Content, Title, Description, Indicator and
Addon render spans. Context and ItemContext are render-function parts.

## API

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg`; responsive | `md` |
| `variant` | `outline`, `surface`, `subtle`, `solid`; responsive | `outline` |
| `align` | `start`, `center`, `end`; responsive | `start` |
| `justify` | `start`, `center`, `end`; responsive | `start` |
| `orientation` | `horizontal`, `vertical`; scalar | `horizontal` |

Root supports controlled value/onValueChange or defaultValue; the callback
receives a string. RootProvider accepts useRadioCard's controller. Controlled
owners handle reset. Context exposes group state; ItemContext exposes option state.
Label names the group; Title names the input and Description describes it.
Fieldset remains the group legend/help/error owner.

Sizes sm/md/lg and variants outline/surface/subtle/solid accept responsive values,
as do align, justify and contentOrientation. Defaults are md, outline, accent,
start/start. contentOrientation falls back to scalar orientation for migration.
orientation remains the keyboard axis; contentOrientation is visual only.
Use one Root with Grid, Stack or Group for option arrangement.

Exports include RadioCardRoot, RadioCardRootProvider, RadioCardLabel,
RadioCardItem, RadioCardHiddenInput, RadioCardControl, RadioCardContent,
RadioCardTitle, RadioCardDescription, RadioCardIndicator, RadioCardAddon,
RadioCardContext, RadioCardItemContext and useRadioCard. Types include
RadioCardRootProps, RadioCardRootProviderProps, RadioCardItemProps,
RadioCardPartProps, RadioCardIndicatorProps, RadioCardSize, RadioCardVariant,
RadioCardAlign, RadioCardJustify and RadioCardTone.

## Visual recipes and states

Tone uses the shared form vocabulary: neutral, accent, contrast, info, success,
warning and danger. Neutral and contrast share the current monochrome selection
mapping. Tone is not validation: use invalid for validation. Theme owns custom
palette bindings. Radius uses the existing Radius tokens, default surface.

Indicator is decorative and optional. Order it before/after/inside Content.
Use checked for checked-only artwork, children for custom mark artwork; custom
artwork is hidden unchecked. Do not add a second radio or manual selection click
handler. Keep every Item descendant passive; record actions need Card plus a
separate control. asChild must preserve legal label/input semantics.

Outline emphasizes the selected boundary; surface supplies tonal fill and border;
subtle is borderless with an outlined radio mark; solid uses a strong selected fill.
Disabled dims once. Read-only preserves normal contrast and focus without changes.

## Tokens and CSS hooks

Hooks include `--brick-radio-card-gap`, `--brick-radio-card-radius`,
`--brick-radio-card-inset` and `--brick-radio-card-mark`.

Load styles.css or core.css plus radio-card.css and composed component CSS.
Customize supported props first, then semantic Theme values and documented
--brick-radio-card-* variables: solid/on-solid/soft/tone-text/tone-border, radius,
inset, gap, mark, text-size and addon-inset. Preserve paired contrast and states.
Existing --brick-radio-card-min-block-size, --brick-radio-card-padding-block,
--brick-radio-card-padding-inline and --brick-radio-card-foreground hooks remain
supported. Background and border hooks are --brick-radio-card-background and
--brick-radio-card-border; selected paint uses the selected-background,
selected-foreground and selected-border hooks.

## Customization

Prefer recipe props, then Theme bindings, then documented hooks. Classes follow
brick-radio-card and __item/__control/__content/__title/__description/__indicator.
Recipe attributes include data-size, data-variant, data-tone, data-align,
data-justify, data-content-orientation and data-slot.

Stable attributes: `data-size`, `data-variant`, `data-align`, `data-justify`,
`data-slot`.

## Responsive behavior

Responsive size, variant, align, justify and contentOrientation preserve one
semantic group. Sparse values inherit defaults. orientation is scalar and
defaults to horizontal; it controls keyboard navigation, not responsive layout.

## Accessibility

Test native label clicks and keyboard selection once, roving focus, disabled
skip, readOnly submission, required validation/reset, RTL, responsive recipes,
variant borders, attached corners, forced colors and long content.

Disabled inputs do not submit. Read-only inputs remain focusable and submit.
Explicit input aria-label/aria-labelledby overrides generated Title naming.
Render exactly one HiddenInput per Item; do not nest additional interactive controls.

## Composition, native props, and refs

Root refs target divs, Item refs labels, HiddenInput refs inputs, presentation
part refs spans. Behavioral parts support Atom asChild/render where documented;
Content and Addon support asChild. Keep native label/input semantics when replacing
hosts. Old button-ref consumers must migrate to label refs or input refs.

## Examples

[Executable examples](../../../playground/src/components/radio-card/) cover
recipes, states, providers, custom artwork, addon, attached layout and forms.

## Evidence

- [Component tests](../../../test/components/radio-card/)
- [Type tests](../../../test/types/components/radio-card.test.ts)
- [Behavior](../../../playground/tests/components/radio-card/behavior.spec.ts)
- [Visuals](../../../playground/tests/components/radio-card/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/radio-card.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
