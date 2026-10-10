# CheckboxCard

Independently selectable rich form options. Import CheckboxCard and useCheckboxCard from @flowstack-ui/brick or @flowstack-ui/brick/checkbox-card. Load styles.css, or core.css plus styles/checkbox-card.css.

## When and where to use

Use for independently selectable rich form options.

## When not to use

Use RadioCard for mutually exclusive choices and Card with separate Checkbox for record actions.

## Installation and imports

```tsx
import { CheckboxCard } from "@flowstack-ui/brick/checkbox-card";
import "@flowstack-ui/brick/styles.css";
```

Or use modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/checkbox-card.css";
```

## Quick start

```tsx
<CheckboxCard.Root name="extras" value="backups">
  <CheckboxCard.HiddenInput />
  <CheckboxCard.Control>
    <CheckboxCard.Content>
      <CheckboxCard.Label>Daily backups</CheckboxCard.Label>
      <CheckboxCard.Description>Automatic restore points.</CheckboxCard.Description>
    </CheckboxCard.Content>
    <CheckboxCard.Indicator />
  </CheckboxCard.Control>
</CheckboxCard.Root>
```

## Anatomy and DOM ownership

Root and RootProvider render a label and forward label refs. HiddenInput is the required native checkbox and input-ref target. Control, Content, Label, Description, Indicator and Addon render spans. Context accepts a controller render function. Label and Description are associated automatically. Indicator defaults to Checkmark, supports custom children and may be omitted. Addon contains supporting metadata, not independent actions. Content/Addon support asChild; behavioral parts support Atom asChild/render. Root replacements must remain labels.

## API

Exports: `CheckboxCardRoot`, `CheckboxCardRootProvider`, `CheckboxCardHiddenInput`, `CheckboxCardControl`, `CheckboxCardContent`, `CheckboxCardLabel`, `CheckboxCardDescription`, `CheckboxCardIndicator`, `CheckboxCardAddon`, `CheckboxCardContext`, `useCheckboxCardContext`, `CheckboxCardRootProps`, `CheckboxCardRootProviderProps`, `CheckboxCardPresentationProps`, `CheckboxCardRegionProps`, `CheckboxCardSize`, `CheckboxCardVariant` and the namespace/controller hook shown above.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg`; responsive | `md` |
| `variant` | `outline`, `surface`, `subtle`, `solid`; responsive | `outline` |
| `tone` | CheckboxTone | `accent` |
| `orientation` | horizontal, vertical; responsive | `horizontal` |
| `align` | start, center, end; responsive | `start` |
| `justify` | start, center, end; responsive | `start` |

Recipe attributes: `data-size`, `data-variant`, `data-tone`, `data-orientation`, `data-align`, `data-justify`.

Root checked/defaultChecked accepts boolean or indeterminate, default false. onCheckedChange receives state. disabled/readOnly/invalid/required default false; name/form optional; value defaults on. Group ancestry controls values/name/form/limits. ids accepts input/label/description overrides. validationBehavior follows Field/Form policy. RootProvider value is a useCheckboxCard controller; inputValue supplies the native value. Controlled reset belongs to the application.

HiddenInput accepts native input attributes, events and ref, except Atom-owned type/state/id/form properties. Render exactly one; no automatic duplicate input is created. Native input remains accessibility exposed and keyboard focusable.

## Visual recipes and states

Disabled controls preserve their recipe and use one 50% fade with a not-allowed cursor. Forced colors restores full opacity and uses system disabled colors.

Subtle uses a plain indicator in both checked and unchecked states: the card itself supplies the selection boundary. Disabled dims the complete card once; read-only stays readable and focusable without permitting changes. Neutral and contrast currently share the Checkbox/Checkmark family's monochrome selection treatment; they are not separate palettes here.

size: responsive sm/md/lg (md). variant: responsive outline/surface/subtle/solid (outline). tone: neutral/accent/contrast/info/success/warning/danger (accent). radius: Radius (surface). orientation: responsive horizontal/vertical (horizontal). align/justify: responsive start/center/end (start). Sparse responsive objects inherit initial defaults. Grid/Stack owns group columns and spacing. Density is coordinated by size; no arbitrary CSS size prop is needed.

