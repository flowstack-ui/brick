import { Frame, RadioCard, VStack } from "@flowstack-ui/brick";
export function RadioCardTones() {
  return (
    <Frame maxInlineSize={560}>
      <VStack gap="4">
        {(["neutral", "accent", "contrast", "success"] as const).map((tone) => (
          <RadioCard.Root
            key={tone}
            tone={tone}
            variant="solid"
            defaultValue="a"
            aria-label={tone}
          >
            <RadioCard.Item value="a">
              <RadioCard.HiddenInput />
              <RadioCard.Control>
                <RadioCard.Content>
                  <RadioCard.Title>{tone}</RadioCard.Title>
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
