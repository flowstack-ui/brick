import { Frame, HStack, RadioCard, VStack } from "@flowstack-ui/brick";
export function RadioCardSizes() {
  return (
    <Frame maxInlineSize={560}>
      <VStack gap="6">
        {(["sm", "md", "lg"] as const).map((size) => (
          <RadioCard.Root key={size} size={size} defaultValue="a">
            <RadioCard.Label>{size}</RadioCard.Label>
            <HStack gap="3">
              {["a", "b"].map((value) => (
                <RadioCard.Item key={value} value={value}>
                  <RadioCard.HiddenInput />
                  <RadioCard.Control>
                    <RadioCard.Content>
                      <RadioCard.Title>
                        {value === "a" ? size : "Alternative"}
                      </RadioCard.Title>
                      <RadioCard.Description>
                        For collaborative projects
                      </RadioCard.Description>
                    </RadioCard.Content>
                    <RadioCard.Indicator />
                  </RadioCard.Control>
                </RadioCard.Item>
              ))}
            </HStack>
          </RadioCard.Root>
        ))}
      </VStack>
    </Frame>
  );
}
