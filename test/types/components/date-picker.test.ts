import { DatePicker, type DatePickerRootProps } from "../../../src/date-picker.js";
import { parseDate } from "../../../src/date-value.js";
const referenceDate = parseDate("2026-09-05");
const valid: DatePickerRootProps = { referenceDate, selectionMode: "range", value: { start: referenceDate, end: null } };
// @ts-expect-error range requires the endpoint object
const invalid: DatePickerRootProps = { referenceDate, selectionMode: "range", value: referenceDate };
void [DatePicker, valid, invalid];
