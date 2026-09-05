import { createElement } from "react";
import {
  LocaleProvider,
  defaultLocale,
  getLocaleDirection,
  type BrickLocaleText,
  type LocaleProviderProps,
} from "../../../src/locale-provider.js";

const text: Partial<BrickLocaleText> = { clearInput: "Effacer" };
const props: LocaleProviderProps = { children: "App", locale: "fr-FR", localeText: text };
createElement(LocaleProvider, props);
getLocaleDirection(defaultLocale);
// @ts-expect-error A provider boundary must name its locale.
createElement(LocaleProvider, { children: "App" });
// @ts-expect-error Locale text keys are closed to Brick-owned messages.
const invalidText: Partial<BrickLocaleText> = { save: "Save" };
void invalidText;
