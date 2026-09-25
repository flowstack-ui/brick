import { Frame, Status, VStack } from "@flowstack-ui/brick";
export function StatusComposition() {
  return (
    <VStack align="start" gap={4}>
      <Status.Root asChild tone="success">
        <span>
          <Status.Indicator />
          <Status.Label asChild>
            <strong>Ready to publish</strong>
          </Status.Label>
        </span>
      </Status.Root>
      <Frame maxInlineSize={180}>
        <Status.Root tone="warning">
          <Status.Indicator />
          <Status.Label>
            Awaiting approval from your workspace administrator
          </Status.Label>
        </Status.Root>
      </Frame>
    </VStack>
  );
}
