import { Center, HStack, Icon, Link, Text, VStack } from "@flowstack-ui/brick";
import { ArrowRight } from "lucide-react";
export function CenterInline() {
  return (
    <VStack align="start" gap="6">
      <Link href="/center#guide">
        <Center inline asChild>
          <HStack as="span" gap="4">
            <Text as="span">Learn about Center</Text>
            <Icon size="sm" tone="inherit" aria-hidden>
              <ArrowRight />
            </Icon>
          </HStack>
        </Center>
      </Link>
      <Text>
        Learn more about{" "}
        <Center inline asChild>
          <Link href="/center#guide">centering content</Link>
        </Center>{" "}
        without starting a new line.
      </Text>
    </VStack>
  );
}
