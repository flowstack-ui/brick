import { useState } from "react";
import { Frame, RadioCard, Text, VStack } from "@flowstack-ui/brick";
export function RadioCardControlled() {
  const [value, setValue] = useState("starter");
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="3">
        <RadioCard.Root
          value={value}
          onValueChange={setValue}
          orientation="vertical"
          contentOrientation="horizontal"
        >
          <RadioCard.Label>Controlled plan</RadioCard.Label>
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
        <Text>Selected: {value}</Text>
      </VStack>
    </Frame>
  );
}
