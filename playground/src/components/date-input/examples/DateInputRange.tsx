import { useId } from "react";
import {
  DateInput,
  Frame,
  Grid,
  Hide,
  Show,
  Text,
  parseDate,
  useLocaleContext,
} from "@flowstack-ui/brick";
export function DateInputRange() {
  const id = useId();
  const { dir } = useLocaleContext();
  return (
    <Frame maxInlineSize="32rem">
      <DateInput.Root
        referenceDate={parseDate("2026-09-18")}
        selectionMode="range"
        name="trip"
        defaultValue={{
          start: parseDate("2026-09-18"),
          end: parseDate("2026-09-23"),
        }}
      >
        <Grid.Root
          templateColumns={{
            initial: "minmax(0, 1fr)",
            sm: "minmax(0, 1fr) auto minmax(0, 1fr)",
          }}
          templateAreas={{
            initial: '"startLabel" "start" "arrow" "endLabel" "end"',
            sm: '"startLabel . endLabel" "start arrow end"',
          }}
          gap={2}
          align="center"
        >
          <Grid.Item area="startLabel">
            <DateInput.Label index={0}>Start date</DateInput.Label>
          </Grid.Item>
          <Grid.Item area="start">
            <DateInput.Control id={id + "-start-control"}>
              <DateInput.SegmentGroup index={0}>
                <DateInput.Segments index={0} />
              </DateInput.SegmentGroup>
            </DateInput.Control>
          </Grid.Item>
          <Grid.Item area="arrow" aria-hidden="true">
            <Show from="sm">
              <Text>{dir === "rtl" ? "←" : "→"}</Text>
            </Show>
            <Hide from="sm">
              <Text>↓</Text>
            </Hide>
          </Grid.Item>
          <Grid.Item area="endLabel">
            <DateInput.Label index={1}>End date</DateInput.Label>
          </Grid.Item>
          <Grid.Item area="end">
            <DateInput.Control id={id + "-end-control"}>
              <DateInput.SegmentGroup index={1}>
                <DateInput.Segments index={1} />
              </DateInput.SegmentGroup>
            </DateInput.Control>
          </Grid.Item>
        </Grid.Root>
        <DateInput.HiddenInput index={0} />
        <DateInput.HiddenInput index={1} />
      </DateInput.Root>
    </Frame>
  );
}
