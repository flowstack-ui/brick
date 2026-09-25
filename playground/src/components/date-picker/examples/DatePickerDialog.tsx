import {
  Button,
  CloseButton,
  DatePicker,
  Dialog,
  parseDate,
} from "@flowstack-ui/brick";
export function DatePickerDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Schedule delivery</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Schedule delivery</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <DatePicker.Root
              referenceDate={parseDate("2026-09-18")}
              entryMode="text"
            >
              <DatePicker.Label>Delivery date</DatePicker.Label>
              <DatePicker.Control>
                <DatePicker.TextInput />
                <DatePicker.Trigger />
              </DatePicker.Control>
              <DatePicker.Portal>
                <DatePicker.Content aria-label="Delivery calendar">
                  <DatePicker.Calendar />
                </DatePicker.Content>
              </DatePicker.Portal>
            </DatePicker.Root>
          </Dialog.Body>
          <Dialog.Close placement="corner" asChild>
            <CloseButton size="sm" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
