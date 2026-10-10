import { Frame, RadioCard } from "@flowstack-ui/brick";
export function RadioCardResponsive() {
  return (
    <Frame maxInlineSize={440}>
      <RadioCard.Root
        defaultValue="team"
        orientation="vertical"
        contentOrientation={{ initial: "vertical", md: "horizontal" }}
        size={{ initial: "sm", md: "lg" }}
        variant={{ initial: "subtle", md: "outline" }}
        align={{ initial: "center", md: "start" }}
      >
        <RadioCard.Label>Responsive presentation</RadioCard.Label>
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
      </RadioCard.Root>
    </Frame>
  );
}
