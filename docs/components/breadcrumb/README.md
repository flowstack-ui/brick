# Breadcrumb

Breadcrumb presents a page's ancestry through a named navigation landmark,
ordered destinations and one current location. Brick styles public Atom parts;
route data and collapse policy remain application-owned.

## When and where to use

Use it on hierarchical pages where moving to ancestors helps orientation.

## When not to use

Use Tabs for local views, Nav List for peer navigation and Pagination for results.
Breadcrumb is not browser history or a linear step indicator. Omit it when a
shallow hierarchy only duplicates the nearby navigation.

## Installation and imports

```tsx
import { Breadcrumb } from "@flowstack-ui/brick";
// or import { Breadcrumb } from "@flowstack-ui/brick/breadcrumb";
import "@flowstack-ui/brick/styles.css";
```

For modular loading use:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/breadcrumb.css";
```

The Breadcrumb entry includes its default Icon styling. Load each composed
component's stylesheet too (for example DropdownMenu and Link). Do not combine
modular styles with styles.css or tokens.css. JavaScript requires no CSS processor.

## Quick start

```tsx
<Breadcrumb.Root aria-label="Documentation path">
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Page>Breadcrumb</Breadcrumb.Page></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

## Anatomy and DOM ownership

| Part | Default element | Responsibility |
| --- | --- | --- |
| Root | nav | Named landmark and shared recipes. |
| List | ol | Wrapping ordered hierarchy. |
| Item | li | One ancestor, current location or collapsed placeholder. |
| Link | a | Native ancestor destination. |
| Page | span | aria-current="page"; may compose a real anchor. |
| Separator | li | role="presentation", aria-hidden="true"; decorative chevron. |
| Ellipsis | span inside Item | Static ellipsis artwork or composed named control. |
| Trigger | button | Breadcrumb-styled action, normally a menu trigger. |

No Items or Separators are inserted automatically. Keep Ellipsis inside Item.
Do not nest anchors/buttons or add role=link to inert current text.

## API

### Exports

`Breadcrumb`, `BreadcrumbRoot`, `BreadcrumbList`, `BreadcrumbItem`,
`BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`,
`BreadcrumbTrigger`, their matching `BreadcrumbRootProps`, `BreadcrumbListProps`,
`BreadcrumbItemProps`, `BreadcrumbLinkProps`, `BreadcrumbPageProps`,
`BreadcrumbSeparatorProps`, `BreadcrumbEllipsisProps`, `BreadcrumbTriggerProps`,
plus `BreadcrumbSize`, `BreadcrumbVariant` and `BreadcrumbTone` are exported from
root and breadcrumb subpath.

### Root recipes

| Prop | Values | Default |
| --- | --- | --- |
| `size` | ResponsiveValue<"sm" \| "md" \| "lg"> | `md` |
| `variant` | ResponsiveValue<"plain" \| "underline" \| "subtle"> | `plain` |
| `tone` | "neutral" \| "accent" \| "inherit" | `neutral` |
| ariaLabel | string, legacy name alias | "Breadcrumb" fallback |

Native aria-label takes precedence over ariaLabel. Native aria-labelledby retains
normal accessible-name precedence. The fallback applies only when the final host
has neither naming attribute; child-owned names survive composition.

Size and variant accept scalar values or sparse objects with initial/sm/md/lg/xl.
Defaults apply below the first supplied breakpoint. Brick's thresholds are 30rem,
48rem, 64rem and 80rem. Theme does not change those thresholds.

The closed values are sizes `sm`, `md`, `lg`; variants `plain`, `underline`,
`subtle`; tones `neutral`, `accent`, `inherit`.
Root's base hooks are `data-size`, `data-variant` and `data-tone`.

### Parts, native props and refs

All parts accept native attributes, className, style, data-slot, render and asChild.
The final host must preserve that part's semantics. Recipe props do not leak to HTML.
Link preserves href, target, rel, download and anchor refs. Page supplies
aria-current on an optional composed destination anchor, with visible link focus.
Separator and Ellipsis accept custom children; null suppresses default artwork.
A supplied asChild host is never replaced with default artwork.

