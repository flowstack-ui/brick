# Carousel

Carousel presents one peer slide at a time with native touch scrolling and optional finished controls.

## When and where to use

Use Carousel for campaign heroes, product stories, galleries, or other bounded sequences where one item should lead at a time. Keep slide messaging and layout in application or Block composition; Brick owns the finished carousel frame and controls while Atom owns selection, rotation, scrolling, and accessibility behavior.

## When not to use

Do not hide information people must compare, required form steps, or unrelated page sections in a Carousel. Use Grid, Stack, List, Tabs, or a purpose-built workflow instead.

## Installation and imports

Import `Carousel` from `@flowstack-ui/brick` or `@flowstack-ui/brick/carousel`, and load `@flowstack-ui/brick/styles.css` once.

For measured modular delivery, load the foundation once and this component stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/carousel.css";
```

Also load the modular stylesheet for every Brick component rendered inside a slide.

## Quick start

```tsx
import * as Carousel from "@flowstack-ui/brick/carousel";

<Carousel.Root defaultValue="first" aria-label="Featured services">
  <Carousel.Viewport>
    <Carousel.Track>
      <Carousel.Slide value="first" label="Web development">First</Carousel.Slide>
      <Carousel.Slide value="second" label="Managed hosting">Second</Carousel.Slide>
    </Carousel.Track>
  </Carousel.Viewport>
  <Carousel.Navigation visibility="interaction">
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Navigation>
  <Carousel.Controls>
    <Carousel.Picker variant="bare">
      <Carousel.PickerItem value="first" />
      <Carousel.PickerItem value="second" />
    </Carousel.Picker>
  </Carousel.Controls>
</Carousel.Root>
```

## Anatomy and DOM ownership

`Root`, `Viewport`, `Track`, `Slide`, `Previous`, `Next`, `Picker`, `PickerItem`, and `RotationControl` adapt Atom. `Navigation` and `Controls` are Brick-only layout wrappers with no behavior. Every control is optional for a manual carousel. If rotation is enabled, `RotationControl`, `Previous`, and `Next` are required.

## API

Root preserves Atom's `value`, `defaultValue`, `onValueChange`, `autoPlay`, `defaultAutoPlay`, `onAutoPlayChange`, `interval`, `loop`, direction, and localized control labels.

In React Server Components, prefer the module namespace shown above. It keeps
compound syntax without dereferencing a client-owned runtime object in the
server module. Client components may also import the frozen `Carousel` object
from the root or subpath.

### Exports

`Carousel`, `CarouselRoot`, `CarouselViewport`, `CarouselTrack`,
`CarouselSlide`, `CarouselNavigation`, `CarouselPrevious`, `CarouselNext`,
`CarouselControls`, `CarouselRotationControl`, `CarouselPicker`, and
`CarouselPickerItem` are available with `CarouselRootProps`,
`CarouselViewportProps`, `CarouselTrackProps`, `CarouselSlideProps`,
`CarouselNavigationProps`, `CarouselPreviousProps`, `CarouselNextProps`,
`CarouselControlsProps`, `CarouselRotationControlProps`, `CarouselPickerProps`,
`CarouselPickerItemProps`, `CarouselSize`, `CarouselControlPlacement`,
`CarouselControlSize`, `CarouselControlShape`, `CarouselControlVariant`,
`CarouselNavigationVisibility`, and `CarouselPickerVariant` from
root and subpath imports.

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` | `md` |
| `controlPlacement` | `overlay`, `outside` | `overlay` |
| `controlShape` | `rounded`, `circle` | `circle` |
| `controlVariant` | `solid`, `soft`, `outline`, `ghost` | `soft` |
| `visibility` (Navigation) | `always`, `interaction` | `always` |
| `variant` (Picker) | `surface`, `bare` | `surface` |

`Previous`, `Next`, and `RotationControl` accept independent `size`, `shape`,
and `variant` overrides. `Navigation visibility="interaction"` reveals arrows
on keyboard or fine-pointer interaction and briefly after touch. Picker's
`surface` and `bare` variants are independent of arrow visibility.

Each Slide and PickerItem requires the same unique `value`. A Slide's `label` becomes the default accessible PickerItem label. Authored children replace the default direction, rotation, or dot artwork without replacing Atom behavior.

## Visual recipes and states

