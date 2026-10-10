import { useRef } from "react";
import {
  Chip,
  DatePicker,
  Frame,
  HStack,
  Text,
  parseDate,
  useLocaleContext,
} from "@flowstack-ui/brick";
export function DatePickerMultiple() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { locale } = useLocaleContext();
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  return (
    <Frame maxInlineSize="24rem">
      <DatePicker.Root
        referenceDate={parseDate("2026-09-18")}
        entryMode="none"
        selectionMode="multiple"
        name="meetings"
      >
        <DatePicker.Label>Meeting dates</DatePicker.Label>
        <DatePicker.Control>
          <Frame inlineSize="100%" minInlineSize={0}>
            <DatePicker.Context>
              {(picker) => (
                <HStack gap={1} wrap>
                  {picker.formValues.length === 0 ? (
                    <Text>Select dates</Text>
                  ) : (
                    picker.formValues.map((date) => (
                      <Chip.Root
                        key={date.toString()}
                        size="sm"
                        variant="soft"
                        radius="control"
                      >
                        <Chip.Label>
                          {formatter.format(date.toDate("UTC"))}
                        </Chip.Label>
                        <Chip.RemoveTrigger
                          ariaLabel={`Remove ${formatter.format(date.toDate("UTC"))}`}
                          onPress={() => {
                            triggerRef.current?.focus();
                            picker.setValue(
                              picker.formValues.filter(
                                (value) => value.compare(date) !== 0,
                              ),
                            );
                          }}
                        />
                      </Chip.Root>
                    ))
                  )}
                </HStack>
              )}
            </DatePicker.Context>
          </Frame>
          <DatePicker.Trigger ref={triggerRef} />
        </DatePicker.Control>
        <DatePicker.Portal>
          <DatePicker.Content aria-label="Meeting dates calendar">
            <DatePicker.Calendar />
          </DatePicker.Content>
        </DatePicker.Portal>
      </DatePicker.Root>
    </Frame>
  );
}
