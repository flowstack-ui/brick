import type { FormatNumberProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { FormatNumberBasic } from "./examples/FormatNumberBasic.js";
import basicSource from "./examples/FormatNumberBasic.tsx?raw";
import { FormatNumberPercent } from "./examples/FormatNumberPercent.js";
import percentSource from "./examples/FormatNumberPercent.tsx?raw";
import { FormatNumberCurrency } from "./examples/FormatNumberCurrency.js";
import currencySource from "./examples/FormatNumberCurrency.tsx?raw";
import { FormatNumberLocale } from "./examples/FormatNumberLocale.js";
import localeSource from "./examples/FormatNumberLocale.tsx?raw";
import { FormatNumberUnit } from "./examples/FormatNumberUnit.js";
import unitSource from "./examples/FormatNumberUnit.tsx?raw";
import { FormatNumberCompact } from "./examples/FormatNumberCompact.js";
import compactSource from "./examples/FormatNumberCompact.tsx?raw";
import { FormatNumberPrecision } from "./examples/FormatNumberPrecision.js";
import precisionSource from "./examples/FormatNumberPrecision.tsx?raw";
export const examples: OwnerExample[] = [
{ id: "basic", title: "Basic", description: "Format numbers where they are rendered.", Demo: FormatNumberBasic, source: basicSource },
{ id: "percent", title: "Percentage", description: "The input is a fraction.", Demo: FormatNumberPercent, source: percentSource },
{ id: "currency", title: "Currency", description: "Choose the currency explicitly.", Demo: FormatNumberCurrency, source: currencySource },
{ id: "locale", title: "Locale", description: "Provider inheritance and a deliberate local override.", Demo: FormatNumberLocale, source: localeSource },
{ id: "unit", title: "Unit", description: "Native Intl provides measurement labels.", Demo: FormatNumberUnit, source: unitSource },
{ id: "compact", title: "Compact notation", description: "Compact output for summary counts.", Demo: FormatNumberCompact, source: compactSource },
{ id: "precision", title: "Precision and signs", description: "Compare fraction digits, significant digits and signed output.", Demo: FormatNumberPrecision, source: precisionSource }];
const rootRows = [
  {
    "name": "value",
    "typeLabel": "number",
    "description": "Numeric input, including native NaN and infinities."
  },
  {
    "name": "locale",
    "typeLabel": "string",
    "defaultLabel": "LocaleProvider",
    "description": "Explicit locale override."
  },
  {
    "name": "formatOptions",
    "typeLabel": "Intl.NumberFormatOptions",
    "defaultLabel": "{}",
    "description": "Native Intl options. Invalid options throw native errors."
  }
] satisfies DocsPropDefinition<FormatNumberProps>[];
export const parts: OwnerPart[] = [
{"id":"props-root","title":"FormatNumber","description":"Component-owned properties. Native host attributes retain their usual meaning.","rows":rootRows}];
export const sections = ownerSections(examples.slice(1), parts);
