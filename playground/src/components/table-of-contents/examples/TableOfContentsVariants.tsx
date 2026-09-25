import { VStack } from "@flowstack-ui/brick";
import { TableOfContentsExample } from "./TableOfContentsExample.js";

export function TableOfContentsVariants() {
  return (
    <VStack gap="8">
      <TableOfContentsExample variant="plain" />
      <TableOfContentsExample variant="line" tone="accent" indicator />
    </VStack>
  );
}
