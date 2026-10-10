import { useState } from "react";
import {
  Button,
  DatePicker,
  Field,
  Fieldset,
  Frame,
  Stack,
  parseDate,
} from "@flowstack-ui/brick";
export function DatePickerFieldset() {
  const [disabled, setDisabled] = useState(false);
  return (
    <Frame maxInlineSize="24rem">
      <Stack gap={4}>
        <Button
          variant="outline"
          onClick={() => setDisabled((value) => !value)}
        >
          {disabled ? "Enable dates" : "Disable dates"}
        </Button>
        <Fieldset.Root disabled={disabled}>
          <Fieldset.Legend>Delivery details</Fieldset.Legend>
          <Fieldset.Description>
            Choose a date for your delivery.
          </Fieldset.Description>
          <Fieldset.Content>
            <Field.Root required>
              <Field.Label>Delivery date</Field.Label>
              <DatePicker.Root
                referenceDate={parseDate("2026-09-18")}
                entryMode="text"
                name="delivery"
              >
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
              <Field.Description>Use YYYY-MM-DD.</Field.Description>
            </Field.Root>
          </Fieldset.Content>
        </Fieldset.Root>
      </Stack>
    </Frame>
  );
}
