import type { ReactNode } from "react";
import { Text, VStack } from "@flowstack-ui/brick";

export function EvidenceGroup({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description?: string;
  title: string;
}) {
  return (
    <VStack className="playground-evidence-group" gap="4">
      <VStack align="start" className="playground-evidence-group__heading" gap="1">
        <Text as="h3" variant="title-sm">{title}</Text>
        {description ? <Text tone="secondary" variant="body-sm">{description}</Text> : null}
      </VStack>
      <div className="playground-evidence-group__content">{children}</div>
    </VStack>
  );
}
