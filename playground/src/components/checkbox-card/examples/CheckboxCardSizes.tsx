import { CheckboxCard, For, VStack, Frame } from "@flowstack-ui/brick";
export function CheckboxCardSizes() {
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="4">
        <For each={["sm", "md", "lg"] as const}>
          {(size) => (
            <CheckboxCard.Root key={size} size={size} defaultChecked>
              <CheckboxCard.HiddenInput />
              <CheckboxCard.Control>
                <CheckboxCard.Content>
                  <CheckboxCard.Label>{size}</CheckboxCard.Label>
                  <CheckboxCard.Description>
                    Daily backups
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
