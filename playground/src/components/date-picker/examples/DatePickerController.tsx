import {
  Button,
  DatePicker,
  Frame,
  HStack,
  VStack,
  parseDate,
  useDatePicker,
} from "@flowstack-ui/brick";
const referenceDate = parseDate("2026-09-18");
export function DatePickerController() {
  const picker = useDatePicker({ referenceDate, entryMode: "text" });
  return (
    <Frame maxInlineSize="24rem">
      <VStack gap="4">
        <DatePicker.RootProvider value={picker}>
          <DatePicker.Label>Appointment</DatePicker.Label>
          <DatePicker.Control>
            <DatePicker.TextInput />
            <DatePicker.Trigger />
          </DatePicker.Control>
          <DatePicker.Portal>
            <DatePicker.Content aria-label="Appointment calendar">
              <DatePicker.Calendar />
            </DatePicker.Content>
          </DatePicker.Portal>
        </DatePicker.RootProvider>
        <HStack gap="2">
          <Button
            variant="outline"
            onClick={() => picker.setValue(referenceDate)}
          >
            Use reference date
          </Button>
          <Button variant="ghost" onClick={picker.clearValue}>
            Clear
          </Button>
        </HStack>
      </VStack>
    </Frame>
  );
}
