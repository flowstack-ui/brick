# Radio Card

Radio Card is Brick's finished whole-card single-selection control for rich
visible options. Atom owns radio semantics, selection, keyboard navigation,
focus, forms, validation, direction, and reset; Brick owns the card anatomy,
recipes, content hierarchy, indicator, addon, and state paint.

## When and where to use

Use Radio Card for one payment method, billing cadence, shipping speed,
permission profile, or plan choice when each option needs more than a concise
label.

## When not to use

Use Radio Group for short text options, Checkbox Group for multiple selection,
and Segment Group or Toggle Group for immediate commands.

## Installation and imports

```tsx
import { RadioCard } from "@flowstack-ui/brick/radio-card";
import "@flowstack-ui/brick/styles.css";
```

For modular CSS, load the foundation once and the component stylesheet on each
route that renders Radio Card:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/radio-card.css";
```

Add modular CSS for every other Brick component in the composition. Do not
combine modular CSS with `styles.css` or `tokens.css`.

## Quick start

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Billing cadence</Fieldset.Legend>
  <RadioCard.Root defaultValue="annual" name="billing">
    <RadioCard.Item value="annual">
      <RadioCard.Control>
        <RadioCard.Content>
          <RadioCard.Title>Annual</RadioCard.Title>
          <RadioCard.Description>Save 20%</RadioCard.Description>
        </RadioCard.Content>
        <RadioCard.Indicator />
      </RadioCard.Control>
      <RadioCard.Addon>Billed once per year</RadioCard.Addon>
    </RadioCard.Item>
  </RadioCard.Root>
</Fieldset.Root>
```

## Anatomy and DOM ownership

`Root` adapts Atom's radiogroup `div`; `Item` adapts Atom's radio `button` and
Atom-owned hidden form input. `Control`, `Content`, `Title`, `Description`,
`Indicator`, and `Addon` are presentational spans. Indicator is optional and
its authored order determines placement. Do not add another hidden input.

## API

Named exports are `RadioCard`, `RadioCardRoot`, `RadioCardItem`,
`RadioCardControl`, `RadioCardContent`, `RadioCardTitle`,
`RadioCardDescription`, `RadioCardIndicator`, and `RadioCardAddon`. Public
types are `RadioCardRootProps`, `RadioCardItemProps`, `RadioCardPartProps`,
`RadioCardIndicatorProps`, `RadioCardSize`, `RadioCardVariant`,
`RadioCardAlign`, and `RadioCardJustify`.

Root accepts Atom Radio Group props and adds:

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `variant` | `outline`, `surface`, `subtle`, `solid` | `outline` |
| `align` | `start`, `center`, `end` | `start` |
| `justify` | `start`, `center`, `end` | `start` |
| `orientation` | `vertical`, `horizontal` | `horizontal` |

Item requires a unique `value`. All parts accept class, style, slot, native
span/button props, and refs appropriate to their rendered element. Custom
Indicator children replace the default dot and remain decorative.

## Visual recipes and states

`outline` keeps a transparent canvas and emphasizes the checked border;
`surface` uses the base surface and a soft checked surface; `subtle` uses a
subtle resting surface; and `solid` uses the accent solid role when checked.
Horizontal orientation places Content and Indicator in a row; vertical
orientation stacks them while preserving the same Item list and Atom keyboard
model. Size changes padding, indicator geometry, and type together. Atom state
attributes drive checked, disabled, read-only, invalid, and focus paint.

## Tokens and CSS hooks

Stable classes and slots are `radio-card`, `radio-card-item`,
`radio-card-control`, `radio-card-content`, `radio-card-title`,
`radio-card-description`, `radio-card-indicator`, and `radio-card-addon` with
matching `.brick-radio-card*` classes. Root exposes `data-size`,
`data-variant`, `data-align`, `data-justify`, and `data-slot`; Atom exposes state
and orientation attributes.

Public variables are `--brick-radio-card-gap`,
`--brick-radio-card-min-block-size`, `--brick-radio-card-padding-block`,
`--brick-radio-card-padding-inline`, `--brick-radio-card-radius`,
`--brick-radio-card-background`, `--brick-radio-card-border`, and
`--brick-radio-card-foreground`, `--brick-radio-card-indicator-size`,
`--brick-radio-card-indicator-background`,
`--brick-radio-card-indicator-border`,
`--brick-radio-card-indicator-checked-background`,
`--brick-radio-card-indicator-checked-border`, and
`--brick-radio-card-indicator-checked-foreground`.

## Customization

Prefer the size, variant, align, and justify recipes, then semantic Theme
tokens, then documented component variables. Keep reusable selection paint in
Radio Card; application-specific option content remains composition.

## Responsive behavior

Root stacks Items by default while horizontal orientation arranges each
Item's Control content in a row. For a precise responsive card grid, place a
Brick Grid or Stack inside Root and keep `orientation` consistent with the
intended keyboard movement. Use one semantic Root; do not render duplicate
responsive groups with diverging state. Items stretch within their parent
track and wrap long content.

## Accessibility

Give Root an accessible group name, normally with Fieldset Legend or native
ARIA. Atom provides radio roles/state, one roving Tab stop, Arrow/Home/End/
Space behavior, disabled skipping, read-only, required/invalid state, named
form submission, external forms, and reset. Brick preserves a 44px target,
visible checked/focus states, forced colors, dark appearance, and reflow.

## Composition, native props, and refs

Control, Content, Title, Description, Indicator, and Addon preserve native span
attributes, events, classes, styles, slots, and refs. Root and Item preserve
their Atom/native props and refs. Keep every Item under one Root; authored
content may use Brick Stack, Icon, Badge, Text, and other presentational
components without changing radio ownership.

## Examples

Use `align="center" justify="center"` for compact centered choices. Put
`RadioCard.Indicator` before Content for a leading indicator or after Content
for a trailing indicator. Addon remains attached below Control and should hold
supporting option context, not a second interactive control.

## Evidence

- [Playground route](../../../playground/src/components/radio-card/RadioCardPage.tsx)
- [Component test](../../../test/components/radio-card/radio-card.test.tsx)
- [Type test](../../../test/types/components/radio-card.test.ts)
- [Browser test](../../../playground/tests/components/radio-card/behavior.spec.ts)
- [Visual test](../../../playground/tests/components/radio-card/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/radio-card.md)
- [Packed Consumer](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
