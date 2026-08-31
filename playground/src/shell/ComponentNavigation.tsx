import { NavList } from "@flowstack-ui/brick";
import type { PlaygroundEntry } from "../app/component-registry.js";

export function ComponentNavigation({
  currentRoute,
  entries,
  onNavigate,
}: {
  currentRoute: string;
  entries: readonly PlaygroundEntry[];
  onNavigate?: () => void;
}) {
  const categories = Array.from(
    new Set(entries.map((entry) => entry.category)),
  ).sort((left, right) => left.localeCompare(right));

  return (
    <NavList.Root
      aria-label="Component navigation"
      className="evidence-navigation"
    >
      {categories.map((category) => (
        <NavList.Section className="evidence-navigation__group" key={category}>
          <NavList.SectionLabel>{category}</NavList.SectionLabel>
          <NavList.SectionContent>
            <NavList.List>
              {entries
                .filter((entry) => entry.category === category)
                .sort((left, right) => left.title.localeCompare(right.title))
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
