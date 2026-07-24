import { useRef, useState, type ReactNode } from "react";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Text,
} from "@flowstack-ui/brick";
import {
  playgroundEntries,
  type PlaygroundEntry,
} from "../app/component-registry.js";
import {
  scenarioDomId,
  type ScenarioDefinition,
} from "../shared/Scenario.js";
import { useReviewEnvironment } from "../shared/appearance.js";
import { CloseIcon, MenuIcon } from "../shared/icons.js";
import { ComponentNavigation } from "./ComponentNavigation.js";
import { ReviewControls } from "./ReviewControls.js";

export function PlaygroundShell({
  children,
  entry,
  scenarios,
}: {
  children: ReactNode;
  entry: PlaygroundEntry;
  scenarios: readonly ScenarioDefinition[];
}) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const mobileNavigationTriggerRef = useRef<HTMLElement>(null);
  const {
    appearance,
    direction,
    setAppearance,
    setDirection,
  } = useReviewEnvironment();
  const pageTitle = entry.title;

  return (
    <div className="evidence-app" data-playground-shell="" id="top">
      <AppBar.Root
        aria-label="Brick playground"
        className="evidence-app-bar"
        position="sticky"
      >
        <AppBar.Toolbar density="compact">
          <AppBar.Start>
            <a className="evidence-brand" href="/button">
              Brick playground
            </a>
          </AppBar.Start>
          <AppBar.End>
            <IconButton
              aria-label="Open component navigation"
              className="evidence-mobile-menu"
              onPress={() => setMobileNavigationOpen(true)}
              ref={mobileNavigationTriggerRef}
              size="sm"
            >
              <MenuIcon />
            </IconButton>
          </AppBar.End>
        </AppBar.Toolbar>
      </AppBar.Root>

      <Drawer.Root
        onOpenChange={setMobileNavigationOpen}
        open={mobileNavigationOpen}
      >
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content
            className="evidence-mobile-drawer"
            finalFocus={mobileNavigationTriggerRef}
            placement="start"
            size="sm"
          >
            <Drawer.Header>
              <div>
                <Drawer.Title>Brick components</Drawer.Title>
                <Drawer.Description>
                  Choose a component.
                </Drawer.Description>
              </div>
              <Drawer.Close asChild>
                <IconButton aria-label="Close component navigation" size="sm">
                  <CloseIcon />
                </IconButton>
              </Drawer.Close>
            </Drawer.Header>
            <Drawer.Body>
              <ComponentNavigation
                currentRoute={entry.route}
                entries={playgroundEntries}
                onNavigate={() => setMobileNavigationOpen(false)}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <div className="evidence-layout">
        <aside className="evidence-sidebar">
          <ComponentNavigation
            currentRoute={entry.route}
            entries={playgroundEntries}
          />
        </aside>

        <main className="evidence-main-column">
          <div className="evidence-review-header">
            <div className="evidence-page-header">
              <div className="evidence-page-heading">
                <Text className="playground-kicker" variant="caption">@flowstack-ui/brick</Text>
                <Text as="h1" variant="display">{pageTitle}</Text>
                <Text as="p" tone="secondary">{entry.description}</Text>
              </div>
              <ReviewControls
                appearance={appearance}
                direction={direction}
                onAppearanceChange={setAppearance}
                onDirectionChange={setDirection}
              />
            </div>

            <nav aria-label={`${pageTitle} scenarios`} className="scenario-nav">
              <ol>
                {scenarios.map((scenario) => (
                  <li key={scenario.id}>
                    <a href={`#${scenarioDomId(scenario.id)}`}>
                      <span>{String(scenario.number).padStart(2, "0")}</span>
                      {scenario.navigationTitle ?? scenario.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div data-playground-content="">{children}</div>

          <footer className="evidence-footer">
            <Text as="p" tone="secondary" variant="body-sm">
              This route is deterministic evidence. Component behavior belongs
              to Brick and Atom; application workflow remains outside the
              package.
            </Text>
            <Button href="#top" size="sm" tone="neutral" variant="ghost">
              Back to top
            </Button>
          </footer>
        </main>
      </div>
    </div>
  );
}
