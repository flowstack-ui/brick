import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { DateInputDisabled } from "./examples/DateInputDisabled.js";
import DisabledSource from "./examples/DateInputDisabled.tsx?raw";
import { DateInputInvalid } from "./examples/DateInputInvalid.js";
import InvalidSource from "./examples/DateInputInvalid.tsx?raw";
import { DateInputReadOnly } from "./examples/DateInputReadOnly.js";
import ReadOnlySource from "./examples/DateInputReadOnly.tsx?raw";
import { DateInputControlled } from "./examples/DateInputControlled.js";
import ControlledSource from "./examples/DateInputControlled.tsx?raw";
import { DateInputDefaultValue } from "./examples/DateInputDefaultValue.js";
import DefaultValueSource from "./examples/DateInputDefaultValue.tsx?raw";
import { DateInputBounds } from "./examples/DateInputBounds.js";
import BoundsSource from "./examples/DateInputBounds.tsx?raw";
import { DateInputLeadingZeros } from "./examples/DateInputLeadingZeros.js";
import LeadingZerosSource from "./examples/DateInputLeadingZeros.tsx?raw";
import { DateInputGranularity } from "./examples/DateInputGranularity.js";
import GranularitySource from "./examples/DateInputGranularity.tsx?raw";
import { DateInputTimeOnly } from "./examples/DateInputTimeOnly.js";
import TimeOnlySource from "./examples/DateInputTimeOnly.tsx?raw";
import { DateInputTimeZone } from "./examples/DateInputTimeZone.js";
import TimeZoneSource from "./examples/DateInputTimeZone.tsx?raw";
import { DateInputClear } from "./examples/DateInputClear.js";
import ClearSource from "./examples/DateInputClear.tsx?raw";
import { DateInputPicker } from "./examples/DateInputPicker.js";
import PickerSource from "./examples/DateInputPicker.tsx?raw";
import { DateInputLocale } from "./examples/DateInputLocale.js";
import LocaleSource from "./examples/DateInputLocale.tsx?raw";
import { DateInputRtl } from "./examples/DateInputRtl.js";
import RtlSource from "./examples/DateInputRtl.tsx?raw";
import { DateInputTones } from "./examples/DateInputTones.js";
import TonesSource from "./examples/DateInputTones.tsx?raw";
import { DateInputSizes } from "./examples/DateInputSizes.js";
import SizesSource from "./examples/DateInputSizes.tsx?raw";
import { DateInputVariants } from "./examples/DateInputVariants.js";
import VariantsSource from "./examples/DateInputVariants.tsx?raw";
import { DateInputRange } from "./examples/DateInputRange.js";
import RangeSource from "./examples/DateInputRange.tsx?raw";
import { DateInputTime } from "./examples/DateInputTime.js";
import TimeSource from "./examples/DateInputTime.tsx?raw";
import { DateInputController } from "./examples/DateInputController.js";
import ControllerSource from "./examples/DateInputController.tsx?raw";
import { DateInputForm } from "./examples/DateInputForm.js";
import FormSource from "./examples/DateInputForm.tsx?raw";
import { DateInputHookForm } from "./examples/DateInputHookForm.js";
import HookFormSource from "./examples/DateInputHookForm.tsx?raw";
import { DateInputDefaults } from "./examples/DateInputDefaults.js";
import DefaultsSource from "./examples/DateInputDefaults.tsx?raw";
export const examples: OwnerExample[] = [
{ id: "disabled", title: "Disabled", description: "Use disabled to prevent editing and exclude the field from keyboard navigation and form submission.", Demo: DateInputDisabled, source: DisabledSource },
{ id: "invalid", title: "Invalid", description: "Use invalid to show validation styling. Pair it with an error message explaining how to correct the value.", Demo: DateInputInvalid, source: InvalidSource },
{ id: "readonly", title: "Read-only", description: "Use readOnly to prevent changes while retaining the value for form submission.", Demo: DateInputReadOnly, source: ReadOnlySource },
{ id: "controlled", title: "Controlled", description: "Pass value and onValueChange to manage the selected date in application state.", Demo: DateInputControlled, source: ControlledSource },
{ id: "default-value", title: "Default value", description: "Use defaultValue to initialize an uncontrolled field.", Demo: DateInputDefaultValue, source: DefaultValueSource },
{ id: "bounds", title: "Min and max", description: "Use min and max to restrict valid dates. This example accepts dates within September 2026.", Demo: DateInputBounds, source: BoundsSource },
{ id: "leading-zeros", title: "Leading zeros", description: "Set shouldForceLeadingZeros to zero-pad single-digit months and days.", Demo: DateInputLeadingZeros, source: LeadingZerosSource },
{ id: "granularity", title: "Granularity", description: "Use granularity to choose day, hour, minute or second precision. hideTimeZone keeps the zone abbreviation out of this example.", Demo: DateInputGranularity, source: GranularitySource },
{ id: "time-only", title: "Time only", description: "Use a DateFormatter with hour and minute fields for time-only presentation. hourCycle={12} displays AM/PM; use 24 and an h23 formatter for a 24-hour clock. The submitted value still includes a date and zone.", Demo: DateInputTimeOnly, source: TimeOnlySource },
{ id: "time-zone", title: "Time zone", description: "Use timeZone for zoned values, hourCycle to switch between 12 and 24 hours, and hideTimeZone to hide the abbreviation. EDT means Eastern Daylight Time.", Demo: DateInputTimeZone, source: TimeZoneSource },
{ id: "clear", title: "Clear trigger", description: "Compose ClearTrigger after SegmentGroup to clear the value. Context lets you hide the action while the field is empty.", Demo: DateInputClear, source: ClearSource },
{ id: "date-picker", title: "Date Picker", description: "Compose DatePicker.Input with Trigger and Calendar to synchronize segmented entry and calendar selection under one state owner.", Demo: DateInputPicker, source: PickerSource },
{ id: "locale", title: "Locale", description: "Use locale to change segment order and formatting. This French example places the day before the month.", Demo: DateInputLocale, source: LocaleSource },
{ id: "rtl", title: "RTL", description: "Use dir=rtl with an appropriate locale for right-to-left entry. The clear action follows the logical end.", Demo: DateInputRtl, source: RtlSource },
{ id: "tones", title: "Tones", description: "Use tone=neutral for gray emphasis or tone=accent for the theme accent. Validation error styling remains independent.", Demo: DateInputTones, source: TonesSource },
{ id: "hookform", title: "React Hook Form", description: "Use React Hook Form Controller to bind value, onValueChange and validation state while retaining typed date values.", Demo: DateInputHookForm, source: HookFormSource },
{ id: "defaults", title: "Responsive defaults", description: "Use PropsProvider to share size and variant defaults. Responsive values change presentation at breakpoints without sharing state.", Demo: DateInputDefaults, source: DefaultsSource },
{ id: "sizes", title: "Sizes", description: "Use size to match other form fields, from 2xs through 2xl.", Demo: DateInputSizes, source: SizesSource },
{ id: "variants", title: "Variants", description: "Use variant to choose the field surface and border treatment without changing date-entry behavior.", Demo: DateInputVariants, source: VariantsSource },
{ id: "range", title: "Range", description: "Use selectionMode=range with index={0} and index={1} for the endpoints. Separate Controls give each date its own border while sharing one range value; give repeated Controls unique IDs.", Demo: DateInputRange, source: RangeSource },
{ id: "time", title: "Date and time", description: "Use a zoned DateValue and granularity=second for full date-time entry, or a formatter for time-only segments.", Demo: DateInputTime, source: TimeSource },
{ id: "controller", title: "Controller", description: "Use useDateInput with RootProvider when external controls need to focus, clear or update the same field.", Demo: DateInputController, source: ControllerSource },
{ id: "form", title: "Native form", description: "Set name for canonical date submission and required for native validation. Reset restores the initial uncontrolled value.", Demo: DateInputForm, source: FormSource },
];
export const parts: OwnerPart[] = [
  {
    "title": "Root",
    "description": "Owns segmented date entry and validation.",
    "rows": [
      { "name": "tone", "typeLabel": '"neutral" | "accent"', "defaultLabel": "neutral", "description": "Field focus and segment emphasis; Calendar tone is independent." },
      {
        "name": "referenceDate",
        "typeLabel": "DateValue",
        "description": "Required stable reference shared by server and client."
      },
      {
        "name": "value / defaultValue",
        "typeLabel": "DateValue | null | DateRange",
        "description": "Controlled or initial selection."
      },
      {
        "name": "selectionMode",
        "typeLabel": "\"single\" | \"range\"",
        "description": "Selection value shape.",
        "defaultLabel": "single"
      },
      {
        "name": "onValueChange",
        "typeLabel": "(value) => void",
        "description": "Observe committed selection."
      },
      {
        "name": "locale / timeZone",
        "typeLabel": "string",
        "description": "Locale inherits LocaleProvider."
      },
      {
        "name": "min / max",
        "typeLabel": "DateValue",
        "description": "Inclusive bounds."
      },
      {
        "name": "isDateUnavailable",
        "typeLabel": "(date, locale) => boolean",
        "description": "Reject unavailable days."
      },
      {
        "name": "disabled / readOnly / required / invalid",
        "typeLabel": "boolean",
        "description": "Editing and validation states."
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveControlSize",
        "description": "Seven shared field sizes.",
        "defaultLabel": "lg"
      },
      {
        "name": "variant",
        "typeLabel": "ResponsiveFieldVariant",
        "description": "outline, surface, soft, subtle, ghost, plain or underline.",
        "defaultLabel": "outline"
      },
      {
        "name": "radius / shape",
        "typeLabel": "Radius | DateInputShape",
        "description": "Mutually exclusive; unavailable for underline/responsive variants."
      },
      {
        "name": "granularity",
        "typeLabel": "\"day\" | \"hour\" | \"minute\" | \"second\"",
        "description": "Editing precision."
      },
      {
        "name": "format",
        "typeLabel": "(date, details) => string",
        "description": "Custom display formatting; use formatter to choose editable segments."
      },
      {
        "name": "formatter",
        "typeLabel": "DateFormatter",
        "description": "Explicit segment formatting."
      },
      {
        "name": "placeholderValue / defaultPlaceholderValue",
        "typeLabel": "DateValue",
        "description": "Controlled or initial placeholder date."
      },
      {
        "name": "onPlaceholderChange",
        "typeLabel": "(details) => void",
        "description": "Observe placeholder navigation."
      },
      {
        "name": "onDateFocusChange",
        "typeLabel": "(details: { focused: boolean }) => void",
        "description": "Observe editing focus."
      },
      {
        "name": "hourCycle",
        "typeLabel": "12 | 24",
        "description": "Preferred hour cycle."
      },
      {
        "name": "hideTimeZone / shouldForceLeadingZeros",
        "typeLabel": "boolean",
        "description": "Display options without changing submitted values."
      },
      {
        "name": "name / form",
        "typeLabel": "string",
        "description": "Canonical submission name and external form ID."
      },
      {
        "name": "segmentLabels / translations / ids",
        "typeLabel": "object",
        "description": "Accessible segment names and engine identifiers."
      }
    ],
    "id": "props-root"
  },
  {
    "title": "PropsProvider",
    "description": "Supplies presentation defaults, not state.",
    "rows": [
      {
        "name": "size / variant / tone / radius / shape",
        "typeLabel": "Root recipe props",
        "description": "Nested local choices override inherited presentation."
      }
    ],
    "id": "props-props-provider"
  },
  {
    "title": "RootProvider",
    "description": "Uses an external useDateInput controller.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "UseDateInputReturn",
        "description": "Controller to render; also accepts recipe props."
      }
    ],
    "id": "props-root-provider"
  },
  {
    "title": "Label",
    "description": "Names the segment group.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Visible label."
      }
    ],
    "id": "props-label"
  },
  {
    "title": "Control",
    "description": "Visual field boundary.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Segment groups and actions."
      }
    ],
    "id": "props-control"
  },
  {
    "title": "SegmentGroup",
    "description": "Accessible editing group.",
    "rows": [
      {
        "name": "index",
        "typeLabel": "0 | 1",
        "description": "Range endpoint index.",
        "defaultLabel": "0"
      },
      {
        "name": "aria-label / aria-labelledby",
        "typeLabel": "string",
        "description": "Name each range endpoint explicitly."
      }
    ],
    "id": "props-segment-group"
  },
  {
    "title": "Segments",
    "description": "Renders the locale-ordered segments.",
    "rows": [
      {
        "name": "index",
        "typeLabel": "0 | 1",
        "description": "Range endpoint.",
        "defaultLabel": "0"
      }
    ],
    "id": "props-segments"
  },
  {
    "title": "Segment",
    "description": "One segment from Context.getSegments.",
    "rows": [
      {
        "name": "segment",
        "typeLabel": "DateInputSegment",
        "description": "Segment supplied by the controller."
      },
      {
        "name": "index",
        "typeLabel": "0 | 1",
        "description": "Range endpoint.",
        "defaultLabel": "0"
      }
    ],
    "id": "props-segment"
  },
  {
    "title": "ClearTrigger",
    "description": "Clears the editable selection.",
    "rows": [
      {
        "name": "asChild / render",
        "typeLabel": "boolean | RenderProp",
        "description": "Compose a Button or IconButton without nesting controls."
      },
      {
        "name": "onClick",
        "typeLabel": "MouseEventHandler",
        "description": "Prevent default to cancel clearing."
      }
    ],
    "id": "props-clear-trigger"
  },
  {
    "title": "HiddenInput",
    "description": "Canonical native form control.",
    "rows": [
      {
        "name": "index",
        "typeLabel": "0 | 1",
        "description": "Use one per endpoint with custom children.",
        "defaultLabel": "0"
      },
      {
        "name": "ref",
        "typeLabel": "Ref<HTMLInputElement>",
        "description": "Native form control ref."
      }
    ],
    "id": "props-hidden-input"
  },
  {
    "title": "Context",
    "description": "Reads the current public controller.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(context) => ReactNode",
        "description": "Value, segments, placeholder, focus and value operations."
      }
    ],
    "id": "props-context"
  }
];
const exampleOrder = ["sizes", "variants", "disabled", "invalid", "readonly", "controlled", "default-value", "bounds", "leading-zeros", "granularity", "time-only", "time-zone", "range", "clear", "date-picker", "hookform", "locale", "rtl", "tones", "time", "controller", "defaults", "form"];
examples.sort((a, b) => exampleOrder.indexOf(a.id) - exampleOrder.indexOf(b.id));
export const sections = ownerSections(examples, parts);
