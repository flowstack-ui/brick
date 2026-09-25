import type { FormatByteProps } from "@flowstack-ui/brick";
import type { DocsPropDefinition } from "../../shared/PropsTable.js";
import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { FormatByteBasic } from "./examples/FormatByteBasic.js";
import basicSource from "./examples/FormatByteBasic.tsx?raw";
import { FormatByteBits } from "./examples/FormatByteBits.js";
import bitsSource from "./examples/FormatByteBits.tsx?raw";
import { FormatByteLocale } from "./examples/FormatByteLocale.js";
import localeSource from "./examples/FormatByteLocale.tsx?raw";
import { FormatByteDisplay } from "./examples/FormatByteDisplay.js";
import displaySource from "./examples/FormatByteDisplay.tsx?raw";
import { FormatByteSystem } from "./examples/FormatByteSystem.js";
import systemSource from "./examples/FormatByteSystem.tsx?raw";
import { FormatBytePrecision } from "./examples/FormatBytePrecision.js";
import precisionSource from "./examples/FormatBytePrecision.tsx?raw";
export const examples: OwnerExample[] = [
{ id: "basic", title: "Basic", description: "Provide a byte quantity as a number.", Demo: FormatByteBasic, source: basicSource },
{ id: "bits", title: "Bits", description: "With unit=bit, the value already represents bits.", Demo: FormatByteBits, source: bitsSource },
{ id: "locale", title: "Locale", description: "Zero and nonzero values both inherit locale.", Demo: FormatByteLocale, source: localeSource },
{ id: "display", title: "Unit display", description: "Compare long, short and narrow native labels.", Demo: FormatByteDisplay, source: displaySource },
{ id: "system", title: "Decimal and binary", description: "Binary divides by 1024 but retains Intl SI labels, not IEC KiB labels.", Demo: FormatByteSystem, source: systemSource },
{ id: "precision", title: "Precision", description: "Pre-rounding and native Intl options together determine visible digits.", Demo: FormatBytePrecision, source: precisionSource }];
const rootRows = [
  {
    "name": "value",
    "typeLabel": "number",
    "description": "Quantity in the selected source unit."
  },
  {
    "name": "locale",
    "typeLabel": "string",
    "defaultLabel": "LocaleProvider",
    "description": "Explicit locale override."
  },
  {
    "name": "unit",
    "typeLabel": "\"byte\" | \"bit\"",
    "defaultLabel": "\"byte\"",
    "description": "The value is already in this unit."
  },
  {
    "name": "unitSystem",
    "typeLabel": "\"decimal\" | \"binary\"",
    "defaultLabel": "\"decimal\"",
    "description": "Divisor 1000 or 1024; labels remain Intl SI units."
  },
  {
    "name": "unitDisplay",
    "typeLabel": "\"long\" | \"short\" | \"narrow\"",
    "defaultLabel": "\"short\"",
    "description": "Native unit presentation."
  },
  {
    "name": "precision",
    "typeLabel": "number",
    "defaultLabel": "3",
    "description": "Integer 1–100 for pre-rounding. Intl may round the displayed value again."
  },
  {
    "name": "formatOptions",
    "typeLabel": "Intl.NumberFormatOptions",
    "description": "Formatting options except style, unit and unitDisplay."
  }
] satisfies DocsPropDefinition<FormatByteProps>[];
export const parts: OwnerPart[] = [
{"id":"props-root","title":"FormatByte","description":"Component-owned properties. Native host attributes retain their usual meaning.","rows":rootRows}];
export const sections = ownerSections(examples.slice(1), parts);
