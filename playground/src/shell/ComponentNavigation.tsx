import { NavList, type NavListDensity } from "@flowstack-ui/brick";
import type { PlaygroundEntry } from "../app/component-registry.js";
import { orderNavigation } from "./navigation-order.js";

export function ComponentNavigation({
  currentRoute,
  entries,
  onNavigate,
  density,
}: {
  currentRoute: string;
  entries: readonly PlaygroundEntry[];
  onNavigate?: () => void;
  density?: NavListDensity;
}) {
  const ordered = orderNavigation(entries);
  const categories = Array.from(new Set(ordered.map((entry) => entry.category)));

  return (
    <NavList.Root
      aria-label="Component navigation"
      className="evidence-navigation"
      density={density}
      gap="6"
    >
      {categories.map((category) => (
        <NavList.Section className="evidence-navigation__group" key={category}>
          <NavList.SectionLabel>{category}</NavList.SectionLabel>
          <NavList.SectionContent indent="none">
            <NavList.List>
              {ordered
                .filter((entry) => entry.category === category)
                .map((entry) => (
                  <NavList.Item key={entry.id}>
                    <NavList.Link
                      active={currentRoute === entry.route}
                      href={entry.route}
                      onClick={onNavigate}
                    >
                      {entry.title}
                    </NavList.Link>
                  </NavList.Item>
                ))}
            </NavList.List>
          </NavList.SectionContent>
        </NavList.Section>
      ))}
    </NavList.Root>
  );
}
