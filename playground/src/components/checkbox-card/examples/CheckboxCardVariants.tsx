import { CheckboxCard, For, VStack, Frame } from "@flowstack-ui/brick";
export function CheckboxCardVariants() {
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="4">
        <For each={["outline", "surface", "subtle", "solid"] as const}>
          {(variant) => (
            <CheckboxCard.Root key={variant} variant={variant} defaultChecked>
              <CheckboxCard.HiddenInput />
              <CheckboxCard.Control>
                <CheckboxCard.Content>
                  <CheckboxCard.Label>{variant}</CheckboxCard.Label>
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
