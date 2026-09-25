import { useState } from "react";
import {
  Button,
  Field,
  Form,
  PasswordToggleField,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function PasswordToggleFieldNativeForm() {
  const [status, setStatus] = useState("No form event yet");
  return (
    <Form
      aria-label="Native password form"
      onReset={() => setStatus("Form reset")}
      onSubmit={() => setStatus("Submitted safely")}
      preventDefaultOnSubmit
    >
      <VStack gap={5}>
        <Field.Root required>
          <Field.Label>Account password</Field.Label>
          <PasswordToggleField.Root>
            <PasswordToggleField.Input
              autoComplete="current-password"
              name="account-password"
            />
            <PasswordToggleField.Toggle />
          </PasswordToggleField.Root>
          <Field.Error>Enter an account password.</Field.Error>
        </Field.Root>
        <Button type="submit">Sign in</Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <output>
          <Text as="span" variant="body-sm" tone="secondary">
            {status}
          </Text>
        </output>
      </VStack>
    </Form>
  );
}
