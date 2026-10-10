# Nav List

Nav List renders finished native navigation lists, current destinations, and
optional grouped disclosure sections on Atom NavList behavior.

### Presentation and composition controls

Root accepts `variant="soft|solid|outline|ghost|plain"` (default soft),
`radius: Radius` (default control), and the existing size, density, tone, gap
and inset controls. Plain removes decorative hover, press and current fills;
keyboard focus and current weight remain. Radius uses shared core/semantic tokens.

Link accepts `trailingContent` for meaningful noninteractive metadata, such as
`<Badge>12 unread</Badge>`. Unlike decorative `startIcon`/`endIcon`, it is not
aria-hidden or constrained to an icon square. Never nest buttons inside links.

SectionTrigger accepts `indicator`: omission keeps the chevron, a decorative
node replaces it, and null removes it. With `asChild`, supply complete child
anatomy; no automatic indicator or supporting-content wrappers are added.

Resolved `aria-current` controls both announcement and emphasis. An explicit
false overrides active. Disabled composed anchors have no href. Closing content
becomes inert and aria-hidden immediately while shared presence retains exit
animation; focus inside closing content returns to the section trigger.
`forceMount` keeps closed content mounted but hidden, including horizontal lists.

## When and where to use

Use Nav List for sidebar destinations, settings sections, documentation
indexes, and grouped route lists in a page, Sidebar, or Drawer.

## When not to use

Use Link for one destination, Button for action-styled navigation, Navigation
Menu for flyouts, Tabs for panel selection, and List for non-navigation
content. Nav List does not own routing, scrollspy, Sidebar layout, or Drawer
switching.

## Installation and imports

```tsx
import { NavList } from "@flowstack-ui/brick/nav-list";
import "@flowstack-ui/brick/styles.css";
```

The complete stylesheet above is the recommended default. For a measured
route-aware build, replace it with the shared foundation and this component's
stylesheet:

```tsx
import "@flowstack-ui/brick/styles/core.css"; // once at the application root
import "@flowstack-ui/brick/styles/nav-list.css";
```

Add the modular stylesheet for every other Brick component the route renders.
Do not combine modular styles with `styles.css` or `tokens.css`.


Nav List is also exported from `@flowstack-ui/brick`.

## Quick start

```tsx
<NavList.Root aria-label="Settings">
  <NavList.List>
    <NavList.Item>
      <NavList.Link active href="/profile">Profile</NavList.Link>
    </NavList.Item>
    <NavList.Item>
      <NavList.Link href="/security">Security</NavList.Link>
    </NavList.Item>
  </NavList.List>
</NavList.Root>
```

## Anatomy and DOM ownership

```tsx
<NavList.Root>
  <NavList.Section>
    <NavList.SectionLabel />
    <NavList.SectionTrigger />
    <NavList.SectionContent>
      <NavList.List>
        <NavList.Item>
          <NavList.Link />
        </NavList.Item>
      </NavList.List>
    </NavList.SectionContent>
  </NavList.Section>
</NavList.Root>
```

Atom owns the native `nav`, `ul`/`ol`, `li`, anchor, heading, button, section,
generated relationships, disclosure state, current state, disabled
navigation, keyboard behavior, composition, and refs. Brick owns visual
recipes and aligned Link content.

## API

### Independent group spacing

`NavList.Root gap` sets spacing between direct groups. `NavList.Section gap`
sets spacing between its heading/trigger and content. Both accept optional
scalar `SpacingValue` (number or string), resolved like Stack spacing: `"6"`
uses the spacing token, numeric factors use the base spacing unit, and explicit
CSS lengths are supported. Responsive objects are not accepted.

Omitting either prop preserves `--brick-nav-list-section-gap` (normally 8px).
Root gap does not cascade into Section gap; `gap={0}` explicitly removes the
selected gap. Neither prop changes the List's row spacing or density. The
component-owned `--brick-nav-list-gap-input` carries each host's resolved prop
and resets at each Root/Section boundary; prefer the props for local spacing.

```tsx
<NavList.Root gap="6">
  <NavList.Section>
    <NavList.SectionLabel>Components</NavList.SectionLabel>
    <NavList.SectionContent indent="none">
      <NavList.List>{/* NavList.Item > NavList.Link */}</NavList.List>
    </NavList.SectionContent>
  </NavList.Section>
</NavList.Root>
```

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `soft`, `solid`, `outline`, `ghost`, `plain` | `soft` |
| `tone` | `accent`, `neutral` | `accent` |
| `size` | `sm`, `md`, `lg` | `md` |
| `density` | `comfortable`, `compact` | `comfortable` |
| `inset` | `default`, `none` (horizontal row padding) | `default` |
| `radius` | `Radius` | `control` |
| `gap` | scalar `SpacingValue` | theme recipe |
| `orientation` | `vertical`, `horizontal` | `vertical` |

