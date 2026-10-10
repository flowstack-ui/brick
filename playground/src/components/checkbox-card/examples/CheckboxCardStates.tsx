import { CheckboxCard, VStack, Frame } from "@flowstack-ui/brick";
export function CheckboxCardStates() {
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="4">
        <CheckboxCard.Root disabled defaultChecked>
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              <CheckboxCard.Label>Disabled</CheckboxCard.Label>
              <CheckboxCard.Description>
                This option is unavailable.
              </CheckboxCard.Description>
            </CheckboxCard.Content>
            <CheckboxCard.Indicator />
          </CheckboxCard.Control>
        </CheckboxCard.Root>
        <CheckboxCard.Root readOnly defaultChecked>
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              <CheckboxCard.Label>Read only</CheckboxCard.Label>
              <CheckboxCard.Description>
                Included with your plan. Focusable, but cannot be changed.
              </CheckboxCard.Description>
            </CheckboxCard.Content>
            <CheckboxCard.Indicator />
          </CheckboxCard.Control>
        </CheckboxCard.Root>
        <CheckboxCard.Root defaultChecked="indeterminate">
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              <CheckboxCard.Label>Partially selected</CheckboxCard.Label>
              <CheckboxCard.Description>
                Some settings are enabled.
              </CheckboxCard.Description>
            </CheckboxCard.Content>
            <CheckboxCard.Indicator />
          </CheckboxCard.Control>
        </CheckboxCard.Root>
        <CheckboxCard.Root invalid>
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              <CheckboxCard.Label>Invalid</CheckboxCard.Label>
              <CheckboxCard.Description>
                Choose an eligible option.
              </CheckboxCard.Description>
            </CheckboxCard.Content>
            <CheckboxCard.Indicator />
          </CheckboxCard.Control>
        </CheckboxCard.Root>
      </VStack>
    </Frame>
  );
}
