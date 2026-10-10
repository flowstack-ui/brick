import { useRef } from "react";
import {
  Button,
  Center,
  DropdownMenu,
  Frame,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function DropdownMenuVirtual() {
  const target = useRef<HTMLDivElement>(null);
  return (
    <VStack gap="4" align="start">
      <Frame blockSize="5rem" inlineSize="12rem" asChild>
        <Surface ref={target} level="subtle" radius="sm" asChild>
          <Center>
            <Text>Virtual anchor target</Text>
          </Center>
        </Surface>
      </Frame>
      <DropdownMenu.Root
        positioning={{
          placement: "bottom-start",
          getAnchorRect: () => target.current?.getBoundingClientRect() ?? null,
        }}
      >
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" tone="neutral">
            Open at target
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item value="inspect">Inspect target</DropdownMenu.Item>
          <DropdownMenu.Item value="duplicate">
            Duplicate target
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </VStack>
  );
}
