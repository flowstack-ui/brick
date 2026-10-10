import { useState } from "react";
import {
  SegmentGroup,
  VStack,
  HStack,
  Button,
  Text,
} from "@flowstack-ui/brick";
export function SegmentGroupForm() {
  const [result, setResult] = useState("Not submitted");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setResult(String(new FormData(event.currentTarget).get("view")));
      }}
      onReset={() => setResult("Not submitted")}
    >
      <VStack align="start" gap="4">
        <SegmentGroup.Root
          aria-label="Form view"
          name="view"
          required
          validationBehavior="native"
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={["List", "Grid", "Board"]} />
        </SegmentGroup.Root>
        <HStack gap="3">
          <Button size="sm" type="submit">
            Submit
          </Button>
          <Button size="sm" type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text role="status">{result}</Text>
      </VStack>
    </form>
  );
}
