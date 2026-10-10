import { CheckboxCard, Frame } from "@flowstack-ui/brick";
export function CheckboxCardDescription() {
  return (
    <Frame maxInlineSize={400}>
      <CheckboxCard.Root>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Daily backups</CheckboxCard.Label>
            <CheckboxCard.Description>
              Restore your workspace from automatic snapshots.
            </CheckboxCard.Description>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </Frame>
  );
}
