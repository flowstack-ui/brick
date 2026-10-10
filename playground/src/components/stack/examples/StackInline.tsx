import { HStack, Text, Paragraph, Link } from "@flowstack-ui/brick";

export function StackInline() {
  return (
    <Paragraph>
      Continue with{" "}
      <HStack as="span" inline gap={2}>
        <Text as="span">the</Text>
        <Link href="#props">component props</Link>
      </HStack>{" "}
      when ready.
    </Paragraph>
  );
}
