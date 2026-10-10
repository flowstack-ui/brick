import { useRef } from "react";
import { Button, Paragraph, SkipLink, VStack } from "@flowstack-ui/brick";

export function SkipLinkComposition() {
  const link = useRef<HTMLAnchorElement>(null);
  return (
    <VStack gap="4" align="start">
      <SkipLink.Root ref={link} href="#skip-report-content">
        Skip to report
      </SkipLink.Root>
      <Button variant="outline" onClick={() => link.current?.focus()}>
        Focus report link
      </Button>
      <SkipLink.Target asChild id="skip-report-content">
        <section aria-label="Report content">
          <Paragraph>
            Compose onto an existing section without another wrapper.
          </Paragraph>
        </section>
      </SkipLink.Target>
    </VStack>
  );
}
