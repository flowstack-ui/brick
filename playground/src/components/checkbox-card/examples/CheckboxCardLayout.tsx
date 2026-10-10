import { CheckboxCard, VStack, Frame } from "@flowstack-ui/brick";
export function CheckboxCardLayout() {
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="4">
        <CheckboxCard.Root orientation="vertical" align="center">
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              <CheckboxCard.Label>Vertical</CheckboxCard.Label>
              <CheckboxCard.Description>
                A centered option.
              </CheckboxCard.Description>
            </CheckboxCard.Content>
            <CheckboxCard.Indicator />
          </CheckboxCard.Control>
        </CheckboxCard.Root>
        <CheckboxCard.Root>
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Indicator />
            <CheckboxCard.Content>
              <CheckboxCard.Label>Start indicator</CheckboxCard.Label>
              <CheckboxCard.Description>
                Place the indicator before content.
              </CheckboxCard.Description>
            </CheckboxCard.Content>
          </CheckboxCard.Control>
        </CheckboxCard.Root>
      </VStack>
    </Frame>
  );
}
