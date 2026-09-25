import { useState } from "react";
import {
  Button,
  Heading,
  Paragraph,
  Surface,
  VStack,
} from "@flowstack-ui/brick";
import { Grid } from "@flowstack-ui/brick/grid";
import { Group } from "@flowstack-ui/brick/group";
import "@flowstack-ui/brick/styles/grid.css";
import "@flowstack-ui/brick/styles/group.css";

export function GridGroupExample() {
  const [status, setStatus] = useState("Report ready for export.");
  return (
    <Grid.Root
      templateColumns={{
        initial: "minmax(0, 1fr)",
        md: "minmax(0, 1fr) minmax(0, 2fr)",
      }}
      gap={6}
    >
      <VStack align="start" gap={3}>
        <Heading level={2} variant="title-md">
          Usage summary
        </Heading>
        <Group
          attached
          orientation={{ initial: "vertical", sm: "horizontal" }}
          role="group"
          aria-label="Report actions"
        >
          <Button
            variant="outline"
            onClick={() => setStatus("Report refreshed.")}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            onClick={() => setStatus("Export preview ready.")}
          >
            Preview export
          </Button>
        </Group>
      </VStack>
      <Grid.Item asChild>
        <Surface level="canvas" bordered inset="md">
          <Paragraph role="status">{status}</Paragraph>
        </Surface>
      </Grid.Item>
    </Grid.Root>
  );
}
