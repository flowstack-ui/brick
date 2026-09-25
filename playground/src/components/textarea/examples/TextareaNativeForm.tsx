import { useState } from "react";
import {
  Button,
  Field,
  Frame,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@flowstack-ui/brick";

export function TextareaNativeForm() {
  const [submitted, setSubmitted] = useState("");
  return (
    <Frame maxInlineSize="32rem">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(
            String(new FormData(event.currentTarget).get("notes") ?? ""),
          );
        }}
      >
        <VStack gap="4">
          <Field.Root required>
            <Field.Label>Notes</Field.Label>
            <Textarea.Root name="notes" defaultValue="Initial notes" required />
          </Field.Root>
          <HStack gap="2">
            <Button type="submit">Save</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text>{submitted ? `Saved: ${submitted}` : "No submission yet"}</Text>
        </VStack>
      </form>
    </Frame>
  );
}
