# Timeline

## When and where to use

Present authored events in chronological order, including timestamps and rich activity.

## When not to use

Use Steps for interactive progress, Feed for live activity and List for unrelated items.
Timeline does not sort, fetch, localize dates or own selection/navigation.

## Installation and imports

```tsx
import { Timeline } from "@flowstack-ui/brick/timeline";
import "@flowstack-ui/brick/styles.css";
```

Root imports are equivalent. Modular CSS:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/timeline.css";
```

## Quick start

```tsx
<Timeline.Root>
  <Timeline.Item>
    <Timeline.Connector><Timeline.Separator /><Timeline.Indicator>1</Timeline.Indicator></Timeline.Connector>
    <Timeline.Content>
      <Timeline.Title>Order received</Timeline.Title>
      <Timeline.Description>We will notify you when it ships.</Timeline.Description>
    </Timeline.Content>
  </Timeline.Item>
</Timeline.Root>
```

## Anatomy and DOM ownership

Root ol, Item li, Connector div, Separator span, Indicator span, Content div,
Title p and Description p. Connector and its artwork are decorative. There is
no implicit heading level, live region, selected state or interactive behavior.

## API

TimelineSize: `sm`, `md`, `lg`, `xl`. TimelineVariant: `soft`, `solid`, `outline`, `plain`.
TimelineTone: `neutral`, `accent`, `info`, `success`, `warning`, `danger`.
TimelineSide: `before`, `after`.

| Prop | Default |
| --- | --- |
| `size` | `md` |
| `variant` | `solid` |
| `tone` | `neutral` |
| `side` | `after` |
| `showLastSeparator` | `false` |

TimelineRootProps adds size=`md`, variant=`solid`, tone=`neutral`, showLastSeparator=`false`.
TimelineItemProps adds optional tone override; TimelineContentProps adds side=`after`.
TimelineConnectorProps, TimelineSeparatorProps, TimelineIndicatorProps,
TimelineTitleProps and TimelineDescriptionProps expose native HTMLElement
attributes, className, style, data-slot, refs and one-element asChild. Native color
is omitted to avoid conflicting with semantic tone. No behavioral callbacks.

Named exports: TimelineRoot, TimelineItem, TimelineConnector, TimelineSeparator,
TimelineIndicator, TimelineContent, TimelineTitle, TimelineDescription. Timeline
namespace exposes the same parts. All types and parts ship at root and /timeline.

## Visual recipes and states

Markers are 16/20/24/32px circles; title text is 12px at sm and 14px otherwise,
description text 12px. Soft, solid, outline and plain alter markers, not the
content background. Semantic tone may differ per event. Last separator is hidden
unless showLastSeparator is true. No hover/selected state exists.

## Tokens and CSS hooks

Classes use .brick-timeline[-part], slots timeline[-part]. Root emits `data-size`,
`data-variant`, `data-tone`, `data-show-last-separator`; Item optional `data-tone`;
Content `data-side`. All parts accept `data-slot`.

Public variables: --brick-timeline-marker-size, --brick-timeline-gap,
--brick-timeline-event-gap, --brick-timeline-separator-color. Circle shape is
intentional and does not become a rounded square when Theme radius changes.

## Customization

Prefer recipes, Theme tokens and documented component variables. Card/Surface
owns enclosing paint; no page-colored patches are needed behind markers.

## Responsive behavior

Content wraps; markers do not shrink. Logical tracks mirror in RTL. A root with
both before and after content uses balanced tracks; a before-only root keeps
the connector at its logical end. Alternate sides explicitly through Content.
Keep the narrow composition readable; no JS breakpoint tree or automatic reordering.

## Accessibility

Preserve ol/li grammar and DOM chronology. Connector, Indicator and Separator
are aria-hidden; repeat meaningful status in content and never place focusable
controls in decorative parts. Composed buttons and links belong in Content.
No live announcements are generated. Author time/dateTime and localized messages.

## Composition, native props, and refs

Parts forward refs to actual HTMLElement hosts. asChild accepts one non-Fragment
element and merges props, events, class/style and refs. Preserve truthful native
semantics. Item must be a direct Root child; Connector and Content direct Item
children. A nested Timeline resets its own recipes and track geometry.

## Examples

```tsx
<Timeline.Root tone="accent" variant="outline" showLastSeparator>
  <Timeline.Item tone="success">
    <Timeline.Content side="before"><Timeline.Description>Today</Timeline.Description></Timeline.Content>
    <Timeline.Connector><Timeline.Indicator>1</Timeline.Indicator><Timeline.Separator /></Timeline.Connector>
    <Timeline.Content><Timeline.Title>Approved</Timeline.Title></Timeline.Content>
  </Timeline.Item>
</Timeline.Root>
```

Use For for authored event collections. Icon/Avatar artwork fits Indicator; rich
attachments, badges and independent actions compose in Content.

## Evidence

- [Playground](../../../playground/src/components/timeline/TimelinePage.tsx)
- [Unit](../../../test/components/timeline/timeline.test.tsx)
- [Types](../../../test/types/components/timeline.test.ts)
- [Browser](../../../playground/tests/components/timeline/behavior.spec.ts)
- [Visual](../../../playground/tests/components/timeline/visual.spec.ts)
- [Manual](../../../playground/manual-tests/timeline.md)

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
