import { useState } from "react";
import {
  Button,
  Field,
  Frame,
  HStack,
  Input,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function InputNativeForm() {
  const [submitted, setSubmitted] = useState("");
  return (
    <Frame maxInlineSize="24rem">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(
            String(new FormData(event.currentTarget).get("name") ?? ""),
          );
        }}
      >
        <VStack gap="4">
          <Field.Root required>
            <Field.Label>Display name</Field.Label>
            <Input name="name" defaultValue="Ada" />
          </Field.Root>
          <HStack gap="2">
            <Button type="submit">Save</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text>{submitted ? "Saved: " + submitted : "No changes saved"}</Text>
        </VStack>
      </form>
    </Frame>
  );
}
