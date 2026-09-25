import { CheckboxCard, Frame } from "@flowstack-ui/brick";
export function CheckboxCardResponsive() {
  return (
    <Frame maxInlineSize={400}>
      <CheckboxCard.Root
        size={{ initial: "sm", md: "lg" }}
        orientation={{ initial: "vertical", md: "horizontal" }}
      >
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Content>
            <CheckboxCard.Label>Responsive option</CheckboxCard.Label>
            <CheckboxCard.Description>
              Layout and density adapt without changing selection behavior.
            </CheckboxCard.Description>
          </CheckboxCard.Content>
          <CheckboxCard.Indicator />
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </Frame>
  );
}
