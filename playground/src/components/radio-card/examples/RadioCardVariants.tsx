import { Frame, HStack, RadioCard, VStack } from "@flowstack-ui/brick";
export function RadioCardVariants() {
  return (
    <Frame maxInlineSize={560}>
      <VStack gap="6">
        {(["outline", "surface", "subtle", "solid"] as const).map((variant) => (
          <RadioCard.Root key={variant} variant={variant} defaultValue="a">
            <RadioCard.Label>{variant}</RadioCard.Label>
            <HStack gap="3">
              {["a", "b"].map((value) => (
                <RadioCard.Item key={value} value={value}>
                  <RadioCard.HiddenInput />
                  <RadioCard.Control>
                    <RadioCard.Content>
                      <RadioCard.Title>
                        {value === "a" ? variant : "Alternative"}
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