### Link additions

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `startIcon` | `ReactNode` | none |
| `endIcon` | `ReactNode` | none |
| `description` | `ReactNode` | none |
| `trailingContent` | meaningful noninteractive `ReactNode` | none |

Link also preserves Atom `href`, `active`, `current`, `disabled`,
`aria-current`, `render`, and `asChild`. `asChild` delegates all content and
therefore cannot be combined with Brick's supporting-content props.

### SectionTrigger additions

| Prop | Type | Default |
| --- | --- | --- |
| `startIcon` | `ReactNode` | none |
| `indicator` | decorative `ReactNode`; null suppresses | default chevron |

The trigger start icon uses the same decorative size and alignment owner as a
Link start icon. `asChild` delegates the complete trigger anatomy and therefore
cannot be combined with `startIcon` or `indicator`; no automatic chevron is added.

`startIcon` and `endIcon` are decorative and their wrappers are hidden from
assistive technology. A meaningful count or Badge belongs in `trailingContent`
or in `children`; preserve one complete destination without nested controls.

List preserves `ordered`. Section preserves `collapsible`, `open`,
`defaultOpen`, `onOpenChange`, and `disabled`. SectionLabel preserves
`as="h2|h3|h4|h5|h6|div"`. SectionContent preserves `forceMount`. Every part
preserves native props, class, style, slot, ref, `render`, and `asChild`.

Section labels share the row's logical leading inset. For static aligned
groups, use `SectionContent indent="none"`; default indent retains the existing
size-aware nesting offset. The row's reserved 1px border is independent.

SectionContent accepts `indent: NavListIndent` (`default | none`, default
`default`) and emits `data-indent`. Root accepts `inset: NavListInset`
(`default | none`) and emits `data-inset`. Inset changes horizontal row padding
only; density still owns vertical spacing. These controls do not change
disclosure, focus or navigation semantics and work with `render` / `asChild`.

```tsx
<NavList.Root aria-label="Components">
  <NavList.Section>
    <NavList.SectionLabel>Layout</NavList.SectionLabel>
    <NavList.SectionContent indent="none">
      <NavList.List>
        <NavList.Item><NavList.Link href="/stack">Stack</NavList.Link></NavList.Item>
      </NavList.List>
    </NavList.SectionContent>
  </NavList.Section>
</NavList.Root>
```

## Visual recipes and states

The default soft accent recipe gives the current destination a quiet accent
surface and semibold label. Solid uses a filled current row; outline uses a
current border. Ghost keeps the current row transparent while retaining accent
text and a soft hover cue. Neutral changes current/open emphasis to the neutral family.
Size coordinates row target, padding, text, icons, descriptions, and group
indentation.

Hover, pressed, current, open, focus-visible, and disabled remain distinct.
Current state comes from Atom `active`/`aria-current`; Brick never compares
URLs. Vertical links fill their track. Horizontal links remain content-sized
and wrap. Neutral soft current rows use an opaque appearance-aware layered
surface instead of a raised surface that can disappear against a base panel;
their current-hover paint remains separately visible.

Root emits `data-variant`, `data-tone`, `data-size`, and `data-density` for visual recipes.

Density changes spacing independently of typography and icon size. Comfortable
preserves the original size recipes. Compact uses a 1px row gap and, at the
default root font size, 28/35/42px minimum rows for sm/md/lg (including borders).
Long labels and descriptions grow naturally. Use compact for dense desktop
navigation; retain comfortable md or lg for touch-oriented navigation.

```tsx
<NavList.Root aria-label="Documentation" density="compact">
  <NavList.List>
    <NavList.Item><NavList.Link href="/guide">Guide</NavList.Link></NavList.Item>
  </NavList.List>
</NavList.Root>
```

Section labels use primary text and strong weight; idle destinations use
secondary text. Current and hover styling remain owned by tone and variant.
Collapsible SectionContent animates through Atom's measured open/close lifecycle
and becomes immediate under reduced motion.

## Tokens and CSS hooks

Part classes are `.brick-nav-list`, `.brick-nav-list__list`,
`.brick-nav-list__item`, `.brick-nav-list__link`,
`.brick-nav-list__section`, `.brick-nav-list__section-label`,
`.brick-nav-list__section-trigger`, and
`.brick-nav-list__section-content`.

