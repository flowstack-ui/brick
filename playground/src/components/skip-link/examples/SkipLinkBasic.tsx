import { useRef } from "react";
import { Button, Paragraph, SkipLink, VStack } from "@flowstack-ui/brick";

export function SkipLinkBasic() {
  const link = useRef<HTMLAnchorElement>(null);
  return (
    <VStack gap="4" align="start">
      <SkipLink.Root ref={link} href="#skip-basic-content">
        Skip to example content
      </SkipLink.Root>
      <Button variant="outline" onClick={() => link.current?.focus()}>
        Focus skip link
      </Button>
      <SkipLink.Target id="skip-basic-content">
        <Paragraph>
          This is the destination. Activate the revealed link to focus it.
        </Paragraph>
      </SkipLink.Target>
    </VStack>
  );
}
