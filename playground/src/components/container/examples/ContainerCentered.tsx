import {
  Container,
  Paragraph,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function ContainerCentered() {
  return (
    <Container>
      <VStack align="center" gap="4">
        <Surface level="subtle" inset="md" radius="none">
          <Text>Centered item</Text>
        </Surface>
        <Paragraph tone="secondary">
          Stack centers its children; Container centers the content boundary.
        </Paragraph>
      </VStack>
    </Container>
  );
}
