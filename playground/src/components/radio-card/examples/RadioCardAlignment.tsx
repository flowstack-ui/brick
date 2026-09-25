import { Frame, RadioCard, VStack } from "@flowstack-ui/brick";
export function RadioCardAlignment() {
  return (
    <Frame maxInlineSize={460}>
      <VStack gap="5">
        {(["start", "center", "end"] as const).map((align) => (
          <RadioCard.Root
            key={align}
            align={align}
            contentOrientation="vertical"
            defaultValue="a"
            aria-label={align}
          >
            <RadioCard.Item value="a">
              <RadioCard.HiddenInput />
              <RadioCard.Control>
                <RadioCard.Content>
                  <RadioCard.Title>{align}</RadioCard.Title>
                  <RadioCard.Description>
                    Aligned card content
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
