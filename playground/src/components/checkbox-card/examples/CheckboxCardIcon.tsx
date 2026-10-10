import { CheckboxCard, Frame, Icon } from "@flowstack-ui/brick";
import { ShieldCheck } from "lucide-react";
export function CheckboxCardIcon() {
  return (
    <Frame maxInlineSize={400}>
      <CheckboxCard.Root>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <Icon size="lg">
            <ShieldCheck />
          </Icon>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Advanced protection</CheckboxCard.Label>
            <CheckboxCard.Description>
              Additional workspace security.
            </CheckboxCard.Description>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </Frame>
  );
}
