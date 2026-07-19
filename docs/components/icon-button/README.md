# IconButton

IconButton is a compact action or link with one visible icon. Atom owns button
and anchor semantics, activation, disabled/loading behavior, composition,
native props, safe external links, and refs; Brick supplies square geometry and
the finished visual recipes.

```tsx
import { IconButton } from "@flowstack-ui/brick/icon-button";
import "@flowstack-ui/brick/styles.css";

<IconButton aria-label="Close"><CloseIcon /></IconButton>
<IconButton aria-label="Read documentation" href="/docs"><BookIcon /></IconButton>
```

Use Button when visible text is present and Toggle with `iconOnly` when the
control retains a pressed state. Every IconButton needs an accessible name;
Tooltip is optional help, not a naming mechanism.

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `solid`, `soft`, `outline`, `ghost` | `ghost` |
| `tone` | `neutral`, `accent`, `info`, `success`, `warning`, `danger` | `neutral` |
| `size` | `xs`, `sm`, `md`, `lg`, `xl` | `md` |
| `shape` | `rounded`, `circle` | `rounded` |

Atom's `href`, `target`, `rel`, `disabled`, `loading`, `onPress`, `render`,
`asChild`, native props, class/style/slot, and ref are forwarded. The stable
root hook is `.brick-icon-button`; the visual icon wrapper is
`.brick-icon-button__icon`.

See [CHANGELOG.md](CHANGELOG.md).
