# Carousel

## When and where to use

Present peer images, cards or stories in one or several visible slides. Atom owns measured scrolling and interaction; Brick supplies finished recipes.

## When not to use

Use Grid, Stack or List when every item must be visible for comparison. Carousel is not a media optimizer, virtualization engine or arbitrary animation system.

## Installation and imports

Install `@flowstack-ui/brick` with its supported React peer. Root and carousel subpath exports share the same implementation. Applications do not import Atom.

For modular loading:

```tsx
import { Carousel } from "@flowstack-ui/brick/carousel"
import "@flowstack-ui/brick/styles/core.css"
import "@flowstack-ui/brick/styles/carousel.css"
```

## Quick start

```tsx
import { Carousel } from '@flowstack-ui/brick'
import '@flowstack-ui/brick/styles.css'

<Carousel.Root loop={false} controlPlacement="outside" tone="neutral" spacing={4}>
  <Carousel.Viewport><Carousel.Track>
    <Carousel.Slide value="one" label="First story">…</Carousel.Slide>
    <Carousel.Slide value="two" label="Second story">…</Carousel.Slide>
  </Carousel.Track></Carousel.Viewport>
  <Carousel.Controls>
    <Carousel.Previous /><Carousel.Indicators variant="bare" />
    <Carousel.Next /><Carousel.ProgressText />
  </Carousel.Controls>
</Carousel.Root>
```

Use the public `carousel` subpath for module imports. Server-component consumers
can use module-namespace parts; use the frozen Carousel object in client code.
Load `styles.css`, or `core.css` plus `carousel.css` and every authored content
owner stylesheet. Carousel's modular CSS includes its shared action recipes.

## Anatomy and DOM ownership

| Part | Responsibility |
| --- | --- |
| Root / RootProvider | Controller host and visual defaults |
| PropsProvider | Visual defaults only; no state engine or element |
| Viewport / Track / Slide | Scrolling, layout and stable content identity |
| Navigation | Optional arrows, always or interaction-visible |
| Previous / Next / RotationControl | Single Atom action host, shared Button/IconButton recipes |
| Controls | Optional coherent control row |
| Picker / PickerItem | Authored dot or thumbnail indicators |
| Indicators | Generated page indicators; itemProps customize items |
| AutoplayIndicator | Authored play/paused artwork |
| ProgressText | Page progress with optional format callback |
| Context | Render-prop access to controller |



## API

Choose `value/defaultValue/onValueChange` or `page/defaultPage/onPageChange`,
not both. `useCarousel` with `RootProvider value={controller}` exposes the same
engine for external controls; `Context` and `useCarouselContext` expose the
active controller. Methods include selectPage/selectValue, goNext/goPrevious,
play/pause and refresh. Automatic Indicators use `pageSnapPoints`, not raw item
count. Explicit PickerItem accepts a value or page target.

Use `slidesPerPage` (positive, including fractional values), `slidesPerMove`
(integer or auto), `autoSize`, `orientation`, `spacing`, `padding`, `snapType`,
and Slide `snapAlign`. Numeric spacing/padding values select Brick spacing
tokens; strings may name tokens or CSS lengths. Padding exposes neighboring
slides. Variable-size items use authored dimensions. Vertical viewports require
a definite parent height; `fill` propagates a parent-owned height through parts.

`loop` remains true by default for compatibility; comparison examples explicitly
disable it. No authored content is cloned. Short loops that cannot recycle
content without duplication settle instantly at the boundary. Native smooth
scrolling does not expose an authored easing/duration guarantee. Reduced motion
disables smooth scrolling and decorative control transitions.

| Prop | Default |
| --- | --- |
| `size` | `md` |
| `controlPlacement` | `overlay` |
| `controlShape` | `circle` |
| `controlVariant` | `soft` |
| `visibility` | `always` |
| `variant` | `surface` |

- `CarouselSize`: `sm`, `md`, `lg`
- `CarouselControlPlacement`: `overlay`, `outside`
- `CarouselControlSize`: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- `CarouselControlShape`: `rounded`, `circle`
- `CarouselControlVariant`: `solid`, `soft`, `subtle`, `outline`, `ghost`, `surface`, `plain`
- `CarouselNavigationVisibility`: `always`, `interaction`
- `CarouselPickerVariant`: `surface`, `bare`

Named exports and their prop types:

`Carousel`, `CarouselRootProvider`, `CarouselPropsProvider`, `CarouselContext`, `CarouselIndicators`, `CarouselProgressText`, `CarouselAutoplayIndicator`, `useCarousel`, `useCarouselContext`, `CarouselRootProviderProps`, `CarouselPropsProviderProps`, `CarouselRecipeProps`, `CarouselIndicatorsProps`, `CarouselProgressTextProps`, `CarouselAutoplayIndicatorProps`, `CarouselTone`, `UseCarouselProps`, `CarouselPageChangeDetails`, `CarouselTranslations`, `CarouselControls`, `CarouselNavigation`, `CarouselNext`, `CarouselPicker`, `CarouselPickerItem`, `CarouselPrevious`, `CarouselRoot`, `CarouselRotationControl`, `CarouselSlide`, `CarouselTrack`, `CarouselViewport`, `CarouselControlPlacement`, `CarouselControlShape`, `CarouselControlSize`, `CarouselControlVariant`, `CarouselControlsProps`, `CarouselNavigationProps`, `CarouselNavigationVisibility`, `CarouselNextProps`, `CarouselPickerItemProps`, `CarouselPickerProps`, `CarouselPickerVariant`, `CarouselPreviousProps`, `CarouselRootProps`, `CarouselRadius`, `CarouselRotationControlProps`, `CarouselSize`, `CarouselSlideProps`, `CarouselTrackProps`, `CarouselViewportProps`.

