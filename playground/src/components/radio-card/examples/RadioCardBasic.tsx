import { Frame, Grid, RadioCard } from "@flowstack-ui/brick";
export function RadioCardBasic() {
  return (
    <Frame maxInlineSize={560}>
      <RadioCard.Root defaultValue="team">
        <RadioCard.Label>Choose a plan</RadioCard.Label>
        <Grid.Root columns={{ initial: 1, sm: 2 }} gap="3">
          <RadioCard.Item value="starter">
            <RadioCard.HiddenInput />
            <RadioCard.Control>
              <RadioCard.Content>
                <RadioCard.Title>Starter</RadioCard.Title>
                <RadioCard.Description>
                  For personal projects
                </RadioCard.Description>
              </RadioCard.Content>
              <RadioCard.Indicator />
            </RadioCard.Control>
          </RadioCard.Item>
          <RadioCard.Item value="team">
            <RadioCard.HiddenInput />
            <RadioCard.Control>
              <RadioCard.Content>
                <RadioCard.Title>Team</RadioCard.Title>
                <RadioCard.Description>
                  For collaborative projects
                </RadioCard.Description>
              </RadioCard.Content>
              <RadioCard.Indicator />
            </RadioCard.Control>
          </RadioCard.Item>
        </Grid.Root>
      </RadioCard.Root>
    </Frame>
  );
}
