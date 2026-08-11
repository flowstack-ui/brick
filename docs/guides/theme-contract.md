# Theme contract

Brick publishes a generated, machine-readable description of the values that
a FLOWSTACK theme may provide:

```js
import contract from "@flowstack-ui/brick/theme-contract.json" with { type: "json" };
```

The artifact uses the `flowstack.brick-theme-contract.v1` schema identifier.
It is generated from Brick's token source, component documentation contracts,
and cascade declaration, so theme tooling does not need a copied token list.

The contract records:

- every semantic variable, type, light and dark default, and appearance
  behavior;
- atomic color families that must be reviewed together;
- approved inherited component inputs and their semantic fallbacks;
- local component extension variables and implementation-only variables;
- component recipes, defaults, and state attributes used by qualification;
- the reserved theme and appearance attributes; and
- the exact cascade position for compiled theme CSS.

## Token classifications

`required` values are appearance-dependent semantic colors and shadows that a
complete compiled appearance must contain. `derived` values are stable
semantic foundations that can inherit Brick defaults. `component-input`
values are the small audited set that may inherit from a theme scope.
`optional-extension` values are public component-instance escape hatches, not
global theme controls. `internal` values belong to Brick implementation.
Deprecated values, when introduced, include their replacements.

Brick currently approves Drawer background and radius as inherited component
inputs. Other documented component variables remain available for local
instance customization but are intentionally not accepted as global Theme
inputs until a real product proves that scope safe.

## Cascade and scopes

Compiled theme variables belong in `flowstack.theme`, after `brick.tokens` and
before `brick.foundations`. Unlayered application CSS can still deliberately
override the result.

Use `data-flowstack-theme` to select a named theme and
`data-brick-appearance="light|dark"` for the nearest appearance boundary. A
dual-appearance theme must re-emit its complete required map at nested light
and dark boundaries. See [Appearance and tokens](appearance-and-tokens.md) for
scope and portal rules.

This artifact describes Brick's consumption boundary. Theme authoring,
validation, and CSS generation belong to the separate FLOWSTACK Theme package.
