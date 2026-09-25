import {
  Bleed,
  Card,
  Center,
  Circle,
  Frame,
  Icon,
  Paragraph,
  Surface,
} from "@flowstack-ui/brick";
import { Check } from "lucide-react";

export function CardProfile() {
  return (
    <Frame maxInlineSize={360}>
      <Card.Root overflow="visible">
        <Bleed blockStart="6">
          <Center>
            <Surface tone="accent" level="subtle" radius="full" asChild>
              <Circle size={48}>
                <Icon>
                  <Check />
                </Icon>
              </Circle>
            </Surface>
          </Center>
        </Bleed>
        <Card.Header>
          <Card.Title>You're all set</Card.Title>
          <Card.Description>Your workspace is ready.</Card.Description>
        </Card.Header>
        <Card.Content>
          <Paragraph>
            The confirmation marker crosses the boundary while the card retains
            its ordinary section insets.
          </Paragraph>
        </Card.Content>
      </Card.Root>
    </Frame>
  );
}
