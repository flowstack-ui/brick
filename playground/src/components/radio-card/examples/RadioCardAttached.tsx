import { Frame, Group, RadioCard } from "@flowstack-ui/brick";
export function RadioCardAttached() {
  return (
    <Frame maxInlineSize={560}>
      <RadioCard.Root defaultValue="monthly">
        <RadioCard.Label>Billing cadence</RadioCard.Label>
        <Group attached>
          <RadioCard.Item value="monthly">
            <RadioCard.HiddenInput />
            <RadioCard.Control>
              <RadioCard.Content>
                <RadioCard.Title>Monthly</RadioCard.Title>
              </RadioCard.Content>
              <RadioCard.Indicator />
            </RadioCard.Control>
          </RadioCard.Item>
          <RadioCard.Item value="annual">
            <RadioCard.HiddenInput />
            <RadioCard.Control>
              <RadioCard.Content>
                <RadioCard.Title>Annual</RadioCard.Title>
              </RadioCard.Content>
              <RadioCard.Indicator />
            </RadioCard.Control>
          </RadioCard.Item>
        </Group>
      </RadioCard.Root>
    </Frame>
  );
}
