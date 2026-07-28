# Toast

Toast reports a temporary, non-blocking application outcome or process update. Brick owns its finished viewport, card, glyph, spacing, and responsive recipes; Atom owns the store, queue, timers, announcements, focus, keyboard, portal, swipe, and lifecycle.

## When and where to use

Use Toast after actions such as save, publish, copy, upload, or connection changes when the durable result remains available elsewhere. A loading toast may update in place for an async operation. One optional action is allowed only when it is safe to ignore.

## When not to use

Do not use Toast as the sole location of essential information, for inline validation, persistent subscription notices, numeric progress, or a required decision. Use Field/Form validation, a future in-flow Alert/Banner, Progress, or AlertDialog respectively.

## Installation and imports

```tsx
import { Toaster, toast } from "@flowstack-ui/brick/toast";
import "@flowstack-ui/brick/styles.css";
```

The same exports are available from `@flowstack-ui/brick`.

## Quick start

Install one Toaster near the application root, then call the imperative helper from event handlers:

```tsx
export function App() {
  return <><Toaster /><button onClick={() => toast.success("Workspace saved")}>Save</button></>;
}
```

Add supporting copy, a custom icon, or one safe-to-ignore action through options:

```tsx
toast.error("Upload failed", {
  description: "The draft remains available in Recent files.",
  action: { label: "Retry", onClick: retryUpload },
});
```

## Anatomy and DOM ownership

`Toaster` renders no wrapper. It installs Atom Provider and a portalled `Toast.Viewport`; its ref targets the visible viewport and is `null` while empty. The default renderer composes the same public styled parts available to advanced consumers: `Toast.Root`, `Icon`, `Content`, `Title`, `Description`, `Actions`, `Action`, and `Close`. Atom-owned polite and assertive announcers are separate and visually hidden. Visible cards are not a second live region.

The compound parts forward their native refs. Root, Title, Description, Action, Close, and Viewport retain their corresponding Atom behavior; Icon, Content, and Actions are Brick-authored visual anatomy. There is intentionally no public Cancel part.

## API

`toast(message, options?)` creates a default toast; `toast.success`, `error`, `warning`, `info`, and `loading` create typed toasts. `toast.update(id, options)`, `dismiss(id?)`, and `promise(promise, states)` retain Atom-owned identity and lifecycle. Title and description are strings; a custom icon may be React content. At least one of title or description should be supplied.

| Concept | Closed values |
| --- | --- |
| type | `default`, `success`, `error`, `warning`, `info`, `loading` |
| position | `top-start`, `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end` |
| width | `responsive`, `compact`, `full` |
| stacking | `separated`, `overlap` |
| swipe direction | `left`, `right`, `up`, `down` |

`Toaster` defaults to position `bottom-end`, maximum visible `3`, close enabled, pointer/focus/page-loss timer pause, hotkey `F8`, label `Notifications`, width `responsive`, stacking `separated`, no swipe, and a 50px threshold if swipe is enabled.

Ordinary, success, warning, and info durations default to 5000ms; error to 8000ms; loading and explicit `Infinity` are persistent. Invalid, zero, or negative finite durations fall back to the type default. Atom normalizes visible limits to a positive integer and update cannot replace an ID.

`renderToast(state)` customizes every imperative card while Atom retains store, queue, timer, announcement, focus, portal, and dismissal ownership. Compose the public `Toast.*` parts using `state.toast`, `state.index`, and `state.expanded`.

