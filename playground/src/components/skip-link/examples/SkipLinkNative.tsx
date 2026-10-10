import { useRef } from "react";
import { Button, Paragraph, SkipLink, VStack } from "@flowstack-ui/brick";

export function SkipLinkNative() {
  const link = useRef<HTMLAnchorElement>(null);
  return (
    <VStack gap="4" align="start">
      <SkipLink.Root ref={link} href="#skip-native-content" focusTarget={false}>
        Skip using native navigation
      </SkipLink.Root>
      <Button variant="outline" onClick={() => link.current?.focus()}>
        Focus native link
      </Button>
      <SkipLink.Target id="skip-native-content">
        <Paragraph>
          The browser follows the fragment and updates the URL.
        </Paragraph>
      </SkipLink.Target>
    </VStack>
  );
}
