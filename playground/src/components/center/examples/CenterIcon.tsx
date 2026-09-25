import { HStack, Icon, Square, Surface, Text } from "@flowstack-ui/brick";
import { Phone } from "lucide-react";
export function CenterIcon() {
  return (
    <HStack gap="4">
      <Surface level="subtle" tone="accent" radius="none" asChild>
        <Square size="2.5rem">
          <Icon size="sm" tone="accent" aria-hidden>
            <Phone />
          </Icon>
        </Square>
      </Surface>
      <Surface level="subtle" tone="accent" radius="none" asChild>
        <Square size="2.5rem">
          <Text>1</Text>
        </Square>
      </Surface>
    </HStack>
  );
}