Trigger accepts native button props, disabled, onClick/onPress, render/asChild and
an HTMLElement ref. Its type defaults to button, not submit. It has no href,
target, rel or loading API. Trigger inherits Root's typography, tone and size.
Root ref is HTMLElement; List is HTMLOListElement; Item/Separator are HTMLLIElement;
Link is HTMLAnchorElement; default Page/Ellipsis are HTMLSpanElement. Composed
hosts follow Atom's ref contract.

## Visual recipes and states

| Size | Default text/line height | Trail gap | Minimum target |
| --- | --- | --- | --- |
| sm | 12px / 16px | 4px | 24px |
| md | 14px / 20px | 6px | 32px |
| lg | 16px / 24px | 8px | 44px |

Values derive from Brick tokens and can vary with Theme. Any coarse pointer
raises interactive minimum targets to the shared 44px token, independently of
viewport size. Wrapped labels can grow taller. No overlapping hidden hit areas.

Plain stays undecorated, including hover, except for inherit interaction feedback.
Underline remains decorated. Subtle underlines on hover/focus-visible/active.
Trigger is undecorated except for inherit interaction feedback. Static
Page stays undecorated; a linked Page follows the selected link recipe. Current
text uses regular weight and explicit foreground. Hover/pressed/focus never shift
geometry. Every interactive part has its own focus ring without relying on reset.

Neutral plain uses secondary ancestors and primary current text; neutral underline
uses primary text. Accent links use accent text at rest and primary text on hover
or press, with primary current text. Inherit preserves the surrounding foreground
and underlines interactive content on hover/focus/press, even with plain. Keep
status in separately composed content, not the entire ancestry trail. Default icon gap is 8px. Separator
chevron and ellipsis metrics are 1em; directional Icon mirrors once in RTL.

## Tokens and CSS hooks

Breadcrumb shares the semantic `menu-sm`, `menu-md`, and `menu-lg` compact
navigation typography recipes (12/16, 14/20, and 16/24px at default tokens).
Its documented local typography variables remain independent overrides.

Stable classes are `.brick-breadcrumb`, `.brick-breadcrumb-list`,
`.brick-breadcrumb-item`, `.brick-breadcrumb-link`, `.brick-breadcrumb-page`,
`.brick-breadcrumb-separator`, `.brick-breadcrumb-ellipsis`, `.brick-breadcrumb-trigger`.
Root exposes data-size, data-variant, data-tone and responsive data-size-sm,
data-size-md, data-size-lg, data-size-xl, data-variant-sm, data-variant-md,
data-variant-lg, data-variant-xl. Every part retains its documented data-slot.

Local optional extension variables (not global Theme compiler inputs):

- `--brick-breadcrumb-current-font-weight`
- `--brick-breadcrumb-current-foreground`
- `--brick-breadcrumb-decoration-color`
- `--brick-breadcrumb-decoration-offset`
- `--brick-breadcrumb-decoration-thickness`
- `--brick-breadcrumb-ellipsis-foreground`
- `--brick-breadcrumb-ellipsis-hover-background`
- `--brick-breadcrumb-focus-ring`
- `--brick-breadcrumb-font-family`
- `--brick-breadcrumb-font-size`
- `--brick-breadcrumb-font-weight`
- `--brick-breadcrumb-foreground`
- `--brick-breadcrumb-foreground-active`
- `--brick-breadcrumb-foreground-hover`
- `--brick-breadcrumb-item-gap`
- `--brick-breadcrumb-letter-spacing`
- `--brick-breadcrumb-line-height`
- `--brick-breadcrumb-link-gap`
- `--brick-breadcrumb-list-gap`
- `--brick-breadcrumb-separator-foreground`
- `--brick-breadcrumb-separator-opacity`
- `--brick-breadcrumb-separator-size`
- `--brick-breadcrumb-target-size`

Private recipe variables are not customization hooks. Explicit local variables
remain effective at responsive transitions. Use semantic tokens and documented
component variables before a direct stable-part override.

## Customization

```tsx
<Breadcrumb.Root variant="underline" style={{
  "--brick-breadcrumb-foreground": "var(--brick-color-accent-text)",
  "--brick-breadcrumb-decoration-color": "currentColor",
  "--brick-breadcrumb-link-gap": "var(--brick-space-3)",
} as React.CSSProperties}>
  {/* complete anatomy */}
</Breadcrumb.Root>
```

