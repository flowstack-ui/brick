import { Frame, NavList } from "@flowstack-ui/brick";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
export function NavListIndicators() {
  const [open, setOpen] = useState(false);
  return (
    <Frame maxInlineSize="20rem">
      <NavList.Root aria-label="Custom disclosures">
        <NavList.Section collapsible open={open} onOpenChange={setOpen}>
          <NavList.SectionTrigger indicator={open ? <Minus /> : <Plus />}>
            Resources
          </NavList.SectionTrigger>
          <NavList.SectionContent>
            <NavList.List>
              <NavList.Item>
                <NavList.Link href="#usage">Documentation</NavList.Link>
              </NavList.Item>
            </NavList.List>
          </NavList.SectionContent>
        </NavList.Section>
        <NavList.Section collapsible defaultOpen={false}>
          <NavList.SectionTrigger indicator={null}>
            More resources
          </NavList.SectionTrigger>
          <NavList.SectionContent>
            <NavList.List>
              <NavList.Item>
                <NavList.Link href="#content">Community</NavList.Link>
              </NavList.Item>
            </NavList.List>
          </NavList.SectionContent>
        </NavList.Section>
      </NavList.Root>
    </Frame>
  );
}
