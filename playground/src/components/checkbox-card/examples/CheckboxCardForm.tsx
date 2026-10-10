import { useState } from "react";
import {
  Button,
  CheckboxCard,
  CheckboxGroup,
  Fieldset,
  Frame,
  HStack,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function CheckboxCardForm() {
  const [result, setResult] = useState("No submission");
  return (
    <Frame maxInlineSize={400}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            new FormData(event.currentTarget).getAll("extras").join(", "),
          );
        }}
        onReset={() => setResult("No submission")}
      >
        <VStack gap="4">
          <Fieldset.Root>
            <Fieldset.Legend>Choose one extra</Fieldset.Legend>
            <CheckboxGroup.Root name="extras" required maxSelectedValues={1}>
              <CheckboxCard.Root value="backups">
                <CheckboxCard.HiddenInput />
                <CheckboxCard.Control>
                  <CheckboxCard.Content>
                    <CheckboxCard.Label>Daily backups</CheckboxCard.Label>
                  </CheckboxCard.Content>
                  <CheckboxCard.Indicator />
                </CheckboxCard.Control>
              </CheckboxCard.Root>
              <CheckboxCard.Root value="support">
                <CheckboxCard.HiddenInput />
                <CheckboxCard.Control>
                  <CheckboxCard.Content>
                    <CheckboxCard.Label>Priority support</CheckboxCard.Label>
                  </CheckboxCard.Content>
                  <CheckboxCard.Indicator />
                </CheckboxCard.Control>
              </CheckboxCard.Root>
            </CheckboxGroup.Root>
          </Fieldset.Root>
          <HStack gap="3">
            <Button type="submit">Save</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text role="status">{result}</Text>
        </VStack>
      </form>
    </Frame>
  );
}
