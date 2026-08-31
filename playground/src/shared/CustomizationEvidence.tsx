import type { ReactNode } from "react";
import { Grid, Text, VStack } from "@flowstack-ui/brick";
import { EvidenceSurface } from "./EvidenceSurface.js";
import { PlaygroundCodeBlock } from "./PlaygroundCodeBlock.js";
import { SpecimenLabel } from "./SpecimenLabel.js";

export function CustomizationEvidence({
  children,
  code,
  description,
  title,
}: {
  children: ReactNode;
  code: string;
  description: string;
  title: string;
}) {
  return (
    <EvidenceSurface className="playground-customization-evidence" inset="none">
      <Grid.Root
        className="playground-customization-layout"
        columns={2}
        gap="0"
      >
        <VStack gap="2">
          <SpecimenLabel>customized</SpecimenLabel>
          <Text as="h3" variant="title-sm">
            {title}
          </Text>
          <Text tone="secondary" variant="body-sm">
            {description}
          </Text>
          <PlaygroundCodeBlock>{code}</PlaygroundCodeBlock>
        </VStack>
        <VStack className="playground-customization-preview" gap="3">
          {children}
        </VStack>
      </Grid.Root>
    </EvidenceSurface>
  );
}
