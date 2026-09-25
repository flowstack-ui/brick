import type { LocaleProviderProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { LocaleProviderBasic } from "./examples/LocaleProviderBasic.js";
import basicSource from "./examples/LocaleProviderBasic.tsx?raw";
import { LocaleProviderDirection } from "./examples/LocaleProviderDirection.js";
import directionSource from "./examples/LocaleProviderDirection.tsx?raw";
import { LocaleProviderNested } from "./examples/LocaleProviderNested.js";
import nestedSource from "./examples/LocaleProviderNested.tsx?raw";
import { LocaleProviderDynamic } from "./examples/LocaleProviderDynamic.js";
import dynamicSource from "./examples/LocaleProviderDynamic.tsx?raw";
import { LocaleProviderFilter } from "./examples/LocaleProviderFilter.js";
import filterSource from "./examples/LocaleProviderFilter.tsx?raw";
import { LocaleProviderOverride } from "./examples/LocaleProviderOverride.js";
import overrideSource from "./examples/LocaleProviderOverride.tsx?raw";
export const examples: OwnerExample[] = [
{ id: "basic", title: "Setting locale", description: "Formatting is not product-copy translation.", Demo: LocaleProviderBasic, source: basicSource },
{ id: "direction", title: "Reading locale and direction", description: "Set native lang and dir on the application host as well as providing behavior context.", Demo: LocaleProviderDirection, source: directionSource },
{ id: "nested", title: "Nested providers", description: "Unspecified generic labels are inherited.", Demo: LocaleProviderNested, source: nestedSource },
{ id: "dynamic", title: "Dynamic locale", description: "Switching locale updates consumers without changing their numeric data.", Demo: LocaleProviderDynamic, source: dynamicSource },
{ id: "filter", title: "Locale-aware filtering", description: "Matching is locale-aware; the application owns the query and collection.", Demo: LocaleProviderFilter, source: filterSource },
{ id: "override", title: "Explicit filter locale", description: "The hook can intentionally override provider locale.", Demo: LocaleProviderOverride, source: overrideSource }];
const rootRows = [
  {
    "name": "locale",
    "typeLabel": "string",
    "description": "Required locale, inherited by formatters and numeric/date controls."
  },
  {
    "name": "localeText",
    "typeLabel": "Partial<BrickLocaleText>",
    "defaultLabel": "inherited",
    "description": "Only generic Brick-authored labels; not product translation."
  },
  {
    "name": "children",
    "typeLabel": "ReactNode",
    "description": "No wrapper is rendered. Set DOM lang and dir on an existing host."
  }
] satisfies DocsPropDefinition<LocaleProviderProps>[];
export const parts: OwnerPart[] = [
{"id":"props-root","title":"LocaleProvider","description":"Component-owned properties. Native host attributes retain their usual meaning.","rows":rootRows},
{"id":"props-filter","title":"useFilter","description":"Hook options, not provider props. Returns contains, startsWith and endsWith.","rows":[{"name":"locale","typeLabel":"string","defaultLabel":"LocaleProvider","description":"Intentional override."},{"name":"sensitivity","typeLabel":"Intl.CollatorOptions.sensitivity","defaultLabel":"native","description":"Use base to ignore case and accents."},{"name":"usage","typeLabel":"\"search\" | \"sort\"","defaultLabel":"\"search\"","description":"Other Intl.CollatorOptions are forwarded."}]}];
export const sections = ownerSections(examples.slice(1), parts);
