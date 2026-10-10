import { HStack, Icon } from "@flowstack-ui/brick";
import { File, Folder } from "lucide-react";
import type { ReactNode } from "react";

/** Artwork is independent of disclosure, cell focus and row selection. */
export function TreeGridFileLabel({
  folder = false,
  children,
}: {
  folder?: boolean;
  children: ReactNode;
}) {
  const Artwork = folder ? Folder : File;
  return (
    <HStack gap={2}>
      <Icon asChild size="xs">
        <Artwork />
      </Icon>
      <span>{children}</span>
    </HStack>
  );
}
