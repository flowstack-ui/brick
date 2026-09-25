import { ownerSections, type OwnerExample, type OwnerPart } from "../../shared/OwnerDocumentation.js";
import { CalendarHideOutside } from "./examples/CalendarHideOutside.js";
import HideOutsideSource from "./examples/CalendarHideOutside.tsx?raw";
import { CalendarControlled } from "./examples/CalendarControlled.js";
import ControlledSource from "./examples/CalendarControlled.tsx?raw";
import { CalendarDefaultValue } from "./examples/CalendarDefaultValue.js";
import DefaultValueSource from "./examples/CalendarDefaultValue.tsx?raw";
import { CalendarSingleRange } from "./examples/CalendarSingleRange.js";
import SingleRangeSource from "./examples/CalendarSingleRange.tsx?raw";
import { CalendarMultiple } from "./examples/CalendarMultiple.js";
import MultipleSource from "./examples/CalendarMultiple.tsx?raw";
import { CalendarBounds } from "./examples/CalendarBounds.js";
import BoundsSource from "./examples/CalendarBounds.tsx?raw";
import { CalendarUnavailable } from "./examples/CalendarUnavailable.js";
import UnavailableSource from "./examples/CalendarUnavailable.tsx?raw";
import { CalendarLimit } from "./examples/CalendarLimit.js";
import LimitSource from "./examples/CalendarLimit.tsx?raw";
import { CalendarNumberedWeeks } from "./examples/CalendarNumberedWeeks.js";
import NumberedWeeksSource from "./examples/CalendarNumberedWeeks.tsx?raw";
import { CalendarBooking } from "./examples/CalendarBooking.js";
import BookingSource from "./examples/CalendarBooking.tsx?raw";
import { CalendarSizes } from "./examples/CalendarSizes.js";
import SizesSource from "./examples/CalendarSizes.tsx?raw";
import { CalendarTones } from "./examples/CalendarTones.js";
import TonesSource from "./examples/CalendarTones.tsx?raw";
import { CalendarRange } from "./examples/CalendarRange.js";
import RangeSource from "./examples/CalendarRange.tsx?raw";
import { CalendarPeriods } from "./examples/CalendarPeriods.js";
import PeriodsSource from "./examples/CalendarPeriods.tsx?raw";
import { CalendarWeekNumbers } from "./examples/CalendarWeekNumbers.js";
import WeekNumbersSource from "./examples/CalendarWeekNumbers.tsx?raw";
import { CalendarLocale } from "./examples/CalendarLocale.js";
import LocaleSource from "./examples/CalendarLocale.tsx?raw";
import { CalendarController } from "./examples/CalendarController.js";
import ControllerSource from "./examples/CalendarController.tsx?raw";
import { CalendarCustom } from "./examples/CalendarCustom.js";
import CustomSource from "./examples/CalendarCustom.tsx?raw";
import { CalendarStates } from "./examples/CalendarStates.js";
import StatesSource from "./examples/CalendarStates.tsx?raw";
export const examples: OwnerExample[] = [
{ id: "hideoutside", title: "Hide outside days", description: "Hide adjacent-month dates without changing the grid geometry.", Demo: CalendarHideOutside, source: HideOutsideSource },
{ id: "controlled", title: "Controlled", description: "Own the selected date with value and onValueChange.", Demo: CalendarControlled, source: ControlledSource },
{ id: "defaultvalue", title: "Default value", description: "Set the initial selection with defaultValue.", Demo: CalendarDefaultValue, source: DefaultValueSource },
{ id: "selectionrange", title: "Range selection", description: "Choose the start and end of a period.", Demo: CalendarSingleRange, source: SingleRangeSource },
{ id: "multiple", title: "Multiple selection", description: "Select independent dates; select a date again to remove it.", Demo: CalendarMultiple, source: MultipleSource },
{ id: "bounds", title: "Min and max", description: "Limit selection to an inclusive date window.", Demo: CalendarBounds, source: BoundsSource },
{ id: "unavailable", title: "Unavailable dates", description: "Reject individual dates through isDateUnavailable.", Demo: CalendarUnavailable, source: UnavailableSource },
{ id: "limit", title: "Maximum selected dates", description: "Allow up to three selected dates with maxSelectedDates.", Demo: CalendarLimit, source: LimitSource },
{ id: "numberedweeks", title: "Week numbers", description: "Display muted, noninteractive week numbers under the # heading beside each calendar row.", Demo: CalendarNumberedWeeks, source: NumberedWeeksSource },
{ id: "booking", title: "Booking time grid", description: "Choose a weekday to reveal available meeting times in UTC. Changing the date clears the selected time; these date-dependent sample slots are not live availability.", Demo: CalendarBooking, source: BookingSource },
{ id: "states", title: "States and availability", description: "Keep disabled, read-only and constrained dates distinct.", Demo: CalendarStates, source: StatesSource },
{ id: "custom", title: "Custom table", description: "Compose semantic parts with controller-owned weeks.", Demo: CalendarCustom, source: CustomSource },
{ id: "sizes", title: "Sizes", description: "Calendar geometry is independent of entry fields.", Demo: CalendarSizes, source: SizesSource },
{ id: "tones", title: "Tones", description: "Choose neutral, accent or contrast selection.", Demo: CalendarTones, source: TonesSource },
{ id: "range", title: "Range and multiple months", description: "A continuous date range across month grids.", Demo: CalendarRange, source: RangeSource },
{ id: "periods", title: "Month and year selection", description: "Choose a period rather than an individual day.", Demo: CalendarPeriods, source: PeriodsSource },
{ id: "weeknumbers", title: "Week numbers and selects", description: "Fixed rows, hidden outside days and direct navigation.", Demo: CalendarWeekNumbers, source: WeekNumbersSource },
{ id: "locale", title: "Locale and direction", description: "Localized day names and RTL navigation.", Demo: CalendarLocale, source: LocaleSource },
{ id: "controller", title: "Multiple dates and controller", description: "Select up to three meetings and control navigation externally.", Demo: CalendarController, source: ControllerSource },
];
export const parts: OwnerPart[] = [
  {
    "title": "Root",
    "description": "Inline selection and navigation owner.",
    "rows": [
      {
        "name": "referenceDate",
        "typeLabel": "DateValue",
        "description": "Required stable reference shared by server and client."
      },
      {
        "name": "value / defaultValue",
        "typeLabel": "DateValue | null | DateRange | DateValue[]",
        "description": "Controlled or initial selection."
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
        "name": "disabled / readOnly / invalid",
        "typeLabel": "boolean",
        "description": "Editing and validation states."
      },
      {
        "name": "selectionMode",
        "typeLabel": "\"single\" | \"range\" | \"multiple\"",
        "description": "Selection shape; multiple uses DateValue[].",
        "defaultLabel": "single"
      },
      {
        "name": "size",
        "typeLabel": "ResponsiveControlSize",
        "description": "Seven calendar sizes independent of field size.",
        "defaultLabel": "md"
      },
      {
        "name": "density",
        "typeLabel": "\"compact\" | \"comfortable\"",
        "description": "Size shorthand; explicit size wins.",
        "defaultLabel": "comfortable"
      },
      {
        "name": "tone",
        "typeLabel": "\"neutral\" | \"accent\" | \"contrast\"",
        "description": "Selection color, not semantic feedback.",
        "defaultLabel": "accent"
      },
      {
        "name": "view / defaultView",
        "typeLabel": "\"day\" | \"month\" | \"year\"",
        "description": "Controlled or initial navigation view."
      },
      {
        "name": "minView / maxView",
        "typeLabel": "\"day\" | \"month\" | \"year\"",
        "description": "Terminal selection precision and view bounds."
      },
      {
        "name": "focusedValue / defaultFocusedValue",
        "typeLabel": "DateValue",
        "description": "Controlled or initial navigation date."
      },
      {
        "name": "onViewChange / onFocusChange",
        "typeLabel": "(details) => void",
        "description": "Observe view and navigation changes."
      },
      {
        "name": "numOfMonths",
        "typeLabel": "number",
        "description": "Visible month count.",
        "defaultLabel": "1"
      },
      { "name": "outsideDaySelectable", "typeLabel": "boolean", "description": "Allow selecting visible adjacent-month dates." },
      { "name": "onVisibleRangeChange", "typeLabel": "(details) => void", "description": "Observe changes to the visible calendar window." },
      {
        "name": "fixedWeeks / showWeekNumbers",
        "typeLabel": "boolean",
        "description": "Grid geometry and week-number column."
      },
      {
        "name": "maxSelectedDates",
        "typeLabel": "number",
        "description": "Multiple-selection limit."
      },
      {
        "name": "startOfWeek",
        "typeLabel": "number",
        "description": "First weekday."
      },
      {
        "name": "translations / ids / createCalendar",
        "typeLabel": "object | function",
        "description": "Localization, identifiers and calendar system."
      }
    ],
    "id": "props-root"
  },
  {
    "title": "RootProvider",
    "description": "Renders an external useCalendar controller.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "UseCalendarReturn",
        "description": "Controller and root recipe props."
      }
    ],
    "id": "props-root-provider"
  },
  {
    "title": "Header",
    "description": "Header layout.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Navigation and view controls."
      }
    ],
    "id": "props-header"
  },
  {
    "title": "PrevTrigger",
    "description": "Previous visible period.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Optional decorative artwork."
      }
    ],
    "id": "props-prev-trigger"
  },
  {
    "title": "NextTrigger",
    "description": "Next visible period.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Optional decorative artwork."
      }
    ],
    "id": "props-next-trigger"
  },
  {
    "title": "ViewTrigger",
    "description": "Moves to the broader view.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Defaults to localized view text."
      }
    ],
    "id": "props-view-trigger"
  },
  {
    "title": "MonthSelect",
    "description": "Native month chooser.",
    "rows": [
      {
        "name": "aria-label",
        "typeLabel": "string",
        "description": "Override localized name."
      }
    ],
    "id": "props-month-select"
  },
  {
    "title": "YearSelect",
    "description": "Native year chooser.",
    "rows": [
      {
        "name": "aria-label",
        "typeLabel": "string",
        "description": "Override localized name."
      }
    ],
    "id": "props-year-select"
  },
  {
    "title": "Grid",
    "description": "Convenience grid for the active view.",
    "rows": [
      {
        "name": "monthOffset",
        "typeLabel": "number",
        "description": "Zero-based visible month.",
        "defaultLabel": "0"
      },
      {
        "name": "weekdayFormat",
        "typeLabel": "\"narrow\" | \"short\" | \"long\"",
        "description": "Weekday heading format.",
        "defaultLabel": "narrow"
      },
      {
        "name": "hideOutsideDays",
        "typeLabel": "boolean",
        "description": "Hides artwork without collapsing cells."
      },
      {
        "name": "renderDay",
        "typeLabel": "(date) => ReactNode",
        "description": "Custom decorative day content."
      }
      ,{ "name": "monthFormat", "typeLabel": "\"short\" | \"long\"", "defaultLabel": "short", "description": "Localized month labels in month view." }
    ],
    "id": "props-grid"
  },
  {
    "title": "View",
    "description": "Show anatomy for one view.",
    "rows": [
      {
        "name": "view",
        "typeLabel": "\"day\" | \"month\" | \"year\"",
        "description": "Required matching active view."
      }
    ],
    "id": "props-view"
  },
  {
    "title": "ViewControl",
    "description": "Alias of Header.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "View-specific controls."
      }
    ],
    "id": "props-view-control"
  },
  {
    "title": "RangeText",
    "description": "Localized visible range.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Optional replacement content."
      }
    ],
    "id": "props-range-text"
  },
  {
    "title": "Table",
    "description": "Semantic custom grid.",
    "rows": [
      {
        "name": "view",
        "typeLabel": "\"day\" | \"month\" | \"year\"",
        "description": "Defaults to active view."
      },
      {
        "name": "monthOffset",
        "typeLabel": "number",
        "description": "Visible month offset.",
        "defaultLabel": "0"
      },
      {
        "name": "columns",
        "typeLabel": "number",
        "description": "Keyboard column count; 7 for days, 4 for periods."
      }
    ],
    "id": "props-table"
  },
  {
    "title": "TableHead",
    "description": "Semantic table structure.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Native table children."
      }
    ],
    "id": "props-table-head"
  },
  {
    "title": "TableBody",
    "description": "Semantic table structure.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Native table children."
      }
    ],
    "id": "props-table-body"
  },
  {
    "title": "TableRow",
    "description": "Semantic table structure.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Native table children."
      }
    ],
    "id": "props-table-row"
  },
  {
    "title": "TableHeader",
    "description": "Weekday heading.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Localized weekday label; scope defaults to col."
      }
    ],
    "id": "props-table-header"
  },
  {
    "title": "TableCell",
    "description": "Supplies a date or period to its trigger.",
    "rows": [
      {
        "name": "value",
        "typeLabel": "DateValue | number",
        "description": "Date for day view; month/year number for period view."
      }
    ],
    "id": "props-table-cell"
  },
  {
    "title": "TableCellTrigger",
    "description": "Interactive date or period.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "ReactNode",
        "description": "Decorative content inside the semantic trigger."
      }
    ],
    "id": "props-table-cell-trigger"
  },
  {
    "title": "DayTable",
    "description": "Convenience grid for this view; wrap in matching View.",
    "rows": [
      {
        "name": "monthOffset / renderDay / hideOutsideDays",
        "typeLabel": "Grid props",
        "description": "Same grid customization as Grid."
      }
    ],
    "id": "props-day-table"
  },
  {
    "title": "MonthTable",
    "description": "Convenience grid for this view; wrap in matching View.",
    "rows": [
      {
        "name": "monthFormat",
        "typeLabel": "\"short\" | \"long\"",
        "defaultLabel": "short",
        "description": "Localized month labels; day-only customization does not apply."
      }
    ],
    "id": "props-month-table"
  },
  {
    "title": "YearTable",
    "description": "Convenience grid for this view; wrap in matching View.",
    "rows": [
      {
        "name": "aria-label",
        "typeLabel": "string",
        "description": "Override the grid accessible name; day-only customization does not apply."
      }
    ],
    "id": "props-year-table"
  },
  {
    "title": "Context",
    "description": "Public state and operations.",
    "rows": [
      {
        "name": "children",
        "typeLabel": "(context) => ReactNode",
        "description": "Value, view, focus, visible range, weekday names and getWeeks(offset)."
      }
    ],
    "id": "props-context"
  }
];
const exampleOrder = ["sizes", "hideoutside", "controlled", "defaultvalue", "selectionrange", "multiple", "bounds", "unavailable", "range", "locale", "limit", "numberedweeks", "booking", "tones", "periods", "weeknumbers", "custom", "states", "controller"];
examples.sort((a, b) => exampleOrder.indexOf(a.id) - exampleOrder.indexOf(b.id));
for (const part of parts) {
  if (["Root", "RootProvider", "PrevTrigger", "NextTrigger", "ViewTrigger", "TableCellTrigger"].includes(part.title)) {
    part.rows = [...part.rows, { name: "asChild", typeLabel: "boolean", defaultLabel: "false", description: part.title.startsWith("Root") ? "Compose one noninteractive host and preserve the internal content region." : "Compose one native button with merged behavior and refs." }];
  }
}
export const sections = ownerSections(examples, parts);
