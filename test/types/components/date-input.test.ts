import { DateInput, type DateInputRootProps } from "../../../src/date-input.js";
import { parseDate } from "../../../src/date-value.js";
const referenceDate = parseDate("2026-09-05");
const valid: DateInputRootProps = { referenceDate, selectionMode: "range", value: { start: referenceDate, end: null } };
// @ts-expect-error range requires the endpoint object
const invalid: DateInputRootProps = { referenceDate, selectionMode: "range", value: referenceDate };
void [DateInput, valid, invalid];
