import { Button, Prose, VStack } from "@flowstack-ui/brick";

export function ProseBoundaries() {
  return (
    <Prose>
      <Prose.Content>
        <h2>Content from a renderer</h2>
        <p>
          Use Content at the immediate parent of the document nodes when your
          renderer introduces a wrapper.
        </p>
      </Prose.Content>
      <Prose.Exclude>
        <VStack gap={3}>
          <Button>Embedded action</Button>
          <p>This native paragraph is outside the document styling rules.</p>
        </VStack>
      </Prose.Exclude>
    </Prose>
  );
}
