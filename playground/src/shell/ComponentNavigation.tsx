import { Text } from "@flowstack-ui/brick";
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
  );

  return (
    <nav aria-label="Component navigation" className="evidence-navigation">
      {categories.map((category) => (
        <section className="evidence-navigation__group" key={category}>
          <Text as="h2" variant="title-sm">{category}</Text>
          <ul>
            {entries
              .filter((entry) => entry.category === category)
              .map((entry) => (
                <li key={entry.id}>
                  <a
                    aria-current={
                      currentRoute === entry.route ? "page" : undefined
                    }
                    href={entry.route}
                    onClick={onNavigate}
                  >
                    <span>{entry.title}</span>
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
