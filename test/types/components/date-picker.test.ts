import { DatePicker, type DatePickerRootProps } from "../../../src/date-picker.js";
import { parseDate } from "../../../src/date-value.js";
const referenceDate = parseDate("2026-09-05");
const valid: DatePickerRootProps = { referenceDate, selectionMode: "range", value: { start: referenceDate, end: null } };
// @ts-expect-error range requires the endpoint object
const invalid: DatePickerRootProps = { referenceDate, selectionMode: "range", value: referenceDate };
void [DatePicker, valid, invalid];

const surfaceRecipe: Pick<import("react").ComponentProps<typeof DatePicker.Root>, "variant"> = { variant: "surface" };
void surfaceRecipe;

const text: DatePickerRootProps = { referenceDate, entryMode: "text", textCodec: { format: value => value.toString(), parse: text => parseDate(text) } };
// @ts-expect-error parsing and formatting must be paired
const incompleteCodec: DatePickerRootProps = { referenceDate, textCodec: { parse: text => parseDate(text) } };
const multipleText: DatePickerRootProps = { referenceDate, entryMode: "text", selectionMode: "multiple", value: [referenceDate] };
void [text, incompleteCodec, multipleText, DatePicker.TextInput, DatePicker.RootProvider, DatePicker.PropsProvider];
