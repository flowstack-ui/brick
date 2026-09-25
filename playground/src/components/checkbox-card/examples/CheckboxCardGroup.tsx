import {
  CheckboxCard,
  CheckboxGroup,
  Fieldset,
  Frame,
} from "@flowstack-ui/brick";
export function CheckboxCardGroup() {
  return (
    <Frame maxInlineSize={400}>
      <Fieldset.Root>
        <Fieldset.Legend>Workspace extras</Fieldset.Legend>
        <CheckboxGroup.Root name="extras" defaultValue={["backups"]}>
          <CheckboxCard.Root value="backups">
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <CheckboxCard.Label>Daily backups</CheckboxCard.Label>
                <CheckboxCard.Description>
                  Automatic restore points.
                </CheckboxCard.Description>
              </CheckboxCard.Content>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
          <CheckboxCard.Root value="support">
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <CheckboxCard.Label>Priority support</CheckboxCard.Label>
                <CheckboxCard.Description>
                  Faster replies from our team.
                </CheckboxCard.Description>
              </CheckboxCard.Content>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        </CheckboxGroup.Root>
      </Fieldset.Root>
    </Frame>
  );
}
