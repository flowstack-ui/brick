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
export function FormBasic() {
  const [result, setResult] = useState("");
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Form
        preventDefaultOnSubmit
        onSubmit={(event) =>
          setResult(String(new FormData(event.currentTarget).get("email")))
        }
      >
        <Field.Root required>
          <Field.Label>Email</Field.Label>
          <Input name="email" type="email" />
        </Field.Root>
        <HStack gap={3}>
          <Button type="submit">Subscribe</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text>{result || "Enter your email to subscribe."}</Text>
      </Form>
    </Frame>
  );
}