## Tokens and CSS hooks

Documented hooks: `--brick-checkbox-card-radius`, `--brick-checkbox-card-inset`, `--brick-checkbox-card-gap`, `--brick-checkbox-card-mark`, `--brick-checkbox-card-background`, `--brick-checkbox-card-foreground`, `--brick-checkbox-card-border`, `--brick-checkbox-card-selected-background`, `--brick-checkbox-card-selected-foreground`, `--brick-checkbox-card-selected-border`.

## Customization

Theme owns palette and appearance. Public root hooks use --brick-checkbox-card- prefix: radius, inset, gap, mark, text-size, addon-inset, background, foreground, border, selected-background, selected-foreground and selected-border. Pair foreground/background changes and verify all states. Stable classes follow brick-checkbox-card and __control/__content/__label/__description/__indicator/__addon. Do not attach state behavior to these classes.


## Responsive behavior

Use sparse ResponsiveValue objects for size, variant, orientation, align and justify. Missing initial values retain defaults. Grid/Stack owns tracks.

## Accessibility

Label activation and Space change one native checkbox once. Mixed state is exposed natively. Disabled prevents submission; readOnly preserves submission and focus without changing state. Native reset restores uncontrolled values. Wrap related cards in CheckboxGroup.Root and Fieldset, giving each a unique value. Required group means at least one eligible choice, not every card. Maximum selection retains the ability to remove selected options.

All card descendants must be noninteractive phrasing content. Do not nest links, buttons, additional inputs or labels. Use Card with separate Checkbox and actions for record selection. Use RadioCard for mutually exclusive choices. Optional/custom indicator must not add another role or tab stop.

## Composition, native props, and refs

Root refs target labels; HiddenInput refs target inputs. Native attributes forward to their respective hosts. Root asChild/render must retain label semantics. Content/Addon support asChild; keep all card content noninteractive phrasing content.

## Examples

### Optional closed composition

This application-owned wrapper is optional. Its convenience props are not Root props.

```tsx
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { CheckboxCard, type CheckboxCardRootProps } from "@flowstack-ui/brick";

type OptionCardProps = Omit<CheckboxCardRootProps, "children"> & {
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  addon?: ReactNode;
  indicator?: ReactNode;
  indicatorPlacement?: "start" | "end" | "inside";
  inputProps?: ComponentProps<typeof CheckboxCard.HiddenInput>;
};

export const OptionCard = forwardRef<HTMLInputElement, OptionCardProps>(
  function OptionCard({ label, description, icon, addon, inputProps,
    indicator = <CheckboxCard.Indicator />, indicatorPlacement = "end", ...props }, ref) {
    return (
      <CheckboxCard.Root {...props}>
        <CheckboxCard.HiddenInput {...inputProps} ref={ref} />
        <CheckboxCard.Control>
          {indicatorPlacement === "start" && indicator}
          <CheckboxCard.Content>
            {icon}
            <CheckboxCard.Label>{label}</CheckboxCard.Label>
            {description && <CheckboxCard.Description>{description}</CheckboxCard.Description>}
            {indicatorPlacement === "inside" && indicator}
          </CheckboxCard.Content>
          {indicatorPlacement === "end" && indicator}
        </CheckboxCard.Control>
        {addon && <CheckboxCard.Addon>{addon}</CheckboxCard.Addon>}
      </CheckboxCard.Root>
    );
  },
);
```

Use `indicator={null}` to omit the mark. Keep icon/addon content noninteractive.

[Executable examples](../../../playground/src/components/checkbox-card/) cover all card features and native forms.

## Evidence

- [Component tests](../../../test/components/checkbox-card/)
- [Type tests](../../../test/types/components/checkbox-card.test.ts)
- [Behavior](../../../playground/tests/components/checkbox-card/behavior.spec.ts)
- [Visuals](../../../playground/tests/components/checkbox-card/visual.spec.ts)
- [Manual](../../../playground/manual-tests/checkbox-card.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
