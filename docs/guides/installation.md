# Installation

Install Brick with its Atom and React peer dependencies:

```bash
npm install @flowstack-ui/brick @flowstack-ui/atom react react-dom
```

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
