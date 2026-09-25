import { CheckboxCard, Frame } from "@flowstack-ui/brick";
export function CheckboxCardBasic() {
  return (
    <Frame maxInlineSize={400}>
      <CheckboxCard.Root>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Backups</CheckboxCard.Label>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </Frame>
  );
}
