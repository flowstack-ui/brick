import { CheckboxCard, Frame } from "@flowstack-ui/brick";
export function CheckboxCardCustomIndicator() {
  return (
    <Frame maxInlineSize={400}>
      <CheckboxCard.Root defaultChecked>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Custom indicator</CheckboxCard.Label>
            <CheckboxCard.Description>
              Use decorative state artwork.
            </CheckboxCard.Description>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator>
            <CheckboxCard.Context>
              {(state) => <span>{state.checked ? "✓" : "+"}</span>}
            </CheckboxCard.Context>
          </CheckboxCard.Indicator>
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </Frame>
  );
}
