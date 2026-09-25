import { useState } from "react";
import {
  Button,
  Field,
  Frame,
  HStack,
  Textarea,
  VStack,
} from "@flowstack-ui/brick";

export function TextareaControlled() {
  const [value, setValue] = useState("Draft project summary");
  return (
    <Frame maxInlineSize="32rem">
      <VStack gap="3">
        <Field.Root>
          <Field.Label>Project summary</Field.Label>
          <Textarea.Root value={value} onValueChange={setValue} />
        </Field.Root>
        <HStack gap="2">
          <Button onClick={() => setValue("")}>Clear</Button>
          <Button
            variant="outline"
            onClick={() => setValue("Updated externally")}
          >
            Replace
          </Button>
        </HStack>
      </VStack>
    </Frame>
  );
}
