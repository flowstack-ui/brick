import { useState } from "react";
import {
  RadioGroup,
  HStack,
  VStack,
  Button,
  Fieldset,
} from "@flowstack-ui/brick";

export function RadioGroupNativeForm() {
  const [result, setResult] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setResult(String(new FormData(event.currentTarget).get("channel")));
      }}
    >
      <VStack gap="4">
        <Fieldset.Root required>
          <Fieldset.Legend>Delivery channel</Fieldset.Legend>
          <RadioGroup.Root name="channel">
            <RadioGroup.Item value="email">Email</RadioGroup.Item>
            <RadioGroup.Item value="sms">Text message</RadioGroup.Item>
          </RadioGroup.Root>
          <Fieldset.Description>
            Choose one channel to continue.
          </Fieldset.Description>
        </Fieldset.Root>
        <HStack gap="2">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
        {result && <output>Saved: {result}</output>}
      </VStack>
    </form>
  );
}
