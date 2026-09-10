import type { Ref } from "react";
import {
  AppBar,
  Container,
  Hide,
  Icon,
  IconButton,
  Link,
} from "@flowstack-ui/brick";
import { MenuIcon } from "../shared/icons.js";
import { BrickLogo } from "./branding/BrickLogo.js";
import { PlaygroundSettingsPopover } from "./PlaygroundSettingsPopover.js";

interface PlaygroundAppBarProps {
  onOpenNavigation: () => void;
  navigationTriggerRef: Ref<HTMLElement>;
}

export function PlaygroundAppBar({
  onOpenNavigation,
  navigationTriggerRef,
}: PlaygroundAppBarProps) {
  return (
    <AppBar.Root
      aria-label="Brick playground"
      data-playground-app-bar=""
      position="sticky"
    >
      <Container measure="full">
        <AppBar.Toolbar inset="none">
          <AppBar.Start>
            <Link
              href="/aspect-ratio"
              aria-label="Brick playground"
              tone="inherit"
              variant="plain"
            >
              <BrickLogo />
            </Link>
          </AppBar.Start>
          <AppBar.End>
            <PlaygroundSettingsPopover />
            <Hide from="xl">
              <IconButton
                aria-label="Open component navigation"
                onPress={onOpenNavigation}
                ref={navigationTriggerRef}
              >
                <Icon size="xs">
                  <MenuIcon />
                </Icon>
              </IconButton>
            </Hide>
          </AppBar.End>
        </AppBar.Toolbar>
      </Container>
    </AppBar.Root>
  );
}
