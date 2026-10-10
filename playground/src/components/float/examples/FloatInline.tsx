import {
  Badge,
  Float,
  HStack,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function FloatInline() {
  return (
    <VStack gap={8}>
      <Float.Anchor>
        <Surface level="subtle" inset="lg">
          <Text>Block anchor</Text>
        </Surface>
        <Float.Root>
          <Badge tone="accent" variant="solid">
            New
          </Badge>
        </Float.Root>
      </Float.Anchor>
      <HStack>
        <Float.Anchor inline>
          <Surface level="subtle" inset="lg">
            <Text>Compact anchor</Text>
          </Surface>
          <Float.Root>
            <Badge tone="accent" variant="solid">
              New
            </Badge>
          </Float.Root>
        </Float.Anchor>
      </HStack>
    </VStack>
  );
}
