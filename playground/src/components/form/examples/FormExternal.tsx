import {
  Button,
  Field,
  Form,
  Frame,
  HStack,
  Input,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { useState } from "react";
export function FormExternal() {
  const [result, setResult] = useState("");
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <VStack gap={5}>
        <Form
          id="external-profile-form"
          preventDefaultOnSubmit
          onSubmit={() => setResult("Profile saved")}
        >
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input name="name" />
          </Field.Root>
        </Form>
        <HStack gap={3}>
          <Button type="submit" form="external-profile-form">
            Save profile
          </Button>
          <Button type="reset" form="external-profile-form" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text>{result}</Text>
      </VStack>
    </Frame>
  );
}
