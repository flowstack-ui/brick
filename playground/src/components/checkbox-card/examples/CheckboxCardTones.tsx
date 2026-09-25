import { CheckboxCard, For, VStack, Frame } from "@flowstack-ui/brick";
export function CheckboxCardTones() {
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="4">
        <For each={["accent", "neutral", "contrast"] as const}>
          {(tone) => (
            <CheckboxCard.Root key={tone} tone={tone} defaultChecked>
              <CheckboxCard.HiddenInput />
              <CheckboxCard.Control>
                <CheckboxCard.Content>
                  <CheckboxCard.Label>{tone}</CheckboxCard.Label>
                  <CheckboxCard.Description>
                    {tone === "accent"
                      ? "Uses the theme accent."
                      : "Monochrome selection; neutral and contrast share this treatment."}
                  </CheckboxCard.Description>
                </CheckboxCard.Content>
                <CheckboxCard.Indicator />
              </CheckboxCard.Control>
            </CheckboxCard.Root>
          )}
        </For>
      </VStack>
    </Frame>
  );
}
