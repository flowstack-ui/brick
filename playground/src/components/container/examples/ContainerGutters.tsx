import { Container, For, Surface, Text, VStack } from "@flowstack-ui/brick";

const gutters = ["none", "sm", "md", "lg"] as const;

export function ContainerGutters() {
  return (
    <VStack gap="4">
      <For each={gutters}>
        {(gutter) => (
          <Surface key={gutter} level="canvas" bordered radius="none">
            <Container measure="full" gutter={gutter}>
              <Surface level="subtle" inset="md" radius="none">
                <Text>{gutter}</Text>
              </Surface>
            </Container>
          </Surface>
        )}
      </For>
    </VStack>
  );
}
