import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { Container, ScrollArea, Sidebar, SkipLink, VStack } from "@flowstack-ui/brick";
import {
  playgroundEntries,
  type PlaygroundEntry,
} from "../app/component-registry.js";
import { type ScenarioDefinition } from "../shared/Scenario.js";
import { ComponentNavigation } from "./ComponentNavigation.js";
import { PlaygroundAppBar } from "./PlaygroundAppBar.js";
import { PlaygroundMobileNav } from "./PlaygroundMobileNav.js";
import { PlaygroundPageHeader } from "./PlaygroundPageHeader.js";
import { PlaygroundFooter } from "./PlaygroundFooter.js";
import { DocsTableOfContents, type DocsSectionMetadata } from "../shared/DocsTableOfContents.js";

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
    <SkipLink.Target asChild id={config.targetId}>
      {children}
    </SkipLink.Target>
  ) : (
    children
  );
}

export function PlaygroundShell({
  children,
  entry,
  scenarios,
  skipLink,
  tableOfContents,
  editPageHref,
}: {
  children: ReactNode;
  entry: PlaygroundEntry;
  scenarios: readonly ScenarioDefinition[];
  skipLink?: PlaygroundSkipLink;
  tableOfContents?: readonly DocsSectionMetadata[];
  editPageHref?: string;
}) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [restoreMobileNavigationFocus, setRestoreMobileNavigationFocus] =
    useState(true);
  const mobileNavigationTriggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 48rem)");
    const closeMobileNavigation = ({
      matches,
    }: Pick<MediaQueryList, "matches">) => {
      if (!matches) return;
      setRestoreMobileNavigationFocus(false);
      setMobileNavigationOpen(false);
    };

    closeMobileNavigation(desktopQuery);
    desktopQuery.addEventListener("change", closeMobileNavigation);
    return () =>
      desktopQuery.removeEventListener("change", closeMobileNavigation);
  }, []);

  const pageContent = <>
    <PlaygroundPageHeader entry={entry} scenarios={scenarios} />
    <Container data-playground-content="" gutter="none" measure="full">
      {children}
    </Container>
    <PlaygroundFooter currentRoute={entry.route} />
  </>;

  return (
    <div className="evidence-app" data-playground-shell="" id="top">
      {skipLink ? (
        <SkipLink.Root href={skipLink.href}>{skipLink.label}</SkipLink.Root>
      ) : null}
      <PlaygroundAppBar
        navigationTriggerRef={mobileNavigationTriggerRef}
        onOpenNavigation={() => {
          setRestoreMobileNavigationFocus(true);
          setMobileNavigationOpen(true);
        }}
      />

      <PlaygroundMobileNav
        open={mobileNavigationOpen}
        onOpenChange={setMobileNavigationOpen}
        currentRoute={entry.route}
        finalFocus={restoreMobileNavigationFocus ? mobileNavigationTriggerRef : undefined}
      />

      <Container measure="max">
        <Sidebar.Root className="evidence-layout" position="sticky" surface="transparent">
          <Sidebar.Panel
            aria-label="Component index"
            className="evidence-sidebar"
          >
            <Sidebar.Content inset="none">
              <ScrollArea.Root
                className="evidence-sidebar-scroll"
                scrollbarVisibility="interaction"
              >
                <ScrollArea.Viewport focusable>
                  <VStack startSpacing="5" endSpacing="5">
                    <ComponentNavigation
                      density="compact"
                      currentRoute={entry.route}
                      entries={playgroundEntries}
                    />
                  </VStack>
                </ScrollArea.Viewport>
              </ScrollArea.Root>
            </Sidebar.Content>
          </Sidebar.Panel>

          <Sidebar.Main asChild>
            <OptionalSkipTarget config={skipLink}>
              <Container
                as="main"
                className="evidence-main-column"
                gutter="lg"
                measure="max"
              >
                {tableOfContents ? (
                  <DocsTableOfContents sections={tableOfContents} editPageHref={editPageHref}>{pageContent}</DocsTableOfContents>
                ) : pageContent}

              </Container>
            </OptionalSkipTarget>
          </Sidebar.Main>
        </Sidebar.Root>
      </Container>
    </div>
  );
}
