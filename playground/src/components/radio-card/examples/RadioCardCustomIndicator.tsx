import { Frame, Icon, RadioCard } from "@flowstack-ui/brick";
import { Check } from "lucide-react";
export function RadioCardCustomIndicator() {
  return (
    <Frame maxInlineSize={400}>
      <RadioCard.Root defaultValue="team">
        <RadioCard.Label>Custom checked artwork</RadioCard.Label>
        <RadioCard.Item value="team">
          <RadioCard.HiddenInput />
          <RadioCard.Control>
            <RadioCard.Indicator
              checked={
                <Icon>
                  <Check />
                </Icon>
              }
            />
            <RadioCard.Content>
              <RadioCard.Title>Team</RadioCard.Title>
              <RadioCard.ItemContext>
                {(state) => (
                  <RadioCard.Description>
                    {state.checked
                      ? "Ready for collaboration"
                      : "Choose this plan"}
                  </RadioCard.Description>
                )}
              </RadioCard.ItemContext>
            </RadioCard.Content>
          </RadioCard.Control>
        </RadioCard.Item>
        <RadioCard.Item value="starter">
          <RadioCard.HiddenInput />
          <RadioCard.Control>
            <RadioCard.Content>
              <RadioCard.Title>Starter</RadioCard.Title>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Control>
        </RadioCard.Item>
      </RadioCard.Root>
    </Frame>
  );
}
