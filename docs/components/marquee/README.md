# Marquee

## When and where to use

Continuous decorative logo, text or passive media strips with one accessible original.

## When not to use

Use Carousel for discrete slide navigation and Stack/Grid for arbitrary interactive widgets.
Marquee does not safely duplicate forms, stateful widgets, portals or autoplay media.

## Installation and imports

```tsx
import { Marquee, useMarquee } from "@flowstack-ui/brick/marquee";
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/marquee.css";
// Or import "@flowstack-ui/brick/styles.css" for aggregate delivery.
```

Root imports from @flowstack-ui/brick and aggregate styles.css are also supported.
Load the stylesheets of composed components as well.

## Quick start

```tsx
function PartnerStrip() {
  const value = useMarquee();
  return <>
    <button onClick={value.togglePause}>{value.requestedPaused ? "Resume" : "Pause"}</button>
    <Marquee.RootProvider value={value} aria-label="Our partners">
      <Marquee.Viewport>
        <Marquee.Content renderReplica={() => <Marquee.Item>Northstar</Marquee.Item>}>
          <Marquee.Item>Northstar</Marquee.Item>
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.RootProvider>
  </>;
}
```

## Anatomy and DOM ownership

Root, RootProvider, Viewport, Content and Item render divs. Context renders no DOM.
Edge renders a decorative span. Only Content's original track owns its forwarded
ref and ID. Explicit visual replicas are inert, aria-hidden presentation divs.
Atom owns behavior, IDs, measurement, observers, replica validation and pause reasons.
Brick owns spacing translation, track keyframes, overflow and decorative edge paint.

## API

MarqueeSide: `start`, `end`, `top`, `bottom`. MarqueeSpacing follows SpacingValue.

| Prop | Default |
| --- | --- |
| `side` | `start` |
| `spacing` | `4` |
MarqueeOptions and MarqueeRootProps accept spacing (default numeric 4 = 16px),
side (start), dir, reverse (false), speed (50 pixels/second), delay (0 seconds),
loopCount (0 = infinite), autoFill (false), paused/defaultPaused (false),
pauseOnInteraction (false), id, ids and translations.regionLabel.
Callbacks: onPauseChange(boolean), onLoopComplete({iteration}),
onComplete({iterations}). Speed must be finite and positive; delay nonnegative;
loopCount a nonnegative integer. Invalid values normalize to safe Atom defaults.
Unresolvable spacing uses stationary originals rather than guessing geometry.

MarqueeController exposes requestedPaused, paused, static, pauseReasons, side, dir,
orientation, reversed, duration, distance, copyCount, iteration, completed and
pause(), resume(), togglePause(), restart(). Safety reasons can pause even a
controlled paused=false value. Restart resets completion but preserves user pause.
useMarquee returns the provider-compatible controller; useMarqueeContext reads it.
MarqueeRootProviderProps requires value from useMarquee. MarqueeContextProps
requires a child render function receiving MarqueeController.
MarqueeContentProps adds renderReplica(index). Factories must be pure, passive and
ID-free. Missing or unsafe replicas use a static fallback. After correcting an
unsafe replica, remount Content to retry validation. Runtime cannot detect all
React side effects, portals or network activity inside a factory.
MarqueeViewportProps and MarqueeItemProps forward native div attributes.
MarqueeEdgeProps adds side (start default) and static HTMLElement projection.

Named exports: MarqueeRoot, MarqueeRootProvider, MarqueeContext, MarqueeViewport,
MarqueeContent, MarqueeItem, MarqueeEdge. The Marquee namespace contains these parts.

## Visual recipes and states

No size, tone, variant or background recipe. Compose ordinary Brick content.
User pause stops at the current transform. Focus, reduced motion, missing geometry
or unsafe replicas expose stationary originals through native overflow.
Finite completion stops at a cycle boundary. Hover and focus cannot undo manual pause.
Dimensions update at a safe cycle boundary; content changes restart measurement.

## Tokens and CSS hooks

Public styling variables: --brick-marquee-edge-color defaults to
var(--brick-color-surface-base); --brick-marquee-edge-size defaults to 20%.
Set them on Root or RootProvider when composing a different owning Surface.
Atom geometry outputs --atom-marquee-spacing, --atom-marquee-distance,
--atom-marquee-duration, --atom-marquee-delay, --atom-marquee-iterations are
read-only integration values, not a second animation API.
Data hooks: `data-slot`, data-state (playing/paused/completed), data-static,
data-orientation, `data-side`, data-reversed, data-generation, data-original,
data-replica. Do not author these behavior-owned state attributes.

## Customization

Compose optional start/end or top/bottom Edge parts, with no pointer interception.
Edges disappear for stationary presentation and forced colors. Card and Surface
own content paint; transforms for artwork remain application-owned.

## Responsive behavior

The viewport takes available inline width. Use Frame blockSize for vertical lanes.
No JS breakpoint swaps or duplicate semantic tracks. AutoFill is bounded to 50
tracks; unsupported geometry falls back to stationary overflow.
Numeric spacing factors and legacy string tokens retain the shared Brick mapping.

## Accessibility

Provide a named region and persistent keyboard/touch pause control for indefinite
motion. Hover-only pausing is insufficient. Focus inside stops motion and reveals
originals. Replicas have no tab stops, IDs or form fields and are aria-hidden/inert.
Reduced motion preserves access through scrolling, not clipped animation:none.
Stationary Viewport defaults to tabIndex=0 with a visible focus outline, enabling
keyboard scrolling even when original items contain no links or buttons.
Content does not become a live announcement on every iteration.

## Composition, native props, and refs

Root/Provider/Viewport/Content/Item forward HTMLDivElement refs, className, style,
data-slot and native events; asChild/render are delegated to Atom projection.
Edge forwards an HTMLElement ref and accepts one-element asChild projection.
Keep Viewport directly beneath Root and Content directly beneath Viewport for
scoped track animation; Item may contain passive Brick compositions.

## Examples

The /marquee playground contains 16 numbered scenarios for directions, vertical
movement, speed, spacing, pause, store access, loops, fades, multiple lanes,
artwork, original links, testimonials, preferences, hidden geometry and safety.

## Evidence

- [Playground](../../../playground/src/components/marquee/MarqueePage.tsx)
- [Unit](../../../test/components/marquee/marquee.test.tsx)
- [Types](../../../test/types/components/marquee.test.ts)
- [Browser](../../../playground/tests/components/marquee/behavior.spec.ts)
- [Visual](../../../playground/tests/components/marquee/visual.spec.ts)
- [Manual](../../../playground/manual-tests/marquee.md)

See playground/manual-tests/marquee.md, component unit/type tests and playground
browser tests. Automated evidence is distinct from pending manual screen-reader,
physical touch and actual browser zoom checks. No manual pass is implied.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
