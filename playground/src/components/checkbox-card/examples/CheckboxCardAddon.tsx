import { CheckboxCard, Frame } from "@flowstack-ui/brick";
export function CheckboxCardAddon() {
  return (
    <Frame maxInlineSize={400}>
      <CheckboxCard.Root defaultChecked>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Extended retention</CheckboxCard.Label>
            <CheckboxCard.Description>
              Keep snapshots for one year.
            </CheckboxCard.Description>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
        <CheckboxCard.Addon>$5 per month</CheckboxCard.Addon>
      </CheckboxCard.Root>
    </Frame>
  );
}