## Visual recipes and states

Root size accepts responsive `sm`, `md`, `lg`. Controls use the complete shared action sizes and variants listed above. Root controlVariant/controlTone/controlShape/controlSize supply defaults; local props win. Indicator tone is neutral, contrast or accent (legacy default). Controls have independent shared Button tones. Dot and thumbnail indicators have independent geometry; indicatorShape may be circle or pill.

`data-control-placement`, `data-control-shape`, `data-control-variant`, `data-shape`, `data-size`, `data-slot`, `data-touch-navigation`, `data-variant`, `data-visibility` are stable part/state hooks. Atom also supplies data-page, data-visible, data-in-view, data-dragging and data-programmatic.

## Tokens and CSS hooks

`--brick-carousel-gap`, `--brick-carousel-radius`, `--brick-carousel-control-size`, `--brick-carousel-control-radius`, `--brick-carousel-control-foreground`, `--brick-carousel-control-background`, `--brick-carousel-control-border-color`, `--brick-carousel-control-hover-background`, `--brick-carousel-control-shadow`, `--brick-carousel-focus-ring`, `--brick-carousel-picker-gap`, `--brick-carousel-picker-target-size`, `--brick-carousel-picker-background`, `--brick-carousel-picker-padding`, `--brick-carousel-picker-radius`, `--brick-carousel-dot-size`, `--brick-carousel-dot-background`, `--brick-carousel-dot-active-background`, `--brick-carousel-transition-duration`, `--brick-carousel-transition-easing`.

These legacy variables remain overrides over shared action recipes. New spacing/padding, thumbnail and dot hooks are described below.

## Customization

Prefer props, then semantic tokens, then public component variables and stable
classes. Useful variables include `--brick-carousel-spacing`,
`--brick-carousel-padding`, `--brick-carousel-radius`,
`--brick-carousel-dot-background`, `--brick-carousel-dot-active-background`,
`--brick-carousel-dot-size`, `--brick-carousel-picker-target-size`,
`--brick-carousel-picker-gap`, `--brick-carousel-picker-background`,
`--brick-carousel-thumbnail-size` and `--brick-carousel-thumbnail-radius`.
Shared action color/size hooks belong to Button/IconButton. Private fallback variables are not an application API.

## Responsive behavior

Root size and action sizes accept sparse breakpoint maps. A local map replaces the inherited map and missing initial values use owner defaults. Fractional slidesPerPage shows adjacent content; autoSize lets authored content dimensions own item size. Vertical viewports require an explicit height. Use the preview environment for appearance and direction.

## Accessibility

Give the root and slides meaningful labels. Visible peer slides remain usable;
do not add application aria-hidden/inert logic keyed only to the selected
value. Fully offscreen slides are inactive. The optional inViewThreshold is
separate visibility reporting. Supply slideCount and Slide index when SSR needs
page-based initial estimates. Optional IDs and translations are public.

Automatic rotation requires a visible RotationControl before the viewport,
plus direct navigation. Use autoPlay/defaultAutoPlay/interval and status
callbacks. Focus stops rotation until restart; hover and hidden-document state
pause it. ProgressText is not a second live region. Mouse drag is opt-in;
nested links and editors retain their own interaction. Use native Tab order.

Compose Image.Root/Content/Fallback for media, Card for cards, Dialog for a
lightbox and the normal Button single-host composition when text controls are
needed. Applications own media delivery, lazy-loading priorities and content.

## Composition, native props, and refs

Native props, className, style and composed refs reach their documented host. asChild/render preserve one host. Use `<Carousel.Next asChild unstyled><Button>Next</Button></Carousel.Next>` for text actions; unstyled removes the square icon recipe, not behavior. The corresponding Previous and RotationControl support the same path. PropsProvider supplies visual defaults; RootProvider supplies one useCarousel controller. Internal registration and transport fields are not supported application commands.

## Examples

The normal page presents Basic, controlled page, external controller, arrows, indicators, thumbnails, multiple slides, peeking, variable size, vertical, drag, autoplay, images, cards, lightbox, dynamic items, fill, interaction navigation, responsive recipes and RTL. Each preview displays its actual paired source. Legacy regression fixtures remain at `?qualification=1`.

## Evidence

- [Examples](../../../playground/src/components/carousel/)
- [Units](../../../test/components/carousel/)
- [Types](../../../test/types/components/carousel.test.ts)
- [Behavior](../../../playground/tests/components/carousel/behavior.spec.ts)
- [Visuals](../../../playground/tests/components/carousel/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/carousel.md)

Automated results do not replace physical-device, screen-reader, zoom or owner visual qualification. See the manual protocol for unperformed gates.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
