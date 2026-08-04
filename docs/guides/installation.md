# Installation

Install Brick in an existing React application:

```bash
npm install @flowstack-ui/brick
```

Brick installs its compatible `@flowstack-ui/atom` version automatically; do
not install Atom separately. React and React DOM 18 or newer are peer
dependencies and must be provided by the consuming application.

Import the complete stylesheet once from the application root:

```ts
import "@flowstack-ui/brick/styles.css";
```

This stylesheet contains default tokens, foundations, released component CSS,
and required keyframes. Importing JavaScript does not import CSS automatically.

## Optional reset

New applications may opt into Brick's small page-level reset:

```ts
import "@flowstack-ui/brick/reset.css";
import "@flowstack-ui/brick/styles.css";
```

The reset is never included by `styles.css`. Existing applications can omit it
and keep their own reset or browser defaults.

## Tokens without components

Applications and custom components can load only the public visual tokens:

```ts
import "@flowstack-ui/brick/tokens.css";
```

Do not import both `tokens.css` and `styles.css`; the complete stylesheet
already contains the tokens.

## Optional route-aware CSS

Applications with measured all-component CSS cost may load the shared visual
foundation once and select component styles by the same names as Brick's
JavaScript subpaths:

```ts
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/button.css";
import "@flowstack-ui/brick/styles/card.css";
```

`core.css` contains Brick's layer order, default tokens, and component-scoped
foundations. Import it before component styles. Each component stylesheet owns
that component's rules and every shared visual recipe it renders internally;
for example, `checkbox-group.css` already includes the Checkbox artwork and
`toggle-group.css` already includes the Toggle item recipe. Component styles do
not repeat tokens or foundations.

Do not combine modular component styles with `styles.css` or `tokens.css`.
Choose the complete stylesheet for the simplest and safest installation.
Choose modular styles only when the application can reliably own every style
import and production measurement shows that route-level selection matters.
