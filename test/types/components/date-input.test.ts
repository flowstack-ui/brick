import { DateInput, type DateInputRootProps } from "../../../src/date-input.js";
import { parseDate } from "../../../src/date-value.js";
const referenceDate = parseDate("2026-09-05");
const valid: DateInputRootProps = { referenceDate, selectionMode: "range", value: { start: referenceDate, end: null } };
// @ts-expect-error range requires the endpoint object
const invalid: DateInputRootProps = { referenceDate, selectionMode: "range", value: referenceDate };
void [DateInput, valid, invalid];

const surfaceRecipe: Pick<import("react").ComponentProps<typeof DateInput.Root>, "variant"> = { variant: "surface" };
void surfaceRecipe;
const toneRecipe: DateInputRootProps = { referenceDate, tone: "neutral" };
// @ts-expect-error date field tones are not semantic status colors
const statusTone: DateInputRootProps = { referenceDate, tone: "danger" };
void [toneRecipe, statusTone];

const responsive: DateInputRootProps = { referenceDate, variant: { initial: "ghost", lg: "underline" }, size: { initial: "sm", lg: "lg" } };
// @ts-expect-error underline cannot own radius
const underlineRadius: DateInputRootProps = { referenceDate, variant: "underline", radius: "full" };
void [responsive, underlineRadius, DateInput.RootProvider, DateInput.PropsProvider];
