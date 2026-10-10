import {
  CheckboxCard,
  useCheckboxCard,
  Frame,
  VStack,
  Text,
} from "@flowstack-ui/brick";
export function CheckboxCardController() {
  const state = useCheckboxCard();
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="3">
        <CheckboxCard.RootProvider value={state} inputValue="backups">
          <CheckboxCard.HiddenInput />
          <CheckboxCard.Control>
            <CheckboxCard.Content>
              <CheckboxCard.Label>Daily backups</CheckboxCard.Label>
            </CheckboxCard.Content>
            <CheckboxCard.Indicator />
          </CheckboxCard.Control>
        </CheckboxCard.RootProvider>
        <Text tone="secondary">
          {state.checked ? "Backups enabled" : "Backups disabled"}
        </Text>
      </VStack>
    </Frame>
  );
}
