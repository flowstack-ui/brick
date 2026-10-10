import { Stack, Surface, Text, Paragraph, Square } from "@flowstack-ui/brick";

export function StackOrdering() {
  return (
    <Stack direction="row" gap={3} align="center">
      <Stack.Item>
        <Paragraph>
          Project overview remains first in the reading order.
        </Paragraph>
      </Stack.Item>
      <Stack.Item order={-1} aria-hidden="true">
        <Square size="10" asChild>
          <Surface tone="accent" level="subtle">
            <Text>01</Text>
          </Surface>
        </Square>
      </Stack.Item>
    </Stack>
  );
}
