import type { RefObject } from "react";
import { CloseButton, Drawer, VStack } from "@flowstack-ui/brick";
import { playgroundEntries } from "../app/component-registry.js";
import { ComponentNavigation } from "./ComponentNavigation.js";

interface PlaygroundMobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRoute: string;
  finalFocus?: RefObject<HTMLElement | null>;
}

export function PlaygroundMobileNav({ open, onOpenChange, currentRoute, finalFocus }: PlaygroundMobileNavProps) {
  return (
    <Drawer.Root
      onOpenChange={onOpenChange}
      open={open}
    >
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content
          className="evidence-mobile-drawer"
          finalFocus={finalFocus}
          placement="start"
          size="full"
        >
          <Drawer.Header>
            <VStack gap="1">
              <Drawer.Title>Brick components</Drawer.Title>
              <Drawer.Description>Choose a component.</Drawer.Description>
            </VStack>
            <Drawer.Close asChild>
              <CloseButton
                aria-label="Close component navigation"
                size="sm"
              />
            </Drawer.Close>
          </Drawer.Header>
          <Drawer.Body>
            <ComponentNavigation
              currentRoute={currentRoute}
              entries={playgroundEntries}
              onNavigate={() => onOpenChange(false)}
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
