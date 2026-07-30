# Feed

Feed presents a styled dynamic stream of rich, focusable articles. Atom owns
Feed semantics, positions, busy state, focus, and keyboard movement; Brick owns
article separation, density, surfaces, focus paint, and customization hooks.

## When and where to use

Use Feed for activity, news, social posts, or rich notifications that may be
added or removed while a person reads and where article-by-article keyboard
navigation is useful.

## When not to use

Use List for a static meaningful sequence, Data Grid for interactive tabular
data, Tree for hierarchy, and ordinary Stack/Grid for repeated visual layout
without Feed semantics. Timeline remains a separate chronological visual; Feed
does not become a timeline merely because Items have timestamps.

## Installation and imports

```tsx
import { Feed } from "@flowstack-ui/brick";
// or import { Feed } from "@flowstack-ui/brick/feed";
import "@flowstack-ui/brick/styles.css";
```

## Quick start

```tsx
const updates = [
  { id: "publish", title: "Release published", summary: "Version 2 is ready." },
  { id: "review", title: "Review requested", summary: "Morgan requested review." },
];

<Feed.Root aria-label="Release activity" setSize={updates.length}>
  {updates.map((update, index) => (
    <Feed.Item
      aria-describedby={`${update.id}-summary`}
      aria-labelledby={`${update.id}-title`}
      index={index}
      key={update.id}
    >
      <h2 id={`${update.id}-title`}>{update.title}</h2>
      <p id={`${update.id}-summary`}>{update.summary}</p>
    </Feed.Item>
  ))}
</Feed.Root>
```

## Anatomy and DOM ownership

`Feed.Root` adapts Atom's `div` with `role="feed"`. Its direct children are
`Feed.Item` articles; each adapts Atom's focusable `article` with
`role="article"`. Brick adds no inner wrapper, generated heading, divider,
loading UI, or article schema. Authored children remain in their original order.

## API

### Exports

`Feed`, `FeedRootProps`, `FeedItemProps`, `FeedVariant`, and `FeedDensity` are
available from the root package and Feed subpath.

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `plain`, `divided`, `outline` | `divided` |
| `density` | `compact`, `comfortable` | `comfortable` |

Root also preserves Atom `busy`, `setSize`, `render`, `asChild`, native
attributes/events, `className`, `style`, custom `data-slot`, and an
`HTMLElement` ref. `busy` defaults to `false`; `setSize="unknown"` exposes an
unknown total to assistive technology.

Item preserves Atom `position`, `index`, local `setSize`, `render`, `asChild`,
`tabIndex`, native article attributes/events, `className`, `style`, custom
`data-slot`, and an `HTMLElement` ref. Item defaults `tabIndex` to `0`.

Feed has no `items`, loading, size, tone, shape, unread, selection, whole-row
press, pagination, fetching, or virtualization prop.

## Visual recipes and states

Plain separates transparent Items with a gap. Divided creates a continuous
stream with logical rules between adjacent Items. Outline gives every Item its
own bordered, rounded surface and gap so backgrounds and focus rings are not
clipped by a shared root.

Compact reduces only Item padding and root gap. Busy state does not add
opacity, overlays, spinners, or geometry. Items have no whole-article hover or
active affordance. An Item receives the Feed focus outline only when the
article itself is focus-visible; links and buttons inside retain their own
focus paint.

## Tokens and CSS hooks

Stable classes are `.brick-feed` and `.brick-feed__item`; default slots are
`feed` and `feed-item`. Root exposes `data-variant` and `data-density`, while
Atom exposes `data-busy`, `data-position`, and `data-setsize` when applicable.

Public variables:

- `--brick-feed-gap`
- `--brick-feed-item-padding-block`
- `--brick-feed-item-padding-inline`
- `--brick-feed-background`
- `--brick-feed-foreground`
- `--brick-feed-border-color`
- `--brick-feed-border-width`
- `--brick-feed-radius`
- `--brick-feed-divider-color`
- `--brick-feed-focus-color`
- `--brick-feed-focus-width`
- `--brick-feed-focus-offset`
- `--brick-feed-transition-duration`

## Customization

Choose a variant first, then override public variables on a local Root. Use
`plain` when authored Item content deliberately supplies its own surface.
Custom backgrounds remain contained by each outline Item rather than a clipped
shared root.

## Responsive behavior

Feed is one column, fills its containing inline size, and has no component
maximum measure. Long localized and user-generated content wraps without
component horizontal scrolling. Logical padding and separators follow RTL;
the application owns article reading direction and action layout.

## Accessibility

Give Root a stable accessible name and each Item a useful heading or other
name. Reference the primary summary with `aria-describedby` without including
repetitive action labels. `PageDown` and `PageUp` move between Items and reveal
the destination with nearest scrolling. `Control/Command+Home` moves before
Root and `Control/Command+End` moves after it. An authored `onKeyDown` can call
`preventDefault()` to cancel built-in movement.

Set `busy` only while adding or replacing Feed DOM. Supply accurate positions
and totals for paged or virtualized slices. Forced colors retain article
boundaries and focus, and reduced motion removes the incidental border
transition.

## Composition, native props, and refs

Place every Feed child inside a direct Item. Links, buttons, menus, and form
controls inside an Item keep their native behavior and focus order; the Item is
not a whole-row action.

Fetching, insertion/removal, status and error UI, pagination, and scroll
anchoring are application-owned. Compose Scroll Area outside Root only when a
bounded viewport is required. With virtualization, focused Items must remain
mounted and Root must retain direct article children. A future Swipeable Item
nests inside `Feed.Item`; it does not replace the article.

## Examples

### Application-owned busy update

```tsx
<section aria-labelledby="activity-title">
  <h2 id="activity-title">Activity</h2>
  <Feed.Root aria-labelledby="activity-title" busy={updating} setSize="unknown">
    {updates.map((update, index) => (
      <Feed.Item aria-label={update.title} index={index} key={update.id}>
        {update.content}
      </Feed.Item>
    ))}
  </Feed.Root>
  <p aria-live="polite">{updating ? "Updating activity…" : "Activity current"}</p>
</section>
```

## Evidence

- [Playground source](../../../playground/src/components/feed/FeedPage.tsx)
- [Unit tests](../../../test/components/feed/feed.test.tsx)
- [Type tests](../../../test/types/components/feed.test.ts)
- [Browser behavior](../../../playground/tests/components/feed/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/feed/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/feed.md)

The playground is available at `/feed`; `/components/feed` resolves to the same
component route.

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md).
