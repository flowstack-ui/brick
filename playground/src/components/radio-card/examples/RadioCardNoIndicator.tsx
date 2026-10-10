import { Frame, HStack, Icon, RadioCard } from "@flowstack-ui/brick";
import { CreditCard, Wallet } from "lucide-react";
export function RadioCardNoIndicator() {
  return (
    <Frame maxInlineSize={460}>
      <RadioCard.Root
        defaultValue="card"
        contentOrientation="vertical"
        align="center"
      >
        <RadioCard.Label>Payment method</RadioCard.Label>
        <HStack gap="3">
          {[
            { value: "card", label: "Card", Artwork: CreditCard },
            { value: "wallet", label: "Wallet", Artwork: Wallet },
          ].map(({ value, label, Artwork }) => (
            <RadioCard.Item key={value} value={value}>
              <RadioCard.HiddenInput />
              <RadioCard.Control>
                <Icon size="lg">
                  <Artwork />
                </Icon>
                <RadioCard.Title>{label}</RadioCard.Title>
              </RadioCard.Control>
            </RadioCard.Item>
          ))}
        </HStack>
      </RadioCard.Root>
    </Frame>
  );
}
