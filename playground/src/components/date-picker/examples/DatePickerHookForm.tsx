import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Frame,
  Stack,
  Text,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
export function DatePickerHookForm() {
  const { control, handleSubmit, formState } = useForm<{
    date: DateValue | null;
  }>({ defaultValues: { date: null } });
  return (
    <Frame maxInlineSize="24rem">
      <form onSubmit={handleSubmit(() => {})}>
        <Stack gap={4}>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Choose a review date." }}
            render={({ field, fieldState }) => (
              <DatePicker.Root
                referenceDate={parseDate("2026-09-18")}
                entryMode="text"
                value={field.value}
                onValueChange={field.onChange}
                invalid={fieldState.invalid}
              >
                <DatePicker.Label>Review date</DatePicker.Label>
                <DatePicker.Control>
                  <DatePicker.TextInput
                    ref={field.ref}
                    onBlur={field.onBlur}
                    aria-describedby="date-picker-rhf-message"
                  />
                  <DatePicker.Trigger />
                </DatePicker.Control>
                <DatePicker.Portal>
                  <DatePicker.Content aria-label="Review date calendar">
                    <DatePicker.Calendar />
                  </DatePicker.Content>
                </DatePicker.Portal>
              </DatePicker.Root>
            )}
          />
          <Text id="date-picker-rhf-message" role="status">
            {formState.errors.date?.message ??
              (formState.isSubmitSuccessful
                ? "Saved"
                : "Choose a date to continue.")}
          </Text>
          <Button type="submit">Save date</Button>
        </Stack>
      </form>
    </Frame>
  );
}