Decoration defaults to softened currentColor, 0.2em offset and 0.08em thickness.
A soft underline is not a universal contrast guarantee; qualify the complete
navigation context. Increased contrast and forced colors restore currentColor.
Theme supplies brand/appearance roles, not literal colors copied into components.
Portal menus must preserve the triggering appearance scope on their visual root.

## Responsive behavior

List wraps; items remain bounded and long tokens break without page overflow.
Keep complete labels and logical order at narrow widths and high zoom. Responsive
size and variant use static CSS, with no resize observer or viewport state.
Automatic collapse/measurement and route policy are outside Breadcrumb.

## Accessibility

Provide a useful landmark name, complete link labels, ordered ancestors and one
current location. Separators are hidden. Static Ellipsis stays out of Tab order;
icon-only controls need a name on the control. Native links retain Tab/Enter,
modifier keys, context menus, target and download behavior. Breadcrumb has no
arrow-key/roving-focus model. Menu keys and focus return belong to DropdownMenu.
If an application replaces an inline-expansion control, it must intentionally move
focus to a sensible revealed destination. Qualify text contrast, focus, reflow,
forced colors, actual zoom and assistive technology in the consuming context.

## Composition, native props, and refs

Every part forwards native props and refs through its public Atom owner. Preserve
one semantic final host with render or asChild; links remain destinations and
Trigger remains a button action.

## Examples

### Router and current-page links

```tsx
<Breadcrumb.Link asChild href="/docs"><RouterLink>Docs</RouterLink></Breadcrumb.Link>
<Breadcrumb.Page asChild><a href="/docs/breadcrumb">Breadcrumb</a></Breadcrumb.Page>
```

Router adapters must forward the destination, native attributes and anchor ref,
preserving modified clicks and context menus. Use one current location.

### Ancestor menu

```tsx
<Breadcrumb.Item>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <Breadcrumb.Trigger>Ancestors</Breadcrumb.Trigger>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content>
        <DropdownMenu.Item value="docs" asChild><Link variant="plain" href="/docs">Docs</Link></DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
</Breadcrumb.Item>
```

Use a named Trigger with decorative Ellipsis for a hidden-level menu. Keep the
trigger mounted for focus return. DropdownMenu owns keyboard navigation, state,
selection, dismissal and portal behavior; Breadcrumb adds none of those systems.

### Closed component and custom separators

Map stable application item IDs to Item/Link/Page. Render each title once,
separators only between items, and no empty landmark for zero items. The playground
includes the complete typed wrapper for zero/one/many items and an optional linked
current page. Use explicit Separator children `/` for a slash or an Icon for
custom directional artwork; do not mirror a directional Icon twice.

A named static Ellipsis should use `role="img"` with its accessible label. When Ellipsis decorates a Trigger, name the Trigger and keep the artwork decorative.

### Migration

Use subtle to retain the former plain interaction underline. Plain does not
underline, except for inherited-color interaction feedback. Replace former status
tones with neutral/accent/inherit and compose status separately. Sizes move from
14/16/18px to 12/14/16px, with 24/32/44px minimum targets
and the coarse-pointer floor. Explicit `/` preserves the old separator. Use the
current-font-weight variable for medium weight. Remove playground icon margins;
Breadcrumb now owns that spacing. ariaLabel remains supported.

## Evidence

- [Playground](../../../playground/src/components/breadcrumb/BreadcrumbPage.tsx): /breadcrumb
- [Qualification](../../../playground/src/components/breadcrumb/BreadcrumbEvidence.tsx): /breadcrumb?qualification=1
- [Unit](../../../test/components/breadcrumb/breadcrumb.test.tsx)
- [Types](../../../test/types/components/breadcrumb.test.ts)
- [Browser](../../../playground/tests/components/breadcrumb/behavior.spec.ts)
- [Visual](../../../playground/tests/components/breadcrumb/visual.spec.ts)
- [Manual](../../../playground/manual-tests/breadcrumb.md)
- Coverage workbook: playground/component-coverage.xlsx, Breadcrumb sheet.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
