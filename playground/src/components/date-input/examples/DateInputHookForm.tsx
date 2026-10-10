import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DateInput,
  Frame,
  Stack,
  Text,
  parseDate,
  type DateValue,
} from "@flowstack-ui/brick";
export function DateInputHookForm() {
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
              <DateInput.Root
                referenceDate={parseDate("2026-09-18")}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={field.onBlur}
                invalid={fieldState.invalid}
                required
              >
                <DateInput.Label>Review date</DateInput.Label>
                <DateInput.Control>
                  <DateInput.SegmentGroup aria-describedby="date-input-rhf-message">
                    <DateInput.Segments />
                  </DateInput.SegmentGroup>
                </DateInput.Control>
                <DateInput.HiddenInput />
              </DateInput.Root>
            )}
          />
          <Text id="date-input-rhf-message" role="status">
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
