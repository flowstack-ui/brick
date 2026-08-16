# Image

Image presents ordinary raster or vector media with authored alternative text,
deterministic loading/fallback anatomy, fit and focal-position recipes, stable
aspect ratio, and finished framing. Atom owns source lifecycle; Brick owns paint.

## When and where to use

Use Image for project thumbnails, article media, product screenshots, and other
ordinary responsive media that needs a stable frame, crop/contain behavior, or
an authored unavailable state.

Use Image for a larger editorial or profile portrait when its authored aspect
ratio, crop, focal position, or available measure communicates identity. Use
Avatar instead for a compact fixed-square identity token.

## When not to use

Use Avatar for compact fixed-square people or entity identity, Icon for inline
SVG symbols, and Surface.Media for decorative layered background media. Image is not an
optimizer, gallery, lightbox, figure/caption, upload editor, or framework image
loader.

## Installation and imports

```tsx
import { Image } from "@flowstack-ui/brick";
// or
import { Image } from "@flowstack-ui/brick/image";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/image.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Public exports are `Image`, `ImageRoot`, `ImageContent`, `ImageFallback`,
`ImageRootProps`, `ImageContentProps`, `ImageFallbackProps`, `ImageFit`,
`ImagePosition`, `ImageRadius`, and `ImageFrame`.
Direct parts are equivalent to the compound namespace and support imports from
React Server Components without a client wrapper around `Image`.

## Quick start

```tsx
<Image.Root src="/workspace.jpg" ratio={16 / 9}>
  <Image.Content alt="Designers reviewing the workspace" width={1200} height={675} />
  <Image.Fallback>Image unavailable</Image.Fallback>
</Image.Root>
```

## Anatomy and DOM ownership

| Part | Default element | Ref | Responsibility |
| --- | --- | --- | --- |
| `Image.Root` | `div` | `HTMLDivElement` | Atom source state plus Brick frame/recipes |
| `Image.Content` | `img` | `HTMLImageElement` | loaded native image and authored alt |
| `Image.Fallback` | `div` | `HTMLDivElement` | authored selected non-loaded content |

`ratio` is adapted through Atom Aspect Ratio on the same Root element; it adds
no wrapper. Content and Fallback occupy the same grid area and are mutually
exclusive under Atom's source state.

## API

### Root

| Prop | Values | Default |
| --- | --- | --- |
| `src` | image URL string | absent / `idle` |
| `fit` | `cover`, `contain`, `fill`, `none`, `scale-down` | `cover` |
| `position` | `center`, `top`, `bottom`, `start`, `end` | `center` |
| `radius` | `none`, `sm`, `md`, `lg`, `full` | `none` |
| `frame` | `none`, `subtle` | `none` |
| `ratio` | positive finite number | intrinsic |
| `fill` | `boolean` | `false` |
| `onLoadingStatusChange` | `(status) => void` | none |

### Content and Fallback

`Image.Content` requires `alt`. It forwards native image attributes including
`width`, `height`, `srcSet`, `sizes`, `loading`, `decoding`, `fetchPriority`,
`crossOrigin`, `referrerPolicy`, events, data/ARIA attributes, class, style, and
its image ref. `src` belongs to Root.

`Image.Fallback` accepts Atom `when="idle" | "loading" | "error"` or an array
of those values. Its default covers all three non-loaded states. All parts
retain Atom `render` and `asChild` composition.

`fill` makes Root, Content, and Fallback consume a block size established by
the parent. It is useful for media slots and other deliberately sized regions:

```tsx
<Surface.Media>
  <Image.Root fill fit="cover" src="/workspace.jpg">
    <Image.Content alt="" height={675} width={1200} />
  </Image.Root>
</Surface.Media>
```

`fill` does not position Image absolutely or infer geometry. The parent must
establish the available block size; `fit` and `position` still control the
pixels inside it. Prefer `ratio` when the image should establish its own box.

## Visual recipes and states

Fit changes only `object-fit`; position changes only `object-position`. Logical
start/end reverse under RTL without mirroring pixels. Radius clips the complete
frame. `frame="none"` reserves no border geometry, so embedded media reaches
the Root edge. `frame="subtle"` adds a semantic canvas and one-pixel border.
Ratio reserves the box; without it, loaded native dimensions remain intrinsic.

Atom exposes `data-state="idle | loading | loaded | error"`. Content appears
only when loaded. Authored Fallback fills the same reserved box for its selected
states.

## Tokens and CSS hooks

Stable classes are `.brick-image`, `.brick-image__content`, and
`.brick-image__fallback`. Stable slots are `image`, `image-content`, and
`image-fallback` through `data-slot`. Root exposes `data-fit`, `data-position`, `data-radius`,
`data-frame`, optional `data-ratio`, optional `data-fill`, and Atom
`data-state`.

Public variables:

- `--brick-image-fit`
- `--brick-image-position`
- `--brick-image-radius`
- `--brick-image-frame-background`
- `--brick-image-frame-border`
- `--brick-image-frame-border-width`
- `--brick-image-fallback-foreground`
- `--brick-image-fallback-inset`

## Customization

Prefer recipes, then override component variables for a deliberate exception:

```tsx
<Image.Root
  frame="subtle"
  style={{ "--brick-image-frame-background": "var(--brick-color-accent-soft)" }}
>
  <Image.Fallback>Preview unavailable</Image.Fallback>
</Image.Root>
```

Classes and inline styles remain escape hatches. Applications own source
selection, optimization, priority policy, and fallback content.

## Responsive behavior

Root and Content stay within their available inline size. Native width/height
reserve intrinsic ratio; `srcSet` and `sizes` let the browser choose a source.
Image defines no breakpoints. Its owner chooses surrounding Grid, Stack,
Container, and responsive dimensions.

## Accessibility

Every Content requires an authored alt decision. Use concise contextual alt for
informative media and `alt=""` for decoration. Inside an already named action,
the image is usually decorative. Never repeat nearby text, derive a name from a
filename, or write “image of.” Complex images need adjacent extended content.

For a profile portrait, use the person's name when the portrait communicates
identity beyond the surrounding copy. Use `alt=""` only when that specific
portrait is intentionally decorative; the mere presence of a nearby name does
not establish one universal answer.

Fallback adds no live region, focus, role, or generated announcement. Add
application status messaging only when a source change matters to the task.
Image has no keyboard interaction. Forced colors preserves a visible subtle
frame and readable fallback.

## Composition, native props, and refs

Root, Content, and Fallback retain Atom `render` and `asChild`. A composed
Content must remain a native `img`; source and state stay on Root. When Root is
composed into an inline action, choose a valid phrasing host such as `span`.
Native image events and attributes pass to Content, while compatible container
props pass to Root.

## Examples

### Decorative media inside a named link

```tsx
<Link aria-label="Open workspace" href="/workspace">
  <Image.Root asChild src="/workspace.jpg" ratio={16 / 9}>
    <span><Image.Content alt="" /></span>
  </Image.Root>
</Link>
```

### Separate loading and error content

```tsx
<Image.Root src={source} frame="subtle">
  <Image.Content alt="Quarterly report chart" />
  <Image.Fallback when="loading">Loading chart</Image.Fallback>
  <Image.Fallback when={["idle", "error"]}>Chart unavailable</Image.Fallback>
</Image.Root>
```

## Evidence

- [Playground route source](../../../playground/src/components/image/)
- [Focused component tests](../../../test/components/image/)
- [Type tests](../../../test/types/components/image.test.ts)
- [Browser behavior](../../../playground/tests/components/image/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/image/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/image.md)

## Changelog

See the [Image changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
