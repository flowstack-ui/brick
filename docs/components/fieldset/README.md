# Fieldset

Fieldset coordinates a related control group with a legend, description, and
group error.

## When and where to use

Use it for related checkboxes, radios, or controls that share one question.

## When not to use

Use Field for one control. Fieldset does not validate children or manage their
values.

## Installation and imports

```tsx
import { Fieldset } from "@flowstack-ui/brick/fieldset";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Notifications</Fieldset.Legend>
  <Fieldset.Description>Select all that apply.</Fieldset.Description>
  {/* controls */}
</Fieldset.Root>
```

## Anatomy and DOM ownership

Public Atom-backed parts are `Root` (`fieldset`), `Legend` (`legend`),
`Description` (`p`), and `Error` (`p`) with corresponding element refs. Brick
adds no private DOM.

## API

Public exports are `Fieldset`, `FieldsetRoot`, `FieldsetLegend`,
`FieldsetDescription`, `FieldsetError`, and their corresponding
`FieldsetRootProps`, `FieldsetLegendProps`, `FieldsetDescriptionProps`, and
`FieldsetErrorProps`.

| Prop | Values | Default |
| --- | --- | --- |
| `asChild` | `boolean` | `false` |

All parts inherit Atom relationship/native props, require children, and support
either one `asChild` element or `render`, never both. Root owns group required,
disabled, invalid, generated relationship, and native fieldset behavior.

## Visual recipes and states

Root stacks legend, description, controls, and error with separate group and
control gaps. Atom ownership marks parts so description/error ids and group
state stay connected.

## Tokens and CSS hooks

Stable classes/slots are `brick-fieldset`, `brick-fieldset-legend`,
`brick-fieldset-description`, and `brick-fieldset-error` with matching slots
and Atom state attributes. Every part forwards its overridable `data-slot`.
Public `--brick-fieldset-*` tokens cover group/
control gaps, legend/description/error typography and foreground, disabled/
optional/indicator colors, and indicator gap:

`--brick-fieldset-gap`, `--brick-fieldset-control-gap`,
`--brick-fieldset-legend-font-family`, `--brick-fieldset-legend-font-size`,
`--brick-fieldset-legend-font-weight`, `--brick-fieldset-legend-line-height`,
`--brick-fieldset-legend-foreground`,
`--brick-fieldset-legend-foreground-disabled`,
`--brick-fieldset-description-font-size`,
`--brick-fieldset-description-line-height`,
`--brick-fieldset-description-foreground`,
`--brick-fieldset-error-font-size`, `--brick-fieldset-error-font-weight`,
`--brick-fieldset-error-line-height`, `--brick-fieldset-error-foreground`,
`--brick-fieldset-indicator-foreground`, `--brick-fieldset-indicator-gap`, and
`--brick-fieldset-optional-foreground`.

## Customization

Use native/Atom group props first, then public Fieldset tokens. Customize
public parts with `className`, `style`, `asChild`, or `render`.

## Responsive behavior

Fieldset follows available width and does not prescribe child columns or
breakpoints. Keep legends and errors readable under zoom and localization.

## Accessibility

Use Legend as the group’s question. Atom maintains description/error
relationships and native disabled/fieldset semantics. Errors must explain how
to correct the group.

## Composition, native props, and refs

Parts forward Atom/native props through the discriminated composition contract.
Refs target the rendered elements listed under anatomy.

## Examples

```tsx
<Fieldset.Root invalid>
  <Fieldset.Legend>Contact method</Fieldset.Legend>
  {/* choices */}
  <Fieldset.Error>Select at least one method.</Fieldset.Error>
</Fieldset.Root>
```

## Evidence

- [Playground](../../../playground/src/components/fieldset/FieldsetPage.tsx)
- [Unit test](../../../test/components/fieldset/fieldset.test.tsx)
- [Type owner](../../../test/types/components/fieldset.test.ts)
- [Browser spec](../../../playground/tests/components/fieldset/behavior.spec.ts)
- [Visual spec](../../../playground/tests/components/fieldset/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/fieldset.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