Link anatomy adds `__link-start`, `__link-content`, `__link-label`,
`__link-description`, and `__link-end`.

Start and end icon owners align to the optical center of the first label line.
This keeps one-line rows centered while descriptions can extend below without
pulling the icon toward the combined text block's center. Brick resolves the
unitless typography line-height against `1em` before calculating that offset.

Public variables include `--brick-nav-list-gap`,
`--brick-nav-list-section-gap`, `--brick-nav-list-item-gap`,
`--brick-nav-list-content-inset`, `--brick-nav-list-row-min-block-size`,
`--brick-nav-list-row-padding-block`,
`--brick-nav-list-row-padding-inline`, and its logical
`--brick-nav-list-row-padding-inline-start` / `-end` overrides, row radius,
link foreground/surface state variables, including the current-hover surface,
`--brick-nav-list-current-border`, `--brick-nav-list-focus-ring`,
icon size/gap, description foreground, label typography aliases, and
`--brick-nav-list-section-label-padding-inline`,
`--brick-nav-list-section-label-foreground`,
`--brick-nav-list-section-label-font-size`,
`--brick-nav-list-section-label-font-weight`,
`--brick-nav-list-section-label-line-height`,
`--brick-nav-list-section-label-letter-spacing`, and
`--brick-nav-list-trigger-indicator-size`.

## Customization

```tsx
<NavList.Root
  aria-label="Projects"
  style={{
    "--brick-nav-list-row-radius": "0.25rem",
    "--brick-nav-list-content-inset": "1.5rem",
  }}
>
  {/* destinations */}
</NavList.Root>
```

Prefer closed recipes first. Use public variables for deliberate local themes.
The logical row-padding overrides are useful when leading text and trailing
artwork must align independently with a surrounding Sidebar, Drawer, or shell.

## Responsive behavior

Nav List introduces no breakpoint, panel, maximum height, or scroll owner.
Vertical rows wrap long labels and descriptions. Horizontal navigation wraps
without equal-width items. A containing Sidebar, Drawer, or Scroll Area owns
its responsive and overflow policy.

## Accessibility

Give each navigation landmark a distinguishable `aria-label` or
`aria-labelledby` when a page has more than one. Links retain normal Tab and
Enter behavior. Collapsible triggers retain native button Enter/Space
behavior, generated expanded/control relationships, and focus.

Nav List deliberately adds no menu/tree roles, roving focus, arrow keys, or
typeahead. Current destinations expose `aria-current`; disabled links cannot
navigate. Heading levels remain consumer-selected. Focus, current state, and
disabled state remain visible in forced colors.

## Composition, native props, and refs

Every part forwards its Atom composition contract. A composed Link must
produce a final destination anchor. `asChild` delegates complete child
anatomy; normal and `render` Link paths receive Brick label/icon/description
anatomy.

When top-level rows use Dividers, place each boundary after the complete Item
or collapsible Section it separates. Never place a Divider between a
SectionTrigger and its controlled SectionContent, and keep repeated boundaries
under the same layout owner so spacing remains consistent.

Refs match the rendered parts: landmark/section/label/trigger `HTMLElement`,
List `HTMLUListElement | HTMLOListElement`, Item `HTMLLIElement`, Link
`HTMLAnchorElement`, and Content `HTMLDivElement`.

## Examples

### Grouped disclosure navigation

```tsx
<NavList.Root aria-label="Documentation">
  <NavList.Section collapsible defaultOpen>
    <NavList.SectionLabel as="h2">Foundations</NavList.SectionLabel>
    <NavList.SectionTrigger>Foundations</NavList.SectionTrigger>
    <NavList.SectionContent>
      <NavList.List>
        <NavList.Item>
          <NavList.Link href="/tokens" description="Color and spacing">
            Tokens
          </NavList.Link>
        </NavList.Item>
      </NavList.List>
    </NavList.SectionContent>
  </NavList.Section>
</NavList.Root>
```

### Router composition

```tsx
<NavList.Link asChild active>
  <RouterLink to="/projects">Projects</RouterLink>
</NavList.Link>
```

Routing and active-route derivation remain application-owned.

## Evidence

- [Focused component tests](../../../test/components/nav-list/)
- [Type tests](../../../test/types/components/nav-list.test.ts)
- [Playground route source](../../../playground/src/components/nav-list/)
- [Browser behavior](../../../playground/tests/components/nav-list/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/nav-list/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/nav-list.md)

## Changelog

See the [Nav List changelog](CHANGELOG.md) and
[package changelog](../../../CHANGELOG.md).
