import { useState } from "react";
import {
  Button,
  Fieldset,
  Form,
  Frame,
  HStack,
  RadioCard,
  Text,
} from "@flowstack-ui/brick";
export function RadioCardForm() {
  const [result, setResult] = useState("No submission");
  return (
    <Frame maxInlineSize={440}>
      <Form
        aria-label="Plan form"
        preventDefaultOnSubmit
        onSubmit={(event) =>
          setResult(String(new FormData(event.currentTarget).get("plan")))
        }
        onReset={() => setResult("Reset")}
      >
        <Fieldset.Root required>
          <Fieldset.Legend>Choose billing plan</Fieldset.Legend>
          <Fieldset.Description>
            Select one option before saving.
          </Fieldset.Description>
          <RadioCard.Root
            name="plan"
            orientation="vertical"
            contentOrientation="horizontal"
          >
            <RadioCard.Item value="starter">
              <RadioCard.HiddenInput />
              <RadioCard.Control>
                <RadioCard.Content>
                  <RadioCard.Title>Starter</RadioCard.Title>
                  <RadioCard.Description>
                    For personal projects
                  </RadioCard.Description>
                </RadioCard.Content>
                <RadioCard.Indicator />
              </RadioCard.Control>
            </RadioCard.Item>
            <RadioCard.Item value="team">
              <RadioCard.HiddenInput />
              <RadioCard.Control>
                <RadioCard.Content>
                  <RadioCard.Title>Team</RadioCard.Title>
                  <RadioCard.Description>
                    For collaborative projects
                  </RadioCard.Description>
                </RadioCard.Content>
                <RadioCard.Indicator />
              </RadioCard.Control>
            </RadioCard.Item>
          </RadioCard.Root>
          <Fieldset.Error>Choose a plan.</Fieldset.Error>
        </Fieldset.Root>
        <HStack gap="3">
          <Button type="submit">Save</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text>{result}</Text>
      </Form>
    </Frame>
  );
}
