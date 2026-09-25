import { DateInput, Frame, Stack, parseDate } from "@flowstack-ui/brick";
export function DateInputStates() {
  const date = parseDate("2026-09-18");
  return (
    <Frame maxInlineSize="24rem">
      <Stack gap={4}>
        <DateInput.Root
          referenceDate={date}
          defaultValue={date}
          disabled
          aria-label="Disabled date"
        />
        <DateInput.Root
          referenceDate={date}
          defaultValue={date}
          readOnly
          aria-label="Read-only date"
        />
        <DateInput.Root
          referenceDate={date}
          defaultValue={date}
          invalid
          aria-label="Invalid date"
        />
        <DateInput.Root
          referenceDate={date}
          min={date}
          max={date.add({ days: 14 })}
          isDateUnavailable={(value) => value.day === 20}
          aria-label="Restricted date"
        />
      </Stack>
    </Frame>
  );
}
