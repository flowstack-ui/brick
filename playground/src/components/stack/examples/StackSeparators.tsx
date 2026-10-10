import { HStack, Stack, Text, VStack } from "@flowstack-ui/brick";

export function StackSeparators() {
  return (
    <VStack gap={8}>
      <Stack gap={3} separator={<Stack.Separator />}>
        <Text>First</Text>
        <Text>Second</Text>
        <Text>Third</Text>
      </Stack>
      <HStack
        gap={2}
        separator={<Stack.Separator extent="1.25rem" align="center" />}
      >
        <Text>Bold</Text>
        <Text>Italic</Text>
        <Text>Undo</Text>
      </HStack>
      <Stack
        direction={{ md: "row", lg: "row-reverse", xl: "column-reverse" }}
        gap={2}
        separator={<Stack.Separator variant="dashed" />}
      >
        <Text>Responsive first</Text>
        <Text>Responsive second</Text>
      </Stack>
      <HStack
        gap={2}
        separator={
          <Text as="span" tone="secondary">
            /
          </Text>
        }
      >
        <Text>Custom</Text>
        <Text>Line</Text>
      </HStack>
    </VStack>
  );
}
