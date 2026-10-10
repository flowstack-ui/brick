import { useState } from "react";
import {
  DatePicker,
  Frame,
  Stack,
  Text,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
const codec = {
  format: (date: DateValue) =>
    [
      String(date.month).padStart(2, "0"),
      String(date.day).padStart(2, "0"),
      date.year,
    ].join("/"),
  parse: (text: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(text)) return undefined;
    const [month, day, year] = text.split("/");
    const iso = year + "-" + month + "-" + day;
    try {
      const date = parseDate(iso);
      return date.toString() === iso ? date : undefined;
    } catch {
      return undefined;
    }
  },
};
export function DatePickerControlled() {
  const [value, setValue] = useState<DateValue | null>(parseDate("2026-09-18"));
  return (
    <Frame maxInlineSize="24rem">
      <Stack gap={3}>
        <Text role="status">Selected: {value?.toString() ?? "None"}</Text>
        <DatePicker.Root
          referenceDate={parseDate("2026-09-18")}
          value={value}
          onValueChange={setValue}
          entryMode="text"
          textCodec={codec}
        >
          <DatePicker.Label>Controlled date</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.TextInput placeholder="mm/dd/yyyy" />
            <DatePicker.Trigger />
          </DatePicker.Control>
          <DatePicker.Portal>
            <DatePicker.Content aria-label="Controlled calendar">
              <DatePicker.Calendar />
            </DatePicker.Content>
          </DatePicker.Portal>
        </DatePicker.Root>
      </Stack>
    </Frame>
  );
}
