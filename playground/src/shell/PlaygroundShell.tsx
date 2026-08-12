import { useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import {
  AppBar,
  Button,
  Container,
  Drawer,
  Hide,
  Icon,
  IconButton,
  HStack,
  Link,
  ScrollArea,
  Sidebar,
  Show,
  SkipLink,
  Text,
  VStack,
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

interface PlaygroundSkipLink {
  href: `#${string}`;
  label: string;
  targetId: string;
}

function OptionalSkipTarget({
  children,
  config,
}: {
  children: ReactElement;
  config?: PlaygroundSkipLink;
}) {
  return config ? (
    <SkipLink.Target asChild id={config.targetId}>{children}</SkipLink.Target>
  ) : children;
}

export function PlaygroundShell({
  children,
  entry,
  scenarios,
  skipLink,
}: {
  children: ReactNode;
  entry: PlaygroundEntry;
  scenarios: readonly ScenarioDefinition[];
  skipLink?: PlaygroundSkipLink;
}) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [restoreMobileNavigationFocus, setRestoreMobileNavigationFocus] = useState(true);
  const mobileNavigationTriggerRef = useRef<HTMLElement>(null);
  const {
    appearance,
    direction,
    theme,
    setAppearance,
    setDirection,
    setTheme,
  } = useReviewEnvironment();
  const pageTitle = entry.title;

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 80rem)");
    const closeMobileNavigation = ({ matches }: Pick<MediaQueryList, "matches">) => {
      if (!matches) return;
      setRestoreMobileNavigationFocus(false);
      setMobileNavigationOpen(false);
    };

    closeMobileNavigation(desktopQuery);
    desktopQuery.addEventListener("change", closeMobileNavigation);
    return () => desktopQuery.removeEventListener("change", closeMobileNavigation);
  }, []);

  return (
    <div className="evidence-app" data-playground-shell="" id="top">
      {skipLink ? <SkipLink.Root href={skipLink.href}>{skipLink.label}</SkipLink.Root> : null}
      <AppBar.Root
        aria-label="Brick playground"
        className="evidence-app-bar"
        position="sticky"
      >
        <AppBar.Toolbar density="compact">
          <AppBar.Start>
            <Link className="evidence-brand" href="/button" tone="inherit" variant="plain">
              Brick playground
            </Link>
          </AppBar.Start>
          <AppBar.End>
            <Hide as="span" className="evidence-mobile-menu" from="xl">
              <IconButton
                aria-label="Open component navigation"
                onPress={() => {
                  setRestoreMobileNavigationFocus(true);
                  setMobileNavigationOpen(true);
                }}
                ref={mobileNavigationTriggerRef}
              >
                <Icon size="xs"><MenuIcon /></Icon>
              </IconButton>
            </Hide>
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
            finalFocus={restoreMobileNavigationFocus ? mobileNavigationTriggerRef : undefined}
            placement="start"
            size="full"
          >
            <Drawer.Header>
              <VStack gap="1">
                <Drawer.Title>Brick components</Drawer.Title>
                <Drawer.Description>
                  Choose a component.
                </Drawer.Description>
              </VStack>
              <Drawer.Close asChild>
                <IconButton aria-label="Close component navigation" size="sm">
                  <Icon size="xs"><CloseIcon /></Icon>
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

      <Sidebar.Root className="evidence-layout" position="sticky">
        <Sidebar.Panel asChild>
          <Show
            aria-label="Component index"
            as="aside"
            className="evidence-sidebar"
            from="xl"
            slot="sidebar-panel"
          >
            <Sidebar.Content>
              <ScrollArea.Root
                className="evidence-sidebar-scroll"
                scrollbarVisibility="interaction"
              >
                <ScrollArea.Viewport>
                  <ComponentNavigation
                    currentRoute={entry.route}
                    entries={playgroundEntries}
                  />
                </ScrollArea.Viewport>
              </ScrollArea.Root>
            </Sidebar.Content>
          </Show>
        </Sidebar.Panel>

        <Sidebar.Main asChild>
          <OptionalSkipTarget config={skipLink}>
          <Container
            as="main"
            className="evidence-main-column"
            gutter="lg"
            measure="max"
          >
          <div className="evidence-review-header">
            <Container
              className="evidence-page-header"
              gutter="none"
              measure="wide"
            >
              <VStack className="evidence-page-heading" gap="2">
                <Text className="playground-kicker" variant="caption">@flowstack-ui/brick</Text>
                <Text as="h1" variant="display">{pageTitle}</Text>
                <Text as="p" tone="secondary">{entry.description}</Text>
              </VStack>
              <ReviewControls
                appearance={appearance}
                direction={direction}
                onAppearanceChange={setAppearance}
                onDirectionChange={setDirection}
                onThemeChange={setTheme}
                theme={theme}
              />
            </Container>

            <Container
              aria-label={`${pageTitle} scenarios`}
              as="nav"
              className="scenario-nav"
              gutter="none"
              measure="wide"
            >
              <ScrollArea.Root
                className="scenario-nav-scroll"
                orientation="horizontal"
                scrollbarVisibility="interaction"
              >
                <ScrollArea.Viewport>
                  <HStack as="ol" gap="1">
                    {scenarios.map((scenario) => (
                      <li key={scenario.id}>
                        <Link asChild tone="inherit" variant="plain">
                          <a href={`#${scenarioDomId(scenario.id)}`}>
                            <span>{String(scenario.number).padStart(2, "0")}</span>
                            {scenario.navigationTitle ?? scenario.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </HStack>
                </ScrollArea.Viewport>
              </ScrollArea.Root>
            </Container>
          </div>

          <Container
            data-playground-content=""
            gutter="none"
            measure="wide"
          >
            {children}
          </Container>

          <Container
            as="footer"
            className="evidence-footer"
            gutter="none"
            measure="wide"
          >
            <HStack gap="4" justify="between">
              <Text as="p" tone="secondary" variant="body-sm">
                This route is deterministic evidence. Component behavior belongs
                to Brick and Atom; application workflow remains outside the
                package.
              </Text>
              <Button href="#top" size="sm" tone="neutral" variant="ghost">
                Back to top
              </Button>
            </HStack>
          </Container>
          </Container>
          </OptionalSkipTarget>
        </Sidebar.Main>
      </Sidebar.Root>
    </div>
  );
}
