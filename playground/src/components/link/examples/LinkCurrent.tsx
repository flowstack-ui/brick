import { HStack, Link } from "@flowstack-ui/brick";

export function LinkCurrent() {
  return (
    <HStack as="nav" aria-label="Guide chapters" gap="6">
      <Link href="#current" tone="neutral" variant="subtle" aria-current="page">
        Overview
      </Link>
      <Link href="#usage" tone="neutral" variant="subtle">
        Setup
      </Link>
    </HStack>
  );
}