Named part exports are `ToastRoot`, `ToastIcon`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastActions`, `ToastAction`, `ToastClose`, and `ToastViewport`. Public types include `ToastApi`, `ToastOptions`, `ToasterProps`, `ToastRenderState`, `ToastType`, `ToastPosition`, `ToastWidth`, `ToastStacking`, and `ToastSwipeDirection`, plus data, update, promise, action, and individual compound-part prop types.

## Visual recipes and states

Toast has one raised card recipe. Six types alter only the accent/glyph and announcement priority, not geometry. Default toasts without an authored icon omit the icon slot and its gutter; title-only and single-line description-only cards use compact content-driven height. Responsive width is near-full on narrow screens and compact on larger screens; `full` fills the safe available viewport width. Overlap layers inactive cards and expands on pointer or keyboard entry. Entering, exiting, optional swipe, dark, forced-colors, and reduced-motion states are driven by stable data attributes and media preferences.

## Tokens and CSS hooks

Stable classes are `.brick-toast-viewport`, `.brick-toast`, and `__icon`, `__content`, `__title`, `__description`, `__actions`, `__action`, and `__close`. Stable slots use the corresponding `toast-*` names. Public attributes include viewport `data-position`, `data-width`, `data-stacking`, `data-expanded`; card `data-type`, `data-state`, `data-index`, `data-swipe`, and `data-swipe-direction`.

Public component variables are `--brick-toast-viewport-z-index`, `--brick-toast-viewport-gap`, `--brick-toast-overlap-step`, `--brick-toast-offset-block-start`, `--brick-toast-offset-block-end`, `--brick-toast-offset-inline-start`, `--brick-toast-offset-inline-end`, `--brick-toast-inline-size`, `--brick-toast-background`, `--brick-toast-foreground`, `--brick-toast-description-foreground`, `--brick-toast-border-color`, `--brick-toast-accent-color`, `--brick-toast-radius`, `--brick-toast-shadow`, `--brick-toast-padding`, `--brick-toast-content-gap`, `--brick-toast-action-gap`, `--brick-toast-motion-duration`, and `--brick-toast-motion-easing`.

## Customization

Prefer public props, then semantic tokens, component variables, compound parts, and finally `className`/`style`.

## Responsive behavior

Logical placement and anatomy follow direction. Cards wrap localized text and remain inside safe-area-aware gutters at 320px and zoom. Application chrome collision remains application-owned; override a public offset variable when a fixed bottom navigation occupies the same edge.

## Accessibility

Default, success, info, and loading updates announce politely; warning and error announce assertively. Each event has exactly one persistent announcement path. Appearance never steals focus. F8 focuses the region when notifications exist; Tab reaches action and close controls; focus/hover/page focus loss pauses finite timers; Escape dismisses only while focus is in the region and restores the previous focus target when empty. Actions and close are native buttons with 44px close targeting. Reduced motion removes translation and spinner rotation; forced colors preserves boundaries and focus.

Consumers must include meaning in message text, keep essential outcomes and optional actions available elsewhere, localize the Toaster `label`/`closeLabel`, and use assertive types only for genuinely important feedback.

## Composition, native props, and refs

Toaster forwards native div `className`, `style`, identifiers, data attributes, and ordinary native props to the viewport; its ref targets that viewport. Behavior-owned role, label, tab index, children, and key handling are configured through dedicated props rather than replaced. `Toast.Root`, Title, Description, Action, Close, and Viewport retain Atom composition where their public props allow it; Brick-authored Icon, Content, and Actions forward native props and refs.

## Examples

```tsx
const id = toast.loading("Uploading archive");
uploadArchive().then(
  () => toast.update(id, { title: "Upload complete", type: "success", duration: 5000 }),
  () => toast.update(id, { title: "Upload failed", type: "error", duration: Infinity }),
);

<Toaster width="full" stacking="overlap" swipeDirection="right" />;
```

## Evidence

- [Playground route](../../../playground/src/components/toast/)
- [Component test](../../../test/components/toast/)
- [Type test](../../../test/types/components/toast.test.ts)
- [Browser test](../../../playground/tests/components/toast/behavior.spec.ts)
- [Visual test](../../../playground/tests/components/toast/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/toast.md)
- [Coverage workbook](../../../playground/component-coverage.xlsx)
- [Packed Consumer](../../../apps/consumer/src/App.tsx)

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
