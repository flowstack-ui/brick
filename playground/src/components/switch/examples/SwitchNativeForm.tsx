import {
  Button,
  Form,
  HStack,
  Switch,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { useState } from "react";

export function SwitchNativeForm() {
  const [result, setResult] = useState("No submission yet");
  return (
    <Form
      aria-label="Digest preference"
      preventDefaultOnSubmit
      onSubmit={(event) =>
        setResult(
          `Submitted: ${new FormData(event.currentTarget).get("digest") ?? "off"}`,
        )
      }
      onReset={() => setResult("Form reset")}
    >
      <VStack align="start" gap="3">
        <Switch.Field defaultChecked name="digest" value="daily">
          <Switch.Control />
          <Switch.Label>Daily digest</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Field>
        <HStack gap="3">
          <Button type="submit">Submit</Button>
          <Button type="reset" tone="neutral" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text role="status">{result}</Text>
      </VStack>
    </Form>
  );
}
