import {
  Badge,
  Float,
  IconButton,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { Pencil } from "lucide-react";
export function FloatComposition() {
  return (
    <VStack gap={8}>
      <Float.Anchor>
        <Surface level="subtle" inset="lg">
          <Text>Project summary</Text>
        </Surface>
        <Float.Root>
          <IconButton aria-label="Edit project" size="sm" variant="outline">
            <Pencil />
          </IconButton>
        </Float.Root>
      </Float.Anchor>
      <Float.Anchor>
        <Surface level="subtle" inset="lg">
          <Text>Compose the badge onto the positioning host</Text>
        </Surface>
        <Float.Root asChild>
          <Badge tone="accent" variant="solid">
            New
          </Badge>
        </Float.Root>
      </Float.Anchor>
    </VStack>
  );
}
