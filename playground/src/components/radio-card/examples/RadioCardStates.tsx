import { Frame, RadioCard, VStack } from "@flowstack-ui/brick";
export function RadioCardStates() {
  return (
    <Frame maxInlineSize={560}>
      <VStack gap="6">
        {(["disabled", "readOnly", "invalid"] as const).map((state) => (
          <RadioCard.Root
            key={state}
            {...{ [state]: true }}
            defaultValue="a"
            orientation="vertical"
            contentOrientation="horizontal"
          >
            <RadioCard.Label>{state}</RadioCard.Label>
            <RadioCard.Item value="a">
              <RadioCard.HiddenInput />
              <RadioCard.Control>
                <RadioCard.Content>
                  <RadioCard.Title>Selected</RadioCard.Title>
                  <RadioCard.Description>
                    For collaborative projects
                  </RadioCard.Description>
                </RadioCard.Content>
                <RadioCard.Indicator />
              </RadioCard.Control>
            </RadioCard.Item>
            <RadioCard.Item value="b">
              <RadioCard.HiddenInput />
              <RadioCard.Control>
                <RadioCard.Content>
                  <RadioCard.Title>Alternative</RadioCard.Title>
                  <RadioCard.Description>
                    For collaborative projects
                  </RadioCard.Description>
                </RadioCard.Content>
                <RadioCard.Indicator />
              </RadioCard.Control>
            </RadioCard.Item>
          </RadioCard.Root>
        ))}
      </VStack>
    </Frame>
  );
}
