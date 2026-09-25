import { Frame, NavList } from "@flowstack-ui/brick";
import { useState } from "react";
export function NavListDisclosure() {
  const [open, setOpen] = useState(true);
  return (
    <Frame maxInlineSize="20rem">
      <NavList.Root aria-label="Project navigation">
        <NavList.Section collapsible open={open} onOpenChange={setOpen}>
          <NavList.SectionTrigger>Projects</NavList.SectionTrigger>
          <NavList.SectionContent forceMount>
            <NavList.List>
              <NavList.Item>
                <NavList.Link href="#disclosure">Design system</NavList.Link>
              </NavList.Item>
              <NavList.Item>
                <NavList.Link href="#usage">Website</NavList.Link>
              </NavList.Item>
            </NavList.List>
          </NavList.SectionContent>
        </NavList.Section>
      </NavList.Root>
    </Frame>
  );
}
