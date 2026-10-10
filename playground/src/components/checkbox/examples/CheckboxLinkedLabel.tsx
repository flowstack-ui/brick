import { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  HStack,
  Link,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function CheckboxLinkedLabel() {
  const [status, setStatus] = useState("No submission yet");
  return (
    <Form
      aria-label="Linked consent"
      preventDefaultOnSubmit
      onSubmit={(event) =>
        setStatus(
          `Submitted: ${new FormData(event.currentTarget).get("consent")}`,
        )
      }
      onReset={() => setStatus("Form reset")}
    >
      <VStack gap="4">
        <Checkbox.Root required>
          <Checkbox.Control name="consent" value="accepted" />
          <Checkbox.Label>
            I agree to the{" "}
            <Link href="#consent-terms">terms and conditions</Link>.
          </Checkbox.Label>
          <Checkbox.Description>
            Read the terms before giving consent.
          </Checkbox.Description>
          <Checkbox.Error>Please accept the terms to continue.</Checkbox.Error>
        </Checkbox.Root>
        <HStack gap="3">
          <Button type="submit">Continue</Button>
          <Button type="reset" variant="outline" tone="neutral">
            Reset
          </Button>
        </HStack>
        <Text role="status">{status}</Text>
        <Text id="consent-terms">
          Terms: this is a demonstration, not a real agreement.
        </Text>
      </VStack>
    </Form>
  );
}