Small, medium, and large root recipes coordinate control and picker geometry;
direction and rotation controls may use `xs` through `xl` independently. Circle
and rounded shapes plus solid, soft, outline, and ghost treatments keep control
hierarchy themeable without application CSS. Overlay placement floats controls
above authored slide content; outside placement moves them into document flow.
Hover, focus-visible, active picker, disabled boundary, playing, and stopped
states change paint without changing behavior.

## Tokens and CSS hooks

Stable classes are `.brick-carousel`, `.brick-carousel__viewport`, `.brick-carousel__track`, `.brick-carousel__slide`, `.brick-carousel__navigation`, `.brick-carousel__previous`, `.brick-carousel__next`, `.brick-carousel__controls`, `.brick-carousel__rotation-control`, `.brick-carousel__picker`, and `.brick-carousel__picker-item`.

Root exposes `data-control-placement`, `data-control-shape`,
`data-control-variant`, `data-size`, `data-touch-navigation`, and `data-slot`;
Navigation exposes `data-visibility`, Picker exposes `data-variant`, and each
direction/rotation control exposes optional `data-size`, `data-shape`, and
`data-variant`. Atom's `data-initialized`, `data-state`, `data-value`,
`data-direction`, and disabled attributes remain available on the relevant
parts. Brick keeps viewport movement instant until `data-initialized` is
present so server-rendered loop boundaries settle before smooth motion begins.

Public variables:

- `--brick-carousel-gap`
- `--brick-carousel-radius`
- `--brick-carousel-control-size`
- `--brick-carousel-control-radius`
- `--brick-carousel-control-foreground`
- `--brick-carousel-control-background`
- `--brick-carousel-control-border-color`
- `--brick-carousel-control-hover-background`
- `--brick-carousel-control-shadow`
- `--brick-carousel-focus-ring`
- `--brick-carousel-picker-gap`
- `--brick-carousel-picker-target-size`
- `--brick-carousel-picker-background`
- `--brick-carousel-picker-padding`
- `--brick-carousel-picker-radius`
- `--brick-carousel-dot-size`
- `--brick-carousel-dot-background`
- `--brick-carousel-dot-active-background`
- `--brick-carousel-transition-duration`
- `--brick-carousel-transition-easing`

## Customization

Choose `size` and `controlPlacement` first. Then customize semantic theme tokens or the documented `--brick-carousel-*` variables. Use part `className` or `style` only for intentional product-specific composition, such as positioning controls around unusual media.

## Responsive behavior

Slides occupy one viewport width and snap during native horizontal scrolling.
Looping moves the authored boundary slide in the requested direction and then
silently rebases; it does not clone authored content. Controls remain authored
and may move outside the media with `controlPlacement="outside"`. Picker dots
are ordinary named buttons, not Tabs. Automatic rotation pauses for focus and
hover and must expose a stop/start control. Inactive slides remain mounted but
are hidden from interaction and assistive technology by Atom.

## Accessibility

Give Root a concise accessible label. Slides are labelled groups, picker items
are direct named buttons, and inactive slides are inert and assistive-hidden.
If automatic rotation is enabled, include RotationControl, Previous, and Next,
and author RotationControl before the rotating viewport so it is the first
focusable carousel control. Rotation pauses for hover and focus and does not
restart after focus without an explicit user action. Interaction-only arrows
remain keyboard focusable even while visually at rest.

## Composition, native props, and refs

Refs target the root, viewport, track, slides, controls, and picker hosts. Atom-backed parts preserve supported native props, render, and `asChild`; Brick-only Navigation and Controls preserve native div props. Carousel does not own slide typography, actions, media, campaign content, or stable hero height.

## Examples

```tsx
<Carousel.Root defaultValue="launch" defaultAutoPlay interval={8000} aria-label="Company highlights">
  <Carousel.Controls>
    <Carousel.RotationControl size="xs" variant="ghost" />
    <Carousel.Picker variant="bare">{pickerItems}</Carousel.Picker>
  </Carousel.Controls>
  <Carousel.Viewport>
    <Carousel.Track>{slides}</Carousel.Track>
  </Carousel.Viewport>
  <Carousel.Navigation visibility="interaction"><Carousel.Previous /><Carousel.Next /></Carousel.Navigation>
</Carousel.Root>
```

## Evidence

- [Playground source](../../../playground/src/components/carousel/)
- [Unit tests](../../../test/components/carousel/carousel.test.tsx)
- [Type tests](../../../test/types/components/carousel.test.ts)
- [Browser behavior](../../../playground/tests/components/carousel/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/carousel/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/carousel.md)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
