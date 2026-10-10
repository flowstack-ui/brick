import {
  Calendar,
  DatePicker,
  Frame,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
const codec = {
  format: (date: DateValue) =>
    String(date.month).padStart(2, "0") + "/" + date.year,
  parse: (text: string) => {
    const match = /^(\d{2})\/(\d{4})$/.exec(text);
    if (!match) return undefined;
    const iso = match[2] + "-" + match[1] + "-01";
    try {
      const date = parseDate(iso);
      return date.toString() === iso ? date : undefined;
    } catch {
      return undefined;
    }
  },
};
const referenceDate = parseDate("2026-09-18");
export function DatePickerMonth() {
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root
        referenceDate={referenceDate}
        entryMode="text"
        textCodec={codec}
        minView="month"
        defaultView="month"
      >
        <DatePicker.Label>Billing month</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.TextInput placeholder="mm/yyyy" />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger />
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Billing month calendar">
            <DatePicker.Calendar>
              <Calendar.Header>
                <Calendar.PrevTrigger />
                <Calendar.ViewTrigger />
                <Calendar.NextTrigger />
              </Calendar.Header>
              <Calendar.Grid monthFormat="long" />
            </DatePicker.Calendar>
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
