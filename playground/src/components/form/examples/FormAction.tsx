import {
  Button,
  Field,
  Form,
  Frame,
  HStack,
  Input,
  Text,
} from "@flowstack-ui/brick";
import { useState } from "react";
export function FormAction() {
  const [result, setResult] = useState("");
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Form action={async (data) => setResult(String(data.get("name")))}>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input name="name" />
        </Field.Root>
        <HStack>
          <Button type="submit">Send</Button>
        </HStack>
        <Text>{result}</Text>
      </Form>
    </Frame>
  );
}
