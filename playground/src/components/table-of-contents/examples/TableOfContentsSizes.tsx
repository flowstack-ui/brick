import { VStack } from "@flowstack-ui/brick";
import { TableOfContentsExample } from "./TableOfContentsExample.js";

export function TableOfContentsSizes() {
  return (
    <VStack gap="8">
      <TableOfContentsExample size="sm" />
      <TableOfContentsExample size="md" />
      <TableOfContentsExample
        size={{ md: "md" }}
        variant={{ md: "line", lg: "plain" }}
        indicator
      />
    </VStack>
  );
}
