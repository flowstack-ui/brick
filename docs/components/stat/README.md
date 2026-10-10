# Stat

## When and where to use

Present one metric with its label, value, units and authored comparison text.
## When not to use

Use NumberInput for editing, Card for paint, and application logic for calculations,
timers or data fetching. Missing data is not automatically zero.
## Installation and imports

```tsx
import { Stat } from "@flowstack-ui/brick/stat";
import { FormatNumber } from "@flowstack-ui/brick/format-number";
import "@flowstack-ui/brick/styles.css";
```

Root imports from @flowstack-ui/brick are equivalent. Modular delivery uses
styles/core.css once plus styles/stat.css and each composed owner's stylesheet.

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/stat.css";
```
## Quick start

```tsx
<Stat.Root>
  <Stat.Label>Monthly revenue</Stat.Label>
  <Stat.ValueText><FormatNumber value={12450} formatOptions={{ style: "currency", currency: "USD" }} /></Stat.ValueText>
  <Stat.HelpText><Stat.UpIndicator />12% higher than last month</Stat.HelpText>
</Stat.Root>
```
## Anatomy and DOM ownership

Root is dl; Label dt; ValueText dd; ValueUnit span; HelpText dd; Group div.
UpIndicator and DownIndicator are decorative spans with SVG triangles by default.
They do not add status announcements, heading levels or form behavior.
## API

StatSize: `sm`, `md`, `lg`. ResponsiveStatSize accepts a scalar or a nonempty
`initial/sm/md/lg/xl` map. StatTone: `neutral`, `accent`, `info`, `success`, `warning`, `danger`.
StatRootProps and StatGroupProps accept optional size, visually md by default.
Omitted Root size inherits Group's size; explicit Root size wins.
An explicit sparse Root size starts at md, independently of Group. CSS resolves
breakpoints without a mount-time measurement. Group defaults to `role="group"`;
native role overrides and an optional accessible name remain supported.
StatLabelProps, StatValueTextProps, StatValueUnitProps and StatHelpTextProps
accept native HTMLElement attributes, className, style, data-slot, refs and
asChild projection with one element. Native color is omitted.
StatIndicatorProps adds tone: success for UpIndicator, danger for DownIndicator.
Tone can reverse desirability without changing the arrow direction.

Named exports: StatRoot, StatGroup, StatLabel, StatValueText, StatValueUnit,
StatHelpText, StatUpIndicator, StatDownIndicator, all matching the Stat namespace.
All parts forward refs to the actual HTMLElement host. No formatOptions/value
props exist on Stat itself: compose the existing formatting helpers.
## Visual recipes and states

Values target 20/24/30px through semantic typography. Labels are body-sm,
help and units caption. Values and units align on the baseline. No background,
border or fixed height is introduced. Group wraps; long content remains readable.
## Tokens and CSS hooks

Classes: .brick-stat, .brick-stat-group, .brick-stat-label, .brick-stat-value-text,
.brick-stat-value-unit, .brick-stat-help-text and .brick-stat-indicator.
Slots use stat, stat-group, stat-label, stat-value-text, stat-value-unit,
stat-help-text, stat-up-indicator and stat-down-indicator.
Root and Group emit `data-size` only when authored and breakpoint attributes
`data-size-sm/md/lg/xl` for responsive values; indicators emit `data-tone`.
Every part accepts `data-slot`.

Public variables: --brick-stat-gap, --brick-stat-value-size,
--brick-stat-value-line-height, --brick-stat-group-gap, --brick-stat-indicator-color.
## Customization

Prefer size and semantic tone, then Theme and documented component variables.
Put the metric in Card/Surface when a visual boundary is needed.
## Responsive behavior

Root shrinks and wraps without cropping. Both Root and Group accept responsive size.
For example, `<Stat.Group size={{ initial: "sm", md: "lg" }}>` supplies defaults
to Roots that omit size. An explicit scalar Root remains fixed across breakpoints.
Group is a wrapping flex composition;
use Grid or Stack when page-specific column counts or placement are needed.
## Accessibility

Preserve description-list grammar and DOM reading order. HelpText defaults to dd,
not span directly beneath dl. Pair arrows with comparison words; color is not
the sole signal. Indicators are aria-hidden. Composed controls require names.
## Composition, native props, and refs

asChild uses Atom's public composition helper to project onto one non-Fragment
element and merge native props, events, classes, styles and React 18/19 refs,
including cleanup callbacks. Owner and child event handlers both run in that
order. Retain valid hosts. Project HelpText onto span only
inside an existing dd, not directly beneath Root. Native roles and aria props
are application-owned except the indicators' decorative aria-hidden.

HelpText is normal block text flow so inline comparisons and block content both
work. Use HStack with an explicit gap to combine a Badge and separate wording.
Indicators supply their own logical end spacing; don't add a second gap just
between an indicator and its adjacent text. Custom SVG fill/stroke is preserved.
Values use proportional numerals; theme typography remains the size/weight owner.

For progress, place a named Progress in HelpText (or a VStack inside HelpText),
inside a bounded Stat. Do not place a widthless progress bar inside a non-growing
flex item. Use ToggleTip for a click/touch information tip in the label.
## Examples

```tsx
<Stat.Root size="lg">
  <Stat.Label>Average latency</Stat.Label>
  <Stat.ValueText>123.4<Stat.ValueUnit>milliseconds</Stat.ValueUnit></Stat.ValueText>
  <Stat.HelpText><Stat.DownIndicator tone="success" />8% faster</Stat.HelpText>
</Stat.Root>
<Stat.Group size="lg">
  <Stat.Root><Stat.Label>Requests</Stat.Label><Stat.ValueText>124</Stat.ValueText></Stat.Root>
  <Stat.Root size="sm"><Stat.Label>Errors</Stat.Label><Stat.ValueText>0</Stat.ValueText></Stat.Root>
</Stat.Group>
```

Compose LocaleProvider and FormatByte for storage, FormatNumber for currency,
percent, compact and unit formats. Badges, icons, tooltips, progress and skeletons
remain independent components. Applications author loading and unavailable text.
## Evidence

- [Playground](../../../playground/src/components/stat/StatPage.tsx)
- [Unit](../../../test/components/stat/stat.test.tsx)
- [Types](../../../test/types/components/stat.test.ts)
- [Browser](../../../playground/tests/components/stat/behavior.spec.ts)
- [Visual](../../../playground/tests/components/stat/visual.spec.ts)
- [Manual](../../../playground/manual-tests/stat.md)
## Changelog

See [CHANGELOG.md](CHANGELOG.md).
