# Fieldset


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

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/fieldset.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


## Quick start

```tsx
<Fieldset.Root>
  <Fieldset.Legend>Notifications</Fieldset.Legend>
  <Fieldset.Description>Select all that apply.</Fieldset.Description>
  <Fieldset.Content>{/* controls */}</Fieldset.Content>
</Fieldset.Root>
```

## Anatomy and DOM ownership

Public Atom-backed parts are `Root` (`fieldset`), `Legend` (`legend`),
`Description` (`p`), `Error` (`p`), and `Context` (no host). Brick adds
`Content` (`div`) for vertical spacing. DOM parts forward element refs.

## API

Public exports are `Fieldset`, `FieldsetRoot`, `FieldsetLegend`,
`FieldsetDescription`, `FieldsetError`, and their corresponding
`FieldsetRootProps`, `FieldsetLegendProps`, `FieldsetDescriptionProps`, and
`FieldsetErrorProps`, plus `FieldsetContent`, `FieldsetContentProps`,
`FieldsetContext`, `useFieldsetContext` and `FieldsetSize`.

| Prop | Values | Default |
| --- | --- | --- |
| `asChild` | `boolean` | `false` |
| Root `size` | responsive `sm`, `md`, `lg` | `md` |
| Content `gap` | responsive spacing value | size recipe |

Behavioral DOM parts inherit Atom relationship/native props, require children, and support
either one `asChild` element or `render`, never both. Root owns group required,
disabled, invalid, generated relationship, and native fieldset behavior.
Content accepts native div props and `asChild`; Context takes a render-function child.

## Visual recipes and states

Legend remains a direct native child. Legend and Description have an 8px gap.
The header-to-content gap is 8px (`sm`), 16px (`md`) or 24px (`lg`). Without
Description, that section gap follows Legend. Content's independent default
field gaps are 6/16/16px; its `gap` prop changes only that inner spacing.

Disabled labels and legends fade to 50%; the structural container does not fade. Descendant controls own their disabled treatment so Fieldset inheritance never compounds opacity.

Fieldset coordinates a related control group with a legend, description, and
group error.

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
### Form-family API

Fieldset adds Content, Context and useFieldsetContext. Content renders a div,
accepts native HTML attributes, forwards its ref, supports asChild and responsive
gap. It owns vertical rhythm between related controls without adding paint.
Root.size accepts responsive sm/md/lg (default md). Each size adjusts group
spacing and legend hierarchy.

Group invalid state does not mark every independent Field invalid. Apply invalid
to the fields that need correction; Fieldset may summarize their state. Native
fieldset/legend grouping and disabled semantics remain. Required-group rules
such as selecting at least one choice belong to the choice primitive/application.
Legends and error text no longer use wavy underlines or error-edge stripes.
