import { Divider, Paragraph, VStack } from "@flowstack-ui/brick";

export function DividerBasic() {
  return (
    <VStack gap="4">
      <Paragraph>Build with consistent components.</Paragraph>
      <Divider />
      <Paragraph tone="secondary">
        Keep content groups easy to distinguish.
      </Paragraph>
    </VStack>
  );
}
