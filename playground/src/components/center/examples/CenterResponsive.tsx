import { HStack, Square, Surface, Text } from "@flowstack-ui/brick";
export function CenterResponsive() {
  return (
    <HStack gap="4">
      <Surface level="subtle" tone="accent" radius="none" asChild>
        <Square size={{ initial: 32, md: 40, xl: 48 }}>
          <Text>R</Text>
        </Square>
      </Surface>
      <Text>
        The square grows at the medium and extra-large breakpoints and does not
        shrink beside this text.
      </Text>
    </HStack>
  );
}
