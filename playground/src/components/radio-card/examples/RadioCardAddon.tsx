import { Frame, RadioCard } from "@flowstack-ui/brick";
export function RadioCardAddon() {
  return (
    <Frame maxInlineSize={400}>
      <RadioCard.Root defaultValue="annual" aria-label="Billing">
        <RadioCard.Item value="annual">
          <RadioCard.HiddenInput />
          <RadioCard.Control>
            <RadioCard.Content>
              <RadioCard.Title>Annual billing</RadioCard.Title>
              <RadioCard.Description>Pay once per year</RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Control>
          <RadioCard.Addon>
            Save 20% compared with monthly billing
          </RadioCard.Addon>
        </RadioCard.Item>
        <RadioCard.Item value="monthly">
          <RadioCard.HiddenInput />
          <RadioCard.Control>
            <RadioCard.Content>
              <RadioCard.Title>Monthly billing</RadioCard.Title>
              <RadioCard.Description>Pay every month</RadioCard.Description>
            </RadioCard.Content>
            <RadioCard.Indicator />
          </RadioCard.Control>
          <RadioCard.Addon>Cancel at any time</RadioCard.Addon>
        </RadioCard.Item>
      </RadioCard.Root>
    </Frame>
  );
}
