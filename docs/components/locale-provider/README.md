# Locale Provider

Locale Provider supplies one BCP 47 locale, its derived writing direction, and overridable Brick-authored accessibility text to a React subtree.

## When and where to use

Place `LocaleProvider` near the application or route root when formatting or Brick-owned labels must follow the user's locale. Applications continue to own message catalogs, plural rules, locale loading, and translated product copy.

## When not to use

Do not mount a provider inside every Block, use it as a translation system, or use it merely to set visual alignment. Use native logical layout for visual direction and an application i18n library for authored messages.

## Installation and imports

```tsx
import { LocaleProvider } from "@flowstack-ui/brick/locale-provider";
import "@flowstack-ui/brick/styles.css";
```

Modular installations load the shared foundation and the context-only entry:

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/locale-provider.css";
```

Public exports are `LocaleProvider`, `LocaleProviderProps`, `LocaleContextValue`, `BrickLocaleText`, `useLocaleContext`, `getLocaleDirection`, `defaultLocale`, and `defaultLocaleText`.

## Quick start

```tsx
<LocaleProvider locale="fr-FR">
  <Application />
</LocaleProvider>
```

## Anatomy and DOM ownership

`LocaleProvider` renders no host element. It composes Atom's `DirectionProvider`, so direction-sensitive Brick behavior and formatting share one locale-derived direction.

## API

| Prop | Value | Default |
| --- | --- | --- |
| `locale` | required BCP 47 locale string | none |
| `localeText` | partial `BrickLocaleText` | inherited English defaults |
| `children` | `ReactNode` | none |

`BrickLocaleText` contains `clearInput`, `closeNotification`, `decrementValue`, `incrementValue`, `notifications`, and `toggleOptions`.

## Visual recipes and states

The provider has no visual recipe, DOM, or interactive state.

## Tokens and CSS hooks

The provider exposes no CSS token or data attribute. Its modular stylesheet is intentionally empty because it owns context rather than presentation.

## Customization

Override only Brick-authored generic labels through `localeText`. Product vocabulary belongs in the application's message catalog.

## Responsive behavior

Locale and direction are independent of viewport size. Direction is derived deterministically from the locale without a hydration-time breakpoint.

## Accessibility

The provider supplies defaults for Brick-owned labels and drives logical direction through Atom. Explicit component label props remain authoritative when product context requires more specific wording.

## Composition, native props, and refs

The provider accepts no native element props or ref because it renders no DOM. Nested providers inherit unspecified `localeText` entries from their parent.

## Examples

```tsx
<LocaleProvider
  locale="ar-EG"
  localeText={{ closeNotification: "إغلاق الإشعار" }}
>
  <Dashboard />
</LocaleProvider>
```

## Evidence

- [Playground evidence](../../../playground/src/components/locale-provider/)
- [Focused component tests](../../../test/components/locale-provider/)
- [Type tests](../../../test/types/components/locale-provider.test.ts)
- [Browser behavior](../../../playground/tests/components/locale-provider/behavior.spec.ts)
- [Visual owner](../../../playground/tests/components/locale-provider/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/locale-provider.md)

## Changelog

See the [Locale Provider changelog](CHANGELOG.md) and the [package changelog](../../../CHANGELOG.md).
