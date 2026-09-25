import { CheckboxCard, VStack, Frame } from "@flowstack-ui/brick";
export function CheckboxCardNoIndicator() {
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="4">
        <CheckboxCard.Root defaultChecked>
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              <CheckboxCard.Label>Daily backups</CheckboxCard.Label>
              <CheckboxCard.Description>
                Automatic restore points.
              </CheckboxCard.Description>
            </CheckboxCard.Content>
          </CheckboxCard.Control>
        </CheckboxCard.Root>
        <CheckboxCard.Root>
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              <CheckboxCard.Label>Priority support</CheckboxCard.Label>
              <CheckboxCard.Description>
                Faster replies from our team.
              </CheckboxCard.Description>
            </CheckboxCard.Content>
          </CheckboxCard.Control>
        </CheckboxCard.Root>
      </VStack>
    </Frame>
  );
}
