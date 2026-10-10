import { DatePickerMultipleText } from "./examples/DatePickerMultipleText.js";
import MultipleTextSource from "./examples/DatePickerMultipleText.tsx?raw";
import { DatePickerLocalization } from "./examples/DatePickerLocalization.js";
import LocalizationSource from "./examples/DatePickerLocalization.tsx?raw";
import { DatePickerDisabled } from "./examples/DatePickerDisabled.js";
import DisabledSource from "./examples/DatePickerDisabled.tsx?raw";
import { DatePickerReadOnly } from "./examples/DatePickerReadOnly.js";
import ReadOnlySource from "./examples/DatePickerReadOnly.tsx?raw";
import { DatePickerDefaultView } from "./examples/DatePickerDefaultView.js";
import DefaultViewSource from "./examples/DatePickerDefaultView.tsx?raw";
import { DatePickerDefaultValue } from "./examples/DatePickerDefaultValue.js";
import DefaultValueSource from "./examples/DatePickerDefaultValue.tsx?raw";
import { DatePickerMinMax } from "./examples/DatePickerMinMax.js";
import MinMaxSource from "./examples/DatePickerMinMax.tsx?raw";
import { DatePickerUnavailable } from "./examples/DatePickerUnavailable.js";
import UnavailableSource from "./examples/DatePickerUnavailable.tsx?raw";
import { DatePickerFixedWeeks } from "./examples/DatePickerFixedWeeks.js";
import FixedWeeksSource from "./examples/DatePickerFixedWeeks.tsx?raw";
import { DatePickerMultipleMonths } from "./examples/DatePickerMultipleMonths.js";
import MultipleMonthsSource from "./examples/DatePickerMultipleMonths.tsx?raw";
import { DatePickerOpenOnClick } from "./examples/DatePickerOpenOnClick.js";
import OpenOnClickSource from "./examples/DatePickerOpenOnClick.tsx?raw";
import { DatePickerClear } from "./examples/DatePickerClear.js";
import ClearSource from "./examples/DatePickerClear.tsx?raw";
import { DatePickerHeaderLayout } from "./examples/DatePickerHeaderLayout.js";
import HeaderLayoutSource from "./examples/DatePickerHeaderLayout.tsx?raw";
import { DatePickerMonthYearSelect } from "./examples/DatePickerMonthYearSelect.js";
import MonthYearSelectSource from "./examples/DatePickerMonthYearSelect.tsx?raw";
import { DatePickerToday } from "./examples/DatePickerToday.js";
import TodaySource from "./examples/DatePickerToday.tsx?raw";
import { DatePickerMonthRange } from "./examples/DatePickerMonthRange.js";
import MonthRangeSource from "./examples/DatePickerMonthRange.tsx?raw";
import { DatePickerYear } from "./examples/DatePickerYear.js";
import YearSource from "./examples/DatePickerYear.tsx?raw";
import { DatePickerControlled } from "./examples/DatePickerControlled.js";
import ControlledSource from "./examples/DatePickerControlled.tsx?raw";
import { DatePickerButtonTrigger } from "./examples/DatePickerButtonTrigger.js";
import ButtonTriggerSource from "./examples/DatePickerButtonTrigger.tsx?raw";
import { DatePickerOutsideIcon } from "./examples/DatePickerOutsideIcon.js";
import OutsideIconSource from "./examples/DatePickerOutsideIcon.tsx?raw";
import { DatePickerInputGroup } from "./examples/DatePickerInputGroup.js";
import InputGroupSource from "./examples/DatePickerInputGroup.tsx?raw";
import { DatePickerPersian } from "./examples/DatePickerPersian.js";
import PersianSource from "./examples/DatePickerPersian.tsx?raw";
import { DatePickerPresetsSidebar } from "./examples/DatePickerPresetsSidebar.js";
import PresetsSidebarSource from "./examples/DatePickerPresetsSidebar.tsx?raw";
import {
  ownerSections,
  type OwnerExample,
  type OwnerPart,
} from "../../shared/OwnerDocumentation.js";
import { DatePickerSegmented } from "./examples/DatePickerSegmented.js";
import SegmentedSource from "./examples/DatePickerSegmented.tsx?raw";
import { DatePickerVariants } from "./examples/DatePickerVariants.js";
import VariantsSource from "./examples/DatePickerVariants.tsx?raw";
import { DatePickerRange } from "./examples/DatePickerRange.js";
import RangeSource from "./examples/DatePickerRange.tsx?raw";
import { DatePickerMultiple } from "./examples/DatePickerMultiple.js";
import MultipleSource from "./examples/DatePickerMultiple.tsx?raw";
import { DatePickerMonth } from "./examples/DatePickerMonth.js";
import MonthSource from "./examples/DatePickerMonth.tsx?raw";
import { DatePickerController } from "./examples/DatePickerController.js";
import ControllerSource from "./examples/DatePickerController.tsx?raw";
import { DatePickerForm } from "./examples/DatePickerForm.js";
import FormSource from "./examples/DatePickerForm.tsx?raw";
import { DatePickerSizes } from "./examples/DatePickerSizes.js";
import SizesSource from "./examples/DatePickerSizes.tsx?raw";
import { DatePickerPresets } from "./examples/DatePickerPresets.js";
import PresetsSource from "./examples/DatePickerPresets.tsx?raw";
import { DatePickerYearRange } from "./examples/DatePickerYearRange.js";
import YearRangeSource from "./examples/DatePickerYearRange.tsx?raw";
import { DatePickerCodec } from "./examples/DatePickerCodec.js";
import CodecSource from "./examples/DatePickerCodec.tsx?raw";
import { DatePickerDialog } from "./examples/DatePickerDialog.js";
import DialogSource from "./examples/DatePickerDialog.tsx?raw";
import { DatePickerLocale } from "./examples/DatePickerLocale.js";
import LocaleSource from "./examples/DatePickerLocale.tsx?raw";
import { DatePickerHookForm } from "./examples/DatePickerHookForm.js";
import HookFormSource from "./examples/DatePickerHookForm.tsx?raw";
import { DatePickerDateTime } from "./examples/DatePickerDateTime.js";
import DateTimeSource from "./examples/DatePickerDateTime.tsx?raw";
import { DatePickerPlacement } from "./examples/DatePickerPlacement.js";
import PlacementSource from "./examples/DatePickerPlacement.tsx?raw";
import { DatePickerFieldset } from "./examples/DatePickerFieldset.js";
import FieldsetSource from "./examples/DatePickerFieldset.tsx?raw";
export const examples: OwnerExample[] = [
  {
    id: "localization",
    title: "Localization",
    description:
      "Pair locale=de-DE with a matching textCodec for DD.MM.YYYY input and German calendar labels.",
    Demo: DatePickerLocalization,
    source: LocalizationSource,
  },
  {
    id: "typedmultiple",
    title: "Typed multiple dates",
    description:
      "Brick also supports editable multiple-date text. The default grammar uses semicolon-separated ISO dates.",
    Demo: DatePickerMultipleText,
    source: MultipleTextSource,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Set size on Root for the field; Calendar size is independent.",
    Demo: DatePickerSizes,
    source: SizesSource,
  },
  {
    id: "variants",
    title: "Variants",
    description: "Use variant for the shared form-field recipes.",
    Demo: DatePickerVariants,
    source: VariantsSource,
  },
  {
    id: "disabled",
    title: "Disabled",
    description: "Set disabled to prevent editing and opening.",
    Demo: DatePickerDisabled,
    source: DisabledSource,
  },
  {
    id: "readonly",
    title: "Read-only",
    description: "Set readOnly to preserve the value without allowing changes.",
    Demo: DatePickerReadOnly,
    source: ReadOnlySource,
  },
  {
    id: "defaultview",
    title: "Default view",
    description:
      "Set defaultView=month to open on months while retaining day selection.",
    Demo: DatePickerDefaultView,
    source: DefaultViewSource,
  },
  {
    id: "defaultvalue",
    title: "Default value",
    description: "Use defaultValue for the initial selected date.",
    Demo: DatePickerDefaultValue,
    source: DefaultValueSource,
  },
  {
    id: "controlled",
    title: "Controlled",
    description: "Use value and onValueChange to own the selected date.",
    Demo: DatePickerControlled,
    source: ControlledSource,
  },
  {
    id: "controller",
    title: "Controller",
    description: "Use useDatePicker with RootProvider for external actions.",
    Demo: DatePickerController,
    source: ControllerSource,
  },
  {
    id: "range",
    title: "Range",
    description:
      "Use selectionMode=range and indexed TextInputs for separate endpoints sharing one popup.",
    Demo: DatePickerRange,
    source: RangeSource,
  },
  {
    id: "multiple",
    title: "Multiple dates",
    description:
      "Use selectionMode=multiple and Context to render removable Chips. Keep the chip buttons separate from the calendar trigger.",
    Demo: DatePickerMultiple,
    source: MultipleSource,
  },
  {
    id: "month",
    title: "Month selection",
    description:
      "Set minView and defaultView to month; committed values represent month starts. Calendar.Grid monthFormat=long shows full names instead of the default abbreviations.",
    Demo: DatePickerMonth,
    source: MonthSource,
  },
  {
    id: "monthrange",
    title: "Month range",
    description:
      "Combine selectionMode=range with minView=month and a month/year codec.",
    Demo: DatePickerMonthRange,
    source: MonthRangeSource,
  },
  {
    id: "year",
    title: "Year selection",
    description: "Set minView and defaultView to year with a year-only codec.",
    Demo: DatePickerYear,
    source: YearSource,
  },
  {
    id: "yearrange",
    title: "Year range",
    description:
      "Use range selection at year granularity; values represent year starts.",
    Demo: DatePickerYearRange,
    source: YearRangeSource,
  },
  {
    id: "minmax",
    title: "Min and max",
    description: "Use min and max to restrict the selectable date interval.",
    Demo: DatePickerMinMax,
    source: MinMaxSource,
  },
  {
    id: "unavailable",
    title: "Unavailable dates",
    description:
      "Use isDateUnavailable to exclude weekends without changing the bounds.",
    Demo: DatePickerUnavailable,
    source: UnavailableSource,
  },
  {
    id: "codec",
    title: "Custom text format",
    description:
      "Pair textCodec.parse and format; this example accepts DD/MM/YYYY.",
    Demo: DatePickerCodec,
    source: CodecSource,
  },
  {
    id: "locale",
    title: "Locale and RTL",
    description:
      "LocaleProvider supplies locale and direction for segmented entry and calendar navigation.",
    Demo: DatePickerLocale,
    source: LocaleSource,
  },
  {
    id: "persian",
    title: "Persian calendar",
    description:
      "Use createCalendar with a Persian calendar value and locale; entry remains locale-ordered segments.",
    Demo: DatePickerPersian,
    source: PersianSource,
  },
  {
    id: "button",
    title: "Button trigger",
    description:
      "Use entryMode=none and Trigger asChild with Button and ValueText.",
    Demo: DatePickerButtonTrigger,
    source: ButtonTriggerSource,
  },
  {
    id: "outside",
    title: "Outside icon",
    description:
      "Compose Trigger asChild with IconButton outside the painted Control.",
    Demo: DatePickerOutsideIcon,
    source: OutsideIconSource,
  },
  {
    id: "inputgroup",
    title: "Input group",
    description:
      "Control accepts leading artwork and trailing actions without nesting another field border.",
    Demo: DatePickerInputGroup,
    source: InputGroupSource,
  },
  {
    id: "clear",
    title: "Clear trigger",
    description: "Use Context to swap the calendar trigger for ClearTrigger while a value exists. Clearing restores the calendar action.",
    Demo: DatePickerClear,
    source: ClearSource,
  },
  {
    id: "placement",
    title: "Placement",
    description:
      "Set side and align on Content to position the calendar above the field.",
    Demo: DatePickerPlacement,
    source: PlacementSource,
  },
  {
    id: "header",
    title: "Header layout",
    description:
      "Compose Calendar.Header with RangeText and navigation controls.",
    Demo: DatePickerHeaderLayout,
    source: HeaderLayoutSource,
  },
  {
    id: "monthyear",
    title: "Month and year select",
    description:
      "Use Calendar.MonthSelect and YearSelect for direct navigation.",
    Demo: DatePickerMonthYearSelect,
    source: MonthYearSelectSource,
  },
  {
    id: "months",
    title: "Multiple months",
    description: "Set numOfMonths=2 to show adjacent months in one popup.",
    Demo: DatePickerMultipleMonths,
    source: MultipleMonthsSource,
  },
  {
    id: "presets",
    title: "Range presets",
    description:
      "Use six PresetTrigger shortcuts beside the calendar to select common reporting periods. Vertical popup placement and a stacked mobile layout keep the controls within the viewport.",
    Demo: DatePickerPresets,
    source: PresetsSource,
  },
  {
    id: "sidebar",
    title: "Presets sidebar",
    description:
      "Render Calendar directly for an inline picker, with five shortcuts and their dates beside it. No popup or dialog is needed; the layout stacks on narrow screens.",
    Demo: DatePickerPresetsSidebar,
    source: PresetsSidebarSource,
  },
  {
    id: "today",
    title: "Today button",
    description:
      "Use setFocusedValue to navigate to the reference day without changing selection.",
    Demo: DatePickerToday,
    source: TodaySource,
  },
  {
    id: "datetime",
    title: "Date and time",
    description:
      "Compose a 12-hour DateInput inside the popup; closeOnSelect=false keeps time editing available.",
    Demo: DatePickerDateTime,
    source: DateTimeSource,
  },
  {
    id: "form",
    title: "Native form",
    description:
      "Submit canonical dates with one name; invalid drafts never submit stale selections.",
    Demo: DatePickerForm,
    source: FormSource,
  },
  {
    id: "hookform",
    title: "React Hook Form",
    description: "Use the form Controller with typed values and onValueChange.",
    Demo: DatePickerHookForm,
    source: HookFormSource,
  },
  {
    id: "weeks",
    title: "Fixed weeks",
    description:
      "Set fixedWeeks to keep six calendar rows and a stable popup height.",
    Demo: DatePickerFixedWeeks,
    source: FixedWeeksSource,
  },
  {
    id: "openclick",
    title: "Open on click",
    description:
      "Set openOnInputClick to open from the text field without a separate trigger.",
    Demo: DatePickerOpenOnClick,
    source: OpenOnClickSource,
  },
  {
    id: "fieldset",
    title: "Field and Fieldset",
    description: "Inherit accessible names, descriptions and disabled state.",
    Demo: DatePickerFieldset,
    source: FieldsetSource,
  },
  {
    id: "segmented",
    title: "Segmented entry",
    description:
      "Use Input for locale-ordered keyboard segments instead of TextInput.",
    Demo: DatePickerSegmented,
    source: SegmentedSource,
  },
  {
    id: "dialog",
    title: "Inside Dialog",
    description:
      "Keep the popup within the modal interaction scope and verify focus return.",
    Demo: DatePickerDialog,
    source: DialogSource,
  },
];
export const parts: OwnerPart[] = [
  {
    title: "PropsProvider",
    id: "props-props-provider",
    description: "Presentation defaults without a state owner.",
    rows: [
      {
        name: "size / variant / radius / shape",
        typeLabel: "Root recipe props",
        description:
          "Nested choices override inherited recipes without conflicting shape/radius.",
      },
    ],
  },
  {
    title: "Context",
    id: "props-context",
    description: "Read selection, popup state and navigation.",
    rows: [
      {
        name: "children",
        typeLabel: "(context) => ReactNode",
        description:
          "Use public value, draft, focus and view operations; underscore members are internal.",
      },
    ],
  },
  {
    title: "Root",
    description: "Coordinates editing, selection, forms and one popup.",
    rows: [
      {
        name: "positioning",
        typeLabel: "Popover positioning options",
        description: "Forward placement, flip and collision options to the existing popup owner. Overrides Content side/align placement when provided.",
      },
      {
        name: "tone",
        typeLabel: '"neutral" | "accent"',
        defaultLabel: "neutral",
        description:
          "Field focus and segment emphasis; Calendar tone remains independent.",
      },
      {
        name: "referenceDate",
        typeLabel: "DateValue",
        description: "Required stable reference for server and client.",
      },
      {
        name: "entryMode",
        typeLabel: '"segmented" | "text" | "none"',
        description: "Match Input, TextInput or button-only composition.",
        defaultLabel: "segmented; multiple: none",
      },
      {
        name: "selectionMode",
        typeLabel: '"single" | "range" | "multiple"',
        description: "Determines the selection value shape.",
        defaultLabel: "single",
      },
      {
        name: "value / defaultValue",
        typeLabel: "DateValue | null | { start; end } | DateValue[]",
        description: "Controlled or initial selection.",
      },
      {
        name: "onValueChange",
        typeLabel: "(value) => void",
        description: "Called for committed selections.",
      },
      {
        name: "size",
        typeLabel: "ResponsiveControlSize",
        description: "Independent from Calendar size.",
        defaultLabel: "lg",
      },
      {
        name: "variant",
        typeLabel: "ResponsiveFieldVariant",
        description:
          "outline, surface, soft, subtle, ghost, plain or underline.",
        defaultLabel: "outline",
      },
      {
        name: "open / defaultOpen",
        typeLabel: "boolean",
        description: "Controlled or initial popup state.",
        defaultLabel: "false",
      },
      {
        name: "onOpenChange",
        typeLabel: "(open: boolean) => void",
        description: "Observe popup visibility.",
      },
      {
        name: "min / max",
        typeLabel: "DateValue",
        description: "Inclusive date bounds.",
      },
      {
        name: "isDateUnavailable",
        typeLabel: "(date, locale) => boolean",
        description: "Reject days and ranges crossing unavailable dates.",
      },
      {
        name: "minView / maxView",
        typeLabel: '"day" | "month" | "year"',
        description: "Bound navigation and terminal selection.",
      },
      {
        name: "numOfMonths",
        typeLabel: "number",
        description: "Visible month count.",
        defaultLabel: "1",
      },
      {
        name: "name / form",
        typeLabel: "string",
        description: "Canonical submission name and optional external form.",
      },
      {
        name: "formControl",
        typeLabel: '"auto" | "manual"',
        description: "Manual mode requires one HiddenInput.",
        defaultLabel: "auto",
      },
      {
        name: "textCodec / selectionTextCodec",
        typeLabel: "{ parse; format }",
        description:
          "Paired parsing and formatting; selectionTextCodec controls multiple-date grammar.",
      },
      {
        name: "disabled / readOnly / required / invalid",
        typeLabel: "boolean",
        description: "Native form and editing states.",
      },
      {
        name: "locale / timeZone",
        typeLabel: "string",
        description:
          "Locale inherits LocaleProvider; keep server/client values consistent.",
      },
      {
        name: "closeOnSelect",
        typeLabel: "boolean",
        description:
          "Close on complete single/range selection; multiple remains open.",
        defaultLabel: "true",
      },
      {
        name: "openOnInputClick",
        typeLabel: "boolean",
        description: "Opt in to opening on text-input click.",
        defaultLabel: "false",
      },
    ],
    id: "props-root",
  },
  {
    title: "RootProvider",
    description: "Styled root for an external controller.",
    rows: [
      {
        name: "value",
        typeLabel: "UseDatePickerReturn",
        description:
          "Return value of useDatePicker. Also accepts root visual props.",
      },
    ],
    id: "props-root-provider",
  },
  {
    title: "Input",
    description: "Compatible segmented editor; ref points to a div.",
    rows: [
      {
        name: "aria-label / aria-labelledby",
        typeLabel: "string",
        description: "Name supplied by Label, Field or explicit props.",
      },
    ],
    id: "props-input",
  },
  {
    title: "TextInput",
    description: "Native text editor in text mode.",
    rows: [
      {
        name: "index",
        typeLabel: "0 | 1",
        description: "Range endpoint; 1 is only valid for ranges.",
        defaultLabel: "0",
      },
      {
        name: "placeholder",
        typeLabel: "string",
        description: "Adapt the hint with your codec.",
        defaultLabel: "YYYY-MM-DD",
      },
      {
        name: "ref",
        typeLabel: "Ref<HTMLInputElement>",
        description: "Native editor; Root owns canonical serialization.",
      },
    ],
    id: "props-text-input",
  },
  {
    title: "Calendar",
    description: "Shares the picker's value and retained view.",
    rows: [
      {
        name: "size",
        typeLabel: "ResponsiveControlSize",
        description: "Independent calendar cell size.",
        defaultLabel: "md",
      },
      {
        name: "tone",
        typeLabel: '"neutral" | "accent" | "contrast"',
        description: "Selection paint only.",
        defaultLabel: "accent",
      },
      {
        name: "density",
        typeLabel: '"compact" | "comfortable"',
        description: "Size shorthand; explicit size wins.",
        defaultLabel: "comfortable",
      },
    ],
    id: "props-calendar",
  },
  {
    title: "Content",
    description: "Popover boundary and shared popup inset; nested Calendar does not add another inset.",
    rows: [
      {
        name: "side / align",
        typeLabel: "Popover placement",
        description: "Collision-aware popup placement.",
      },
      {
        name: "initialFocus",
        typeLabel: "Popover initial focus",
        description: "Defaults to the active day or period.",
      },
      {
        name: "appearance / radius",
        typeLabel: "Appearance / Radius",
        description: "Local popup presentation.",
      },
    ],
    id: "props-content",
  },
  {
    title: "Label",
    description: "Names the editor.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Part content.",
      },
    ],
    id: "props-label",
  },
  {
    title: "Control",
    description: "Field boundary and popup anchor.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Part content.",
      },
    ],
    id: "props-control",
  },
  {
    title: "IndicatorGroup",
    description: "Groups clear and open actions.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Part content.",
      },
    ],
    id: "props-indicator-group",
  },
  {
    title: "Trigger",
    description: "Opens the popup; compose Button with asChild.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Part content.",
      },
    ],
    id: "props-trigger",
  },
  {
    title: "ClearTrigger",
    description: "Clears selection; supports asChild and render.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Part content.",
      },
    ],
    id: "props-clear-trigger",
  },
  {
    title: "Portal",
    description: "Portals through the overlay owner.",
    rows: [
      {
        name: "children",
        typeLabel: "ReactNode",
        description: "Part content.",
      },
    ],
    id: "props-portal",
  },
  {
    title: "ValueText",
    description: "Formatted value for button-only compositions.",
    rows: [
      {
        name: "placeholder",
        typeLabel: "ReactNode",
        description: "Part content.",
      },
    ],
    id: "props-value-text",
  },
  {
    title: "PresetTrigger",
    description: "Selects a valid date or range; supports asChild.",
    rows: [
      {
        name: "value",
        typeLabel: "DateSelectionValue",
        description: "Selection to commit.",
      },
    ],
    id: "props-preset-trigger",
  },
  {
    title: "HiddenInput",
    description: "Explicit canonical controls in manual mode.",
    rows: [
      {
        name: "ref",
        typeLabel: "Ref<HTMLInputElement>",
        description:
          "Canonical form control in manual mode; auto mode renders an unnamed compatibility mirror.",
      },
    ],
    id: "props-hidden-input",
  },
];
const exampleOrder = [
  "sizes",
  "variants",
  "disabled",
  "readonly",
  "defaultview",
  "defaultvalue",
  "controlled",
  "controller",
  "range",
  "multiple",
  "month",
  "monthrange",
  "year",
  "yearrange",
  "minmax",
  "unavailable",
  "codec",
  "localization",
  "locale",
  "persian",
  "button",
  "outside",
  "inputgroup",
  "clear",
  "placement",
  "header",
  "monthyear",
  "months",
  "presets",
  "sidebar",
  "today",
  "datetime",
  "form",
  "hookform",
  "weeks",
  "openclick",
  "fieldset",
  "segmented",
  "typedmultiple",
  "dialog",
];
examples.sort(
  (a, b) => exampleOrder.indexOf(a.id) - exampleOrder.indexOf(b.id),
);
export const sections = ownerSections(examples, parts);
