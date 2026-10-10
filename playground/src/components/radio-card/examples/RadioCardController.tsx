import { Frame, RadioCard, Text, useRadioCard } from "@flowstack-ui/brick";
export function RadioCardController() {
  const controller = useRadioCard({ defaultValue: "starter" });
  return (
    <Frame maxInlineSize={400}>
      <RadioCard.RootProvider
        value={controller}
        orientation="vertical"
        contentOrientation="horizontal"
      >
        <RadioCard.Label>Controller-owned plan</RadioCard.Label>
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
        <RadioCard.Context>
          {(state) => <Text>Selected: {state.activeValue}</Text>}
        </RadioCard.Context>
      </RadioCard.RootProvider>
    </Frame>
  );
}
