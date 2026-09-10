import { Calendar, type CalendarRootProps } from "../../../src/calendar.js";
import { parseDate } from "../../../src/date-value.js";
const referenceDate = parseDate("2026-09-05");
const valid: CalendarRootProps = { referenceDate, selectionMode: "range", value: { start: referenceDate, end: null } };
// @ts-expect-error range requires the endpoint object
const invalid: CalendarRootProps = { referenceDate, selectionMode: "range", value: referenceDate };
void [Calendar, valid, invalid];

const sized: CalendarRootProps = { referenceDate, size: "2xl", density: "compact" };
// @ts-expect-error Calendar uses a scalar size, not viewport-driven behavior.
const invalidSize: CalendarRootProps = { referenceDate, size: { lg: "xl" } };
void [sized, invalidSize];
